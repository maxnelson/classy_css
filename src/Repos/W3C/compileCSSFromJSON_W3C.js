require("module-alias/register");
const path = require("path");
const fetchJSONFromURL = require("@src/repos/W3C/fetchJSONFromURL");

async function compileCSSFromJSON_W3C() {
  //fetchCSSProperties.fetchCSSProperties();
  const inputFile = path.join(
    global.__basedir,
    "src",
    "repos",
    "W3C",
    "localJSON",
    "css-align.json"
  );
  fetchJSONFromURL.fetchJSONFromURL(inputFile);
}

module.exports = { compileCSSFromJSON_W3C };
