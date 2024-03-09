import mongoose from "mongoose";

const authSchema = mongoose.Schema({
    verificationCodes: { type: Array},
});

export default mongoose.model("auth", authSchema);
