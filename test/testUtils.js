import checkPropTypes from "check-prop-types";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "../src/reducers";
import { middlewares, initialState } from "../src/configureStore";

export const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};

export const checkProps = (component, confirmingProps) => {
  const propError = checkPropTypes(
    component.propTypes,
    confirmingProps,
    "prop",
    component.name
  );
  expect(propError).toBeUndefined();
};

export const storeFactory = (state) => {
  return createStore(
    rootReducer,
    { ...initialState, ...state },
    applyMiddleware(...middlewares)
  );
};
