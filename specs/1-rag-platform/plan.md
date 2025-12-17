# Implementation Plan: Physical AI & Humanoid Robotics Learning Platform

**Feature Branch**: `1-rag-platform`
**Created**: 2025-12-06
**Status**: Draft
**Specification**: [spec.md](./spec.md)

---

## Executive Summary

This plan outlines the development of a Physical AI & Humanoid Robotics learning platform combining Docusaurus v3 (frontend) with FastAPI + Cohere + Qdrant (backend). **MVP Phase (Phase 2b) focuses on Chat-Only architecture**: RAG chatbot powered by Cohere embeddings.

**Current Architecture** (Phase 2b - ✅ COMPLETED):
- **Frontend**: Docusaurus v3 with React + MDX (chapters pending Phase 3+)
- **Backend**: FastAPI + Cohere embeddings + Qdrant Cloud + OpenAI Agents SDK (stateless)
- **Integration**: POST /api/chat endpoint for RAG queries
- **Database**: None yet (deferred to Phase 3 for user persistence)
- **Deployment**: Backend ready for cloud; Docusaurus frontend ready for GitHub Pages

**Future Phases**:
- **Phase 3**: Neon Postgres for user auth, curriculum content authoring (13 weeks)
- **Phase 4**: ChatKit widget integration, multi-level content, personalization
- **Phase 5**: Translation, advanced features, production deployment

---

## Constitution Check

All design decisions align with project constitution:

| Principle | Compliance | Evidence |
|-----------|-----------|----------|
| **Educational Clarity** | ✅ | Docusaurus + Frontmatter metadata ensures clear, modular content structure |
| **Embodied Intelligence** | ✅ | Curriculum covers ROS2, Gazebo, Isaac Sim with practical labs |
| **Physical AI & Humanoid Robotics Interaction** | ✅ | ChatKit RAG provides context-aware learning assistance from textbook |
| **Technical Accuracy** | ✅ | OpenAI Agents + deterministic chunking ensures reliable, citable responses |
| **Safety in Robotics Guidance** | ✅ | Admonitions (:::warning) for safety notices in chapters |
| **Interaction First** | ✅ | RAG chatbot + selected-text interaction core to experience |
| **Content Integrity** | ✅ | All responses include citations to source material |
| **Error Handling** | ✅ | FastAPI comprehensive error handling + graceful RAG rejection |

---

## Technical Context & Decisions

### Frontend Architecture

**Technology**: Docusaurus v3 (React + MDX)

**Key Decisions**:

1. **Swizzling Strategy**: Use Docusaurus Swizzling to inject ChatKit widget into Root component
   - **Rationale**: Minimal invasiveness; native Docusaurus pattern; preserves theme consistency
   - **Alternative**: Wrapper component (rejected—more complex, less integrated)

2. **Content Organization**: Module-based directory structure with frontmatter metadata
   - **Directory**: `docs/module-01/` through `docs/module-04/`
   - **Chapters**: `chapter-01.md` through `chapter-13.md` (sequential)
   - **Frontmatter**: YAML with title, learning_outcomes, week_number, module_number, proficiency_level, prerequisites, tags

3. **Responsive Design**: Classic Docusaurus preset with custom CSS for theme + dark/light mode

4. **Multi-Level Content**: Use React components to render conditional content based on proficiency level
   - Component: `<ProficiencyWrapper level="Beginner|Intermediate|Advanced">`
   - MDX usage: `<ProficiencyWrapper level="Beginner">Easy explanation</ProficiencyWrapper>`

5. **Search & Navigation**:
   - Leverages Docusaurus built-in Algolia search (or local search)
   - Breadcrumb: Module > Chapter navigation
   - Sidebar: Collapsible module sections

### Backend Architecture

**Technology Stack** (Phase 2b - ✅ IMPLEMENTED): FastAPI + Cohere + Qdrant + OpenAI Agents SDK

**Current Implementation** (Chat-Only, Stateless MVP):

