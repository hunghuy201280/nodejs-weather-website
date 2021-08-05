const access_key_weather_stack = "357eab86aa3321da6985c6de5ed5fd3a";
const request = require("postman-request");

function getForecast(lat, lng, callback) {
  const url_weather_stack = `http://api.weatherstack.com/current?access_key=${access_key_weather_stack}&query=${lat},${lng}`;
  request({ url: url_weather_stack, json: true }, (error, response, body) => {
    if (error) {
      callback(
        `Unable to get weather data
      error: ${error}`,
        undefined
      );
      return;
    } else if (body.error) {
      callback(body.error.info, undefined);
      return;
    }
    const { weather_descriptions, temperature, feelslike, humidity } =
      body.current;
    const forecast = `${weather_descriptions[0]}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out. The humidity is ${humidity}%`;
    const result = {
      forecast,
      weather_icon: body.current.weather_icons[0],
    };
    callback(undefined, result);
  });
}

module.exports = {
  getForecast: getForecast,
};
