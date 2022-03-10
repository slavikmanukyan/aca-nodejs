/* eslint-disable no-underscore-dangle */
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mongoose = require("mongoose");
const Orders = require("./models/orders");

const authRouter = require("./routes/auth.route");
const usersRoute = require("./routes/users.route");

const app = express();

app.set("view engine", "pug");

app.use(express.json());

app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(cookieParser());

app.use(
  session({
    secret: "keyboard cat",
    name: "sessionId",
  })
);

app.use(
  methodOverride((req) => {
    if (req.body && typeof req.body === "object" && req.body._method) {
      // look in urlencoded POST bodies and delete it
      const method = req.body._method;
      delete req.body._method;
      return method;
    }
    return req.method;
  })
);

app.use(morgan("dev"));

app.use(express.static("public"));

app.use("/auth", authRouter);
app.use("/users", usersRoute);

app.get("/orders", async (req, res) => {
  const orders = await Orders.find({}).populate("user", "username");
  res.json(orders);
});

app.get("/view", (req, res) => res.render("index"));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connection has been established successfully.");
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
}

main();
