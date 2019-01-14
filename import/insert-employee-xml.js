var request = require("request");
var convert = require("xml-js");



function  addEmployee(name,address, costCategory, location, designation, bloodGrp, affectsStock, payroll, jobCosting, employeeGrp, sortPosition, language){
    
    var options = { method: 'POST',
    url: 'http://localhost:9002',
    headers: 
    { 
      'Cache-Control': 'no-cache',
      'Content-Type': 'text/xml' },
      
    body: '<ENVELOPE>\r\n'+
     '<HEADER>'+
     '  <TALLYREQUEST>Import Data</TALLYREQUEST>'+
     ' </HEADER>'+
     '<BODY>'+
     '  <IMPORTDATA>'+
     '    <REQUESTDESC>'+
     '        <REPORTNAME>All Masters</REPORTNAME>'+
     '        <STATICVARIABLES>'+
     '            <SVCURRENTCOMPANY>$$SysName:XML</SVCURRENTCOMPANY>'+
     '        </STATICVARIABLES>'+
     '    </REQUESTDESC>'+
     '  <REQUESTDATA>'+
     '       <TALLYMESSAGE xmlns:UDF="TallyUDF">'+
     '            <COSTCENTRE NAME="ImportPSOFT" RESERVEDNAME="">'+
     '                  <ADDRESS.LIST TYPE="String">'+
     '                        <ADDRESS>'+address+'</ADDRESS>'+
     '                  </ADDRESS.LIST>'+
     '            <MAILINGNAME.LIST TYPE="String">'+
     '                <MAILINGNAME>10</MAILINGNAME>'+
     '            </MAILINGNAME.LIST>'+
     '            <CATEGORY>'+costCategory+' Cost Category</CATEGORY>'+
     '            <LOCATION>'+location+'</LOCATION>'+
     '            <DESIGNATION>'+designation+'</DESIGNATION>'+
     '            <BLOODGROUP>'+bloodGrp+'</BLOODGROUP>'+
     '            <AFFECTSSTOCK>'+affectsStock+'</AFFECTSSTOCK>'+
     '            <FORPAYROLL>'+payroll+'</FORPAYROLL>'+
     '            <FORJOBCOSTING>'+jobCosting+'</FORJOBCOSTING>'+
     '            <ISEMPLOYEEGROUP>'+employeeGrp+'</ISEMPLOYEEGROUP>'+
     '            <SORTPOSITION>'+sortPosition+'</SORTPOSITION>'+
     '            <DEFAULTLANGUAGE>'+language+'</DEFAULTLANGUAGE>'+
     '            <LANGUAGENAME.LIST>'+
     '                <NAME.LIST TYPE="String">'+
     '                    <NAME>'+name+' </NAME>'+
     '                </NAME.LIST>'+
     '                <LANGUAGEID> 1034</LANGUAGEID>'+
     '             </LANGUAGENAME.LIST>'+
     '            </COSTCENTRE>'+
     '        </TALLYMESSAGE>'+
     '   </REQUESTDATA>'+
     '  </IMPORTDATA>'+
     '</BODY>'+
    '</ENVELOPE>' 
    };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

     console.log(body); //This is the response from Tally. This code is executed when everything works well
     
    });
}

addEmployee('Ajay', 'Delhi', 'Primary', 'Bangalore', 'Sfotware Engineer', 'O Positive', 'No', 'Yes', 'No', 'No', 1000, 'English');
