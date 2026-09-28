# Physical AI & Humanoid Robotics: Course Book with Grounded RAG Chatbot

An educational course book with an embedded chatbot that answers questions **only from the text the reader selects**, and cites where each answer comes from.

**Live demo:** https://physcial-ai-and-humanoid-robotics-c.vercel.app

## What it does

- Course content published as a Docusaurus site
- A chat widget on every page
- **Selected-text-only RAG:** the reader highlights a passage, asks a question, and the answer is grounded strictly in that selection
- Mandatory citations in every answer, to reduce hallucination

## Architecture

```
Docusaurus site (React chat widget)
        |
        v
FastAPI backend  -->  OpenAI Agents SDK (answering agent)
        |
        +--> Cohere embeddings --> Qdrant Cloud (vector search)
        |
        +--> Neon PostgreSQL
```

<!-- VERIFY: confirm each box above matches the code in /backend. Delete any line that is not true. -->

## Repository layout

| Path | Contents |
|------|----------|
| `physcial-ai-and-humanoid-robotics-course-book/` | Docusaurus site and React chat widget |
| `backend/` | FastAPI service: RAG pipeline and agent |
| `specs/1-rag-platform/` | Specification, plan and tasks for the RAG platform |
| `history/prompts/` | Prompt history from spec-driven development |
| `.specify/`, `.claude/`, `CLAUDE.md` | Spec-Kit Plus and Claude Code configuration |

## Tech stack

Docusaurus, React, FastAPI, OpenAI Agents SDK, Cohere Embeddings, Qdrant Cloud, Neon PostgreSQL

## How it was built

Built with **Spec-Driven Development** using Spec-Kit Plus and Claude Code. The specs in `specs/1-rag-platform/` come first, and the implementation follows them.

## Run locally

```bash
# Backend
cd backend
# VERIFY: install command (pip / uv) and start command
uvicorn main:app --reload

# Frontend
cd physcial-ai-and-humanoid-robotics-course-book
npm install
npm start
```

### Environment variables

Create a `.env` in `backend/` (not committed):

```
OPENAI_API_KEY=
COHERE_API_KEY=
QDRANT_URL=
QDRANT_API_KEY=
DATABASE_URL=
```

<!-- VERIFY: match these names to the ones your backend actually reads. -->

## Author

Khadija Mughal, backend and agent logic. https://github.com/khadija-faisal
