export function shortenText(incomingString, maximumLength) {
  if (!incomingString) {
    return '';
  }
  const maximumLengthInteger = parseInt(maximumLength, 10);
  if (maximumLengthInteger < 1) {
    return '';
  }
  let cropLengthToMakeRoomForEllipses = maximumLengthInteger - 2;
  // Don't allow the string to use less than 3 characters
  const minimumCharactersToDisplay = 3;
  cropLengthToMakeRoomForEllipses =
    cropLengthToMakeRoomForEllipses > 2
      ? cropLengthToMakeRoomForEllipses
      : minimumCharactersToDisplay;
  return incomingString.length < maximumLengthInteger
    ? incomingString
    : `${incomingString.slice(0, cropLengthToMakeRoomForEllipses)}...`;
}
