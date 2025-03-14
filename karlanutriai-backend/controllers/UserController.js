import userService from "../services/userService.js";

class UserController {
    async create(req, res) {
        try {
            const { name, email, password, tel } = req.body;

            const newUser = await userService.createUser({ name, email, password, tel });

            return res.status(201).json({ newUser });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export default UserController;
