require("module-alias/register");
const fs = require("fs");
const {
  parsePropertyValuesArray,
} = require("@src/repos/W3C/parsePropertyValuesArray");

async function fetchJSONFromURL(inputFile) {
  try {
    const responseData = JSON.parse(fs.readFileSync(inputFile, "utf8"));
    parsePropertyValuesArray(responseData);
  } catch (error) {
    console.error("Error fetching CSS properties data:", error);
    return null;
  }
}

module.exports = { fetchJSONFromURL };
