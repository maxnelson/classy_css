require("module-alias/register");
const path = require("path");
const fetchJSONFromURL = require("@src/repos/W3C/fetchJSONFromURL");
const { parsePropDefValue } = require("@src/repos/W3C/css-grammar-parser");

async function compileCSSFromJSON_W3C() {
  const CSSAlignFile = path.join(
    global.__basedir,
    "src",
    "repos",
    "W3C",
    "localJSON",
    "css-align.json"
  );
  const responseDataCSSAlignFile =
    fetchJSONFromURL.fetchJSONFromURL(CSSAlignFile);
  parsePropertyValuesArray(responseDataCSSAlignFile);
  const CSSFile = path.join(
    global.__basedir,
    "src",
    "repos",
    "W3C",
    "localJSON",
    "CSS.json"
  );
  const responseDataCSSFile = fetchJSONFromURL.fetchJSONFromURL(CSSFile);
  parsePropertyValuesArray(responseDataCSSFile);
}

module.exports = { compileCSSFromJSON_W3C };
