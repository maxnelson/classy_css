require("module-alias/register");
const path = require("path");
const fetchJSONFromURL = require("@src/repos/W3C/fetchJSONFromURL");
const { parsePropDefValue } = require("@src/repos/W3C/css-grammar-parser");

async function compileCSSFromJSON_W3C() {
  /*
  const string1 =
    "normal | <content-distribution> | <overflow-position>? [ <content-position> | left | right ]";
  const string2 =
    "auto | normal | stretch | <baseline-position> | <overflow-position>? [ <self-position> | left | right ]";
  const string3 =
    "normal | bold | bolder | lighter | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | inherit";
  const parsedString = parsePropDefValue(string3);
  console.log(JSON.stringify(parsedString));
  */

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
