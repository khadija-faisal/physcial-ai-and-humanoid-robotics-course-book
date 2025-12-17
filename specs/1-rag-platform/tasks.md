# Task List: Homepage Implementation
**Feature**: Physical AI & Humanoid Robotics Learning Platform
**Feature Branch**: `1-rag-platform`
**Created**: 2025-12-07
**Status**: Ready for Implementation

---

## Overview

This task list focuses on **Homepage Implementation** for the Docusaurus-based learning platform. The goal is to create a compelling landing page with a hero section and module grid that guides learners into the curriculum.

**Scope**: Homepage visual design and structure only (Phase 1)
**Total Tasks**: 3 core tasks
**Estimated Effort**: 45-90 minutes total

---

## Phase 1: Homepage Implementation

### Story Context
**User Story**: Learner accesses structured curriculum content (US1 - Priority P1)

The homepage is the entry point to the platform. It must clearly showcase the learning path and enable quick navigation to the 4 modules (Weeks 1-13).

### Success Criteria (Acceptance Tests)
- [ ] Hero banner displays with title, subtitle, and CTA button
- [ ] Hero button links to `/docs/intro` and navigates correctly
- [ ] Module grid displays exactly 4 cards with correct titles and links
- [ ] Cards are responsive and stack on mobile/tablet screens
- [ ] Links are accurate: `/docs/module-01-physical-ai/week-01-intro`, `/docs/module-02-ros2/week-03-nodes`, `/docs/module-03-simulation/week-06-gazebo`, `/docs/module-04-humanoid/week-11-walking`
- [ ] Homepage loads without errors when site builds

---

## Tasks

### Setup Phase

- [ ] T001 Read `src/pages/index.tsx` to understand current default Docusaurus homepage structure and identify content to replace

### Core Implementation

- [ ] T002 [P] Clear Default Content: Remove default Docusaurus tutorial header, links, and components from `src/pages/index.tsx`

- [ ] T003 [P] Implement Hero Section: Add Hero Banner component in `src/pages/index.tsx` with:
  - Title: "Physical AI & Humanoid Robotics Textbook"
  - Subtitle: "Master ROS 2, NVIDIA Isaac Sim, and VLA Systems."
  - Call-to-Action button: "Start Reading" that links to `/docs/intro`
  - Responsive styling (full width on desktop, appropriate sizing on mobile)
  - Optional: Add gradient background or branding colors

- [ ] T004 [P] Implement Module Grid: Add responsive grid component in `src/pages/index.tsx` displaying 4 module cards with:
  - **Card 1**: Title: "Module 1: Foundations" | Link: `/docs/module-01-physical-ai/week-01-intro`
  - **Card 2**: Title: "Module 2: ROS 2" | Link: `/docs/module-02-ros2/week-03-nodes`
  - **Card 3**: Title: "Module 3: Simulation" | Link: `/docs/module-03-simulation/week-06-gazebo`
  - **Card 4**: Title: "Module 4: Humanoids" | Link: `/docs/module-04-humanoid/week-11-walking`
  - Grid layout: 2x2 on desktop, 1 column on mobile
  - Each card includes icon or visual element (optional but recommended)
  - Hover effects to indicate interactivity

### Verification & Testing

- [ ] T005 Build site locally and verify homepage renders correctly: `npm run start`

- [ ] T006 Verify all links work:
  - "Start Reading" button navigates to `/docs/intro`
  - Module Card 1 → `/docs/module-01-physical-ai/week-01-intro`
  - Module Card 2 → `/docs/module-02-ros2/week-03-nodes`
  - Module Card 3 → `/docs/module-03-simulation/week-06-gazebo`
  - Module Card 4 → `/docs/module-04-humanoid/week-11-walking`

- [ ] T007 Test responsive design:
  - Desktop (1920x1080): Hero and grid displayed side-by-side or stacked correctly
  - Tablet (768x1024): Grid columns reduced to 2 or fewer
  - Mobile (375x667): Single column grid, readable text, buttons are touch-sized

---

## Dependencies & Prerequisites

**Prerequisites**:
- Docusaurus v3 project is initialized and running locally
- Directory structure exists: `docs/module-01/`, `docs/module-02/`, `docs/module-03/`, `docs/module-04/`
- `src/pages/` directory exists
- `docs/intro.md` file exists (even if placeholder)

