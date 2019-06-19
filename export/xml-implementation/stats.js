var request = require("request");
var convert = require("xml-js");

function getMasterAndVoucherStats(fromDate, toDate, exportFormat)
{
    var options = { method: 'POST',
    url: 'http://localhost:9002',
    headers: 
    { 'cache-control': 'no-cache',
      'Content-Type': 'text/xml' },
    body: '<!--Display Master and Voucher statistics.-->'+
    '      <ENVELOPE>'+
    '         <HEADER>'+
    '             <TALLYREQUEST>Export Data</TALLYREQUEST>'+
    '         </HEADER>'+
    '         <BODY>'+
    '             <EXPORTDATA>'+
    '             <REQUESTDESC>'+
    '                 <STATICVARIABLES>'+
    '                     <!--Specify the period here-->'+
    '                     <SVFROMDATE>'+ fromDate +'</SVFROMDATE>'+
    '                     <SVTODATE>'+ toDate +'</SVTODATE>'+
    '                     <!--Specify the Export format here  HTML or XML or SDF-->'+
    '                     <SVEXPORTFORMAT>$$SysName:'+ exportFormat +'</SVEXPORTFORMAT>'+
    '                 </STATICVARIABLES>'+
    '             <!--Specify the Report Name here-->'+
    '                 <REPORTNAME>Statistics</REPORTNAME>'+
    '             </REQUESTDESC>'+
    '             </EXPORTDATA>'+
    '         </BODY>'+
    '        </ENVELOPE>' };

    request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
    });

    

}


getMasterAndVoucherStats(20190501, 20190630, 'SDF');
