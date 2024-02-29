import express from "express";
import { validateSignIn} from "../middleware/admin.js";
import { signIn } from "../controllers/auth.js";

const router = express.Router();

router.post("/", validateSignIn, signIn); 

export default router;
