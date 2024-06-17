const axios = require("axios");
const fs = require("fs");
const path = require("path");

async function fetchCSSProperties() {
  const url =
    "https://raw.githubusercontent.com/w3c/webref/main/ed/css/CSS.json";
  const outputDir = path.join(global.__basedir, "dist", "Repos", "W3C");
  try {
    const response = await axios.get(url);
    for (let i = 0; i < response.data.properties.length; i++) {
      const propertyName = response.data.properties[i].name;
      const propertyValues = response.data.properties[i].value.split(" | ");
      const fileName = propertyName + ".css";
      const filePath = path.join(outputDir, fileName);
      let fileContent = "";
      for (value of propertyValues) {
        if (value[0] === "<") {
          continue;
        }

        const className = "." + propertyName + "-" + value;
        const classRule =
          className + " {\n  " + propertyName + ": " + value + ";\n}\n";
        fileContent += classRule;
      }
      fs.writeFileSync(filePath, fileContent, "utf8");
    }
  } catch (error) {
    console.error("Error fetching CSS properties data:", error);
    return null;
  }
}
module.exports = { fetchCSSProperties };
