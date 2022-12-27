import React from "react";

const initialInputState = {
  value: "",
  isTouched: false,
};

type ACTIONTYPE =
  | { type: "INPUT"; value: string }
  | { type: "BLUR" }
  | { type: "RESET" };

type validateFunc = (val: string) => boolean;

const inputStateReducer = (
  state: typeof initialInputState,
  action: ACTIONTYPE
): typeof initialInputState => {
  switch (action.type) {
    case "INPUT":
      return { value: action.value, isTouched: state.isTouched };
    case "BLUR":
      return { isTouched: true, value: state.value };
    case "RESET":
      return { isTouched: false, value: "" };
    default:
      return initialInputState;
  }
};

const useInput = (validateValue: validateFunc) => {
  const [inputState, dispatch] = React.useReducer(
    inputStateReducer,
    initialInputState
  );

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({ type: "INPUT", value: event.target.value });
  };

  const inputBlurHandler: React.FocusEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({ type: "BLUR" });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
