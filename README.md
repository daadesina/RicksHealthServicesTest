# RicksHealthServicesTest

**RicksHealthServicesTest** is a full-stack health shift management system built for the **ShiftConnect** test project. It allows medical professionals to view and book shifts through a **web app (Next.js)** and a **mobile app (React Native with Expo)**, both powered by a **Flask backend API**.

---

## 📁 Project Structure

```
RicksHealthServicesTest/
├── backend/   # Flask REST API
├── frontend/  # Web application (Next.js)
└── mobile/    # Mobile application (React Native + Expo)
```

---

## 🌐 Live Backend API

✅ **Deployed on Render**
**Base URL:** [https://rickshealthservicestest-api.onrender.com](https://rickshealthservicestest-api.onrender.com/api)
- All API requests from the web and mobile clients are served through this backend.

---

## 🔧 Technologies Used

### Backend (Flask)

* Python + Flask
* Flask-CORS for cross-origin support
* Session-based authentication
* File-based data storage (`shifts.json`)
* Hosted on [Render](https://render.com)

### Frontend (Next.js)

* Next.js 
* TypeScript
* Axios for API communication
* TailwindCSS 

### Mobile (React Native + Expo)

* React Native with Expo SDK
* `expo-router` for navigation
* Axios for API calls
* Pure React Native styles

---

## ✨ Features

* 🔐 **Authentication** (email/password)
* 🗕️ **View Available Shifts**
* 📌 **Book Shifts**
* 💽 **Web App Integration**
* 📱 **Mobile App Integration**
* 🌍 **Live API Integration Across Platforms**

---

## 🔑 Test Credentials

| Email                                               | Password   |
| --------------------------------------------------- | ---------- |
| [daadesina1@gmail.com](mailto:daadesina1@gmail.com) | adesina123 |

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/daadesina/RicksHealthServicesTest.git
cd RicksHealthServicesTest
```

---

### 2. Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

> Backend runs on: `http://localhost:5000`

---

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

> Frontend runs on: `http://localhost:3000`

---

### 4. Mobile App Setup (Expo)

```bash
cd ../mobile
npm install
npx expo start
```

> Use Expo Go or an emulator to test the app.

---

## 🌐 API Endpoints

| Method | Endpoint           | Description              |
| ------ | ------------------ | ------------------------ |
| POST   | `/api/login`       | Login user               |
| POST   | `/api/logout`      | Logout user              |
| GET    | `/api/shifts`      | Get all available shifts |
| GET    | `/api/shifts/<id>` | Get a specific shift     |
| POST   | `/api/book/<id>`   | Book a shift             |

---

## 📝 Sample Data (`shifts.json`)

```json
[
  {
    "id": 1,
    "date": "2025-07-10",
    "time": { "start": "09:00", "end": "13:00" },
    "is_booked": false
  },
  {
    "id": 2,
    "date": "2025-07-11",
    "time": { "start": "14:00", "end": "18:00" },
    "is_booked": true
  }
]
```

---

## 👨‍💻 Author

**Abdullah Adesina Dhikrullah**
Full Stack Developer | Mobile App Developer | ALX Software Engineering Graduate
📍 Osogbo, Osun State, Nigeria
📧 [daadesina1@gmail.com](mailto:daadesina1@gmail.com)
🔗 [LinkedIn](https://www.linkedin.com/in/abdullah-adesina-dhikrullah/)

---

