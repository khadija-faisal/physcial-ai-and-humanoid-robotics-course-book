# Feature Specification: Physical AI & Humanoid Robotics Learning Platform with Embedded RAG Chatbot

**Feature Branch**: `1-rag-platform`
**Created**: 2025-12-06
**Status**: Draft
**Input**: Build a Physical AI & Humanoid Robotics platform with Docusaurus for documentation and Embedded RAG Chatbot covering 13-week curriculum.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Learner accesses structured curriculum content (Priority: P1)

A beginner AI developer enrolls in the course and needs to navigate through a well-organized, progressive learning path covering Physical AI concepts, ROS 2, simulators, and VLA/Capstone projects.

**Why this priority**: The entire platform's value depends on having accessible, properly structured educational content. Without this, no other feature matters.

**Independent Test**: Can be fully tested by loading chapters sequentially, verifying all 13 weeks of curriculum content is present, properly organized, and discoverable. Delivers foundational learning access.

**Acceptance Scenarios**:

1. **Given** a learner lands on the platform, **When** they view the main documentation site, **Then** they see all 4 modules clearly listed with week breakdowns (Module 1: Weeks 1-2, Module 2: Weeks 3-5, Module 3: Weeks 6-10, Module 4: Weeks 11-13).
2. **Given** a learner selects Module 1, **When** they access Chapter 1, **Then** they see learning outcomes, conceptual explanations, code examples, and references to hands-on labs.
3. **Given** a learner is in Chapter 3 (ROS 2), **When** they complete it, **Then** they can navigate to Chapter 4 with clear progression indicators.
4. **Given** a learner searches for "ROS 2 topics," **When** they execute the search, **Then** relevant chapters from Weeks 3-5 appear in results.

---

### User Story 2 - Learner uses selected-text RAG chatbot for contextual help (Priority: P1)

A learner is reading about Gazebo simulation and highlights a specific sentence about "physics engines." They need immediate, contextually grounded assistance without the chatbot inventing answers.

**Why this priority**: The RAG chatbot is the core differentiator. "Selected-text-only" RAG ensures accuracy and prevents hallucination—critical for technical education.

**Independent Test**: Can be tested by selecting chapter text, triggering the chatbot, verifying responses cite the selected text exactly, and checking that the bot refuses to answer questions outside the selected context. Delivers trustworthy AI assistance.

**Acceptance Scenarios**:

1. **Given** a learner has highlighted the text "Gazebo uses ODE physics engine by default," **When** they open the chatbot and ask "Why does Gazebo use ODE?," **Then** the chatbot answers only from that highlighted text and provides a citation.
2. **Given** a learner has not selected any text, **When** they ask the chatbot a question, **Then** the chatbot displays a clear message: "Please select text from the chapter to get context-specific answers."
3. **Given** a learner asks a question that cannot be answered from their selected text, **When** the chatbot receives the question, **Then** it responds: "This question is outside the selected content. Please select relevant text or explore other chapters."
4. **Given** a learner selects text and asks multiple follow-up questions, **When** each question is asked, **Then** each response includes a citation back to the original source (chapter/section).

---

### User Story 3 - Learner authenticates with hardware background context (Priority: P2)

A new learner signs up and the system captures their background (e.g., "I have embedded systems experience" or "I'm new to robotics") to personalize content recommendations.

**Why this priority**: Better-Auth with contextual onboarding improves engagement and provides a foundation for personalization. High-value but not blocking other features.

**Independent Test**: Can be tested by completing signup flow, verifying user profile stores background info, and confirming the info influences content recommendations. Delivers personalized learning paths.

**Acceptance Scenarios**:

1. **Given** a new user clicks "Sign Up," **When** they complete the signup form, **Then** they are asked: "What is your background? (a) AI/ML, (b) Embedded Systems, (c) Robotics, (d) Other."
2. **Given** a user selects "Other," **When** they are prompted for details, **Then** a free-text field appears for them to enter custom background.
3. **Given** a user completes signup with background "Embedded Systems," **When** they log in the next time, **Then** chapter recommendations highlight hardware-relevant labs first.

---

### User Story 4 - Learner adapts chapter content to their proficiency level (Priority: P2)

A learner reads Chapter 2 on sensors and wants to see "Advanced" explanations with more math, or "Beginner" explanations with intuitive analogies.

**Why this priority**: Personalization increases retention and accommodates diverse learning styles. Enhances user experience but can be implemented independently.

