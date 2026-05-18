const router = require('express').Router();
const {register,login} = require('../Controller/Auth.Controller.js')

router.post('/register',register);
router.post('/login',login);

module.exports = router;