require("module-alias/register");

function createCSSRuleFromPropertyValue(
  propertyName,
  propertyValue,
  propertyValueFormatted
) {
  //const fileName = propertyName + ".css";
  //const filePath = path.join(outputDir, fileName);
  //let fileContent = "";
  const className = "." + propertyName + "-" + propertyValueFormatted;
  const classRule =
    className + " {\n  " + propertyName + ": " + propertyValue + ";\n}\n";
  //fileContent += classRule;
  //fs.writeFileSync(filePath, fileContent, "utf8");
  return classRule;
}

module.exports = { createCSSRuleFromPropertyValue };
