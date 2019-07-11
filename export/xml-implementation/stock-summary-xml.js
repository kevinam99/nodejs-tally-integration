var request = require("request");
var fs = require("fs");
const parseString = require('xml2js').parseString;
const convert = require("xml-js");
var Excel = require('exceljs');

var path = require('path');
var filePath = path.resolve(`${__dirname}/../../configs.csv`);
var jsonObjFinal;

var options = { method: 'POST',
  url: 'http://localhost:9002',
  headers: 
   { 'cache-control': 'no-cache',
     
     Host: 'localhost:9002',
     
     Accept: '*/*',
     'Content-Type': 'text/xml' },
  body: '<!--THIS WILL FETCH STOCK SUMMARY DETAILS PROGRAMMATICALLY-->'+
  '      <!--Gateway of Tally @Stock Summary -->'+
  '      <ENVELOPE>'+
  '      <HEADER>'+
  '         <TALLYREQUEST>Export Data</TALLYREQUEST>'+
  '      </HEADER>'+
  '      <BODY>'+
  '         <EXPORTDATA>'+
  '             <REQUESTDESC>'+
  '                 <STATICVARIABLES>'+
  '                     <SVEXPORTFORMAT>$$SysName:XML</SVEXPORTFORMAT> '+
  '                     <!-- Expand ALL levels in detailed format = Yes or No-->'+
  '                     <EXPLODEALLLEVELS>yes</EXPLODEALLLEVELS>'+
  '                     <!-- Format = Detailed or Condensed -->'+
  '                     <!-- Yes means Detailed -->'+
  '                     <!-- No means Condensed -->'+
 
  '                     <!-- Show ALL Accts (incl Empty A/cs) = Yes or No-->'+
  '                     <DSPSHOWALLACCOUNTS>No</DSPSHOWALLACCOUNTS>'+
  '                     <!-- Show Opening balances = Yes or No -->'+
  '                     <DSPSHOWOPENING>NO</DSPSHOWOPENING>'+
  '                     <!-- Show goods inwards = Yes or No -->'+
  '                     <DSPSHOWINWARDS>YES</DSPSHOWINWARDS>'+
  '                     <!-- Show goods outwards = Yes or No-->'+
  '                     <DSPSHOWOUTWARDS>YES</DSPSHOWOUTWARDS>'+
  '                     <!-- Show Closing balances = Yes or No -->'+
  '                     <DSPSHOWCLOSING>Yes</DSPSHOWCLOSING>'+
  '                     <!--Method of Information = Grouped or Item-wise-->'+
  '                     <!-- Yes means Grouped-->'+
  '                     <!-- No means Item-wise -->'+
  '                     <ISITEMWISE>yes</ISITEMWISE>'+
   '                 </STATICVARIABLES>'+
  '                 <REPORTNAME>Stock Summary</REPORTNAME>'+
  '             </REQUESTDESC>'+
  '         </EXPORTDATA>'+
  '     </BODY>'+
  ' </ENVELOPE>' };



request(options, function (error, response, body) {
  if (error) throw new Error(error);
  
    // console.log(body);
    
  var datetime = new Date();
  
  
  
 // Beautifying date and mtime outputs on the file 
  let date, month, year;

  //day
  if(datetime.getDate() < 10)
  {
    date = "0" + datetime.getDate();
    date = date - 1;

  } 

  else
  {
    date = datetime.getDate();
    date = date - 1;
  }
 
  // month
  if(datetime.getMonth() < 10)
  {
    month = "0" + datetime.getMonth();
    if(datetime.getDate() == 1)
    {
      month = month - 1
    }
  } 

  else
  {
    month = datetime.getMonth();
    if(datetime.getDate() == 1)
    {
      month = month - 1
    }
  }

  // year
  
    year = datetime.getFullYear();
    if(datetime.getDate() == 1 && datetime.getMonth() == 1){
      year = year - 1;
    }

  
  // Check whether the output file exists.
  // If it exists, then open the file in append mode.
  //https://www.github.com/kevinam99
  // Devleoped by Kevin Mathew as an intern at Edunomics
  // If it doesn't exist, open the file in write mode.

let savedFilename = "Stock-summary-"+date+"-"+month+"-"+year+".csv";
const path = "C:/Users/admin/Desktop/Internships/Edunomics/";

  //const path = '../.././Stock-summary-new.txt'  ---> Returns absent in any case
let headings = "SKU, Stock Location, Report Year, Report Month, Report Day,In Ouantity, Out Quantity, Closing Quantity \r\n";
fs.appendFileSync(savedFilename, headings);
let json;
try {
 if (fs.existsSync(path)) {
 //file exists
 let xml = body;
 parseString(xml, function (err, result) {
   //  console.dir(result);
   
   var csvjson = require('csvjson');
   var data = fs.readFileSync(filePath, { encoding : 'utf8'});
   var options = {
     delimiter : ',', // optional
     quote     : '"' // optional
   };

   json = csvjson.toObject(data, options);
   var prodList = result.ENVELOPE.DSPACCNAME.length;
     for(var i = 0; i < prodList; i++){
       let prodName = JSON.stringify(result.ENVELOPE.DSPACCNAME[i].DSPDISPNAME[0]);
       prodName = JSON.parse(prodName);
       let stockLocation = "Godown";
       let inQty = JSON.stringify(result.ENVELOPE.DSPSTKINFO[i].DSPSTKIN[0].DSPINQTY);
       let outQty = JSON.stringify(result.ENVELOPE.DSPSTKINFO[i].DSPSTKOUT[0].DSPOUTQTY);
       let clsQty = JSON.stringify(result.ENVELOPE.DSPSTKINFO[i].DSPSTKCL[0].DSPCLQTY);
       let sku;
       for(let j = 0; j < json.length; j++)
       {
         if(json[j].Retailer_name == prodName)
         {
            sku = json[j].SKU;
         }
       }
       let values =  sku + "," + stockLocation + "," + year + ","+ month + ","+ date + ","+ inQty + ","+ outQty + ","+clsQty+ "\r\n";
      fs.appendFileSync(savedFilename , values); // Appends if file exists, creates a new file if absent
     }
     

 });
 
 
 
 console.log("Appended to file");
 }
 else{
   console.log("Path Absent");
 }
} catch(err) {
 console.error(err)
}






});

