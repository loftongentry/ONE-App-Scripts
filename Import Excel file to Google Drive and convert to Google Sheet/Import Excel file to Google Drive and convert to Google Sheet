/*
Author: Lofton Gentry (lofton.gentry@one-line.com)
Program Created: 8/8/2022
Program Completed: 8/8/2022 (ARCHIVED)
Version: 1.0.1
Description: This program's puprose was to create a menu option onto the google spreadsheet GUI to import a non-legacy excel file and have it converted to a 
google sheet that would be used for data analysis purposes. Ocean Network Express decided to move in a different direction than from this program, so it has 
now been archived, but it is fully functioning.
*/

//When pressing the option in the google sheet next to the "Help" button, opens up a drop down bar with that allows user to execute program
function onOpen() {
  SpreadsheetApp.getUi().createMenu("Import Excel file").addItem("Import Excel file from Drive", "main").addToUi();
}

//Main function where everything is executed
function main() {
  //Prompts user for user input of the file name (MUST INCLUDE '.xlsx' in file name)
  let fileName = promptUser("Enter Excel file name to import (must include '.xlsx' in file name):");
  //If statement to check if there is user input for the file name. Toast notification executed if there is no file name entered
  if(fileName === null) {
    toast("Please enter a valid filename.");
    return;
  }
  //If statement to check if there is user input for the sheet selected. Toast notification executed if there is no sheet name entered
  let sheetName = promptUser(`Enter the name of the sheet in ${fileName} to import:`);
  if(sheetName === null) {
    toast("Please enter a valid sheet.");
    return;
  }
  toast(`Importing ${sheetName} from ${fileName} ...`);
  //Calls the convertExcelToGoogleSheets method with fileName as the variable
  let spreadsheetId = convertExcelToGoogleSheets(fileName);
  //Calls the importDataFromSpreadsheet method with spreadsheetId and sheetName as variables
  let importedSheetName = importDataFromSpreadsheet(spreadsheetId, sheetName);
  //toast notification letting user know that data has been imported from specified sheet from specified file
  toast(`Successfully imported data from ${sheetName} in ${fileName} to ${importedSheetName}`);
}

function toast(message) {
  SpreadsheetApp.getActive().toast(message);
}

//Creates the actual ui on the google sheet for the user to interact with
function promptUser(message) {
  let ui = SpreadsheetApp.getUi();
  let response = ui.prompt(message);
  if(response != null && response.getSelectedButton() === ui.Button.OK) {
    return response.getResponseText();
  } else {
    return null;
  }
}

//Method to convert excel file to google sheet
function convertExcelToGoogleSheets(fileName) {
  //Allows user to get files from the Drive app based on their name
  let files = DriveApp.getFilesByName(fileName);
  //Declare excelFile variable
  let excelFile = null;
  //If statement check to see if file has information stored on it
  if(files.hasNext())
    excelFile = files.next();
  else
    return null;
  //Sets variable blob to excelFile after excelFile has retrieved raw data
  let blob = excelFile.getBlob();
  //Sets the default configurations for the google sheets file
  let config = {
    //Title of the google sheet when it is created
    title: "[Google Sheets] " + excelFile.getName(),
    //Parent type of the file created is the ID of the excel file
    parents: [{id: excelFile.getParents().next().getId()}],
    //Set the MIME type of the new file to be created to be a google sheets
    mimeType: MimeType.GOOGLE_SHEETS
  };
  //Sets variable spreadsheet to blob with the new default configurations
  let spreadsheet = Drive.Files.insert(config, blob);
  //Returns spreadsheet's file ID
  return spreadsheet.id;
}

//Import data from a sheet in the converted spreadsheet that the user specified to master spreadsheet 
function importDataFromSpreadsheet(spreadsheetId, sheetName) {
  let spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  let currentSpreadsheet = SpreadsheetApp.getActive();
  let newSheet = currentSpreadsheet.insertSheet();
  let dataToImport = spreadsheet.getSheetByName(sheetName).getDataRange();
  let range = newSheet.getRange(1,1,dataToImport.getNumRows(), dataToImport.getNumColumns());
  range.setValues(dataToImport.getValues());
  return newSheet.getName();
}
