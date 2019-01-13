const express = require('express');
const app = express();
const cors = require('cors');

const mountRoutes = require('./routes')

const port = process.env.PORT || 3000;

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(cors());

mountRoutes(app);

app.listen(port, function() {
    console.log('app listening!');
})