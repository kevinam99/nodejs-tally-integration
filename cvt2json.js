var convert = require("xml-js");
var xml = '<ENVELOPE>'+
'          <HEADER>'+
'               <TALLYREQUEST>Export Data</TALLYREQUEST>'+
'           </HEADER>'+
'           <BODY>'+
   '           <EXPORTDATA>'+
       '           <REQUESTDESC>'+
           '           <REPORTNAME>List of Accounts</REPORTNAME>	'+
           '           <STATICVARIABLES>'+
              '                 <EXPLODEFLAG>Yes</EXPLODEFLAG>'+
               '               <SVEXPORTFORMAT>$$SysName:SDF</SVEXPORTFORMAT>'+
               '               <ACCOUNTTYPE>All Inventory Masters</ACCOUNTTYPE> '+
           '           </STATICVARIABLES>'+
       '           </REQUESTDESC>'+
   '           </EXPORTDATA>'+
'           </BODY>'+
'      </ENVELOPE>'

var json = convert.xml2json(xml, {compact: true, spaces: 4});
console.log(json);