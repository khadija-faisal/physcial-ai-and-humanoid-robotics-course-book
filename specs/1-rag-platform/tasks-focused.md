# Tasks: Physical AI & Humanoid Robotics - Configuration & Module Setup

**Feature**: `1-rag-platform`
**Branch**: `1-rag-platform`
**Created**: 2025-12-06
**Status**: Ready for Implementation
**Focus**: Configure existing Docusaurus project + build module-first structure

---

## Overview

**Objective**: Configure existing Docosaurus + build 4-module curriculum structure with professional homepage UI (Reference Video Style).

**Execution Path**:
1. ✅ Group 1: Clean up & configure for professional branding
2. ✅ Group 2-5: Build module structure progressively
3. ✅ Group 6: Deploy to GitHub Pages

**MVP Scope**: Groups 1-2 (Professional homepage + Module 1) = ~2-3 hours

---

## Group 1: Configuration & Branding (The Pro Look)

### Goal
Professional homepage with Module Cards grid (reference video style), Urdu i18n support, production-ready config.

### Independent Test
- Homepage loads with Hero section
- 4 Module Cards visible and styled
- Docosaurus config reflects correct GitHub repo
- Urdu locale configured
- No default Docosaurus clutter visible

### Tasks

- [ ] T001 Delete default Docosaurus clutter: remove `blog/` directory, `docs/intro.md`, `docs/tutorial-*` files
- [ ] T002 Update `docosaurus.config.ts`: set title to "Physical AI & Humanoid Robotics", organizationName, projectName, baseUrl for GitHub Pages
- [ ] T003 Configure i18n in `docosaurus.config.ts`: add `i18n: { defaultLocale: "en", locales: ["en", "ur"] }`
- [ ] T004 [P] Create custom CSS file `src/css/custom.css`: add Tailwind imports, Module Card styles (grid layout, hover effects, responsive)
- [ ] T005 [P] Create TypeScript types file `src/types/content.ts`: define Chapter, Module, User proficiency types
- [ ] T006 Create custom homepage `src/pages/index.tsx`:
  - Hero section with title, subtitle, CTA button
  - Module Cards grid (4 cards) with module titles, week ranges, descriptions
  - Card styling: gradient background, shadow, hover effect
  - Responsive: mobile (1 col), tablet (2 col), desktop (4 col)
  - Link each card to `/docs/module-XX-name`
- [ ] T007 [P] Create reusable component `src/components/ModuleCard.tsx` (TypeScript): card layout, props for title/weeks/description
- [ ] T008 Create `sidebars.ts` with 4-module structure (placeholder links for now):
  ```typescript
  const sidebars = {
    docs: [
      { type: 'category', label: 'Module 1: Physical AI & Sensors (Weeks 1-2)', items: [] },
      { type: 'category', label: 'Module 2: ROS 2 Fundamentals (Weeks 3-5)', items: [] },
      { type: 'category', label: 'Module 3: Gazebo & Isaac Sim (Weeks 6-10)', items: [] },
      { type: 'category', label: 'Module 4: VLA & Capstone (Weeks 11-13)', items: [] },
    ]
  }
  ```
- [ ] T009 Run `npm run build` and verify no errors, build succeeds
- [ ] T010 Run `npm run start` and verify homepage looks professional (Hero + Module Cards) [CHECKPOINT 1]

---

## Group 2: Module 1 Structure (Physical AI & Sensors)

### Goal
Module 1 complete with 2 chapters (Week 1-2), integrated into sidebar, demonstrating module pattern.

### User Story: Learner accesses structured curriculum content (P1)

### Independent Test
- Module 1 folder exists with correct structure
- 2 chapters visible in sidebar
- Both chapters load without errors
- Frontmatter metadata present
- Navigation between chapters works

### Tasks

- [ ] T011 Create module folder `docs/module-01-physical-ai/`
- [ ] T012 Create `docs/module-01-physical-ai/_category_.json`:
  ```json
  {
    "label": "Module 1: Physical AI & Sensors (Weeks 1-2)",
    "position": 1,
    "collapsed": false,
    "collapsible": true
  }
  ```
