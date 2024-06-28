require("module-alias/register");
const { readdirSync, rmSync } = require("fs");
const path = require("path");
const fetchJSONFromURL = require("@src/utils/fetch_utils/fetchJSONFromURL");
const {
  iterateJSONResponseData,
} = require("@src/repos/W3C/iterateJSONResponseData");

async function compileCSSFromJSON() {
  const distDirectory = path.join(global.__basedir, "dist", "repos", "W3C");
  readdirSync(distDirectory).forEach((file) => {
    rmSync(distDirectory + "/" + file);
  });
  const CSSAlignFile = path.join(
    global.__basedir,
    "src",
    "repos",
    "W3C",
    "localJSON",
    "css-align.json"
  );
  const responseDataCSSAlignFile = await fetchJSONFromURL.fetchJSONFromURL(
    CSSAlignFile
  );
  //iterateJSONResponseData(responseDataCSSAlignFile);
  const CSSFileBackgrounds = path.join(
    global.__basedir,
    "src",
    "repos",
    "W3C",
    "localJSON",
    "css-backgrounds.json"
  );
  const responseDataCSSFileBackgrounds =
    await fetchJSONFromURL.fetchJSONFromURL(CSSFileBackgrounds);
  iterateJSONResponseData(responseDataCSSFileBackgrounds);
  const CSSFile = path.join(
    global.__basedir,
    "src",
    "repos",
    "W3C",
    "localJSON",
    "CSS.json"
  );
  const responseDataCSSFile = await fetchJSONFromURL.fetchJSONFromURL(CSSFile);
  //iterateJSONResponseData(responseDataCSSFile);
}

module.exports = { compileCSSFromJSON };
