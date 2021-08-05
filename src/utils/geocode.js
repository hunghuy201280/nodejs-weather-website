const request = require("postman-request");
const access_key_geo_coding =
  "pk.eyJ1IjoiaHVuZ2h1eTIwMDkiLCJhIjoiY2tyb29leTZjOGZuMDJwbXQ1eWExc3ZjaCJ9.JibKClCMNdAuVJMwkOEetg";
function geoCode(address, callback) {
  const url_geo_coding = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${access_key_geo_coding}&limit=1`;
  request(
    { url: url_geo_coding, json: true },
    (error, response, { message, features } = {}) => {
      if (error) {
        callback(error, undefined);
        return;
      } else if (response.statusCode != 200) {
        callback(body.message, undefined);
        return;
      } else if (features.length == 0) {
        callback("No result found", undefined);
        return;
      }
      const result = {
        lat: features[0].center[1],
        lng: features[0].center[0],
        location: features[0].place_name,
      };
      callback(undefined, result);
    }
  );
}

module.exports = { geocode: geoCode };