- [ ] T013 [P] Create `docs/module-01-physical-ai/index.md` (Module Overview):
  - Frontmatter: title, learning_outcomes (3+), module_number: 1, tags
  - Content: Module objectives, week breakdown, skills you'll learn
- [ ] T014 [P] Create `docs/module-01-physical-ai/week-01.md` (Embodied Intelligence):
  - Frontmatter: title, learning_outcomes (3+), week_number: 1, module_number: 1, prerequisites, tags
  - Sections: "What is Physical AI?", "Embodied Intelligence Principles", "Course Overview"
  - Include sample code block (Python snippet for sensor initialization)
- [ ] T015 [P] Create `docs/module-01-physical-ai/week-02.md` (Sensors):
  - Frontmatter: title, learning_outcomes (3+), week_number: 2, module_number: 1, prerequisites: ["Week 1"], tags
  - Sections: "LIDAR Basics", "Camera Fundamentals", "IMU Measurements", "Multi-Sensor Fusion"
  - Include code examples, sensor comparison table
- [ ] T016 Update `sidebars.ts` Module 1 entry:
  ```typescript
  { type: 'category', label: 'Module 1: Physical AI & Sensors (Weeks 1-2)', items: [
    'module-01-physical-ai/index',
    'module-01-physical-ai/week-01',
    'module-01-physical-ai/week-02'
  ]}
  ```
- [ ] T017 Run `npm run start` and verify:
  - Module 1 visible in sidebar
  - Breadcrumb shows: "Docs > Module 1 > Week 1"
  - All 2 chapters load without errors
  - Navigation between weeks works [CHECKPOINT 2]

---

## Group 3: Module 2 Structure (ROS 2 Fundamentals)

### Goal
Module 2 skeleton with 3 placeholder chapters (Weeks 3-5), following Module 1 pattern.

### Independent Test
- Module 2 folder created
- 3 placeholder chapters present in sidebar
- All chapters load without errors
- Breadcrumb navigation works

### Tasks

- [ ] T018 Create module folder `docs/module-02-ros2/`
- [ ] T019 Create `docs/module-02-ros2/_category_.json` with Module 2 metadata
- [ ] T020 [P] Create `docs/module-02-ros2/index.md` (Module Overview) with placeholder content
- [ ] T021 [P] Create `docs/module-02-ros2/week-03.md` (ROS 2 Basics - Nodes, Topics, Services)
  - Frontmatter: title, week_number: 3, module_number: 2, prerequisites
  - Content: Placeholder sections (expand later)
- [ ] T022 [P] Create `docs/module-02-ros2/week-04.md` (URDF Robot Description)
- [ ] T023 [P] Create `docs/module-02-ros2/week-05.md` (Services & Parameters)
- [ ] T024 Update `sidebars.ts` Module 2 entry with all 3 chapters
- [ ] T025 Verify Module 2 appears in sidebar and chapters load

---

## Group 4: Module 3 Structure (Gazebo & Isaac Sim)

### Goal
Module 3 skeleton with 5 placeholder chapters (Weeks 6-10).

### Independent Test
- Module 3 folder created with 5 chapters
- All chapters load without errors
- Sidebar displays collapsible Module 3

### Tasks

- [ ] T026 Create module folder `docs/module-03-simulation/`
- [ ] T027 Create `docs/module-03-simulation/_category_.json`
- [ ] T028 [P] Create placeholder chapters for Weeks 6-10:
  - `index.md` (Module Overview)
  - `week-06.md` (Gazebo Introduction)
  - `week-07.md` (Gazebo Modeling)
  - `week-08.md` (Gazebo Advanced)
  - `week-09.md` (Isaac Sim Introduction)
  - `week-10.md` (Isaac Sim Advanced)
- [ ] T029 Update `sidebars.ts` Module 3 entry with all chapters
- [ ] T030 Verify Module 3 displays in sidebar

---

## Group 5: Module 4 Structure (VLA & Capstone)

### Goal
Module 4 skeleton with 3 placeholder chapters (Weeks 11-13).

### Independent Test
- Module 4 folder created with 3 chapters
- All chapters load
- All 4 modules now visible in sidebar

### Tasks

