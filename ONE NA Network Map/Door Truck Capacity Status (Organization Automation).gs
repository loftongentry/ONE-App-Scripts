/*
Author: Lofton Gentry
Program Created: 8/24/2022
Program Completed: 8/25/2022
Version Number: 1.1.1
Description: This program's purpose is to copy over all the data from the 'Sheet1' sheet on the 'Test Door Truck Capacity' spreadsheet, paste it over the 'Map' sheet after that sheet has been un-hidden, determine how many times green, yellow, and red appears, create empty rows with the values of green or yellow populating the 'Status' column, and then re-hiding the 'Map' sheet. This is done for the purpose of ordering the layers by green, yellow, then red on the 'Test Door Truck Capacity Status' layer on the ONE Network Map. The 'Map' sheet is hidden because the team in charge of pasting the values to the 'Sheet1' sheet do not like how empty rows are populated with 'yellow' or 'green', and I've had to work around that. 
*/

//Set global variable ss to the spreadsheet where everything will be copied, and sh to the sheet where everything will all operations will be performed
const ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');
const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Map');

//Main function where everything is executed
function main(){
  //Shows the hidden map sheet that will be used with the NA Network Map
  sh.showSheet();
  //Clears out all the information that was originally in the 'Map' sheet
  sh.clear();
  //Calls on the copyValues method
  copyValues();
  //Sets the returned value from the dataReclamation method to the variable colorArray
  var colorArray = dataReclamation();
  //createNewRows method executes with the colorArray variable 
  createNewRows(colorArray);
}

//This method copies over all the data from the 'Sheet1' sheet and pastes it into the 'Map' sheet, which will be used by the NA Network Map
function copyValues(){
  //Get the values that will be copied. This should copy over all of the data on the 'Sheet1' sheet
  var rngSrc = ss.getDataRange().getValues();
  //Determine the range that the values will be posted to
  var rngTgt = sh.getRange(1, 1, rngSrc.length, rngSrc[0].length);
  //Filling the range of the target sheet with data retrieved from the source sheet
  rngTgt.setValues(rngSrc);
  //This portion of code is just to copy over the formatting of the 'Sheet1' sheet. Currently unsure if this is useful or not. If it is not useful, then it will be subsequently deleted
  var sheetId = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Map').getSheetId();
  ss.getDataRange().copyFormatToRange(sheetId,1,sh.getLastColumn(),1,sh.getLastRow());
}

//Method to determine the number of times green, yellow, and red appears in the 'Status' section of the 'Map' sheet
function dataReclamation() {
  //Declaring variables
  var green1 = 0, green2 = 0, yellow1 = 0, yellow2 = 0, red = 0;
  //Get the data range in the form of an array
  var rng = sh.getRange(2, 3, sh.getLastRow(), 1).getValues();
  //Need to do this because we are shifting, or removing the first value in the array, so the array decreases in size
  var length = rng.length;
ss
  /*
  For-loop to determine how many times green appears, yellow appears, and red appears in the rng array
  Uses an if statement check to see if cell being evaluated has the specified string
  */
  for(var i = 0; i < length; i++){
    //Removes the first value of the array and stores it as the variable color
    var color = rng.shift();
    //A ternary operator inside a ternary operator inside a ternary operator. Used to check the number of times each appear in the spreadsheet
    color == 'Green (0 to 1 days)' ? green1++ : color == 'Yellow (1 to 2 days)' ? yellow1++ : color == 'Red (2+ days)' ? red++ : null;
  }

  //If check to ensure that green is always greater than yellow and yellow is always greater than red (uses ternary operator)
  yellow1 <= red ?  yellow2 = red + 1 : null;
  green1 <= yellow2 ? green2 = yellow2 + 1 : green1 <= yellow1 ? green2 = yellow1 + 1 : null;
  
  //Sanity check to make sure all the outputs are correct
  Logger.log(green1 + " " + yellow1 + " " + red);
  Logger.log(green2 + " " + yellow2 + " " + red);
  
  //Returns green and yellow as an array
  return [green1, green2, yellow1, yellow2];
}

//Method to add the necessary number of rows of green and yellow so it will appear most often on the spreadshet
function createNewRows(array){
  //Creates the necessary number of new rows with green in the area status column  
  for(var i = array[0]; i < array[1]; i++){
    sh.appendRow(['','','Green']);
  }
  //Creates the necessary number of new rows with yellow in the area status column
  for(var i = array[2]; i < array[3]; i++){
    sh.appendRow(['','','Yellow']);
  }
}

//Function to hide the 'Map' sheet because I want it to be shown only for about an hour to update the NA Network Map, and then have it be re-hidden. It is re-hidden using a trigger
function hideSheet(){
  sh.hideSheet();
}
