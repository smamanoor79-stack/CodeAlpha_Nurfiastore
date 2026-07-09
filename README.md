# 🛍️ CodeAlpha - Nurfia Store

A full-stack fashion e-commerce platform built with **HTML, CSS, JavaScript (Vite)** on the frontend, a **Node.js / Express / MongoDB** backend API, and a dedicated **admin panel** for managing the store.

---

## 🗂️ Project Structure

```
codealpha-Nurfiastore/
├── frontend/       # Customer-facing store (Vite + vanilla JavaScript)
├── backend/        # REST API (Node.js + Express + MongoDB)
├── Adminpanel/     # Admin dashboard for managing the store
└── README.md
```

---

## 🚀 Features

### Frontend (Customer Store)
- Multi-page layout — Home, Shop, Men, Women, Product Detail, Cart, Wishlist, Checkout, Blog, Contact
- Dynamic product rendering from backend API
- Shopping cart with guest (localStorage) and logged-in (backend-synced) support
- Wishlist with follow-along backend sync on login
- Filter & search on shop pages
- Responsive, mobile-first design
- Blog listing and detail pages
- Login/Register modal with guarded checkout flow (guests must log in to place an order)
- Recently viewed & related products

### Backend (API)
- RESTful API built with Express and MongoDB
- JWT-based authentication
- Product, order, and user management endpoints
- Cloudinary integration for image uploads and storage
- Cart and wishlist persistence tied to user accounts
- Database seeding scripts for products/images

### Admin Panel
- Admin login (protected access)
- Product management (add, edit, delete products)
- Order management and tracking
- User management
- Customer messages/inquiries view
- Dashboard-style interface for store administration

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, Vanilla JavaScript, Vite |
| Admin Panel | HTML5, CSS3, JavaScript, Vite |
| Backend | Node.js, Express.js, MongoDB, Mongoose |
| Auth | JWT (JSON Web Tokens) |
| Media Storage | Cloudinary |
| Icons/Fonts | Font Awesome, Google Fonts |
| Testing | Vitest |

---

## ⚙️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- npm
- MongoDB Atlas connection string
- Cloudinary account (for image uploads)

### 1. Clone the repository
```bash
git clone https://github.com/smamanoor79-stack/codealpha-Nurfiastore.git
cd codealpha-Nurfiastore
```

### 2. Backend setup
```bash
cd backend
npm install
# create a .env file with your MongoDB URI, JWT secret, and Cloudinary keys
npm run dev
```

### 3. Frontend setup
```bash
cd frontend
npm install
npm run dev
```

### 4. Admin Panel setup
```bash
cd Adminpanel
npm install
npm run dev
```

---

## 📄 Notes
- Each folder (`frontend`, `backend`, `Adminpanel`) runs independently and can be deployed separately.
- Environment variables (`.env`) for all three folders — `frontend/.env`, `backend/.env`, and `Adminpanel/.env` — are excluded from version control via `.gitignore` and are never pushed to GitHub. Each contributor must create their own `.env` file locally with the required keys (MongoDB URI, JWT secret, Cloudinary keys, etc.).

## Live Demo

https://nurfiastore.vercel.app

Deployed on a free tier, May take some seconds to awake the backend from sleep!
---

## 👤 Author

**Smama Noor** — https://github.com/smamanoor79-stack
