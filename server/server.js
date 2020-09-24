const express = require('express');
const mongoose = require("mongoose");
require('dotenv').config();
const cors = require('cors');

const app = express();

const router = require('./router/routes');

const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI,{ useNewUrlParser: true })
.then(() => console.log('--------------------------------------------MongoDB Connected--------------------------------------------------------------------------------'))
.catch(err => console.log(err));

app.use(express.json());
app.use(router);
app.use(cors);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})