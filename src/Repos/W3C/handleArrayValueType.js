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
  let runningClassNames = [];
  console.log("see how many times this runs");
  console.log(JSON.stringify(inputArray, null, 2));
  for (let i = 0; i < inputArray.length; i++) {
    let currentValueObject = inputArray[i];
    if (currentValueObject.type) {
      //console.log("It has a type");
      if (currentValueObject.type === "primitive") {
        console.log("check this");
        let cachedArray = [];
        const primitivesArray =
          customPrimitiveValuesArray[currentValueObject.name];
        console.log(primitivesArray);
        for (primitiveKey in primitivesArray) {
          //console.log(primitiveKey);
          const cachedObject = {};
          cachedObject[primitiveKey] = primitivesArray[primitiveKey];
          console.log(cachedObject);
          cachedArray.push(cachedObject);
        }
        runningClassNames.push(cachedArray);
      }
    } else {
      for (combinatorType in currentValueObject) {
        if (combinatorType === "oneOf") {
          propertyValueObjectCollection = currentValueObject[combinatorType];
          let cachedArray = [];
          for (propertyValueObject of propertyValueObjectCollection) {
            if (propertyValueObject.type === "keyword") {
              const cachedObject = {};
              cachedObject[propertyValueObject.name] = propertyValueObject.name;
              cachedArray.push(cachedObject);
            }
          }
          runningClassNames.push(cachedArray);
        }
      }
    }
  }
  console.log(runningClassNames);
}
module.exports = { handleArrayValueType };
