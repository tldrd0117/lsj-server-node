const express = require('express');
const app = express();
const cors = require('cors');
const passport = require('passport');
const session = require("express-session");

const mountRoutes = require('./routes');

const port = process.env.PORT || 3000;

const bodyParser = require('body-parser');


app.use(bodyParser.json());
var whitelist = ['http://localhost:8080', 'http://lsj.surge.sh', 'https://lsj.surge.sh']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}
app.use(cors(corsOptions));
app.use(express.static("public"));
app.use(session({ secret : 'whatissession'}))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize())
app.use(passport.session())
//body logger
app.use((req, res, next) => {
    console.log(req.body)
    next()
})

mountRoutes(app);
//logErrors
app.use((err, req, res, next) => {
    console.error(err);
    next(err);
})
//clientErrorHandler
app.use((err, req, res, next) => {
    if(req.xhr) {
        res.status(500).send({error: 'client Error'});
    } else {
        next(err);
    }
})
//all Error Handler
app.use((err, req, res, next) => {
    if(res.locals.error){
        res.status(500).send({error: res.locals.error});
    } else {
        res.status(500).send({error: 'internal error'});
    }
})

app.listen(port, function() {
    console.log('app listening!');
})