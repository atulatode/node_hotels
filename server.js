const express = require('express')
const app = express();
const db = require('./db');
const Person = require('./models/person');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const validator = require('./helpers/validate');
//import the router
const personRoutes = require('./routes/personRoutes');
require('dotenv').config();
//use the router
app.use('/',personRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server is listening on port 3000')
})