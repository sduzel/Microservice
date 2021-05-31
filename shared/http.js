
const AWS = require("aws-sdk");
const url = require('url');
const https = require('https');
const aws4 = require('aws4');

const send = async (params) => {
    const awsHost = url.parse(params.url).hostname;
    const awsPath = url.parse(params.url).path;
    return new Promise((resolve, reject) => {
        var options = {
            host: awsHost,
            path: awsPath,
            method: params.method,
            headers: {}
        };
        if (params.method === 'POST' || params.method === 'PATCH') {
            var requestBody = JSON.stringify(params.body);
            options.headers['Content-Type'] = 'application/json';
            options.headers['Content-Length'] = Buffer.byteLength(requestBody);
            options['body'] = requestBody;
        }
        if (params.address)
            options.headers['address'] = params.address;
        if (params.key)
            aws4.sign(options, {
                accessKeyId: params.key.accessKey,
                secretAccessKey: params.key.secretKey
            });
        console.log("HTTP REQUEST : " + JSON.stringify(options));
        var request = https.request(options, (response) => {
            var responseBody = '';
            response.on('data', (data) => {
                responseBody += data;
            });
            response.on('end', () => {
                if ((response.statusCode === 200 || response.statusCode === 201) && (responseBody)){
                    console.log("HTTP RESPONSE : " + JSON.stringify({
                        statusCode: response.statusCode,
                        body: JSON.parse(responseBody)
                    }));
                    resolve({
                        statusCode: response.statusCode,
                        body: JSON.parse(responseBody)
                    });
                    
                }
                else{
                     console.log("HTTP RESPONSE : " + JSON.stringify({
                        statusCode: response.statusCode,
                        body: (IsJsonString(responseBody)) ? JSON.parse(responseBody) : undefined
                    }));
                    resolve({
                        statusCode: response.statusCode,
                        body: (IsJsonString(responseBody)) ? JSON.parse(responseBody) : undefined
                    });
                   
                }
            });
        });
        request.on('error', (err) => {
            reject(err.message);
        });
        if (params.method === 'POST' || params.method === 'PATCH')
            request.write(requestBody);
        request.end();
    });
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
    send   
};
