import { Sequelize } from "sequelize";

const db = new Sequelize('crud_db','pd','root123',{
    host : 'localhost',
    dialect:'mysql'
})


export default db