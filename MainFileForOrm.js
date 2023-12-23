const DATA_ENTRY_SHEET_NAME = "Clients";

var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(
  DATA_ENTRY_SHEET_NAME
);

const doPost = (request = {}) => {
  const { postData: { contents, type } = {} } = request;
  var data = parseFormData(contents);
  const orm = new ORM("Clients");
  orm.create(data);

  return ContentService.createTextOutput(contents).setMimeType(
    ContentService.MimeType.JSON
  );
};

function parseFormData(postData) {
  var data = [];
  var parameters = postData.split("&");
  for (var i = 0; i < parameters.length; i++) {
    var keyValue = parameters[i].split("=");
    data[keyValue[0]] = decodeURIComponent(keyValue[1]);
  }
  return data;
}

//  This file will be used to create a new record in  'DATA_ENTRY_SHEET_NAME' sheet with the payload received from the Webhook. And this uses class and methods  from Orm.js
