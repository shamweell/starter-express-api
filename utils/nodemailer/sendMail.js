import transporter from "./transporter.js";

export const sendMail = async (mailData) => {
    try {
        const info = await new Promise((resolve, reject) => {
            transporter.sendMail(mailData, (err, info) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    resolve(info);
                }
            });
        });
        console.log("info", info.messageId);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};
