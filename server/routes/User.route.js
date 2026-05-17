const router = require('express').Router();

router.get('/',(req,res)=>{
    res.send('Hello there from users route')
})

module.exports = router;