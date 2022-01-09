import { SuccessProvider, useSuccessContext } from "./SuccessContext";
import { mount, shallow } from "enzyme";

const MockComponent = () => {
  useSuccessContext();
  return <div />;
};

describe("SuccessContext", () => {
  it("should throw an exception", () => {
    expect(() => shallow(<MockComponent />)).toThrow(
      "`useSuccessContext` must be used inside `SuccessProvider` component."
    );
  });

  it("should not throw an exception", () => {
    expect(() =>
      mount(
        <SuccessProvider>
          <MockComponent />
        </SuccessProvider>
      )
    ).not.toThrow();
  });
});
