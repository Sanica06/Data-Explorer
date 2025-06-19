# 🚀 Data Explorer — NASA APOD + AI Cosmic Poem Generator

An interactive web app to explore NASA's Astronomy Picture of the Day (APOD), with an AI-powered "Cosmic Poem" generator for each image!  
Built with React frontend and Node.js backend — simple to deploy — beautiful to use 🚀.

---

## 🌠 Table of Contents
1. [Demo](#-demo)  
2. [Features](#-features)  
3. [Tech Stack](#-tech-stack)  
4. [Setup & Running Locally](#-setup--running-locally)  
5. [Deployment](#-deployment)  
6. [Usage](#-usage)  
7. [AI Cosmic Poem Integration](#-ai-cosmic-poem-integration)  
8. [Troubleshooting](#-troubleshooting)  
9. [Screenshots](#-screenshots)  
10. [Contributing](#-contributing)  
11. [Credits](#-credits)

---

## 🌠 Demo  
_https://ndata-1.onrender.com/_

---

## ✅ Features
- Displays NASA’s Astronomy Picture of the Day (APOD)  
- Select previous dates to view historical APODs  
- AI-powered "Cosmic Poem" generator with OpenRouter GPT  
- Responsive, clean, mobile-friendly UI  
- Deployment ready: Backend as Web Service + Frontend as Static Site  
- CORS-enabled — works with any React/Vercel/Render deployment

---

## 🛠️ Tech Stack
- **Frontend:** React (with Hooks), Axios  
- **Backend:** Node.js + Express  
- **NASA API:** APOD (Astronomy Picture of the Day)  
- **AI:** OpenRouter GPT-3.5-turbo  
- **Deployment:** Render.com (API & UI) 

---

## ⚙️ Setup & Running Locally

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Sanica06/Data-Explorer.git
cd Data-Explorer
```

### 2️⃣ Backend setup
```bash
cd Nasa_backend
npm install
```

### 3️⃣ Configure Backend Environment
Create a `.env` file:
```env
NASA_API_KEY=YOUR_NASA_API_KEY
PORT=https://nasa-backend-5xu5.onrender.com
```

Run the server:
```bash
npm start
```

### 4️⃣ Frontend setup
```bash
cd ../nasa_front/nasa-frontend
npm install
```

### 5️⃣ Configure Frontend Environment
```env
REACT_APP_BACKEND_URL=https://nasa-backend-5xu5.onrender.com
```

### 6️⃣ Start the Frontend (Development)
```bash
npm start
```

Frontend URL:
```txt
https://ndata-1.onrender.com/
```

---

## 🚀 Deployment

### Backend (Render Web Service)
Deploy to:
```txt
https://nasa-backend-5xu5.onrender.com/api/apod
```

Then:
```bash
npm run build
```

---

## 🎯 Usage
1. Load the main page  
2. Select any date  
3. View NASA APOD  
4. Click: **"Generate A Cool Cosmic Poem 🚀"**  
5. Read the AI-generated cosmic poem

---

## 🤖 AI Cosmic Poem Integration

Uses [OpenRouter.ai](https://openrouter.ai):  

```js
'Authorization': 'Bearer YOUR_OPENROUTER_API_KEY'
```

---

## 🛠️ Troubleshooting

| Problem                          | Fix |
|----------------------------------|-----|
| XHR failed                       | Check `.env.production` → rebuild React |
| 401 Unauthorized (AI)            | Check OpenRouter API Key |
| 403 Forbidden (NASA)             | NASA API Key invalid |
| CORS issues                      | Add `app.use(cors())` |
| 500 Internal Server Error        | Check Render logs |

---

## 📄 Credits
  
**Credits:** NASA APOD API, OpenRouter.ai, React ecosystem, Render.com

---
