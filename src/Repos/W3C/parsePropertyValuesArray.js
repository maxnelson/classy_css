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
const { lookupValueInValuesArray } = require("./lookupValueInValuesArray");

async function parsePropertyValuesArray(responseData) {
  const variableValuesArray = responseData.values;
  for (let i = 0; i < responseData.properties.length; i++) {
    let fileContent = "";
    const propertyName = responseData.properties[i].name;
    const propertyValueJoinedString = responseData.properties[i].value;
    if (propertyValueJoinedString) {
      const shallowSplitPropertyValues = shallowSplitJoinedString(
        propertyValueJoinedString
      );
      const basicPropertyValues = parseOutComplexPropertyValues(
        shallowSplitPropertyValues
      );

      for (propertyValue of basicPropertyValues) {
        if (propertyValue[0] === "<") {
          const valueObjectValuesCompiled = lookupValueInValuesArray(propertyValue, variableValuesArray);
            for (propertyValue of valueObjectValuesCompiled) {
              if (propertyValue.indexOf(" ") == -1) {
                var propertyValueFormatted = propertyValue;
              } else {
                var propertyValueFormatted = propertyValue.replace(" ", "-");
              }
              const CSSRule = createCSSRuleFromPropertyValue(
                propertyName,
                propertyValue,
                propertyValueFormatted
              );
              fileContent += CSSRule;
            }
          }
        } else {
          const CSSRuleString = createCSSRuleFromPropertyValue(
            propertyName,
            propertyValue,
            propertyValue
          );
          fileContent += CSSRuleString;
        }
      }
      console.log(fileContent);
      createFileAndAppendCSSRules(propertyName, fileContent);
    }
  }
}

module.exports = { parsePropertyValuesArray };
