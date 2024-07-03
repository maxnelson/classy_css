require("module-alias/register");
const { readdirSync, rmSync } = require("fs");
const path = require("path");
const fetchJSONFromURL = require("@src/utils/fetch_utils/fetchJSONFromURL");
const {
  iterateJSONResponseData,
} = require("@src/repos/W3C/iterateJSONResponseData");
const {
  iterateJSONResponseData_newApproach,
} = require("@src/repos/W3C/newApproach/iterateJSONResponseData_newApproach");

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
  //iterateJSONResponseData(responseDataCSSFileBackgrounds);
  //iterateJSONResponseData_newApproach(responseDataCSSFileBackgrounds);
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
  const CSSFileSample = path.join(
    global.__basedir,
    "src",
    "repos",
    "W3C",
    "localJSON",
    "sample.json"
  );
  const responseDataCSSFileSample = await fetchJSONFromURL.fetchJSONFromURL(
    CSSFileSample
  );
  iterateJSONResponseData(responseDataCSSFileSample);
}

module.exports = { compileCSSFromJSON };
