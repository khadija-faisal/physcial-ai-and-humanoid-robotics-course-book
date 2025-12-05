# Quick Start Guide: Physical AI & Humanoid Robotics Platform

**Objective**: Get both frontend (Docusaurus) and backend (FastAPI) running locally in ~30 minutes.

---

## Prerequisites

- Node.js 18+
- Python 3.10+
- Git
- PostgreSQL client (psql) - optional for debugging
- OpenAI API key
- Qdrant Cloud account (Free Tier)
- Neon Postgres account

---

## Part 1: Frontend Setup (Docusaurus)

### Step 1: Initialize Docusaurus

```bash
cd /path/to/physcial-ai-and-humanoid-robotics-course

# Create Docusaurus project (if not exists)
npx create-docusaurus@latest docs-site classic

cd docs-site
```

### Step 2: Install Dependencies

```bash
npm install
npm install @openai/chatkit-sdk dotenv
```

### Step 3: Configure `docusaurus.config.js`

```javascript
// docusaurus.config.js
module.exports = {
  title: 'Physical AI & Humanoid Robotics',
  tagline: '13-Week Curriculum with AI Assistant',
  url: 'https://yourusername.github.io',
  baseUrl: '/physcial-ai-and-humanoid-robotics-course/',
  organizationName: 'yourusername',
  projectName: 'physcial-ai-and-humanoid-robotics-course',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ur'],
    localeConfigs: {
      en: { label: 'English' },
      ur: { label: 'اردو' }
    }
  },

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
```

### Step 4: Create Directory Structure

```bash
mkdir -p docs/module-01 docs/module-02 docs/module-03 docs/module-04 docs/assets/{diagrams,images,code-samples}

# Create sample chapter
cat > docs/module-01/chapter-01.md << 'EOF'
---
title: "Chapter 1: Introduction to Physical AI"
learning_outcomes:
  - Understand Physical AI fundamentals
  - Identify key sensors in robotics
week_number: 1
module_number: 1
proficiency_level: ["Beginner", "Intermediate", "Advanced"]
prerequisites: []
tags: ["physical-ai", "sensors"]
authors: ["Author Name"]
last_updated: "2025-12-06"
---

## Welcome to Physical AI

This is the first chapter of the Physical AI & Humanoid Robotics curriculum...

<ProficiencyWrapper level="Beginner">
### Beginner Explanation
Sensors are devices that detect changes in the physical world...
</ProficiencyWrapper>

<ProficiencyWrapper level="Advanced">
### Advanced Explanation
Multi-modal sensor fusion using Kalman filters and particle filters...
</ProficiencyWrapper>
EOF
```

### Step 5: Create `sidebars.js`

```javascript
// sidebars.js
module.exports = {
  docs: [
    {
      type: 'category',
      label: 'Module 1: Physical AI & Sensors',
      items: ['module-01/chapter-01', 'module-01/chapter-02'],
    },
    {
      type: 'category',
      label: 'Module 2: ROS 2 Fundamentals',
      items: ['module-02/chapter-03', 'module-02/chapter-04', 'module-02/chapter-05'],
    },
    {
      type: 'category',
      label: 'Module 3: Gazebo & Isaac Sim',
      items: ['module-03/chapter-06', 'module-03/chapter-07', 'module-03/chapter-08', 'module-03/chapter-09', 'module-03/chapter-10'],
    },
    {
      type: 'category',
      label: 'Module 4: VLA & Capstone',
      items: ['module-04/chapter-11', 'module-04/chapter-12', 'module-04/chapter-13'],
    },
  ],
};
```

### Step 6: Create React Component for Proficiency Wrapper

```jsx
// src/components/ProficiencyWrapper.jsx
import React, { useState, useEffect } from 'react';

export default function ProficiencyWrapper({ level, children }) {
  const [userLevel, setUserLevel] = useState('Beginner');

  useEffect(() => {
    const saved = localStorage.getItem('proficiency_level') || 'Beginner';
    setUserLevel(saved);
  }, []);

  if (userLevel !== level) {
    return null;  // Don't render if level doesn't match
  }

  return <div className={`proficiency-${level.toLowerCase()}`}>{children}</div>;
}
```

### Step 7: Swizzle Root Component for ChatKit

```bash
npm run swizzle @docusaurus/theme-classic Root

# File: src/theme/Root.js
import React, { useEffect, useState } from 'react';
import { ChatKit } from '@openai/chatkit-sdk';

export default function Root({ children }) {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('user_id');
    setUserId(stored);
  }, []);

  return (
    <>
      {children}
      {userId && (
        <ChatKit
          apiEndpoint={process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000'}
          userId={userId}
          theme="light"
          position="right"
        />
      )}
    </>
  );
}
```

### Step 8: Create `.env.local`

