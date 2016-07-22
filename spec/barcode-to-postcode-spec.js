'use strict';

describe('convert barcode to postcode', () => {

  const barcodeToPostcode = require('../main/barcode-to-postcode');

  describe('checkBarcode', ()=> {
    let barcode;

    it('should return false when input valid barcode', () => {
      barcode = ':|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::';

      const isCorrect = barcodeToPostcode.checkBarcode(barcode);

      expect(isCorrect).toBe(false);
    });

    it('should return false when input valid barcode', () => {
      barcode = ':|::|:|::|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::';

      const isCorrect = barcodeToPostcode.checkBarcode(barcode);

      expect(isCorrect).toBe(false);
    });

    it('should return true when input correct barcode', () => {
      barcode = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';

      const isCorrect = barcodeToPostcode.checkBarcode(barcode);

      expect(isCorrect).toBe(true);
    });
  });

  it('should get barcodes', () => {
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

    it('should return true when check success', () => {
      digits = [9, 5, 7, 1, 3, 5];
      const isCorrect = barcodeToPostcode.checkDigits(digits);

      expect(isCorrect).toEqual(true);
    });

    it('should return false when check failed', () => {
      digits = [9, 5, 7, 1, 3, 4];
      const isCorrect = barcodeToPostcode.checkDigits(digits);

      expect(isCorrect).toEqual(false);
    });
  });

  describe('convert postcode', () => {
    let digits;

    it("should add '-' if length of digits more than 5 ", () => {
      digits = [4, 5, 0, 5, 6, 1, 2, 3, 4];
      const postcode = barcodeToPostcode.convertPostcode(digits);

      expect(postcode).toEqual('45056-1234');
    });

    it("should convert if length of digits  equal 5", () => {
      digits = [4, 5, 1, 5, 6];
      const postcode = barcodeToPostcode.convertPostcode(digits);

      expect(postcode).toEqual('45156');
    });
  });
});
