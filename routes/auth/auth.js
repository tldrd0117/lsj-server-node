const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const query = require('../user/query')
const Router = require('express-promise-router');
const db = require('../../db')
const router = new Router();

passport.use(new LocalStrategy({
        usernameField: 'userid',
    },
    async function(userid, password, done) {
        const client = await db.getClient();
        try{
            const { rows } = await client.query(query.selectId(undefined, undefined, {
                userid
            }))
            if(!rows){
                return done(null, false, {message: 'internal Error'})
            }
            if( rows.length <= 0 ){
                return done(null, false, {message: 'No Match User'})
            }
            const user = rows[0];
            const match = await user.password === password;
            if(!match){
                return done(null, false, {message: 'No Match password'})
            }
            return done(null, user);
        } catch(e) {
            return done(e);
        } finally {
            client.release()
        };
    }
));

passport.serializeUser(function(user, done){
    console.log('serialize', user.userid)
    done(null, user.userid);
})
passport.deserializeUser( async function(userid, done){

    console.log('deserialize', userid)
    const client = await db.getClient();
    try{
        const { rows } = await client.query(query.selectId(undefined, undefined, {
            userid: userid
        }))
        if(!rows || rows.length <= 0) {
            return done(new Error('deserializeUser: not user'))
        }
        const user = rows[0];
        done(null, user);
    } catch (e) {
        done(e)
    } finally {
        client.release()
    };
})
module.exports = {
    passport,
    router
}