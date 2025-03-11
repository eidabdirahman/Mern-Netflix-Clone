import express from 'express';
import { 
    AuthCheck, 
    login, 
    logout, 
    signup } from '../controllers/AuthController.js';
import { ProtectRoute } from '../middlewares/ProtectRoute.js';
const router = express.Router();

router.post("/signup",signup );
router.post("/login",login );
router.post("/logout",logout );
router.get("/AuthCheck", ProtectRoute, AuthCheck);
export default router;