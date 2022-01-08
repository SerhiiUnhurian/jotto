import moxios from "moxios";
import { getSecretWord } from "./index";

describe.skip("getSecretWord", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  test("should return secret word", async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: "party",
      });
    });

    const secretWord = await getSecretWord();
    expect(secretWord).toBe("party");
  });
});
