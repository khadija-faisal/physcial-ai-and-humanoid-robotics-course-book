# Research & Technical Decisions: Physical AI & Humanoid Robotics Platform

**Status**: Complete
**Date**: 2025-12-06

---

## Research Topics

### 1. Docusaurus v3 Swizzling for Root Component Injection

**Research Summary**:
Docusaurus v3 supports component swizzling—a native mechanism to override core theme components without forking the theme. This is the recommended pattern for global UI injection.

**Decision**: Use Swizzling to inject ChatKit widget into Docusaurus Root component

**Implementation**:
```bash
# Generate swizzled Root component
npm run swizzle @docusaurus/theme-classic Root

# File: src/theme/Root.js (swizzled)
import { ChatKit } from '@openai/chatkit-sdk';

export default function Root({ children }) {
  const userIdFromSession = sessionStorage.getItem('user_id');

  return (
    <>
      {children}
      {userIdFromSession && (
        <ChatKit
          apiEndpoint={process.env.REACT_APP_BACKEND_URL}
          userId={userIdFromSession}
          theme="light"
        />
      )}
    </>
  );
}
```

**Alternatives Considered**:
- **Wrapper Component**: More manual, less integrated, requires theme modifications
- **Custom Theme**: Complex, maintenance burden, version conflicts
- **iFrame**: Cross-origin issues, poor UX

**Rationale**: Swizzling is native, future-proof, minimal disruption to Docusaurus upgrades

---

### 2. OpenAI Agents SDK & Chatkit SDK Integration

**Research Summary**:
OpenAI Agents SDK (via Chatkit) provides a high-level abstraction for building conversational applications. Chatkit handles state, context, and UI rendering. FastAPI backend integrates via REST API.

**Decision**: Use OpenAI Agents SDK Chatkit for frontend widget; FastAPI for backend logic

**Integration Pattern**:
```
Frontend (Docusaurus)
    ↓ (selected text + question via REST)
FastAPI Backend
    ↓ (check context in Neon, query Qdrant)
Qdrant + OpenAI Embeddings API
    ↓ (retrieve cited chunks)
Chatkit Response
    ↓ (display in widget with citation)
Learner
```

**Key Libraries**:
- `@openai/chatkit-sdk`: Frontend widget
- `openai`: Python SDK for embeddings + chat
- `qdrant-client`: Python Qdrant client
- `fastapi`: Web framework
- `pydantic`: Request validation

**Rationale**: Chatkit abstracts UI complexity; FastAPI provides flexible backend control for RAG logic

---

### 3. Deterministic Text Chunking Strategy

**Research Summary**:
Deterministic chunking ensures reproducible embeddings. Fixed-size sliding windows are preferred over ML-based chunking for consistency.

**Decision**: Use fixed-size sliding window with overlap

**Implementation**:
```python
# Chunk strategy: 1024 tokens, 128-token overlap
# Result: Predictable, reproducible embeddings

def chunk_text(text, chunk_size=1024, overlap=128):
    tokens = tokenize(text)  # OpenAI tokenizer or similar
    chunks = []
    for i in range(0, len(tokens), chunk_size - overlap):
        chunk = tokens[i:i + chunk_size]
        chunks.append(detokenize(chunk))
    return chunks
```

**Embedding Storage in Qdrant**:
```json
{
  "id": "chunk-uuid",
  "vector": [0.123, 0.456, ...],  // 1536 dims for OpenAI ada-002
  "payload": {
    "chapter_id": "chapter-uuid",
    "section": "Sensors",
    "proficiency_level": "Beginner",
    "module_id": 1,
    "week_number": 1,
    "text_chunk": "Sensors measure physical phenomena..."
  }
}
```

**Alternatives Considered**:
- **Dynamic ML-based chunking**: Better semantics, but non-deterministic
- **Manual chunking per section**: Labor-intensive, error-prone

**Rationale**: Fixed windows ensure reproducible embeddings; overlap maintains semantic continuity

---

### 4. Neon Postgres Connection Pooling for FastAPI

**Research Summary**:
Neon supports connection pooling via pgBouncer. FastAPI applications should reuse connections to avoid exhaustion.

**Decision**: Use Neon connection pooling with SQLAlchemy engine

**Implementation**:
```python
from sqlalchemy import create_engine
from sqlalchemy.pool import QueuePool

# Neon provides pooled connection string
DATABASE_URL = os.getenv("DATABASE_URL")  # postgres://...?sslmode=require

engine = create_engine(
    DATABASE_URL,
    poolclass=QueuePool,
    pool_size=10,          # Connections to keep open
    max_overflow=20,       # Additional connections if needed
    pool_recycle=3600,     # Recycle connections every hour
    echo=False
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
```

**Best Practices**:
- Use connection pooling to avoid "too many connections" errors
- Set appropriate pool_size based on expected concurrency
- Monitor connection usage in production

