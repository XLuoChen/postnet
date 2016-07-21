'use strict';

function checkBarcode(barcode) {
  const barcodeArray = barcode.split('');
  return (barcode[0] === '|' && barcodeArray[barcodeArray.length - 1] === '|'
  && ((barcodeArray.length - 2) / 5 === 6 || (barcodeArray.length - 2) / 5 === 10))

    ? true : false;
}

function getBarcodes(barcode) {
  const barcodes = [];
  let start = 1;

  while (start < barcode.length - 1) {

    let substring = barcode.substring(start, start + 5);
    barcodes.push(substring);
    start += 5;
  }
  
  return barcodes;
}

function getDigits(barcodes, weight) {
  return barcodes.map(barcode => {
    const columns = barcode.split('');
    let i = 0;
    let sum = 0;
    columns.map(column => {
      sum += (column === '|' ? 1 : 0) * weight[i++];
      sum = (sum === 11) ? 0 : sum;
    });

    return sum;
  })
}

function loadWeight() {
  return [7, 4, 2, 1, 0];
}

function checkDigits(digits) {
  let sum = 0;

  for (const digit of digits) {
    sum += digit;
  }

  return (sum % 10 === 0) ? true : false;
}

function convertPostcode(digits) {
  const digitsString = digits.join('');

  return (digitsString.length > 5) ?
    `${digitsString.substring(0, 5)}-${digitsString.substring(5, digitsString.length)}`
    : `${digitsString.substring(0, 5)}`;
}

module.exports = {
  checkBarcode: checkBarcode,
  getBarcodes: getBarcodes,
  getDigits: getDigits,
  loadWeight: loadWeight,
  checkDigits: checkDigits,
  convertPostcode: convertPostcode
};
