<!--
Sync Impact Report:
Version change: 0.2.0 -> 0.3.0
Modified principles:
- Educational Clarity: Expanded
- Embodied Intelligence: Added
- AI-Native Interaction: Added
- Technical Accuracy: Expanded
- Safety in robotics guidance: Added
- Interaction First: Expanded
- Content Integrity: Expanded
- Error Handling: Expanded
Added sections: None
Removed sections: None
Templates requiring updates:
- .specify/templates/plan-template.md: ⚠ pending
- .specify/templates/spec-template.md: ⚠ pending
- .specify/templates/tasks-template.md: ⚠ pending
- .specify/templates/commands/*.md: ⚠ pending
Follow-up TODOs:
- TODO(RATIFICATION_DATE): Original adoption date for the constitution.
-->
# Project Constitution

## 1. Project Context
This project originates from "Hackathon I: Physical AI & Humanoid Robotics Textbook." It encompasses the development of a comprehensive textbook on Physical AI and Humanoid Robotics, delivered alongside an embedded RAG (Retrieval Augmented Generation) chatbot. The entire development process adheres to the Spec-Kit Plus methodology, leveraging Claude Code for autonomous assistance. The technical stack includes:
- **Frontend**: Docusaurus v3 + Custom React Chat Widget (NOT ChatKit SDK)
- **Backend**: FastAPI + OpenAI Agents SDK
- **Embeddings**: Cohere (embed-english-v3.0, 1024 dimensions)
- **Vector Database**: Qdrant Cloud Free Tier
- **Relational Database**: Neon PostgreSQL (Phase 3+)

A critical requirement is the "selected-text-only" RAG, ensuring the chatbot's responses are strictly grounded in the textbook content selected by the user.

## 2. Core Principles
### Educational Clarity
**Rule:** The textbook content and chatbot explanations MUST be clear, concise, and accessible to AI developers who are beginners in robotics. Complex concepts SHOULD be broken down into digestible modules with practical examples.
**Rationale:** To maximize learning effectiveness for the target audience.

### Embodied Intelligence
**Rule:** All theoretical concepts and practical exercises MUST consider physical-world constraints and real-world robot interactions. Simulated environments (ROS2, Gazebo, Unity, Isaac) SHOULD be used to demonstrate embodied intelligence principles.
**Rationale:** To bridge the gap between theoretical AI and its practical application in robotics.

### AI-Native Interaction
**Rule:** The textbook and chatbot MUST be tightly integrated, allowing for seamless, AI-native interaction. The chatbot SHOULD provide context-aware assistance, drawing directly from the textbook content.
**Rationale:** To create a novel, interactive learning experience that leverages AI for personalized guidance.

### Technical Accuracy
**Rule:** All technical information, code examples, and theoretical explanations related to robotics (ROS2, Gazebo, Unity, Isaac, VLA) MUST be accurate, up-to-date, and reflect industry best practices.
**Rationale:** To ensure the credibility and utility of the textbook as a reliable resource for learners.

### Safety in robotics guidance
**Rule:** All content and guidance related to robotics operations MUST emphasize safety protocols, ethical considerations, and best practices for preventing harm to humans or damage to equipment.
**Rationale:** To promote responsible development and deployment of robotic systems.

### Interaction First
**Rule:** The primary mode of learning and engagement is through interactive elements, demonstrations, and hands-on labs. Textual explanations SHOULD support, not supersede, experiential learning.
**Rationale:** To foster deeper understanding and practical skill development.

### Content Integrity
**Rule:** All content, including text, diagrams, and code, MUST be original or properly attributed. Plagiarism is strictly prohibited.
**Rationale:** To maintain academic honesty and intellectual property rights.

### Error Handling
**Rule:** All code examples and system components MUST include robust error handling mechanisms, providing clear and actionable feedback to the user.
**Rationale:** To enhance user experience and facilitate debugging.

## 3. Spec-Kit Plus Methodology Standards
### Spec-Driven Development Workflow
**Rule:** The project MUST follow the Spec-Kit Plus workflow: constitution → specify → clarify → plan → tasks → implement. Each stage MUST be completed and reviewed before proceeding to the next.
**Rationale:** To ensure a structured, systematic, and well-documented development process.

### Prompt History Records (PHR)
**Rule:** Every user prompt and agent response MUST be recorded verbatim as a Prompt History Record (PHR). PHRs MUST include metadata such as stage, title, date, model, feature, branch, user, command, labels, links, modified files, tests, and the full prompt/response text.
**Rationale:** To maintain a complete, auditable history of all interactions and decisions for learning, traceability, and debugging.

### Architectural Decision Records (ADR)
**Rule:** Architecturally significant decisions MUST be documented as Architectural Decision Records (ADRs). ADRs MUST include options considered, trade-offs, and rationale. ADR suggestions MUST be made when a significant decision is detected, requiring user consent before creation.
**Rationale:** To formalize and track key architectural choices, their justifications, and implications over time.

### Human as a Tool Strategy
**Rule:** The agent MUST invoke human intervention when encountering ambiguous requirements, unforeseen dependencies, architectural uncertainty, or at major completion checkpoints. The user is treated as a specialized tool for clarification and decision-making.
**Rationale:** To leverage human judgment for critical decisions and ensure alignment with user intent.

### Checkpoint pattern
**Rule:** Regular checkpoints MUST be established after completing major milestones or tasks, allowing for review and validation before proceeding.
**Rationale:** To ensure incremental progress, early detection of issues, and continuous alignment with project goals.

### Atomic tasks 15–45 mins
**Rule:** Implementation tasks MUST be broken down into atomic units, ideally completable within 15-45 minutes.
**Rationale:** To facilitate focused work, enable frequent progress tracking, and simplify debugging and rollback.

### Mandatory storage folders
**Rule:** All historical records and agent-related artifacts MUST be stored in their designated folders: `history/prompts/` for PHRs, `history/adr/` for ADRs, and `skills/` for custom agent skills.
**Rationale:** To maintain organizational consistency, ensure discoverability, and support the traceability requirements of Spec-Kit Plus.

## 4. Documentation & Textbook Standards
### Docusaurus structure docs/module-XX/chapter-YY.md
**Rule:** The textbook content MUST follow a Docusaurus documentation structure, organized into modules and chapters: `docs/module-XX/chapter-YY.md`.
**Rationale:** To provide a clear, navigable, and consistent structure for the textbook content.

### Chapter template (learning outcomes, diagrams, code, labs, quiz)
**Rule:** Each chapter MUST adhere to a predefined template including: learning outcomes, explanatory diagrams, executable code examples, hands-on laboratory exercises, and knowledge assessment quizzes.
**Rationale:** To ensure comprehensive learning and provide a consistent pedagogical approach across the textbook.

### Lab template
**Rule:** All laboratory exercises MUST follow a standardized template, clearly outlining objectives, prerequisites, steps, expected outcomes, and challenge questions.
**Rationale:** To ensure consistency, ease of use, and effective learning in practical sessions.

### Tone guidelines
**Rule:** The tone of the textbook and chatbot interactions MUST be educational, encouraging, objective, and technically precise, avoiding jargon where possible or clearly explaining it.
**Rationale:** To create an engaging and effective learning environment for beginners.

### Source verification
**Rule:** All factual claims, technical specifications, and referenced external information MUST be verified against authoritative sources.
**Rationale:** To ensure the accuracy and reliability of the content.

### Plagiarism check
**Rule:** All submitted content MUST undergo plagiarism checks to ensure originality and proper attribution of sources.
**Rationale:** To uphold academic integrity and ethical content creation.

## 5. Code & RAG Chatbot Standards
### Backend and Database Technologies
**Rule:** The backend MUST be implemented using FastAPI + Pydantic. The vector database for RAG MUST be Qdrant Cloud Free Tier, and the relational database MUST be Neon Postgres.
**Rationale:** To leverage efficient and scalable technologies for the AI and data management components.

### AI Integration and Code Style
**Rule:** AI integration MUST utilize OpenAI Agents SDK for the RAG backend. Frontend chatbot widget MUST be a custom React component (TypeScript + CSS). All code MUST adhere to established Python coding standards (e.g., PEP 8), ESLint, Prettier, and project-specific style guides.
**Rationale:** To ensure consistency, readability, maintainability, and effective AI functionality while avoiding dependency on third-party chat SDKs.

### RAG behavior
**Rule:** The RAG chatbot MUST answer exclusively from the textbook content in "selected-text-only" mode. Citations ARE REQUIRED for all responses. A deterministic chunking pipeline MUST be stored as a Skill. Graceful error handling MUST be implemented.
**Rationale:** To ensure factual accuracy, prevent hallucination, provide verifiable sources, and maintain a robust user experience.

### Error Handling
**Rule:** All code, particularly API endpoints and AI interactions, MUST implement comprehensive error handling, logging, and appropriate response mechanisms.
**Rationale:** To ensure system robustness, provide meaningful feedback, and facilitate debugging.

## 6. Constraints
### Deployment
**Rule:** The Docusaurus book MUST be deployed live on GitHub Pages.
The RAG backend MUST be deployed live on a public hosting service (Render/Fly.io/Railway/Vercel).
**Rationale:** To ensure easy access for students and provide a clear deployment strategy for the application components.

### Complete 13-week course modules
**Rule:** The project MUST deliver all content for 13 weeks of course modules.
**Rationale:** To meet the curriculum requirements of the hackathon.

### Bonus scoring features
**Rule:** The project SHOULD implement bonus features including Better-Auth signup/signin, a Personalized chapter mode, Urdu translation mode, and Reusable intelligence / skills.
**Rationale:** To enhance user experience, demonstrate advanced capabilities, and achieve higher scoring in the hackathon.

## 7. Success Criteria
### Published book
**Rule:** A complete and published textbook MUST be available, adhering to all documentation standards.
**Rationale:** To deliver the primary educational output of the project.

### Embedded RAG chatbot
**Rule:** A fully functional RAG chatbot MUST be embedded within the textbook, meeting all RAG behavior and performance rules.
**Rationale:** To provide an interactive learning companion as a key project deliverable.

### Verified robotics content
**Rule:** All robotics-related content MUST be technically accurate and verified.
**Rationale:** To ensure the credibility and educational value of the textbook.

### Clean repo with specs + ADR + PHR + skills
**Rule:** The project repository MUST be clean, well-organized, and contain all Spec-Kit Plus artifacts (specs, ADRs, PHRs, and custom skills).
**Rationale:** To demonstrate adherence to the development methodology and facilitate future maintenance and expansion.

### Demo < 90 seconds
**Rule:** A compelling demonstration of the project's key features MUST be achievable within 90 seconds.
**Rationale:** To effectively showcase the project's value and functionality during presentations.

## 8. Accessibility & Internationalization
### Accessibility Standards
**Rule:** The textbook platform and chatbot interface MUST comply with WCAG 2.1 AA accessibility guidelines, including keyboard navigation and ARIA labels.
**Rationale:** To ensure the educational content is accessible to all learners, including those with disabilities.

### Internationalization Strategy
**Rule:** The platform SHOULD be designed with internationalization in mind, allowing for future localization into multiple languages, starting with English, and including Urdu translation mode as a bonus feature.
**Rationale:** To enable broader reach and impact of the educational material.

<h2>9. Governance</h2>
<h3>Amendment Procedure</h3>
**Rule:** All amendments to this Constitution MUST be proposed via an Architectural Decision Record (ADR) and approved by the core project team.
**Rationale:** To ensure a formal and transparent process for evolving project governance.

<h3>Versioning Policy</h3>
**Rule:** This Constitution MUST follow semantic versioning (MAJOR.MINOR.PATCH) for updates. MAJOR versions for backward-compatible changes, MINOR for new sections/material expansion, and PATCH for clarifications/typos.
**Rationale:** To provide clear communication about the nature and impact of changes to the project's foundational principles.

<h3>Template updates required</h3>
**Rule:** All dependent Spec-Kit Plus templates (plan, spec, tasks, command files) MUST be updated to align with any changes made to this Constitution.
**Rationale:** To maintain consistency across all project documentation and ensure the methodology is uniformly applied.

<h3>Compliance Review</h3>
**Rule:** The project team MUST conduct a quarterly review of all development artifacts and processes against this Constitution to ensure ongoing compliance. All specs and tasks MUST demonstrate compliance with the Constitution.
**Rationale:** To maintain adherence to established standards and principles throughout the project lifecycle.

