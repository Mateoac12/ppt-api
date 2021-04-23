const mongoose = require('mongoose');
require('dotenv').config()

const DB_URL = process.env.MONGOOSE_URL

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(console.log("mongoose conected"))
.catch(err => console.error(err))