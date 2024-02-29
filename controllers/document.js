import Document from "../models/document.js";
import fs from 'fs'

export const createDocument = async (req, res) => {
    try {
        const newDocument = await Document.create({
            name: req.body.name,
            state: req.body.state,
            type: req.body.type,
            filePath: req.file.path,
        });

        res.status(201).json(newDocument);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getDocuments = async (req, res) => {
    try {
        const documents = await Document.find();
        res.status(200).json(documents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getDocumentById = async (req, res) => {
    try {
        const document = await Document.findById(req.params.id);
        if (!document) {
            return res.status(404).json({ message: "Document not found" });
        }
        res.status(200).json(document);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateDocumentById = async (req, res) => {
    try {
        const { name, state, type } = req.body;

        // Create an object with only the properties that are present in the request
        const updateFields = {};
        if (name) updateFields.name = name;
        if (state) updateFields.state = state;
        if (type) updateFields.type = type;
        if (req.file && req.file.path) updateFields.filePath = req.file.path;

        const updatedDocument = await Document.findByIdAndUpdate(
            req.params.id,
            updateFields,
            { new: true }
        );

        if (!updatedDocument) {
            return res.status(404).json({ message: "Document not found" });
        }
        res.status(200).json(updatedDocument);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteDocumentById = async (req, res) => {
    try {
        const deletedDocument = await Document.findByIdAndDelete(req.params.id);
        if (!deletedDocument) {
            return res.status(404).json({ message: "Document not found" });
        }
        res.status(200).json({ message: "Document deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
