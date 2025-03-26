import userService from "../services/userService.js";

class UserController {
  async create(req, res) {
    try {
      const { name, email, password, tel } = req.body;

      const newUser = await userService.createUser({
        name,
        email,
        password,
        tel,
      });

      return res.status(201).json({ newUser });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const user = req.headers.user;
      const { name, email, password, tel } = req.body;
      const updateUser = await userService.updateUser(user, {
        name,
        email,
        password,
        tel,
      });
      return res.status(201).json({ updateUser });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const user = req.headers.user;
      const deleteUser = await userService.deleteUser(user);
      return res.status(201).json({ deleteUser });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async get(req, res) {
    try {
      const userId = req.headers.user;
      const user = await userService.findUserById(userId);
      user.password = undefined;
      return res.status(201).json({ user });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new UserController();
