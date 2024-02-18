import express from 'express';
import {
    createProperty,
    getProperties,
    getPropertyById,
    updatePropertyById,
    deletePropertyById
} from '../controllers/property.js';
import auth from '../middleware/auth.js'

const router = express.Router();

router.get('/', getProperties);
router.get('/:id', getPropertyById); 
router.post('/', auth, createProperty);
router.put('/:id', auth, updatePropertyById); 
router.delete('/:id', auth, deletePropertyById); 

export default router;
