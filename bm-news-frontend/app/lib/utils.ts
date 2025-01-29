export function readTime(wordCount: number) {
  const WPM = 150;
  const rate = wordCount / WPM;
  return Math.max(1, Math.ceil(rate));
}
