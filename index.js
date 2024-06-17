const path = require("path");
const fetchCSSProperties = require("./src/Repos/W3C/test");

global.__basedir = path.resolve(__dirname);

fetchCSSProperties.fetchCSSProperties();
console.log(global.__basedir);
console.log(fetchCSSProperties);
