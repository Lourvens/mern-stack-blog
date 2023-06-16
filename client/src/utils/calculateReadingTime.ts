function calculateReadingTime(text: string) {
  // remove html tags
  const cleanText = text.replace(/<.*>/, "");
  // split the text into words
  const words = cleanText.split(/\s+/g);
  const wordsPerMinutes = 220;
  const readingTimeMinutes = words.length / wordsPerMinutes;

  const minutes = Math.floor(readingTimeMinutes);
  const seconds = Math.floor((readingTimeMinutes * 60) % 60);
  let format = "";

  if (minutes) format += `${minutes} min `;
  else if (seconds) format += `${seconds} sec`;
  return format;
}

export default calculateReadingTime;
