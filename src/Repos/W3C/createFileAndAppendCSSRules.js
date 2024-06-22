require("module-alias/register");
const fs = require("fs");
const path = require("path");

function createFileAndAppendCSSRules(propertyName, fileContent) {
  const outputDir = path.join(global.__basedir, "dist", "repos", "W3C");
  const fileName = propertyName + ".css";
  const filePath = path.join(outputDir, fileName);
  fs.writeFileSync(filePath, fileContent, "utf8");
}

module.exports = { createFileAndAppendCSSRules };
