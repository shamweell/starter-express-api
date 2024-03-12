import User from "../models/user.js";
import { sendMail } from "../utils/nodemailer/sendMail.js";

export const createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        await sendMail({
            from: "landapp.card@gmail.com", // sender address
            to: req.body.email, // list of receivers
            subject: "Welcome to the Land Id", // Subject line
            html: `Benvenuto su LandID, ${
                req.body.firstName + " " + req.body.lastName
            }!  Siamo lieti di averti con noi.  La tua carta di accesso personalizzata, insieme alla relativa password (le 12 cifre - senza spazio - poste dietro a carta), sono attualmente in viaggio verso il tuo indirizzo registrato.  Questa carta unica ti darà la possibilità di accesso senza intoppi alla nostra piattaforma.  Se dovessi incontrare qualche difficoltà o avere bisogno di assistenza, non esitare a contattare il nostro dedicato team di supporto all'indirizzo mailto:informatico@unionpb.it oppure mailto:landidcard@unionpb.it.  Grazie per aver scelto LandID.  Il tuo immobile a portata di click!"`, // html body
        });
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

export const getUserByEmail = async (req, res) => {
    try {
        const email = req.params.email;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const insertFile = async (req, res) => {
    const { id, documentId } = req.params; // Assuming the user ID is provided in the URL parameters
    const { file } = req; // Assuming the file is uploaded using multer and available in req.file

    console.log(file);

    try {
        let user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }

        user.personalDocs.find((doc) => doc.id == documentId).filePath =
            file.key;

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
