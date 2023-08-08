const sendErrorDev = (err, res) => {
  console.log(err);
  return res.status(err.satusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

const globalErrorHandler = (err, req, res, next) => {
  err.satusCode = err.statusCode || 500;
  err.status = err.status || 'fail';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  }
};

module.exports = globalErrorHandler;
