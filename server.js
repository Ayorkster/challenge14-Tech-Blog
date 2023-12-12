const path = require("path");
const express = require("express");
const session = require("express-session");
const flash = require('express-flash');
const routes = require('./controllers'); 
const exphbs = require("express-handlebars");
const sequelize = require("./config/connection");
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const helpers = require("./utils/helpers");

const app = express();


const sess = {
  secret: "secret", 
  cookie: {
    maxAge: 3000000, 
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));
app.use(flash());

app.use((req, res, next) => {
  res.locals.logged_in = req.session.logged_in;
  res.locals.userId = req.session.user_id;
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));



app.get('/js/login.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  res.sendFile(path.join(__dirname, 'public', 'js', 'login.js'));
});



app.get('/signup', (req, res) => {
  res.render('signup'); 
});

app.get('/login', (req, res) => {
  res.render('login'); 
});

app.use(routes);

app.set("views", path.join(__dirname, "views"));

const hbs = exphbs.create({ helpers });

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

sequelize.sync({ force: false }).then(() => {
  app.listen(process.env.PORT || 3001);
});