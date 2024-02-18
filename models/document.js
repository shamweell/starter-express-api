import mongoose from "mongoose";

const documentSchema = mongoose.Schema({
    name: { type: String, require: true },
    state: { type: String, require: true },
    type: { type: String, require: true },
    createdAt: { type: Date, default: Date.now(), require: true },
    filePath: { type: String, require: true },
});

export default mongoose.model("document", documentSchema);
