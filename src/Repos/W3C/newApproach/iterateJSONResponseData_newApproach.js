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

function iterateJSONResponseData_newApproach(responseData) {}

module.exports = { iterateJSONResponseData };
