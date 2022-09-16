// importing the dependencies
const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const notes = require("./database/notes");
const userRoutes = require("./routes/userRoutes");
const connectDB = require("./config/db");
const path = require("path");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

// defining the Express app
const app = express();

connectDB();

app.use(express.json());

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.send("API is running smooth");
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

// start the server
app.listen(5000, async () => {
  console.log("listening on port 5000");
});
