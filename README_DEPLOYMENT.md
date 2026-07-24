# 🚀 VanshOS Production Cloud Deployment Handbook

Complete guide for deploying **VanshOS** to **Render (Backend)**, **Vercel (Frontend)**, and **MongoDB Atlas (Database)**.

---

## 📋 System Architecture

```
[ Visitor Browser ] ─── HTTPS ───► [ Vercel Edge CDN (Frontend) ]
                                          │
                                       REST API
                                          │
                                          ▼
[ Admin Dashboard ] ─── HTTPS ───► [ Render Gunicorn WSGI (Backend) ]
                                          │
                                       PyMongo
                                          │
                                          ▼
                                 [ MongoDB Atlas Cluster ]
```

---

## 🗄️ Step 1: MongoDB Atlas Configuration

1. Log in to [MongoDB Atlas Console](https://cloud.mongodb.com).
2. Go to **Network Access** under Security:
   - Click **Add IP Address**.
   - Click **Allow Access from Anywhere** (`0.0.0.0/0`) so Render instances can connect securely.
3. Obtain Connection String:
   ```env
   MONGO_URI=mongodb+srv://vanshchauhand_db_user:UzFd8uO37RPaKoKp@vanshos.kd1iyed.mongodb.net/vanshos_db?retryWrites=true&w=majority&appName=VanshOS
   ```

---

## 🐍 Step 2: Backend Deployment on Render

1. Go to [Render Dashboard](https://dashboard.render.com).
2. Click **New +** ➔ **Web Service**.
3. Connect your GitHub repository (`CodeVansh-22/VanshOS-`).
4. Configure Service Settings:
   - **Name**: `vanshos-backend`
   - **Root Directory**: `backend`
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app --bind 0.0.0.0:$PORT --workers 4 --threads 2`
5. Add Environment Variables:
   | Key | Value | Description |
   | :--- | :--- | :--- |
   | `FLASK_ENV` | `production` | Environment mode |
   | `MONGO_URI` | `mongodb+srv://...` | MongoDB Atlas Connection String |
   | `JWT_SECRET_KEY` | `vanshos_super_secret_jwt_key_2026` | JWT Auth Secret |
   | `SECRET_KEY` | `vanshos_app_secret_key_2026` | Flask Session Secret |
   | `FRONTEND_URL` | `https://vanshos.vercel.app` | Production Frontend Origin |
   | `UPLOAD_FOLDER` | `uploads` | Upload Directory |

6. Click **Create Web Service**. Your API will be live at:
   `https://vanshos-backend.onrender.com/api`

---

## ⚡ Step 3: Frontend Deployment on Vercel

1. Log in to [Vercel Dashboard](https://vercel.com).
2. Click **Add New...** ➔ **Project**.
3. Import your GitHub repository (`CodeVansh-22/VanshOS-`).
4. Framework Preset: **Next.js**
5. **Root Directory**: `frontend`
6. Add Environment Variable:
   | Key | Value |
   | :--- | :--- |
   | `NEXT_PUBLIC_API_URL` | `https://vanshos-backend.onrender.com/api` |
   | `NEXT_PUBLIC_SITE_URL` | `https://vanshos.vercel.app` |

7. Click **Deploy**. Your portfolio will be live at:
   `https://vanshos.vercel.app`

---

## 🔐 Step 4: Admin Credentials & First Login

- **Admin Login Route**: `https://vanshos.vercel.app/admin/login`
- **Email**: `vanshchauhand@gmail.com`
- **Password**: `admin123`

---

## ✅ Post-Deployment Verification Checklist

- [x] Public Portfolio loads cleanly at `https://vanshos.vercel.app`.
- [x] Experience timeline loads from `/api/experience`.
- [x] Contact form transmits inquiry to `/api/messages`.
- [x] Admin Login authenticates via JWT.
- [x] Experience, Skills, Projects, and Achievements CRUD save to MongoDB Atlas.
- [x] Resume download & preview function on Render API.
- [x] SEO `robots.txt` and `sitemap.xml` generated.
