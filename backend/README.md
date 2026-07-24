# VanshOS Flask Backend API Service

Production-ready **Flask 3** backend for **VanshOS** luxury portfolio and administrative control suite.

---

## 🛠️ Tech Stack & Features
- **Language**: Python 3.13+
- **Framework**: Flask 3.1.0 with Flask Blueprints
- **Database**: MongoDB Atlas (PyMongo) with ObjectId serialization helpers
- **Authentication**: JWT Token Auth (Flask-JWT-Extended) & bcrypt password hashing
- **Security & Rate Limiting**: Flask-CORS, Flask-Limiter, Werkzeug file sanitization
- **File Management**: Secure upload handling for PDFs and images

---

## 📁 Directory Structure
```
backend/
├── venv/                 # Python Virtual Environment
├── app.py                # Main Application Entrypoint & Factory
├── config.py             # Config class mapping env variables
├── requirements.txt      # Dependencies manifest
├── .env                  # Local Environment Variables
├── .env.example          # Environment Template
├── models/
│   └── db.py             # PyMongo database connection & helpers
├── utils/
│   ├── response.py       # Standard JSON response format
│   ├── slug.py           # URL slug generator
│   ├── file_uploader.py  # File upload validator & storage
│   └── pagination.py     # Cursor pagination helper
├── schemas/
│   └── validators.py     # Request validation rules
├── middleware/
│   └── error_handler.py # Error handlers (400, 401, 403, 404, 413, 429, 500)
├── services/
│   ├── project_service.py
│   ├── resume_service.py
│   ├── analytics_service.py
│   └── message_service.py
├── routes/
│   ├── auth.py           # /api/auth
│   ├── projects.py       # /api/projects
│   ├── skills.py         # /api/skills
│   ├── achievements.py   # /api/achievements
│   ├── messages.py       # /api/messages & /api/contact
│   ├── resume.py         # /api/resume
│   ├── analytics.py      # /api/analytics
│   └── settings.py       # /api/settings
└── uploads/              # Uploaded static files directory
```

---

## 🚀 Setup & Execution Instructions

### 1. Virtual Environment Setup
```bash
# Navigate to backend directory
cd backend

# Create isolated Python virtual environment
python -m venv venv

# Activate Virtual Environment:
# Windows (PowerShell):
venv\Scripts\activate

# Linux / Mac:
source venv/bin/activate
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Environment Variables Setup
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Ensure your `MONGO_URI` is set to your MongoDB Atlas cluster string or local MongoDB instance:
```env
MONGO_URI=mongodb://localhost:27017/vanshos_db
JWT_SECRET_KEY=vanshos_jwt_access_secret_2026_key_super_secure
SECRET_KEY=vanshos_flask_session_secret_2026
UPLOAD_FOLDER=uploads
MAX_CONTENT_LENGTH=16777216
PORT=5000
```

### 4. Run Development Server
```bash
python app.py
```

API will launch at: [http://localhost:5000](http://localhost:5000)

Health check endpoint: `GET http://localhost:5000/health`

---

## 🔒 Production Deployment (Gunicorn)

To run in production mode with Gunicorn WSGI server:
```bash
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```
