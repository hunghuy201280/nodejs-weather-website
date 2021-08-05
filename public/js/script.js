console.log("script loaded");

const resultParagraph = document.querySelector("#result");
const searchButton = document.querySelector("#searchButton");
const addressInput = document.querySelector("#inputAddress");
const titleMessage = document.querySelector("#title");
searchButton.addEventListener("click", (event) => {
  event.preventDefault();
  title.textContent = "Loading...";
  result.textContent = "";
  const address = addressInput.value;

  fetch(`/weather?address=${address}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        title.textContent = "Error";

        result.textContent = data.error;
        result.style.color = "red";
        return;
      }
      title.textContent = data.location;
      result.style.color = "#333333";

      result.textContent = data.forecast;
    });
  });
});
