import { Router } from "express";
import {signup, login, logout, getUser} from "../controllers/authController.js"
import { verifyToken } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout",verifyToken,  login);
router.get('/profile', verifyToken, getUser);

export default router;