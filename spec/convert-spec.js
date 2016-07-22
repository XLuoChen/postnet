'use strict';

const toPostcode = require('../main/barcode-to-postcode');

const toBarcode = require('../main/postcode-to-barcode');

describe('convert barcode to postcode', () => {


  describe('checkBarcode', ()=> {
    let barcode;

    it('should return false when input valid barcode', () => {
      barcode = ':|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::';

      const isCorrect = toPostcode.checkBarcode(barcode);

      expect(isCorrect).toBe(false);
    });

    it('should return false when input valid barcode', () => {
      barcode = ':|::|:|::|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::';

      const isCorrect = toPostcode.checkBarcode(barcode);

      expect(isCorrect).toBe(false);
    });

    it('should return true when input correct barcode', () => {
      barcode = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';

      const isCorrect = toPostcode.checkBarcode(barcode);

      expect(isCorrect).toBe(true);
    });
  });
  it('should get barcodes', () => {
    const barcode = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
    const barcodes = toPostcode.getBarcodes(barcode);

    expect(barcodes).toEqual([':|::|', ':|:|:', '||:::', ':|:|:', ':||::', ':::||', '::|:|', '::||:', ':|::|', '||:::']);
  });

  it('should get digits', () => {
    const barcodes = [':|::|', ':|:|:', '||:::'];
    const weight = toPostcode.loadWeights();
    const digits = toPostcode.getDigits(barcodes, weight);

    expect(digits).toEqual([4, 5, 0]);
  });

  describe('checkCodes', () => {
    let digits;

    it('should return true when check success', () => {
      digits = [9, 5, 7, 1, 3, 5];
      const isCorrect = toPostcode.checkDigits(digits);

      expect(isCorrect).toEqual(true);
    });

    it('should return false when check failed', () => {
      digits = [9, 5, 7, 1, 3, 4];
      const isCorrect = toPostcode.checkDigits(digits);

      expect(isCorrect).toEqual(false);
    });
  });

  describe('convert postcode', () => {
    let digits;

    it("should add '-' if length of digits more than 5 ", () => {
      digits = [4, 5, 0, 5, 6, 1, 2, 3, 4, 6];
      const postcode = toPostcode.convertPostcode(digits);

      expect(postcode).toEqual('45056-1234');
    });

    it("should convert if length of digits  equal 5", () => {
      digits = [4, 5, 1, 5, 6, 4];
      const postcode = toPostcode.convertPostcode(digits);

      expect(postcode).toEqual('45156');
    });
  });
});

describe('convert postcode to barcode', () => {

  let postcode;

  describe('checkPostcode', () => {

    it('should return true when postcode is correct', () => {
      postcode = '95713';

      const isCorrect = toBarcode.checkPostcode(postcode);

      expect(isCorrect).toBe(true);
    });
    it('should return true when postcode is correct', () => {
      postcode = '95713-1234';

      const isCorrect = toBarcode.checkPostcode(postcode);

      expect(isCorrect).toBe(true);
    });
    it('should return false when postcode is wrong', () => {
      postcode = '9571';

      const isCorrect = toBarcode.checkPostcode(postcode);

      expect(isCorrect).toBe(false);
    });
    it('should return false when postcode is wrong', () => {
      postcode = '95715-84757';

      const isCorrect = toBarcode.checkPostcode(postcode);

      expect(isCorrect).toBe(false);
    });
  });

  describe('getPostcodes', () => {
    let postcode;

    it('should return postcode if length more than 5', ()=> {
      postcode = '98732-1234';
      const postcodes = toBarcode.getPostcodes(postcode);

      expect(postcodes).toEqual([9, 8, 7, 3, 2, 1, 2, 3, 4]);
    });
    it('should return postcode if length equal 5', ()=> {
      postcode = '98732';
      const postcodes = toBarcode.getPostcodes(postcode);

      expect(postcodes).toEqual([9, 8, 7, 3, 2]);
    });
  });

  it('appendCheckCode', () => {
    const postcodes = [9, 8, 7, 3, 2];
    const appendedPostcodes = toBarcode.appendCheckCode(postcodes);

    expect(appendedPostcodes).toEqual([9, 8, 7, 3, 2, 1]);
  });

  it('should convert barcode', () => {
    const appendedPostCode = [9, 5, 7, 1, 3, 5];
    const allBarcodes = toBarcode.loadAllBarcodes();
    const barcode = toBarcode.convertBarcode(appendedPostCode, allBarcodes);

    expect(barcode).toEqual('||:|:::|:|:|:::|:::||::||::|:|:|');
  });
});