**No upstream dependencies**: This task is independent and can be completed in parallel with backend/content development.

---

## File Locations & Structure

**Primary File**:
- `src/pages/index.tsx` — Main homepage component (TypeScript + React/JSX)

**Optional Supporting Files** (if needed):
- `src/css/custom.css` — Custom CSS for hero and grid styling
- `src/components/ModuleCard.tsx` — Reusable module card component (if extracted for reuse)

---

## Implementation Notes

1. **Component Structure**:
   - Use React with Docusaurus layout wrapper (`Layout` component from Docusaurus)
   - Hero section: Simple JSX with text + button
   - Grid: CSS Grid or Flexbox for responsive layout
   - Module cards: Can be inline JSX or extracted as separate component

2. **Styling**:
   - Use Docusaurus CSS Variables (e.g., `var(--ifm-color-primary)`) for consistency with theme
   - Mobile-first approach: Start with mobile styles, add breakpoints for tablet/desktop
   - Ensure accessibility: Proper heading hierarchy (h1 for title), alt text for images

3. **Links**:
   - Use Docusaurus `Link` component from `@docusaurus/router` for client-side navigation
   - Or use standard `<a>` tags with proper href paths (relative to `/`)

4. **Testing**:
   - No unit tests required (stateless UI component)
   - Manual testing via browser is sufficient for MVP
   - Verify all links resolve without 404 errors

---

## Parallel Execution Opportunity

**T002**, **T003**, and **T004** can be executed in parallel if working with multiple developers or in a single developer workflow by batching similar work:
- Developer A: T002 (clear content) + T003 (hero section)
- Developer B: T004 (module grid) in parallel
- Both then run T005-T007 sequentially for integration testing

For a single developer: Execute T002 → T003 → T004 sequentially (total ~60-90 minutes), then run T005-T007 for verification.

---

## Acceptance Checklist

Before marking this feature complete:

- [ ] All 4 module cards render with correct titles and link URLs
- [ ] Hero section displays with title, subtitle, and button
- [ ] CTA button navigates to `/docs/intro` without errors
- [ ] Responsive design verified on desktop, tablet, and mobile
- [ ] No console errors when building or running locally
- [ ] All links resolve (no 404 errors in Docusaurus)
- [ ] Homepage is the default page when visiting `/`

---

---

## Phase 2: Curriculum File Structure

### Story Context
**User Story**: Learner accesses structured curriculum content (US1 - Priority P1)

This phase creates the directory structure and chapter placeholder files for all 13 weeks of curriculum organized into 4 modules. Each chapter includes complete frontmatter metadata following Docusaurus standards, enabling navigation, search, and content delivery.

### Success Criteria (Acceptance Tests)
- [ ] All 4 module directories exist: `docs/module-01-physical-ai/`, `docs/module-02-ros2/`, `docs/module-03-simulation/`, `docs/module-04-humanoid/`
- [ ] All 8 chapter files created with correct titles and week numbers
- [ ] Each chapter file has complete Docusaurus frontmatter with: title, learning_outcomes, week_number, module_number, proficiency_level, prerequisites, tags
- [ ] All chapter files are valid Markdown and render without errors
- [ ] Directory structure matches plan.md specifications
- [ ] Sidebar configuration (_category_.json) created for each module
- [ ] `docs/intro.md` exists as entry point to curriculum

---

### Tasks

#### Module 1 Setup

- [ ] T008 [P] Create module directory structure: `docs/module-01-physical-ai/`

- [ ] T009 [P] [US1] Create `docs/module-01-physical-ai/_category_.json` with module metadata (label: "Module 1: Physical AI & Sensors (Weeks 1-2)", position: 1)

- [ ] T010 [P] [US1] Create `docs/module-01-physical-ai/week-01-intro.md` with frontmatter and placeholder content:
  - Title: "Week 1: Intro to Embodied Intelligence"
  - Week: 1, Module: 1
  - Learning outcomes: (array with 3 sample outcomes)
  - Proficiency levels: [Beginner, Intermediate, Advanced]
  - Tags: [embodied-ai, robotics-intro]

