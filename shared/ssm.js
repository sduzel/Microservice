

const ssm = new AWS.SSM();
const getSystemParameters = async (urlName, keyName) => {
    const params = {
        Names: [urlName + '_' + stage, keyName + '_' + stage]
    };
    return ssm.getParameters(params).promise().then(res => {
        if (res.Parameters[0].Name === urlName + '_' + stage) {
            return {
                Urls: JSON.parse(res.Parameters[0].Value),
                Keys: JSON.parse(res.Parameters[1].Value)
            };
        }
        return {
            Urls: JSON.parse(res.Parameters[1].Value),
            Keys: JSON.parse(res.Parameters[0].Value)
        };
    }).catch(err => {
        console.log("getSystemParameter:Err", err);
        return null;
    });
};
module.exports = {
    getSystemParameters
};
