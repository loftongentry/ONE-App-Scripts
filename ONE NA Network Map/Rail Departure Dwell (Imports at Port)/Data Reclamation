/*
Author: Lofton Gentry (lofton.gentry@one-line.com)
Program Created: 9/14/2022
Program Completed: 9/26/2022
Version: 1.1.0
Description: This program's puprose is to gather data from an imported spreadsheet, convert that data into something useable by the NA Network Map, and then organizing it by examining the number of times the words green, yellow, and red appear, and then populating a column appropriately based on those results. This is done for the purpose of ordering the layers by green, yellow, then red on the 'Rail Departure Dwell' layer on the ONE Network Map. 
*/

//Establishing constants that will be used in multiple methods
const ssf = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Format');
const ssc = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Convert');
const ssa = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Average');  
const ssp = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Paste');
const ssm = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Map');
const ssFD = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Final Data');
const data = ssc.getRange(2, 2, ssc.getLastRow()-1, 8).getValues();
 

//Main function where all methods are called
function mainData(){
  dataTransfer();
  copyFormulasFormat();
  convertToAverage();
  averageToAverage2();
  convertToPaste();
  pasteToMap();
  mapToFinalData();
  finalCleanUp();
  mainLayers();
}

//Method where only the average is calculated and then pasted to the running averages tab ('Average 2')
function averageOnly(){
  dataTransfer();
  copyFormulasFormat();
  convertToAverage();
  averageToAverage2();
}

//Copies and pastes data from one sheet to another but only as values
function dataTransfer() {
  //Source spreadsheet
  const ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('SCC Pivot');
  //Destination spreadsheet
  const ds = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Scc Pivot 2');
  //Clears all previous content from destination sheet so new data can be pasted in
  ds.clearContents();
  //Data ranges that will be used with both sheets
  var dataRange = ['A:C','F:H','K:M','P:V'];
  //For loop that copies the data values from the source sheet and pastes it into the destination sheet
  for(var i = 0; i < dataRange.length; i++){
    ds.getRange(dataRange[i]).setValues(ss.getRange(dataRange[i]).getValues());
  }
}

//Clears data from the columns U to X in the format sheet and pastes new data into it up to the last row (Imported data from spreadsheet can vary in number of rows it possesses)
function copyFormulasFormat(){
  //Clears out current content on the sheet besides the headers
  ssf.getRange(21,24,ssf.getLastRow()-1).clearContent();
  //Arrays containing the location in the spreadsheet where the formulas will go, as well as the formulas themselves
  var dataRange = ['U3', 'V3', 'W3', 'X3'];
  var formula = ['=IF(C3<>"","Y","N")', '=IF(U3="Y",V2+1,V2)','=U3&V3','=if(isblank(C3),0,C3)'];
  //For loop that pastes the formula in its respective data range
  for(var i = 0; i < dataRange.length; i++){
    ssf.getRange(dataRange[i]).setFormula(formula[i]);
  }
  //Copies the formulas all the way down to the bottom row
  ssf.getRange('U3:X3').copyTo(ssf.getRange(3, 21, ssf.getLastRow()-1));
  //Deletes the excess row on the bottom of the data range
  ssf.deleteRows(ssf.getLastRow());
}

//Transfers over the data from the 'Convert' tab to the 'Average' tab, and adds the date
function convertToAverage(){
  ssa.getRange(2,1, ssa.getLastRow(), ssa.getLastColumn()).clearContent();
  //Fills the specified range with the values from the data array
  ssa.getRange(ssa.getLastRow()+1,1, data.length,8).setValues(data)
  //Sets the range 'I2' with the value returned from the updateDate() method
  ssa.getRange('I2').setValue(updateDate());  
  //Copies the value in I2 and the formula in J2 and drags it all the way down to the last row with values
  ssa.getRange('I2').copyTo(ssa.getRange(2,9,ssa.getLastRow()-1));
}

//Copies the calculated average and pastes it to the average 2 tab
function averageToAverage2(){
  //Destination spreadsheet
  ds = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Average2');
  //Gets the data values from the average tab
  var dataRange = ssa.getRange(2,1, ds.getLastRow(), ds.getLastColumn()).getValues();
  //
  ds.getRange(ds.getLastRow() + 1,1, dataRange.length, 12).setValues(dataRange);
  ds.getRange('J2').setFormula('=IF(I2>$L$1,"Y","N")').copyTo(ds.getRange(2,10,ds.getLastRow()-1));
}

