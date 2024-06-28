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
      propertyName === "background-position"
    ) {
      let parsedValueObject = parsePropDefValue(propertyValueJoinedString);
      if (parsedValueObject) {
        fileContent += handleParsedValueObject(
          propertyName,
          parsedValueObject,
          valuesArray
        );
      }
      createFileAndAppendCSSRules(propertyName, fileContent);
    }
  }
}

const handleParsedValueObject = (
  propertyName,
  parsedValueObject,
  valuesArray
) => {
  console.log(parsedValueObject);
  let CSSRuleStrings = "";
  let combinatorType;
  let propertyValueObjectCollection;
  if (parsedValueObject.type === "array") {
    handleParsedValueObject(
      propertyName,
      parsedValueObject.items,
      valuesArray,
      CSSRuleStrings
    );
  } else if (Array.isArray(parsedValueObject)) {
    console.log("we got a true array");
    for (let i = 0; i < parsedValueObject.length; i++) {
      CSSRuleStrings += handleParsedValueObject(
        propertyName,
        parsedValueObject[i],
        valuesArray
      );
    }
  } else {
    for (combinatorType in parsedValueObject) {
      console.log(combinatorType);
      if (combinatorType === "oneOf") {
        propertyValueObjectCollection = parsedValueObject[combinatorType];
        for (propertyValueObject in propertyValueObjectCollection) {
          CSSRuleStrings += handleParsedValueObject(
            propertyName,
            propertyValueObjectCollection[propertyValueObject],
            valuesArray
          );
        }
      } else if (combinatorType === "allOf") {
        propertyValueObjectCollection = parsedValueObject[combinatorType];
        for (propertyValueObject in propertyValueObjectCollection) {
          CSSRuleStrings += handleParsedValueObject(
            propertyName,
            propertyValueObjectCollection[propertyValueObject],
            valuesArray
          );
        }
      } else {
        console.log("see when this is getting called");
        CSSRuleStrings += handleParsedValueObjectItem(
          propertyName,
          parsedValueObject,
          valuesArray
        );
      }
    }
  }
  return CSSRuleStrings;
};

const handleParsedValueObjectItem = (
  propertyName,
  parsedValueObjectItem,
  valuesArray
) => {
  let CSSRuleStrings = "";
  console.log("see what we got");
  console.log(parsedValueObjectItem);
  if (parsedValueObjectItem.type === "keyword") {
    const CSSRuleString = createCSSRuleFromPropertyValue(
      propertyName,
      parsedValueObjectItem.name
    );
    CSSRuleStrings += CSSRuleString;
  } else if (parsedValueObjectItem.type === "valuespace") {
    CSSRuleStrings += handleValuespaceValue(
      propertyName,
      parsedValueObjectItem.name,
      valuesArray
    );
  } else if (parsedValueObjectItem.type === "array") {
    CSSRuleStrings += handleParsedValueObjectItem(
      propertyName,
      parsedValueObjectItem.items,
      valuesArray
    );
  } else if (parsedValueObjectItem.type === "primitive") {
    CSSRuleStrings += handlePrimitiveValueType(
      propertyName,
      parsedValueObjectItem
    );
  } else {
    console.log("unhandled type");
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

const handleValuespaceValue = (propertyName, valueName, valuesArray) => {
  let CSSRuleStrings = "";
  const valuespaceValueObject = lookupValueInValuesArray(
    valueName,
    valuesArray
  );
  /*
  for (nonTerminalValue of valuespaceValueObject) {
    const CSSRuleString = createCSSRuleFromPropertyValue(
      propertyName,
      nonTerminalValue
    );
    CSSRuleStrings += CSSRuleString;
  }
  */
  const parsedValueObject = handleParsedValueObject(
    propertyName,
    valuespaceValueObject,
    valuesArray
  );
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
      CSSRuleStrings += handleValuespaceValue(
        propertyName,
        propertyValue.name,
        valuesArray
      );
    }
    if (propertyValue.type === "array") {
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
      CSSRuleStrings += handleParsedValueObject(
        propertyName,
        item,
        valuesArray
      );
    }
  }
  return CSSRuleStrings;
};

module.exports = { iterateJSONResponseData };
