const path = require("path");

const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
//Path for express config
const publicDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
const app = express();

//setup handlers engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup stadic directory to serve
app.use(express.static(publicDir));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Hung Huy",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Hung Huy",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    message: "This is help page of Weather App!",
    name: "Hung Huy",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    message: "Help article not found.",
    title: "404",

    name: "Hung Huy",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Address must be provided!",
    });
  }

  geocode.geocode(req.query.address, (err, { lat, lng, location } = {}) => {
    if (err) {
      return res.send({
        error: err,
      });
    }
    forecast.getForecast(lat, lng, (err, result) => {
      if (err) {
        return res.send({
          error: err,
        });
      }
      const { weather_descriptions, temperature, feelslike } = result.current;
      return res.send({
        forecast: `${weather_descriptions[0]}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out in ${location}.`,
        location,
        address: req.query.address,
      });
    });
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    name: "Hung Huy",
    title: "404",
    message: "Page not found.",
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000.");
});
