require("module-alias/register");

function shallowSplitJoinedString(input) {
  const result = [];
  let buffer = "";
  let inBraces = false;

  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    if (char === "[") {
      inBraces = true;
    } else if (char === "]") {
      inBraces = false;
    }

    if (char === "|" && !inBraces) {
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
