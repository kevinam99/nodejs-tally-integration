var request = require("request");
var convert = require("xml-js");

{

function  addEmployee(json){
    var conversion = {compact: true, ignoreComment: true, spaces: 4};
    xml = convert.json2xml(json, conversion);
    var options = { method: 'POST',
    url: 'http://localhost:9002',
    headers: 
    { 
      'Cache-Control': 'no-cache',
      'Content-Type': 'text/xml' },
      body: xml
    };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

     console.log(body); //This is the response from Tally. This code is executed when everything works well
     
    });
}

//Parameter passed is in JSON
addEmployee({
  "ENVELOPE": {
      "HEADER": {
          "TALLYREQUEST": {
              "_text": "Import Data"
          }
      },
      "BODY": {
          "IMPORTDATA": {
              "REQUESTDESC": {
                  "REPORTNAME": {
                      "_text": "All Masters"
                  },
                  "STATICVARIABLES": {
                      "SVCURRENTCOMPANY": {
                          "_text": "Test"
                      }
                  }
              },
              "REQUESTDATA": {
                  "TALLYMESSAGE": {
                      "_attributes": {
                          "xmlns:UDF": "TallyUDF"
                      },
                      "COSTCENTRE": {
                          "_attributes": {
                              "NAME": "ImportPSOFT",
                              "RESERVEDNAME": ""
                          },
                          "ADDRESS.LIST": {
                              "_attributes": {
                                  "TYPE": "String"
                              },
                              "ADDRESS": {
                                  "_text": "Bangalore"
                              }
                          },
                          "MAILINGNAME.LIST": {
                              "_attributes": {
                                  "TYPE": "String"
                              },
                              "MAILINGNAME": {
                                  "_text": "10"
                              }
                          },
                          "CATEGORY": {
                              "_text": "Primary Cost Category"
                          },
                          "LOCATION": {
                              "_text": "Bangalore"
                          },
                          "DESIGNATION": {
                              "_text": "Software Engineer"
                          },
                          "BLOODGROUP": {
                              "_text": "O Positive"
                          },
                          "AFFECTSSTOCK": {
                              "_text": "No"
                          },
                          "FORPAYROLL": {
                              "_text": "Yes"
                          },
                          "FORJOBCOSTING": {
                              "_text": "No"
                          },
                          "ISEMPLOYEEGROUP": {
                              "_text": "No"
                          },
                          "SORTPOSITION": {
                              "_text": " 1000"
                          },
                          "DEFAULTLANGUAGE": {
                              "_text": "0"
                          },
                          "LANGUAGENAME.LIST": {
                              "NAME.LIST": {
                                  "_attributes": {
                                      "TYPE": "String"
                                  },
                                  "NAME": {
                                      "_text": "John Doe JSON"
                                  }
                              },
                              "LANGUAGEID": {
                                  "_text": " 1033"
                              }
                          }
                      }
                  }
              }
          }
      }
  }
})};
