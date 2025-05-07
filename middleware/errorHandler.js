// middleware/errorHandler.js

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  let errorMessage = err.message;

  switch (statusCode) {
    case 400:
      errorMessage = "Bad Request";
      break;
    case 401:
      errorMessage = "Unauthorized";
      break;
    case 403:
      errorMessage = "Forbidden";
      break;
    case 404:
      errorMessage = "Not Found";
      break;
    case 500:
      errorMessage = "Internal Server Error";
      break;
    default:
      errorMessage = err.message || "An unknown error occurred";
  }

  res.status(statusCode).json({
    message: errorMessage,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

// Exporting as default
export default errorHandler;
