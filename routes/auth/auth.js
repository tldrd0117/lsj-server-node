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
            console.log(user.length);
            if(!user){
                return done(null, false, {message: 'internal Error'})
            }
            if( user.length <= 0 ){
                return done(null, false, {message: 'No User'})
            }
            const match = await user[0].password === password;
            if(!match){
                return done(null, false, {message: 'No match password'})
            }
            return done(null, user);
        } catch(e) {
            return done(e);
        }

        
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