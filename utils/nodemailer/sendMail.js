import transporter from "./transporter.js";

export const sendMail = async (newUser) => {
    await transporter.sendMail({
        from: "landapp.card@gmail.com",
        to: newUser.email,
        subject: `Welcome to Our Application`,
        text: `Hello ${
            newUser.firstName
                ? newUser.firstName + " " + newUser.lastName
                : newUser.businessName
        },\n\nYour account has been successfully created. Your password will be delivered at your address very soon.\n\nThank you for joining us!`,
    });
};
