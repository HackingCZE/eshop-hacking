import nodemailer from "nodemailer";
import { Order } from "../../components";

const email = process.env.EMAIL;
const pass = process.env.EMAIL_PASS;

export const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    auth: {
        user: email, pass
    },
});

export const mailOptions = {
    from: email,
    
}