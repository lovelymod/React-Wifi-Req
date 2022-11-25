import { Sequelize } from "sequelize";

const db = new Sequelize('wifireq2','gong','gong1234',{
    host : 'localhost',
    dialect:'mysql'
})


export default db