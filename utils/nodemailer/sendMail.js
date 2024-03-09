import transporter from "./transporter.js";

export const sendMail = async (user) => {
    const mailData = {
        from: "landapp.card@gmail.com", // sender address
        to: user.email, // list of receivers
        subject: "Welcome to the Land Id", // Subject line
        html: `Benvenuto su LandID, ${
            user.firstName + " " + user.lastName
        }!  Siamo lieti di averti con noi.  La tua carta di accesso personalizzata, insieme alla relativa password (le 12 cifre - senza spazio - poste dietro a carta), sono attualmente in viaggio verso il tuo indirizzo registrato.  Questa carta unica ti darà la possibilità di accesso senza intoppi alla nostra piattaforma.  Se dovessi incontrare qualche difficoltà o avere bisogno di assistenza, non esitare a contattare il nostro dedicato team di supporto all'indirizzo mailto:informatico@unionpb.it oppure mailto:landidcard@unionpb.it.  Grazie per aver scelto LandID.  Il tuo immobile a portata di click!"`, // html body
    };

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
