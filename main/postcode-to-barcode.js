'use strict';

function checkPostcode(postcode) {

  return (/\d\d\d\d\d/g.test(postcode) || /\d\d\d\d\d\-\d\d\d\d/g.test(postcode))
    && (postcode.length === 10 || postcode.length === 5 || postcode.length === 9);
}

function getPostcodes(postcode) {

  const postcodeArray = postcode.split('-');

  return ((postcodeArray.length > 1) ?
    postcodeArray[0].split('').concat(postcodeArray[1].split(''))
    : postcodeArray[0].split('')).map(code => parseInt(code));
}

function appendCheckCode(postcodes) {
  let sum = 0;
  for (const postcode of postcodes) {
    sum += postcode;
  }
  postcodes.push(10 - sum % 10);

  return postcodes;
}

function convertBarcode(appendedPostCodes, allBarcodes) {

  const barcode = appendedPostCodes.map(appendedPostCode => {
    return (allBarcodes.find(barcode => barcode.value === appendedPostCode)).barcode;
  }).join('');

  return `|${barcode}|`;
}

function loadAllBarcodes() {
  return [
    {value: 1, barcode: ':::||'},
    {value: 2, barcode: '::|:|'},
    {value: 3, barcode: '::||:'},
    {value: 4, barcode: ':|::|'},
    {value: 5, barcode: ':|:|:'},
    {value: 6, barcode: ':||::'},
    {value: 7, barcode: '|:::|'},
    {value: 8, barcode: '|::|:'},
    {value: 9, barcode: '|:|::'},
    {value: 0, barcode: '||:::'}
  ]
}

module.exports = {
  checkPostcode: checkPostcode,
  getPostcodes: getPostcodes,
  appendCheckCode: appendCheckCode,
  convertBarcode: convertBarcode,
  loadAllBarcodes: loadAllBarcodes
};