- [ ] T011 [P] [US1] Create `docs/module-01-physical-ai/week-02-sensors.md` with frontmatter and placeholder content:
  - Title: "Week 2: Sensors - LIDAR & IMU"
  - Week: 2, Module: 1
  - Learning outcomes: (array with 3 sample outcomes)
  - Proficiency levels: [Beginner, Intermediate, Advanced]
  - Tags: [sensors, lidar, imu]

#### Module 2 Setup

- [ ] T012 [P] Create module directory structure: `docs/module-02-ros2/`

- [ ] T013 [P] [US1] Create `docs/module-02-ros2/_category_.json` with module metadata (label: "Module 2: ROS 2 Fundamentals (Weeks 3-5)", position: 2)

- [ ] T014 [P] [US1] Create `docs/module-02-ros2/week-03-nodes.md` with frontmatter and placeholder content:
  - Title: "Week 3: ROS 2 Nodes & Topics"
  - Week: 3, Module: 2
  - Learning outcomes: (array with 3 sample outcomes)
  - Proficiency levels: [Beginner, Intermediate, Advanced]
  - Tags: [ros2, nodes, topics]

- [ ] T015 [P] [US1] Create `docs/module-02-ros2/week-05-urdf.md` with frontmatter and placeholder content:
  - Title: "Week 5: URDF Robot Description"
  - Week: 5, Module: 2
  - Learning outcomes: (array with 3 sample outcomes)
  - Proficiency levels: [Beginner, Intermediate, Advanced]
  - Tags: [ros2, urdf, robot-description]

#### Module 3 Setup

- [ ] T016 [P] Create module directory structure: `docs/module-03-simulation/`

- [ ] T017 [P] [US1] Create `docs/module-03-simulation/_category_.json` with module metadata (label: "Module 3: Gazebo & Isaac Sim (Weeks 6-10)", position: 3)

- [ ] T018 [P] [US1] Create `docs/module-03-simulation/week-06-gazebo.md` with frontmatter and placeholder content:
  - Title: "Week 6: Gazebo Physics"
  - Week: 6, Module: 3
  - Learning outcomes: (array with 3 sample outcomes)
  - Proficiency levels: [Beginner, Intermediate, Advanced]
  - Tags: [gazebo, physics-simulation, robotics]

- [ ] T019 [P] [US1] Create `docs/module-03-simulation/week-08-isaac.md` with frontmatter and placeholder content:
  - Title: "Week 8: NVIDIA Isaac Sim"
  - Week: 8, Module: 3
  - Learning outcomes: (array with 3 sample outcomes)
  - Proficiency levels: [Beginner, Intermediate, Advanced]
  - Tags: [isaac-sim, nvidia, simulation]

#### Module 4 Setup

- [ ] T020 [P] Create module directory structure: `docs/module-04-humanoid/`

- [ ] T021 [P] [US1] Create `docs/module-04-humanoid/_category_.json` with module metadata (label: "Module 4: VLA & Capstone (Weeks 11-13)", position: 4)

- [ ] T022 [P] [US1] Create `docs/module-04-humanoid/week-11-walking.md` with frontmatter and placeholder content:
  - Title: "Week 11: Bipedal Locomotion"
  - Week: 11, Module: 4
  - Learning outcomes: (array with 3 sample outcomes)
  - Proficiency levels: [Beginner, Intermediate, Advanced]
  - Tags: [humanoid, locomotion, vla]

- [ ] T023 [P] [US1] Create `docs/module-04-humanoid/week-13-capstone.md` with frontmatter and placeholder content:
  - Title: "Week 13: Capstone Project"
  - Week: 13, Module: 4
  - Learning outcomes: (array with 3 sample outcomes)
  - Proficiency levels: [Beginner, Intermediate, Advanced]
  - Tags: [capstone, humanoid-robotics, project]

#### Common Assets & Entry Point

- [ ] T024 [P] Create `docs/assets/` directory structure with subdirectories: `diagrams/`, `images/`, `code-samples/`, `screenshots/`

- [ ] T025 [P] [US1] Create `docs/intro.md` as curriculum entry point with:
  - Title: "Getting Started with Physical AI & Humanoid Robotics"
  - Brief overview of 13-week program
  - Links to Module 1, Week 1
  - Learning path description

#### Sidebar Configuration

- [ ] T026 Create `sidebars.ts` (or update existing) to auto-generate module/chapter navigation from directory structure with correct collapsible sections

