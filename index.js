const express = require('express');
const app = express();
const cors = require('cors');

const mountRoutes = require('./routes')

const port = process.env.PORT || 3000;

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(cors());
//body logger
app.use((req, res, next) => {
    console.log(req.body)
    next()
})

mountRoutes(app);

app.listen(port, function() {
    console.log('app listening!');
})