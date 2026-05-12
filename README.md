<<<<<<< HEAD
# 🏥 Smart Doctor Connect AI - Complete Setup Guide

A full-stack healthcare platform for connecting patients with doctors using AI recommendations.

## 📋 Project Structure

```
smart-doctor-connect/
├── server.js              # Express backend server
├── package.json           # NPM dependencies
├── .env.example          # Environment variables template
├── doctors.db            # SQLite database (auto-created)
└── public/
    └── index.html        # Frontend (HTML/CSS/JS)
```

## 🚀 Quick Start

### Step 1: Download/Clone the Project

Save all files to a folder like `smart-doctor-connect`:
```
Your Projects/
└── smart-doctor-connect/
    ├── server.js
    ├── package.json
    ├── .env.example
    └── public/
        └── index.html
```

### Step 2: Open in VS Code

```bash
# Open the project folder in VS Code
code smart-doctor-connect
```

Or use File → Open Folder → select `smart-doctor-connect`

### Step 3: Setup Environment Variables

1. Copy `.env.example` to `.env`:
   - Right-click `.env.example` → Copy
   - Right-click → Paste → Rename to `.env`

2. Edit `.env` file:
   ```
   ANTHROPIC_API_KEY=sk-ant-...your-key-here...
   PORT=3000
   ```

   **Don't have an API key?**
   - Get free credits at https://console.anthropic.com
   - Copy your API key and paste into `.env`

### Step 4: Install Dependencies

