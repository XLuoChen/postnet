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

  const codes = getCodeWithoutBar('|', barcode);

  for (let start = 0; start < barcode.length - 5; start += 5) {
    barcodes.push(codes.substring(start, start + 5));
  }

  return barcodes;
}

function getDigits(barcodes, weights) {
  return barcodes.map(barcode => {

    const sum = barcode
      .split('')
      .map(line => line === '|' ? 1 : 0)
      .reduce((prev, curr, index) => prev + curr * weights[index], 0);

    return (sum === 11) ? 0 : sum;
  });
}

function loadWeights() {
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
  loadWeights,
  checkDigits,
  convertPostcode
};
