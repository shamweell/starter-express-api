import { body, validationResult } from "express-validator";

export const validateSignIn = [
    body("email").isEmail().normalizeEmail(),
    body("password").notEmpty().trim(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
