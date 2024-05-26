const express = require('express')
const router = express.Router()

router.get('/', (req,res)=>{
    res.send({error: false, message: 'You have reached me!!!'})
})

module.exports = router
