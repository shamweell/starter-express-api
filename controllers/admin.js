import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/admin.js";

export const signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingAdmin = await Admin.findOne({ email });

        if (!existingAdmin)
            return res.status(404).json({ message: "Admin does not exist" });

        const isPasswordCorrect = password === existingAdmin.password;

        if (!isPasswordCorrect)
            return res.status(400).json({ message: "Invalid Credentials" });

        const token = jwt.sign(
            { email: existingAdmin.email, id: existingAdmin._id },
            "test",
            { expiresIn: "7d" }
        );

        res.status(200).json({ result: existingAdmin, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

