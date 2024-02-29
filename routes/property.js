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

const upload = multer({ dest: 'uploads/' })

const router = express.Router();

router.get('/', getProperties);
router.get('/:id', getPropertyById); 
router.post('/', auth, validateCreateProperty, createProperty);
router.put('/file/:id/:field/:documentId', upload.single("file"), insertFile);
router.put('/:id', auth, validateUpdatePropertyById, updatePropertyById); 
router.delete('/:id', auth, deletePropertyById); 

export default router;
