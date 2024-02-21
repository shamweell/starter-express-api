import express from 'express';
import user from "./user.js";
import property from "./property.js";
import document from "./document.js";
import admin from "./admin.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json({message: "Land id API"});
});

router.use('/admin', admin);
router.use('/properties', property);
router.use('/documents', document);
router.use('/users', user);

export default router;