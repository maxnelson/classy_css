require("module-alias/register");
const path = require("path");
const { compileCSSFromJSON } = require("@src/repos/W3C/compileCSSFromJSON");

global.__basedir = path.resolve(__dirname);

compileCSSFromJSON();
