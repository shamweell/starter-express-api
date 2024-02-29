import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "in.v3.mailjet.com",
    port: 587,
    auth: {
        user: "f3d594087b423109acd876a79b522b01",
        pass: "e1e360cc8fa4dbccbf4c0c425016efa0",
    },
});

export default transporter;
