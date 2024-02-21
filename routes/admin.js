import express from "express";
import { signIn } from "../controllers/admin.js";
import { validateSignIn } from "../middleware/express-validator-admin.js";

const router = express.Router();

router.post("/", validateSignIn, signIn);

export default router;
