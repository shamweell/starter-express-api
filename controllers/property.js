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

export const insertFile = async (req, res) => {
    const { id, field, documentId } = req.params; // Assuming the property ID is provided in the URL parameters
    const { file } = req; // Assuming the file is uploaded using multer and available in req.file

    try {
        let property = await Property.findById(id);

        if (!property) {
            return res.status(404).json({ error: "Property not found" });
        }

        switch (field) {
            case "userUploadedDocuments":
                property.userUploadedDocuments.find(
                    (doc) => doc.id == documentId
                ).filePath = file.key;
                break;
            case "urbanDocuments":
                property.urbanDocuments.find(
                    (doc) => doc.id == documentId
                ).filePath = file.key;
                break;
            case "landRegistaryDocuments":
                property.landRegistaryDocuments.find(
                    (doc) => doc.id == documentId
                ).filePath = file.key;
                break;
            case "estimativeDocuments":
                property.estimativeDocuments.find(
                    (doc) => doc.id == documentId
                ).filePath = file.key;
                break;
            case "energyEfficiencyDocuments":
                property.energyEfficiencyDocuments.find(
                    (doc) => doc.id == documentId
                ).filePath = file.key;
                break;
            default:
                return res
                    .status(400)
                    .json({ error: "Invalid document field" });
        }

        // Save the updated property object
        // property = await property.save();

        console.log(property);
    
        const updatedProperty = await Property.findByIdAndUpdate(id, property);

        res.status(200).json({
            message: "File uploaded successfully",
            updatedProperty,
        });
    } catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).json({ error: "Internal server error" });
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
