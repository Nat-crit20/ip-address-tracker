const API_KEY = "at_xC7hqwe1iN5d00HowbYgGcu6tDyVF";

//
const ipSearch = document.getElementById("ip-search");
const btn = document.getElementById("basic-addon2");
const ipContent = document.querySelector(".ip-address");
const ipLocationContent = document.querySelector(".location");
const timezoneContent = document.querySelector(".timezone");
const ispContent = document.querySelector(".isp");

const validIP =
  /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

//ip search
async function postData(ipAdress) {
  const response = await fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=${ipAdress}`
  );
  return response.json();
}

//Map
var map = L.map("map").setView([0, 0], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap",
}).addTo(map);

let customIcon = L.icon({
  iconUrl: "../images/icon-location.svg",
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
});

//functions

function loadMap(lat, lng) {
  map.panTo(L.latLng(lat, lng), 13);
  let marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);
}

function setData(data) {
  ipContent.innerHTML = data.ip;
  ipLocationContent.innerHTML = `${data.location.city}, ${data.location.region}`;
  timezoneContent.innerHTML = data.location.timezone;
  ispContent.innerHTML = data.isp;
}

function searchIp(ipAdress) {
  if (validIP.test(ipAdress)) {
    postData(ipAdress)
      .then((data) => {
        setData(data);
        console.log(data.location.timezone);
        let lng = data.location.lng;
        let lat = data.location.lat;
        loadMap(lat, lng);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    alert("Enter valid ip address");
  }
}

searchIp(`192.212.174.101`);

btn.addEventListener("click", function (e) {
  e.preventDefault();
  searchIp(ipSearch.value);
});
