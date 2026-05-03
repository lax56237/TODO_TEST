const errorHandler = (err, req, res, next) => {
    console.error(err.message);

    const statusCode = err.status || 500;
    const message = err.message || "Internal Server Error";

    const response = {
        success: false,
        message: message,
    };

    if (process.env.NODE_ENV === "development" && err.originalError) {
        response.stack = err.stack;
    }

    res.status(statusCode).json(response);
};

module.exports = errorHandler;