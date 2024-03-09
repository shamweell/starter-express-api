import mongoose from "mongoose";

const authSchema = mongoose.Schema({
    email: { type: String },
    code: { type: Number },
});

export default mongoose.model("auth", authSchema);
