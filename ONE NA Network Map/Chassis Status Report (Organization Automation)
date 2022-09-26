/*
Author: Lofton Gentry
Program Created: 8/24/2022
Program Completed: 8/25/2022
Version Number: 1.1.3
Description: This program's purpose is to examine the 'Status' column of the 'Map' sheet on the 'Chassis Status Report' spreadsheet, determine how many times green, yellow, and red appears, and then create empty rows with the values of green or yellow populating the 'Status' column. This is done for the purpose of ordering the layers by green, yellow, then red on the 'Chassis Status Report' layer on the ONE Network Map. 

WARNING: Currently this program works because there are only 42 rows on the 'Map' sheet. If, for any reason, more rows need to be added, PLEASE CONTACT lofton.gentry@one-line.com. If he is unavailable or no longer works at ONE, please read through the documentation (the comments) on this program in order to change the program properly in order to ensure that no data is being erased when the 'Chassis Status Report' sheet is updated. This warning is for people who have not seen programming or do not know what they are looking at. If you know what this program is doing and/or understand what you're looking at, please disregard this warning.
*/

//Set global variable ss to the spreadsheet where everything will be performed
const ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Map');

//Main function where everything is executed
function main(){
  /*
  Gets the range where the new blank layers will be created and sets it to the value rng
  WARNING: This variable needs to be changed if there are more rows added to the 'Map' sheet. For any number of rows that need to be added, please increment the value 43 on line 25
  with the number of rows to be added. 
  
  EXAMPLE: If there are two new rows to be added to the 'Map' sheet, then 43 will become 45 instead, and the line will look like:
    var rng = ss.getRange(45, 4, ss.getLastRow());
  This should ensure that the program will continue to execute properly and not erase any data
  */
  var rng = ss.getRange(43, 4, ss.getLastRow());
  //Clears content from the specified range
  rng.clearContent();
  //Sets the returned value from the dataReclamation method to the variable colorArray
  var colorArray = dataReclamation();
  //createNewRows method executes with the colorArray variable 
  createNewRows(colorArray);
  /*
  If check to see if there is an empty row, and if there is, it is deleted. This was done because during testing, there was an empty row that appeared that caused issues with the layer organization
  WARNING: The values on lines 37 and 38 also needs to be changed if more rows are to be added. Much like the previous example, if you add two more rows, the variable will become 45 instead
  of 43
  */
  if(SpreadsheetApp.getActiveSheet().getRange(43, 4).getValue() == ""){
    ss.deleteRow(43);
  }
}

//Method to determine the number of times green, yellow, and red appears in the 'Status' section of the 'Map' sheet
function dataReclamation() {
  //Declaring variables
  var green1 = 0, green2 = 0, yellow1 = 0, yellow2 = 0, red = 0;
  //Get the data range in the form of an array
  var rng = ss.getRange(2, 4, ss.getLastRow(), 1).getValues();
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
function createNewRows(array){
  //Creates the necessary number of new rows with green in the area status column  
  for(var i = array[0]; i < array[1]; i++){
    ss.appendRow(['','','','Green']);
  }
  //Creates the necessary number of new rows with yellow in the area status column
  for(var i = array[2]; i < array[3]; i++){
    ss.appendRow(['','','','Yellow']);
  }
}

//Method that if a user tries to edit a cell past row 44 in the second column, that there will be a warning sent out that the automation for the NA network map will no longer work 
function onEdit(){
  var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Paste');
  /*
  Check to see if a user tries to edit the specified range
  WARNING: If a row is added to the 'Paste' sheet, the value that needs to be changed is the 44. Similar to the explanation and example in the 'Main' method, you increase 44 by the number of rows
  you add.   

  Example: EXAMPLE: If there are two new rows to be added to the 'Paste' sheet, then 44 will become 46 instead.
  */
  if(sh.getActiveCell().getRow() >= 44 & sh.getActiveCell().getColumn() == 2 & sh.getRange(sh.getActiveCell().getA1Notation()).getValue() != ""){
    //The actual alert message sent out
    SpreadsheetApp.getUi().alert("PLEASE BE ADVISED: ALETERING THIS TAB CAN CAUSE THE AUTOMATION OF THE PROGRAM TO MALFUNCTION\n\nTo prevent the back-end script from future errors, please " + 
    "adjust the script or contact:\nlofton.gentry@one-line.com or the manager of SP & C");
  }
}
