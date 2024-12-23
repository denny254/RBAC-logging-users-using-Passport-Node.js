const router = require('express').Router()


router.get('/profile', async (req, res, next) => {
    // console.log('Profile route hit');
    // console.log(req.user);
    const person = req.user;
    res.render('profile', { person });
  });
  

module.exports = router;