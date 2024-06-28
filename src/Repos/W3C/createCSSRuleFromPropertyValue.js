require("module-alias/register");

function createCSSRuleFromPropertyValue(propertyName, propertyValue) {
  const propertyValueFormatted =
    propertyValue.indexOf(" ") == -1
      ? propertyValue
      : propertyValue.replace(" ", "-");
  const className = "." + propertyName + "-" + propertyValueFormatted;
  const classRule =
    className + " {\n  " + propertyName + ": " + propertyValue + ";\n}\n";
  //console.log(classRule);
  return classRule;
}

const createCSSRuleFromCustomPrimitiveValue = (
  propertyName,
  propertyValueName,
  propertyValue
) => {
  const propertyValueNameFormatted =
    propertyValueName.indexOf(" ") == -1
      ? propertyValueName
      : propertyValueName.replace(" ", "-");
  const className = "." + propertyName + "-" + propertyValueNameFormatted;
  const classRule =
    className + " {\n  " + propertyName + ": " + propertyValue + ";\n}\n";
  //console.log(classRule);
  return classRule;
};

module.exports = {
  createCSSRuleFromPropertyValue,
  createCSSRuleFromCustomPrimitiveValue,
};
