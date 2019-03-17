const query = require('./query')

const {router, passport} = require('./auth');

module.exports = router;

router.post('/user/login', passport.authenticate('local', {},
    function(req, res){
        console.log(req)
        res.status(200).json(req.user);
    }
))
