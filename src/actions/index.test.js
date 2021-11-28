import moxios from 'moxios';
import { getSecretWord } from '.';

beforeEach(() => {
  moxios.install();
});

afterEach(() => {
  moxios.uninstall();
});

describe('getSecretWord', () => {
  test('should return secret word', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: 'party',
      });
    });

    // TODO: Update to test App in Redux / Context sections
    return getSecretWord().then((secretWord) => {
      expect(secretWord).toBe('party');
    });
  });
});
