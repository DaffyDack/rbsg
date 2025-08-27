const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');


const filePath = path.join(__dirname, '../../public', 'Data.xlsx');
const workbook = XLSX.readFile(filePath);
const sheet = workbook.Sheets[workbook.SheetNames];  
const data = XLSX.utils.sheet_to_json(sheet);  
console.log(data)
fs.writeFileSync(path.join(__dirname, '../../public', 'data.json'), JSON.stringify(data, null, 2));






