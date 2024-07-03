require("module-alias/register");
const {
  createCSSRuleFromPropertyValue,
  createCSSRuleFromCustomPrimitiveValue,
} = require("@src/repos/W3C/createCSSRuleFromPropertyValue");
const {
  parsePropDefValue,
} = require("@src/utils/parse_utils/css-grammar-parser");
const {
  createFileAndAppendCSSRules,
} = require("@src/repos/W3C/createFileAndAppendCSSRules");
const {
  lookupValueInValuesArray,
} = require("@src/repos/W3C/lookupValueInValuesArray");
const customPrimitiveValuesArray = require("@src/repos/W3C/localJSON/customPrimitiveValues.json");

function handleArrayValueType(inputArray) {
  console.log("inputArray");
  console.log(inputArray);
  let runningClassNames = [];
  for (let i = 0; i < inputArray.length; i++) {
    let currentValueObject = inputArray[i];
    if (currentValueObject.type) {
      console.log("It has a type");
      if (currentValueObject.type === "primitive") {
        console.log(customPrimitiveValuesArray[currentValueObject.name]);
      }
    } else {
      for (combinatorType in currentValueObject) {
        if (combinatorType === "oneOf") {
          propertyValueObjectCollection = currentValueObject[combinatorType];
          for (propertyValueObject of propertyValueObjectCollection) {
            if (propertyValueObject.type === "keyword") {
              runningClassNames.push(propertyValueObject.name);
              console.log("check this");
              console.log(runningClassNames);
            }
          }
        }
      }
    }
  }
}
module.exports = { handleArrayValueType };
