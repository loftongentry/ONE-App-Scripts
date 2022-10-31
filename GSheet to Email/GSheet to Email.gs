/*
Author: Lofton Gentry (lofton.gentry@one-line.com)
Program Created: 8/9/2022
Program Completed: ARCHIVED
Version: 1.0.1
Description: This program's purpose was to pull data from a specified sheet(in this case 'Test Data Sheet') from a spreadsheet (in this case 'Test GSheet to Email') 
and then have that data be stored as an attatchment that would be sent to emails that were stored on a seperate sheet (in this case 'Test Email Sheet'). 
Ocean Network Express decided to move in a different direction than from this program, so it has now been archived.
*/

//Creating global constants to avoid cluttering the code
const ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Test Email Sheet");
const vs = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Test Data Sheet")

//Sends email for every email in a google sheet, as well as with accompanying information
function sendEmail() {
  //Creates and 2D array with all values on sheet as values in the array
  var valuesToCopy = ss.getRange(2, 1, ss.getLastRow()-1, ss.getLastColumn()).getValues();
  //Sets each row as an array that will be accessed
  valuesToCopy.forEach(r => {
    MailApp.sendEmail(r[0],r[1],r[2])
  });
}

//Pulls data from the specified spreadsheet
function copyData() {
  var valuesToCopy = ss.getRange(1, 1, ss.getLastRow(), 1).getValues();
  ss.getRange(2, 4).setValues(valuesToCopy);
}


/*
Create time trigger for program to execute and send email at specified time intervals
Currently will cause sendEmail function to execute every weekday at 10AM 
*/
function timeTrigger() { 
  ScriptApp.newTrigger("sendEmail").timeBased().onWeekDay(ScriptApp.WeekDay.MONDAY).atHour(10).create();
  ScriptApp.newTrigger("sendEmail").timeBased().onWeekDay(ScriptApp.WeekDay.TUESDAY).atHour(10).create();
  ScriptApp.newTrigger("sendEmail").timeBased().onWeekDay(ScriptApp.WeekDay.WEDNESDAY).atHour(10).create();
  ScriptApp.newTrigger("sendEmail").timeBased().onWeekDay(ScriptApp.WeekDay.THURSDAY).atHour(10).create();
  ScriptApp.newTrigger("sendEmail").timeBased().onWeekDay(ScriptApp.WeekDay.FRIDAY).atHour(10).create();
}
