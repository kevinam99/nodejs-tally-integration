var request = require("request");


var options = { method: 'POST',
  url: 'http://localhost:9002',
  headers: 
   { 
     'cache-control': 'no-cache',
     'Content-Type': 'text/xml'},
     body: '<ENVELOPE>'+
     '          <HEADER>'+
    '               <TALLYREQUEST>Export Data</TALLYREQUEST>'+
    '           </HEADER>'+
    '           <BODY>'+
        '           <EXPORTDATA>'+
            '           <REQUESTDESC>'+
                '           <REPORTNAME>List of Accounts</REPORTNAME>	'+
                '           <STATICVARIABLES>'+
                   '                 <EXPLODEFLAG>Yes</EXPLODEFLAG>'+
                    '               <SVEXPORTFORMAT>$$SysName:XML</SVEXPORTFORMAT>'+
                    '               <ACCOUNTTYPE>All Inventory Masters</ACCOUNTTYPE> '+
                '           </STATICVARIABLES>'+
            '           </REQUESTDESC>'+
        '           </EXPORTDATA>'+
    '           </BODY>'+
 '      </ENVELOPE>'
    };
    request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
});
