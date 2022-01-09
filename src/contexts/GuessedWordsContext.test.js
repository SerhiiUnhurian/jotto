import { mount, shallow } from "enzyme";
import {
  GuessedWordsProvider,
  useGuessedWordsContext,
} from "./GuessedWordsContext";

const MockComponent = () => {
  useGuessedWordsContext();
  return <div />;
};

describe("GuessedWordsContext", () => {
  it("should throw an exception", () => {
    expect(() => shallow(<MockComponent />)).toThrow(
      "`useGuessedWordsContext` must be used inside `GuessedWordsProvider`"
    );
  });

  it("should not throw an exception", () => {
    expect(() =>
      mount(
        <GuessedWordsProvider>
          <MockComponent />
        </GuessedWordsProvider>
      )
    ).not.toThrow();
  });
});
