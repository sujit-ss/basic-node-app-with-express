const accessorOrigin = ["https://www.google.com", "http://localhost:8008"];

const corsOptions = {
  origin: (origin, callback) => {
    if (accessorOrigin.indexOf(origin) !== 1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by cors"));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;