import { validationResult, body } from 'express-validator';

export const validateCreateDocument = [
    body('name').notEmpty().withMessage('Name is required'),
    body('state').notEmpty().withMessage('State is required'),
    body('type').notEmpty().withMessage('Type is required'),
    body('filePath').notEmpty().withMessage('File path is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export const validateUpdateDocumentById = [
    body('name').optional().notEmpty().withMessage('Name is required'),
    body('state').optional().notEmpty().withMessage('State is required'),
    body('type').optional().notEmpty().withMessage('Type is required'),
    body('filePath').optional().notEmpty().withMessage('File path is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

