'use strict';

function checkPostcode(postcode) {

  return (/^\d{5}$/.test(postcode) || /^\d{5}-\d{4}$/.test(postcode));
}

function getPostcodes(postcode) {

  return postcode.replace('-', '')
    .split('')
    .map(code => parseInt(code));
}

function appendCheckCode(postcodes) {

  let sum = postcodes.reduce((prev, curr) => prev + curr);
  postcodes.push(10 - sum % 10);

  return postcodes;
}

function convertBarcode(appendedPostCodes, allBarcodes) {

  const barcode = appendedPostCodes.map(i => allBarcodes[i]).join('');

  return `|${barcode}|`;
}


function loadAllBarcodes() {
  return ['||:::', ':::||', '::|:|', '::||:', ':|::|',
    ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];
}

module.exports = {
  checkPostcode,
  getPostcodes,
  appendCheckCode,
  convertBarcode,
  loadAllBarcodes
};
