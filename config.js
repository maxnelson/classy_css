const path = require("path");
global.__basedir = path.resolve(__dirname, "..");

console.log(global.__basedir);
