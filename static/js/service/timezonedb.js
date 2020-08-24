// http://api.timezonedb.com/v2.1/list-time-zone?key=CRR6HH6O928L&format=json&country=NZ
const API_KEY = "CRR6HH6O928L";
const BASE_URL = `https://api.timezonedb.com/v2.1/list-time-zone?key=${API_KEY}&format=json&`;

async function callApi(endpoint) {
  const url = BASE_URL + endpoint;
  const response = await fetch(url, {
    method: "GET",
    "Content-Type": "application/json"
  });

  const data = await response.json();

  if (!response.ok) {
    throw "Ocurrio un error";
  }

  if (data.status === "FAILED") throw data.message;

  return data.zones[0].timestamp;
}

export default callApi;
