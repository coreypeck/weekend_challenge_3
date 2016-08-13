$(document).ready(function() {
    // document.getElementById('number1').value = 0;
    // document.getElementById('number2').value = 0;
    //sets global variables for each part of my future equation
    var $firstNumber = 0;
    var $secondNumber = 0;
    var symbolType = "";
    //Button event listeners
    $("#addNumbers").on("click", doAdd);
    $("#subtractNumbers").on("click", doSubtract);
    $("#divideNumbers").on("click", doDivide);
    $("#multiplyNumbers").on("click", doMultiply);
    $("#clearNumbers").on("click", doClear);
    $("#equals").on("click", checkNumbers);
    setNumberedListeners();
});
//I declared this outside of document.ready, because checkNumbers couldn't find it while inside document.ready
var calculationObject = {
  firstNumber: 0,
  secondNumber: 0,
  operator: ""
}
//sends the addition sign along
function doAdd() {
  getSecondNumber("+");
    // postNumber(makeEquation("+"));
}
//sends the subtraction sign along
function doSubtract() {
  getSecondNumber("-");
    // postNumber(makeEquation("-"));
}
//sends the division sign along
function doDivide() {
  getSecondNumber("/");
    // postNumber(makeEquation("/"));
}
//sends the multiplication sign along
function doMultiply() {
  getSecondNumber("*");
    // postNumber(makeEquation("*"));
}
//sends out the entered equation and passes the math operator to checkSymbol
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
//I reassign the symbol to a word for two reasons. 1: so I can use it in my url later. 2: I don't ahve to worry as much about accidental concatenations and the like
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
//Sends the entered information to the server
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
//grabs the updated information/the calculated answer
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
//Clear out anything that has been entered NOTE: Check Equation reset
function doClear(){
  $('#number-form').find('input[type=number]').val(0);
  $("#results").empty();
  $("#number-form").children().empty();
  $("#number-form").children().first().replaceWith('<div id="number1display"></div><label for="number1">1st Number:</label>');
  $("#number-form").children().first().next().next().remove();
  //Above here removes the number1display and swaps it with the second
  $("#equation").empty();
  resetVariables();
  fixButtons();
}
//converts the first number to text
function getSecondNumber(symbol){
  symbolType = symbol;
  $firstNumber = $("#number1display").text();
  replaceDisplay();
}
//assigns object names to the entered values
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
//The number button listeners. I moved them because it made my document.ready look ridiculous
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
//makes it so they can't hit another math operator after one has been pressed.
function disableButtons(){
  $('#addNumbers').replaceWith("<button id='addNumbers' disabled>+</button>");
  $('#subtractNumbers').replaceWith("<button id='subtractNumbers' disabled>-</button>");
  $('#divideNumbers').replaceWith("<button id='divideNumbers' disabled>/</button>");
  $('#multiplyNumbers').replaceWith("<button id='multiplyNumbers' disabled>*</button>");
}
//Restores function to disabled buttons
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
