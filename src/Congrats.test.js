import { mount } from "enzyme";
import Congrats from "./Congrats";
import { findByTestAttr } from "../test/testUtils";
import { checkProps } from "../test/testUtils";
import LanguageContext from "./contexts/LanguageContext";
import getStringByLanguage from "./helpers/strings";

const defaultProps = { success: false };

const setup = ({ language = "en", success = true } = {}) => {
  return mount(
    <LanguageContext.Provider value={{ language }}>
      <Congrats success={success} />
    </LanguageContext.Provider>
  );
};

describe("<Congrats />", () => {
  test("should render without error", () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, "component-congrats");
    expect(component.length).toBe(1);
  });

  test("should not render congrats message", () => {
    const wrapper = setup({ success: false });
    const component = findByTestAttr(wrapper, "component-congrats");
    expect(component.text()).toBe("");
  });

  test("should render congrats message", () => {
    const wrapper = setup({ success: true });
    const message = findByTestAttr(wrapper, "congrats-message");
    expect(message.text().length).not.toBe(0);
  });

  test("should not throw warning with expected props", () => {
    checkProps(Congrats, defaultProps);
  });

  describe("languageContext", () => {
    it("should render congrats message in english", () => {
      const wrapper = setup({ language: "en" });
      expect(wrapper.text()).toBe(getStringByLanguage("en", "congrats"));
    });
    it("should render congrats message with emoji", () => {
      const wrapper = setup({ language: "emoji" });
      expect(wrapper.text()).toBe(getStringByLanguage("emoji", "congrats"));
    });
  });
});
