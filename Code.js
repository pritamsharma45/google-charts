function doGet() {
  Merge();
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(MERGED_SHEETNAME);
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

function Merge() {
  var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
  var excluded_sheetNames = [...EXCLUDED_SHEETS, MERGED_SHEETNAME];

  var sheetNames = sheets
    .map(function (sheet) {
      return sheet.getName();
    })
    .filter(function (name) {
      return excluded_sheetNames.indexOf(name) === -1;
    });
  mergeDataInSheets_(sheetNames, true);// Set resrialization to false in case your sheet does not contain ID column.
}

