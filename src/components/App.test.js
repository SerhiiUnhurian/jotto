import { mount } from "enzyme";
import App from "./App";
import { findByTestAttr, storeFactory } from "../../test/testUtils";
import { Provider } from "react-redux";
import { getSecretWord as mockGetSecretWord } from "../actions";

/**
 * Activate global mock to mack sure getSecretWord doesn't make network call
 */
jest.mock("../actions");

const setup = () => {
  const store = storeFactory();
  // useEffect does not run on shallow rendering
  return mount(
    <Provider store={store}>
      <App />
    </Provider>
  );
};

describe("<App />", () => {
  test("renders without errors", () => {
    const wrapper = setup();
    const app = findByTestAttr(wrapper, "component-app");
    expect(app.exists()).toBe(true);
  });

  describe("getSecretWord", () => {
    beforeEach(() => {
      mockGetSecretWord.mockClear();
    });

    test("should call getSecretWord on mount", () => {
      setup();
      expect(mockGetSecretWord).toHaveBeenCalledTimes(1);
    });

    test("should not call getSecretWord on update", () => {
      const wrapper = setup();
      mockGetSecretWord.mockClear();
      wrapper.setProps();
      expect(mockGetSecretWord).toHaveBeenCalledTimes(0);
    });
  });
});
