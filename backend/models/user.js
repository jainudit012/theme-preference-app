const { DataTypes } = require('sequelize')
const sequelize = require('../startup/db')

const User = sequelize.define('User', 
    {
        user_id: {
            type: DataTypes.STRING,
            primaryKey: true
        }
    }, 
    {
        timestamps: true
    }
)

module.exports = User
