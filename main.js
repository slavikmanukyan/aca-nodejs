const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const { validationError, authorizationError } = require("./middlewares/errorHandlers");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get(
  "/",
  (req, res) => {
    res.json([
      {
        name: "John",
      },
    ]);
  }
);

app.get("/users", (req, res) => {
  res.json([
    {
      name: "John",
    },
    {
      name: "Jane",
    },
  ]);
});

app.use(validationError, authorizationError, );


app.listen(4001, () => {
  console.log("Server is running on port 4001");
});
