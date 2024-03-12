import express from "express";
import {
    createUser,
    getUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    insertFile,
    getUserByEmail,
} from "../controllers/user.js";
import auth from "../middleware/auth.js";
import {
    validateCreateUser,
    validateUpdateUserById,
} from "../middleware/user.js";

const router = express.Router();

import multer from "multer";
import aws from "aws-sdk";
import multerS3 from "multer-s3";

aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

const s3 = new aws.S3();

// Configure multer to use AWS S3 as storage
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: "cyclic-crazy-plum-starfish-ap-south-1",
        acl: "public-read-write", // Set access control list (ACL) as per your requirements
        key: function (req, file, cb) {
            cb(null, Date.now().toString() + "-" + file.originalname); // Set the file name in the S3 bucket
        },
        // You can add more parameters here as needed, such as contentDisposition for file disposition
    }),
});

router.post("/", validateCreateUser, createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.get("/email/:email", getUserByEmail);
router.put("/:id", validateUpdateUserById, updateUserById);
router.put("/file/:id/:documentId", upload.single("file"), insertFile);
router.delete("/:id", auth, deleteUserById);

export default router;
