import { body, validationResult } from 'express-validator';
import {checkValidationResult} from "../utils/express-validator/checkValidationResult.js";

export const validateCreateProperty = [
    body('name').notEmpty().withMessage('Property name is required'),
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
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];