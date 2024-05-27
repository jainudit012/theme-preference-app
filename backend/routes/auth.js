const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const { jwtSecret, passwordSalt } = require('../startup/secret')
const validate = require('../middleware/validate')
const { registerSchema, loginSchema }  = require('../schemas/auth')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/signup', validate(registerSchema), async (req, res) => {
    const { username, password, theme } = req.body

    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({ username, password: hashedPassword, theme })
        const token = jwt.sign(
            { id: user.id, username, theme }, 
            jwtSecret, { expiresIn: '7d' }
        )
        res.status(201).send({ error: false, token, user: { theme: user.theme } })
    } catch (err) {
        res.status(400).send({ error: true, message: 'User registration failed.', detail: `${err}` })
    }
})

router.post('/login', validate(loginSchema), async (req, res) => {
    const { username, password, theme } = req.body

    try {
        const user = await User.findOne({ where: { username } })
        if (!user){
            return res.status(404).send({ error: true, message: 'User does not exist.' })
        }
        if (!(await bcrypt.compare(password, user.password))) {
            return res.status(400).send({ error: true, message: 'Invalid username or password.' })
        }

        user.theme = theme
        await user.save()

        const token = jwt.sign(
            { id: user.id, username, theme },
            jwtSecret, { expiresIn: '7d' }
        )
        res.send({ error: false, token, user: { theme } })
    } catch (err) {
        res.status(500).send({ error: true, message: 'Login failed.', detail: `${err}` });
    }
})

router.post('/logout', auth, (req, res) => {
    res.status(200).send({ error: false, message: 'Logout Successful' })
})

module.exports = router
