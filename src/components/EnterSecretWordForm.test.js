import GiveUpMessage from "./GiveUpMessage";
import { checkProps, findByTestAttr } from "../../test/testUtils";
import EnterSecretWordForm from "./EnterSecretWordForm";
import { mount } from "enzyme";
import LanguageContext from "../contexts/LanguageContext";
import getStringByLanguage from "../helpers/strings";

const mockOnSubmit = jest.fn();
const mockOnCancel = jest.fn();

const setup = ({ language = "en" } = {}) => {
  return mount(
    <LanguageContext.Provider value={{ language }}>
      <EnterSecretWordForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
    </LanguageContext.Provider>
  );
};

describe("<EnterSecretWordForm />", () => {
  test("should render without error", () => {
    const wrapper = setup();
    const component = findByTestAttr(
      wrapper,
      "component-enter-secret-word-form"
    );
    expect(component.length).toBe(1);
  });

  test("should call `onSubmit` prop", () => {
    const wrapper = setup();
    const submitBtn = findByTestAttr(wrapper, "submit-btn");
    const input = findByTestAttr(wrapper, "input");
    input.simulate("change", { target: { value: "party" } });
    submitBtn.simulate("click");
    expect(mockOnSubmit).toHaveBeenCalledWith("party");
  });

  test("should call `onCancel` prop", () => {
    const wrapper = setup();
    const btn = findByTestAttr(wrapper, "cancel-btn");
    btn.simulate("click");
    expect(mockOnCancel).toHaveBeenCalled();
  });

  test("should not throw warning with expected props", () => {
    checkProps(GiveUpMessage, { onSubmit: () => {}, onCancel: () => {} });
  });

  describe("languageContext", () => {
    it("should render button text in english", () => {
      const wrapper = setup({ language: "en" });
      const submitBtn = findByTestAttr(wrapper, "submit-btn");
      const cancelBtn = findByTestAttr(wrapper, "cancel-btn");
      expect(submitBtn.text()).toBe(getStringByLanguage("en", "submit"));
      expect(cancelBtn.text()).toBe(getStringByLanguage("en", "cancel"));
    });

    it("should render button text with emoji", () => {
      const wrapper = setup({ language: "emoji" });
      const submitBtn = findByTestAttr(wrapper, "submit-btn");
      const cancelBtn = findByTestAttr(wrapper, "cancel-btn");
      expect(submitBtn.text()).toBe(getStringByLanguage("emoji", "submit"));
      expect(cancelBtn.text()).toBe(getStringByLanguage("emoji", "cancel"));
    });
  });
});
