# OmniLab Hub - Practical Portal

A modern, responsive practical portal built with React + Vite. Designed for fast code lookups, lab exam preparation, one-click code copying, and comprehensive observation tables.

## Supported Subjects

| Subject | Status | Description |
| :--- | :--- | :--- |
| **MDM** (Modern Digital Mobile Communication) | **Active** (10 Practicals) | Spectrum allocation, Tx-Channel-Rx simulation, cellular frequency reuse in MATLAB/Python, Wi-Fi channel mapping, signal propagation vs distance, and Bluetooth throughput |
| **SMLDS** (Statistical Machine Learning & Data Science) | **Upcoming** (10 Topics Planned) | Statistical modeling, regression diagnostics, PCA, and classification models |

## Features

- **Default Home Tab**: MDM practicals load immediately on visit.
- **1-Click Copy**: Instant clipboard copying for MATLAB and Python scripts, observation tables (in GitHub markdown format), and conclusions.
- **Search & Filter**: Real-time search across experiment titles, numbers, and techniques.
- **Observation Tables**: Clean measurement and data tables ready for lab journal submission.
- **Viva Voce Prep**: Comprehensive lab examination oral questions and verified answers.
- **Mobile First**: Fully responsive layout optimized for smartphones, tablets, and laptops.

## Run Locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start local development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:5173`.

## Build for Production

```bash
npm run build
```
