var request = require("request");

var convert = require("xml-js");

function createGroup(json)
{

    var conversion = {compact: true, ignoreComment: true, spaces: 4};
    xml = convert.json2xml(json, conversion);
    var options = { method: 'POST',
    url: 'http://localhost:9002',
    headers: 
    {
        'cache-control': 'no-cache',
        'Content-Type': 'text/xml' },
    body: xml
    };

    request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
})};

createGroup({
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
                }
            },
            "REQUESTDATA": {
                "TALLYMESSAGE": {
                    "_attributes": {
                        "xmlns:UDF": "TallyUDF"
                    },
                    "GROUP": {
                        "_attributes": {
                            "NAME": "Group from NodeJS JSON",
                            "ACTION": "Create"
                        },
                        "NAME.LIST": {
                            "NAME": {
                                "_text": "Group from NodeJS JSON"
                            }
                        },
                        "PARENT": {
                            "_text": "Sundry Debtors"
                        },
                        "ISSUBLEDGER": {
                            "_text": "No"
                        },
                        "ISBILLWISEON": {
                            "_text": "No"
                        },
                        "ISCOSTCENTRESON": {
                            "_text": "No"
                        }
                    }
                }
            }
        }
    }
}
});
