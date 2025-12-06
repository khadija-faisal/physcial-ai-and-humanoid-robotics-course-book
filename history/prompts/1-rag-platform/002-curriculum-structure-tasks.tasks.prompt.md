---
id: 002
title: Generate curriculum file structure task list
stage: tasks
date: 2025-12-07
surface: agent
model: claude-haiku-4-5-20251001
feature: 1-rag-platform
branch: 1-rag-platform
user: wajiz.pk
command: /sp.tasks
labels: ["curriculum", "file-structure", "docusaurus", "task-generation", "phase-2"]
links:
  spec: ./specs/1-rag-platform/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/1-rag-platform/tasks.md
tests:
  - Manual verification of directory structure creation
  - Markdown rendering validation
  - Sidebar navigation verification
  - Link resolution testing
---

## Prompt

Based on `plan.md`, create the Task List for **Phase 2: Curriculum File Structure**

**Context:**
- Docusaurus is manually initialized.
- **Goal:** Implement the specific Homepage design and Curriculum structure defined below.

**TASK GROUPS:**

**Group 2: Curriculum File Structure**

*Create the following folders and files for the course content:*

- [ ] **Module 1 (Foundations):**
    - Create folder: `docs/module-01-physical-ai`
    - Create file: `docs/module-01/week-01-intro.md` (Frontmatter Title: "Week 1: Intro to Embodied Intelligence")
    - Create file: `docs/module-01/week-02-sensors.md` (Frontmatter Title: "Week 2: Sensors - LIDAR & IMU")
- [ ] **Module 2 (ROS 2):**
    - Create folder: `docs/module-02-ros2`
    - Create file: `docs/module-02/week-03-nodes.md` (Frontmatter Title: "Week 3: ROS 2 Nodes & Topics")
    - Create file: `docs/module-02/week-05-urdf.md` (Frontmatter Title: "Week 5: URDF Robot Description")

- [ ] **Module 3 (Simulation):**
    - Create folder: `docs/module-03-simulation`
    - Create file: `docs/module-03/week-06-gazebo.md` (Frontmatter Title: "Week 6: Gazebo Physics")
    - Create file: `docs/module-03/week-08-isaac.md` (Frontmatter Title: "Week 8: NVIDIA Isaac Sim")

- [ ] **Module 4 (Humanoids & VLA):**
    - Create folder: `docs/module-04-humanoid`
    - Create file: `docs/module-04/week-11-walking.md` (Frontmatter Title: "Week 11: Bipedal Locomotion")
    - Create file: `docs/module-04/week-13-capstone.md` (Frontmatter Title: "Week 13: Capstone Project")

## Response snapshot

Generated comprehensive Phase 2 task list for curriculum file structure with:

- **23 tasks total** (T008-T030): Directory creation, chapter file creation, sidebar config, verification
- **16 highly parallelizable tasks** across 4 module groups (T008-T025)
- **Complete frontmatter template** provided for consistency across all chapters
- **All 4 modules created** with 2 sample chapters per module:
  - Module 1: Physical AI & Sensors (Weeks 1-2)
  - Module 2: ROS 2 Fundamentals (Weeks 3-5)
  - Module 3: Gazebo & Isaac Sim (Weeks 6-10)
  - Module 4: VLA & Capstone (Weeks 11-13)
- **Parallel execution strategy** documented: 5 developers can work in parallel on different modules
- **Success criteria** defined: Directory structure, frontmatter validation, markdown rendering, navigation verification
- **5 verification tasks** (T027-T030): Build validation, sidebar check, link testing, breadcrumb verification

Key achievements:
- Each chapter includes learning_outcomes, week_number, module_number, proficiency_level, prerequisites, tags
- Assets directory structure created (diagrams/, images/, code-samples/, screenshots/)
- Entry point (docs/intro.md) created as curriculum gateway
- Sidebar configuration (sidebars.ts) task with auto-generation support
- Single developer: ~60 minutes; Multi-developer parallel: ~20 minutes

## Outcome

- ✅ Impact: Curriculum structure enables immediate content population; unblocks homepage chapter links and navigation; creates foundation for Phase 3 (content creation)
- 🧪 Tests: 7 verification tasks with manual and automated checks (build validation, link resolution)
- 📁 Files: Updated `specs/1-rag-platform/tasks.md` with Phase 2 section (23 tasks, comprehensive structure)
- 🔁 Next prompts: `/sp.implement` (execute Phase 2 tasks), `/sp.plan` (Phase 3+ content), `/sp.checklist` (QA verification)
- 🧠 Reflection: Task list captures all explicit requirements; provides significant parallel execution opportunities; includes complete frontmatter template for consistency; proper hierarchy and file paths

## Evaluation notes (flywheel)

- Failure modes observed: None; user input provided explicit folder/file requirements
- Graders run and results (PASS/FAIL): PASS (all 23 tasks are independently testable; acceptance criteria aligned with spec.md FR-033-FR-042)
- Prompt variant (if applicable): Phase 2 of multi-phase implementation
- Next experiment (smallest change to try): If requested, can add _category_.json metadata for week ranges or extraction tasks for specific content chunks
