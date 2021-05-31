const AWS = require('aws-sdk');
const ses = new AWS.SES();
/**
 * @author Sebahattin Düzel
 */
async function send(body) {
    const params = {
        Destination: {
            BccAddresses: body.bccAddrs,
            CcAddresses: body.ccAddrs,
            ToAddresses: body.toAddrs
        },
        Message: body.msg,
        Source: body.sender
    };
    console.log("send", JSON.stringify(params));
    return ses.sendEmail(params).promise().then(() => {
        return true;
    }).catch((e) => {
        console.log(e);
        return false;
    });
}
async function sendRaw(body) {
    console.log("Body: " +JSON.stringify(body));
    let data = body.Data;
    var raw = "Subject:" + body.Subject + "\n";
    raw += "MIME-Version: 1.0\n";
    raw += "Content-Type: multipart/mixed; boundary=\"NextPart\"\n\n";
    raw += "--NextPart\n";
    raw += "Content-Type: text/html; charset=us-ascii\n\n";
    raw += body.Msg + "\n";
    raw += "--NextPart\n";
    raw += `Content-Type: ${body.MimeType};\n`;
    raw += `Content-Disposition: attachment; filename=\"${body.FileName}\"\n`;
    raw +=  "Content-Transfer-Encoding: base64\n\n"
   if (body.MimeType == "application/pdf"){
        raw += data
    }else{
        raw += new Buffer.from(data, 'base64').toString('base64');
    }
    console.log("RAW: ", raw);
    var params = {
        RawMessage: {
            Data: new Buffer.from(raw)
        },
        Destinations: body.To,
        Source: body.Sender
    };
    console.log("params:", JSON.stringify(params));
    return ses.sendRawEmail(params).promise().then(data => {
        console.log("sendRaw", JSON.stringify(data))
        return data;
    }).catch((e) => {
        console.log(e);
        return null;
    });
}


module.exports = {
    send,
    sendRaw
};