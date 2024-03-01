import transporter from "./transporter.js";

export const sendMail = async (user) => {
    try {
        const info = await transporter.sendMail({
            from: "landapp.card@gmail.com",  // sender address
            to: user.email,                                  // list of receivers
            subject: "Welcome to the Land Id",                              // Subject line
            html: `Welcome to the land id application, your password will be at your address soon.`                                      // html body
        });
        console.log("info", info.messageId);
    }
    catch (error) {
        console.error("Error sending email:", error);
    }
};
