var express = require('express');
var router = express.Router();
var calculatedAnswer = 0;

router.post("/", function(req, res){
  var numbers = req.body;
  calculatedAnswer = parseFloat(numbers.firstNumber) - parseFloat(numbers.secondNumber);
  res.sendStatus(201);
});
router.get("/", function(req, res){
  res.send(calculatedAnswer.toFixed(5));
});
module.exports = router;
