var request = require("request");
var parser = require("xml2json");

var options = { method: 'POST',
  url: 'http://localhost:9002',
  headers: 
   { 
     'cache-control': 'no-cache',
     'Content-Type': 'text/xml' },
  body: '<!--THIS WILL FETCH BALANCE SHEET DETAILS PROGRAMMATICALLY-->'+
  '      <!--WHICH IS EQUIVALENT TO USING THE FOLLOWING OPTION MANUALLY IN TALLY-->'+
  '      <!--OPTION:--><!--Gateway of Tally @Balance Sheet-->'+
  '      <ENVELOPE>'+
  '      <HEADER>'+
  '           <TALLYREQUEST>Export Data</TALLYREQUEST>'+
  '      </HEADER>'+
  '      <BODY>'+
  '           <EXPORTDATA>'+
  '               <REQUESTDESC>'+
  '                   <STATICVARIABLES>'+
  '                         <!--To Fetch data in XML format-->'+
  '                         <SVEXPORTFORMAT>$$SysName:SDF</SVEXPORTFORMAT>'+
  '                         <!--To Fetch data in HTML format, change the SVEXPORTFORMAT Tag value as $$SysName:HTML-->'+
  '                   </STATICVARIABLES>'+
  '                   <REPORTNAME>Balance Sheet</REPORTNAME>'+
  '               </REQUESTDESC>'+
  '           </EXPORTDATA>'+
  '     </BODY>'+
  '     </ENVELOPE>'
     };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
  var xml = body;
    var json = parser.toJson(xml);
    console.log(json);
});
