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

## Next Steps (Post-Phase 2)

Once curriculum file structure is complete:
1. **Phase 3**: Populate chapters with curriculum content (13 weeks, multi-level variants)
2. **Phase 4**: Integrate RAG chatbot widget (ChatKit) via Docusaurus swizzling

