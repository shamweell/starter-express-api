import Mailjet from "node-mailjet";
import dotenv from "dotenv";

dotenv.config();

const mailjet = new Mailjet({
    apiKey: process.env.MJ_APIKEY_PUBLIC,
    apiSecret: process.env.MJ_APIKEY_PRIVATE,
});

export const sendMail = async (user) => {
    try {
        const result = await mailjet.post("send").request({
            FromEmail: 'landapp.card@gmail.com',
            Subject: 'Welcome to the Land Id',
            'Text-part': 'Welcome to the land id application, your password will be at your address soon.',
            'Html-part': 'Welcome to the land id application, your password will be at your address soon.',
            Recipients: [{ Email: user.email }],
        });
        console.log(user.email);
        console.log("Mailjet response:", result.body);
    } catch (error) {
        console.error("Error sending email:", error.statusCode, error.message);
    }
};
