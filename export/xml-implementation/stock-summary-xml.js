var request = require("request");
var fs = require("fs");
var options = { method: 'POST',
  url: 'http://localhost:9002',
  headers: 
   { 'cache-control': 'no-cache',
     
     Host: 'localhost:9002',
     
     Accept: '*/*',
     'Content-Type': 'text/xml' },
  body: '<!--THIS WILL FETCH STOCK SUMMARY DETAILS PROGRAMMATICALLY-->'+
  '      <!--Gateway of Tally @Stock Summary -->'+
  '      <ENVELOPE>'+
  '      <HEADER>'+
  '         <TALLYREQUEST>Export Data</TALLYREQUEST>'+
  '      </HEADER>'+
  '      <BODY>'+
  '         <EXPORTDATA>'+
  '             <REQUESTDESC>'+
  '                 <STATICVARIABLES>'+
  '                     <!-- Expand ALL levels in detailed format = Yes or No-->'+
  '                     <EXPLODEALLLEVELS>yes</EXPLODEALLLEVELS>'+
  '                     <!-- Format = Detailed or Condensed -->'+
  '                     <!-- Yes means Detailed -->'+
  '                     <!-- No means Condensed -->'+
  '                     <EXPLODEFLAG>no</EXPLODEFLAG>'+
  '                     <!-- Show ALL Accts (incl Empty A/cs) = Yes or No-->'+
  '                     <DSPSHOWALLACCOUNTS>No</DSPSHOWALLACCOUNTS>'+
  '                     <!-- Show Opening balances = Yes or No -->'+
  '                     <DSPSHOWOPENING>Yes</DSPSHOWOPENING>'+
  '                     <!-- Show goods inwards = Yes or No -->'+
  '                     <DSPSHOWINWARDS>YES</DSPSHOWINWARDS>'+
  '                     <!-- Show goods outwards = Yes or No-->'+
  '                     <DSPSHOWOUTWARDS>YES</DSPSHOWOUTWARDS>'+
  '                     <!-- Show Closing balances = Yes or No -->'+
  '                     <DSPSHOWCLOSING>Yes</DSPSHOWCLOSING>'+
  '                     <SVEXPORTFORMAT>$$SysName:SDF</SVEXPORTFORMAT>'+
  '                     <!--Method of Information = Grouped or Item-wise-->'+
  '                     <!-- Yes means Grouped-->'+
  '                     <!-- No means Item-wise -->'+
  '                     <ISITEMWISE>yes</ISITEMWISE>'+
  '                     <SVEXPORTFORMAT>$$SysName:SDF</SVEXPORTFORMAT>'+
  '                 </STATICVARIABLES>'+
  '                 <REPORTNAME>Stock Summary</REPORTNAME>'+
  '             </REQUESTDESC>'+
  '         </EXPORTDATA>'+
  '     </BODY>'+
  ' </ENVELOPE>' };

    var writeStream = fs.createWriteStream("Stock-summary-new.txt");
    

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
  writeStream.write("------Items---------------------------------Incoming---------------------------------------------------------------------------------------------------Outgoing--------------------------------------------\r\n");
  writeStream.write("\r\n                                     Stock       Rate            Value                                                 Sold stock    Rate             Value      --------------Remaining-------------------\r\n");
  writeStream.write(body);

  //writeStream.write("Thank You.");
  writeStream.end();
});
