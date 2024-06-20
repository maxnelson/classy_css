function generateMeasurementValues(propertyName) {
  let fileContent = "";
  for (let i = 0; i <= 15; i++) {
    const remValue =
      "." +
      propertyName +
      "-" +
      i +
      "rem" +
      " {\n  " +
      propertyName +
      ": " +
      i +
      "rem;\n}\n";
    fileContent += remValue;
  }
  for (let i = 0; i <= 15; i++) {
    const pixelValue =
      "." +
      propertyName +
      "-" +
      i +
      "px" +
      " {\n  " +
      propertyName +
      ": " +
      i +
      "px;\n}\n";
    fileContent += pixelValue;
  }
  return fileContent;
}

module.exports = { generateMeasurementValues };
