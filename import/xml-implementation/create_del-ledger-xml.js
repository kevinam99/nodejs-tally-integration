var request = require("request");

function create_del_ledger(action, company, ledgerName, openingBalance, parent)
{
    var options = { method: 'POST',
  url: 'http://localhost:9002',
  headers: 
   { 'cache-control': 'no-cache',
     Connection: 'keep-alive',
     'content-length': '772',
     'accept-encoding': 'gzip, deflate',
     Host: 'localhost:9002',
     
     'Cache-Control': 'no-cache',
     Accept: '*/*',
     
     'Content-Type': 'application/xml' },
  body: '<ENVELOPE>' +
        '    <HEADER>'+
        '        <TALLYREQUEST>Import Data</TALLYREQUEST>'+
        '    </HEADER>'+
        '    <BODY>'+
        '       <IMPORTDATA>'+
        '           <REQUESTDESC>'+
        '                  <REPORTNAME>All Masters</REPORTNAME>'+
        '                  <STATICVARIABLES>'+
        '                        <SVCURRENTCOMPANY>Test</SVCURRENTCOMPANY>'+
        '                  </STATICVARIABLES>'+
        '           </REQUESTDESC>'+
        '       <REQUESTDATA>'+
        '           <TALLYMESSAGE xmlns:UDF="TallyUDF">'+
        '           <LEDGER NAME="Test-Ledger1" Action = "Create">'+
        '               <STATENAME> Test state </STATENAME>'+
        '               <PARENT>Bank Accounts</PARENT>'+
        '               <OPENINGBALANCE> 1033 </OPENINGBALANCE>'+
        '               <LANGUAGENAME.LIST>'+
        '                   <NAME.LIST TYPE="String">'+
        '                       <NAME>Test-Ledger1</NAME>'+
        '                   </NAME.LIST>'+
        '               </LANGUAGENAME.LIST>'+
        '           </LEDGER>'+
        '           </TALLYMESSAGE>'+
        '       </REQUESTDATA> '+ 
        '       </IMPORTDATA>'+
        ' </BODY>'+
        '</ENVELOPE>' };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

}