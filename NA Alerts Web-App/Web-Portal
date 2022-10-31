/*
TODO: Add user input for email that will be sent out with data they entered when they press save
TODO: User selects terminal, and then actual address is what is saved and displayed on network map
TODO: User determines when to close alert by selecting it on HTML table
*/

//TODO: Adding comments explaining method
function doGet(e){
  let template = HtmlService.createTemplateFromFile('Index')
  template.data = getData()
  return template.evaluate()
}

//TODO: Adding comments explaining method
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

//Takes the columns from the 'Locations' google sheet and turns each column into an array
function getData(){
  let codeData = locations.getDataRange().getDisplayValues();
  codeData.toObject();
  let portLoc = Array.from(new Set(codeData.map(el => el.PORT_LCC)));
  let railLoc = Array.from(new Set(codeData.map(el => el.RAIL_LCC)));
  let weatherLoc = Array.from(new Set(codeData.map(el => el.WEATHER_LCC)))
  let out = {
    portOpLoc: portLoc,
    railOpLoc: railLoc,
    weatherLoc: weatherLoc
  }
  return JSON.stringify(out);
}

//TODO: Add comments explaining method
function saveAlerts(data){
  let sheetData = alerts.getDataRange().getDisplayValues()
  let keys = sheetData[0]
  data.forEach(el => {
    let temp = []
    keys.forEach(key => {
      temp.push(el[key])
    })
    alerts.appendRow(temp)
  })
}

//Gets all of the alerts on the 'Alerts' sheet and turns them into a 2D-array
function getAlerts(){
  let data = alerts.getDataRange().getDisplayValues()
  data.toObject()
  return data
}

//Gets all of the alerts on the 'Alerts' sheet and turns them into a 2D-array
function getOldAlerts(){
  let data = oldAlerts.getDataRange().getDisplayValues()
  data.toObject()
  return data
}

//Transfers over all of the alerts from the 'Alerts' sheet to the 'Old Alerts' sheet for historical data purposes. (Is executed by a trigger).
function alertTransfer(){
  var alertRange = alerts.getRange(2,1,alerts.getLastRow()-1,alerts.getLastColumn())
  var oldAlertRange = oldAlerts.getRange(oldAlerts.getLastRow()+1,1,alerts.getLastRow()-1,6)
  alertRange.copyTo(oldAlertRange)
  alertRange.clearContent()
}

//TODO: Adding comments explaining method
Array.prototype.toObject = function(){
  var keys = this.shift();
  for(var i = 0; i < this.length; i++){
    var temp = {};
    for(var j = 0; j < keys.length; j++){
      temp[keys[j]] = this[i][j];
    }
    this[i] = temp;
  }
}

