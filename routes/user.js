import express from "express";
import {
    createUser,
    getUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    insertFile,
} from "../controllers/user.js";
import auth from '../middleware/auth.js'
import {validateCreateUser, validateUpdateUserById} from "../middleware/user.js"

const router = express.Router();

import multer from 'multer';

const upload = multer({ dest: 'uploads/' })

router.post("/", auth, validateCreateUser, createUser); 
router.get("/", getUsers);
router.get("/:id", getUserById); 
router.put("/:id", validateUpdateUserById, updateUserById); 
router.put('/file/:id/:documentId', upload.single("file"), insertFile);
router.delete("/:id", auth, deleteUserById); 

export default router;
