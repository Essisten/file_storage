const api_error = require('./api-error');

module.exports = function(error, request, response, next)
{
    if (error instanceof api_error)
    {
        response.status(error.status);
        response.write(error.message);
        response.end();
        return;
    }
    response.write('Непредвиденная ошибка.');
    response.end();
    return;
}