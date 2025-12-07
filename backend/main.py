import requests
import xml.etree.ElementTree as ET
import trafilatura
from qdrant_client import QdrantClient
from qdrant_client.models import VectorParams, Distance, PointStruct
import cohere
import time

# -------------------------------------
# CONFIG
# -------------------------------------
SITEMAP_URL = "https://physcial-ai-and-humanoid-robotics-c.vercel.app/sitemap.xml"
COLLECTION_NAME = "physical_humanoid_ai_book"

# ⚠ APNI KEYS YAHAN WAPAS PASTE KARNA ⚠
cohere_client = cohere.Client("o4tjKoUr5JySL3dAYxX5Z6jJAPChqetjp5cy6KwC")
EMBED_MODEL = "embed-english-v3.0"

# Connect to Qdrant Cloud
qdrant = QdrantClient(
url="https://7b2141a9-e6ed-4813-81be-e3d3af7f1ce5.europe-west3-0.gcp.cloud.qdrant.io:6333", 
    api_key="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIn0.zOhUvpJ5VHlNXRQSkEDUKMAcgO9zYmRo22jxdO6kQAY",
)

# -------------------------------------
# Step 1 — Extract URLs from sitemap
# -------------------------------------
def get_all_urls(sitemap_url):
    try:
        xml = requests.get(sitemap_url).text
        root = ET.fromstring(xml)

        urls = []
        for child in root:
            loc_tag = child.find("{http://www.sitemaps.org/schemas/sitemap/0.9}loc")
            if loc_tag is not None:
                urls.append(loc_tag.text)
        
        return urls
    except Exception as e:
        print(f"Error fetching sitemap: {e}")
        return []

# -------------------------------------
# Step 2 — Download page + extract text
# -------------------------------------
def extract_text_from_url(url):
    try:
        html = requests.get(url, timeout=10).text # Timeout added
        text = trafilatura.extract(html)
        if not text:
            print(f"[SKIP] No text extracted from: {url}")
        return text
    except Exception as e:
        print(f"[ERROR] Failed to extract {url}: {e}")
        return None

# -------------------------------------
# Step 3 — Chunk the text (SAFE VERSION)
# -------------------------------------
def chunk_text(text, max_chars=1000):
    """
    Fixed function to prevent MemoryError (Infinite Loop).
    """
    if not text:
        return []
    
    chunks = []
    start = 0
    text_len = len(text)
    
    while start < text_len:
        end = start + max_chars
        
        
        if end >= text_len:
            chunks.append(text[start:])
            break
     
        split_pos = text.rfind('. ', start, end)
        
        if split_pos == -1:
            split_pos = text.rfind(' ', start, end)
            
    
        if split_pos == -1:
            split_pos = end
        else:
            split_pos += 1 # Include the dot/space

        chunk = text[start:split_pos].strip()
        
        
        if chunk:
            chunks.append(chunk)
        
        # Move start pointer forward
            start = end
        else:
            start = split_pos
            
    return chunks

# -------------------------------------
# Step 4 — Create embedding
# -------------------------------------
def embed(text):
    # --- RATE LIMIT FIX ---
    time.sleep(2) 
    
    try:
        response = cohere_client.embed(
            model=EMBED_MODEL,
            input_type="search_query",
            texts=[text],
        )
        return response.embeddings[0]
    except Exception as e:
        print(f"⚠ Embed Error: {e}")
   
        time.sleep(5)
        return []
# -------------------------------------
# Step 5 — Store in Qdrant
# -------------------------------------
def create_collection():
    print("\nCreating Qdrant collection...")
    # Using specific config to avoid errors
    try:
        qdrant.recreate_collection(
            collection_name=COLLECTION_NAME,
            vectors_config=VectorParams(
                size=1024,
                distance=Distance.COSINE
            )
        )
        print("Collection created successfully.")
    except Exception as e:
        print(f"Collection creation warning (might exist): {e}")

def save_chunk_to_qdrant(chunk, chunk_id, url):
    vector = embed(chunk)
    qdrant.upsert(
        collection_name=COLLECTION_NAME,
        points=[
            PointStruct(
                id=chunk_id,
                vector=vector,
                payload={
                    "url": url,
                    "text": chunk,
                    "chunk_id": chunk_id
                }
            )
        ]
    )

# -------------------------------------
# MAIN INGESTION PIPELINE
# -------------------------------------
def ingest_book():
    print("Fetching URLs...")
    urls = get_all_urls(SITEMAP_URL)
    
    # --- FILTERING LOGIC ---
    filtered_urls = []
    for u in urls:
        if "tutorial" in u or "blog" in u or "markdown-page" in u or "tags" in u:
            continue
        filtered_urls.append(u)
    
    print(f"\nFiltered URLs count: {len(filtered_urls)} (Original: {len(urls)})")
    for u in filtered_urls:
        print(" -", u)

    create_collection()

    global_id = 1

    for url in filtered_urls:
        print(f"\nProcessing: {url}")
        
        # Try-Except block to prevent crash
        try:
            text = extract_text_from_url(url)
            if not text: continue

            chunks = chunk_text(text)
            print(f" -> Generated {len(chunks)} chunks.")

            for ch in chunks:
                save_chunk_to_qdrant(ch, global_id, url)
                if global_id % 5 == 0: 
                    print(f"   Saved chunk {global_id}...", end="\r")
                global_id += 1
                
        except Exception as e:
            print(f"⚠ Error processing page {url}: {e}")
            continue 

    print(f"\n\n✔ Ingestion completed! Total chunks: {global_id - 1}")

if __name__ == "__main__":
    ingest_book()