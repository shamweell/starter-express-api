import { validationResult, body } from 'express-validator';

export const validateCreateProperty = [
    body('name').notEmpty().withMessage('Property name is required'),
    body('owner').notEmpty().withMessage('Property owner is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export const validateUpdatePropertyById = [
    body('name').notEmpty().withMessage('Property name is required').optional(),
    body('owner').notEmpty().withMessage('Property owner is required').optional(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];