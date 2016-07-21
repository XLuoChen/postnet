'use strict';

describe('convert postcode to barcode', () => {

  let postcode;

  const postcodeToBarcode = require('../main/postcode-to-barcode');

  describe('checkPostcode', () => {

    it('when postcode is correct return true', () => {
      postcode = '95713';

      const isCorrect = postcodeToBarcode.checkPostcode(postcode);

      expect(isCorrect).toBe(true);
    });
    it('when postcode is correct return true', () => {
      postcode = '95713-1234';

      const isCorrect = postcodeToBarcode.checkPostcode(postcode);

      expect(isCorrect).toBe(true);
    });
    it('when postcode is wrong return false', () => {
      postcode = '9571';

      const isCorrect = postcodeToBarcode.checkPostcode(postcode);

      expect(isCorrect).toBe(false);
    });
    it('when postcode is wrong return false', () => {
      postcode = '95715-84757';

      const isCorrect = postcodeToBarcode.checkPostcode(postcode);

      expect(isCorrect).toBe(false);
    });
  });

  describe('getPostcodes', () => {
    let postcode;

    it('length more than 5', ()=> {
      postcode = '98732-1234';
      const postcodes = postcodeToBarcode.getPostcodes(postcode);

      expect(postcodes).toEqual([9, 8, 7, 3, 2, 1, 2, 3, 4]);
    });
    it('length equal 5', ()=> {
      postcode = '98732';
      const postcodes = postcodeToBarcode.getPostcodes(postcode);

      expect(postcodes).toEqual([9, 8, 7, 3, 2]);
    });
  });

  it('appendCheckCode', () => {
    const postcodes = [9, 8, 7, 3, 2];
    const appendedPostcodes = postcodeToBarcode.appendCheckCode(postcodes);

    expect(appendedPostcodes).toEqual([9, 8, 7, 3, 2, 1]);
  });

  it('should convert barcode', () => {
    const appendedPostCode = [9, 5, 7, 1, 3, 5];
    const allBarcodes = postcodeToBarcode.loadAllBarcodes();
    const barcode = postcodeToBarcode.convertBarcode(appendedPostCode, allBarcodes);

    expect(barcode).toEqual('||:|:::|:|:|:::|:::||::||::|:|:|');
  });
});
