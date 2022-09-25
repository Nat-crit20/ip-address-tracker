//Map
var map = L.map("map").setView([51.505, -0.09], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap",
}).addTo(map);
let customIcon = L.icon({
  iconUrl: "../images/icon-location.svg",
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
});

var marker = L.marker([51.5, -0.09], { icon: customIcon }).addTo(map);

//ip search
async function postData(url = "") {
  // Default options are marked with *
  const response = await fetch(
    `https://geo.ipify.org/api/v2/country?apiKey=${process.env.API_KEY}`
  );
  return response.json(); // parses JSON response into native JavaScript objects
}

postData().then((data) => {
  console.log(data); // JSON data parsed by `data.json()` call
});