```
REACT_APP_BACKEND_URL=http://localhost:8000
```

### Step 9: Run Docusaurus Locally

```bash
npm run start
# Open http://localhost:3000
```

---

## Part 2: Backend Setup (FastAPI)

### Step 1: Create Python Project Structure

```bash
cd /path/to/physcial-ai-and-humanoid-robotics-course

mkdir -p backend
cd backend

# Create virtual environment
python3.10 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Create project files
touch main.py requirements.txt .env
```

### Step 2: Create `requirements.txt`

```
fastapi==0.104.0
uvicorn==0.24.0
pydantic==2.0.0
sqlalchemy==2.0.0
psycopg2-binary==2.9.0
qdrant-client==2.7.0
openai==1.0.0
python-jose==3.3.0
passlib==1.7.4
python-multipart==0.0.6
python-dotenv==1.0.0
```

### Step 3: Create `.env`

```
DATABASE_URL=postgresql://user:password@host:port/database
QDRANT_URL=https://your-instance.qdrant.io
QDRANT_API_KEY=your-api-key
OPENAI_API_KEY=your-openai-key
JWT_SECRET=your-secret-key-change-in-production
```

### Step 4: Create `main.py` (Minimal FastAPI App)

```python
# main.py
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Physical AI & Humanoid Robotics API")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://yourusername.github.io"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class SignupRequest(BaseModel):
    email: str
    password: str
    background: str

class SigninRequest(BaseModel):
    email: str
    password: str

class ChatbotQueryRequest(BaseModel):
    question: str
    context_id: str

# Placeholder endpoints (full implementation in tasks)
@app.get("/")
async def root():
    return {"message": "Physical AI & Humanoid Robotics API"}

@app.post("/auth/signup")
async def signup(req: SignupRequest):
    # TODO: Implement signup logic
    return {"user_id": "placeholder-uuid", "token": "placeholder-jwt"}

@app.post("/auth/signin")
async def signin(req: SigninRequest):
    # TODO: Implement signin logic
    return {"user_id": "placeholder-uuid", "token": "placeholder-jwt"}

@app.get("/chapters")
async def list_chapters(search: Optional[str] = None):
    # TODO: Implement chapter listing from Neon
    return []

@app.post("/chatbot/query")
async def chatbot_query(req: ChatbotQueryRequest):
    # TODO: Implement RAG query logic
    return {
        "answer": "Answer from RAG",
        "citation": {
            "chapter": "Chapter 1",
            "section": "Introduction",
            "quote": "..."
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

### Step 5: Run FastAPI Locally

```bash
python main.py
# Open http://localhost:8000/docs (Swagger UI)
```

---

## Part 3: Integration Test

### Step 1: Test Frontend + Backend Connection

```bash
# Terminal 1: Run Docusaurus
cd docs-site
npm run start
# Open http://localhost:3000

# Terminal 2: Run FastAPI
cd backend
source venv/bin/activate
python main.py
```

### Step 2: Verify Both Running

- **Frontend**: http://localhost:3000 (Docusaurus)
- **Backend**: http://localhost:8000/docs (Swagger UI)
- **ChatKit Widget**: Should appear on Docusaurus pages (once userId is in sessionStorage)

---

## Part 4: Deploy to Production

### Frontend (GitHub Pages)

```bash
# 1. Update docusaurus.config.js with your GitHub repo
# 2. Create .github/workflows/deploy.yml (see plan.md for template)
# 3. Push to main branch
git add .
git commit -m "Deploy Docusaurus to GitHub Pages"
git push origin main
# GitHub Actions will auto-deploy to GitHub Pages
```

### Backend (Render/Fly.io)

```bash
# Example: Deploy to Render.com
# 1. Push to GitHub
# 2. Create new Web Service on Render
# 3. Select GitHub repo
# 4. Set environment variables (DATABASE_URL, QDRANT_API_KEY, OPENAI_API_KEY)
# 5. Deploy (Render auto-builds from requirements.txt)
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| **Docusaurus won't start** | Clear node_modules: `rm -rf node_modules && npm install` |
| **FastAPI import errors** | Activate venv: `source venv/bin/activate` |
| **CORS errors** | Check `allow_origins` in FastAPI CORS middleware |
| **Qdrant connection fails** | Verify API key and endpoint in `.env` |
| **No ChatKit widget** | Ensure `user_id` is set in `sessionStorage` |

---

## Next Steps

1. ✅ Frontend locally running
2. ✅ Backend locally running
3. ⏭️ Implement Phase 2 tasks (Auth, Qdrant integration, RAG logic)
4. ⏭️ Author 13-week curriculum content
5. ⏭️ Deploy and verify live

---

**Ready to build?** Run `/sp.tasks` to generate task breakdown.
