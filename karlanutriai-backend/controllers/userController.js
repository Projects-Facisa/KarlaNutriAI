import userService from "../services/userService.js";

class UserController {
    async create(req, res) {
        try {
            const data = req.body;

            const newUser = await userService.createUser(data);

            return res.status(201).json({newUser});
        } catch (error) {
            return res.status(400).json({error: error.message});
        }
    }

    async update(req, res) {
        try {
            const {userData} = req.headers;
            const data = req.body;
            const updateUser = await userService.updateUser(userData.id, data);
            return res.status(200).json({updateUser});
        } catch (error) {
            return res.status(400).json({error: error.message});
        }
    }

    async delete(req, res) {
        try {
            const {userData} = req.headers;
            const deleteUser = await userService.deleteUser(userData.id);
            return res.status(200).json({deleteUser});
        } catch (error) {
            return res.status(400).json({error: error.message});
        }
    }

    async get(req, res) {
        try {
            const {userData} = req.headers;
            const user = await userService.findUserById(userData.id);
            user.password = undefined;
            return res.status(200).json({user});
        } catch (error) {
            return res.status(400).json({error: error.message});
        }
    }
}

export default new UserController();
