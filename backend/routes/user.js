const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const validate = require('../middleware/validate')
const { themePreferenceSchema } = require('../schemas/theme')
const { DEFAULT_THEME, THEME_CHOICES }  = require('../startup/constants')

const router = express.Router()

router.get('/theme-choices', async (req, res) => {
    try {
        res.send({ error: false, choices: { THEME_CHOICES } })
    } catch (err) {
        res.status(500).send({ error: true, message: 'Could not fetch theme choices at this time! Please try again later.', detail: `${err}` })
    }
})

router.get('/preferences', auth, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id)
        if (user) {
            const theme = user.theme || DEFAULT_THEME
            res.send({ error: false, user: { theme } })
        } else {
            res.status(404).send({ error: true, message: 'User does not exist!' })
        }
    } catch (err) {
        res.status(500).send({ error: true, message: 'Could not fetch theme preference at this time! Please try again later.', detail: `${err}` })
    }
});

router.put('/preferences', auth, validate(themePreferenceSchema), async (req, res) => {
    try {
        const { theme } = req.body
        await User.update({ theme }, { where: { id: req.user.id } })
        res.send({ error: false, user: { theme } })
    } catch (err) {
        res.status(500).send({ error: true, message: 'Could not update theme preference at this time! Please try again later.', detail: `${err}` })
    }
});

module.exports = router
