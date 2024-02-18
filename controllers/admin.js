import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/admin.js";

export const signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingAdmin = await Admin.findOne({ email });

        if (!existingAdmin)
            return res.status(404).json({ message: "Admin does not exist" });

        const isPasswordCorrect = await bcrypt.compare(
            password,
            existingAdmin.password
        );

        if (!isPasswordCorrect)
            return res.status(400).json({ message: "Invalid Credentials" });

        const token = jwt.sign(
            { email: existingAdmin.email, id: existingAdmin._id },
            "test",
            { expiresIn: "1h" }
        );

        res.status(200).json({ result: existingAdmin, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

// export const signUp = async (req, res) => {
//     const { firstName, lastName, email, password, confirmPassword } = req.body;

//     try {
//         const existingUser = await User.findOne({ email });

//         if (existingUser) {
//             return res.status(404).json({ message: "User already exists" });
//         }

//         if (password !== confirmPassword) {
//             return res.status(400).json({ message: "Passwords do not match" });
//         }

//         const hashedPassword = await bcrypt.hash(password, 12);

//         const result = await User.create({
//             email,
//             password: hashedPassword,
//             name: `${firstName} ${lastName}`,
//         });

//         const token = jwt.sign(
//             { email: result.email, id: result._id },
//             "test",
//             { expiresIn: "1h" }
//         );

//         res.status(200).json({ result, token });
//     } catch (error) {
//         res.status(500).json({ message: "Something went wrong" });
//     }
// };
