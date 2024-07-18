'use client';
import composeClasses from '@mui/utils/composeClasses';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as React from 'react';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import ListContext from './ListContext';
import { getListUtilityClass } from './listClasses';

const useUtilityClasses = (ownerState) => {
  const { customClasses, noPadding, isDense, header } = ownerState;

  const slots = {
    root: ['root', !noPadding && 'padding', isDense && 'dense', header && 'subheader'],
  };

  return composeClasses(slots, getListUtilityClass, customClasses);
};

const ListRoot = styled('ul', {
  name: 'MuiList',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      !ownerState.noPadding && styles.padding,
      ownerState.isDense && styles.dense,
      ownerState.header && styles.subheader,
    ];
  },
})(({ ownerState }) => ({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  position: 'relative',
  ...(!ownerState.noPadding && {
    paddingTop: 8,
    paddingBottom: 8,
  }),
  ...(ownerState.header && {
    paddingTop: 0,
  }),
}));

const List = React.forwardRef(function List(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiList' });
  const {
    content,
    className,
    component = 'ul',
    isDense = false,
    noPadding = false,
    header,
    ...other
  } = props;

  const context = React.useMemo(() => ({ isDense }), [isDense]);

  const ownerState = {
    ...props,
    component,
    isDense,
    noPadding,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <ListContext.Provider value={context}>
      <ListRoot
        as={component}
        className={clsx(classes.root, className)}
        ref={ref}
        ownerState={ownerState}
        {...other}
      >
        {header}
        {content}
      </ListRoot>
    </ListContext.Provider>
  );
});

List.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  content: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  customClasses: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use an HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input is used for
   * the list and list items.
   * The prop is available to descendant components as the `dense` context.
   * @default false
   */
  isDense: PropTypes.bool,
  /**
   * If `true`, vertical padding is removed from the list.
   * @default false
   */
  noPadding: PropTypes.bool,
  /**
   * The content of the subheader, normally `ListSubheader`.
   */
  header: PropTypes.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  styles: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default List;
