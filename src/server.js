const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json({
    limit: '50mb'
}));
  
//app.use(bodyParser.urlencoded({limit: '200mb', extended: true, parameterLimit:50000}));

require('./controllers/athenticate/authController')(app);
require('./controllers/story/storyController')(app);
require('./controllers/register/registerController')(app);
require('./controllers/image/imageController')(app);
require('./controllers/stories/storiesController')(app);

app.listen(3000);