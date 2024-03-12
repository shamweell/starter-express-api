import express from 'express';
import {
    createProperty,
    getProperties,
    getPropertyById,
    updatePropertyById,
    deletePropertyById,
    insertFile
} from '../controllers/property.js';
import auth from '../middleware/auth.js'
import {validateCreateProperty, validateUpdatePropertyById} from '../middleware/property.js'

import multer from 'multer';
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

router.get('/', getProperties);
router.get('/:id', getPropertyById); 
router.post('/', auth, validateCreateProperty, createProperty);
router.put('/file/:id/:field/:documentId', upload.single("file"), insertFile);
router.put('/:id', auth, validateUpdatePropertyById, updatePropertyById); 
router.delete('/:id', auth, deletePropertyById); 

export default router;
