const axios = require("axios");
const fs = require("fs");
const path = require("path");
const {
  containsSpecialCharacter,
} = require("../../utils/containsSpecialCharacter");
const {
  generateMeasurementValues,
} = require("../../utils/generateMeasurementValues");

async function fetchCSSProperties() {
  const url =
    "https://raw.githubusercontent.com/w3c/webref/main/ed/css/CSS.json";
  const inputFile = path.join(
    global.__basedir,
    "src",
    "repos",
    "W3C",
    "localJSON",
    "CSS.json"
  );
  console.log(generateMeasurementValues);
  const outputDir = path.join(global.__basedir, "dist", "repos", "W3C");
  try {
    //const response = await axios.get(url);
    //const responseData = response.data;
    const responseData = JSON.parse(fs.readFileSync(inputFile, "utf8"));
    let counter = 0;
    for (let i = 0; i < responseData.properties.length; i++) {
      const propertyName = responseData.properties[i].name;
      const propertyValues = responseData.properties[i].value.split(" | ");
      const fileName = propertyName + ".css";
      const filePath = path.join(outputDir, fileName);
      let fileContent = "";
      for (value of propertyValues) {
        if (value === "<margin-width>") {
          //loop through values of margin-width, make a class for each value, should be 1rem to 10rem
          fileContent = generateMeasurementValues(propertyName);
          console.log(propertyName);
        } else if (containsSpecialCharacter(value)) {
          counter++;
          continue;
        } else {
          const className = "." + propertyName + "-" + value;

          const classRule =
            className + " {\n  " + propertyName + ": " + value + ";\n}\n";
          fileContent += classRule;
        }
      }
      fs.writeFileSync(filePath, fileContent, "utf8");
    }
    console.log(counter);
  } catch (error) {
    console.error("Error fetching CSS properties data:", error);
    return null;
  }
}

module.exports = { fetchCSSProperties };
