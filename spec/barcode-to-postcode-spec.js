'use strict';

describe('convert barcode to postcode', () => {

  const barcodeToPostcode = require('../main/barcode-to-postcode');

  describe('checkBarcode', ()=> {
    let barcode;

    it('when input valid barcode should return false', () => {
      barcode = ':|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::';

      const isCorrect = barcodeToPostcode.checkBarcode(barcode);

      expect(isCorrect).toBe(false);
    });

    it('when input valid barcode should return false', () => {
      barcode = ':|::|:|::|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::';

      const isCorrect = barcodeToPostcode.checkBarcode(barcode);

      expect(isCorrect).toBe(false);
    });

    it('when input correct barcode should return true', () => {
      barcode = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';

      const isCorrect = barcodeToPostcode.checkBarcode(barcode);

      expect(isCorrect).toBe(true);
    });
  });

  it('get barcodes', () => {
    const barcode = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
    const barcodes = barcodeToPostcode.getBarcodes(barcode);

    expect(barcodes).toEqual([':|::|', ':|:|:', '||:::', ':|:|:', ':||::', ':::||', '::|:|', '::||:', ':|::|', '||:::']);
  });

  it('should get digits', () => {
    const barcodes = [':|::|', ':|:|:', '||:::'];
    const weight = barcodeToPostcode.loadWeight();
    const digits = barcodeToPostcode.getDigits(barcodes, weight);

    expect(digits).toEqual([4, 5, 0]);
  });

  describe('checkCodes', () => {
    let digits;

    it('when check success should return true', () => {
      digits = [9, 5, 7, 1, 3, 5];
      const isCorrect = barcodeToPostcode.checkDigits(digits);

      expect(isCorrect).toEqual(true);
    });

    it('when check failed should return false', () => {
      digits = [9, 5, 7, 1, 3, 4];
      const isCorrect = barcodeToPostcode.checkDigits(digits);

      expect(isCorrect).toEqual(false);
    });
  });

  describe('should convert postcode', () => {
    let digits;

    it("if length of digits more than 5 should add '-'", () => {
      digits = [4, 5, 0, 5, 6, 1, 2, 3, 4];
      const postcode = barcodeToPostcode.convertPostcode(digits);

      expect(postcode).toEqual('45056-1234');
    });

    it("if length of digits  equal 5 should convert", () => {
      digits = [4, 5, 1, 5, 6];
      const postcode = barcodeToPostcode.convertPostcode(digits);

      expect(postcode).toEqual('45156');
    });
  });
});
