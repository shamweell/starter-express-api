import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_URL);
        console.log("connected to mongoDB");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};