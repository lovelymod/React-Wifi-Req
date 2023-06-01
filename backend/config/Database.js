import { Sequelize } from "sequelize";

const db = new Sequelize("wifi_request", "root", "1234", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
