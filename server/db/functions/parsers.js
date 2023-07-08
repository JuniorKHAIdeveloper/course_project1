const xlsx = require("xlsx");

function parseCsv(buffer) {
  const csvData = buffer.toString("utf-8");
  const csvRecords = csvData.split("\n").map((row) => row.trim());
  const headerRow = csvRecords.shift(); // Remove and store the header row

  const headers = headerRow.split(";");
  const result = csvRecords.map((record) => {
    const values = record.split(";");
    const obj = {};

    headers.forEach((header, index) => {
      const value = values[index];
      if (header === "__v") {
        obj[header] = 0;
      }
      if (value !== undefined && header !== "__v") {
        obj[header] = value;
      }
    });

    return obj;
  });
  result.pop();

  return result;
}

function parseXls(buffer) {
  const workbook = xlsx.read(buffer, { type: "buffer" });
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const jsonData = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

  const headers = jsonData[0];
  const data = jsonData.slice(1);

  const result = data.map((row) => {
    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = row[index];
    });

    return obj;
  });

  return result;
}

module.exports = {
  parseCsv,
  parseXls,
};
