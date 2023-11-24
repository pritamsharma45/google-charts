function doGet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
  var data = sheet.getDataRange().getValues();
  const headers = data[0];
  const jsnData = data.slice(1).map((row) => {
    return row.reduce((acc, curr, index) => {
      acc[headers[index]] = curr;
      return acc;
    }, {});
  });
  var jsonData = JSON.stringify(jsnData);
  return ContentService.createTextOutput(jsonData).setMimeType(
    ContentService.MimeType.JSON
  );
}

// function doGet() {
//   var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
//   var data = sheet.getDataRange().getValues();
//   var jsonData = JSON.stringify(data);

//   return ContentService.createTextOutput(jsonData).setMimeType(
//     ContentService.MimeType.JSON
//   );
// }
