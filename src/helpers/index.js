export const getLetterMatchCount = (guessedWord, secretWord) => {
  const secretLettersSet = new Set(secretWord);
  const guessedLettersSet = new Set(guessedWord);
  return Array.from(secretLettersSet).filter((letter) =>
    guessedLettersSet.has(letter)
  ).length;
};
