

# 🎥 Live Session Web App

A full-stack web application that allows admins to start live sessions and students to join and view them — built using **React (Vite)** for frontend and **Node.js + Express + MongoDB** for backend.

---

## 🚀 Features

### 👩‍💼 Admin
- Start new live sessions (auto-generates unique session ID)
- Manage session records in MongoDB
- Backend API for session handling

### 🧑‍🎓 Student
- Join live sessions via unique link or ID
- Watch video stream with custom controls (Play, Pause, Mute, Fullscreen, Speed)
- Responsive and glassmorphic UI similar to admin dashboard

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | React (Vite), Axios, React Router |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Styling | CSS3 (Glassmorphism, Animations) |
| Tools | Postman, VSCode, GitHub, Vercel / Render |

---

## ⚙️ Project Setup

### 🔧 Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend
   npm install
Create a .env file:

env
Copy code
PORT=5000
MONGO_URI=your_mongodb_connection_string
Start the backend server:

bash
Copy code
npm start
The API runs at: http://localhost:5000

💻 Frontend Setup
Navigate to the frontend folder:

bash
Copy code
cd frontend
npm install
Create a .env file:

env
Copy code
VITE_API_BASE=http://localhost:5000
VITE_SAMPLE_VIDEO=https://www.w3schools.com/html/mov_bbb.mp4
Run the frontend:

bash
Copy code
npm run dev
Open http://localhost:5173 in your browser.

📸 Screenshots
🧑‍💼 Admin View
Start and manage sessions easily
(Example UI)

🧑‍🎓 Student View
Students can join and control video playback
(Example UI)

🧩 Folder Structure
pgsql
Copy code
live-session-app/
│
├── backend/
│   ├── server.js
│   ├── routes/
│   ├── models/
│   └── controllers/
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── AdminView.jsx
│   │   │   ├── StudentView.jsx
│   │   └── App.jsx
│   └── public/
│
└── README.md
🧠 Inspiration
This project was inspired by modern online learning platforms — aiming to provide a simple yet effective way for instructors and students to connect via live sessions.

🚀 Deployment
Frontend: Vercel / Netlify

Backend: Render / Railway / Cyclic

Database: MongoDB Atlas

👨‍💻 Developer
Aman Kumar
💼 Full Stack Developer | React | Node.js | MongoDB
📧 amanjdsingh6@gmail.com


⭐ If you like this project, don’t forget to star the repo!

yaml
Copy code

---

Would you like me to tailor this README for **Vercel + Render deployment** (with live URLs and steps to connect f
