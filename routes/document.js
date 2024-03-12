import express from "express";
import {
    createDocument,
    deleteDocumentById,
    getDocumentById,
    getDocuments,
    updateDocumentById,
} from "../controllers/document.js";
import {
    validateCreateDocument,
    validateUpdateDocumentById,
} from "../middleware/document.js";
import multer from "multer";
import aws from "aws-sdk";
import multerS3 from "multer-s3";

aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
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

const router = express.Router();

router.post("/", upload.single("file"), validateCreateDocument, createDocument);
router.get("/", getDocuments);
router.get("/:id", getDocumentById);
router.put(
    "/:id",
    upload.single("file"),
    validateUpdateDocumentById,
    updateDocumentById
);
router.delete("/:id", deleteDocumentById);

export default router;
