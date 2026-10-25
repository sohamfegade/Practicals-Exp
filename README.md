# OmniLab Hub

A modern, responsive multi-subject engineering and computing practicals portal built with React + Vite. Designed for fast code lookups, lab exam preparation, and one-click code copying across multiple university subjects.

## Supported Subjects

| Subject | Code | Status | Description |
| :--- | :--- | :--- | :--- |
| **AI & SC** | CS-AI-601 | **Active** (14 Practicals) | Artificial Intelligence & Soft Computing (Search, Minimax, GenAI, RAG, Neural Nets) |
| **SMLDS** | DS-SML-602 | **Upcoming** (10 Topics Planned) | Statistical Machine Learning & Data Science (Regression, PCA, KNN, Clustering) |
| **ASDD** | SE-ASD-603 | **Upcoming** (10 Topics Planned) | Agile Software Development & DevOps (Scrum, CI/CD, Docker, SonarQube) |
| **MDM** | IT-MDM-604 | **Upcoming** (10 Topics Planned) | Master Data Management (Golden Record, Deduplication, Record Linkage, Governance) |

## Features

- **Multi-Subject Navigation**: Dedicated pill tabs to switch seamlessly between AI & SC, SMLDS, ASDD, and MDM courses.
- **1-Click Copy**: Instant clipboard copying with fallback support.
- **Search & Filter**: Real-time search across experiment titles, numbers, and libraries.
- **Rich Upcoming Status**: Curated syllabus outlines, roadmap timeline, and topic preview for upcoming subjects.
- **Mobile First**: Fully responsive layout optimized for smartphones, tablets, and desktops.

## Run Locally

1. Install Node.js (LTS recommended).
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start local development server:
   ```bash
   npm run dev
   ```
4. Open the local URL printed by Vite (typically `http://localhost:5173`).

## Deploy on Vercel

1. Push this project to GitHub.
2. Import the repository into [Vercel](https://vercel.com).
3. Framework Preset: **Vite**. Build Command: `npm run build`. Output Directory: `dist`.
4. Deploy!

## Updating Practical Codes & Subjects

- **AI Experiments**: Edit `src/data/experiments.json`.
- **Subject Details & Curriculum**: Edit `src/data/subjects.js` to add or update subjects and their planned experiments.
