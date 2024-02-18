import express from "express";
import {
    createUser,
    getUsers,
    getUserById,
    updateUserById,
    deleteUserById,
} from "../controllers/user.js";
import auth from '../middleware/auth.js'

const router = express.Router();

router.post("/", auth, createUser); 
router.get("/", getUsers);
router.get("/:id", getUserById); 
router.put("/:id", auth, updateUserById); 
router.delete("/:id", auth, deleteUserById); 

export default router;
