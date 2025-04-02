import express from "express";
import MailController from "../mailer/mailController.js";

const router = new express.Router();

router.post("", MailController.forSupport);

export default router;
