let mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config();

const mongoUri = process.env.MONGO_URI;
class Database {
  constructor() {
    this._connect()
  }
  
_connect() {
     mongoose.connect(mongoUri)
       .then(() => {
         console.log('Conexão com o banco de dados iniciada com sucesso!')
       })
       .catch(err => {
         console.error('Conexão com o banco de dados falhou!')
       })
  }
}

module.exports = new Database()