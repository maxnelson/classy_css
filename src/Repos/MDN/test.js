const axios = require("axios");
const fs = require("fs");
const path = require("path");

async function fetchCSSProperties() {
  const outputDir = path.join(__dirname, "..", "dist", "repos", "MDN");
  const filePath = path.join(outputDir, "test.txt");
  const url =
    "https://raw.githubusercontent.com/mdn/data/main/css/properties.json";
  try {
    const response = await axios.get(url);
    //console.log(response.data);

    const responseText = Object.keys(response.data).map((key) => {
      const property = response.data[key];
      return `${key} - ${property.syntax}`;
    });
    console.dir(responseText);
    fs.writeFileSync(filePath, JSON.stringify(responseText), "utf8");

    return response.data;
  } catch (error) {
    console.error("Error fetching CSS properties data:", error);
    return null;
  }
}
fetchCSSProperties();
