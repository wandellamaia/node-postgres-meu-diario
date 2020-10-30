const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json({
    limit: '50mb'
  }));
  
//app.use(bodyParser.urlencoded({limit: '200mb', extended: true, parameterLimit:50000}));

require('./controllers/authController')(app);
require('./controllers/storyController')(app);
require('./controllers/registerController')(app);
require('./controllers/imageController')(app);

app.listen(3000);