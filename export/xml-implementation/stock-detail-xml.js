/**********************
 * THIS SCRIPT GIVES THE THE DETAILED SUMMARY OF LEDGER VOUCHERS GIVEN A LEDGER NAME 
 * AND A SPECIFIC TIME PERIOD
 * 
 * 
 */

const request = require("request");
const fs = require("fs");
const parseString = require('xml2js').parseString;

function getSummaryInDetail(fromDate, toDate, ledgerName)
{
    var options = { method: 'POST',
  url: 'http://localhost:9002',
  headers: 
   { 'cache-control': 'no-cache',
    
         'Content-Type': 'text/xml' },
  body: ' <!-- Show Voucher Numbers also to Yes -->'+
  '      <ENVELOPE>'+
  '         <HEADER>'+
'               <TALLYREQUEST>Export Data</TALLYREQUEST>'+
'           </HEADER>'+
'           <BODY>'+
'               <EXPORTDATA>'+
    '               <REQUESTDESC>'+
        '               <STATICVARIABLES>'+
        '                   <SVEXPORTFORMAT>$$SysName:XML</SVEXPORTFORMAT> '+ 
        '                     <EXPLODEALLLEVELS>yes</EXPLODEALLLEVELS>'+ 
        '                     <DSPSHOWTRANS>YES</DSPSHOWTRANS>'+ 
        '                     <DSPSHOWALLACCOUNTS>Yes</DSPSHOWALLACCOUNTS>'+     
            '               <!-- Specify the period here -->'+
            '               <SVFROMDATE>'+ fromDate +'</SVFROMDATE>'+
            '               <SVTODATE>'+ toDate +'</SVTODATE>'+
            '               <!--Show billwise is set to Yes -->'+
            '               <DBBILLEXPLODEFLAG>YES</DBBILLEXPLODEFLAG>'+
            '               <!-- Option Show Voucher Numbers also = Yes -->'+
            '               <EXPLODEVNUM>YES</EXPLODEVNUM>'+
            '               <!-- Specify the Ledger Name here -->'+
            '               <LEDGERNAME>'+ ledgerName +'</LEDGERNAME>'+
            '               <ISITEMWISE>yes</ISITEMWISE>'+               
        '</STATICVARIABLES>'+
        '               <REPORTNAME>Ledger Vouchers</REPORTNAME>'+
'                   </REQUESTDESC>'+
'               </EXPORTDATA>'+
'           </BODY>'+
'       </ENVELOPE> ' };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);    

  let savedFilename = "Stock-detail-"+date+"-"+month+"-"+year+".csv";
  savedFilenameFinal = savedFilename;
  const path = "C:/Users/admin/Desktop/Internships/Edunomics/";
//https://www.github.com/kevinam99
  // Devleoped by Kevin Mathew as an intern at Edunomics
//const path = '../.././Stock-summary-new.txt'  ---> Returns absent in any case
console.log("Checking if file exists.");

try {
  if (fs.existsSync(path)) {
  //file exist
  let xml = body;
  
  // SAVING TO CSV BEGINS

  var json;
  parseString(xml, function (err, result) {
      json = result;
      console.dir(result);
  });
  
  // Accessing the JSON after the conversion from XML 
  for(var i = 0; i < json.ENVELOPE.DSPEXPLVCHNUMBER.length; i++){
      let transactionID = json.ENVELOPE.DSPEXPLVCHNUMBER[i];
      let transactionType = json.ENVELOPE.DSPVCHTYPE[i];
      let ledger = json.ENVELOPE.DSPVCHLEDACCOUNT[i];
      let transactionDate = json.ENVELOPE.DSPVCHDATE[i];
      let transaction = "";
      let docRef = ""; 
      let source = "";
      let destination = ""
      if(transactionType == 'Sale')
      {
        
        destination = ledger;
        transaction = "OUT";
        docRef = 'Sale Transaction';
      }
      else{
        transaction = "IN"
        docRef = 'GRN Transaction';
        source = "Dealer"
      }
      var fileData = transactionID+","+transaction+","+source+","+destination+","+transactionDate+","+docRef+"\r\n";
      fs.appendFileSync(savedFilename,fileData); // Appends if file exists, creates a new file if absent
  }







  // SAVING TO CSV ENDS
	 
	console.log("Appended to file");
  }
  else{
	  console.log("Path Absent");
  }
} catch(err) {
  console.error(err)
}
});

}


  // Beautifying date and mtime outputs on the file 
  let date, month, year, hour, minute, second;
  var datetime = new Date();
  //day
  if(datetime.getDate() < 10)
  {
    date = "0" + datetime.getDate();
  } 

  else
  {
    date = datetime.getDate();
  }
 
  // month
  if(datetime.getMonth() < 10)
  {
    month = "0" + datetime.getMonth();
  } 

  else
  {
    month = datetime.getMonth();
  }

  // year
  if(datetime.getFullYear() < 10)
  {
    year = "0" + datetime.getFullYear();
  } 

  else
  {
    year = datetime.getFullYear();
  }

  //Time

  //Hour
  if(datetime.getHours() < 10)
  {
    hour = "0" + datetime.getHours();
  } 

  else
  {
    hour = datetime.getHours();
  }

  // Minute

  if(datetime.getMinutes() < 10)
  {
    minute = "0" + datetime.getMinutes();
  } 

  else
  {
    minute = datetime.getMinutes();
  }

  // Seconds

  if(datetime.getSeconds() < 10)
  {
    second = "0" + datetime.getSeconds();
  } 

  else
  {
    second = datetime.getSeconds();
  }


// Main
let fromDate = 20180401, toDate = 20190901;
let fields = 'Transaction ID, Transaction Type (In/Out/Return), Source, Destination, Transaction Date, Document Ref\r\n';
let ledgers = ['Purchase', 'Sales', 'Mr Nadeem Khan(Cus)', 'M/S X Mobile Words (Sup)'];
fs.appendFileSync("Stock-detail-"+date+"-"+month+"-"+year+".csv", fields);
const fieldsWritten = true;
if(fieldsWritten){
    
	for(var i = 0; i < ledgers.length; i++){
		getSummaryInDetail(fromDate, toDate, ledgers[i]);
	}
}