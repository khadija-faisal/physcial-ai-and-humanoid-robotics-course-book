---
id: 005
title: Frontend pivot - Custom React Chat Widget replaces ChatKit SDK
stage: green
date: 2025-12-17
surface: agent
model: claude-haiku-4-5-20251001
feature: 1-rag-platform
branch: main
user: wajiz.pk
command: /sp.implement
labels: ["frontend-pivot", "custom-widget", "architecture-change"]
links:
  spec: specs/1-rag-platform/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - .specify/memory/constitution.md
  - specs/1-rag-platform/spec.md
  - specs/1-rag-platform/plan.md
  - specs/1-rag-platform/tasks.md
tests:
  - Constitution updated with custom widget requirement
  - Spec requirements aligned with custom React widget
  - Plan includes detailed Custom Widget Integration section
  - Tasks include Phase 2c with 10 atomic frontend tasks
---

## Prompt

```text
/sp.implement We are pivoting the Frontend Strategy. We will NOT use the "ChatKit SDK" as originally planned. Instead, we are building a "Custom React Chat Widget" to connect with our existing FastAPI backend.

Please READ the following files to understand the current state:
1. `backend/api.py` (Our live backend)
2. `spec.md`, `plan.md`, `tasks.md` (Current docs containing outdated ChatKit info)
3. `.specify/memory/constitution.md` (Project rules)

Then, UPDATE all documentation to reflect this change:

### 1. Update `spec.md` & `constitution.md`
- **Remove** all requirements related to "ChatKit", "OpenAI ChatKit SDK", or "Sessions".
- **Add** requirement: "Frontend must use a Custom React Chat Widget connected to `POST /api/chat`."
- **Update Tech Stack**: Explicitly state we are using **Cohere** (embeddings), **Qdrant**, and **FastAPI**.

### 2. Update `plan.md`
- **Architecture**: Replace the "ChatKit Embedding" section with **"Custom Widget Integration"**.
- **Integration Point**: Describe swizzling the Docusaurus `<Root>` component to mount a custom floating chat interface.
- **Frontend Folder**: Note that frontend work happens in `physcial-ai-and-humanoid-robotics-course-book/`.

### 3. Update `tasks.md` (The Action Plan)
- **Mark Completed**: All "Phase 2b" backend tasks are `[x]`.
- **Prune**: DELETE any future tasks referencing ChatKit or Auth (deferred).
- **Create "Phase 2c: Frontend Integration"** with these atomic tasks:
  1. Create `src/components/ChatWidget/styles.css`: CSS for floating button (FAB), chat window, and "typing dots" animation.
  2. Create `src/components/ChatWidget/index.tsx`: React state for open/close, input handling, and message list.
  3. Implement API Logic: Use `fetch` to call `http://localhost:8000/api/chat` and handle the JSON response.
  4. Swizzle Root: Create `src/theme/Root.tsx` to mount `<ChatWidget />` globally.
  5. Theming: Use Docusaurus CSS variables (e.g., `--ifm-color-primary`) to match the book's design.

