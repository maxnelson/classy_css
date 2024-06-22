require("module-alias/register");
const path = require("path");
const fetchJSONFromURL = require("@src/repos/W3C/fetchJSONFromURL");

async function compileCSSFromJSON_W3C() {
  //fetchCSSProperties.fetchCSSProperties();
  const CSSAlignFile = path.join(
    global.__basedir,
    "src",
    "repos",
    "W3C",
    "localJSON",
    "css-align.json"
  );
  //fetchJSONFromURL.fetchJSONFromURL(CSSAlignFile);
  const CSSFile = path.join(
    global.__basedir,
    "src",
    "repos",
    "W3C",
    "localJSON",
    "CSS.json"
  );
  fetchJSONFromURL.fetchJSONFromURL(CSSFile);
}

module.exports = { compileCSSFromJSON_W3C };
