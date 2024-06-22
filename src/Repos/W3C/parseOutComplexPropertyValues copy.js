require("module-alias/register");

function parseOutComplexPropertyValues(shallowSplitPropertyValues) {
  let result = [];
  //console.log(shallowSplitPropertyValues);
  for (propertyValue of shallowSplitPropertyValues) {
    if (
      propertyValue.indexOf("?") === -1 &&
      propertyValue.indexOf("[") === -1
    ) {
      //console.log("propertyValue.indexOf('?'): " + propertyValue.indexOf("?"));
      result.push(propertyValue);
    }
  }
  return result;
}

module.exports = { parseOutComplexPropertyValues };