#### Verification & Testing

- [ ] T027 Build site locally: `npm run build` and verify all chapter files render without markdown errors

- [ ] T028 Verify sidebar navigation displays all 4 modules with 8 chapters correctly

- [ ] T029 Test all chapter links from homepage work correctly (should resolve to new chapter files, not 404)

- [ ] T030 Verify breadcrumb navigation works: Docs > Module X > Week X

---

## Phase 2: Summary

**Total Tasks**: 23 (T008-T030)
**Parallelizable Tasks**: 16 tasks can run in parallel (all directory/file creation for different modules)
**Estimated Effort**: 60-90 minutes total (highly parallelizable)

### Parallel Execution Strategy

All tasks T008-T025 can be executed **in parallel** since they work on different files/directories:
- **Developer 1**: T008-T011 (Module 1 complete)
- **Developer 2**: T012-T015 (Module 2 complete)
- **Developer 3**: T016-T019 (Module 3 complete)
- **Developer 4**: T020-T023 (Module 4 complete)
- **Developer 5**: T024-T025 (Assets & entry point)
- **Sequential after parallel**: T026 (sidebar config), T027-T030 (verification)

For single developer: Execute all T008-T025 sequentially (~45 min), then T026-T030 (~15 min) = 60 minutes total.

---

## Frontmatter Template (for all chapter files)

```yaml
---
title: "Week X: Chapter Title"
learning_outcomes:
  - Learning outcome 1
  - Learning outcome 2
  - Learning outcome 3
week_number: X
module_number: Y
proficiency_level: ["Beginner", "Intermediate", "Advanced"]
prerequisites: []
tags: ["tag1", "tag2"]
authors: ["Instructor"]
last_updated: "2025-12-07"
---

# Week X: Chapter Title

## Overview

Placeholder content for Week X. This chapter will cover:
- Topic 1
- Topic 2
- Topic 3

## Learning Outcomes

By the end of this chapter, you will:
- {learning outcome 1}
- {learning outcome 2}
- {learning outcome 3}

## Next Steps

Proceed to Week X+1 for advanced topics.
```

---

## Related Documents

- **Specification**: [spec.md](./spec.md) — Full feature requirements (US1, US2, etc.)
- **Plan**: [plan.md](./plan.md) — Architecture and design decisions
- **Contracts**: [contracts/openapi.yaml](./contracts/openapi.yaml) — Backend API specification

---

## Phase 2b: FastAPI Implementation

### Story Context
**User Story**: Learner uses selected-text RAG chatbot for contextual help (US2 - Priority P1)

This phase establishes the FastAPI backend core—the foundation for all backend operations including authentication, chapter delivery, and RAG chatbot integration. By the end of this phase, the API will be ready to accept requests from the frontend and integrate with the Qdrant vector database and OpenAI APIs.

### Success Criteria (Acceptance Tests)
- [ ] FastAPI server starts without errors on `localhost:8000`
- [ ] Pydantic models validate request/response formats correctly
- [ ] Router handles POST /chat endpoint with proper error codes (200, 400, 500)
- [ ] RAG agent logic from `rag_agent.py` is integrated into the router
- [ ] CORS is configured to allow requests from Docusaurus frontend
- [ ] All endpoints return structured JSON responses
- [ ] No secrets or API keys hardcoded (uses `.env` file)

---

### Tasks

#### Setup Phase

- [x] T031 [P] Read `backend/rag_agent.py` to understand existing agent logic and required inputs/outputs

- [x] T032 [P] Read `backend/embeding_helpers.py` to understand embedding pipeline and helper functions

#### Core Implementation

- [x] T033 [P] [US2] Create `backend/models.py` with Pydantic models:
  - ChatRequest model: `{ message: str, user_id: str (default="guest") }`
  - ChatResponse model: `{ response: str, citations: Optional[List[str]] }`
  - HealthResponse model: `{ status: str }`

- [x] T034 [P] [US2] Create `backend/router.py` with chat endpoints:
  - POST /api/chat: Accept ChatRequest, validate inputs, return ChatResponse with error handling
  - GET /api/health: Return server status
  - Error handling: HTTPException with 400 for empty messages, 500 for server errors
  - Routed all requests through RAG agent logic (Runner.run_sync)