**Rationale**: Connection pooling is essential for FastAPI scalability; Neon's pgBouncer is production-ready

---

### 5. GitHub Actions CI/CD for Docusaurus

**Research Summary**:
GitHub Actions can automatically build and deploy Docusaurus to GitHub Pages on every push.

**Decision**: Use GitHub Actions with `peaceiris/actions-gh-pages@v3`

**Implementation**:
```yaml
# .github/workflows/deploy.yml
name: Deploy Docusaurus

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm install

      - name: Build Docusaurus
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./build
          cname: learning.example.com  # Optional custom domain
```

**Triggers**:
- Push to main branch → automatic build & deploy
- Pull requests → preview builds (optional)

**Rationale**: Zero-downtime deployments; automatic versioning via git

---

### 6. Translation Strategy: AI-on-the-fly vs Docusaurus i18n

**Research Summary**:
Two approaches: manual i18n (Docusaurus native) or API-based translation (AI on-the-fly).

**Decision**: AI-on-the-fly translation for MVP (Google Translate API or OpenAI)

**Rationale for MVP**:
- **Speed**: No manual translation needed; ready in days
- **Scalability**: Works for any language without pre-translation
- **Cost**: Free tier for demo purposes

**Implementation** (OpenAI):
```python
async def translate_text(text: str, target_language: str = "ur") -> str:
    response = await openai.ChatCompletion.acreate(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
                "content": f"Translate technical content to {target_language}. Preserve code blocks, links, and special formatting."
            },
            {
                "role": "user",
                "content": text
            }
        ]
    )
    return response.choices[0].message.content
```

**Frontend Button** (React component):
```jsx
<TranslateBtn
  text={chapterContent}
  targetLang="ur"
  onTranslate={(translated) => setContent(translated)}
/>
```

**Future Enhancement**: Post-launch, implement Docusaurus i18n for manual translations + performance optimization

---

### 7. Selected-Text RAG Constraint Enforcement

**Research Summary**:
"Selected-text-only" RAG ensures the chatbot only answers from user-highlighted text, preventing hallucination.

**Decision**: Enforce constraint at backend level (Neon + Qdrant query)

**Implementation**:
1. **Frontend captures**: text + char positions
2. **Backend stores**: SelectedTextContext in Neon with UUID
3. **Chatbot query includes**: context_id
4. **Backend validation**: Verify context_id belongs to user + chapter

```python
# Backend validation
@app.post("/chatbot/query")
async def query_chatbot(req: ChatbotQueryRequest, user_id: str = Depends(get_current_user)):
    # Verify context_id exists and belongs to user
    context = db.query(SelectedTextContext).filter(
        SelectedTextContext.context_id == req.context_id,
        SelectedTextContext.user_id == user_id
    ).first()

    if not context:
        raise HTTPException(status_code=400, detail="No valid context found. Please select text.")

    # Embed selected text + query
    query_embedding = embed(context.text_content + " " + req.question)

    # Search Qdrant with payload filter
    results = qdrant_client.search(
        collection_name="chapters",
        query_vector=query_embedding,
        query_filter=Filter(
            must=[
                HasIdCondition(has_id=[context.chapter_id])  # Restrict to chapter
            ]
        ),
        limit=3
    )

    # Generate response from results
    response = generate_response(req.question, results, context.text_content)

    return response
```

**Rationale**: Backend enforcement is secure; prevents client-side bypass

---

## Technical Decisions Summary

| Topic | Decision | Rationale |
|-------|----------|-----------|
| **UI Injection** | Docusaurus Swizzling Root component | Native pattern, minimal disruption |
| **Chatbot Widget** | OpenAI Agents SDK Chatkit | High-level abstraction, good UX |
| **Backend Framework** | FastAPI + Pydantic | Type safety, performance, async support |
| **Vector DB** | Qdrant Cloud Free Tier | Fast, scalable, payload filtering support |
| **Text Chunking** | Fixed-size sliding window (1024 tokens, 128 overlap) | Deterministic, reproducible |
| **Connection Pooling** | Neon pgBouncer + SQLAlchemy QueuePool | Production-ready, scalable |
| **CI/CD** | GitHub Actions → GitHub Pages | Zero-config, automatic deployments |
| **Translation** | AI-on-the-fly (OpenAI API) | Fast MVP, low effort |
| **RAG Constraint** | Backend enforcement (Neon + Qdrant) | Secure, non-bypassable |

---

## Unknowns Resolved

✅ All identified unknowns have been addressed through research and design decisions above.

**Remaining Open Questions** (for planning/implementation phase):
- [ ] Exact token count for chunks (1024 vs 512 vs 2048)—dependent on content analysis
- [ ] Qdrant vector dimension (ada-002 = 1536)—confirmed via OpenAI API docs
- [ ] GitHub Pages custom domain—optional, not critical for MVP

---

**Next Phase**: Proceed to Phase 1: Docusaurus Foundation setup
