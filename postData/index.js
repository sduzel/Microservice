const db = require('./shared/db');
const status = require('./shared/status');
/**
 * @author Sebahattin Düzel
 */
exports.handler = async (event) => {
    console.log("EVENT: ", event);
    if (!event.headers || !event.headers.address)
        return status.UNAUTHORIZED();

    const res = JSON.parse(event.body);
    console.log("RES: ", res);
    if (!res || !res.Id)
        return status.NO_PARAM();

    if (!await db.postData(res))
        return status.ERROR();

    return status.POST(res);
};