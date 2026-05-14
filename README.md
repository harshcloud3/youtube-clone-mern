# MERN YouTube Clone

A full-stack YouTube Clone project built using the MERN Stack (MongoDB, Express.js, React.js, and Node.js). This project was developed as a capstone project to understand how modern video streaming platforms work and how frontend and backend technologies integrate together in a real-world application.

The application allows users to register, log in, watch videos, search videos, filter videos by category, like/dislike videos, create channels, upload videos, and manage comments.

---

# Features

## User Authentication

* User Registration
* User Login
* JWT-based Authentication
* Protected Routes
* Persistent Login using Local Storage

## Home Page

* Responsive YouTube-style Header
* Sidebar Navigation Menu
* Search Functionality
* Category Filter Buttons
* Dynamic Video Grid
* Responsive Layout

## Video Player Page

* Video Streaming Player
* Video Title and Description
* Like and Dislike Buttons
* Comment Section
* Add Comments
* Edit Comments
* Delete Comments

## Channel Page

* Create Channel
* Upload Videos
* Edit Uploaded Videos
* Delete Uploaded Videos
* Display Channel Videos

## Backend Features

* REST API Architecture
* MongoDB Database Integration
* JWT Middleware Protection
* CRUD Operations for Videos and Comments
* Organized Controllers, Routes, and Models

---

# Technologies Used

## Frontend

* React.js
* React Router DOM
* Axios
* Tailwind CSS
* React Icons
* Vite

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcryptjs
* dotenv
* cors

## Database

* MongoDB Atlas / Local MongoDB

## Version Control

* Git
* GitHub

---

# Project Structure

```
youtube-clone/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── seed.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── public/
│
└── README.md
```

---

# Installation and Setup

## 1. Clone Repository

```bash
git clone https://github.com/harshcloud3/youtube-clone-mern.git
```

---

## 2. Install Backend Dependencies

```bash
cd backend
npm install
```

---

## 3. Install Frontend Dependencies

```bash
cd frontend
npm install
```

---

# Environment Variables

Create a `.env` file inside the backend folder.

Example:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

---

# Running the Project

## Start Backend

```bash
cd backend
npm run dev
```
## Seed Database

Run the following command inside backend folder:

```bash
node seed.js

---

## Start Frontend

```bash
cd frontend
npm run dev
```

---

# API Endpoints

## Authentication Routes

* POST `/api/auth/register`
* POST `/api/auth/login`

## Video Routes

* GET `/api/videos`
* GET `/api/videos/:id`
* POST `/api/videos`
* PUT `/api/videos/:id`
* DELETE `/api/videos/:id`
* PUT `/api/videos/like/:id`
* PUT `/api/videos/dislike/:id`

## Comment Routes

* POST `/api/comments`
* GET `/api/comments/video/:videoId`
* PUT `/api/comments/:id`
* DELETE `/api/comments/:id`

## Channel Routes

* POST `/api/channels`
* GET `/api/channels/owner`
* GET `/api/channels/:id`

---

# Database Collections

The application stores data in MongoDB using the following collections:

* Users
* Videos
* Comments
* Channels

---

# Responsive Design

The project is responsive across:

* Desktop Devices
* Tablets
* Mobile Phones

Tailwind CSS utility classes were used to create responsive layouts.

---

# Learning Outcomes

Through this project, I learned:

* MERN Stack Architecture
* REST API Development
* JWT Authentication
* MongoDB Data Modeling
* React Component Structure
* Context API State Management
* Responsive UI Design
* CRUD Operations
* Git and GitHub Workflow

---

# Future Improvements

Some features that can be added in the future:

* Real Video Upload Storage
* Subscribe Feature
* Watch History
* Notifications
* Recommended Videos
* User Profile Pictures
* Dark Mode

---

# Author

Harsh Tiwari

GitHub Repository:
[https://github.com/harshcloud3/youtube-clone-mern](https://github.com/harshcloud3/youtube-clone-mern)

---

# Conclusion

This MERN YouTube Clone project helped in understanding full-stack application development by combining frontend, backend, authentication, database management, and responsive UI design into a single real-world project.
It demonstrates the implementation of core YouTube functionalities using modern web development technologies.
