/**
 * Used to construct standard object list pagination.
 * 
 * data = {
 *    content: {Object},   // content to paginate
 *    total: {Int}         // total amount of object
 * }
 * 
 * query = {
 *    'key1': Object
 *    'key2': [Object, Object, Object]
 * }
 * 
 * @param {String} baseUrl
 * @param {Object} data  // content
 * @param {Int} page
 * @param {Int} range
 * @param {Object} params
 * @returns {Object} JSON 
 */

function constructJSONPagination(baseUrl, data, page, range, params) {

    var json = null;

    const from = page * range - range;
    const to = from + data.content.length;
    const lastPage = (data.total - range > 0) ? Math.ceil(data.total / range) : null;
    const prevPage = page - 1 > 0 ? page - 1 : null;
    const nextPage = page + 1 <= lastPage ? page + 1 : null;

    const query = constructQuery(params);

    if (from <= data.total) {
        json = {
            data: data.content,
            links: {
                first: `${baseUrl}${query}page=1&range=${range}`,
                last: lastPage != null ? `${baseUrl}${query}page=${lastPage}&range=${range}` : null,
                prev: prevPage != null ? `${baseUrl}${query}page=${prevPage}&range=${range}` : null,
                next: nextPage != null ? `${baseUrl}${query}page=${nextPage}&range=${range}` : null
            },
            meta: {
                current_page: page,
                last_page: lastPage,
                from: from,
                to: to,
                current_on_page: to - from,
                total: data.total
            }
        };
    }

    return json.data.length == 0 ? { error: 'No match found...' } : json;
}

module.exports.constructJSONPagination = constructJSONPagination;


/**
 * Constructs query for url.
 * 
 * @param {Object} params 
 * @returns {String} query
 */

function constructQuery(params) {
    var query = '';
    if (params) {
        if (Object.keys(params).includes('param')) {
            query = '/';
            var values = params['param'];
            if (Array.isArray(values)) {
                for (var j = 0; j < values.length; j++)
                    query += `${values[j]}/`;
                console.log(query)
                query = query.slice(0, -1);
            } else query += `${values}`;
            delete params['param'];
            query += '?';
        }
        for (var i = 0; i < Object.keys(params).length; i++) {
            var key = Object.keys(params)[i];
            var values = Object.values(params)[i];
            if (Array.isArray(values)) query += `${key}=${Array.prototype.join.call(values, '+')}`
            else query += `${key}=${values}`;
            query += '&'
        }
        return query;
    }
    return '?';
}


/**
 * Convertes playtime in seconds to understandable time
 * 
 * @param {Int} time
 * @returns {String} time
 */

function readableTime(time = 0) {
    let periods = ['Second', 'Minute', 'Hour', 'Day', 'Week', 'Month', 'Year', 'Decade'];
    let durations = ['60', '60', '24', '7', '4.35', '12', '10'];
    let diff = time;

    var i = 0;
    for (i = 0; diff >= durations[i] && i < durations.length - 1; i++)
        diff /= durations[i];

    diff = Math.round(diff);
    if (diff > 1) periods[i] += 's';

    if (diff == 0) return 'Never Played';
    else return `${diff} ${periods[i]}`;
}

module.exports.readableTime = readableTime;