- [x] T035 [P] [US2] Create `backend/api.py` (main FastAPI app):
  - Initialize FastAPI app with title "Physical AI RAG Chatbot API"
  - Configure CORS middleware to allow requests from Docusaurus frontend (http://localhost:3000, https://physcial-ai-and-humanoid-robotics-c.vercel.app)
  - Set root route "/" to return health check status
  - Create POST /api/chat endpoint that integrates with RAG agent

- [x] T036 [US2] Integrate `rag_agent.py` logic into api.py:
  - Imported Runner from agents SDK
  - Imported agent from rag_agent module
  - POST /api/chat handler calls Runner.run_sync(agent, input=request.message)
  - Returns ChatResponse with final_output from agent
  - Error handling with try/except block

#### Configuration & Environment

- [x] T037 [P] (SKIPPED - .env file already exists with real keys)

- [x] T038 [P] Update `backend/pyproject.toml`:
  - Added fastapi>=0.104.1
  - Added uvicorn>=0.24.0
  - Added pydantic>=2.5.0
  - Added python-dotenv>=1.0.0
  - Existing deps: cohere, openai-agents, qdrant-client, trafilatura

#### Testing & Verification

- [ ] T039 Start FastAPI dev server: `uvicorn backend.api:app --reload --port 8000`

- [ ] T040 Test POST /chat endpoint:
  - Use curl or Postman: `POST http://localhost:8000/chat`
  - Send sample request: `{"selected_text": "Gazebo uses ODE physics", "question": "What physics engine?", "user_id": "test-user"}`
  - Verify response contains: answer, citation (chapter, section, quote), context_id
  - Status code should be 200

- [ ] T041 Test GET /health endpoint:
  - Request: `GET http://localhost:8000/health`
  - Verify response: `{"status": "ok", "version": "1.0"}`

- [ ] T042 Test error handling:
  - Send request with missing `question` field
  - Verify 400 response with error message
  - Send request with invalid JSON
  - Verify 400 response with validation error

- [ ] T043 Test CORS:
  - Request from frontend (http://localhost:3000): Should succeed
  - Verify response includes Access-Control-Allow-Origin header

- [ ] T044 Verify no hardcoded secrets in `api.py`, `router.py`, or `models.py`
  - All sensitive configs should be in `.env` file or environment variables only

---

## Phase 2b: Summary

**Total Tasks**: 14 (T031-T044)
**Parallelizable Tasks**: 5 tasks can run in parallel (T031, T032, T033, T034, T035)
**Estimated Effort**: 105-180 minutes total (15-30 min per task × 7-12 sequential or parallel ops)

### Parallel Execution Strategy

**Parallel Group 1** (can run simultaneously):
- T031: Read rag_agent.py
- T032: Read embedding_helpers.py
- T033: Create models.py
- T034: Create router.py
- T035: Create api.py

**Sequential after Parallel Group 1**:
- T036: Integrate RAG agent logic (depends on T031, T034, T035)
- T037: Create .env.example (independent)
- T038: Update pyproject.toml (independent)
- T039-T044: Testing & verification (depends on T036, T035)

**For single developer**: Execute T031-T035 (30 min), then T036-T038 (30 min), then T039-T044 (30 min) = **90 minutes total**.

---

## Phase 2b: File Locations

**Primary Files**:
- `backend/models.py` — Pydantic request/response models
- `backend/router.py` — FastAPI route handlers
- `backend/api.py` — Main FastAPI app initialization and CORS config
- `backend/.env.example` — Environment variable template
- `backend/pyproject.toml` — Project dependencies (updated)

**Dependencies** (already exist):
- `backend/rag_agent.py` — RAG agent logic (read-only)
- `backend/embeding_helpers.py` — Embedding helpers (read-only)

---

---

## Phase 2c: Custom React Chat Widget (Frontend Integration)

### Story Context
**User Story**: Learner uses selected-text RAG chatbot for contextual help (US2 - Priority P1)

This phase builds a custom React Chat Widget to replace the original ChatKit SDK dependency. The widget connects directly to the FastAPI backend, providing a seamless chat interface integrated into Docusaurus chapters via Root component swizzling.

### Success Criteria (Acceptance Tests)
- [ ] Chat Widget component created with TypeScript + React hooks
- [ ] Widget CSS styling created with FAB button, chat window, message list
- [ ] Widget calls POST /api/chat endpoint successfully
- [ ] Widget displays backend responses with citations
- [ ] Widget uses Docusaurus CSS variables for theming
- [ ] Widget displays "typing dots" animation during loading
- [ ] Widget is globally mounted via Root.tsx swizzling
- [ ] No console errors or warnings in browser DevTools
- [ ] Widget is responsive on mobile/tablet screens

---

### Tasks

#### CSS & Styling (5-10 min)

- [x] T045 [P] Create `src/components/ChatWidget/styles.css`:
  - Floating Action Button (FAB) styling: bottom-right position, circular, 60px diameter
  - Chat window styling: max-width 400px, height 500px, rounded corners, shadow
  - Message list styling: scrollable container with message bubbles (user vs bot)
  - Input field styling: text input + Send button (matches Docusaurus theme)
  - Dark/light mode support using Docusaurus CSS variables (--ifm-color-primary, --ifm-color-background, etc.)
  - Typing dots animation (3 dots bouncing animation)

#### Component Implementation (30-45 min)

- [x] T046 [P] Create `src/components/ChatWidget/index.tsx` with React hooks:
  - State: messages (array), isOpen (boolean), isLoading (boolean), inputValue (string)
  - Functions: handleOpen(), handleClose(), handleSend(), handleInput()
  - Message rendering: loop through messages array, display user/bot bubbles with timestamps
  - Loading state: show typing dots while isLoading = true
  - Error handling: display error message if API call fails

- [x] T047 [P] Implement API integration in ChatWidget:
  - Endpoint: `fetch('http://localhost:8000/api/chat', { method: 'POST', ... })`
  - Request body: `{ message: string }`
  - Response parsing: Extract response.answer and response.citations
  - Error handling: Catch network errors, API errors (400, 500), display friendly messages
  - Loading state: Set isLoading=true before fetch, false after response

#### Optional: TypeScript Types

- [x] T048 [P] Create `src/components/ChatWidget/types.ts` (optional):
  - Define ChatMessage interface: { id, content, sender, timestamp }
  - Define ChatWidgetState interface
  - Define API response types

#### Root Component Swizzling (10-15 min)

- [x] T049 [P] Create `src/theme/Root.tsx` (Docusaurus swizzle):
  - Import default Root from '@docusaurus/theme-classic'
  - Import ChatWidget component
  - Render: `<Root><ChatWidget /></Root>`
  - Mount ChatWidget globally on all pages

#### Testing & Verification (15-20 min)

- [ ] T050 Build Docusaurus locally: `npm run start`
  - Verify Chat Widget FAB visible on homepage
  - Verify no TypeScript compilation errors
  - Check browser console for errors

- [ ] T051 Test Chat Widget interaction:
  - Click FAB button: should open chat window
  - Type message: "Hello, can you help me understand ROS 2?"
  - Click Send button: should see "typing dots" animation
  - Wait for response: backend should return answer with citations
  - Click FAB again: should close chat window
  - Message history should persist while window is open

- [ ] T052 Test responsive design:
  - Desktop (1920x1080): Widget positioned correctly, no overflow
  - Tablet (768x1024): Widget scaled appropriately, still functional
  - Mobile (375x667): Widget full-width or 90% width, readable on small screens

- [ ] T053 Test theming:
  - Verify widget colors match Docusaurus primary color (--ifm-color-primary)
  - Test light mode: background should be light
  - Test dark mode: background should be dark
  - Switch between modes: widget should update colors

- [ ] T054 Test error handling:
  - Stop backend server: type message, verify error message displays
  - Send empty message: verify validation (disable Send if input empty)
  - Network timeout: simulate with browser DevTools, verify graceful error

---

## Phase 2c: Summary

**Total Tasks**: 10 (T045-T054)
**Parallelizable Tasks**: 3 tasks can run in parallel (T045, T046, T047)
**Estimated Effort**: 60-90 minutes total

### Parallel Execution Strategy

**Parallel Group 1** (can run simultaneously):
- T045: Create styles.css
- T046: Create ChatWidget component
- T047: Implement API integration

**Sequential after Parallel Group 1**:
- T048: Create types.ts (optional, ~5 min)
- T049: Create Root.tsx swizzle (~10 min)
- T050-T054: Testing & verification (~30-40 min, some can run in parallel)

**For single developer**: Execute T045-T047 (45 min), then T048-T049 (15 min), then T050-T054 (30 min) = **90 minutes total**.

---

## Phase 2c: File Locations

**Primary Files to Create**:
- `physcial-ai-and-humanoid-robotics-course-book/src/components/ChatWidget/index.tsx` — Main component
- `physcial-ai-and-humanoid-robotics-course-book/src/components/ChatWidget/styles.css` — Styling
- `physcial-ai-and-humanoid-robotics-course-book/src/components/ChatWidget/types.ts` — TypeScript types (optional)
- `physcial-ai-and-humanoid-robotics-course-book/src/theme/Root.tsx` — Swizzled root component

**API Endpoint** (already exists):
- `http://localhost:8000/api/chat` (FastAPI backend, Phase 2b)

---

## Phase 2d: UI/UX Enhancements & Modern Design

### Story Context
**User Story**: Provide an engaging, modern user experience with smooth animations and excellent visibility (US1 - Priority P1)

This phase enhances the visual design, animations, and accessibility of the platform with a modern aesthetic, improved footer visibility, animated chat widget, and better component styling across light and dark modes.

### Success Criteria (Acceptance Tests)
- [ ] Footer links are clearly visible in both light and dark modes
- [ ] Light mode: footer links use navy blue (#003366) with hover effects
- [ ] Dark mode: footer links use light purple-blue (#b8b8ff) with white on hover
- [ ] Footer background is light gray in light mode (#f5f7fa)
- [ ] Chat widget FAB has pulsing glow animation
- [ ] Chat widget messages pop in with smooth scale animation
- [ ] Typing indicator dots bounce with gradient colors
- [ ] Cards have hover lift effect (transform: translateY(-8px))
- [ ] Buttons have gradient backgrounds and hover shadows
- [ ] Sidebar items have smooth transitions and active state highlighting
- [ ] Markdown headers have left border accent with slide-in animation
- [ ] Tables have gradient header backgrounds with proper styling
- [ ] Navbar has subtle shadow with hover effect
- [ ] All animations respect reduced-motion preferences (no errors if disabled)

---

### Tasks

#### Footer Improvements (Light & Dark Mode)

- [x] T055 [P] [US1] Fix light mode footer link visibility in `src/css/custom.css`:
  - Set footer__link-item color to #003366 (navy)
  - Set footer__link-item hover color to #0052cc (bright blue)
  - Set footer__title color to #003366 with font-weight 700
  - Set footer background to #f5f7fa (light gray)
  - Add color transition on hover (0.3s ease)

- [x] T056 [P] [US1] Ensure dark mode footer link visibility in `src/css/custom.css`:
  - Set footer__link-item color to #e8e8e8 (light gray)
  - Set footer__link-item hover color to #ffffff (white)
  - Set footer__title color to #ffffff
  - Set copyright text color to #b8b8ff (light purple-blue)

#### Chat Widget Animations

- [x] T057 [P] [US2] Add FAB pulse animation in `src/components/ChatWidget/styles.css`:
  - Pulsing glow effect: box-shadow changes from 0 4px 12px to 0 8px 24px
  - Floating effect on hover: translateY(-10px) combined with scale(1.15)
  - Gradient background: linear-gradient(135deg, primary, primary-light)

- [x] T058 [P] [US2] Enhance message bubble animations:
  - Message pop-in: scale from 0.8 to 1 with cubic-bezier(0.34, 1.56, 0.64, 1)
  - User bubbles: gradient background with shadow on hover
  - Bot bubbles: gradient light background with subtle shadow
  - Dark mode: gradient dark backgrounds with blue glow on hover

- [x] T059 [P] [US2] Upgrade typing indicator animation:
  - Gradient dots: navy to bright blue (light mode), light blue to cyan (dark mode)
  - Typing dots scale up and move down simultaneously
  - Typing bubble has pulsing shadow effect (0.6s cycle)
  - Dark mode: enhanced blue glow animation

- [x] T060 [P] [US2] Enhance empty state robot animation:
  - Robot icon waves side-to-side (rotate -10deg to 10deg)
  - Empty state container fades in and scales up
  - Smooth 2s infinite wave animation

#### Component Styling Enhancements

- [x] T061 [P] [US1] Add card hover effects in `src/css/custom.css`:
  - Cards slide up on appear with slideInUp animation
  - Cards lift 8px on hover (transform: translateY(-8px))
  - Cards have enhanced shadow on hover
  - Dark mode: blue glow shadow instead of black

- [x] T062 [P] [US1] Style button gradients and effects:
  - Primary buttons: gradient(135deg, #0052cc, #003366)
  - Buttons translate up 2px on hover
  - Buttons have shadow effect on hover
  - Dark mode: gradient(135deg, #4da6ff, #3d94ff)

- [x] T063 [P] [US1] Enhance sidebar navigation:
  - Sidebar background: gradient from #f8f9fa to #ffffff (light mode)
  - Sidebar background: gradient from #1a1a1a to #141414 (dark mode)
  - Sidebar items have rounded corners (6px) with hover background
  - Active sidebar item: left border 4px accent (#0052cc light, #4da6ff dark)

- [x] T064 [P] [US1] Style markdown content in `src/css/custom.css`:
  - H2/H3 headers: left 4px border accent with slide-in animation
  - Tables: gradient header backgrounds (135deg, #003366 to #0052cc)
  - Table rows: proper padding and border-bottom styling
  - Dark mode: blue gradient headers

- [x] T065 [P] [US1] Add navbar and component transitions:
  - Navbar: subtle shadow with hover effect (0.3s transition)
  - All interactive elements: smooth 0.2s-0.3s transitions
  - Removed jarring color changes with smooth gradients

#### Verification & Testing

- [ ] T066 Build site locally: `npm run build`
  - Verify no CSS compilation errors
  - Check for any console warnings

- [ ] T067 Test light mode styling:
  - Footer links are navy blue and clearly visible
  - Hover state changes to bright blue with underline
  - Cards have proper shadows and hover lift
  - Buttons have gradient backgrounds
  - All text is readable with proper contrast

- [ ] T068 Test dark mode styling:
  - Footer links are light purple-blue and clearly visible
  - Copyright text is light purple-blue
  - Cards have blue glow shadows
  - All text is readable on dark backgrounds
  - Animations work smoothly

- [ ] T069 Test animations:
  - FAB button has continuous pulsing glow
  - FAB floats up on hover
  - Messages pop in when sent
  - Typing dots bounce with gradient colors
  - Chat empty state robot waves continuously
  - Cards slide in and lift on hover

- [ ] T070 Test responsive design:
  - Mobile (375x667): All elements scale correctly
  - Tablet (768x1024): Layout adapts properly
  - Desktop (1920x1080): Full experience with all effects

- [ ] T071 Test accessibility:
  - Verify no animation errors in console
  - Test with reduced-motion preferences disabled in browser
  - Ensure color contrast ratios meet WCAG AA standards

---

## Phase 2d: Summary

**Total Tasks**: 17 (T055-T071)
**Completed Tasks**: 11 (T055-T065)
**Remaining Tasks**: 6 (T066-T071 - testing & verification)
**Estimated Effort**: 30-45 minutes total (mostly CSS styling, already implemented)

### Files Modified

1. `src/css/custom.css` - Added 200+ lines of modern animations and styling:
   - Footer link visibility fixes (light & dark modes)
   - Animation keyframes (slideInUp, slideInLeft, slideInRight, pulse, glow, etc.)
   - Card enhancements with hover effects
   - Button gradients and transitions
   - Sidebar styling and navigation effects
   - Markdown content styling
   - Navbar effects

2. `src/components/ChatWidget/styles.css` - Enhanced with 150+ lines:
   - FAB pulse and float animations
   - Message bubble pop-in and gradient effects
   - Typing indicator dot animations with gradients
   - Empty state robot wave animation
   - Dark mode support with blue glow effects

---

## Next Steps (Post-Phase 2d)

Once UI/UX enhancements are verified:
1. **Phase 3**: Populate chapters with curriculum content (13 weeks, multi-level variants) + implement user authentication
2. **Phase 4**: Add advanced features (proficiency level switching, translation, personalization)
3. **Phase 5**: Deploy backend to cloud service and frontend to GitHub Pages + E2E testing

