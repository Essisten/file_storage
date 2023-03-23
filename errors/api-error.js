class ApiError extends Error
{
    constructor(status, message)
    {
        super();
        this.status = status;
        this.message = message;
    }

    static BadRequest(message)
    {
        return new ApiError(404, message);
    }

    static Internal(message)
    {
        return new ApiError(500, message);
    }
}

module.exports = ApiError;