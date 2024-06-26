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
const { parsePropDefValue } = require("@src/repos/W3C/css-grammar-parser");

async function parsePropertyValuesArray_old(responseData) {
  const propertiesArray = responseData.properties;
  const valuesArray = responseData.values;

  for (let i = 0; i < propertiesArray.length; i++) {
    let fileContent = "";
    const propertyName = propertiesArray[i].name;
    const propertyValueJoinedString = propertiesArray[i].value;
    if (
      propertyValueJoinedString === undefined ||
      propertyValueJoinedString === null ||
      propertyName === "font-weight" ||
      propertyName !== "align-items"
    ) {
      console.log("We got an undefined or null property value");
    } else {
      console.log(propertyName);
      console.log(propertyValueJoinedString);
      //"normal | <baseline-position> | <content-distribution> | <overflow-position>? <content-position>"
      /*
      const parsedString = parsePropDefValue(propertyValueJoinedString);
      if ("oneOf" in parsedString) {
        for (let i = 0; i < parsedString.oneOf.length; i++) {
          const parsedStringObject = parsedString.oneOf[i];
          if (parsedStringObject.type === "keyword") {
            const CSSRuleString = createCSSRuleFromPropertyValue(
              propertyName,
              parsedString.oneOf[i].name
            );
            fileContent += CSSRuleString;
          } else if (parsedStringObject.type === "valuespace") {
            const something = lookupValueInValuesArray(
              parsedStringObject.name,
              valuesArray
            );
            //console.log(parsedStringObject.name);
            //console.log(propertyName);

            for (item of something) {
              //console.log(item);
              const CSSRuleString = createCSSRuleFromPropertyValue(
                propertyName,
                item
              );
              fileContent += CSSRuleString;
            }
          }
        }
      } else {
        console.log("We got a property value that is not an array");
      }
        */
    }
    //console.log(fileContent);
    //createFileAndAppendCSSRules(propertyName, fileContent);
  }
}

module.exports = { parsePropertyValuesArray };
