$(document).ready(function() {
    // document.getElementById('number1').value = 0;
    // document.getElementById('number2').value = 0;
    var $firstNumber = 0;
    var $secondNumber = 0;
    var symbolType = "";

    $("#addNumbers").on("click", doAdd);
    $("#subtractNumbers").on("click", doSubtract);
    $("#divideNumbers").on("click", doDivide);
    $("#multiplyNumbers").on("click", doMultiply);
    $("#clearNumbers").on("click", doClear);
    $("#equals").on("click", checkNumbers);
    setNumberedListeners();
});

var calculationObject = {
  firstNumber: 0,
  secondNumber: 0,
  operator: ""
}

function doAdd() {
  getSecondNumber("+");
    // postNumber(makeEquation("+"));
}

function doSubtract() {
  getSecondNumber("-");
    // postNumber(makeEquation("-"));
}

function doDivide() {
  getSecondNumber("/");
    // postNumber(makeEquation("/"));
}

function doMultiply() {
  getSecondNumber("*");
    // postNumber(makeEquation("*"));
}

function makeEquation(mathObject) {
    event.preventDefault();
    // var numbers = {};
    // $.each($("#number-form").serializeArray(), function(i, field) {
    //     numbers[field.name] = field.value;
    // });
    var equation = mathObject.firstNumber + mathObject.operator + mathObject.secondNumber;
    $("#equation").empty();
    $("#equation").append(equation);
    mathObject.operator = checkSymbol(mathObject.operator);
    return mathObject;
}

function checkSymbol(symbol) {
    if (symbol == "+") {
        symbol = "Add";
        return symbol;
    } else if (symbol == "-") {
        symbol = "Subtract";
        return symbol;
    } else if (symbol == "/") {
        symbol = "Divide";
        return symbol;
    } else if (symbol == "*") {
        symbol = "Multiply";
        return symbol;
    } else {
        symbol = null;
        return symbol;
    }
}
function postNumber(numberObject){
    $.ajax({
      type: "POST",
      url: "/" + numberObject.operator,
      data: numberObject,
      success: function(){
        getAnswer(numberObject);
      }
    });
}
function getAnswer(numberObject){
  $.ajax({
    type: "GET",
    url: "/" + numberObject.operator,
    success: function(calculatedAns){
      doClear();
      $("#results").append(calculatedAns);
    }
  });
}
function doClear(){
  $('#number-form').find('input[type=number]').val(0);
  $("#results").empty();
  $("#number-form").children().empty();
  $("#number-form").children().first().replaceWith('<div id="number1display"></div><label for="number1">1st Number:</label>');
  $("#number-form").children().first().next().next().remove();
  resetVariables();
  fixButtons();
}
function getSecondNumber(symbol){
  symbolType = symbol;
  $firstNumber = $("#number1display").text();
  replaceDisplay();
}
function checkNumbers(){
  $secondNumber = $("#number2display").text();
  calculationObject.firstNumber = $firstNumber;
  calculationObject.secondNumber = $secondNumber;
  calculationObject.operator = symbolType;
  postNumber(makeEquation(calculationObject));
}
function addValue(number){
  console.log(number);
  numId = "#" + number;
  $("#number-form").children().first().append(number);
  $(numId).children().on("click", function(){
    addValue(number);
  });}
function replaceDisplay(){
  $("#number1display").empty();
  $("#number1display").replaceWith('<div id="number2display"></div><label for="number2">2nd Number:</label>');
  $("#number2display").next().next().remove();
  disableButtons();
}
function setNumberedListeners(){
  $("#0").on("click", function(){
    addValue(0);
  });
  $("#1").on("click", function(){
    addValue(1);
  });
  $("#2").on("click", function(){
    addValue(2);
  });
  $("#3").on("click", function(){
    addValue(3);
  });
  $("#4").on("click", function(){
    addValue(4);
  });
  $("#5").on("click", function(){
    addValue(5);
  });
  $("#6").on("click", function(){
    addValue(6);
  });
  $("#7").on("click", function(){
    addValue(7);
  });
  $("#8").on("click", function(){
    addValue(8);
  });
  $("#9").on("click", function(){
    addValue(9);
  });
}
function disableButtons(){
  $('#addNumbers').replaceWith("<button id='addNumbers' disabled>+</button>");
  $('#subtractNumbers').replaceWith("<button id='subtractNumbers' disabled>-</button>");
  $('#divideNumbers').replaceWith("<button id='divideNumbers' disabled>/</button>");
  $('#multiplyNumbers').replaceWith("<button id='multiplyNumbers' disabled>*</button>");
}
function fixButtons(){
  $('#addNumbers').replaceWith("<button id='addNumbers'>+</button>");
  $('#subtractNumbers').replaceWith("<button id='subtractNumbers'>-</button>");
  $('#divideNumbers').replaceWith("<button id='divideNumbers'>/</button>");
  $('#multiplyNumbers').replaceWith("<button id='multiplyNumbers'>*</button>");
  $("#addNumbers").on("click", doAdd);
  $("#subtractNumbers").on("click", doSubtract);
  $("#divideNumbers").on("click", doDivide);
  $("#multiplyNumbers").on("click", doMultiply);
}
function resetVariables(){
  $firstNumber = 0;
  $secondNumber = 0;
  symbolType = "";
  calculationObject = {
    firstNumber: 0,
    secondNumber: 0,
    operator: ""
  };
}
