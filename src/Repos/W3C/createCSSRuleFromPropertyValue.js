require("module-alias/register");

function createCSSRuleFromPropertyValue(propertyName, propertyValue) {
  const propertyValueFormatted =
    propertyValue.indexOf(" ") == -1
      ? propertyValue
      : propertyValue.replace(" ", "-");
  const className = "." + propertyName + "-" + propertyValueFormatted;
  const classRule =
    className + " {\n  " + propertyName + ": " + propertyValue + ";\n}\n";
  return classRule;
}

module.exports = { createCSSRuleFromPropertyValue };
