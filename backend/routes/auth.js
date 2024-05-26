const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const { jwtSecret } = require('../startup/secret')
const validate = require('../middleware/validate')
const { registerSchema, loginSchema }  = require('../schemas/auth')

const router = express.Router()

router.post('/signup', validate(registerSchema), async (req, res) => {
    const { username, password } = req.body

    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({ username, password: hashedPassword })
        const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: '1d' })
        res.status(201).send({ error: false, token, user: { theme: user.theme } })
    } catch (err) {
        res.status(400).send({ error: true, message: 'User registration failed.', detail: `${err}` })
    }
})

router.post('/login', validate(loginSchema), async (req, res) => {
    const { username, password } = req.body

    try {
        const user = await User.findOne({ where: { username } })
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).send({ error: true, message: 'Invalid username or password.' })
        }

        const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: '1d' })
        res.send({ error: false, token, user: { theme: user.theme } })
    } catch (err) {
        res.status(500).send({ error: true, message: 'Login failed.', detail: `${err}` });
    }
})

module.exports = router
