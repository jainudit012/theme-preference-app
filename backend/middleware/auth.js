const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../startup/secret')

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '')
    if (!token) {
        return res.status(401).send({ error: true, message: 'Access denied. No token provided.' })
    }

    try {
        const decoded = jwt.verify(token, jwtSecret)
        req.user = decoded
        next()
    } catch (ex) {
        res.status(401).send({ error: true, message: 'Invalid token' })
    }
};

module.exports = authMiddleware
