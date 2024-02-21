import express from 'express';
import {
    createProperty,
    getProperties,
    getPropertyById,
    updatePropertyById,
    deletePropertyById
} from '../controllers/property.js';
import auth from '../middleware/auth.js'
import {validateCreateProperty, validateUpdatePropertyById} from '../middleware/express-validator-property.js'

const router = express.Router();

router.get('/', getProperties);
router.get('/:id', getPropertyById); 
router.post('/', [auth, validateCreateProperty], createProperty);
router.put('/:id', [auth, validateUpdatePropertyById], updatePropertyById); 
router.delete('/:id', auth, deletePropertyById); 

export default router;
