function removeStringBeforeQuestionMark(input) {
  const questionMarkIndex = input.indexOf("?");
  const parsedString = input.substring(questionMarkIndex + 1);
  return parsedString.trim();
}

module.exports = { removeStringBeforeQuestionMark };
