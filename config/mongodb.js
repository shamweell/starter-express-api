import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const db = await mongoose.connect(process.env.CONNECTION_URL);
        if (db.connection.readyState === db.STATES.connected) {
            console.log("db is connected, db name - " + db.connection.db.databaseName);
        }
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};
