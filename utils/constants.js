require("dotenv").config();

const { NODE_ENV, MONGODB_URI } = process.env;

const dataBase = NODE_ENV === "production" ? MONGODB_URI : "mongodb://localhost:27017/bitfilmsdb";

module.exports = { dataBase };
