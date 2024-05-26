const Joi = require('joi')

const registerSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(8).required(),
    theme: Joi.string()
})

const loginSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(8).required(),
    theme: Joi.string()
})

module.exports = {
    registerSchema,
    loginSchema
}
