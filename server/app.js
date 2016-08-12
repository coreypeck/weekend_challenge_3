var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var adding = require("./routes/adding");
var subtracting = require("./routes/subtracting");
var dividing = require("./routes/dividing");
var multiplying = require("./routes/multiplying");

app.use(bodyParser.urlencoded({extended: true}));

// app.use();
app.use("/Add", adding);
app.use("/Subtract", subtracting);
app.use("/Divide", dividing);
app.use("/Multiply", multiplying);

// serve static files
app.get('/*', function(req, res) {
  var file = req.params[0] || '/views/index.html';
  res.sendFile(path.join(__dirname, './public', file));
});

app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function() {
  console.log('server is running on port ', app.get('port'));
});
