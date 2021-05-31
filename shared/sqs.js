const AWS = require("aws-sdk");
const uuid = require("uuid");
/**
 * @author Sebahattin Düzel
 */
 var queueName = process.env.QUEUE_NAME || '-'
async function sendMessage(model, region, account) {
    const queueUrl = `https://sqs.${region}.amazonaws.com/${account}/${queueName}`
    const sqs = new AWS.SQS({
        region: region,
    });
    const params = {
        MessageGroupId: uuid.v1(),
        MessageBody: JSON.stringify(model),
        QueueUrl: queueUrl,
    };

    return sqs
        .sendMessage(params)
        .promise()
        .then(function (res) {
            console.log("Send message success");
            return true;
        })
        .catch(function (err) {
            console.log("ERROR: " + err);
            return false;
        });
}

async function getMessages( limit, reg, account) {
    const queueUrl = `https://sqs.${reg}.amazonaws.com/${account}/${queueName}`
    const sqs = new AWS.SQS({
        region: reg,
    });
    const params = {
        QueueUrl: queueUrl,
        MaxNumberOfMessages: limit,
    };
    return sqs
        .receiveMessage(params)
        .promise()
        .then(function (res) {
            //console.log('Messages:', JSON.stringify(res));
            return res.Messages;
        })
        .catch(function (err) {
            console.log("getSqsMessage", err);
            return false;
        });
}

async function deleteSqsMessage( receiptHandle, reg, account) {
    var sqsName = `${queueName}-${stage}.fifo`;
    const queueUrl = `https://sqs.${reg}.amazonaws.com/${account}/${sqsName}`
    const sqs = new AWS.SQS({
        region: reg,
    });
    const params = {
        QueueUrl: queueUrl,
        ReceiptHandle: receiptHandle,
    };
    return sqs
        .deleteMessage(params)
        .promise()
        .then(function (res) {
            console.log("Delete Message: ", res);
            return true;
        })
        .catch(function (err) {
            console.log("deleteSqsMessage", err);
            return false;
        });
}

module.exports = {
    sendMessage,
    deleteSqsMessage,
    getMessages,
};