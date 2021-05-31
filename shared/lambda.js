const AWS = require('aws-sdk');
/** 
 * @author Sebahattin Düzel
 */

const callProcessAsyncLambda = async (res) => {
    const lambda = new AWS.Lambda();
    return lambda.invoke({
        InvocationType: "Event",
        FunctionName: `processAsyncLambda`,
        LogType: 'Tail',
        Payload: JSON.stringify(res)
    }).promise().then(data => {
        console.log('Invoked processAsyncLambda', data);
        return {
            statusCode: 200,
            body: JSON.stringify('start process..')
        };
    }).catch(err => {
        console.log('processAsyncLambda:Err', err);
        return null;
    });
};

module.exports = {
    callProcessAsyncLambda
};