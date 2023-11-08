const express = require('express')
const router = express.Router()
const { register, login } = require('../../controller/authController')
const { userValidationRules, loginValidationRules, validate } = require('../../middleware/validator')


router.post('/register', userValidationRules(), validate, register)
router.post('/login', loginValidationRules(), validate, login)


module.exports = router;