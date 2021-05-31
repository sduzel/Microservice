const AWS = require('aws-sdk');
const kmsClient = new AWS.KMS();
const KeyId = process.env.KEY_ID;
/**
 * @author Sebahattin Düzel
 */
const encrypt = async model => {
    if (!KeyId) return null;
    var enData = await kmsClient.encrypt({
            KeyId: KeyId,
            Plaintext: JSON.stringify(model)
        }).promise().then(x => {
            let buff = Buffer.from(x.CiphertextBlob);
            console.log("finish encrypt return data")
            return buff.toString('base64');
        })
        .catch(function (err) {
            console.log("encrypt err: " + err);
            return null;
        });
    if (!enData) {
        console.log("encrypt enData not found!")
        return null;
    }
    return enData;
}
const decrypt = async encryptText => {
    let buff = new Buffer.from(encryptText, 'base64');
    var model = await kmsClient.decrypt({
            CiphertextBlob: buff
        }).promise()
        .then(x => {
            return (IsJsonString(x.Plaintext.toString('utf8'))) ? JSON.parse(x.Plaintext.toString('utf8')) : x.Plaintext.toString('utf8')
        })
        .catch(function (err) {
            console.log("decrypt err: " + err);
            return null;
        });
    return model;
}

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
module.exports = {
    encrypt,
    decrypt
}