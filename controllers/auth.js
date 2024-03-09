import jwt from "jsonwebtoken";
import Admin from "../models/admin.js";
import User from "../models/user.js";
import { sendMail } from "../utils/nodemailer/sendMail.js";
import Auth from "../models/auth.js";
import { createVerificationCode } from "../utils/verification/verification.js";

export const signIn = async (req, res) => {
    const { email, password } = req.body;

    console.log(email);
    try {
        const existingAdmin = await Admin.findOne({ email });

        if (existingAdmin) {
            const isPasswordCorrect =
                password.toString() === existingAdmin.password.toString();

            if (!isPasswordCorrect)
                return res.status(400).json({ message: "Invalid Credentials" });

            const token = jwt.sign(
                { email: existingAdmin.email, id: existingAdmin._id },
                "test",
                { expiresIn: "7d" }
            );

            res.status(200).json({
                result: existingAdmin,
                token,
                role: "admin",
            });
        } else {
            const existingUser = await User.findOne({ email });

            if (!existingUser)
                return res.status(404).json({ message: "User does not exist" });

            const isPasswordCorrect =
                password.toString() === existingUser.password.toString();

            if (!isPasswordCorrect)
                return res.status(400).json({ message: "Invalid Credentials" });

            const token = jwt.sign(
                { email: existingUser.email, id: existingUser._id },
                "test",
                { expiresIn: "1h" }
            );

            res.status(200).json({ result: existingUser, token, role: "user" });
        }
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const sendCode = async (req, res) => {
    const code = Math.floor(10000 + Math.random() * 90000);

    await createVerificationCode({email, verificationCode: code});

    await sendMail({
        from: "landapp.card@gmail.com", // sender address
        to: req.body.email, // list of receivers
        subject: "Land id Verification Code", // Subject line
        html: `Your verification code is: ${code}`,
    });
};

