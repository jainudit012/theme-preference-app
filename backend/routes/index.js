const express = require('express')
const authRoutes = require('./auth')
const userRoutes = require('./user')

const router = express.Router()

router.use('/user', userRoutes)
router.use('/', authRoutes)

module.exports = router
