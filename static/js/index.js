import drawClock from "./clock.js";
import countryCodes from "./service/country-codes.js";
import callApi from "./service/timezonedb.js";
import autocomplete from "./search-country.js";

const canvas = document.getElementById("canvas");
const search = document.getElementById("input-search");
const loader = document.getElementById("loader");
const overlay = document.getElementById("clock-overlay");
const searchError = document.getElementById("search-error");
const textCountry = document.getElementById("text-country");

let ctx = canvas.getContext("2d");
let radius = canvas.height / 2;

ctx.translate(radius, radius);
radius = radius * 0.9;

let intervalID;

window.addEventListener("load", () => {
  loader.classList.add("loader");
  autocomplete(search, countryCodes);
  intervalID = setInterval(() => {
    drawClock({ ctx, radius, now: new Date() });
  }, 1000);
  setTimeout(() => {
    loader.classList.remove("loader");
  }, 1000);
});

const changeTime = async inp => {
  textCountry.innerHTML = "";
  try {
    loader.classList.add("is-hidden");
    searchError.innerHTML = "";
    loader.classList.add("loader");
    overlay.classList.add("clock-overlay");
    let resp = await callApi(`country=${inp.dataset.code}`);
    clearInterval(intervalID);
    intervalID = setInterval(async () => {
      const d = new Date();
      const date = new Date(resp * 1000 + d.getTimezoneOffset() * 60000);
      drawClock({ ctx, radius, now: date });
      resp += 1;
    }, 1000);
    setTimeout(() => {
      textCountry.innerHTML = `Time in ${inp.value}`;
      search.value = "";
      loader.classList.remove("loader");
      overlay.classList.remove("clock-overlay");
    }, 1000);
  } catch (error) {
    searchError.innerHTML = error;
    searchError.classList.remove("u-is-hidden");
    loader.classList.remove("loader");
    overlay.classList.remove("clock-overlay");
  }
};

export { changeTime };
