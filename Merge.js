const EXCLUDED_SHEETS = ["Summary", "Dashboard","Sales"];
const MERGED_SHEETNAME = "Merged";


function mergeDataInSheets_(sheetNames, reserialize = false) {
  var data = [];
  var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();

  if (sheetNames.length === 0) {
    throw new Error("No sheets to merge.");
  }

  for (var i = 0; i < sheetNames.length; i++) {
    var sheet = sheets.filter(function (sheet) {
      return sheet.getName() === sheetNames[i];
    })[0];
    if (!sheet) {
      throw new Error("No sheet with name " + sheetNames[i]);
    }
    var sheetData = sheet.getDataRange().getValues();

    if (i > 0) {
      sheetData.shift();
    }
    data = data.concat(sheetData);
  }
  Logger.log(data);
  var outputSheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName(MERGED_SHEETNAME);
  if (!outputSheet) {
    outputSheet =
      SpreadsheetApp.getActiveSpreadsheet().insertSheet(MERGED_SHEETNAME);
  }
  outputSheet.clearContents();
  outputSheet.getRange(1, 1, data.length, data[0].length).setValues(data);
  // Cooment out if you don't want to add new serial numbers
  if (reserialize) {
    var serialNumber = 1;
    var range = outputSheet.getRange("A2:A");
    for (var i = 0; i < data.length - 1; i++) {
      range.getCell(i + 1, 1).setValue(serialNumber++);
    }
  }

  return data;
}

function TestMerge1() {
  var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
  var excluded_sheetNames = [...EXCLUDED_SHEETS, MERGED_SHEETNAME];

  var sheetNames = sheets
    .map(function (sheet) {
      return sheet.getName();
    })
    .filter(function (name) {
      return excluded_sheetNames.indexOf(name) === -1;
    });
  mergeDataInSheets_(sheetNames, false);
}

// Another way of doing the same thing. You can use this if you want to merge specific sheets.
function TestMerge2() {
  mergeDataInSheets_(["Sheet1", "Sheet2"], false);
}