**Independent Test**: Can be tested by toggling the personalization button, verifying content variations appear, and confirming different versions are stored/cached. Delivers adaptive content delivery.

**Acceptance Scenarios**:

1. **Given** a learner is viewing a chapter, **When** they click the "Adapt Content" button, **Then** a dropdown appears with options: "Beginner," "Intermediate," "Advanced."
2. **Given** a learner selects "Advanced," **When** the chapter reloads, **Then** mathematical derivations, advanced code patterns, and academic references are displayed.
3. **Given** a learner selects "Beginner," **When** the chapter reloads, **Then** conceptual analogies, simplified diagrams, and step-by-step explanations are shown.

---

### User Story 5 - Learner translates chapter content to Urdu (Priority: P3)

A learner prefers Urdu and wants to read the same chapter in their native language while preserving diagrams and code snippets.

**Why this priority**: Internationalization expands reach. Bonus feature for higher hackathon scoring but not essential for MVP.

**Independent Test**: Can be tested by clicking translation button, verifying Urdu rendering, checking code remains unchanged, and confirming diagrams are preserved. Delivers multi-language support.

**Acceptance Scenarios**:

1. **Given** a learner is viewing Chapter 1, **When** they click the "Urdu" translation button, **Then** all explanatory text is translated to Urdu while code blocks and diagrams remain in their original form.
2. **Given** content is translated, **When** the learner reads a translated section, **Then** a citation note states: "Translation provided; original English available."

---

### Edge Cases

- What happens when the chatbot is asked to answer from text that was deleted by content updates?
- How does the system handle when a learner selects text that spans multiple chapters or sub-sections?
- What happens if a learner's internet connection drops during chatbot interaction—are responses cached?
- How does the platform handle concurrent edits to curriculum content while learners are reading?
- What happens if a chapter markdown file has malformed frontmatter or missing required fields?
- How does Docusaurus handle when a chapter file is moved between modules mid-deployment?
- How are code blocks with syntax highlighting handled if unsupported languages are used?

## Requirements *(mandatory)*

### Implementation Status Summary

**Phase 2b (Backend Core) Status**: ✅ **COMPLETED** (Dec 17, 2025)

| Component | Status | Notes |
|-----------|--------|-------|
| **FastAPI Server** | ✅ Complete | Configured with CORS, health check endpoint, POST /api/chat |
| **Cohere Embeddings** | ✅ Complete | `embed-english-v3.0` model integrated in `embeding_helpers.py` |
| **Qdrant Integration** | ✅ Complete | Cloud connection established, deterministic chunking implemented |
| **RAG Agent** | ✅ Complete | OpenAI Agents SDK + custom retrieve tool integrated |
| **Pydantic Models** | ✅ Complete | ChatRequest, ChatResponse, HealthResponse models |
| **Error Handling** | ✅ Complete | Proper HTTP status codes (200, 400, 500) |
| **Authentication** | 🔄 Deferred | Phase 3: User signup/signin, JWT tokens, Neon Postgres |
| **User Profiles** | 🔄 Deferred | Phase 3: Background context, proficiency level storage |
| **Chapter API** | 🔄 Deferred | Phase 3: Endpoints to retrieve chapters and manage content |

### Functional Requirements

#### Curriculum & Content Delivery
- **FR-001**: System MUST organize and display all 13 weeks of curriculum content exactly as specified: Module 1 (Weeks 1-2), Module 2 (Weeks 3-5), Module 3 (Weeks 6-10), Module 4 (Weeks 11-13).
- **FR-002**: System MUST store each chapter with metadata including learning outcomes, associated labs, code examples, and quiz questions.
- **FR-003**: System MUST support chapter-level search functionality across all modules.
- **FR-004**: Each chapter MUST be viewable in a web-based format with responsive design for desktop and tablet.
- **FR-005**: System MUST display chapter frontmatter (title, learning outcomes, prerequisites) prominently.

#### RAG Chatbot (Selected-Text-Only)
- **FR-006**: Chatbot MUST only answer questions based on text explicitly selected (highlighted) by the learner in the current chapter.
- **FR-007**: Chatbot MUST include a citation for every response, referencing the exact chapter/section from which the answer was drawn.
- **FR-008**: Chatbot MUST reject (with a clear message) any question that cannot be answered from the selected text.
- **FR-009**: Chatbot MUST store selected text as a retrieval context; if text is deleted/updated, the chatbot MUST notify the user of the change.
- **FR-010**: System MUST implement a deterministic chunking pipeline for text embeddings; this pipeline MUST be stored as a reusable Skill.

