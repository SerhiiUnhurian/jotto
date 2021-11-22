import { getLetterMatchCount } from '.';

describe('getLetterMatch', () => {
  const secretWord = 'party';

  test('should return correct count when there are no matching letters', () => {
    const letterMatchCount = getLetterMatchCount('bonus', secretWord);
    expect(letterMatchCount).toBe(0);
  });
  test('should return correct count when there are matching letters', () => {
    const letterMatchCount = getLetterMatchCount('train', secretWord);
    expect(letterMatchCount).toBe(3);
  });
  test('should return correct count when there are duplicate letters in guess word', () => {
    const letterMatchCount = getLetterMatchCount('parka', secretWord);
    expect(letterMatchCount).toBe(3);
  });
  test('should return correct count when there are duplicate letters in secret word', () => {
    const letterMatchCount = getLetterMatchCount('park', 'paradise');
    expect(letterMatchCount).toBe(3);
  });
});