function convertToPaste(){ 
  //Clears out current content on the sheet besides the headers
  ssp.getRange(2, 1, ssp.getLastRow(), 19).clearContent();
  //Arrays containing the location in the spreadsheet where the formulas will go, as well as the formulas themselves
  var dataRange = ['J2','K2','L2','M2','N2','O2','P2','Q2','R2','S2']
  var formula = ['=VLOOKUP(LEFT(A2,5),Ref!I:J,2,FALSE)',
  "=iferror(VLOOKUP(J2,'SCC Pivot 2'!A:B,2,FALSE),N2)", 
  '=VLOOKUP(J2,Ref!A:C,3,FALSE)', 
  '=VLOOKUP(A2,Ref!M:O,2,FALSE)', 
  '=ROUND(VLOOKUP(A2&" Total",\'SCC Pivot\'!F:H,3,FALSE),0)', 
  "=VLOOKUP(J2,'SCC Pivot 2'!P:V,7,False)",
  '=IF(AND(H2>2,G2<10),"Green (low volume)",IF(H2<3,"Green",IF(H2<5,"Yellow","Red")))',
  '=M2&" - "&P2&" - Current Delay: "&ROUND(H2,1)&" Days ; Week Average: "&N2&" Days"',
  '=IF(J2<>J3,"Y","N")',
  '=IF(J2<>J1,Q2,Q2 & CHAR(10) & CHAR(10) & S1)'];
  //Fills the specified range with the values from the data array
  ssp.getRange(ssp.getLastRow()+1, 1, data.length, 8).setValues(data);
  //Sets the range 'I2' with the value returned from the updateDate() method
  ssp.getRange('I2').setValue(updateDate());
  //For loop that pastes the formula in its respective data range
  for(var i = 0; i < dataRange.length; i++){
    ssp.getRange(dataRange[i]).setFormula(formula[i]);
  }
  //Copies the formulas from 'I2' to 'S2' and pastes them down until the last row
  ssp.getRange('I2:S2').copyTo(ssp.getRange(2,9,ssp.getLastRow()-1));
}

//Transfers over only specific data that is useful from the 'Paste' sheet to the 'Map' sheet
function pasteToMap(){
  //Clears the content from the current sheet besides the headers
  ssm.getRange(2, 1, ssm.getLastRow(), 6).clearContent();
  //Arrays containing the location in the spreadsheet where the formulas will go, as well as the formulas themselves
  var dataRange = ['B2', 'C2', 'D2', 'E2', 'F2'];
  var formula = ['=IF(Paste!L2="","",Paste!L2)', '=IF(Paste!O2="","",Paste!O2)', '=IF(Paste!K2="","",Paste!K2)', '=IF(Paste!S2="","",Paste!S2)', '=IF(Paste!R2="","",Paste!R2)'];
  //For loop that pastes the formula in its respective data range
  for(var i = 0; i < dataRange.length; i++){
    ssm.getRange(dataRange[i]).setFormula(formula[i]);
  }
  //Copies the formulas from 'I2' to 'S2' and pastes them down until all of the necessary data is pasted
  ssm.getRange('B2:F2').copyTo(ssm.getRange(2,2,data.length));
  //Copies data from 'Z2' cell on 'Format' sheet and pastes it into every row where there are values
  ssf.getRange('Z2').copyTo(ssm.getRange(2,1,ssm.getLastRow()-1));
}

//Takes the data from the Map sheet, eliminates any unwanted data, and then pastes it to the Final Data sheet
function mapToFinalData(){
  //Goes through each row, starting with the last one
  for(var i = ssm.getLastRow(); i > 0; i--){
    //Checks to see if the value in the 'E' cell is equal to 'N'. If it is, then it deletes that row
    ssm.getRange('F'+ i).getValue() == 'N' ? ssm.deleteRow(i) : null;
  }
  //Clears all the previous content out from the specified range
  ssFD.getRange(2,1,ssFD.getLastRow(), ssFD.getLastColumn()).clearContent();
  //Copies over all of the values from the 'Map' sheet to the 'Final Data' sheet
  ssm.getRange(2,1,ssm.getLastRow(),5).copyValuesToRange(ssFD, 1,5, 2, ssm.getLastRow());
  //Updates update column with today's date
  ssFD.getRange('F2').setValue(updateDate());
  //Copies today's date all the way down until the last row
  ssFD.getRange('F2').copyTo(ssFD.getRange(2,6,ssFD.getLastRow()-1));
}

//Final cleanup of the data sheet that will be used with the NA Network Map
function finalCleanUp(){
  //Gets all of the data currently on the 'Final Data' sheet
  var dataArray = ssFD.getRange(2,1,ssFD.getLastRow(), ssFD.getLastColumn()).getValues();
  //Goes through each row, and if a row has cells that are empty that shouldn't be, they are deleted
  for(var i = dataArray.length; i > 0; i--){
    ssFD.getRange('B' + i).getValue() == "" ? ssFD.deleteRow(i) : null;
  }
}

//Determine the date function
function updateDate(){
  var d = new Date, dformat = [d.getMonth() + 1, d.getDate(), d.getFullYear()].join('/');
  return dformat;
}
