const User = require("../models/userModel.js");

const createUser = async (name, email, password, tel) => {

  const newUser = new User({
    name,
    email,
    password,
    tel
  });

  await newUser.save();

  return newUser; 
};

const getAllUser = async () => {
  return await User.find(); 
};

const getUserById = async (id) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error("Usuario nao encontrado");
    }
    return user; 
  } catch (error) {
    throw new Error("Erro ao recuperar usuario");
  }
};

const deleteUser = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    throw new Error("Usuario nao encontrado");
  }

  await User.deleteOne({ _id: id });
  return true; 
};

const editUser = async (id, name, email, password, tel) => {
  let user = await User.findByIdAndUpdate(id, { name, email, password, tel }, { new: true });

  if (!user) {
    throw new Error("Usuario nao encontrado");
  }

  return user; 
};

module.exports = { getAllUser, createUser, editUser, deleteUser, getUserById };