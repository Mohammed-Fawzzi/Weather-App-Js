let city = document.querySelector("#inputLocation");
let FindBtn = document.querySelector("#FindBtn");
let today = document.querySelector("#currentDay");
let nextDay = document.querySelector("#nextDay");
let comingDay = document.querySelector("#comingDay");
let currentDate = document.querySelector("#currentDate");
let cityName = document.querySelector("#cityName");
let temp = document.querySelector("#temp");
let text = document.querySelector("#text");
let tempIcon = document.querySelector("#tempIcon");

let nextTempIcon = document.querySelector("#nextTempIcon");
let secondTempBig = document.querySelector("#secondTempBig");
let secondTempsmall = document.querySelector("#secondTempsmall");
let secondText = document.querySelector("#secondText");

let thirdIcon = document.querySelector("#thirdIcon");
let thirdTempBig = document.querySelector("#thirdTempBig");
let thirdTempsmall = document.querySelector("#thirdTempsmall");
let thidText = document.querySelector("#thidText");

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let d = new Date();
// get current day
let currentDay = weekdays[d.getDay()];
today.innerHTML = currentDay;

//get next day
let tomorrow = weekdays[d.getDay() + 1];
nextDay.innerHTML = tomorrow;

// get day after tomorrow
let dayAfterTomorrow = weekdays[d.getDay() + 2];
comingDay.innerHTML = dayAfterTomorrow;

// get the month
let month = months[d.getMonth()];

// get the number of the day
let dayNum = String(d).slice(8, 10);

if (dayNum.startsWith("0", 0)) {
  dayNum = dayNum.slice(1);
  currentDate.innerHTML = dayNum + " " + month;
} else {
  currentDate.innerHTML = dayNum + " " + month;
}

(async function () {
  var request = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=1b62e163b4024e0e81a193317240601&q=cairo&days=3&aqi=no&alerts=no`
  );
  if (request.ok) {
    var result = await request.json();
    cityName.innerHTML = result.location.name;
    temp.innerHTML = `${result.current.temp_c}<span id="dgree" class="position-relative">o</span>C`;
    text.innerHTML = result.current.condition.text;
    tempIcon.setAttribute("src", "https:" + result.current.condition.icon);

    nextTempIcon.setAttribute(
      "src",
      "https:" + result.forecast.forecastday[1].day.condition.icon
    );
    secondTempBig.innerHTML = `${result.forecast.forecastday[1].day.maxtemp_c}<span class="position-relative sec-dgree">o</span>C`;
    secondTempsmall.innerHTML = `${result.forecast.forecastday[1].day.mintemp_c}<span class="position-relative third-dgree">o</span>`;
    secondText.innerHTML = result.forecast.forecastday[1].day.condition.text;

    thirdIcon.setAttribute(
      "src",
      "https:" + result.forecast.forecastday[2].day.condition.icon
    );
    thirdTempBig.innerHTML = `${result.forecast.forecastday[2].day.maxtemp_c}<span class="position-relative sec-dgree">o</span>C`;
    thirdTempsmall.innerHTML = `${result.forecast.forecastday[2].day.mintemp_c}<span class="position-relative third-dgree">o</span>`;
    thidText.innerHTML = result.forecast.forecastday[2].day.condition.text;
  }
})();

city.addEventListener("keyup", getCityWeather);
city.addEventListener("blur", getCityWeather);
FindBtn.addEventListener("click", getCityWeather);

async function getCityWeather() {
  var request = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=1b62e163b4024e0e81a193317240601&q=${city.value}&days=3&aqi=no&alerts=no`
  );
  if (request.ok) {
    var result = await request.json();
    cityName.innerHTML = result.location.name;
    temp.innerHTML = `${result.current.temp_c}<span id="dgree" class="position-relative">o</span>C`;
    text.innerHTML = result.current.condition.text;
    tempIcon.setAttribute("src", "https:" + result.current.condition.icon);

    nextTempIcon.setAttribute(
      "src",
      "https:" + result.forecast.forecastday[1].day.condition.icon
    );

    secondTempBig.innerHTML = `${result.forecast.forecastday[1].day.maxtemp_c}<span class="position-relative sec-dgree">o</span>C`;
    secondTempsmall.innerHTML = `${result.forecast.forecastday[1].day.mintemp_c}<span class="position-relative third-dgree">o</span>`;
    secondText.innerHTML = result.forecast.forecastday[1].day.condition.text;
    thirdIcon.setAttribute(
      "src",
      "https:" + result.forecast.forecastday[2].day.condition.icon
    );

    thirdTempBig.innerHTML = `${result.forecast.forecastday[2].day.maxtemp_c}<span class="position-relative sec-dgree">o</span>C`;
    thirdTempsmall.innerHTML = `${result.forecast.forecastday[2].day.mintemp_c}<span class="position-relative third-dgree">o</span>`;
    thidText.innerHTML = result.forecast.forecastday[2].day.condition.text;
  }
}
