import express from "express";
import { validateSignIn} from "../middleware/admin.js";
import { signIn, sendCode } from "../controllers/auth.js";

const router = express.Router();

router.post("/", validateSignIn, signIn);
router.post("/sendCode", sendCode); 

export default router;
