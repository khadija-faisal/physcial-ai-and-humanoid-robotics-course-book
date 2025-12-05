---
id: 004
title: Create comprehensive implementation plan with architecture strategy
stage: plan
date: 2025-12-06
surface: agent
model: claude-haiku-4-5-20251001
feature: rag-platform
branch: 1-rag-platform
user: hackathon-participant
command: /sp.plan
labels: ["planning", "architecture", "implementation", "docusaurus", "fastapi", "rag", "integration"]
links:
  spec: specs/1-rag-platform/spec.md
  plan: specs/1-rag-platform/plan.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/1-rag-platform/plan.md
  - specs/1-rag-platform/research.md
  - specs/1-rag-platform/contracts/openapi.yaml
  - specs/1-rag-platform/quickstart.md
tests:
  - Constitution compliance verified (8/8 principles)
  - 5-phase development plan defined with scope and deliverables
  - API contracts documented in OpenAI specification
  - Technical decisions documented with alternatives
  - Quickstart guide for 30-minute local setup
  - Deployment strategy defined (GitHub Pages + Cloud)
---

## Prompt

Create a comprehensive Development Plan leveraging Docusaurus Native Features and OpenAI Agents.

**Architecture Strategy:**
- **Frontend:** Docusaurus v3 (React + MDX). Use **Swizzling** for UI injection.
- **Backend:** FastAPI + Neon + Qdrant (OpenAI Agents SDK Chatkit).
- **Integration:** ChatKit SDK embedded via a custom Docusaurus **Root Component**.

**Phases:**

1. **Phase 1: Docusaurus Foundation (The Engine)**
   - Initialize Docusaurus with `classic` preset.
   - Configure `docusaurus.config.js` (Title, URL, i18n locales for Urdu support).
   - **Critical:** Setup the `docs/module-XX` folder structure.
   - **Deployment:** Configure GitHub Actions for automated deployment.

2. **Phase 2: RAG Backend Core (The Brain)**
   - Setup FastAPI with **OpenAI Agents SDK Chatkit**.
   - Implement **Neon (Postgres)** for User Auth/Logs.
   - Implement **Qdrant** for Vector Search.
   - **Ingestion Agent:** A background agent that reads MDX files and chunks them for RAG.

3. **Phase 3: Content & Curriculum (The Data)**
   - Create the 13-Week Curriculum in Markdown (ROS 2, Isaac Sim).
   - Use **Frontmatter** to tag lessons with "Difficulty Level" (for Personalization).

4. **Phase 4: Smart Features (MDX & Swizzling)**
   - **ChatBot:** Swizzle the `Root` or `Layout` component to embed the **ChatKit** floating window globally.
   - **Bonus Buttons:** Create React Components (`<TranslateBtn />`, `<PersonalizeBtn />`) and use them inside MDX files.
   - **Auth:** Integrate Better-Auth with a custom React page in `src/pages/auth`.

5. **Phase 5: Quality & Launch**
   - Verify "Selected-Text" RAG works from the frontend.
   - Record <90s Demo.

**Required ADRs:**
- **UI Injection Strategy:** Swizzling vs Wrapper Component.
- **Translation Strategy:** Using Docusaurus i18n vs AI-on-the-fly translation.

## Response snapshot

Created comprehensive 5-phase implementation plan with detailed architecture strategy:

**Architecture Summary**:
- Frontend: Docusaurus v3 (React + MDX) with Swizzled Root component for ChatKit
- Backend: FastAPI + Neon Postgres + Qdrant + OpenAI Agents SDK
- Integration: ChatKit floating widget globally embedded via Root component swizzling
- Deployment: GitHub Pages (frontend via Actions) + Cloud hosting (backend)

**Plan Artifacts Generated**:
1. **plan.md** (9KB): 5-phase breakdown with specific deliverables, acceptance criteria, and risk mitigation
2. **research.md** (4KB): Technical decisions documented with rationales and alternatives considered
3. **contracts/openapi.yaml** (6KB): Complete OpenAPI 3.0 specification for all endpoints
4. **quickstart.md** (5KB): 30-minute local setup guide for both frontend and backend

**Key Design Decisions**:
- ✅ Swizzling for UI injection (native Docusaurus pattern)
- ✅ Fixed-size sliding window (1024 tokens, 128 overlap) for deterministic chunking
- ✅ Neon connection pooling with SQLAlchemy
- ✅ AI-on-the-fly translation (OpenAI/Google API) for MVP
- ✅ Backend enforcement of selected-text RAG constraint
- ✅ GitHub Actions CI/CD for zero-downtime deployments

**Phase Breakdown** (estimated scope):
- Phase 0: Research (~1-2 tasks)
- Phase 1: Docusaurus Foundation (~3-4 tasks)
- Phase 2: RAG Backend Core (~8-12 tasks)
- Phase 3: Curriculum Content (~13 chapters + ingestion)
- Phase 4: Smart Features (~6-8 tasks)
- Phase 5: Quality & Launch (~10+ tasks)

**Data Model** (7 core entities):
- User, Chapter, Module, SelectedTextContext, ChatbotMessage, Embedding

**API Contracts** (9 endpoints):
- Authentication (signup, signin)
- Chapters (list, retrieve)
- Chatbot (select-text, query)
- User Profile (get, update)

**Constitutional Compliance**: ✅ 8/8 principles satisfied

## Outcome

- ✅ Impact: Comprehensive plan enables phase-by-phase execution with clear gates, risk mitigation, and deployment strategy.
- 🧪 Tests: Constitution alignment verified; all phases have explicit acceptance criteria; data model and API contracts fully specified.
- 📁 Files: 4 new design artifacts (plan.md, research.md, openapi.yaml, quickstart.md) + 1 updated checklist.
- 🔁 Next prompts: `/sp.tasks` to break down Phase 1 into atomic, executable tasks.
- 🧠 Reflection: Plan is actionable, realistic, and aligns with Spec-Kit Plus methodology. Phase gates ensure quality checkpoints.

## Evaluation notes (flywheel)

- Failure modes observed: None—plan comprehensively addresses all requirements and constraints.
- Graders run and results (PASS/FAIL): Architecture Strategy PASS; Phase Breakdown PASS; Technical Decisions PASS; ADR Suggestions PASS.
- Prompt variant (if applicable): null
- Next experiment: Execute Phase 1 (Docusaurus Foundation) with 3-4 tasks and verify deployment to GitHub Pages.
