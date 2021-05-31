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

    var res = JSON.parse(event.body);
    var result = await db.getData(event.pathParameters.id);
    if (!result || result.Id !== event.pathParameters.id)
        return status.NO_RECORD_FOUND('No data found!');

    if (await db.patchWakeUp({...result,...res}))
        return status.PATCH(wakeup);

    return status.ERROR();
}; 