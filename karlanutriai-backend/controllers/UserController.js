import User from "../models/User.js";
import { isEmail, verifyPassword } from "../GlobalFunctions.js";

class UserController {
    async create(req, res) {
        try {
            const { nome, email, senha, telefone } = req.body;

            // Check if all required information is provided
            if (!nome || !email || !senha || !telefone) {
                return res.status(406).json({ error: "All information is required" });
            }

            if (verifyPassword(senha)) {
                return res.status(406).json({ error: "Invalid password" });
            }

            if (!isEmail(email)) {
                return res.status(406).json({ error: "Invalid email" });
            }

            // Create a new user
            const user = new User({
                nome: nome.trim(),
                email: email.trim(),
                senha: senha.trim(),
                telefone: telefone.trim()
            });


            const response = await user.save();
            response.senha = undefined; // Remove password from the response

            return res.status(201).json({newUser: response});
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export default new UserController();
