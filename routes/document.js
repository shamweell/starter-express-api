import express from 'express';
import {
    createDocument,
    deleteDocumentById,
    getDocumentById,
    getDocuments,
    updateDocumentById
} from '../controllers/doucument.js';

const router = express.Router();

router.post('/', createDocument); 
router.get('/', getDocuments); 
router.get('/:id', getDocumentById); 
router.put('/:id', updateDocumentById); 
router.delete('/:id', deleteDocumentById); 

export default router;
