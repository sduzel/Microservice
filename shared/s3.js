const AWS = require('aws-sdk');
/**
 * @author Sebahattin Düzel
 */
var bucketName = process.env.BUCKET_NAME || '-'
async function putObject(data, fileName) {
    var s3bucket = new AWS.S3();
    var params = {
        Bucket: bucketName,
        Key: fileName,
        Body: data
    };
    await s3bucket.putObject(params, function (err, data) {
        if (err) {
            console.log("Error uploading data: ", err);
        } else {
            console.log("Successfully uploaded data to bucket", data);
        }
    }).promise();
    return true;
}

module.exports = {
    putObject   
};
