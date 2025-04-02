import transporter from "./transporter.js";
import Presets from "./presets.js";
import dotenv from "dotenv";

dotenv.config();

class MailController {
    async forSupport(req, res) {
        try {
            const {userData} = req.headers;
            const {type, description} = req.body;
            const info = await transporter.sendMail({
                from: `"Karla Nutri - New Ticket" <${process.env.EMAIL}>`,
                to: `${process.env.EMAIL}`,
                replyTo: `${userData.email}`,
                subject: `${type.toUpperCase()} - TICKET #${Date.now()}`,
                html: Presets.forSupport(userData.name, type, description, userData.email)
            });
            return res.status(201).json({ info });
        } catch (error) {
            return res.status(400).json({error: error});
        }
    }

    //async forUser(req, res) {
    //    try {
    //        const {userData} = req.headers;
    //         const info = await transporter.sendMail({
    //            from: `"Karla Nutri - AI" <${process.env.EMAIL}>`,
    //            to: `${userData.email}`,
    //            subject: "New Ticket",
    //            html: "<b>Silas Gay?</b>"
    //        });
//
    //        return res.status(201).json({ info });
    //    } catch (error) {
    //        return res.status(400).json({ error: error});
    //    }
    //}
}

export default new MailController();
