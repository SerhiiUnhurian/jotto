import { shallow } from "enzyme";
import { checkProps, findByTestAttr } from "../../test/testUtils";
import LanguagePicker from "./LanguagePicker";

const mockSetLanguage = jest.fn();
const setup = () => {
  return shallow(<LanguagePicker setLanguage={mockSetLanguage} />);
};

describe("<LanguagePicker />", () => {
  let wrapper;

  beforeEach(() => {
    mockSetLanguage.mockClear();
    wrapper = setup();
  });

  it("should render without error", () => {
    const component = findByTestAttr(wrapper, "component-language-picker");
    expect(component).toHaveLength(1);
  });

  it("should not throw warning with expected props", () => {
    checkProps(LanguagePicker, { setLanguage: jest.fn() });
  });

  it("should call setLanguage upon button click", () => {
    const languageIcon = findByTestAttr(wrapper, "language-icon").first();
    languageIcon.simulate("click");
    expect(mockSetLanguage).toHaveBeenCalled();
  });
});
