// Define your ORM class
class ORM {
  constructor(sheetName) {
    this.sheet =
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  }

  // Create a new record
  create(data) {
    const id = this.getNextId() || 1;
    data["id"] = id;
    //Get 2 dimensional Array Data from dataset
    const headers = this.sheet
      .getRange(1, 1, 1, this.sheet.getLastColumn())
      .getValues()[0];

    const newRow = [];

    for (const header of headers) {
      newRow.push(data[header] || "");
    }
    this.sheet.appendRow(newRow);
  }

  // Read all records
  readAll() {
    const dataRange = this.sheet.getDataRange();
    const values = dataRange.getValues();
    const headers = values[0];
    const records = [];
    //Returning data from multi-dimensional array
    for (let i = 1; i < values.length; i++) {
      const record = {};
      for (let j = 0; j < headers.length; j++) {
        record[headers[j]] = values[i][j];
      }
      records.push(record);
    }
    return records;
  }

  // Read a specific record by ID
  readById(id) {
    const dataRange = this.sheet.getDataRange();
    const values = dataRange.getValues();
    const headers = values[0];
    for (let i = 1; i < values.length; i++) {
      if (values[i][0] === id) {
        const record = {};
        for (let j = 0; j < headers.length; j++) {
          record[headers[j]] = values[i][j];
        }
        return record;
      }
    }
    return null;
  }

  // Update a record by ID
  updateById(id, data) {
    const dataRange = this.sheet.getDataRange();
    const values = dataRange.getValues();
    const headers = values[0];
    for (let i = 1; i < values.length; i++) {
      if (values[i][0] === id) {
        for (const key in data) {
          const columnIndex = headers.indexOf(key);
          if (columnIndex !== -1) {
            values[i][columnIndex] = data[key];
          }
        }
        dataRange.setValues(values);
        return true;
      }
    }
    return false;
  }

  // Delete a record by ID
  deleteById(id) {
    const dataRange = this.sheet.getDataRange();
    const values = dataRange.getValues();
    for (let i = 1; i < values.length; i++) {
      if (values[i][0] === id) {
        this.sheet.deleteRow(i + 1);
        return true;
      }
    }
    return false;
  }

  // Get the next ID
  getNextId() {
    const dataRange = this.sheet.getDataRange();
    const values = dataRange.getValues();
    let maxId = 0;
    for (let i = 1; i < values.length; i++) {
      const id = values[i][0];
      if (id > maxId) {
        maxId = id;
      }
    }
    return maxId + 1;
  }
}
// ----------Callables Methods ------------
// Create a new record
function createRecord_(sheetName, data) {
  const orm = new ORM(sheetName);
  orm.create(data);
}

// Read all records
function readAllRecords(sheetName) {
  const orm = new ORM(sheetName);
  const allRecords = orm.readAll();
  console.log(allRecords);
}

// Read a specific record by ID
function readRecordById_(sheetName, recordId) {
  const orm = new ORM(sheetName);
  const specificRecord = orm.readById(recordId);
  console.log(specificRecord);
}

// Update a record by ID
function updateRecordById_(sheetName, recordId, data) {
  const orm = new ORM(sheetName);
  const isUpdated = orm.updateById(recordId, data);
  console.log(isUpdated);
}

// Delete a record by ID
function deleteRecordById_(sheetName, recordId) {
  const orm = new ORM(sheetName);
  const isDeleted = orm.deleteById(recordId);
  console.log(isDeleted);
}

//  ---------Test functions----------
function testCreateRecord() {
  createRecord_("sales", {
    name: "Pgysdfsd",
    age: "21",
    email: "dfsd@gmail.com",
  });
}

function testReadAllRecords() {
  readAllRecords("Sales");
}

function testReadRecordById() {
  readRecordById_("Sales", 1);
}

function testUpdateRecordById() {
  updateRecordById_("Sales", 1, {
    ame: "Pgysdfsd",
    age: "21",
    email: "dfsd@gmail.com",
  });
}

function testDeleteRecordById() {
  deleteRecordById_("Sales", 4);
}
