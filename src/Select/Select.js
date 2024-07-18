'use client';
import * as RadixSelect from '@radix-ui/react-select';
import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { deepmerge } from '@mui/utils';
import ArrowDropDownIcon from '../internal/svg-icons/ArrowDropDown';
import styled from 'styled-components';
import { useFormControl } from '../FormControl/useFormControl';
import { formControlState } from '../FormControl/formControlState';

const SelectRoot = RadixSelect.Root;

const SelectTrigger = forwardRef((props, ref) => (
  <RadixSelect.Trigger asChild ref={ref}>
    <button className="select-trigger" {...props} />
  </RadixSelect.Trigger>
));
SelectTrigger.displayName = 'SelectTrigger';

const SelectContent = forwardRef(({ className, ...props }, ref) => (
  <RadixSelect.Content
    className={clsx('select-content bg-white shadow-md rounded-md p-4', className)}
    {...props}
    ref={ref}
  />
));
SelectContent.displayName = 'SelectContent';

const SelectViewport = forwardRef(({ className, ...props }, ref) => (
  <RadixSelect.Viewport className={clsx('select-viewport', className)} {...props} ref={ref} />
));
SelectViewport.displayName = 'SelectViewport';

const SelectItem = forwardRef(({ className, ...props }, ref) => (
  <RadixSelect.Item className={clsx('select-item p-2 cursor-pointer', className)} {...props} ref={ref} />
));
SelectItem.displayName = 'SelectItem';

const SelectItemText = forwardRef(({ className, ...props }, ref) => (
  <RadixSelect.ItemText className={clsx('select-item-text', className)} {...props} ref={ref} />
));
SelectItemText.displayName = 'SelectItemText';

const SelectIcon = forwardRef((props, ref) => (
  <RadixSelect.Icon className="select-icon" {...props} ref={ref}>
    <ArrowDropDownIcon />
  </RadixSelect.Icon>
));
SelectIcon.displayName = 'SelectIcon';

const Select = forwardRef(function Select(inProps, ref) {
  const props = inProps;
  const {
    autoWidth = false,
    children,
    classes: classesProp = {},
    className,
    defaultOpen = false,
    displayEmpty = false,
    IconComponent = ArrowDropDownIcon,
    id,
    inputProps,
    label,
    labelId,
    MenuProps,
    multiple = false,
    native = false,
    onClose,
    onOpen,
    open,
    renderValue,
    SelectDisplayProps,
    variant: variantProp = 'outlined',
    ...other
  } = props;

  const muiFormControl = useFormControl();
  const fcs = formControlState({
    props,
    muiFormControl,
    states: ['variant', 'error'],
  });

  const variant = fcs.variant || variantProp;

  const ownerState = { ...props, variant, classes: classesProp };
  const classes = clsx(classesProp.root, className);

  return (
    <SelectRoot>
      <SelectTrigger ref={ref} className={classes}>
        <RadixSelect.Value placeholder={label} />
        <SelectIcon>
          <IconComponent />
        </SelectIcon>
      </SelectTrigger>
      <RadixSelect.Portal>
        <SelectContent>
          <SelectViewport>{children}</SelectViewport>
        </SelectContent>
      </RadixSelect.Portal>
    </SelectRoot>
  );
});

Select.propTypes = {
  autoWidth: PropTypes.bool,
  children: PropTypes.node,
  classes: PropTypes.object,
  className: PropTypes.string,
  defaultOpen: PropTypes.bool,
  displayEmpty: PropTypes.bool,
  IconComponent: PropTypes.elementType,
  id: PropTypes.string,
  input: PropTypes.element,
  inputProps: PropTypes.object,
  label: PropTypes.node,
  labelId: PropTypes.string,
  MenuProps: PropTypes.object,
  multiple: PropTypes.bool,
  native: PropTypes.bool,
  onChange: PropTypes.func,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  open: PropTypes.bool,
  renderValue: PropTypes.func,
  SelectDisplayProps: PropTypes.object,
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  value: PropTypes.oneOfType([PropTypes.oneOf(['']), PropTypes.any]),
  variant: PropTypes.oneOf(['filled', 'outlined', 'standard']),
};

Select.muiName = 'Select';

export default Select;