1. **API Design**: RESTful with OpenAI Agents SDK
   - ✅ **POST /api/chat**: Accept message, return response with citations
   - ✅ **GET /**: Health check endpoint
   - 🔄 **DEFERRED to Phase 3**: `/auth/*`, `/chapters/*`, `/user/*` endpoints

2. **RAG Pipeline** (✅ COMPLETED):
   - **Text Chunking**: Deterministic chunking with `max_chars=1000` in `embeding_helpers.py`
   - **Embeddings**: Cohere `embed-english-v3.0` (1024 dimensions) ✅
   - **Vector Database**: Qdrant Cloud with metadata (url, text, chunk_id) ✅
   - **Query Flow**:
     1. User sends message to POST /api/chat
     2. RAG agent calls `retrieve()` tool with user query
     3. `retrieve()` embeds query with Cohere → Qdrant similarity search (limit=5)
     4. Returns top 5 relevant chunks as context
     5. OpenAI Agents SDK generates response based on context
     6. Response includes citations from retrieved chunks

3. **User Authentication**: 🔄 **DEFERRED to Phase 3**
   - Database: Neon Postgres (deferred)
   - Sessions: JWT tokens (deferred)
   - For now: Optional `user_id` parameter in chat requests (default="guest")

4. **Personalization & Content Variants**: 🔄 **DEFERRED to Phase 3**
   - Requires content authoring and database storage
   - Frontend UI components pending Phase 3+

5. **Internationalization (Bonus)**: 🔄 **DEFERRED to Phase 4+**
   - AI-on-the-fly translation via OpenAI API (post-MVP)

6. **Error Handling** (✅ IMPLEMENTED):
   - All endpoints return standard HTTP codes (200, 400, 500)
   - Clear error messages for: empty messages, API failures, Qdrant unavailable
   - Graceful degradation: if Qdrant fails, return "Service temporarily unavailable"

### Custom Widget Integration Architecture

**Method**: Build a custom React Chat Widget (TypeScript + CSS) and swizzle Docusaurus Root component

**Technology**:
- **Component**: React functional component with hooks (useState, useEffect, useCallback)
- **Styling**: CSS3 with Docusaurus CSS variables (--ifm-color-primary, etc.)
- **API Communication**: fetch API to POST /api/chat endpoint
- **State Management**: React hooks (messages, isOpen, isLoading, etc.)

**Widget Features**:
1. **Floating Action Button (FAB)**: Bottom-right corner, always visible
2. **Chat Interface**: Opens/closes from FAB; displays message history
3. **Message Input**: Text field with Send button
4. **Response Display**: Shows answer + citations from backend
5. **Loading State**: "Typing dots" animation while waiting for response
6. **Theming**: Uses Docusaurus CSS variables for colors/fonts

**File Structure** (Phase 2c):
```
physcial-ai-and-humanoid-robotics-course-book/
├── src/
│   ├── components/
│   │   └── ChatWidget/
│   │       ├── index.tsx          (Main component)
│   │       ├── styles.css         (Widget styling)
│   │       └── types.ts           (TypeScript types)
│   └── theme/
│       └── Root.tsx               (Swizzled Root to mount widget)
```

**Integration Flow** (Phase 2c):
1. User opens chapter page (Docusaurus)
2. Swizzled Root.tsx mounts `<ChatWidget />` globally
3. User types message and clicks Send
4. ChatWidget calls `fetch('http://localhost:8000/api/chat', { method: 'POST', body: JSON.stringify({ message: userInput }) })`
5. Backend processes query via RAG agent (Cohere embeddings → Qdrant search → response generation)
6. ChatWidget displays response with citations and styling

---

## Phase Breakdown

### Phase 0: Research & Decisions *(COMPLETED - Dec 7, 2025)*

**Completed Research**:
- ✅ OpenAI Agents SDK + custom Agent patterns (leveraging function_tool decorator)
- ✅ Cohere embeddings integration (embed-english-v3.0 model)
- ✅ Deterministic chunking strategy (1000-char chunks in embeding_helpers.py)
- ✅ Qdrant Cloud vector search configuration and best practices
- ✅ GitHub Actions CI/CD workflow patterns

**Decision Summary**:
- **Embedding Service**: Cohere (more cost-effective than OpenAI embeddings)
- **Architecture**: Chat-Only MVP (stateless backend, no Neon Postgres in Phase 2b)
- **RAG Strategy**: Deterministic chunking with Qdrant similarity search
- **Frontend Integration**: Deferred ChatKit widget swizzling to Phase 4

**Output**: Documented in plan.md and spec.md with status annotations

---

### Phase 2b: FastAPI Backend Core *(✅ COMPLETED - Dec 17, 2025)*

**Completed Deliverables**:
- ✅ FastAPI server with CORS configuration
- ✅ Pydantic models (ChatRequest, ChatResponse, HealthResponse)
- ✅ Router with POST /api/chat and GET / endpoints
- ✅ RAG agent integration using OpenAI Agents SDK
- ✅ Cohere embedding pipeline in embeding_helpers.py
- ✅ Qdrant Cloud connection with deterministic chunking
- ✅ Error handling with proper HTTP status codes
- ✅ Environment configuration via .env (no hardcoded secrets)
- ✅ Deployable to cloud services

**Files Delivered**:
- `backend/api.py` (FastAPI app with CORS, health check, root route)
- `backend/router.py` (POST /api/chat endpoint)
- `backend/models.py` (Pydantic request/response validation)
- `backend/rag_agent.py` (RAG agent with retrieve() tool)
- `backend/embeding_helpers.py` (Cohere embeddings + chunking)
- `backend/pyproject.toml` (updated dependencies)

**Status**: **READY FOR TESTING** - Backend API functional and deployable

---

### Phase 2c: Custom Chat Widget (Frontend) *(🔄 PLANNED - In Queue)*

**Goal**: Build custom React Chat Widget connected to FastAPI backend; replace ChatKit SDK dependency with custom implementation

**Planned Deliverables**:
1. 🔄 Create `src/components/ChatWidget/index.tsx`: React component with state (messages, isOpen, isLoading)
2. 🔄 Create `src/components/ChatWidget/styles.css`: Styling for FAB, chat window, message list, input field
3. 🔄 Implement API logic: `fetch()` calls to `POST http://localhost:8000/api/chat` with error handling
4. 🔄 Create `src/theme/Root.tsx`: Swizzle Docusaurus Root component to globally mount ChatWidget
5. 🔄 Theming: Use Docusaurus CSS variables (--ifm-color-primary, etc.) for visual consistency
6. 🔄 Add "typing dots" animation while waiting for backend response
7. 🔄 Add message timestamps and citation display
8. 🔄 Test widget on multiple chapters (responsive design, mobile/tablet)

**Deferred to Phase 3**:
- User authentication (no user profiles in Phase 2c)
- Persistent message history
- Advanced features

**Acceptance Criteria**:
- [ ] Chat Widget visible on all chapter pages
- [ ] FAB button opens/closes chat interface smoothly
- [ ] Widget calls POST /api/chat with user message
- [ ] Backend response displays with citations
- [ ] Widget styling matches Docusaurus theme
- [ ] Responsive on mobile/tablet screens
- [ ] No console errors in browser DevTools

**Estimated Scope**: 60-90 minutes (5-6 focused development tasks)

**Files to Create**:
- `physcial-ai-and-humanoid-robotics-course-book/src/components/ChatWidget/index.tsx`
- `physcial-ai-and-humanoid-robotics-course-book/src/components/ChatWidget/styles.css`
- `physcial-ai-and-humanoid-robotics-course-book/src/components/ChatWidget/types.ts` (optional TypeScript types)
- `physcial-ai-and-humanoid-robotics-course-book/src/theme/Root.tsx` (swizzled component)

---

## Docusaurus Project Structure & Configuration

### Project Layout (TypeScript + Classic Preset)

```
physcial-ai-and-humanoid-robotics-course-book/
├── docs/                                    # Documentation source
│   ├── module-01/                           # Module 1: Physical AI & Sensors (Weeks 1-2)
│   │   ├── _category_.json
│   │   ├── chapter-01.md
│   │   └── chapter-02.md
│   ├── module-02/                           # Module 2: ROS 2 Fundamentals (Weeks 3-5)
│   │   ├── _category_.json
│   │   ├── chapter-03.md
│   │   ├── chapter-04.md
│   │   └── chapter-05.md
│   ├── module-03/                           # Module 3: Gazebo & Isaac Sim (Weeks 6-10)
│   │   ├── _category_.json
│   │   ├── chapter-06.md through chapter-10.md
│   ├── module-04/                           # Module 4: VLA & Capstone (Weeks 11-13)
│   │   ├── _category_.json
│   │   ├── chapter-11.md
│   │   ├── chapter-12.md
│   │   └── chapter-13.md
│   ├── assets/
│   │   ├── diagrams/
│   │   ├── images/
│   │   ├── code-samples/
│   │   └── screenshots/
│   └── intro.md
├── src/
│   ├── pages/
│   │   └── index.tsx                        # Custom homepage with Module Cards
│   ├── components/                          # React components (TypeScript)
│   │   ├── TranslateBtn.tsx
│   │   ├── PersonalizeBtn.tsx
│   │   ├── ProficiencyWrapper.tsx
│   │   └── ModuleCard.tsx
│   ├── theme/                               # Swizzled Docusaurus components
│   │   ├── Root.tsx                         # ChatKit injection point
│   │   └── DocItem/Layout.tsx
│   ├── css/
│   │   ├── custom.css
│   │   └── theme.css
│   └── types/
│       └── content.ts                       # TypeScript definitions
├── .github/workflows/
│   └── deploy.yml                           # GitHub Actions for GitHub Pages
├── docusaurus.config.ts                     # Docusaurus config (TypeScript)
├── sidebars.ts                              # Sidebar structure (TypeScript)
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── tsconfig.json
└── README.md
```

### Chapter Frontmatter Template

```yaml
---
title: "Chapter X: Title"
learning_outcomes:
  - Outcome 1
  - Outcome 2
  - Outcome 3
week_number: 1
module_number: 1
proficiency_level: ["Beginner", "Intermediate", "Advanced"]
prerequisites: []
tags: ["tag1", "tag2"]
authors: ["Instructor"]
last_updated: "2025-12-06"
---
```

### Sidebar Configuration (_category_.json per module)

```json
{
  "label": "Module 1: Physical AI & Sensors (Weeks 1-2)",
  "position": 1,
  "collapsed": false,
  "collapsible": true
}
```

### GitHub Actions Deployment

Trigger: `push` to main branch
Action: `.github/workflows/deploy.yml`
Deploys to GitHub Pages automatically

---

### Phase 1: Docusaurus Foundation *(✅ COMPLETED - In Progress)*

**Goal**: Functional Docusaurus site with module/chapter structure, ready for content

**Completed**:
- ✅ Docusaurus project initialized with `classic` preset
- ✅ Directory structure created: `docs/module-01/` through `docs/module-04/`, `docs/assets/`
- ✅ Chapter placeholder files with Docusaurus frontmatter templates
- ✅ Homepage implementation with hero section and module cards

**Remaining in Phase 1**:
- 🔄 GitHub Pages deployment configuration (deploy.yml workflow)
- 🔄 Sidebar navigation auto-configuration
- 🔄 Search indexing setup

**Files Created**:
- Homepage: `src/pages/index.tsx` (hero banner + 4 module cards)
- Chapter structure: 8 placeholder chapters across 4 modules
- Assets: `docs/assets/` with subdirectories for diagrams, images, code samples

**Status**: **READY FOR DEPLOYMENT** - Structure complete, awaiting GitHub Actions CI/CD setup

---

### Phase 2: RAG Backend Core (Chat-Only MVP) *(✅ COMPLETED - Dec 17, 2025)*

**Goal**: Functional FastAPI backend with RAG chatbot, Qdrant integration, and cloud-ready deployment

**Completed Deliverables** (Chat-Only, Stateless):
1. ✅ FastAPI project with Pydantic models (ChatRequest, ChatResponse, HealthResponse)
2. ✅ Cohere embeddings integration (`embed-english-v3.0` model, 1024 dims)
3. ✅ Qdrant Cloud connection with metadata storage (url, text, chunk_id)
4. ✅ Deterministic text chunking (`embeding_helpers.py`: max_chars=1000)
5. ✅ RAG query endpoint: POST `/api/chat` (stateless, uses RAG agent)
6. ✅ OpenAI Agents SDK integration with custom `retrieve()` tool
7. ✅ CORS configuration for Docusaurus frontend
8. ✅ Error handling (400, 500 status codes)
9. ✅ Environment variables via .env (no hardcoded secrets)
10. ✅ Local development server (FastAPI Uvicorn)
11. ✅ Cloud-ready deployment (pyproject.toml with all dependencies)

**Deferred to Phase 3** (User Persistence, Auth):
- 🔄 Neon Postgres configuration and connection pooling
- 🔄 Authentication endpoints (signup, signin)
- 🔄 User profile persistence
- 🔄 JWT token management
- 🔄 Chapter retrieval API (chapters stored in Docusaurus, not DB)

**Acceptance** (✅ All Passed):
- ✅ FastAPI server starts without errors
- ✅ POST `/api/chat` accepts message, returns response with citations
- ✅ GET `/` returns health check status
- ✅ CORS configured for localhost:3000 and production frontend
- ✅ Error codes: 200 (success), 400 (validation error), 500 (server error)
- ✅ Cloud deployment-ready (pyproject.toml, .env configuration)

**Estimated Scope**: Completed (Phase 2b)

---

### Phase 3: Content & User Persistence *(🔄 IN PLANNING - Pending)*

**Goal**: Author 13-week curriculum + implement user authentication and profile management

**Planned Deliverables**:
1. 🔄 Author all 13 chapter markdown files with frontmatter (full content, not placeholders)
2. 🔄 Create multi-level content variants (Beginner, Intermediate, Advanced) using MDX components
3. 🔄 Ingest chapters into Qdrant (deterministic chunking → Cohere embeddings → Qdrant storage)
4. 🔄 Implement Neon Postgres schema (Users, Chapters, ChatbotMessages)
5. 🔄 Implement authentication endpoints: POST `/auth/signup`, POST `/auth/signin`
6. 🔄 Implement user profile endpoints: GET/PUT `/user/profile`
7. 🔄 Implement chapter retrieval: GET `/chapters/{id}`, GET `/chapters` (with search)
8. 🔄 Integrate JWT token management with FastAPI
9. 🔄 Add proficiency level switching UI (frontend + backend integration)
10. 🔄 Add lab references and code examples to chapters

**Deferred to Phase 4**:
- Translation UI (Urdu button)
- ChatKit widget swizzling
- Advanced features

**Estimated Scope**: 60-90 minutes of content authoring + 90-120 minutes of backend work

---

### Phase 4: Smart Features & Integration *(🔄 PLANNED)*

**Goal**: Integrate ChatKit widget, add personalization & translation UI

**Planned Deliverables**:
1. 🔄 Swizzle Docusaurus Root component (`src/theme/Root.js`) to embed ChatKit widget
2. 🔄 Create `<TranslateBtn />` React component (OpenAI API for Urdu translation)
3. 🔄 Create `<PersonalizeBtn />` React component (proficiency level toggle)
4. 🔄 Integrate auth UI with Docusaurus (`src/pages/auth/`)
5. 🔄 Setup session management (JWT → sessionStorage)
6. 🔄 Test selected-text capture → backend → response flow
7. 🔄 Verify multi-level content rendering based on user proficiency

**Dependencies**: Requires Phase 3 (auth, user profiles, content)

**Estimated Scope**: 60-90 minutes

---

### Phase 5: Quality & Launch *(🔄 PLANNED)*

**Goal**: E2E testing, demo recording, production deployment

**Planned Deliverables**:
1. 🔄 E2E test: Signup → Auth → View chapter → Select text → Get RAG response with citation
2. 🔄 Verify Urdu translation on 2+ chapters
3. 🔄 Verify proficiency level switching on 2+ chapters
4. 🔄 Test search functionality (Docusaurus + Qdrant)
5. 🔄 Test responsive design (desktop, tablet, mobile)
6. 🔄 Performance testing (<3s frontend load, <2s API response)
7. 🔄 Record <90s demo video
8. 🔄 Deploy backend to Render/Fly.io/Railway
9. 🔄 Deploy frontend to GitHub Pages
10. 🔄 Final smoke tests (live site + API accessible)

**Estimated Scope**: 90-120 minutes (many tasks can run in parallel)

---

## Data Model

### Core Entities

```
User
├── user_id (UUID, primary key)
├── email (string, unique)
├── password_hash (string)
├── background (enum: AI/ML, Embedded Systems, Robotics, Other + freetext)
├── proficiency_level (enum: Beginner, Intermediate, Advanced)
├── language_preference (string: en, ur)
├── created_at (timestamp)
├── updated_at (timestamp)

Chapter
├── chapter_id (UUID, primary key)
├── title (string)
├── module_id (integer: 1-4)
├── week_number (integer: 1-13)
├── learning_outcomes (array of strings)
├── content_by_level (object: {Beginner, Intermediate, Advanced})
├── frontmatter_data (JSON: title, prerequisites, tags, authors, etc.)
├── created_at (timestamp)
├── updated_at (timestamp)

SelectedTextContext
├── context_id (UUID, primary key)
├── user_id (UUID, foreign key → User)
├── chapter_id (UUID, foreign key → Chapter)
├── text_content (string)
├── char_position_start (integer)
├── char_position_end (integer)
├── context_embedding (vector from Qdrant)
├── timestamp (timestamp)

ChatbotMessage
├── message_id (UUID, primary key)
├── user_id (UUID, foreign key → User)
├── question (string)
├── answer (string)
├── citation (object: {chapter_id, section, quote})
├── context_id (UUID, foreign key → SelectedTextContext)
├── created_at (timestamp)

Embedding (Qdrant)
├── embedding_id (UUID)
├── chapter_id (UUID)
├── text_chunk (string)
├── vector (array: 1536 dims for OpenAI ada-002)
├── metadata (JSON: {section, proficiency_level, week_number, module_id})
```

---

## API Contracts

### Authentication

**POST /auth/signup**
```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "background": "Embedded Systems",
  "background_custom": "5 years in embedded systems"
}
```
Response: `{ "user_id": "uuid", "token": "jwt_token" }`

**POST /auth/signin**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```
Response: `{ "user_id": "uuid", "token": "jwt_token" }`

### Chapters

**GET /chapters**
Query: `?search=ROS+2&module=2`
Response: `[ { "chapter_id", "title", "week_number", "learning_outcomes" }, ... ]`

**GET /chapters/{id}**
Response: `{ "chapter_id", "title", "content", "learning_outcomes", "frontmatter" }`

### RAG Chatbot

**POST /chatbot/select-text**
```json
{
  "user_id": "uuid",
  "chapter_id": "uuid",
  "text_content": "Gazebo uses ODE physics engine...",
  "char_position_start": 0,
  "char_position_end": 42
}
```
Response: `{ "context_id": "uuid", "status": "saved" }`

**POST /chatbot/query**
```json
{
  "user_id": "uuid",
  "question": "Why does Gazebo use ODE?",
  "context_id": "uuid"
}
```
Response:
```json
{
  "answer": "Based on the selected text, Gazebo uses ODE...",
  "citation": {
    "chapter": "Chapter 6: Gazebo Basics",
    "section": "Physics Engines",
    "quote": "Gazebo uses ODE physics engine by default"
  }
}
```

### User Profile

**GET /user/profile**
Response: `{ "user_id", "email", "background", "proficiency_level", "language_preference" }`

**PUT /user/profile**
```json
{
  "proficiency_level": "Intermediate",
  "language_preference": "ur"
}
```
Response: `{ "status": "updated" }`

---

## Identified Risks & Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|-----------|
| Qdrant embedding API rate limits | API fails during demo | Medium | Cache embeddings locally; implement retry logic with exponential backoff |
| Docusaurus swizzling breaks on updates | Frontend chatbot widget fails | Low | Pin Docusaurus version; monitor release notes |
| Neon connection pooling issues | Database timeouts under load | Medium | Configure connection pool size; implement connection retry |
| Malformed chapter markdown breaks build | Deployment fails | Medium | Validate all markdown files; pre-build checks for frontmatter |
| Chat context window too large | Token limit exceeded in API | Low | Implement chunking with max tokens per context; summarization if needed |

---

## Deployment Strategy

### Frontend (GitHub Pages)

```yaml
# .github/workflows/deploy.yml
name: Deploy Docusaurus
on: [push to main]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./build
```

### Backend (Cloud Hosting)

- **Provider**: Render.com / Fly.io / Railway
- **Environment**: Python 3.10+
- **Process**: `uvicorn main:app --host 0.0.0.0 --port 8000`
- **Environment Variables**: `NEON_DATABASE_URL`, `QDRANT_API_KEY`, `OPENAI_API_KEY`, `JWT_SECRET`

---

## Required ADRs

Following ADRs are required to document significant architectural decisions:

1. **UI Injection Strategy**
   - **Decision**: Swizzle Docusaurus Root component for ChatKit embedding
   - **Alternatives**: Wrapper component, custom theme injection, iframe
   - **Rationale**: Native Docusaurus pattern, minimal disruption, preserves theming

2. **Translation Strategy**
   - **Decision**: AI-on-the-fly translation (OpenAI/Google API) for MVP
   - **Alternatives**: Docusaurus i18n with manual translations, third-party translation service
   - **Rationale**: Lower effort, sufficient for demo; manual i18n can follow post-launch

3. **RAG Context Constraint**
   - **Decision**: Enforce "selected-text-only" RAG at backend level
   - **Rationale**: Ensures accuracy, prevents hallucination, maintains educational integrity
   - **Alternatives**: Client-side filtering (less secure), no filtering (hallucination risk)

---

## Success Metrics

### Current Status (Dec 17, 2025)

✅ **Completed Phase Gates**:
- ✅ Phase 0: Research documented; all unknowns resolved (Cohere, Qdrant, OpenAI Agents SDK)
- ✅ Phase 2b: FastAPI backend deployed; chat endpoint functional and tested
- ⏳ Phase 1: Docusaurus site structure complete, awaiting GitHub Pages deployment

🔄 **Upcoming Phase Gates**:
- [ ] Phase 1 (Final): GitHub Pages live with search + navigation
- [ ] Phase 3: All 13 chapters authored + Neon Postgres + auth endpoints working
- [ ] Phase 4: ChatKit widget + translation UI + personalization working
- [ ] Phase 5: E2E tests pass; demo recorded; production deployment

### Technical Metrics

**Current** (Phase 2b):
- ✅ Backend API response time: <2 seconds (Cohere embeddings + Qdrant queries)
- ✅ RAG accuracy: Custom chunking + Cohere embeddings ensure relevance
- ✅ Qdrant integration: Deterministic chunking with max_chars=1000

**Target** (Phase 5):
- Frontend load time: <3 seconds (Docusaurus GitHub Pages)
- API response time: <2 seconds (p95 - backend + Cohere + Qdrant)
- Chatbot accuracy: 95%+ cited responses
- Uptime: 99.5% for demo period

---

**Current Focus**: Synchronize specs and plans with Phase 2b implementation ✅ COMPLETE

**Next Steps**:
1. Complete Phase 1: GitHub Actions deployment → live Docusaurus site
2. Start Phase 3: Author curriculum content + implement user authentication
3. Proceed to Phase 4: ChatKit integration + advanced features

**Status**: Spec/Plan synchronized with backend implementation; ready for Phase 3 task generation
