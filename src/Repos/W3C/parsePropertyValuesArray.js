require("module-alias/register");
const {
  shallowSplitJoinedString,
} = require("@src/utils/string_utils/shallowSplitJoinedString");
const {
  createCSSRuleFromPropertyValue,
} = require("@src/repos/W3C/createCSSRuleFromPropertyValue");
const {
  parseOutComplexPropertyValues,
} = require("@src/repos/W3C/parseOutComplexPropertyValues");
const {
  createFileAndAppendCSSRules,
} = require("@src/repos/W3C/createFileAndAppendCSSRules");
const {
  lookupValueInValuesArray,
} = require("@src/repos/W3C/lookupValueInValuesArray");
const {
  separateSubArray,
} = require("@src/utils/string_utils/separateSubArray");
const {
  extractArrayFromString,
} = require("@src/utils/string_utils/extractArrayFromString");

async function parsePropertyValuesArray(responseData) {
  const variableValuesArray = responseData.values;
  for (let i = 0; i < responseData.properties.length; i++) {
    let fileContent = "";
    const propertyName = responseData.properties[i].name;
    const propertyValueJoinedString = responseData.properties[i].value;
    if (propertyValueJoinedString) {
      console.log(propertyName);
      console.log(propertyValueJoinedString);

      const arrayFromString = extractArrayFromString(propertyValueJoinedString);
      console.log(propertyName);
      const shallowSplitPropertyValues =
        shallowSplitJoinedString(arrayFromString);
      console.log(arrayFromString);

      //console.log(shallowSplitPropertyValues);
      //const anotherArray = separateSubArray(shallowSplitPropertyValues);
      //console.log(anotherArray);
      if (shallowSplitPropertyValues.length === 0) {
        const basicPropertyValues = parseOutComplexPropertyValues(
          shallowSplitJoinedString
        );

        console.log(basicPropertyValues);

        for (let propertyValue of basicPropertyValues) {
          if (propertyValue[0] === "<") {
            const valueObjectValuesCompiled = lookupValueInValuesArray(
              propertyValue,
              variableValuesArray
            );
            if (valueObjectValuesCompiled) {
              for (let propertyValue of valueObjectValuesCompiled) {
                if (propertyValue.indexOf(" ") == -1) {
                  var propertyValueFormatted = propertyValue;
                } else {
                  var propertyValueFormatted = propertyValue.replace(" ", "-");
                }
                const CSSRuleString = createCSSRuleFromPropertyValue(
                  propertyName,
                  propertyValue,
                  propertyValueFormatted
                );
                fileContent += CSSRuleString;
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

        //console.log(fileContent);
        //createFileAndAppendCSSRules(propertyName, fileContent);
      }
    }
  }
}

module.exports = { parsePropertyValuesArray };
