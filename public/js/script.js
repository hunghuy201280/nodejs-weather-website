console.log("script loaded");

const resultParagraph = document.querySelector("#result");
const searchButton = document.querySelector("#searchButton");
const addressInput = document.querySelector("#inputAddress");
const titleMessage = document.querySelector("#title");
const weather_icon_img = document.querySelector("#weather_icon_img");
searchButton.addEventListener("click", (event) => {
  event.preventDefault();
  title.textContent = "Loading...";
  result.textContent = "";
  weather_icon_img.src = "";

  const address = addressInput.value;

  fetch(`/weather?address=${address}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        title.textContent = "Error";
        weather_icon_img.src = "";

        result.textContent = data.error;
        result.style.color = "red";
        return;
      }

      title.textContent = data.location;
      result.style.color = "#333333";
      weather_icon_img.src = data.weather_icon;
      result.textContent = data.forecast;
    });
  });
});
