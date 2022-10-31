//Declaring constants
const ss = SpreadsheetApp.getActiveSpreadsheet();
//Array of all the sheets that need to be hidden and shown depending on the day
const sheetNames = ['Summary','Comments','Volume','NM - POD Rail Dwell','NM - Deramping Delays','NM - IMP Dwell for Pick-Up','Data - Summary Dwell','NM - Truck Supply',
'Port Dwell Pivot','Port Dwell Quantity','Loc Code / Name','REVISED Update procedure'];
//Coversheet Spreadsheet
const scs = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Cover Sheet')

//Executes the methods that should be performed on Fridays
function mainFriday(){
  clearSnapshot();
  fridayShowTabs();
  averageToPivot();
}

//Executes the methods that should be performed on Monday
function mainMonday(){
  mondayHideTabs();
  averageToPivot();
}

//Hides all of the sheets that should be hidden on Monday
function mondayHideTabs() {
  for(var i = 0; i < sheetNames.length-1; i++){
    ss.getSheetByName(sheetNames[i]).hideSheet();
  }
}

//Shows all the sheets that should be shown on Friday
function fridayShowTabs(){
  for(var i = 0; i < sheetNames.length-1; i++){
    ss.getSheetByName(sheetNames[i]).showSheet();
  }
}

//Clears out the range of cells where comments are put on the snapshot tab
function clearSnapshot(){
  var sheet = ss.getSheetByName('Snapshot')
  sheet.getRange(4, 8, sheet.getLastRow()).clearContent();
}

//Takes the data calculated from the 'Average' sheet on a different spreadsheet, and pastes it into the 'Port Dwell Pivot' sheet, which contains the running average of previous weeks
function averageToPivot(){
  var sheet = ss.getSheetByName('Port Dwell Pivot');
  sheet.getRange(2,10,sheet.getLastRow()).clearContent();
  var ssa = SpreadsheetApp.openById('13EZgjTC5-NBiWmjMnhNw8D8LgER_vkWiil3azGgFEzc').getSheetByName('Average');
  var dataRange = ssa.getRange(2, 1, ssa.getLastRow(), ssa.getLastColumn()).getValues();
  sheet.getRange(sheet.getLastRow() + 1, 1, dataRange.length, 9).setValues(dataRange);
  sheet.getRange('J2').setFormula('=IF(I2>$L$1,"Y","N")').copyTo(sheet.getRange(2,10,sheet.getLastRow()-1));
}

//Copies sheet 'Week ##' from a seperate spreadsheet, deletes the 'Rail Pause' sheet, and then renames the newly copied sheet to 'Rail Pause'
function railPauseUpdate(){
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const activeSheet = SpreadsheetApp.getActive();
  //activeSheet.deleteSheet(activeSheet.getSheetByName('Rail Pause'));
  var weekNum = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Constants for Automation').getRange('A1').getValue();
  var sourceSheet = SpreadsheetApp.openById('1GCRfa_l_k9zobudVOXO4g3v-1PZldlXrj0CjSxt0ub8').getSheetByName('WEEK ' + weekNum);
  sourceSheet.copyTo(SpreadsheetApp.openById('1gn76WGHneEhizjhV1ackFG2q90hn0haney4nemuDzTk')).setName('Rail Pause').setTabColor('#ff9900')
  ss.setActiveSheet(ss.getSheets()[23]);
  ss.moveActiveSheet(5);
}
