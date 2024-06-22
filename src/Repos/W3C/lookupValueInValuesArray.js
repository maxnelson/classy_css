function lookupValueInValuesArray(propertyValue, valuesArray) {
  const valueObject = valuesArray.find((obj) => obj.name === propertyValue);
  if (valueObject) {
    let valueObjectValuesCompiled = [];
    for (let propertyValueObject in valueObject.values) {
      valueObjectValuesCompiled.push(
        valueObject.values[propertyValueObject].name
      );
    }
    return valueObjectValuesCompiled;
  }
}

module.exports = { lookupValueInValuesArray };
