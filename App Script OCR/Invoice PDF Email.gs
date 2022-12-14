/*
Author: Lofton Gentry
Program Created: 9/21/2022
Program Completed: IN-PROGRESS
Version Number: 0.1
Description: Examining PDF documents as they come in through a specific email, comparing all strings in the PDF to specific parameters, and then returning the values that pass those parameters.
FUTURE PLANS: Data is output to google sheet that is stored in a specific folder that is in a shared google drive
*/

//Find the email with that specific subject line
var msgs = GmailApp.getMessagesForThreads(GmailApp.search('subject: "Customer Invoice "', 0, 1));

//Find the email with that specific subject line
var msgs = GmailApp.getMessagesForThreads(GmailApp.search('subject: "Test Email"', 0, 1));

function main(){
  var text = emailPDF();
  var finalResult = filterText(text);
  createSheet(finalResult);
}

//Pulls a PDF from an email and converts it into a readable text file
function emailPDF(){
  //Goes through the email and pulls out the attatchments 
  for(var i = 0; i < msgs.length; i++){
    for(var j = 0; j < msgs[i].length; j++){
      var attatchments = msgs[i][j].getAttachments();
    }
  }
  //Sets variable blob to the blob contents of the second attatchment
  var blob = attatchments[0].copyBlob();
  //Uses Google's built in OCR to read all of the text
  var ocrfile = Drive.Files.insert({title: blob.getName(), mimeType: blob.getContentType()}, blob, {ocr: true, ocrLanguage: "en"});
  //Opens the ocrfile variable by its file ID
  var document = DocumentApp.openById(ocrfile.id);
  //Gets all of the text from the body portion of the google document
  var text = document.getBody().getText();
  //Trashes the document the data was retrieved from, as it's now irrelevant
  DriveApp.getFileById(document.getId()).setTrashed(true);
  //Returns the text pulled from the PDF attatchment
  return text;
}

//Method to filter out any unecessary data we don't want
function filterText(text){
  //Declare a new array where data matching what we want is stored
  var finalResult = new Array();
  //Splits up the read in text file by each new line
  const result = text.split('\n');
  //Takes a value from the array, and comapres it against the each of the values in the containerCodes array
  //for(var i = 0; i < result.length; i++){
  //  for(var j = 0; j < containerCodes.length; j++){
  //    result[i].includes(containerCodes[j]) ? finalResult.push(result[i]) : null;
  //  }
  //}
  //Sanity checker
  //Logger.log(finalResult)
  //Returns the finalResult array, which will be used later
  return result;
}

//Creates a spreadsheet with the email subject as the title
function createSheet(text){
  //Create empty variable where subject will be stored
  var ssName = "";
  //Run through the msgs array. The first overall value in the 2D array is the subject title
  for(var i = 0; i < msgs.length; i++){
    for(var j = 0; j < msgs[i].length; j++){
      ssName = msgs[0][0].getSubject();
    }
  }
  //Creates the spreadsheet with the name of the spreadsheet being the subject of the email it was retrieved from
  var ss = SpreadsheetApp.create(ssName, text.length, 2);
  //Opens 'Sheet1' of the newly created spreadsheet to be edited
  var ssNew = SpreadsheetApp.openByUrl(ss.getUrl()).getSheetByName('Sheet1');
  //Pastes the value of the text array on the row that matches its index
  for(var i = 1; i < text.length; i++){
    ssNew.getRange(i,1).setValue(text[i]);
  }
  return ss;
}
