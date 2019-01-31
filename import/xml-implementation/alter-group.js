var request = require("request");

var options = { method: 'POST',
  url: 'http://localhost:9002',
  headers: 
   { 'cache-control': 'no-cache',
     'Content-Type': 'text/xml' },
    body: '<!--XML tags to Alter / Modify the Group "My Debtors Name" and change its Parent Group to Sundry Creditors-->'+
    '<ENVELOPE>'+
    '   <HEADER>'+
    '       <TALLYREQUEST>Import Data</TALLYREQUEST>'+
    '   </HEADER>'+
    '   <BODY>'+
    '       <IMPORTDATA>'+
    '           <REQUESTDESC>'+
    '               <REPORTNAME>All Masters</REPORTNAME>'+
    '           </REQUESTDESC>'+
    '           <REQUESTDATA>'+
    '             <TALLYMESSAGE xmlns:UDF="TallyUDF">'+
    '                   <GROUP NAME="My Debtors Name" ACTION="Create">'+
    '                       <NAME.LIST>'+
    '                           <NAME>My Debtors</NAME>'+
    '                       </NAME.LIST>'+
    '                       <PARENT>Sundry Creditors</PARENT>'+
    '                       <ISSUBLEDGER>No</ISSUBLEDGER>'+
    '                       <ISBILLWISEON>No</ISBILLWISEON>'+
    '                       <ISCOSTCENTRESON>No</ISCOSTCENTRESON>'+
    '                   </GROUP>'+
    '             </TALLYMESSAGE>'+
    '           </REQUESTDATA>'+
    '       </IMPORTDATA>'+
    '   </BODY>'+
    '</ENVELOPE>'
  };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
