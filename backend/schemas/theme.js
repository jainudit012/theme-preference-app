const Joi = require('joi')
const { THEME_CHOICES }  = require('../startup/constants')

const themePreferenceSchema = Joi.object({
    theme: Joi.string().valid(...THEME_CHOICES).required()
})

module.exports = {
    themePreferenceSchema
}
