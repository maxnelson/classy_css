const path = require("path");
const fetchCSSProperties = require("./src/repos/W3C/test");

global.__basedir = path.resolve(__dirname);

fetchCSSProperties.fetchCSSProperties();
