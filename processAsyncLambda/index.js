var status = require('./shared/status');
var sqs = require('./shared/sqs');
exports.handler = async (event) => {
    console.log("Event: ", JSON.stringify(event));
    if (!event  || !event.Action || !event.Data)
        return status.NO_PARAM(undefined);
    return status.POST()
};