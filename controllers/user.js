import User from "../models/user.js";
import { sendMail } from "../utils/nodemailer/sendMail.js";

export const createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        sendMail(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        Object.keys(req.body).forEach((key) => {
            user[key] = req.body[key];
        });

        const updatedUser = await user.save();

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteUserById = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const insertFile = async (req, res) => {
    const { id, documentId } = req.params; // Assuming the user ID is provided in the URL parameters
    const { file } = req; // Assuming the file is uploaded using multer and available in req.file

    try {
        let user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }

        user.personalDocs.find((doc) => doc.id == documentId).filePath =
            file.path;

        const updateduser = await User.findByIdAndUpdate(id, user);

        res.status(200).json({
            message: "File uploaded successfully",
            updateduser,
        });
    } catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