Open Terminal in VS Code (Ctrl + ` or View → Terminal):

```bash
npm install
```

This will install:
- ✅ Express (web server)
- ✅ SQLite3 (database)
- ✅ CORS (cross-origin support)
- ✅ Anthropic SDK (AI)
- ✅ dotenv (environment config)

### Step 5: Start the Server

```bash
npm start
```

You should see:
```
✅ Connected to SQLite database
✅ Doctors table ready
✅ Sample doctors inserted
🚀 Smart Doctor Connect AI Server running on http://localhost:3000
📝 Frontend: http://localhost:3000
📚 API: http://localhost:3000/api/doctors
```

### Step 6: Open in Browser

- Go to: **http://localhost:3000**
- You should see the Smart Doctor Connect AI homepage!

---

## 🎯 Features & How to Use

### 1️⃣ Search Doctors
- Click "🔍 Search" tab
- Search by: name, specialization, or location
- Example: "Cardiologist Lahore"

### 2️⃣ AI Recommendations
- Click "🤖 AI Recommendation" tab
- Describe symptoms: "back pain", "headache", "skin allergy"
- Optional: Choose location
- Click "Get AI Recommendation"
- AI will suggest top 3 doctors! 🤖

### 3️⃣ Filter Results
- Use Filter section: Specialization, Location, Consultation Type
- Results update instantly

### 4️⃣ Register a Doctor
- Click "➕ Register Doctor" tab
- Fill in doctor details
- Click "Register Doctor"
- New doctors appear immediately!

### 5️⃣ View Doctor Details
- Click any doctor card
- See full profile
- Contact via Email or Phone

---

## 🤖 AI Features (Optional but Recommended)

The AI recommendation feature uses Claude to intelligently match symptoms to doctors.

**To enable AI:**
1. Get API key from https://console.anthropic.com
2. Add to `.env`: `ANTHROPIC_API_KEY=your_key`
3. Restart server: `npm start`

**Example AI Recommendations:**
```
User: "I have back pain"
AI suggests: Orthopedic specialists
↓
Dr. Muhammad Hassan (Orthopedic) - Islamabad
```

---

## 🗄️ Database

The app uses **SQLite** - no external database needed!

- Auto-creates `doctors.db` on first run
- 6 sample doctors pre-loaded
- Doctors table includes:
  - Name, Specialization, Location
  - Consultation Type (Online/Physical)
  - Experience, Rating, Bio
  - Email, Phone

**View database in VS Code:**
1. Install SQLite extension: "SQLite" by alexcvzz
2. Open Command Palette (Ctrl+Shift+P)
3. Type: "SQLite: Open Database"
4. Select `doctors.db`
5. View tables and data!

---

## 🔌 API Endpoints

All requests go to `http://localhost:3000/api`

### GET /doctors
Get all doctors
```bash
curl http://localhost:3000/api/doctors
```

### GET /doctors/:id
Get single doctor
```bash
curl http://localhost:3000/api/doctors/1
```

### GET /doctors/search/:query
Search doctors
```bash
curl http://localhost:3000/api/doctors/search/Cardiologist
```

### POST /doctors/filter
Filter by specialization, location, consultation type
```bash
curl -X POST http://localhost:3000/api/doctors/filter \
  -H "Content-Type: application/json" \
  -d '{"specialization":"Cardiologist","location":"Lahore"}'
```

### POST /recommend-doctor
Get AI recommendations (requires API key)
```bash
curl -X POST http://localhost:3000/api/recommend-doctor \
  -H "Content-Type: application/json" \
  -d '{"symptoms":"back pain","location":"Lahore"}'
```

### POST /doctors
Register new doctor
```bash
curl -X POST http://localhost:3000/api/doctors \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Dr. Name",
    "specialization":"Cardiologist",
    "location":"Lahore",
    "consultationType":"Online/Physical",
    "email":"doctor@email.com"
  }'
```

---

## ⚙️ Troubleshooting

### ❌ Port 3000 already in use
```bash
# Use different port
PORT=3001 npm start
# Then go to http://localhost:3001
```

### ❌ API Key errors
- Make sure `.env` file exists (not `.env.example`)
- API key is valid and has credits
- Restart server after changing `.env`

### ❌ "Cannot find module" errors
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
npm start
```

### ❌ Database errors
```bash
# Delete old database and restart
rm doctors.db
npm start
# Database will be recreated automatically
```

### ❌ CORS/Connection errors
- Make sure server is running: `npm start`
- Don't open `index.html` directly - open via http://localhost:3000
- Check firewall isn't blocking port 3000

---

## 📝 Sample Data

6 pre-loaded doctors:
1. Dr. Ahmed Khan - Cardiologist - Lahore - Rating: 4.8 ⭐
2. Dr. Fatima Ali - Dermatologist - Karachi - Rating: 4.9 ⭐
3. Dr. Muhammad Hassan - Orthopedic - Islamabad - Rating: 4.7 ⭐
4. Dr. Ayesha Malik - Neurologist - Lahore - Rating: 4.8 ⭐
5. Dr. Usman Raza - Pediatrician - Karachi - Rating: 4.6 ⭐
6. Dr. Rabia Hassan - General Practitioner - Rawalpindi - Rating: 4.5 ⭐

---

## 🛠️ Development

### Use Nodemon for auto-reload
```bash
npm install --save-dev nodemon
npm run dev
# Server auto-restarts on file changes
```

### Edit Frontend
- Edit `public/index.html` directly
- Refresh browser to see changes
- No rebuild needed!

### Edit Backend
- Edit `server.js`
- Server auto-restarts (if using `npm run dev`)
- No module reload needed

---

## 📦 Deployment

Ready to go live? Here are popular options:

### Option 1: Heroku
```bash
npm install -g heroku-cli
heroku create
heroku config:set ANTHROPIC_API_KEY=your_key
git push heroku main
```

### Option 2: Railway
- Go to railway.app
- Connect GitHub repo
- Add `ANTHROPIC_API_KEY` env var
- Deploy!

### Option 3: Vercel + Firebase
- Frontend on Vercel
- Backend on Firebase Functions
- Database on Firebase Firestore

---

## 📚 Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Backend:** Node.js, Express
- **Database:** SQLite3
- **AI:** Anthropic Claude API
- **Server:** Express.js

---

## 🎓 Learning Resources

- **Express.js:** https://expressjs.com
- **SQLite:** https://www.sqlite.org
- **Anthropic API:** https://docs.anthropic.com
- **REST APIs:** https://restfulapi.net

---

## 📞 Support

If you have issues:

1. **Check Terminal Logs** - look for error messages
2. **Verify Dependencies** - `npm list`
3. **Check API Key** - make sure it's valid
4. **Restart Server** - kill and restart `npm start`
5. **Clear Cache** - `Ctrl+Shift+Delete` in browser

---

## 🎉 You're Ready!

Your Smart Doctor Connect AI platform is live! 

**Next Steps:**
- ✅ Customize doctor profiles
- ✅ Add more doctors
- ✅ Test AI recommendations
- ✅ Deploy to the cloud
- ✅ Add appointment booking (Phase 2)
- ✅ Add messaging system (Phase 2)

Happy coding! 🚀
=======
# smart-doctor-connect
>>>>>>> 3d287f656e7fafafc2d7616e91dcebfba5e25dfa
