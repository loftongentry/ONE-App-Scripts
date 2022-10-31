/*
Author: Lofton Gentry (lofton.gentry@one-line.com)
Program Created: 8/18/2022
Program Completed: IN-PROGRESS
Version: 1.2.1
Description: This program's purpose is to pull data from the imported HTML as well as from ONE's systems, combine the data as necessary, paste that data into another 
spreadsheet, and then have the subsequent pivot sheet data be sent to a master sheet.
*/

//Setting global variables to sheets as specified as necessary 
const combine = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Combine');
const usorf = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('USORF');
const pivot = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Pivot');

function main(){
  //Array with the names of all the sheets that will be hidden when program executes
  var sheets = ['USORF', 'ONE', 'Pivot'];
  //Hides the each sheet whose name is in array sheets
  for(var i = 0; i < sheets.length; i++){
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheets[i]).hideSheet();
  }
  //Program executes dataReclamation and sendEmailWithPDF methods
  dataReclamation();
  sendEmailWithPDF();
  //Shows the sheets that were previously hidden
  for(var i = 0; i < sheets.length; i++){
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheets[i]).showSheet();
  }
}

//Method that gets data from specified column ranges of srcData sheets, stores data in arrays, then pastes the data from the srcData sheets onto the tgtCombine sheet 
//TODO: Add the data to be added from the ONE sheet
function dataReclamation(){
  //Calls the clearCombine method
  clearCombine();
  //Calls to open the necessary spreadsheets
  //Pulls necessary data from specified columsn from usorf sheet and stores it in an array
  var dataArray = [usorf.getRange('H:H'), usorf.getRange('C:C'), usorf.getRange('J:J')];
  //combineArray determines target columns of where data will be stored
  var combineArray = [combine.getRange('C:C'), combine.getRange('E:E'), combine.getRange('D:D')];
  //For-loop that iterates through dataArray and adds its content to the combineArray
  for(var i = 0; i < dataArray.length-1; i++){
    dataArray[i].copyTo((combineArray[i]), {contentsOnly: true});
  }
  //Determine the numericl value of the last row that is filled with data
  var lr = usorf.getLastRow();
  //Calls the updateTerminal method
  updateTerminal(lr);
}

//Clear Combine sheet of its current data and update it with new data
function clearCombine(){
  //Determine the range that will be cleared of data
  const clearRange = combine.getRange(2, 1, combine.getLastRow(), combine.getLastColumn());
  //Code that clears the range previously specified
  clearRange.clearContent();
}

//Function to populate the A and B columsn with the time the program was run, and the "USORF" terminal name
function updateTerminal(lr){
  var date = new Date();
  //Setting Cell A2 to the current time, and cell B2 to "USORF"
  combine.getRange('A2').setValue(updateDate());
  combine.getRange('B2').setValue('USORF');
  //Identify columns with formulas to copy
  var originFormulas = combine.getRange('A2:B2');
  //Identifies range to copy down formulas
  var fillDownRange = combine.getRange(2,1,combine.getLastRow()-1);
  originFormulas.copyTo(fillDownRange);
}

//Method to determine the date the program is being executed on
function updateDate(){
  var d = new Date, dformat = [d.getFullYear(), d.getMonth() + 1, d.getDate()].join('/') + ' ' + [d.getHours(), d.getMinutes()].join(':');
  //Returns date formatted in way specified in dformat
  return dformat;
}

//Method that takes the pivot sheet and stores it on a master sheet
//THIS METHOD CURRENTLY DOES NOT FUNCTION AS IT HAS NO SOURCE SHEET TO SEND TO
function terminalInformation(){
  var terminalData = pivot.getRange(2, 1, pivot.getLastRow(), pivot.getLastColumn());
  //TODO: Add target master sheet for pivot data to be added to
}

/*
Method takes in a URL and converts that URL into whatever is specified in the URL
In this case, the spreadsheet the URL points to is being converted into a PDF and being rotated so that it in landscape mode
*/
function getFileAsBlob(exportUrl){
  //URL fetch app acquires the url as specified by user in the sendEmailWithPDF method and converts it into a PDF
  let response = UrlFetchApp.fetch(exportUrl, {
    muteHttpExceptions: true,
    headers: {
      Authorization: 'Bearer ' + ScriptApp.getOAuthToken(),
    },
  });
  //Gets the metadata from the response variable and returns it
  return response.getBlob();
}

//Method to send email with accompanying parameters as specified by user
function sendEmailWithPDF() {
  //Information at the back end of the URL adjusts the output of the metadata to be a PDF and for the file to be saved in landscape mode
  let blob = getFileAsBlob("https://docs.google.com/spreadsheets/d/18PKbo2JD2uA8AdbGMLnKHQxKfcDCnFfSJNTwU1uuZbc/export?format=pdf&portrait=false&gridlines=false");
    //The message body of the email to be sent
    var message = {
    to: "lofton.gentry@one-line.com",
    subject: "ENTER SUBJECT OF EMAIL " + updateDate(),
    body: "ENTER BODY OF EMAIL",
    //cc:
    //bcc:
    //replyTo:
    //name:
    //Sets the name of the blob to whatever user specifies
    attachments: [blob.setName("Test PDF")]
  }
  //Execution that causes mail to be sent out
  MailApp.sendEmail(message);
}

/*
Method to create triggers that causes the sendEmailWithPDF method to trigger on weekdays at specified time
This method allows for greater customization than creating the triggers in the G-Script GUI
NON-FUNCTIONING METHOD. KEPT HERE FOR POTENTIAL FUTURE USAGE
*/
function timeTrigger(){
  //2D Array of weekdays
  var days = [ScriptApp.WeekDay.MONDAY, ScriptApp.WeekDay.TUESDAY, ScriptApp.WeekDay.WEDNESDAY, ScriptApp.WeekDay.THURSDAY, ScriptApp.WeekDay.FRIDAY];
  //For loop that will iterate through days array and cause "sendEmail" method to execute at 11 AM
  for(var i; i < days.length; i++){
    ScriptApp.newTrigger(sendEmail).timeBased().onWeekDay(days[i]).atHour("ENTER TIME EMAIL WILL BE SENT").create();
  }
}
