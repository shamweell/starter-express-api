import AuthModel from "../../models/auth.js";

// Create operation
export const createVerificationCode = async ({ email, verificationCode }) => {
    try {
        const newAuth = new AuthModel.create({ email, verificationCode });
        await newAuth.save();
        return newAuth;
    } catch (error) {
        return { message: error.message };
    }
};

// Read operation
export const getVerificationCodesByEmail = async (email) => {
    try {
        const auth = await AuthModel.findOne({ email });
        if (!auth) {
            return { message: "Auth not found" };
        }
        return auth;
    } catch (error) {
        return { message: error.message };
    }
};

// Delete operation
export const deleteVerificationCodeByEmail = async (email) => {
    try {
        await AuthModel.findOneAndUpdate(
            { email },
            { $set: { verificationCode: null } }
        );

        return {
            message: "Verification codes deleted successfully",
        };
    } catch (error) {
        return { message: error.message };
    }
};
