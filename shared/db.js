const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
/**
 * @author Sebahattin Düzel
 */
var tableName = process.env.TABLE_NAME || '-'
async function postData(item) {
    let params = {
        TableName: tableName,
        Item: item
    };
    return dynamo.put(params).promise().then(() => {
        return true;
    }).catch((err) => {
        console.log('postWakeUp', err);
        return false;
    });
}
async function deleteData(id) {
    const params = {
        TableName: tableName,
        Key: {
            "Id": id
        }
    };
    return dynamo.delete(params).promise().then(function (data) {
        return true;
    }).catch(function (err) {
        console.log('deleteData:err: ', err);
        return null;
    });
}
async function patchData(item) {
    const params = {
        TableName: tableName,
        Item: item
    };
    return dynamo.put(params).promise().then(function () {
        return true;
    }).catch(function (err) {
        console.log('patchData:err:', err);
        return false;
    });
}
async function getData(id) {
    const params = {
        TableName: tableName,
        Key: {
            "Id": id
        }
    };
    return dynamo.get(params).promise().then(function (data) {
        return data.Item;
    }).catch(function (err) {
        console.log('getData:err: ', err);
        return null;
    });
}
async function getAll() {
    var allItems=[];
    const params = {
        TableName: tableName
    }
    const runScan = async ExclusiveStartKey => {
        if (ExclusiveStartKey)
            params.ExclusiveStartKey = ExclusiveStartKey;
        return dynamo.scan(params).promise().then((data) => {
            console.log("runScan : " + JSON.stringify(data.Items))
            allItems.push(...data.Items);
            if (typeof data.LastEvaluatedKey === 'undefined')
                return allItems;
            return runScan(data.LastEvaluatedKey)
        }).catch((err) => {
            console.log('getAll', err);
            return null;
        });
    }
    return runScan();
}
async function getDataBySecondaryId(secondId) {
    const params = {
        TableName: guestTable,
        IndexName: "SecondaryId-index",
        KeyConditionExpression: 'SecondaryId = :secondaryId',
        ExpressionAttributeValues: {
            ':SecondaryId': secondId
        }
    };
    return dynamo.query(params).promise().then(async function (data) {
        return data.Items;
    }).catch(function (err) {
        console.log('db:getDataBySecondaryId:error:', err);
        return null;
    });
}
module.exports = {
    postData,
    getData,
    getAll,
    patchData,
    deleteData,
    getDataBySecondaryId
};