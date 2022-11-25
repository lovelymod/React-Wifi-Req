import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Adminloging = db.define('admins',{
  Username:{
      type: DataTypes.STRING,
      allowNull: false,
  },
  Password:{
      type: DataTypes.STRING,
      allowNull: false,
  },
  refresh_token:{
      type: DataTypes.TEXT
  }
});

(async () => {
  await db.sync();
})();

export default Adminloging;