'use strict';

function checkPostcode(postcode) {

  return (/^\d{5}$/.test(postcode) || /^\d{5}-\d{4}$/.test(postcode))
    && (postcode.length === 10 || postcode.length === 5 || postcode.length === 9);
}

function getPostcodes(postcode) {

  const postcodeArray = postcode.split('-');

  return ((postcodeArray.length > 1) ?
    postcodeArray[0].split('').concat(postcodeArray[1].split(''))
    : postcodeArray[0].split('')).map(code => parseInt(code));
}

function appendCheckCode(postcodes) {

  let sum = postcodes.reduce((prev,curr) => prev + curr);
  postcodes.push(10 - sum % 10);

  return postcodes;
}

function convertBarcode(appendedPostCodes, allBarcodes) {

  const barcode = appendedPostCodes.map(i => allBarcodes[i]).join('');

  return `|${barcode}|`;
}


function loadAllBarcodes() {
  return ['||:::',':::||', '::|:|', '::||:', ':|::|',
    ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];
}

module.exports = {
  checkPostcode,
  getPostcodes,
  appendCheckCode,
  convertBarcode,
  loadAllBarcodes
};
