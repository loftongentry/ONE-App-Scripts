//Set global variable ss to the spreadsheet where everything will be performed
const ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Final Data');

//Main function where everything executes through
function mainLayers(){ 
  var colorArray = getNumLayers();
  createNewRows(colorArray);
}

//Determine how many green, yellow, and red values are in the copied sheet
function getNumLayers(){
  //Declare variables
  var green1 = 0, green2 = 0, yellow1 = 0, yellow2 = 0, red = 0;
  //Get the data range in the form of an array
  var rng = ss.getRange(2,3, ss.getDataRange().getLastRow(), 1).getValues();
  //Need to do this because we are shifting, or removing the first value in the array, so the array decreases in size
  var length = rng.length;
  
  /*
  For-loop to determine how many times green appears, yellow appears, and red appears in the rng array
  Uses an if statement check to see if cell being evaluated has the specified string
  */
  for(var i = 0; i < length; i++){
    //Removes the first value of the array and stores it as the variable color
    var color = rng.shift();
    //A ternary operator inside a ternary operator inside a ternary operator. Used to check the number of times each appear in the spreadsheet
    color == 'Green' ? green1++ : color == 'Yellow' ? yellow1++ : color == 'Red' ? red++ : null; 
  }

  //If check to ensure that green is always greater than yellow and yellow is always greater than red (uses ternary operator)
  yellow1 <= red ?  yellow2 = red + 1 : null;
  green1 <= yellow2 ? green2 = yellow2 + 1 : green1 <= yellow1 ? green2 = yellow1 + 1 : null;

  //Sanity checker
  Logger.log(green1 + " " + yellow1 + " " + red);
  Logger.log(green2 + " " + yellow2 + " " + red);
  
  //Returns green and yellow as an array
  return [green1, green2, yellow1, yellow2];
}

//Method to add the necessary number of rows of green and yellow so it will appear most often on the spreadshet
function createNewRows(colorArray){
  //Creates the necessary number of new rows with green in the area status column
  for(var i = colorArray[0]; i < colorArray[1]; i++){
    ss.appendRow(['','','Green']);
  }
  //Creates the necessary number of new rows with yellow in the area status column
  for(var i = colorArray[2]; i < colorArray[3]; i++){
    ss.appendRow(['','','Yellow']);
  }
}









