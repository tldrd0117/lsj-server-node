const query = require('../user/query');
const {router, passport} = require('./auth');
const client = require('../client');

module.exports = router;

router.post('/login', async (req, res, next) => {
    passport.authenticate('local',
    function(err, user, info){
        if (err) { return next(err); }
        if (!user) { return res.status(200).send(info.message)}
        req.login(user, function(err){
            if(err) return next(err);
            return res.status(200).json(user);
        })
    })(req, res, next)
})

router.get('/logout', function(req, res){
    req.logout();
})
