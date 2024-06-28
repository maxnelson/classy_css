const {
  parsePropDefValue,
} = require("@src/utils/parse_utils/css-grammar-parser");

function lookupValueInValuesArray(propertyValue, valuesArray) {
  const valueObject = valuesArray.find(
    (obj) => obj.name === "<" + propertyValue + ">"
  );
  if (valueObject) {
    /*
    let returnValue = [];
    for (let propertyValueObject in valueObject.values) {
      returnValue.push(
        valueObject.values[propertyValueObject].name
      );
    }
      */
    let returnValue = parsePropDefValue(valueObject.value);
    return returnValue;
  }
}

module.exports = { lookupValueInValuesArray };
