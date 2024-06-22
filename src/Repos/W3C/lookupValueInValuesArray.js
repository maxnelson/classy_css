require("module-alias/register");
const {
  shallowSplitJoinedString,
} = require("@src/repos/W3C/shallowSplitJoinedString");
const {
  createCSSRuleFromPropertyValue,
} = require("@src/repos/W3C/createCSSRuleFromPropertyValue");
const {
  parseOutComplexPropertyValues,
} = require("@src/repos/W3C/parseOutComplexPropertyValues");
const {
  createFileAndAppendCSSRules,
} = require("@src/repos/W3C/createFileAndAppendCSSRules");

async function lookupValueInValuesArray(propertyValue, valuesArray) {
  const valueObject = valuesArray.find((obj) => obj.name === propertyValue);
  if (valueObject) {
    const valueObjectValues = valueObject.values;
    let valueObjectValuesCompiled = [];
    for (let propertyValueObject in valueObjectValues) {
      valueObjectValuesCompiled.push(
        valueObjectValues[propertyValueObject].name
      );
    }
    return valueObjectValuesCompiled;
  }
}

module.exports = { lookupValueInValuesArray };
