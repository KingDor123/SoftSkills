import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import session from 'express-session';


//import passport from 'passport';



// routes
import TestRouter from './routes/test.route.js';
import llmRoute from "./routes/llm.route.js";
import userRoute from "./routes/user.route.js";

// passport config
//import { initialize } from './auth/passport-config.js';

dotenv.config();

const app = express();

// CORS + cookies config
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Access-Control-Allow-Origin', 'Access-Control-Allow-Credentials']
}));

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  rolling: true,
  cookie: {
    secure: false,              // change to true if using https in production
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  },
  name: 'sessionId'
}));

// Passport
//initialize(passport);
//app.use(passport.initialize());
//app.use(passport.session());

// Debug: log session data
app.use((req, res, next) => {
  if (req.session?.passport) {
    console.log('Session passport data:', req.session.passport);
  }
  next();
});

// Routes
app.use('/api/test', TestRouter);
app.use("/api/llm", llmRoute);
app.use("/api/user", userRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || "Internal Server Error" });
});


export default app;