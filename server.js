const express = require('express')
const app = express();
const db = require('./db');
const Person = require('./models/person');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const validator = require('./helpers/validate');
//import the router
const personRoutes = require('./routes/personRoutes');
//use the router
app.use('/',personRoutes);
require('dotenv').config();
const PORT = process.env.PORT || 3000;

// app.get('/getIdliDetails', function (req, res) {
//   var customizedIdli = {
//     "name"      : "Idli",
//     "type"      : "Rawa Idli",
//     "size"      : "10 CM", 
//     "is_sambhar": true,
//     "is_chutney": true
//   }
//   res.send(customizedIdli);
// })


app.listen(PORT, () => {
  console.log('Server is listening on port 3000')
})