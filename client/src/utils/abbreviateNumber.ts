function abbreviateNumber(value: number) {
  const suffixes = ["", "k", "M", "B"]; // Add more suffixes as needed

  let absNumber = Math.abs(value);
  const sign = Math.sign(value);
  let index = 0;

  while (absNumber >= 1000 && index < suffixes.length - 1) {
    absNumber /= 1000;
    index++;
  }

  const roundedNumber = Math.round(absNumber * 10) / 10; // Round to 1 decimal place
  const suffix = suffixes[index];

  return sign * roundedNumber + suffix;
}

export default abbreviateNumber;
