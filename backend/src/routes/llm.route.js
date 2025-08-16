// src/routes/llm.route.js
import { Router } from "express";
import { chat } from "../controllers/llm.controller.js";

const router = Router();
router.post("/chat", chat);
export default router;