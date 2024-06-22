require("module-alias/register");
const path = require("path");
const fetchCSSProperties = require("@src/repos/W3C/fetchCSSProperties");
const fetchJSONFromURL = require("@src/repos/W3C/fetchJSONFromURL");
const compileCSSFromJSON_W3C = require("@src/repos/W3C/compileCSSFromJSON_W3C");

global.__basedir = path.resolve(__dirname);

compileCSSFromJSON_W3C.compileCSSFromJSON_W3C();
