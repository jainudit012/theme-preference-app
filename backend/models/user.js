const { DataTypes } = require('sequelize')
const sequelize = require('../startup/db')

const User = sequelize.define('User', 
    {
        user_id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        theme: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, 
    {
        timestamps: true
    }
)

module.exports = User
