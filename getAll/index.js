const db = require('./shared/db');
const status = require('./shared/status');
/**
 * @author Sebahattin Düzel
 */
exports.handler = async (event) => {
    console.log("EVENT: " + JSON.stringify(event));
    if (!event.headers || !event.headers.address)
        return status.UNAUTHORIZED();

    const res = await db.getAll();
    if (!res || res.length == 0)
        return status.NO_RECORD_FOUND('No Records Found');

    return status.GET(res);
};