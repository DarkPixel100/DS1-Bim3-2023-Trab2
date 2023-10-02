const express = require("express");
const app = express();
const helpers = require("./helpers/helpers");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("req-flash");
const appRoutes = require("./routes/approutes");
const { sequelize } = require("./config/database");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("public"));

// session configuration:
app.set("trust proxy", 1);
app.use(
  session({
    secret: "123",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: "auto", maxAge: 600000 },
  })
);

// flash configuration
app.use(flash());

// handlebars configuration
const handlebars = require("express-handlebars");
const handlebars_mod = require("handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const req = require("express/lib/request");
app.engine(
  "handlebars",
  handlebars.engine({
    defaultLayout: false,
    handlebars: allowInsecurePrototypeAccess(handlebars_mod),
    helpers: helpers,
  })
);

// sequelize configuration
sequelize
  .sync()
  .then(() => {
    console.log("Database synced sucessfully");
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });

// view settings
app.set("views", path.join("./views"));
app.set("view engine", "handlebars");

app.use(appRoutes);

app.listen(3000, () => {
  console.log("app is running");
});
