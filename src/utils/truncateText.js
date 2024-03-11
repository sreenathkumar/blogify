function truncateText(text, maxLength = 150) {
  // Check if the input is a string
  if (typeof text !== "string") {
    throw new Error("Input must be a string");
  }

  // Check if maxLength is a positive integer
  if (!Number.isInteger(maxLength) || maxLength <= 0) {
    throw new Error("maxLength must be a positive integer");
  }

  // Truncate the string if it exceeds the maxLength
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }

  // Return the original string if it's within the maxLength limit
  return text;
}

export default truncateText;
