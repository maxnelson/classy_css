require("module-alias/register");

function shallowSplitJoinedString(input) {
  const result = [];
  let buffer = "";
  let inBraces = 0;

  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    if (char === "[") {
      inBraces++;
    } else if (char === "]") {
      inBraces--;
    }

    if (char === "|" && inBraces === 0) {
      result.push(buffer.trim());
      buffer = "";
    } else {
      buffer += char;
    }
  }

  if (buffer) {
    result.push(buffer.trim());
  }
  return result;
}

module.exports = { shallowSplitJoinedString };
