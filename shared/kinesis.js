const AWS = require('aws-sdk');
var kinesis = new AWS.Kinesis();
/**
 * @author Sebahattin Düzel
 */
var kinesisName = process.env.KINESIS_NAME;
async function putRecords(data) {
    var params = {
        Records: data,
        StreamName: kinesisName
    };
    return kinesis.putRecords(params).promise().then(function (data) {
        return data.Records;
    }).catch(function (err) {
        console.log('putRecords err: ', err);
        return null;
    });
}
async function putRecord(data, partitionKey) {
    var kinesis = new AWS.Kinesis();
    var params = {
        Data: JSON.stringify(data),
        PartitionKey: partitionKey + "",
        StreamName: kinesisName
    };
    return kinesis.putRecord(params).promise().then(function (data) {
        console.log('putRecord result: ' + JSON.stringify(data));
        return data;
    }).catch(function (err) {
        console.log('putRecord err: ', err);
        return null;
    });
}

module.exports = {
    putRecords,
    putRecord
};