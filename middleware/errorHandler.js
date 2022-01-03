const { logEvents } = require("./logEvent");

const errorHandler = (error, req, res, next) => {
  logEvents(`${error.name} : ${error.message}`, "errorLog.txt");
  res.status(500).send(error.message);
};
module.exports = { errorHandler };
