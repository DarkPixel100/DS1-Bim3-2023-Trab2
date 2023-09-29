const express = require("express");
const app = express();
const helpers = require("./helpers/helpers");
const path = require("path");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const session = require("express-session");
const SessionStore = require("express-session-sequelize")(session.Store);
const appRoutes = require("./routes/approutes");
const { sequelize, Sequelize } = require("./config/database");

app.use(flash());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const sequelizeSessionStore = new SessionStore({
  db: sequelize,
});

app.set("trust proxy", 1);
app.use(
  session({
    secret: "123",
    store: sequelizeSessionStore,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: "auto", maxAge: 300000 },
  })
);

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