#### Authentication & User Profile
- **FR-011**: System MUST provide a sign-up endpoint that collects user email, password, and hardware/background context (multiple-choice + freetext). 🔄 **DEFERRED to Phase 3** (Not in MVP)
- **FR-012**: System MUST persist user profile data (background, proficiency level, language preference) in Neon Postgres. 🔄 **DEFERRED to Phase 3** (No Neon Postgres in Phase 2b; backend is stateless)
- **FR-013**: System MUST provide a sign-in endpoint that authenticates users via email/password. 🔄 **DEFERRED to Phase 3**
- **FR-014**: System MUST maintain user session tokens securely (JWT or session-based, with expiration). 🔄 **DEFERRED to Phase 3**

#### Personalization
- **FR-015**: System MUST store user-selected proficiency level (Beginner, Intermediate, Advanced) per chapter in user profile. 🔄 **DEFERRED to Phase 3** (Requires user database)
- **FR-016**: System MUST maintain two (or more) versions of chapter content for each proficiency level. 🔄 **DEFERRED to Phase 3** (Content authoring task for Phase 3+)
- **FR-017**: System MUST render the appropriate content version based on the user's selected level. 🔄 **DEFERRED to Phase 3**
- **FR-018**: System MUST provide a UI button to switch proficiency level on-chapter. 🔄 **DEFERRED to Phase 3**

#### Internationalization (Urdu Translation - Bonus)
- **FR-019**: System MUST provide a "Translate to Urdu" button on each chapter page. 🔄 **DEFERRED to Phase 4+** (Content authoring phase)
- **FR-020**: System MUST translate explanatory text while preserving code blocks and diagrams. 🔄 **DEFERRED to Phase 4+**
- **FR-021**: System MUST display a notice indicating the content is translated; original English version must remain accessible. 🔄 **DEFERRED to Phase 4+**

