function onOpen(e) {
  SpreadsheetApp.getUi().createMenu('Update Vessel Count')
  .addItem('Update Vessel Count West Coast', 'createMenuWC')
  .addItem('Update Vessel Count East Coast', 'createMenuEC')
  .addToUi();
}

function createMenuWC(){
  SpreadsheetApp.getUi().showModalDialog(HtmlService.createHtmlOutputFromFile('Vessel Count WC').setWidth(375).setHeight(200), 'Enter Number of Vessels Waiting')
}

function createMenuEC(){
  SpreadsheetApp.getUi().showModalDialog(HtmlService.createHtmlOutputFromFile('Vessel Count EC').setWidth(375).setHeight(200), 'Enter Number of Vessels Waiting')
}

function setVesselCountsWC(data){
  let keys = scs.getRange(6,1,6,1).getDisplayValues()
  let rows =[]
  for(var i = 0; i < keys.length; i++){
    rows.push([data[keys[i][0]] + " Vessels"])
  }
  scs.getRange(6,3,6,1).setValues(rows)
}

function setVesselCountsEC(data){
  let keys = scs.getRange(12,1,6,1).getDisplayValues()
  let rows =[]
  for(var i = 0; i < keys.length; i++){
    rows.push([data[keys[i][0]] + " Vessels"])
  }
  scs.getRange(12,3,6,1).setValues(rows)
}
