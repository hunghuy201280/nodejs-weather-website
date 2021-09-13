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
const port = process.env.PORT || 3000;

//setup handlers engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
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

app.get("/weather", async (req, res) => {
  if (!req.query.address && !req.query.lat && !req.query.lng) {
    return res.send({
      error: "Address or position must be provided!",
    });
  }

  if (req.query.lat && req.query.lng) {
    forecast.getForecast(req.query.lat, req.query.lng, (err, result) => {
      if (err) {
        return res.send({
          error: err,
        });
      }
      return res.send({
        forecast: result.forecast,
        weather_icon: result.weather_icon,
      });
    });
    return;
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
      return res.send({
        forecast: result.forecast,
        location,
        address: req.query.address,
        weather_icon: result.weather_icon,
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

app.listen(port, () => {
  console.log(`Server started on port ${port}.`);
});
