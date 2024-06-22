const { shallowSplitJoinedString } = require("./shallowSplitJoinedString");

require("module-alias/register");

function parseOutComplexPropertyValues(shallowSplitPropertyValues) {
  let result = [];
  for (propertyValue of shallowSplitPropertyValues) {
    let basicFormatCheck = /[^a-z<>-]/g;
    if (!basicFormatCheck.test(propertyValue)) {
      result.push(propertyValue);
    } else if (propertyValue.indexOf("[") !== -1) {
      const subArray = seperateSubArray(propertyValue);
      for (arrayItem of subArray) {
        const arrayItemSplit = shallowSplitJoinedString(arrayItem);
        result.push(...arrayItemSplit);
      }
    } else if (propertyValue.indexOf("?") !== -1) {
      const looksLikeYoureOutOfOptions =
        removeBeforeQuestionMark(propertyValue);
      result.push(looksLikeYoureOutOfOptions);
    }
  }
  return result;
}

function removeBeforeQuestionMark(input) {
  const questionMarkIndex = input.indexOf("?");
  const parsedString = input.substring(questionMarkIndex + 1);
  return parsedString.trim();
}

function seperateSubArray(input) {
  const bracketPattern = /\[([^\]]+)\]/g;
  const matches = [];
  let match;
  while ((match = bracketPattern.exec(input))) {
    matches.push(match[1]);
  }
  return matches;
}

module.exports = { parseOutComplexPropertyValues };
