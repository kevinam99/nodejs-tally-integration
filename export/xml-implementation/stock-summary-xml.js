var request = require("request");
var fs = require("fs");
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
  '                     <!-- Expand ALL levels in detailed format = Yes or No-->'+
  '                     <EXPLODEALLLEVELS>yes</EXPLODEALLLEVELS>'+
  '                     <!-- Format = Detailed or Condensed -->'+
  '                     <!-- Yes means Detailed -->'+
  '                     <!-- No means Condensed -->'+
  '                     <EXPLODEFLAG>no</EXPLODEFLAG>'+
  '                     <!-- Show ALL Accts (incl Empty A/cs) = Yes or No-->'+
  '                     <DSPSHOWALLACCOUNTS>No</DSPSHOWALLACCOUNTS>'+
  '                     <!-- Show Opening balances = Yes or No -->'+
  '                     <DSPSHOWOPENING>Yes</DSPSHOWOPENING>'+
  '                     <!-- Show goods inwards = Yes or No -->'+
  '                     <DSPSHOWINWARDS>YES</DSPSHOWINWARDS>'+
  '                     <!-- Show goods outwards = Yes or No-->'+
  '                     <DSPSHOWOUTWARDS>YES</DSPSHOWOUTWARDS>'+
  '                     <!-- Show Closing balances = Yes or No -->'+
  '                     <DSPSHOWCLOSING>Yes</DSPSHOWCLOSING>'+
  '                     <SVEXPORTFORMAT>$$SysName:SDF</SVEXPORTFORMAT>'+
  '                     <!--Method of Information = Grouped or Item-wise-->'+
  '                     <!-- Yes means Grouped-->'+
  '                     <!-- No means Item-wise -->'+
  '                     <ISITEMWISE>yes</ISITEMWISE>'+
  '                     <SVEXPORTFORMAT>$$SysName:SDF</SVEXPORTFORMAT>'+
  '                 </STATICVARIABLES>'+
  '                 <REPORTNAME>Stock Summary</REPORTNAME>'+
  '             </REQUESTDESC>'+
  '         </EXPORTDATA>'+
  '     </BODY>'+
  ' </ENVELOPE>' };

    var writeStream = fs.createWriteStream("Stock-summary-new.txt");
    

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
  writeStream.write("\r\n");
  writeStream.write("==========================================================================>DATA EXTRACTED ON:  "+ date +" - "+ month +" - "+ year +" , at "+ hour +" : "+ minute +" : "+ second +"<==================================================================================== \r\n");
  
  writeStream.write("------Items--------         ------------------Incoming---------------------------                                  ----------------Outgoing-------------------      --------------Remaining-------------------\r\n");
  writeStream.write("\r\n");
  writeStream.write("\r\n                                     Stock       Rate            Value                                                 Sold stock    Rate             Value  	  Stock        Rate	       Value\r\n");
  writeStream.write(body);

  //writeStream.write("Thank You.");
  writeStream.end();
});
