const db = require('./shared/db');
const status = require('./shared/status');
/** 
 * @author Sebahattin Düzel
 */
exports.handler = async (event) => {
    console.log("EVENT: " + JSON.stringify(event));
    if (!event.headers || !event.headers.address)
        return status.UNAUTHORIZED();

    if (!event.pathParameters || !event.pathParameters.id)
        return status.NO_PARAM();
    else {
        const res = await db.getData(event.pathParameters.id);
        if (!res || (res && res.Id !== event.pathParameters.properidtyId ))
            return status.NO_RECORD_FOUND('No exist, cannot be deleted');
        else {
            if (await db.deleteData(res.Id)) {
                return status.DELETE();
            } else {
                return status.ERROR();
            }
        }
    }
};