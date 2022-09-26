/*
Author: Lofton Gentry (lofton.gentry@one-line.com)
Program Created: 8/16/2022
Program Completed: 8/23/2022
Version: 1.1.3
Description: This program's puprose is to gather data from an email, examine the 'Area Status' column from the 'Sheet1' sheet on the spreadsheet 'Imports at Destination' spreadsheet, determine how many times green, yellow, and red appears, and then create empty rows with the values of green or yellow populating the 'Area Status' column. This is done for the purpose of ordering the layers by green, yellow, then red on the 'Imports at Destination' layer on the ONE Network Map. 
*/

//Set global variable ss to the spreadsheet where everything will be performed
const ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');

//Main function where everything executes through
function main(){ 
  //Clears all the content from the current GSheet
  ss.clearContents();
  pullDataFromEmail();
  var colorArray = getNumLayers();
  createNewRows(colorArray);
}

/*
Method searches through the users email, finds the email that matches the subject as specified by the user, extracts the attatchment (assumed to be an excel file), 
and finally converts it into a G-sheet to be used for data analysis purposes
*/
function pullDataFromEmail() {
  //Searches through gmail and finds the email
  var msgs = GmailApp.getMessagesForThreads(GmailApp.search('subject:"Report: Imports at Destination Awaiting to Deramp (Rail imports)"',0,1)); // Identify email has attachement
    for (var i = 0 ; i < msgs.length; i++) {
      for (var j = 0; j < msgs[i].length; j++) {
        var attachments = msgs[i][j].getAttachments();
        for (var k = 0; k < attachments.length; k++) {
          Logger.log('Message "%s" contains the attachment "%s"',
          msgs[i][j].getSubject(), attachments[k].getName());
        }
      }
    }
  //Identifies the sheet specified by its name and clears the content from the range specified
  ss.getRange("A:E").clearContent();  
  var convertedSpreadsheetId = Drive.Files.insert({mimeType: MimeType.GOOGLE_SHEETS}, attachments[0]).id;
  // Assumes there is the data in 1st tab
  var sh = SpreadsheetApp.openById(convertedSpreadsheetId).getSheets()[0]; 
  var data = sh.getDataRange().getValues();
  // Remove the converted file
  Drive.Files.remove(convertedSpreadsheetId); 
  ss.getRange(1, 1, data.length, data[0].length).setValues(data);
}

//Determine how many green, yellow, and red values are in the copied sheet
function getNumLayers(){
  //Declare variables
  var green1 = 0, green2 = 0, yellow1 = 0, yellow2 = 0, red = 0;
  var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
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
    color == 'Green (0 to 1 days)' ? green1++ : color == 'Yellow (1 to 2 days)' ? yellow1++ : color == 'Red (2+ days)' ? red++ : null; 
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
    ss.appendRow(['','','Green (0 to 1 days)']);
  }
  //Creates the necessary number of new rows with yellow in the area status column
  for(var i = colorArray[2]; i < colorArray[3]; i++){
    ss.appendRow(['','','Yellow(1 to 2 days)']);
  }
}
