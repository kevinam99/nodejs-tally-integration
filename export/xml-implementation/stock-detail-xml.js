/**********************
 * THIS SCRIPT GIVES THE THE DETAILED SUMMARY OF LEDGER VOUCHERS GIVEN A LEDGER NAME 
 * AND A SPECIFIC TIME PERIOD
 * 
 * 
 */

var request = require("request");
var fs = require("fs");

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
            '               <!-- Specify the period here -->'+
            '               <SVFROMDATE>'+ fromDate +'</SVFROMDATE>'+
            '               <SVTODATE>'+ toDate +'</SVTODATE>'+
            '               <!--Show billwise is set to Yes -->'+
            '               <DBBILLEXPLODEFLAG>YES</DBBILLEXPLODEFLAG>'+
            '               <!-- Option Show Voucher Numbers also = Yes -->'+
            '               <EXPLODEVNUM>YES</EXPLODEVNUM>'+
            '               <!-- Specify the Ledger Name here -->'+
            '               <LEDGERNAME>'+ ledgerName +'</LEDGERNAME>'+
        '               </STATICVARIABLES>'+
        '               <REPORTNAME>Ledger Vouchers</REPORTNAME>'+
'                   </REQUESTDESC>'+
'               </EXPORTDATA>'+
'           </BODY>'+
'       </ENVELOPE> ' };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);


  var datetime = new Date();
  
  
  
  // Beautifying date and mtime outputs on the file 
   let date, month, year, hour, minute, second;
 
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
  let savedFilename = "Stock-detail-"+date+"-"+month+"-"+year+".txt";
const path = "C:/Users/admin/Desktop/Internships/Edunomics/";
//https://www.github.com/kevinam99
  // Devleoped by Kevin Mathew as an intern at Edunomics
//const path = '../.././Stock-summary-new.txt'  ---> Returns absent in any case
console.log("Checking if file exists.");
try {
  if (fs.existsSync(path)) {
	//file exist
  let fileData = 
  				  'Details for ledger: '+ ledgerName +' for the period'+ fromDate + 'to '+ todate + ' \r\n'+
                  '--Date--            --Transaction type--   --DEBIT--      --CREDIT--\r\n'+ body +'\r\n\r\n\r\n';

	
	
	fs.appendFileSync(savedFilename , fileData); // Appends if file exists, creates a new file if absent
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


let ledgers = ['Ram Prakash', 'Purchase', 'Test Company2', 'Test Company'];

let fromDate = 20180401, toDate = 20190531;
for(var i = 0; i < ledgers.length; i++){
	getSummaryInDetail(fromDate, toDate, ledgers[i]);
}