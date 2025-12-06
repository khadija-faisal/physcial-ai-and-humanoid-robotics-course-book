# Implementation Plan: Physical AI & Humanoid Robotics Learning Platform

**Feature Branch**: `1-rag-platform`
**Created**: 2025-12-06
**Status**: Draft
**Specification**: [spec.md](./spec.md)

---

## Executive Summary

This plan outlines the development of a Physical AI & Humanoid Robotics learning platform combining Docusaurus v3 (frontend) with FastAPI + OpenAI Agents SDK + Qdrant (backend). The platform features a "selected-text-only" RAG chatbot, multi-level content personalization, and internationalization (Urdu bonus).

**Core Architecture**:
- **Frontend**: Docusaurus v3 with React + MDX, Swizzled Root component for ChatKit embedding
- **Backend**: FastAPI + Neon Postgres + Qdrant + OpenAI Agents SDK (Chatkit)
- **Integration**: ChatKit floating widget globally embedded via Docusaurus Root component swizzling
- **Deployment**: GitHub Pages (frontend) + Cloud (Backend)

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

**Technology Stack**: FastAPI + Neon Postgres + Qdrant + OpenAI Agents SDK

**Key Decisions**:

1. **API Design**: RESTful with OpenAI Agents SDK integration for ChatKit
   - Endpoints: `/auth/signup`, `/auth/signin`, `/chapters/{id}`, `/chatbot/query`, `/chatbot/select-text`, `/user/profile`
   - Models: Pydantic for request/response validation

2. **User Authentication**: Better-Auth with email/password + hardware background context
   - Database: Neon Postgres (user_id, email, password_hash, background, proficiency_level, language_preference)
   - Sessions: JWT tokens with expiration (configurable, e.g., 7 days)

3. **RAG Pipeline**: Deterministic text chunking + OpenAI embeddings + Qdrant
   - **Ingestion**: Python script reads MDX files from `docs/`, chunks deterministically (sliding window), embeds with OpenAI, stores in Qdrant with metadata (chapter_id, section, proficiency_level)
   - **Query**: User selects text → stored as SelectedTextContext → embedded with OpenAI → Qdrant similarity search → cited response via Chatkit
   - **Deterministic Chunking**: Fixed window size (e.g., 1024 tokens) with overlap (e.g., 128 tokens) to ensure reproducible embeddings

4. **Selected-Text-Only Constraint**:
   - Frontend captures selected text + char positions → sends to backend
   - Backend stores context in Neon with user_id, chapter_id, text_content
   - Chatkit query checks: if no selected context, return "Please select text..."
   - All responses include citation (chapter, section, or direct quote)

5. **Personalization**: Store proficiency level + render via React component on frontend
   - User switches level via button → frontend filters content → API updates user preference
   - Content variants: Use conditional rendering in MDX or separate content blocks per level

6. **Internationalization (Bonus)**:
   - **Option A**: Docusaurus i18n + manual translations (more effort, better UX)
   - **Option B**: AI-on-the-fly translation via OpenAI API (lower effort, sufficient for demo)
   - **Selected**: Option B for MVP (Google Translate API or OpenAI) with note that manual i18n can follow

7. **Error Handling**:
   - All endpoints return standard HTTP codes (200, 400, 401, 404, 500)
   - Clear error messages for: missing auth token, invalid chapter_id, no selected text, Qdrant unavailable, API rate limits
   - Graceful degradation: if Qdrant fails, return "Service temporarily unavailable"

### Integration Point: ChatKit Embedding

**Method**: Swizzle Docusaurus Root component

```jsx
// src/theme/Root.js (swizzled)
import { ChatKit } from '@openai/chatkit-sdk';

export default function Root({ children }) {
  return (
    <>
      {children}
      <ChatKit
        apiEndpoint={process.env.BACKEND_API_URL}
        userId={userIdFromSessionStorage}
        theme="light|dark"
      />
    </>
  );
}
```

**Flow**:
1. Learner selects text on chapter page
2. ChatKit widget listens to selection event
3. Selected text passed to ChatKit → API call to backend `/chatbot/query`
4. Backend checks SelectedTextContext, queries Qdrant, returns cited response
5. ChatKit displays response in floating widget

---

## Phase Breakdown

