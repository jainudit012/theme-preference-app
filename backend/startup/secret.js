const jwtSecret = process.env.JWT_SECRET || 'jwt_secret'
const passwordSalt = process.env.PASSWORD_SALT || 10

module.exports = {
    jwtSecret,
    passwordSalt
}
