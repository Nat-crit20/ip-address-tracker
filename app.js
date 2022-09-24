const PORT = 3000;
const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.get("/", (req, res) => {
  async function postData(url = "") {
    // Default options are marked with *
    const response = await fetch(
      `https://geo.ipify.org/api/v2/country?apiKey=${process.env.API_KEY}`
    );
    return response.json(); // parses JSON response into native JavaScript objects
  }
  postData().then((data) => {
    console.log(data);
    res.render("./src/index.html"); // JSON data parsed by `data.json()` call
  });
});

app.listen(PORT, () => {
  console.log(`Server is running`);
});