### Phase 0: Research & Decisions *(Parallel)*

**Unknowns to Resolve**:
- [ ] Docusaurus v3 Swizzling patterns for root component injection
- [ ] OpenAI Agents SDK + Chatkit SDK documentation and best practices
- [ ] Deterministic chunking strategy (token count, overlap)
- [ ] Neon Postgres connection pooling for FastAPI
- [ ] GitHub Actions workflow for Docusaurus deployment to GitHub Pages

**Research Tasks** (to be dispatched to agents):
1. Research: Docusaurus v3 Swizzling for React Root component injection
2. Research: OpenAI Agents SDK and Chatkit SDK integration patterns
3. Research: Qdrant vector search configuration and best practices
4. Research: FastAPI + Neon Postgres connection pooling
5. Research: GitHub Actions CI/CD for Docusaurus

**Output**: `research.md` (consolidates findings, decisions made)

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

### Phase 1: Docusaurus Foundation (The Engine)

**Goal**: Functional Docusaurus site with module/chapter structure, ready for content

**Deliverables**:
1. Initialize Docusaurus project with `classic` preset
2. Configure `docusaurus.config.js`: title, URL, theme, i18n locales (en, ur)
3. Create directory structure: `docs/module-01/` through `docs/module-04/`, `docs/assets/`
4. Create `sidebars.js` with module → chapter mapping
5. Create sample frontmatter template in `docs/module-01/chapter-01.md` (Weeks 1-2 intro)
6. Configure GitHub Pages deployment via `docusaurus.config.js` (baseUrl, organizationName, projectName)
7. Create GitHub Actions workflow: `.github/workflows/deploy.yml`
8. Deploy to GitHub Pages (verify live)

**Acceptance**:
- [ ] Site loads on GitHub Pages without errors
- [ ] Navigation shows 4 modules + 13 chapter placeholders
- [ ] Breadcrumb displays correctly
- [ ] Sidebar collapses/expands module sections
- [ ] Search indexing works

**Estimated Scope**: 3-4 tasks (15-45 min each)

---

### Phase 2: RAG Backend Core (The Brain)

**Goal**: Functional FastAPI backend with auth, Qdrant integration, and ChatKit readiness

**Deliverables**:
1. Setup FastAPI project with Pydantic models for validation
2. Configure Neon Postgres connection (connection string from `.env`)
3. Create database schema: Users, Chapters, SelectedTextContext, ChatbotMessages
4. Implement authentication endpoints: POST `/auth/signup`, POST `/auth/signin`, GET `/user/profile`
5. Implement chapter endpoints: GET `/chapters/{id}`, GET `/chapters` (with search)
6. Setup Qdrant Cloud connection + test connectivity
7. Implement deterministic text chunking script (`scripts/chunk_and_embed.py`)
8. Implement RAG query endpoint: POST `/chatbot/query` (input: selected_text, question; output: answer + citation)
9. Implement text selection storage: POST `/chatbot/select-text` (stores SelectedTextContext in Neon)
10. Create `requirements.txt` with all dependencies (FastAPI, Pydantic, Neon, Qdrant, OpenAI SDK, Chatkit)
11. Setup local development server (FastAPI Uvicorn)
12. Deploy to cloud (Render/Fly.io/Railway) with environment variables

**Acceptance**:
- [ ] FastAPI server starts without errors
- [ ] POST `/auth/signup` creates user in Neon
- [ ] POST `/auth/signin` returns JWT token
- [ ] GET `/chapters/{id}` returns chapter data
- [ ] POST `/chatbot/select-text` stores context in Neon
- [ ] POST `/chatbot/query` returns cited response from Qdrant
- [ ] All endpoints return proper error codes (400, 401, 404, 500)
- [ ] Server deployed live and accessible

**Estimated Scope**: 8-12 tasks (15-45 min each)

---

### Phase 3: Content & Curriculum (The Data)

**Goal**: 13-week curriculum authored with multi-level content variants

**Deliverables**:
1. Create all 13 chapter markdown files with frontmatter:
   - Module 1 (Weeks 1-2): Chapter 1-2 (Physical AI & Sensors)
   - Module 2 (Weeks 3-5): Chapter 3-5 (ROS 2 Fundamentals)
   - Module 3 (Weeks 6-10): Chapter 6-10 (Gazebo & Isaac Sim)
   - Module 4 (Weeks 11-13): Chapter 11-13 (VLA & Capstone)
