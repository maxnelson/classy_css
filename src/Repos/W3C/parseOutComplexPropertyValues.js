require("module-alias/register");
const {
  shallowSplitJoinedString,
} = require("@src/utils/string_utils/shallowSplitJoinedString");
const {
  separateSubArray,
} = require("@src/utils/string_utils/separateSubArray");
const {
  removeStringBeforeQuestionMark,
} = require("@src/utils/string_utils/removeStringBeforeQuestionMark");

function parseOutComplexPropertyValues(shallowSplitPropertyValues) {
  let result = [];
  for (propertyValue of shallowSplitPropertyValues) {
    let basicFormatCheck = /[^a-z<>-]/g;
    if (!basicFormatCheck.test(propertyValue)) {
      result.push(propertyValue);
    } else if (propertyValue.indexOf("[") !== -1) {
      const subArray = separateSubArray(propertyValue);
      for (arrayItem of subArray) {
        const arrayItemSplit = shallowSplitJoinedString(arrayItem);
        result.push(...arrayItemSplit);
      }
    } else if (propertyValue.indexOf("?") !== -1) {
      const looksLikeYoureOutOfOptions =
        removeStringBeforeQuestionMark(propertyValue);
      result.push(looksLikeYoureOutOfOptions);
    }
  }
  return result;
}

module.exports = { parseOutComplexPropertyValues };
