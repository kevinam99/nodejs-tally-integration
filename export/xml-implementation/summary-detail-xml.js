/**********************
 * THIS SCRIPT GIVES THE THE DETAILED SUMMARY OF LEDGER VOUCHERS GIVEN A LEDGER NAME 
 * AND A SPECIFIC TIME PERIOD
 * 
 * 
 */

var request = require("request");


function getSummaryInDetail(fromDate, toDate, ledgerName)
{
    var options = { method: 'POST',
  url: 'http://localhost:9002',
  headers: 
   { 'cache-control': 'no-cache',
    
         'Content-Type': 'text/xml' },
  body: ' <!-- Show Voucher Numbers also to Yes -->'+
  '      <ENVELOPE>'+
  '         <HEADER>'+
'               <TALLYREQUEST>Export Data</TALLYREQUEST>'+
'           </HEADER>'+
'           <BODY>'+
'               <EXPORTDATA>'+
    '               <REQUESTDESC>'+
        '               <STATICVARIABLES>'+
            '               <!-- Specify the period here -->'+
            '               <SVFROMDATE>'+ fromDate +'</SVFROMDATE>'+
            '               <SVTODATE>'+ toDate +'</SVTODATE>'+
            '               <!--Show billwise is set to Yes -->'+
            '               <DBBILLEXPLODEFLAG>YES</DBBILLEXPLODEFLAG>'+
            '               <!-- Option Show Voucher Numbers also = Yes -->'+
            '               <EXPLODEVNUM>YES</EXPLODEVNUM>'+
            '               <!-- Specify the Ledger Name here -->'+
            '               <LEDGERNAME>'+ ledgerName +'</LEDGERNAME>'+
        '               </STATICVARIABLES>'+
        '               <REPORTNAME>Ledger Vouchers</REPORTNAME>'+
'                   </REQUESTDESC>'+
'               </EXPORTDATA>'+
'           </BODY>'+
'       </ENVELOPE> ' };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

}

getSummaryInDetail(20180401, 20190531, 'Ram Prakash');
