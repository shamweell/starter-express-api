import express from "express";
import { validateSignIn} from "../middleware/admin.js";
import { signIn, sendCode, verifyCode } from "../controllers/auth.js";

const router = express.Router();

router.post("/", validateSignIn, signIn);
router.post("/sendCode", sendCode); 
router.post("/verifyCode", verifyCode);

export default router;
