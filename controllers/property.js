import Property from "../models/property.js";

export const createProperty = async (req, res) => {
    try {
        const newProperty = await Property.create(req.body);
        res.status(201).json(newProperty);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getProperties = async (req, res) => {
    try {
        const properties = await Property.find();
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPropertyById = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }
        res.status(200).json(property);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updatePropertyById = async (req, res) => {
    try {
        const updatedProperty = await Property.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedProperty) {
            return res.status(404).json({ message: "Property not found" });
        }
        res.status(200).json(updatedProperty);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deletePropertyById = async (req, res) => {
    try {
        const deletedProperty = await Property.findByIdAndDelete(req.params.id);
        if (!deletedProperty) {
            return res.status(404).json({ message: "Property not found" });
        }
        res.status(200).json({ message: "Property deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
