require("module-alias/register");
const fs = require("fs");

async function fetchJSONFromURL(inputFile) {
  let responseData;
  try {
    responseData = JSON.parse(fs.readFileSync(inputFile, "utf8"));
  } catch (error) {
    console.error("Error fetching CSS properties data:", error);
    return null;
  }
  return responseData;
}

module.exports = { fetchJSONFromURL };
