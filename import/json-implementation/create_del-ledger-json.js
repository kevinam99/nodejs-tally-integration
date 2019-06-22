var request = require("request");
var convert = require("xml-js");

function create_del_ledger(json)
{
    var conversion = {compact: true, ignoreComment: true, spaces: 4};
    var xml = convert.json2xml(json, conversion);
    var options = { method: 'POST',
    url: 'http://localhost:9002',
    headers: 
    { 'cache-control': 'no-cache',
      'Content-Type': 'text/xml' },
    body: xml };

    request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
    });

    

}


function setProperties(action, company, ledgerName, state, openingBalance, parent)
{
    var xml_body =  '<ENVELOPE>' +
        '    <HEADER>'+
        '        <TALLYREQUEST>Import Data</TALLYREQUEST>'+
        '    </HEADER>'+
        '    <BODY>'+
        '       <IMPORTDATA>'+
        '           <REQUESTDESC>'+
        '                  <REPORTNAME>All Masters</REPORTNAME>'+
        '                  <STATICVARIABLES>'+
        '                        <SVCURRENTCOMPANY>'+ company +'</SVCURRENTCOMPANY>'+
        '                  </STATICVARIABLES>'+
        '           </REQUESTDESC>'+
        '       <REQUESTDATA>'+
        '           <TALLYMESSAGE xmlns:UDF="TallyUDF">'+
        '           <LEDGER NAME="'+ ledgerName +'" Action = "'+ action +'">'+
        '               <STATENAME> '+ state +' </STATENAME>'+
        '               <PARENT>'+ parent +'</PARENT>'+
        '               <OPENINGBALANCE> '+ openingBalance +' </OPENINGBALANCE>'+
        '               <LANGUAGENAME.LIST>'+
        '                   <NAME.LIST TYPE="String">'+
        '                       <NAME>'+ ledgerName +'</NAME>'+
        '                   </NAME.LIST>'+
        '               </LANGUAGENAME.LIST>'+
        '           </LEDGER>'+
        '           </TALLYMESSAGE>'+
        '       </REQUESTDATA> '+ 
        '       </IMPORTDATA>'+
        ' </BODY>'+
        '</ENVELOPE>';
    
    

    var json = convert.xml2json(xml_body, {compact: true, spaces: 4});
    create_del_ledger(json);// Finally executeds the instruction
}

setProperties('Create', 'Test2', 'Vijay and Sons', 'Karnataka', 1033, 'Sundry Creditors'); //sets properties. Check params.
