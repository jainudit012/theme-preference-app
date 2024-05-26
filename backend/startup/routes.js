const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const routes = require('../routes/index.js')
const helmet = require('helmet')
const compression = require('compression')

module.exports=function(app){
    app.use(helmet())
    app.use(compression())
    app.use(cors())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(express.json())
    app.use('/api/', routes)
}
