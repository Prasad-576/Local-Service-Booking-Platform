Local Service Booking Platform

A modern full-stack Local Service Booking Platform where users can search and book local service providers based on area, providers can manage bookings, and admins can manage the platform.

Built using the MERN Stack (MongoDB, Express, React, Node.js).

🚀 Features
👤 User

Register & Login (JWT Authentication)

Search service providers by area

View provider profiles

Book services

Track booking status

View booking history

🛠 Service Provider

Create provider profile

Add services & pricing

View booking requests

Accept / Reject bookings

Track completed services

👑 Admin

View all users

Manage providers

Delete users

Monitor platform activity

🏗 Tech Stack
Frontend

React

HTML5

CSS3 (Modern UI with animations)

JavaScript (ES6+)

Axios

Backend

Node.js

Express.js

MongoDB (Local)

Mongoose

JWT Authentication

Bcrypt (Password Hashing)

🧱 Project Architecture
React Frontend
        ↓
Express REST API
        ↓
MongoDB Database

Role-Based Access Control:

user

provider

admin

📂 Folder Structure
local-service-platform/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── layouts/
    │   ├── services/
    │   ├── context/
    │   ├── App.jsx
    │   └── main.jsx
🗄 Database Configuration

MongoDB runs locally:

mongodb://127.0.0.1:27017/localserve
⚙️ Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/your-username/local-service-platform.git
cd local-service-platform
2️⃣ Backend Setup
cd backend
npm install

Create .env file inside backend:

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/localserve
JWT_SECRET=your_secret_key

Run backend:

npm run dev
3️⃣ Frontend Setup
cd frontend
npm install
npm run dev

Frontend will run on:

http://localhost:5173

Backend will run on:

http://localhost:5000