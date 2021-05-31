const AWS = require('aws-sdk');
/**
 * @author Sebahattin Düzel
 */
async function publishIot(topic,action,data) {
    try {
        const iot = new AWS.IotData();
        const params = {
            topic: topic,
            payload: JSON.stringify({
                action: action,
                data: data
            })
        };
        return iot.publish(params).promise().then(function (res) {
            return true;
        }).catch(function (err) {
            console.log("ERROR >> " + err);
            return false;
        });

    } catch (error) {
        return false;
    }
}
module.exports = {
    publishIot
};