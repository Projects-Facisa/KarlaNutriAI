import jwt from 'jsonwebtoken';
import userService from "../services/userService.js";
import bcrypt from "bcrypt";


class AuthController {

    async signin(req, res) {
        try {
            const {email, password} = req.body;

            // Check if email and password are provided
            if (!email || !password) {
                return res.status(400).json({error: "E-Mail e Senha são obrigatórios"});
            }

            const user = await userService.findUserByEmail(email);

            // Check if user exists
            if (!user) {
                return res.status(401).json({error: 'Usuário não encontrado'});
            }

            // Compare provided password with stored password
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(401).json({error: 'Acesso negado'});
            }

            // Generate JWT token
            const token = jwt.sign(
                {id: user._id, name: user.name},
                process.env.JWT_ACCESS_SECRET,
                {expiresIn: process.env.JWT_EXPIRES}
            );

            return res.status(200).json({login: true, message: "SignIn Realizado com Sucesso", token: token});

        } catch (error) {
            return res.status(400).json({error: "Authorization header inválido"});
        }
    }

    async displayHome(req, res) {
        try {
            const {userData} = req.headers;
            const hasNutritionalData = userService.hasNutritionalData(userData.id)
            return res.status(200).json({display: !!hasNutritionalData})
        } catch (error) {
            return res.status(400).json({error: error.message});
        }
    }
}

export default new AuthController();
