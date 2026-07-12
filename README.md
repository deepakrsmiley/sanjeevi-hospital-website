# Sri Sanjeevi Hospital — MERN Stack Website

**Care for Women. Care for Life.**

A complete, production-ready MERN stack website for **Sri Sanjeevi Hospital**, a women's and maternity hospital in Mathur, Tamil Nadu.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **M**ongoDB | Database (via Mongoose ODM) |
| **E**xpress | Node.js REST API server |
| **R**eact | Frontend (Vite + Tailwind CSS v4) |
| **N**ode.js | Runtime (v18+) |

---

## Quick Start

### Prerequisites
- Node.js 18+
- npm
- MongoDB (local or [MongoDB Atlas](https://cloud.mongodb.com))

### 1. Clone / Extract the project
```bash
cd sri-sanjeevi-hospital
```

### 2. Copy environment variables
```bash
cp .env.example .env
```
Edit `.env` and set your MongoDB connection string:
```env
MONGO_URI=mongodb://localhost:27017/sri_sanjeevi
# OR for MongoDB Atlas:
# MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/sri_sanjeevi
PORT=5000
NODE_ENV=development
```

### 3. Install all dependencies
```bash
npm run install:all
```

### 4. Seed the database with initial data
```bash
npm run seed
```

### 5. Start in development mode
```bash
npm run dev
```
- **Frontend** → http://localhost:3000
- **API** → http://localhost:5000/api

---

## Production Deployment

### Build the frontend
```bash
npm run build
```

### Start the production server
```bash
NODE_ENV=production npm start
```
The Express server will serve both the API (`/api/*`) and the built React frontend from a single port (5000).

---

## Project Structure

```
sri-sanjeevi-hospital/
├── server/
│   ├── index.js          # Express app + all routes
│   ├── models.js         # All Mongoose schemas/models
│   └── seed.js           # Seed MongoDB with sample data
├── client/
│   ├── public/
│   │   └── logo.jpeg     # Hospital logo
│   ├── src/
│   │   ├── api/
│   │   │   └── index.ts  # All API fetch functions
│   │   ├── hooks/
│   │   │   └── useFetch.ts  # Custom data-fetching hook
│   │   ├── components/
│   │   │   ├── home/     # Home page sections
│   │   │   ├── layout/   # Navbar, Footer, layouts
│   │   │   └── ui/       # Base UI components
│   │   ├── pages/
│   │   │   ├── admin/    # Admin panel pages
│   │   │   └── *.tsx     # All public pages
│   │   ├── App.tsx
│   │   └── index.css
│   ├── index.html
│   └── package.json
├── .env.example
├── package.json           # Root — scripts + server deps
└── README.md
```

---

## All Pages

### Public Website
| Page | URL |
|------|-----|
| Home | `/` |
| About Us | `/about` |
| Doctors | `/doctors` |
| Services | `/services` |
| Facilities | `/facilities` |
| Gallery | `/gallery` |
| Blog | `/blog` |
| Appointment Booking | `/appointment` |
| Contact Us | `/contact` |

### Admin Panel (No login required)
| Page | URL |
|------|-----|
| Dashboard | `/admin` |
| Appointments | `/admin/appointments` |
| Doctors | `/admin/doctors` |
| Blog Posts | `/admin/blog` |
| Advertisements | `/admin/advertisements` |

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/doctors` | List all doctors |
| POST | `/api/doctors` | Add doctor |
| PUT | `/api/doctors/:id` | Update doctor |
| DELETE | `/api/doctors/:id` | Delete doctor |
| GET | `/api/services` | List all services |
| GET | `/api/appointments` | List appointments |
| POST | `/api/appointments` | Book appointment |
| PUT | `/api/appointments/:id` | Update appointment status |
| GET | `/api/blog` | List blog posts |
| GET | `/api/blog/:id` | Get single post |
| POST | `/api/blog` | Create post |
| GET | `/api/testimonials` | List testimonials |
| GET | `/api/gallery` | List gallery items |
| GET | `/api/advertisements` | List active advertisements |
| POST | `/api/contact` | Submit contact message |
| GET | `/api/stats` | Dashboard stats |

---

## Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Purple | `#6A1B9A` | Main brand, buttons, headings |
| Secondary Pink | `#E91E63` | Accents, highlights |
| Dark Footer | `#2d0a4e` | Footer background |

---

## Hospital Contact

**Sri Sanjeevi Hospital**
Near Kalaimaigal School, Uthangai Main Road, Mathur
Phone: 99944 72774 / 93634 34021
Email: info@srisanjeevihospital.com

---

## Deploy to Cloud

### Deploy on Railway / Render
1. Set `MONGO_URI` to your MongoDB Atlas connection string
2. Set `PORT` to your preferred port
3. Set `NODE_ENV=production`
4. Build command: `npm run install:all && npm run build`
5. Start command: `npm start`

### Deploy on Vercel (frontend only)
Deploy only the `client/` folder to Vercel and point the API URL to a separate server.

---

*© 2024 Sri Sanjeevi Hospital. All Rights Reserved.*