2. For each chapter: Beginner, Intermediate, Advanced variants (use `<ProficiencyWrapper>` components)
3. Add learning outcomes, prerequisites, tags to frontmatter
4. Add code examples (stored in `docs/assets/code-samples/`)
5. Add diagrams/images (stored in `docs/assets/diagrams/` and `docs/assets/images/`)
6. Add lab references (linked to external lab environments)
7. Add safety admonitions (:::warning) for robotics-specific safety
8. Ingest all chapters into Qdrant (run `scripts/chunk_and_embed.py`)

**Acceptance**:
- [ ] All 13 chapters published and navigable
- [ ] Each chapter has Beginner, Intermediate, Advanced variants
- [ ] All chapters searchable (content indexed in Docusaurus + Qdrant)
- [ ] All code examples syntax-highlighted
- [ ] All images render correctly
- [ ] Safety warnings visible

**Estimated Scope**: 13 chapter tasks + ingestion (15-45 min per chapter)

---

### Phase 4: Smart Features (MDX & Swizzling)

**Goal**: Embed ChatKit widget, add personalization/translation buttons, integrate auth

**Deliverables**:
1. Swizzle Docusaurus Root component (`src/theme/Root.js`) to embed ChatKit widget
2. Create React component: `<TranslateBtn />` (calls OpenAI API for Urdu translation)
3. Create React component: `<PersonalizeBtn />` (toggles proficiency level)
4. Add `<TranslateBtn />` and `<PersonalizeBtn />` to chapter layouts (MDX or component wrapping)
5. Integrate Better-Auth with custom auth page in `src/pages/auth/`
6. Setup user session management (JWT from backend, stored in sessionStorage)
7. Create custom CSS for ChatKit widget styling (match theme)
8. Test selected-text capture → backend → response flow

**Acceptance**:
- [ ] ChatKit widget visible on all chapter pages
- [ ] Selected text passed to ChatKit correctly
- [ ] TranslateBtn translates Urdu correctly
- [ ] PersonalizeBtn switches between proficiency levels
- [ ] Auth page signup/signin works
- [ ] User session persists across page reloads
- [ ] Responses include proper citations

**Estimated Scope**: 6-8 tasks (15-45 min each)

---

### Phase 5: Quality & Launch (Polish & Demo)

**Goal**: Verify all features work, record demo, deploy

**Deliverables**:
1. E2E test: Signup → Auth → View chapter → Select text → Get RAG response with citation
2. Verify Urdu translation on 2+ chapters
3. Verify proficiency level switching on 2+ chapters
4. Test search functionality (query chapters, learning outcomes, tags)
5. Test responsive design on mobile/tablet
6. Test error handling (missing auth, invalid chapter, no selected text, API failures)
7. Performance testing (frontend load <3s, API response <2s)
8. Record <90s demo video: navigation → auth → RAG interaction → bonus features
9. Deploy both frontend and backend live
10. Final verification (live site + API accessible)

**Acceptance**:
- [ ] All user stories pass E2E tests
- [ ] Demo video <90s
- [ ] No critical errors in live deployment
- [ ] All success criteria met

**Estimated Scope**: 10+ tasks (15-45 min each, many in parallel)

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

✅ Phase-wise gate completion:
- [ ] Phase 0: Research.md complete; all unknowns resolved
- [ ] Phase 1: Docusaurus site live on GitHub Pages
- [ ] Phase 2: FastAPI backend deployed; all endpoints functional
- [ ] Phase 3: All 13 chapters with multi-level content live + ingested to Qdrant
- [ ] Phase 4: ChatKit widget + personalization + auth working
- [ ] Phase 5: E2E tests pass; <90s demo recorded; all success criteria met

✅ Technical metrics:
- API response time: <2 seconds (p95)
- Frontend load time: <3 seconds
- Chatbot accuracy: 95% cited responses
- Uptime: 99.5% for demo period

---

**Next Steps**: Execute Phase 0 research, then proceed phase-by-phase with completion gates.

**Status**: Ready for task breakdown via `/sp.tasks`
