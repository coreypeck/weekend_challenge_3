var express = require('express');
var router = express.Router();
var calculatedAnswer = 0;

router.post("/", function(req, res){
  var numbers = req.body;
  calculatedAnswer = parseFloat(numbers.firstNumber) * parseFloat(numbers.secondNumber);
  res.sendStatus(201);
});
router.get("/", function(req, res){
  if(parseInt(calculatedAnswer) == calculatedAnswer){
    calculatedAnswer = parseInt(calculatedAnswer);
    res.send(calculatedAnswer.toString());
  }else if(parseInt(calculatedAnswer)!=calculatedAnswer){
    res.send(calculatedAnswer.toFixed(5));
  }});
module.exports = router;
