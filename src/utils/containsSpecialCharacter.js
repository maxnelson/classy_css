function containsSpecialCharacter(str) {
  const regex = /[^a-zA-Z0-9]/;
  return regex.test(str);
}

module.exports = { containsSpecialCharacter };
