export const thumbText = (text: string) => {
  if (text.length < 5) {
    return text;
  }
  return `${text.substring(0, 4)}..`;
};
