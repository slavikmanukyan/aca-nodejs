const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mongoose = require("mongoose");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const Orders = require("./models/orders");
const logger = require("./utils/logger");

const authRouter = require("./routes/auth.route");
const usersRoute = require("./routes/users.route");

const swaggerSpecs = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ticketing System",
      version: "1.0.0",
    },
  },
  apis: ["routes/*.js"],
});

const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

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
  logger.info(`Server is running on port ${process.env.PORT}`);
});

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    logger.info("Connection has been established successfully.");
  } catch (err) {
    logger.error("Unable to connect to the database:", err);
  }
}

main();
