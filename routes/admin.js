import express from "express";
import { createAdmin, deleteAdmin, getAdminById, getAdmins, updateAdmin } from "../controllers/admin.js";
import auth from '../middleware/auth.js'

const router = express.Router();

router.get("/", getAdmins);
router.get("/:id", getAdminById);
router.post("/", auth, createAdmin);
router.put("/:id", auth, updateAdmin);
router.delete("/:id", auth, deleteAdmin);

export default router;
