const express = require('express');
const app = express();
const cors = require('cors');
const passport = require('passport');
const session = require("express-session"),


const mountRoutes = require('./routes')

const port = process.env.PORT || 3000;

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret : 'whatissession'}))
app.use(passport.initialize())
app.use(passport.session())
//body logger
app.use((req, res, next) => {
    console.log(req.body)
    next()
})

mountRoutes(app);

app.listen(port, function() {
    console.log('app listening!');
})