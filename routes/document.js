import express from 'express';
import {
    createDocument,
    deleteDocumentById,
    getDocumentById,
    getDocuments,
    updateDocumentById
} from '../controllers/document.js';
import {validateCreateDocument, validateUpdateDocumentById} from "../middleware/express-validator-document.js"

import multer from 'multer';

const upload = multer({ dest: 'uploads/' })

const router = express.Router();

router.post('/', [upload.single("file"), validateCreateDocument], createDocument); 
router.get('/', getDocuments); 
router.get('/:id', getDocumentById); 
router.put('/:id', [upload.single("file"), validateUpdateDocumentById], updateDocumentById); 
router.delete('/:id', deleteDocumentById); 

export default router;