- [ ] T031 Create module folder `docs/module-04-vla/`
- [ ] T032 Create `docs/module-04-vla/_category_.json`
- [ ] T033 [P] Create placeholder chapters for Weeks 11-13:
  - `index.md` (Module Overview)
  - `week-11.md` (Vision-Language-Action Models)
  - `week-12.md` (VLA Integration & Deployment)
  - `week-13.md` (Capstone Project)
- [ ] T034 Update `sidebars.ts` Module 4 entry
- [ ] T035 Run `npm run start` and verify all 4 modules visible, all 13 weeks accessible

---

## Group 6: Deployment

### Goal
GitHub Pages deployment configured and live.

### Independent Test
- GitHub Actions workflow created
- Docosaurus config has correct GitHub metadata
- Site deploys automatically on push to main
- Live site accessible at GitHub Pages URL

### Tasks

- [ ] T036 Create `.github/workflows/deploy.yml`:
  ```yaml
  name: Deploy Docusaurus
  on:
    push:
      branches: [main]
  jobs:
    build-and-deploy:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v3
        - uses: actions/setup-node@v3
          with:
            node-version: '18'
            cache: 'npm'
        - run: npm install
        - run: npm run build
        - uses: peaceiris/actions-gh-pages@v3
          with:
            github_token: ${{ secrets.GITHUB_TOKEN }}
            publish_dir: ./build
  ```
- [ ] T037 Verify `docosaurus.config.ts` has:
  - `url: "https://yourusername.github.io"`
  - `baseUrl: "/physcial-ai-and-humanoid-robotics-course/"`
  - `organizationName: "yourusername"`
  - `projectName: "physcial-ai-and-humanoid-robotics-course"`
- [ ] T038 Commit all code: `git add . && git commit -m "Add complete curriculum structure with 4 modules and 13 chapters"`
- [ ] T039 Push to main: `git push origin main`
- [ ] T040 Verify GitHub Actions workflow runs (check Actions tab in GitHub)
- [ ] T041 Once deployed, verify live site: visit `https://yourusername.github.io/physcial-ai-and-humanoid-robotics-course/`
  - Homepage loads with Module Cards
  - All modules accessible
  - Navigation works [CHECKPOINT 3 - FINAL]

---

## Execution Strategy

### MVP Path (2-3 hours)
**Groups 1-2 only** - Professional homepage + Module 1
- Professional UI complete
- Module 1 (2 chapters) fully detailed
- Ready for demo
- Deploy to GitHub Pages

### Full Completion (6-8 hours)
**Groups 1-6** - Complete curriculum structure
- All 4 modules with 13 chapter placeholders
- Professional homepage with Module Cards
- GitHub Pages live deployment
- Ready for content authoring

### Parallel Opportunities
- **T001-T002**: Run in parallel (cleanup + config)
- **T004-T005, T007**: Run in parallel (CSS + types + component)
- **T013-T015, T020-T023, T028, T033**: All chapter creation tasks can run in parallel
- **T021-T023, T028, T033**: Placeholder chapters (5 weeks each module) can be written in parallel

---

## Success Metrics

| Metric | MVP Target | Full Target |
|--------|-----------|-----------|
| **Homepage** | Professional UI with Hero | ✅ |
| **Module Cards** | 4 cards displayed | ✅ |
| **Modules** | 1 (Physical AI) | 4 (all) |
| **Chapters** | 2 (detailed) | 13 (placeholders) |
| **Navigation** | Sidebar working | ✅ |
| **Live Site** | GitHub Pages deployed | ✅ |
| **Build Time** | <5 seconds | <5 seconds |
| **TypeScript Errors** | 0 | 0 |

---

## Next Steps After Tasks

1. **Content Authoring**: Replace placeholder chapters with full curriculum (learning outcomes, code examples, labs)
2. **Components**: Add TranslateBtn, PersonalizeBtn, ProficiencyWrapper components
3. **Backend Integration**: Connect to FastAPI backend for RAG chatbot
4. **Testing**: Verify all user stories and acceptance criteria

---

**Total Tasks**: 41 (MVP: 17, Full: 41)
**Estimated Time**: MVP 2-3 hours, Full 6-8 hours
**Ready**: ✅ All tasks executable with clear file paths

