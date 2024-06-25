function separateSubArray(input) {
  const bracketPattern = /\[([^\]]+)\]/g;
  const matches = [];
  let match;
  while ((match = bracketPattern.exec(input))) {
    matches.push(match[1]);
  }
  return matches;
}
module.exports = { separateSubArray };
