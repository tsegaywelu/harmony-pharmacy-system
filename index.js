const express = require("express");
const RouterInitalizer = require("./routes/InitializerRouter");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose"); // Import mongoose
const connectDB = require("./config/dbConfig");
const session = require("express-session");
const RedisStore = require("connect-redis").default;
const redis = require("redis");
const app = express();
const redisClient = redis.createClient({ legacyMode: true });
connectDB()
  .then(() => {
    app.use(
      session({
        store: new RedisStore({ client: redisClient }),
        secret: "my_session_secret",
        resave: true,
        saveUninitialized: false,
        cookie: {
          secure: true,
          httpOnly: false,
          maxAge: 60000,
        },
      })
    );
    console.log("DB Connected");
    //app.use(cors());

    app.use(
      cors({
        origin: "http://localhost:3000",
        credentials: true, // Allow requests with credentials
      })
    );

    app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // Verify RouterInitializer is a function before using it as middleware
    if (typeof RouterInitalizer === "function") {
      app.use("/api", RouterInitalizer);
    } else {
      console.error("RouterInitializer must be a middleware function");
    }

    app.get("/", (req, res) => {
      res.send("API Working ");
    });
    // Swagger Configuration
    const swaggerOptions = {
      swaggerDefinition: {
        openapi: "3.0.0",
        info: {
          title: "Users API",
          version: "1.0.0",
        },
      },
      apis: ["./routes/*.js"],
    };
    const swaggerSpec = swaggerJSDoc(swaggerOptions);
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    const PORT = process.env.PORT || 2119;
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
