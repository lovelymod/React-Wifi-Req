import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Users = db.define("users", {
  Firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  User_Type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Tel: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Device_Type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Device_Brand: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Device_Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Start_Date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  End_Date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Remark: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Dates: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Times: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Ip_Addr: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

(async () => {
  await db.sync();
})();

export default Users;
