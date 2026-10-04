# InterviewIQ.AI

AI-powered mock interview platform. User apna resume upload karta hai, role/experience/mode (HR ya Technical) select karta hai, aur AI (OpenRouter ke through GPT-4o-mini) 5 personalized interview questions generate karta hai. Har answer ka AI real-time evaluation karta hai (confidence, communication, correctness) aur end me detailed performance report deta hai. Credits-based system hai jisme Razorpay se credits purchase kiye ja sakte hain.

## Tech Stack

**Frontend (client/)**
- React 19 + Vite 7
- Redux Toolkit (auth/user state)
- React Router v7
- Tailwind CSS v4
- Framer Motion (`motion`) — animations
- Firebase Auth — Google Sign-In
- Recharts — performance charts
- jsPDF + jspdf-autotable — report PDF export
- Axios

**Backend (server/)**
- Node.js + Express 5 (ESM)
- MongoDB + Mongoose
- JWT (cookie-based auth, `httpOnly` token)
- Multer — resume (PDF) upload handling
- `pdfjs-dist` — resume text extraction
- OpenRouter API (`openai/gpt-4o-mini`) — question generation + answer evaluation
- Razorpay — payments / credit purchase

## Project Structure

```
3.interviewIQ/
├── client/
│   └── src/
│       ├── components/       # AuthModel, Navbar, Footer, Timer,
│       │                     # Step1SetUp, Step2Interview, Step3Report
│       ├── pages/             # Home, Auth, InterviewPage, InterviewHistory,
│       │                     # InterviewReport, Pricing
│       ├── redux/             # store.js, userSlice.js
│       └── utils/firebase.js
└── server/
    ├── config/                # connectDb.js, token.js
    ├── controllers/           # auth, interview, payment, user
    ├── middlewares/           # isAuth.js, multer.js
    ├── models/                 # User, Interview, Payment
    ├── routes/                 # auth, interview, payment, user
    └── services/                # openRouter.service.js, razorpay.service.js
```

## Core Flow

1. **Auth** — Firebase Google Sign-In → backend `/api/auth/google` par email/name bhejta hai → user MongoDB me create/fetch hota hai → JWT cookie set hoti hai (7 din valid).
2. **Resume Upload** (`Step1SetUp`) — PDF Multer se upload hota hai → `pdfjs-dist` se text extract → AI se structured JSON (role, experience, projects, skills) nikalta hai.
3. **Question Generation** — role/experience/mode/resume data ke basis par AI 5 questions banata hai (difficulty progression: easy → easy → medium → medium → hard), timeLimit bhi assign hota hai. Har interview start hone par **50 credits deduct** hote hain.
4. **Interview** (`Step2Interview`) — user timer ke andar answer deta hai; har answer AI se evaluate hoti hai (confidence/communication/correctness → finalScore + short feedback).
5. **Report** (`Step3Report` / `InterviewReport`) — final averaged scores, question-wise breakdown, aur history (`InterviewHistory`) MongoDB me store rehti hai.
6. **Payments** (`Pricing`) — Razorpay order create hota hai, payment ke baad signature verify hoti hai aur user ke account me credits add ho jate hain.

## API Endpoints

| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/google` | — | Google sign-in / signup |
| GET | `/api/auth/logout` | — | Clear auth cookie |
| GET | `/api/user/current-user` | ✅ | Logged-in user details |
| POST | `/api/interview/resume` | ✅ | Upload + parse resume PDF |
| POST | `/api/interview/generate-questions` | ✅ | Generate 5 AI questions (deducts 50 credits) |
| POST | `/api/interview/submit-answer` | ✅ | Submit + AI-evaluate one answer |
| POST | `/api/interview/finish` | ✅ | Finalize interview, compute averages |
| GET | `/api/interview/get-interview` | ✅ | List user's past interviews |
| GET | `/api/interview/report/:id` | ✅ | Detailed report of one interview |
| POST | `/api/payment/order` | ✅ | Create Razorpay order |
| POST | `/api/payment/verify` | ✅ | Verify payment + add credits |

## Setup

### Server
```bash
cd server
npm install
```
Create `server/.env`:
```
PORT=8000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OPENROUTER_API_KEY=your_openrouter_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```
```bash
npm run dev   # nodemon index.js
```

### Client
```bash
cd client
npm install
```
Create `client/.env`:
```
VITE_FIREBASE_APIKEY=your_firebase_api_key
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```
```bash
npm run dev   # vite
```

## Kuch Cheezein Jo Fix Karni Chahiye

Analyze karte waqt ye issues mile — inhe note kar lo:

1. **PORT mismatch**: `client/src/App.jsx` me `ServerUrl = "http://localhost:8000"` hardcoded hai, lekin `server/index.js` me default `PORT = process.env.PORT || 6000`. Agar `.env` me `PORT=8000` set nahi kiya to client backend se connect nahi kar payega.
2. **Import case-mismatch (deployment breaker)**: `App.jsx` me `import Auth from './pages/auth'` hai (lowercase `auth`), jabki actual file `pages/Auth.jsx` (uppercase `A`) hai. Windows/Mac (case-insensitive filesystem) par chal jayega, lekin Linux-based hosting (Render/Vercel build, Docker) par build **fail ho sakta hai** kyunki wahan filesystem case-sensitive hota hai. Isse `./pages/Auth` kar dena chahiye.
3. **CORS origin hardcoded**: `cors({ origin: "http://localhost:5173" })` — production deploy karte waqt isse env variable bana kar frontend ke actual deployed URL par point karna hoga, warna cookies/auth cross-origin block ho jayenge.
4. **`.env` files zip me included hain** — inme live secrets (Mongo URL, JWT secret, API keys) the; is README banate waqt values expose nahi ki gayi hain, lekin agar ye repo kahin push karna hai to naye secrets generate kar ke `.env` ko `.gitignore` me confirm zaroor karo (server ka `.gitignore` me already `.env` hai, that's good).
5. **`isAuth` middleware me `http:true`** cookie option likha hai `httpOnly` ke bajaye (`auth.controller.js` me bhi) — ye Express cookie option nahi hai, so it's silently ignored; agar security ke liye `httpOnly` chahiye to key sahi karni hogi.

## Suggested README Badges / Portfolio Note

Ye tumhare "most technically ambitious" MERN project ke portfolio piece ke liye README hai — resume/LinkedIn me isko real REST API + JWT auth + payment gateway integration + AI evaluation pipeline ke saath showcase kar sakte ho.