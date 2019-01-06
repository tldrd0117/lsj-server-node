const express = require('express');
const app = express();

const mountRoutes = require('./routes')

const port = process.env.PORT || 3000;

mountRoutes(app);

app.listen(port, function() {
    console.log('app listening!');
})