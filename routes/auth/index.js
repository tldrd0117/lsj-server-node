const query = require('../user/query');
const {router, passport} = require('./auth');
const client = require('../client');
const md5 = require('md5');

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
    res.status(200).json({info: 'logout'});
})

router.post('/autoLogin', function(req, res){
    const isLogged = req.isAuthenticated();
    console.log( 'isLogged' );
    res.status(200).json({
        login: isLogged, 
        name: isLogged ? req.user.name : '',
        emailHash: isLogged ? md5(req.user.email) : ''
    });
});
