import { mount } from "enzyme";
import App from "./App";
import { findByTestAttr } from "../test/testUtils";
import React from "react";
import { getSecretWord as mockGetSecretWord } from "./actions";

/**
 * Activate global mock to mack sure getSecretWord doesn't make network call
 */
jest.mock("./actions");

const originalUseReducer = React.useReducer;

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useReducer: jest.fn(),
}));

const setup = () => {
  // useEffect does not run on shallow rendering
  return mount(<App />);
};

describe.each([
  [null, true, false],
  ["party", false, true],
])('renders with secretWord as "%s"', (secretWord, spinnerShows, appShows) => {
  let wrapper;

  beforeEach(() => {
    React.useReducer.mockReturnValue([
      { secretWord, language: "en" },
      jest.fn(),
    ]);
    wrapper = setup();
  });

  afterAll(() => {
    React.useReducer = originalUseReducer;
  });

  test(`should ${spinnerShows ? "" : "not"} render spinner`, () => {
    const spinner = findByTestAttr(wrapper, "component-spinner");
    expect(spinner.exists()).toBe(spinnerShows);
  });

  test(`should ${appShows ? "" : "not"} render app`, () => {
    const app = findByTestAttr(wrapper, "component-app");
    expect(app.exists()).toBe(appShows);
  });
});

describe("getSecretWord", () => {
  beforeEach(() => {
    mockGetSecretWord.mockClear();
  });

  test("should call getSecretWord on mount", () => {
    const wrapper = setup();
    expect(mockGetSecretWord).toHaveBeenCalledTimes(1);
  });

  test("should not call getSecretWord on update", () => {
    const wrapper = setup();
    mockGetSecretWord.mockClear();
    wrapper.setProps();
    expect(mockGetSecretWord).toHaveBeenCalledTimes(0);
  });
});
