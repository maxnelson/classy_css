require("module-alias/register");

const {
  parsePropDefValue,
} = require("@src/utils/parse_utils/css-grammar-parser");
const {
  createCSSRuleFromPropertyValue,
} = require("@src/repos/W3C/createCSSRuleFromPropertyValue");
const {
  createFileAndAppendCSSRules,
} = require("@src/repos/W3C/createFileAndAppendCSSRules");
const {
  lookupValueInValuesArray,
} = require("@src/repos/W3C/lookupValueInValuesArray");
const customPrimitiveValuesArray = require("@src/repos/W3C/localJSON/customPrimitiveValues.json");

function iterateJSONResponseData_newApproach(responseData) {
  const propertiesArray = responseData.properties;
  const valuesArray = responseData.values;
  for (let index = 0; index < propertiesArray.length; index++) {
    let fileContent = "";
    const propertyName = propertiesArray[index].name;
    const propertyValueJoinedString = propertiesArray[index].value;
    if (
      propertyValueJoinedString !== undefined &&
      propertyName !== "font-weight" &&
      propertyName === "background-position"
    ) {
      let parsedValueObject = parsePropDefValue(propertyValueJoinedString);
      if (parsedValueObject) {
        fileContent += handleParsedValueObject(
          propertyName,
          parsedValueObject,
          valuesArray,
          fileContent
        );
      }
      createFileAndAppendCSSRules(propertyName, fileContent);
    }
  }
}
const handleParsedValueObject = (
  propertyName,
  parsedValueObject,
  valuesArray,
  fileContent
) => {
  console.log(JSON.stringify(parsedValueObject, null, 2));
  let CSSRuleString;
  if (parsedValueObject.type === "keyword") {
    //if we've seen the keyword before, cache it

    CSSRuleString += createCSSRuleFromPropertyValue(
      propertyName,
      parsedValueObject.name
    );
  } else if (parsedValueObject.type === "array") {
    console.log("handlethis");
  } else {
    for (combinatorType in parsedValueObject) {
      if (combinatorType === "oneOf") {
        for (item of parsedValueObject[combinatorType]) {
          if (item.type === "keyword") {
            CSSRuleString += createCSSRuleFromPropertyValue(
              propertyName,
              item.name
            );
          } else if (item.type === "array") {
            for (item of item.items) {
              if (combinatorType === "oneOf") {
                for (item of parsedValueObject[combinatorType]) {
                  //console.log(item);
                  if (item.type === "array") {
                    for (item of item.items) {
                      for (combinatorType in item) {
                        if (combinatorType === "oneOf") {
                          for (item of parsedValueObject[combinatorType]) {
                            console.log(item);
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  return CSSRuleString;
};

module.exports = { iterateJSONResponseData_newApproach };
