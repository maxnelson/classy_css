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
const { handleArrayValueType } = require("@src/repos/w3C/handleArrayValueType");

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
          valuesArray,
          fileContent,
          ""
        );
      }
      console.log("fileContent");
      //console.log(fileContent);
      createFileAndAppendCSSRules(propertyName, fileContent);
    }
  }
}

const handleParsedValueObject = (
  propertyName,
  parsedValueObject,
  valuesArray,
  fileContent,
  runningClassName
) => {
  console.log("handleParsedValueObject");
  console.log(parsedValueObject);
  let CSSRuleStrings = "";
  let combinatorType;
  let propertyValueObjectCollection;
  if (parsedValueObject.type === "array") {
    CSSRuleStrings += handleParsedValueObject(
      propertyName,
      parsedValueObject.items,
      valuesArray,
      fileContent,
      ""
    );
  } else if (Array.isArray(parsedValueObject)) {
    handleArrayValueType(parsedValueObject);
    /*
    for (let i = 0; i < parsedValueObject.length; i++) {
      CSSRuleStrings += handleParsedValueObject(
        propertyName,
        parsedValueObject[i],
        valuesArray,
        fileContent,
        ""
      );
    }
      */
  } else {
    for (combinatorType in parsedValueObject) {
      if (combinatorType === "oneOf") {
        propertyValueObjectCollection = parsedValueObject[combinatorType];
        for (propertyValueObject in propertyValueObjectCollection) {
          CSSRuleStrings += handleParsedValueObject(
            propertyName,
            propertyValueObjectCollection[propertyValueObject],
            valuesArray,
            fileContent,
            ""
          );
        }
      } else if (combinatorType === "allOf") {
        propertyValueObjectCollection = parsedValueObject[combinatorType];
        for (propertyValueObject in propertyValueObjectCollection) {
          CSSRuleStrings += handleParsedValueObject(
            propertyName,
            propertyValueObjectCollection[propertyValueObject],
            valuesArray,
            fileContent,
            ""
          );
        }
      } else {
        CSSRuleStrings += handleParsedValueObjectItem(
          propertyName,
          parsedValueObject,
          valuesArray,
          fileContent
        );
      }
    }
  }
  fileContent += CSSRuleStrings;
  return fileContent;
};

const handleParsedValueObjectItem = (
  propertyName,
  parsedValueObjectItem,
  valuesArray,
  fileContent
) => {
  //console.log("handleParsedValueObjectItem");
  let CSSRuleStrings = "";
  if (parsedValueObjectItem.type === "keyword") {
    CSSRuleStrings += createCSSRuleFromPropertyValue(
      propertyName,
      parsedValueObjectItem.name
    );
    //CSSRuleStrings += CSSRuleString;
  } else if (parsedValueObjectItem.type === "valuespace") {
    CSSRuleStrings += handleValuespaceValue(
      propertyName,
      parsedValueObjectItem.name,
      valuesArray,
      fileContent
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
  }
  fileContent += CSSRuleStrings;
  return fileContent;
};

const handlePrimitiveValueType = (propertyName, valueObject) => {
  //console.log("handlePrimitiveValueType");
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

const handleValuespaceValue = (
  propertyName,
  valueName,
  valuesArray,
  fileContent
) => {
  //console.log("handleValuespaceValue");
  let CSSRuleStrings = "";
  const valuespaceValueObject = lookupValueInValuesArray(
    valueName,
    valuesArray
  );
  //console.log(valuespaceValueObject);
  const parsedValueObject = handleParsedValueObject(
    propertyName,
    valuespaceValueObject,
    valuesArray,
    fileContent,
    ""
  );
  //console.log(parsedValueObject);
  CSSRuleStrings += parsedValueObject;
  fileContent += CSSRuleStrings;
  //console.log(CSSRuleStrings);
  return fileContent;
};

module.exports = { iterateJSONResponseData };
