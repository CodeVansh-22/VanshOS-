# ⚡ VanshOS — Next.js 15 Frontend Web Application

The frontend web application for **VanshOS** is a luxury digital portfolio and administrative suite built with **Next.js 15**, **React 19**, **Tailwind CSS**, and **Framer Motion**.

---

## 🛠️ Tech Stack & Key Libraries

- **Framework**: Next.js 15 (App Router Architecture)
- **UI Library**: React 19
- **Styling**: Tailwind CSS with custom glassmorphism & luxury color tokens
- **Animations**: Framer Motion
- **Icons**: React Icons (`fi` set)
- **HTTP Client**: Axios with request/response interceptors
- **Utility Helpers**: `clsx`, `tailwind-merge`, custom `getFileUrl` URL resolver

---

## 📌 Page Routes Overview

### Public Routes
| Route | Component | Description |
| :--- | :--- | :--- |
| `/` | `app/page.js` | Main Portfolio Landing Page (Hero, About, Experience, Skills, Projects, Achievements, Contact) |
| `/robots.txt` | `app/robots.js` | SEO Crawler Directives |
| `/sitemap.xml` | `app/sitemap.js` | Dynamic XML Sitemap |

### Administrative Control Suite Routes
| Route | Component | Description |
| :--- | :--- | :--- |
| `/admin/login` | `app/admin/login/page.js` | Email-authenticated Admin Login Panel |
| `/admin/dashboard` | `app/admin/dashboard/page.js` | System Overview & Quick Stats |
| `/admin/experience` | `app/admin/experience/page.js` | Work Experience Management |
| `/admin/skills` | `app/admin/skills/page.js` | Skills & Proficiency Rating Manager |
| `/admin/projects` | `app/admin/projects/page.js` | Portfolio Projects CRUD & Demo Link Manager |
| `/admin/achievements` | `app/admin/achievements/page.js` | Certifications & File Attachment Manager |
| `/admin/resume` | `app/admin/resume/page.js` | PDF Resume Upload & Live Document Viewer |
| `/admin/messages` | `app/admin/messages/page.js` | Visitor Contact Form Submissions Viewer |
| `/admin/analytics` | `app/admin/analytics/page.js` | Traffic & Pageview Analytics |
| `/admin/settings` | `app/admin/settings/page.js` | Site Settings & Account Configurations |

---

## ⚙️ Environment Variables Setup

Create a `.env.local` file inside the `frontend/` directory:

```env
# Backend API Base URL
NEXT_PUBLIC_API_URL=https://vanshos.onrender.com/api

# Canonical Site URL
NEXT_PUBLIC_SITE_URL=https://vansh-os-eight.vercel.app
```

---

## 🚀 Development & Build Commands

```bash
# Install Node.js dependencies
npm install

# Start local development server
npm run dev

# Create optimized production build
npm run build

# Start production server locally
npm start

# Run code linter
npm run lint
```

---

## 🎨 Design System Highlights

- **Background**: Deep Luxury Obsidian (`#070707` / `#0B0B0B`)
- **Accents**: Metallic Gold (`#DFB531` / `#D4AF37`) & Emerald Green (`#10B981`)
- **Cards**: Translucent glassmorphism (`glass-card`) with subtle border glows
- **Typography**: Playfair Display (Headings) & Inter (Body & UI Buttons)
- **PDF Resolution**: Automatic URL formatting via `getFileUrl()` pointing to backend storage
