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

function iterateJSONResponseData(responseData) {
  const propertiesArray = responseData.properties;
  const valuesArray = responseData.values;
  for (let index = 0; index < propertiesArray.length; index++) {
    let fileContent = "";
    const propertyName = propertiesArray[index].name;
    const propertyValueJoinedString = propertiesArray[index].value;
    if (
      propertyValueJoinedString !== undefined &&
      propertyName !== "font-weight" &&
      propertyName === "gap"
    ) {
      fileContent += parsePropertyValue(
        propertyName,
        propertyValueJoinedString,
        valuesArray,
        fileContent
      );
    }
    createFileAndAppendCSSRules(propertyName, fileContent);
  }
}

const parsePropertyValue = (
  propertyName,
  propertyValueJoinedString,
  valuesArray,
  fileContent
) => {
  console.log(propertyName);
  console.log(propertyValueJoinedString);
  const parsedValueObject = parsePropDefValue(propertyValueJoinedString);
  if (parsedValueObject) {
    if ("oneOf" in parsedValueObject) {
      fileContent += handleOneOfArray(
        propertyName,
        parsedValueObject,
        valuesArray
      );
    }
  }
  return fileContent;
};

const handleOneOfArray = (propertyName, parsedValueObject, valuesArray) => {
  let CSSRuleStrings = "";
  for (let j = 0; j < parsedValueObject.oneOf.length; j++) {
    const propertyValue = parsedValueObject.oneOf[j];
    if (propertyValue.type === "keyword") {
      const CSSRuleString = createCSSRuleFromPropertyValue(
        propertyName,
        propertyValue.name
      );
      CSSRuleStrings += CSSRuleString;
    } else if (propertyValue.type === "valuespace") {
      CSSRuleStrings += handleNonTerminalValue(
        propertyName,
        propertyValue.name,
        valuesArray
      );
    } else if (propertyValue.type === "array") {
      CSSRuleStrings += handleArrayTypeValue(
        propertyName,
        propertyValue.items,
        valuesArray
      );
    } else if (propertyValue.type === "primitive") {
      CSSRuleStrings += handlePrimitiveValueType(propertyName, propertyValue);
    }
  }
  return CSSRuleStrings;
};

const handlePrimitiveValueType = (propertyName, valueObject) => {
  let CSSRuleStrings = "";
  const primitiveLookup = customPrimitiveValuesArray[valueObject.name];
  for (let primitiveValue in primitiveLookup) {
    const CSSRuleString = createCSSRuleFromCustomPrimitiveValue(
      propertyName,
      primitiveValue,
      primitiveLookup[primitiveValue]
    );
    CSSRuleStrings += CSSRuleString;
  }
  return CSSRuleStrings;
};

const handleNonTerminalValue = (propertyName, valueName, valuesArray) => {
  let CSSRuleStrings = "";
  const nonTerminalValuesArray = lookupValueInValuesArray(
    valueName,
    valuesArray
  );
  for (nonTerminalValue of nonTerminalValuesArray) {
    const CSSRuleString = createCSSRuleFromPropertyValue(
      propertyName,
      nonTerminalValue
    );
    CSSRuleStrings += CSSRuleString;
  }
  return CSSRuleStrings;
};

const handleArrayTypeValue = (
  propertyName,
  propertyValuesArray,
  valuesArray
) => {
  let CSSRuleStrings = "";
  if (propertyValuesArray.type === "array") {
    CSSRuleStrings += handleSecondOrderArray(
      propertyName,
      propertyValuesArray.items,
      valuesArray
    );
  }
  for (let k = 0; k < propertyValuesArray.length; k++) {
    const propertyValue = propertyValuesArray[k];

    if (propertyValue.type === "valuespace") {
      CSSRuleStrings += handleNonTerminalValue(
        propertyName,
        propertyValue.name,
        valuesArray
      );
    }
    if (propertyValue.type === "array") {
      console.log("looks like we have an array of arrays");
    }
  }
  return CSSRuleStrings;
};

const handleSecondOrderArray = (
  propertyName,
  propertyValuesArray,
  valuesArray
) => {
  let CSSRuleStrings = "";
  for (item of propertyValuesArray) {
    if ("oneOf" in item) {
      CSSRuleStrings += handleOneOfArray(propertyName, item, valuesArray);
    }
  }
  return CSSRuleStrings;
};

module.exports = { iterateJSONResponseData };
