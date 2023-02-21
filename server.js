const express = require("express");
const mongoose = require("mongoose");
const app = express();
//allows to create environment variables in a .env file
require("dotenv").config();
//import our custom modules
const HttpError = require("./helper/HttpError");
//import different routes
const ContractFormRoutes = require("./routes/contact-routes");

//express building middleware function to allow the json request
app.use(express.json());

//CORS is a browser security concepts.
//Its happen because our frontend and backend are running in two differents domain.
//So below this middleware function attached some headers with the request to allow request from different domain
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE"
  );

  next();
});

//Databe connection with mongoose
mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection;
db.once("error", (err) => console.log(err));
db.on("open", () => {
  console.log("database connected");
});

//Api routes for handeling different request
app.use("/api/user", ContractFormRoutes);

//if our request didn't find any routes it will automatically detect this routes below
app.use((req, res, next) => {
  const errors = new HttpError("Sorry no routes found", 404);
  return next(errors);
});

//expressjs catch synchronous error automatically and create a 500 response with the error message
// but we can manually detect sycronus and asynchronous error
// middleware function with four parameter treat as a error handling middleware
//When there is an error the request will come directly to this error middlewear below

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "unknown error occured" });
});

//listen the connections on the specified port
app.listen(process.env.PORT, () => {
  console.log("server running");
});
