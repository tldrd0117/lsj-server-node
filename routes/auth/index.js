const query = require('../user/query')
const {router, passport} = require('./auth');

module.exports = router;

router.post('/login', function(req, res, next){
    passport.authenticate('local',
    function(err, user, info){
        if (err) { return next(err); }
        console.log('auth', user, info);
        if (!user) { return res.status(500).send('no user')}
        req.login(user, function(err){
            if(err) return next(err);
            return res.status(200).json(user);
        })
    })(req, res, next)
})

router.get('/logout', function(req, res){
    req.logout();
})
