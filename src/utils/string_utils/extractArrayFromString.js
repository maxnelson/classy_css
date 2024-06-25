require("module-alias/register");

function extractArrayFromString(input) {
  //walk through each character in the string one-by-one
  //if we encounter a "[" we create a new array object, add all the following characters, until we encounter its corresponding closing ]
  //if we encounter a "]" we close the buffer object, and decrement braceCount
  let result = [];
  let buffer = "";
  let arrayCount = 0;
  for (let i = 0; i < input.length; i++) {
    let currentChar = input[i];
    if (currentChar == "," || currentChar == " " || currentChar == "*") {
      continue;
    } else if (currentChar === "[") {
      arrayCount++;
    } else if (currentChar === "]") {
      arrayCount--;
      result.push(buffer.trim());
      buffer = "";
    } else {
      buffer += currentChar;
    }
  }
  return result;
}

module.exports = { extractArrayFromString };
