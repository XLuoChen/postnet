# postnet
==========================

##postcode ===> barcode

##tasks:

1）. checkPostcode

+ input : postcode
+ output : true/false
+ 估算时间：10mins
+ 实际时间 : 15mins
+ 原因 : 错误的估计了校验用户输入的复杂性

2）. getPostcodes

+ input : postcode
+ output : postcodex
+ 估算时间：20mins
+ 实际时间 : 40mins
+ 原因 : 优化语句以及实现数组合并时花费较多时间

3）. appendCheckCode

+ input : postcodes
+ output : appendedPostcodes
+ 估算时间：15mins
+ 实际时间 : 13mins
+ 原因 : 实现较简单

4）. convertBarcode

+ input : appendedPostcodes && loadAllBarcodes()
+ output : barcode
+ 估算时间：30mins
+ 实际时间 : 28mins
+ 原因 : 思路清晰

##barcode ===> postcode

##tasks:

1）. checkBarcode

+ input : barcode
+ output : true/false
+ 估算时间：20mins
+ 实际时间 : 25mins
+ 原因 : 项目中存在两个测试文件导致跑不通，不知如何解决

2）. getBarcodes

+ input : barcode
+ output : barcodes
+ 估算时间：20mins
+ 实际时间: 解决两个测试文件的问题

3）. getDigits

+ input : barcodes
+ output : digits
+ 估算时间：30mins
+ 实际时间 : 24mins
+ 原因 : 实现较简单

4）. checkDigits

+ input : digits && loadWeight()
+ output : true/false
+ 估算时间：20mins
+ 实际时间 : 9mins
+ 原因 : 以为此处校验很繁琐

5）. convertPostcode

+ input : digits
+ output : postcode
+ 估算时间：15mins
+ 实际时间 : 10mins
+ 原因 : 思路清晰



