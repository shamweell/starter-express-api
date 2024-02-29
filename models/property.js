import mongoose from "mongoose";

const propertySchema = mongoose.Schema({
    name: { type: String, require: true },
    piano: { type: String, require: true },
    address: { type: String, require: true },
    cap: { type: String, require: true },
    via: { type: String, require: true },
    common: { type: String, require: true },
    fraction: { type: String, require: true },
    province: { type: String, require: true },
    nation: { type: String, require: true },
    internal: { type: String, require: true },
    city: { type: String, require: true },
    houseNo: { type: String, require: true },
    leasing: { type: Boolean, require: true },
    scale: { type: String, require: true },
    owner: { type: String, require: true },
    lastUpdated: { type: Date, default: Date.now(), require: true },
    createdAt: { type: Date, default: Date.now(), require: true },
    userUploadedDocuments: { type: Array },
    urbanDocuments: { type: Array },
    landRegistaryDocuments: { type: Array },
    estimativeDocuments: { type: Array },
    energyEfficiencyDocuments: { type: Array },
    anagrafica: { type: Object },
});

export default mongoose.model("property", propertySchema);
