const db = require('./shared/db');
const status = require('./shared/status');
/**
 * @author Sebahattin Düzel
 */

exports.handler = async (event) => {
    console.log("EVENT: " + JSON.stringify(event));
    if (!event.headers || !event.headers.address)
        return status.UNAUTHORIZED();

    if (!event.pathParameters || !event.pathParameters.id )
        return status.NO_PARAM();
    else {
        const res = await db.getData(event.pathParameters.id);
        if (!res || res.length == 0)
            return status.NO_RECORD_FOUND('No Records Found');
        else
            return status.GET(res);
    }
};