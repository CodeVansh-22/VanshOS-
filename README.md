# 🚀 VanshOS — Full Stack Personal Portfolio & Administrative Suite

**VanshOS** is a luxury, production-ready full-stack portfolio application and administrative control suite built for **Vansh Sunil Chauhan** (Full Stack Web Developer | BCA Graduate | Learning Data Analytics).

It features a high-performance **Next.js 15** frontend styled with **Tailwind CSS** and animated with **Framer Motion**, powered by a robust **Flask 3** REST API backend connected to a **MongoDB Atlas** cloud database cluster.

---

## 🌟 Live Demo & Deployment Links

| Component | Platform | Deployment URL / Status |
| :--- | :--- | :--- |
| **Frontend App** | Vercel | [https://vansh-os-eight.vercel.app](https://vansh-os-eight.vercel.app) |
| **Backend REST API** | Render | [https://vanshos.onrender.com/api](https://vanshos.onrender.com/api) |
| **Database Cluster** | MongoDB Atlas | `vanshos_db` (Cloud Managed) |

---

## 📐 System Architecture

```
                                  ┌────────────────────────┐
                                  │   Visitor / Admin      │
                                  └───────────┬────────────┘
                                              │
                                       HTTPS Requests
                                              │
                                              ▼
                                 ┌──────────────────────────┐
                                 │   Vercel Edge Network    │
                                 │   (Next.js 15 Frontend)  │
                                 └────────────┬─────────────┘
                                              │
                                       REST API Calls
                                              │
                                              ▼
                                 ┌──────────────────────────┐
                                 │  Render Cloud Platform   │
                                 │  (Flask + Gunicorn WSGI) │
                                 └────────────┬─────────────┘
                                              │
                                       PyMongo Driver
                                              │
                                              ▼
                                 ┌──────────────────────────┐
                                 │  MongoDB Atlas Cluster   │
                                 │   (vanshos_db Database)  │
                                 └──────────────────────────┘
```

---

## 💻 Tech Stack & Requirements

### System Requirements

- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher
- **Python**: `v3.10` or higher (`v3.13` recommended)
- **Database**: MongoDB Atlas Cluster or local MongoDB `v6.0+`
- **Git**: Installed for version control

### Technology Breakdown

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend** | Next.js 15 (App Router), React 19, Tailwind CSS, Framer Motion, React Icons, Axios |
| **Backend** | Python 3, Flask 3.1, Flask-CORS, Flask-JWT-Extended, Flask-Limiter, Werkzeug |
| **Database** | MongoDB Atlas, PyMongo Driver, BSON ObjectId serialization |
| **WSGI Server** | Gunicorn 23 |
| **Hosting** | Vercel (Frontend), Render (Backend), MongoDB Atlas (Database) |

---

## 📂 Project Structure

```
VanshOS-/
├── README.md                  # Main Project Documentation
├── README_DEPLOYMENT.md       # Step-by-Step Production Deployment Guide
├── .gitignore                 # Excluded files (node_modules, .next, venv)
├── backend/                   # Flask REST API Service
│   ├── app.py                 # Application Factory & Startup
│   ├── config.py              # Configuration Settings
│   ├── Procfile               # Gunicorn Start Command
│   ├── render.yaml            # Render Blueprint Manifest
│   ├── requirements.txt       # Python Package Dependencies
│   ├── middleware/            # Error Handlers & Security Headers
│   ├── models/                # PyMongo Connection & Helpers
│   ├── routes/                # Blueprint Route Handlers (Auth, Projects, Skills, etc.)
│   ├── schemas/               # Input Validation Logic
│   ├── services/              # Business Logic & Database Services
│   ├── uploads/               # Uploaded Files Directory (PDFs & Images)
│   └── utils/                 # Utilities (File Uploader, Pagination, Response, Slug)
└── frontend/                  # Next.js 15 Web Application
    ├── app/                   # App Router (Pages, Layouts, SEO, Admin Routes)
    ├── components/            # Reusable UI & Section Components
    ├── lib/                   # Utility Functions (getFileUrl, cn)
    ├── public/                # Static Media Assets & Web Manifest
    ├── services/              # Axios API Client & Service Modules
    ├── styles/                # Global CSS Styles
    ├── next.config.js         # Next.js Configuration
    ├── package.json           # Dependencies & Scripts
    └── vercel.json            # Vercel Deployment & Caching Config
```

---

## ⚙️ Environment Variables

### 1. Backend (`backend/.env`)

```env
FLASK_ENV=production
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/vanshos_db?retryWrites=true&w=majority
JWT_SECRET_KEY=vanshos_jwt_access_secret_2026_key_super_secure
SECRET_KEY=vanshos_flask_session_secret_2026
FRONTEND_URL=https://vansh-os-eight.vercel.app
UPLOAD_FOLDER=uploads
MAX_CONTENT_LENGTH=16777216
PORT=5000
```

### 2. Frontend (`frontend/.env.local`)

```env
NEXT_PUBLIC_API_URL=https://vanshos.onrender.com/api
NEXT_PUBLIC_SITE_URL=https://vansh-os-eight.vercel.app
```

---

## 🚀 Local Installation & Setup Guide

### 1. Clone Repository
```bash
git clone https://github.com/CodeVansh-22/VanshOS-.git
cd VanshOS-
```

### 2. Backend Setup
```bash
cd backend

# Create Virtual Environment
python -m venv venv

# Activate Virtual Environment (Windows)
venv\Scripts\activate

# Activate Virtual Environment (Mac/Linux)
source venv/bin/activate

# Install Dependencies
pip install -r requirements.txt

# Start Flask Backend
python app.py
```
> Backend runs at: `http://localhost:5000`

### 3. Frontend Setup
```bash
# Open a new terminal window
cd frontend

# Install Node Dependencies
npm install

# Start Next.js Development Server
npm run dev
```
> Frontend runs at: `http://localhost:3000`

---

## 🛡️ Key Features

- **Luxury Aesthetics**: Dark glassmorphism UI with gold & emerald accents, smooth scroll animations, and interactive cursor glow.
- **Experience Timeline**: Animated career timeline featuring internships and accomplishments.
- **Live PDF & Certificate Viewer**: Embedded inline document previews for resumes and certificates.
- **Administrative Control Suite**: Passwordless admin login for updating skills, experience, projects, certificates, and viewing analytics.
- **SEO & PWA Optimized**: Built-in `sitemap.xml`, `robots.txt`, open graph metadata, and web app manifest.

---

## 📄 Documentation Links

- [Backend Documentation](file:///d:/Coding/VanshOS-/backend/README.md)
- [Frontend Documentation](file:///d:/Coding/VanshOS-/frontend/README.md)
- [Deployment Handbook](file:///d:/Coding/VanshOS-/README_DEPLOYMENT.md)

---

## 👤 Author Information

- **Name**: Vansh Sunil Chauhan
- **Degree**: Bachelor of Computer Applications (BCA)
- **University**: Yashwantrao Chavan Maharashtra Open University (YCMOU)
- **Email**: vanshchauhand@gmail.com
- **GitHub**: [CodeVansh-22](https://github.com/CodeVansh-22)
- **LinkedIn**: [Vansh Chauhan](https://www.linkedin.com/in/vansh-chauhan-295672238)
