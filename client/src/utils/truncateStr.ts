function truncateStr(str: string, maxChar: number) {
  let truncateValue = str;

  //truncate only if
  if (str.length > maxChar) {
    truncateValue = str.substring(0, maxChar).trimEnd() + "...";
  }

  return truncateValue;
}

export default truncateStr;
