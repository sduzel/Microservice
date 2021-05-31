const UNAUTHORIZED = () => {
    return {
        statusCode: 403,
        body: JSON.stringify('Not authorized')
    };
};

const GET = (a) => {
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
        },
        body: JSON.stringify(a)
    };
};

const DELETE = () => {
    return {
        statusCode: 204,
        headers: {
            "Access-Control-Allow-Origin": "*",
        }
    };
};

const PATCH = (a) => {
    return {
        statusCode: 200,
        body: JSON.stringify(a),
        headers: {
            "Access-Control-Allow-Origin": "*",
        }
    };
};

const POST = (a) => {
    return {
        statusCode: 201,
        body: JSON.stringify(a),
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
        }
    };
};

const ALREADY_EXISTS = () => {
    return {
        statusCode: 409,
        body: JSON.stringify('Already exists')
    };
};

const NO_PARAM = () => {
    return {
        statusCode: 405,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
        },
        body: JSON.stringify({
            Message: 'Missing Parameter(s)'
        })
    };
};

const ERROR = () => {
    return {
        statusCode: 400
    };
};

const NO_RECORD_FOUND = (a) => {
    return {
        statusCode: 404,
        body: JSON.stringify(a)
    };
};

const ALREADY_REGISTERED = (a) => {
    return {
        statusCode: 400,
        body: JSON.stringify(a)
    };
};

const MSG_OBJ = (a) => {
    return {
        Message: a
    };
};

const ERROR_MSG = (code, msgCode, msg) => {
    return {
        statusCode: code,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
        },
        body: JSON.stringify({
            Code: msgCode,
            Message: msg
        })
    };
};

const SUCCESS = (code) => {
    return {
        statusCode: code,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
        }
    };
};

module.exports = {
    UNAUTHORIZED,
    GET,
    POST,
    ALREADY_EXISTS,
    NO_PARAM,
    ERROR,
    NO_RECORD_FOUND,
    PATCH,
    DELETE,
    ALREADY_REGISTERED,
    MSG_OBJ,
    ERROR_MSG,
    SUCCESS
};
