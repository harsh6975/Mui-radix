"use client";
import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import PropTypes from "prop-types";
import { forwardRef } from "react";

// Checkbox root component
export const CheckboxRoot = forwardRef(({ className, ...props }, ref) => (
  <RadixCheckbox.Root
    className={clsx(
      "checkbox-root inline-flex items-center justify-center",
      className
    )}
    {...props}
    ref={ref}
  />
));
CheckboxRoot.displayName = "CheckboxRoot";

// Checkbox indicator component
export const CheckboxIndicator = forwardRef(({ className, ...props }, ref) => (
  <RadixCheckbox.Indicator
    className={clsx("checkbox-indicator", className)}
    {...props}
    ref={ref}
  >
    <CheckIcon />
  </RadixCheckbox.Indicator>
));
CheckboxIndicator.displayName = "CheckboxIndicator";

// Checkbox component definition
const Checkbox = forwardRef(function Checkbox(inProps, ref) {
  const {
    checked,
    defaultChecked,
    disabled,
    required,
    onChange,
    className,
    ...other
  } = inProps;

  return (
    <CheckboxRoot
      checked={checked}
      defaultChecked={defaultChecked}
      disabled={disabled}
      required={required}
      onCheckedChange={onChange}
      className={clsx("checkbox", className)}
      {...other}
      ref={ref}
    >
      <CheckboxIndicator />
    </CheckboxRoot>
  );
});

Checkbox.propTypes = {
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string,
};

Checkbox.defaultProps = {
  checked: undefined,
  defaultChecked: undefined,
  disabled: false,
  required: false,
  onChange: undefined,
  className: "",
};

export default Checkbox;
