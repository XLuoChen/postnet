'use strict';

function checkBarcode(barcode) {
  const barcodeArray = barcode.split('');
  const bar = '|';
  const codesLength = (barcodeArray.length - bar.length * 2) / 5;

  return (barcode[0] === bar && barcodeArray[barcodeArray.length - 1] === bar
  && (codesLength === 6 || codesLength === 10));
}

function getCodeWithoutBar(bar, barcode) {
  if (bar === '|') {
    return barcode.substring(1, barcode.length - 1);
  }
}

function getBarcodes(barcode) {
  const barcodes = [];
  let start = 0;

  const code = getCodeWithoutBar('|', barcode);

  while (start < barcode.length - 5) {

    barcodes.push(code.substring(start, start + 5));

    start += 5;
  }

  return barcodes;
}

function getDigits(barcodes, weight) {
  return barcodes.map(barcode => {
    const columns = barcode.split('');
    let i = 0;
    let sum = 0;
    const codeArray = columns.map(column => column === '|' ? 1 : 0);

    for (const element of codeArray) {
      sum += element * weight[i++];
    }
    return (sum === 11) ? 0 : sum;
  })
}

function loadWeight() {
  return [7, 4, 2, 1, 0];
}

function checkDigits(digits) {
  const sum = digits.reduce((prev, curr) => prev + curr);

  return (sum % 10 === 0);
}

function convertPostcode(digits) {
  const digitsString = digits.join('');

  const partOne = digitsString.substring(0, 5);
  const partTwo = digitsString.substring(5, digitsString.length);
  
  return (digitsString.length > 5) ? `${partOne}-${partTwo}` : `${partOne}`;
}

module.exports = {
  checkBarcode,
  getBarcodes,
  getDigits,
  loadWeight,
  checkDigits,
  convertPostcode
};
