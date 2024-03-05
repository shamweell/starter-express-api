import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
    firstName: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    lastName: { type: String },
    telephone: { type: Number },
    country: { type: String },
    region: { type: String },
    image: { type: String },
});

export default mongoose.model("admin", adminSchema);
