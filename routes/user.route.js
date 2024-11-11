const router = require('express').Router()


router.get('/profile', async(req, res, next)=>{
    res.send('User profile');
})

module.exports = router;