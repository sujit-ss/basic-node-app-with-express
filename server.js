const express = require("express");
const app = express();
const path = require("path");
const { logger } = require("./middleware/logEvent");
const cors = require("cors");
const { errorHandler } = require("./middleware/errorHandler");
const corsOptions = require("./config/corsOption");
const { jwtAuthorization } = require("./middleware/jwtAuthorization");
const PORT = process.env.PORT || 8008;

const dirOption = { root: __dirname };

app.use(logger);

app.use(cors(corsOptions));

//Built-in middleware to handle urlencoded data or form data
app.use(express.urlencoded({ extended: false }));

// Built-in middleware to handle json data
app.use(express.json());

// Serve static files
app.use("/", express.static(path.join(__dirname, "/public")));
app.use("/subdir", express.static(path.join(__dirname, "/public")));

// routing
app.use("/", require("./routes/root"));
app.use("/subdir", require("./routes/subdir"));
app.use("/api/users", require("./routes/api/users"));

app.use(jwtAuthorization);
app.use("/api/employee", require("./routes/api/imployees"));
app.use("/api/acounts", require("./routes/api/accounts"));

app.all("/*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile("./views/error404.html", dirOption);
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not found!" });
  } else {
    res.type("txt").send("404 Not found!");
  }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server runnig on port ${PORT}`));
