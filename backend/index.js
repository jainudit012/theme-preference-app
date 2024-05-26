const express = require('express')
const sequelize = require('./startup/db')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 3001

sequelize.sync().then(() => {
    console.log('Database synchronized.')
})

require('./startup/routes')(app)

app.get('/ping', (req, res) => {
    res.send({error: false, message: 'pong'})
})


app.listen(port, ()=>{
    console.log(`Server Listening on port ${port}...`)
})

module.exports = app
