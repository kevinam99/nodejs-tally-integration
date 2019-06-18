var request = require("request");

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
  '<!-- Expand ALL levels in detailed format = Yes or No-->\r\n          <EXPLODEALLLEVELS>yes</EXPLODEALLLEVELS>\r\n\r\n          <!-- Format = Detailed or Condensed -->\r\n          <!-- Yes means Detailed -->\r\n          <!-- No means Condensed -->\r\n          <EXPLODEFLAG>no</EXPLODEFLAG>\r\n\r\n          <!-- Show ALL Accts (incl Empty A/cs) = Yes or No-->\r\n          <DSPSHOWALLACCOUNTS>No</DSPSHOWALLACCOUNTS>\r\n\r\n          <!-- Show Opening balances = Yes or No -->\r\n          <DSPSHOWOPENING>Yes</DSPSHOWOPENING>\r\n          \r\n          <!-- Show goods inwards = Yes or No -->\r\n          <DSPSHOWINWARDS>YES</DSPSHOWINWARDS>\r\n          <!-- Show goods outwards = Yes or No-->\r\n          <DSPSHOWOUTWARDS>YES</DSPSHOWOUTWARDS>\r\n          <!-- Show Closing balances = Yes or No -->\r\n          <DSPSHOWCLOSING>Yes</DSPSHOWCLOSING>\r\n\r\n          <!--Method of Information = Grouped or Item-wise-->\r\n          <!-- Yes means Grouped-->\r\n          <!-- No means Item-wise -->\r\n          <ISITEMWISE>yes</ISITEMWISE>\r\n\r\n        </STATICVARIABLES>\r\n        <REPORTNAME>Stock Summary</REPORTNAME>\r\n      </REQUESTDESC>\r\n    </EXPORTDATA>\r\n  </BODY>\r\n</ENVELOPE>\r\n' };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
