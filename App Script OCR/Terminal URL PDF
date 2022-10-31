function mainReclamation(){
  pasteValues(filterText(dataReclamation()));
}

//Pulls PDF from website, runs through OCR, gets all the text from the ocr, and returns it
function dataReclamation() {
  var url = 'http://info.poha.com/vtraffic/bct/BCT%20Vessel%20Schedule.pdf'
  var blob = UrlFetchApp.fetch(url).getBlob();
  var resource = {
    title: blob.getName(),
    mimeType: blob.getContentType(),
  };
  var file = Drive.Files.insert(resource, blob, {ocr: true, ocrLanguage: 'en'});
  var doc = DocumentApp.openById(file.id);
  var text = doc.getBody().getText();
  DriveApp.getFileById(doc.getId()).setTrashed(true);
  return text
}

//Filters the text fun through it and splits it by line
function filterText(text){
  var finalArray = text.split('\n');
  return finalArray;
}

//Pastes all the values into the first column of the 'Data' sheet
function pasteValues(array){
  var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Data');
  ss.getRange(2,1,ss.getLastRow()).clearContent();
  for(var i = 0; i < array.length; i++){
    ss.getRange(1 + i,1).setValue(array[i]);
  }
}