**Goal**: Eliminate all "ChatKit" confusion. The plan must clearly show we are building a custom UI for our custom backend.
```

## Response snapshot

### Strategic Pivot Summary

The project is moving away from the ChatKit SDK (third-party dependency) to a **custom-built React Chat Widget** that directly connects to the FastAPI backend. This eliminates vendor lock-in and provides full control over the UI/UX.

**Key Changes Across All Artifacts**:

#### 1. Constitution (`constitution.md`)
- Updated Project Context: Explicit tech stack with custom React widget (NOT ChatKit SDK)
- Updated AI Integration: OpenAI Agents SDK for backend + custom React component for frontend
- Frontend = Docusaurus v3 + Custom React Chat Widget
- Embeddings = Cohere (embed-english-v3.0)
- Vector DB = Qdrant Cloud
- No mention of ChatKit SDK anymore

#### 2. Specification (`spec.md`)
- **Removed**: All ChatKit-related FRs and assumptions
- **Updated FR-040**: Now specifies "Custom React Chat Widget" connected to POST /api/chat
- **Added FR-043 through FR-049**: 7 new requirements for custom widget
  - TypeScript component with React hooks
  - Floating action button (FAB) UI pattern
  - Message history display with timestamps
  - API integration to POST /api/chat
  - Docusaurus CSS variable theming
  - "Typing dots" loading animation
  - Root component swizzling for global mount
- **Updated Success Criteria**: Added SC-016 through SC-019 for widget testing
- **Renumbered Skills FRs**: FR-050, FR-051, FR-052 (was FR-043, FR-044, FR-045)

#### 3. Plan (`plan.md`)
- **Replaced "ChatKit Embedding"** with "Custom Widget Integration Architecture"
- **Detailed Section**: Technology stack, widget features, file structure (Phase 2c)
- **Integration Flow**: Step-by-step flow from user input → Docusaurus → ChatWidget → FastAPI → Cohere → Qdrant → Response
- **Added Phase 2c Section**: "Custom Chat Widget (Frontend)" as PLANNED phase
  - Deliverables: 8 planned items (component, styling, API logic, swizzling, theming, etc.)
  - Acceptance criteria: 7 acceptance tests (visibility, FAB interaction, API calls, theming, responsiveness)
  - Estimated scope: 60-90 minutes
  - File structure: 4 files to create (index.tsx, styles.css, types.ts, Root.tsx)

#### 4. Tasks (`tasks.md`)
- **Added Phase 2c: Custom React Chat Widget (Frontend Integration)**
- **10 Atomic Tasks (T045-T054)**:
  - **T045**: Create styles.css (FAB, chat window, message bubbles, animations, theming)
  - **T046**: Create index.tsx component (React hooks, state management)
  - **T047**: Implement API integration (fetch logic, error handling, response parsing)
  - **T048**: Create types.ts (TypeScript interfaces, optional)
  - **T049**: Create Root.tsx (Docusaurus swizzle, global mount)
  - **T050**: Build & verify locally (no compilation errors)
  - **T051**: Test widget interaction (FAB, send message, response display)
  - **T052**: Test responsive design (desktop, tablet, mobile)
  - **T053**: Test theming (light/dark modes, CSS variables)
  - **T054**: Test error handling (offline, validation, timeouts)
- **Parallelization**: T045, T046, T047 can run in parallel (all ~45 min total)
- **Estimated Effort**: 60-90 minutes single developer

### Outcomes

✅ **All Documentation Aligned**:
- Constitution: Project rules updated for custom widget
- Specification: 7 new FRs + 4 new success criteria for widget
- Plan: Detailed Custom Widget Integration section + Phase 2c overview
- Tasks: 10 atomic frontend tasks ready for implementation

✅ **Zero ChatKit References**:
- Removed from constitution, spec, plan, tasks
- No vendor lock-in on third-party chat SDKs
- Full ownership of frontend UI/UX

✅ **Clear Frontend Roadmap**:
- Phase 2c (60-90 min): Build custom widget
- Phase 3: Curriculum content + user authentication
- Phase 4: Advanced features (personalization, translation)
- Phase 5: Deployment & E2E testing

## Outcome

- ✅ Impact: **Strategic pivot eliminates ChatKit SDK dependency**. Project now owns entire tech stack (FastAPI backend + custom React frontend). Simplifies deployment and maintenance.
- 🧪 Tests: **All 4 documents updated and validated** for consistency. No contradictions between spec, plan, and tasks.
- 📁 Files: **4 files modified** (constitution, spec, plan, tasks) with comprehensive ChatKit removal + custom widget requirements.
- 🔁 Next prompts: Phase 2c frontend implementation (`/sp.implement` with Phase 2c tasks)
- 🧠 Reflection: Frontend strategy is now clear and ownership-based. Custom widget provides full control over UI/UX, integrates seamlessly with Docusaurus, and connects directly to the RAG backend.

## Evaluation notes (flywheel)

- Failure modes observed: **None**—pivot is clean with no remaining ChatKit references.
- Graders run and results: **PASS**—All documents now reflect custom widget strategy.
- Prompt variant: **N/A**—Single-pass documentation update successful.
- Next experiment: **Phase 2c task execution** to build the custom React Chat Widget.
