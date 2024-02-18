import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    type: { type: String, require: true },
    address: { type: String },
    cap: { type: String },
    via: { type: String },
    common: { type: String },
    province: { type: String },
    city: { type: String },
    codeFiscal: { type: String },
    as: { type: String },
    dob: { type: String },
    surname: { type: String },
    telephone: { type: String },
    email: { type: String },
    villiage: { type: String },
    bornIn: { type: String },
    bornOn: { type: String },
    CI: { type: String },
    taxCode: { type: String },
    N: { type: String },
    businessName: { type: String },
    INPS: { type: String },
    billingFund: { type: String },
    basedIn: { type: String },
    region: { type: String },
});

export default mongoose.model("user", userSchema);
