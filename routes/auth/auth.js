const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const query = require('../user/query')
const Router = require('express-promise-router');
const db = require('../../db')
const router = new Router();

passport.use(new LocalStrategy({
        usernameField: 'userid',
        session: false
    },
    async function(username, password, done) {
        try{
            const client = await db.getClient();
            const { rows: user } = await client.query(query.selectId({
                userid: username
            }))
            console.log(user);
            if(!user || user.length <= 0){
                return done(null, false, {message: 'No User'})
            }
        } catch(e) {
            return done(e);
        }

        let match = await user.password === password;
        if(!match){
            return done(null, false, {message: 'No match password'})
        }
        return done(null, user);
    }
));

passport.serializeUser(function(user, done){
    done(null, user.userid);
})
passport.deserializeUser( async function(userid, done){
    try{
        const user = await client.query(query.selectId({
            userid: userid
        }))
        if(!user) {
            return done(new Error('deserializeUser: not user'))
        }
        done(null, user);
    } catch (e) {
        done(e)
    }
})
module.exports = {
    passport,
    router
}