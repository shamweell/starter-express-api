import express from "express";
import {
    createUser,
    getUsers,
    getUserById,
    updateUserById,
    deleteUserById,
} from "../controllers/user.js";
import auth from '../middleware/auth.js'
import {validateCreateUser, validateUpdateUserById} from "../middleware/express-validator-user.js"

const router = express.Router();

router.post("/", [auth, validateCreateUser], createUser); 
router.get("/", getUsers);
router.get("/:id", getUserById); 
router.put("/:id", [auth, validateUpdateUserById], updateUserById); 
router.delete("/:id", auth, deleteUserById); 

export default router;
