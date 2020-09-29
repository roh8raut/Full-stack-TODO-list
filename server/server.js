const express = require('express');
const mongoose = require("mongoose");
require('dotenv').config();
const cors = require('cors');

const app = express();

const router = require('./router/routes');

const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => console.log('--------------------------------------------MongoDB Connected--------------------------------------------------------------------------------'))
  .catch(err => console.log(err));

var whitelist = ['http://localhost:3000', 'chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop'];
var corsOptions = {
  origin: function (origin, callback) {
    console.log(origin);
    try {
      console.log(origin)
      if (whitelist.indexOf(origin) === -1) {
        callback(new Error('Not allowed by CORS'), false);
      } else {
        callback(null, true);
      }
    } catch (e) {
      res.status(401).send(e)
    }
  }
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(router);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})