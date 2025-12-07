import cohere
from qdrant_client import QdrantClient



cohere_client = cohere.Client("o4tjKoUr5JySL3dAYxX5Z6jJAPChqetjp5cy6KwC")



# Connect to Qdrant Cloud
qdrant = QdrantClient(
url="https://7b2141a9-e6ed-4813-81be-e3d3af7f1ce5.europe-west3-0.gcp.cloud.qdrant.io:6333", 
    api_key="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIn0.zOhUvpJ5VHlNXRQSkEDUKMAcgO9zYmRo22jxdO6kQAY",
)

def get_embedding(text):
    """Get embedding vector from Cohere Embed v3"""
    response = cohere_client.embed(
        model="embed-english-v3.0",
        input_type="search_query",  # Use search_query for queries
        texts=[text],
    )
    return response.embeddings[0]  # Return the first embedding

def data_retrieve(query):
    embedding = get_embedding(query)
    result = qdrant.query_points(
        collection_name="physical_humanoid_ai_book",
        query=embedding,
        limit=5
    )
    return [point.payload["text"] for point in result.points]

# Test
print(data_retrieve("What data do you have?"))