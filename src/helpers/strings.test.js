import getStringByLanguage from "./strings";

const testStrings = {
  en: {
    submit: "submit",
  },
  emoji: { submit: "🚀" },
  mermish: {},
};

describe("getStringByLanguage", () => {
  let originalWarn = console.warn;
  const mockWarn = jest.fn();
  console.warn = mockWarn;

  beforeEach(() => {
    mockWarn.mockClear();
  });

  afterAll(() => {
    console.warn = originalWarn;
  });

  it("should return correct string for english language", () => {
    const str = getStringByLanguage("en", "submit", testStrings);
    expect(str).toBe("submit");
    expect(mockWarn).not.toHaveBeenCalled();
  });

  it("should return correct string for emoji", () => {
    const str = getStringByLanguage("emoji", "submit", testStrings);
    expect(str).toBe("🚀");
    expect(mockWarn).not.toHaveBeenCalled();
  });

  it("should return correct string for nonexisting language", () => {
    const str = getStringByLanguage("notALanguage", "submit", testStrings);
    expect(str).toBe("submit");
    expect(mockWarn).toHaveBeenCalled();
  });

  it("should return correct string for nonexisting key", () => {
    const str = getStringByLanguage("mermish", "submit", testStrings);
    expect(str).toBe("submit");
    expect(mockWarn).toHaveBeenCalled();
  });
});