#### Backend API Architecture
- **FR-022**: API MUST be implemented in FastAPI with Pydantic models for validation. ✅ **IMPLEMENTED** (Phase 2b)
- **FR-023**: API currently exposes core endpoint: **POST /api/chat** (primary endpoint). Auth/chapters endpoints deferred to Phase 3. ⚠️ **SCOPE CHANGE** (Chat-Only MVP)
  - ✅ **POST /api/chat**: Accept message, call RAG agent, return response with citations
  - ✅ **GET /**: Health check endpoint
  - 🔄 **DEFERRED**: `/auth/signup`, `/auth/signin`, `/chapters/{id}`, `/user/profile` (Phase 3+)
- **FR-024**: API MUST validate all incoming requests and return appropriate HTTP status codes (200, 400, 401, 404, 500). ✅ **IMPLEMENTED**
- **FR-025**: API MUST log all chatbot interactions for debugging and analysis. ⚠️ **DEFERRED** (Basic logging present; full audit trail deferred to Phase 3)

#### Vector Database & RAG Pipeline
- **FR-026**: System MUST use Qdrant Cloud (Free Tier) as the vector database. ✅ **IMPLEMENTED** (Phase 2b)
- **FR-027**: System MUST embed chapter text using **Cohere embeddings** (`embed-english-v3.0` model, 1024 dimensions). ✅ **IMPLEMENTED** (Changed from OpenAI; Cohere API is used)
- **FR-028**: System MUST store embeddings with metadata (chapter_id, section, text_chunk) in Qdrant. ✅ **IMPLEMENTED** (Phase 2b)
- **FR-029**: System MUST implement deterministic text chunking (fixed window size or semantic breaks) to ensure reproducible embeddings. ✅ **IMPLEMENTED** (Deterministic chunking with max_chars=1000 in `embeding_helpers.py`)

#### Deployment
- **FR-030**: Docusaurus site MUST be deployed to GitHub Pages with automatic builds on push.
- **FR-031**: FastAPI backend MUST be deployed to a cloud service (Render, Fly.io, Railway, or similar) with public API endpoints.
- **FR-032**: Both frontend and backend MUST be accessible without errors for the duration of the demo.

#### Docusaurus Site Organization
- **FR-033**: Docusaurus site directory structure MUST follow: `docs/module-01/` through `docs/module-04/`, with each module containing chapter files named `chapter-01.md`, `chapter-02.md`, etc.
- **FR-034**: Each chapter markdown file MUST include frontmatter with: `title`, `learning_outcomes` (array), `week_number`, `proficiency_level`, `prerequisites`, and `tags` (array).
- **FR-035**: Docusaurus sidebar configuration (`sidebars.js`) MUST auto-generate module and chapter navigation from directory structure.
- **FR-036**: Each chapter MUST be deployable to GitHub Pages with automatic rebuilds triggered by git push to main/master branch.
- **FR-037**: Docusaurus site MUST include a searchable documentation index covering all chapters and learning outcomes.
- **FR-038**: Chapter content MUST support embedded code blocks (with syntax highlighting) and diagrams/images stored in `docs/assets/` subdirectories.
- **FR-039**: Docusaurus configuration MUST define a custom CSS theme matching Physical AI & Humanoid Robotics branding (dark/light mode support).
- **FR-040**: Each chapter page MUST display a Custom React Chat Widget (floating button → chat interface) connected to the FastAPI backend `POST /api/chat` endpoint. ✅ **CUSTOM WIDGET** (NOT ChatKit SDK)
- **FR-041**: Chapter markdown MUST support custom admonitions (callouts) for labs, exercises, and safety notices (e.g., `:::tip`, `:::lab`, `:::warning`).
- **FR-042**: Docusaurus site MUST include metadata about module progress (e.g., "Chapter 3 of 5 in Module 2") visible to learners.

#### Custom Chat Widget Frontend
- **FR-043**: Custom React Chat Widget MUST be implemented as a TypeScript component with React hooks for state management.
- **FR-044**: Widget MUST display a floating action button (FAB) in bottom-right corner that opens/closes the chat interface.
- **FR-045**: Widget MUST include input field for user messages and display list of past messages with timestamps.
- **FR-046**: Widget MUST call `POST /api/chat` endpoint with user message and handle JSON response (answer + citations).
- **FR-047**: Widget MUST use Docusaurus CSS variables for theming (colors, fonts) to maintain visual consistency with the textbook.
- **FR-048**: Widget MUST implement "typing dots" animation while waiting for backend response.
- **FR-049**: Widget MUST be globally mounted via Docusaurus Root component swizzling (`src/theme/Root.tsx`).

#### Reusable Skills
- **FR-050**: Text chunking logic MUST be extracted as a reusable Skill (stored in `/skills/`).
- **FR-051**: Chatbot context matching logic MUST be extracted as a reusable Skill.
- **FR-052**: Skills MUST include documentation on usage and integration.

### Key Entities

- **User**: Represents a learner; attributes include user_id (UUID), email, password_hash, background (enum + freetext), proficiency_level (enum), language_preference, created_at, updated_at.
- **Chapter**: Represents a lesson; attributes include chapter_id, title, module_id, week_number, learning_outcomes (array), content_by_level (dict: Beginner/Intermediate/Advanced), code_examples, lab_references, created_at, updated_at.
- **Module**: Represents a course section; attributes include module_id, title, weeks (int range), chapters (relationship to Chapter), description.
- **SelectedTextContext**: Represents highlighted text from a chapter; attributes include context_id, user_id, chapter_id, text_content, char_position_start, char_position_end, timestamp, context_embedding (vector).
- **ChatbotMessage**: Represents a Q&A exchange; attributes include message_id, user_id, question, answer, citation (chapter_id, section), context_id (foreign key to SelectedTextContext), created_at.
- **Embedding**: Represents a text chunk vector; attributes include embedding_id, chapter_id, text_chunk, vector (from Qdrant), metadata (section, proficiency_level).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All 13 weeks of curriculum content are published and accessible (100% content coverage).
- **SC-002**: The Docusaurus site is deployed live on GitHub Pages and loads without errors for the demo period.
- **SC-003**: The FastAPI backend is deployed live and responds to API requests within 2 seconds (p95 latency).
- **SC-004**: Chatbot provides accurate, cited answers 95% of the time when queried with selected text from the curriculum.
- **SC-005**: User can complete the full signup flow, select a chapter, highlight text, and receive a chatbot response in under 2 minutes.
- **SC-006**: A compelling 90-second demo video is produced showcasing: curriculum navigation, selected-text RAG chatbot, and user authentication.
- **SC-007**: All code, specs, and planning artifacts (Spec-Kit Plus files) are present in the repository with zero critical linting errors.
- **SC-008**: Text chunking and context matching logic are extracted and documented as reusable Skills in `/skills/`.
- **SC-009**: At least 3 chapters demonstrate multi-level content (Beginner, Intermediate, Advanced versions present).
- **SC-010**: Urdu translation functionality works for at least 2 chapters (bonus feature demonstrator).
- **SC-011**: All 13 chapter markdown files follow Docusaurus frontmatter template with required fields: title, learning_outcomes, week_number, module_number, prerequisites, tags.
- **SC-012**: Docusaurus sidebar navigation correctly displays all 4 modules and 13 chapters in collapsible structure.
- **SC-013**: Breadcrumb navigation displays correctly on every chapter page (e.g., "Docs > Module 1 > Chapter 1").
- **SC-014**: Search functionality returns accurate results when searching for chapter titles, learning outcomes, and tags.
- **SC-015**: GitHub Pages deployment completes without errors on every git push; site loads in under 3 seconds.
- **SC-016**: Custom React Chat Widget is visible on all chapter pages and responds to user input.
- **SC-017**: Chat Widget successfully calls backend `POST /api/chat` endpoint and displays responses with citations.
- **SC-018**: Chat Widget uses Docusaurus CSS variables for theming and maintains visual consistency with the textbook design.
- **SC-019**: Chat Widget displays "typing dots" animation while waiting for backend response.

## Assumptions

1. **Curriculum Content Availability**: The full 13-week Physical AI & Humanoid Robotics curriculum (with learning outcomes, diagrams, and code examples) will be provided or authored as part of this feature.
2. **Cohere API Key**: A Cohere API key is available for embeddings using `embed-english-v3.0` model (1024 dimensions). ✅ **IMPLEMENTED**
3. **Qdrant Cloud Access**: Free Tier Qdrant Cloud access is provisioned; local Qdrant instance can substitute. ✅ **IMPLEMENTED**
4. **Neon Postgres Availability**: Deferred to Phase 3. Phase 2b backend is stateless; no database required for MVP chat functionality.
5. **Static Content Model**: Chapter content is authored once and rarely updated. Hot-reload/versioning of content is out of scope for MVP.
6. **Single Language MVP**: English is the primary language. Urdu translation is bonus; auto-translation service (e.g., Google Translate API) is acceptable.
7. **No Custom LLM**: The chatbot uses OpenAI's API (ChatGPT); no custom fine-tuning in MVP scope.
8. **Deterministic Chunking**: Text is chunked using a fixed algorithm (e.g., sliding window with overlap); ML-based dynamic chunking is out of scope.
9. **Docusaurus Version**: Docusaurus v3.x is the base version (or current stable); all configuration follows v3 standards.
10. **GitHub Pages Workflow**: GitHub Actions workflow for auto-deploy to GitHub Pages is pre-configured or will be set up separately.

## Out of Scope (Explicitly Excluded)

- Live code execution environments in chapters (labs reference external environments).
- Multi-tenant support (single organization/course only).
- Real-time collaborative editing of content.
- Mobile native app (responsive web design is sufficient).
- Advanced analytics dashboards (logging for debugging only).
- Gamification (points, badges, leaderboards).
- Video hosting (chapters can link to external video URLs).
- Advanced access control (admin/instructor roles are out of scope for MVP).

## Dependencies & Integration Points

### External Services
- **OpenAI API**: For text embeddings and chatbot responses.
- **Qdrant Cloud Free Tier**: For vector storage.
- **Neon Postgres**: For relational data (users, chapters, messages).
- **GitHub Pages**: For Docusaurus deployment (static hosting).
- **Cloud Hosting** (Render/Fly.io/Railway): For FastAPI backend.

### Internal Dependencies
- Constitution principles (Educational Clarity, Embodied Intelligence, Physical AI & Humanoid Robotics Interaction, Technical Accuracy, Safety).
- Spec-Kit Plus methodology (Specs, Plans, Tasks, PHRs, ADRs).

---

## Next Steps & Questions for User

Before proceeding to planning, consider if any of the following need clarification:

1. **Curriculum Content**: Is the full 13-week content (with diagrams, code, labs) ready to be authored, or will it be created incrementally during implementation?
2. **Proficiency Level Variants**: Should each chapter have exactly 3 variants (Beginner/Intermediate/Advanced), or would fewer variants suffice for MVP?
3. **Translation Service**: For Urdu translation, should we use Google Translate API, or is a simpler placeholder translation acceptable for the hackathon demo?

---

**Status**: Ready for `/sp.clarify` or `/sp.plan` after validation.
