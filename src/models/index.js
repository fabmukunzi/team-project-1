//importing modules
const {Sequelize, DataTypes} = require('sequelize')

const sequelize = new Sequelize(`postgres://nrhfxksw:CPpKsdZWk811VrwG6lx8O29GbLNYz1WE@satao.db.elephantsql.com/nrhfxksw`, {dialect: "postgres"})

//checking if connection is done
    sequelize.authenticate().then(() => {
        console.log(`Database connected!`)
    }).catch((err) => {
        console.log(err)
    })

    const db = {}
    db.Sequelize = Sequelize
    db.sequelize = sequelize

//connecting to model
db.users = require('./user') (sequelize, DataTypes)

//exporting the module
module.exports = db