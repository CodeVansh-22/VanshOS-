# 🐍 VanshOS — Flask 3 REST API Service

The backend REST API service for **VanshOS** is built using **Python 3**, **Flask 3**, **PyMongo**, and **MongoDB Atlas**.

---

## 🛠️ Tech Stack & Dependencies

- **Language**: Python 3.10+ (Recommended: Python 3.13)
- **Framework**: Flask 3.1.0 (Modular Blueprints)
- **Database**: MongoDB Atlas Cloud (`vanshos_db` database)
- **Database Driver**: PyMongo 4.10 with `dnspython` & `certifi` SSL
- **WSGI Server**: Gunicorn 23.0.0
- **Authentication**: JWT Tokens (`Flask-JWT-Extended`)
- **Rate Limiting**: Flask-Limiter 3.10
- **File Uploads**: Werkzeug `secure_filename` with static file serving

---

## 📡 REST API Endpoint Documentation

| Method | Endpoint | Auth Required | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/health` | No | System health check & MongoDB connection status |
| `POST` | `/api/auth/login` | No | Email admin login & JWT token generation |
| `POST` | `/api/auth/refresh` | Yes (Refresh) | Issue new JWT access token |
| `GET` | `/api/projects` | No | List all portfolio projects |
| `POST` | `/api/projects` | Yes | Create a new project |
| `PUT` | `/api/projects/<id>` | Yes | Update existing project |
| `DELETE` | `/api/projects/<id>` | Yes | Delete a project |
| `GET` | `/api/experience` | No | List all work experience items |
| `POST` | `/api/experience` | Yes | Add new experience record |
| `PUT` | `/api/experience/<id>`| Yes | Update experience record |
| `DELETE` | `/api/experience/<id>`| Yes | Delete experience record |
| `GET` | `/api/skills` | No | List all technical skills |
| `POST` | `/api/skills` | Yes | Add new skill |
| `PUT` | `/api/skills/<id>` | Yes | Update skill level |
| `DELETE` | `/api/skills/<id>` | Yes | Delete skill |
| `GET` | `/api/achievements` | No | List all certifications & achievements |
| `POST` | `/api/achievements` | Yes | Create achievement record |
| `POST` | `/api/achievements/upload` | Yes | Upload certificate PDF/image file |
| `DELETE` | `/api/achievements/<id>` | Yes | Delete achievement record |
| `GET` | `/api/resume` | No | Get active resume metadata |
| `GET` | `/api/resume/view` | No | Serve resume PDF inline for iframe preview |
| `GET` | `/api/resume/download` | No | Download resume PDF attachment |
| `POST` | `/api/resume/upload` | Yes | Upload & replace active resume PDF |
| `POST` | `/api/messages` | No | Send contact inquiry message |
| `GET` | `/api/messages` | Yes | Retrieve all visitor inquiry messages |
| `POST` | `/api/analytics/visitor` | No | Record visitor pageview event |
| `GET` | `/api/analytics/dashboard` | Yes | Get admin analytics summary statistics |

---

## ⚙️ Environment Variables (`backend/.env`)

```env
FLASK_ENV=production
MONGO_URI=mongodb+srv://vanshchauhand_db_user:UzFd8uO37RPaKoKp@vanshos.kd1iyed.mongodb.net/vanshos_db?retryWrites=true&w=majority&appName=VanshOS
JWT_SECRET_KEY=vanshos_jwt_access_secret_2026_key_super_secure
SECRET_KEY=vanshos_flask_session_secret_2026
FRONTEND_URL=https://vansh-os-eight.vercel.app
UPLOAD_FOLDER=uploads
MAX_CONTENT_LENGTH=16777216
PORT=5000
```

---

## 🚀 Setup & Execution Instructions

```bash
# Navigate to backend directory
cd backend

# Create Virtual Environment
python -m venv venv

# Activate Virtual Environment (Windows)
venv\Scripts\activate

# Install locked dependencies
pip install -r requirements.txt

# Run Development Server
python app.py
```

### Production WSGI Command (Render / Linux)

```bash
gunicorn app:app --bind 0.0.0.0:$PORT --workers 4 --threads 2
```
