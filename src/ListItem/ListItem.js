'use client';
import { isHostComponent } from '@mui/base/utils';
import { alpha } from '@mui/system/colorManipulator';
import composeClasses from '@mui/utils/composeClasses';
import elementTypeAcceptingRef from '@mui/utils/elementTypeAcceptingRef';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as React from 'react';
import ButtonBase from '../ButtonBase';
import ListContext from '../List/ListContext';
import { listItemButtonClasses } from '../ListItemButton';
import ListItemSecondaryAction from '../ListItemSecondaryAction';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import isMuiElement from '../utils/isMuiElement';
import useEnhancedEffect from '../utils/useEnhancedEffect';
import useForkRef from '../utils/useForkRef';
import listItemClasses, { getListItemUtilityClass } from './listItemClasses';

export const overridesResolver = (props, styles) => {
  const { ownerState } = props;

  return [
    styles.root,
    ownerState.isDense && styles.dense,
    ownerState.verticalAlign === 'flex-start' && styles.alignItemsFlexStart,
    ownerState.hasDivider && styles.divider,
    !ownerState.noGutters && styles.gutters,
    !ownerState.noPadding && styles.padding,
    ownerState.isButton && styles.button,
    ownerState.hasSecondaryAction && styles.secondaryAction,
  ];
};

const useUtilityClasses = (ownerState) => {
  const {
    verticalAlign,
    isButton,
    classes,
    isDense,
    disabled,
    noGutters,
    noPadding,
    hasDivider,
    hasSecondaryAction,
    isSelected,
  } = ownerState;

  const slots = {
    root: [
      'root',
      isDense && 'dense',
      !noGutters && 'gutters',
      !noPadding && 'padding',
      hasDivider && 'divider',
      disabled && 'disabled',
      isButton && 'button',
      verticalAlign === 'flex-start' && 'alignItemsFlexStart',
      hasSecondaryAction && 'secondaryAction',
      isSelected && 'selected',
    ],
    container: ['container'],
  };

  return composeClasses(slots, getListItemUtilityClass, classes);
};

export const ListItemRoot = styled('div', {
  name: 'MuiListItem',
  slot: 'Root',
  overridesResolver,
})(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  position: 'relative',
  textDecoration: 'none',
  width: '100%',
  boxSizing: 'border-box',
  textAlign: 'left',
  [`&.${listItemClasses.focusVisible}`]: {
    backgroundColor: (theme.vars || theme).palette.action.focus,
  },
  [`&.${listItemClasses.selected}`]: {
    backgroundColor: theme.vars
      ? `rgba(${theme.vars.palette.primary.mainChannel} / ${theme.vars.palette.action.selectedOpacity})`
      : alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    [`&.${listItemClasses.focusVisible}`]: {
      backgroundColor: theme.vars
        ? `rgba(${theme.vars.palette.primary.mainChannel} / calc(${theme.vars.palette.action.selectedOpacity} + ${theme.vars.palette.action.focusOpacity}))`
        : alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity,
          ),
    },
  },
  [`&.${listItemClasses.disabled}`]: {
    opacity: (theme.vars || theme).palette.action.disabledOpacity,
  },
  variants: [
    {
      props: ({ ownerState }) => !ownerState.noPadding,
      style: {
        paddingTop: 8,
        paddingBottom: 8,
      },
    },
    {
      props: ({ ownerState }) => !ownerState.noPadding && ownerState.isDense,
      style: {
        paddingTop: 4,
        paddingBottom: 4,
      },
    },
    {
      props: ({ ownerState }) => !ownerState.noPadding && !ownerState.noGutters,
      style: {
        paddingLeft: 16,
        paddingRight: 16,
      },
    },
    {
      props: ({ ownerState }) => !ownerState.noPadding && !!ownerState.secondaryAction,
      style: {
        // Add some space to avoid collision as `ListItemSecondaryAction`
        // is absolutely positioned.
        paddingRight: 48,
      },
    },
    {
      props: ({ ownerState }) => !!ownerState.secondaryAction,
      style: {
        [`& > .${listItemButtonClasses.root}`]: {
          paddingRight: 48,
        },
      },
    },
    {
      props: {
        verticalAlign: 'flex-start',
      },
      style: {
        alignItems: 'flex-start',
      },
    },
    {
      props: ({ ownerState }) => ownerState.hasDivider,
      style: {
        borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`,
        backgroundClip: 'padding-box',
      },
    },
    {
      props: ({ ownerState }) => ownerState.isButton,
      style: {
        transition: theme.transitions.create('background-color', {
          duration: theme.transitions.duration.shortest,
        }),
        '&:hover': {
          textDecoration: 'none',
          backgroundColor: (theme.vars || theme).palette.action.hover,
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            backgroundColor: 'transparent',
          },
        },
        [`&.${listItemClasses.selected}:hover`]: {
          backgroundColor: theme.vars
            ? `rgba(${theme.vars.palette.primary.mainChannel} / calc(${theme.vars.palette.action.selectedOpacity} + ${theme.vars.palette.action.hoverOpacity}))`
            : alpha(
                theme.palette.primary.main,
                theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity,
              ),
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.primary.mainChannel} / ${theme.vars.palette.action.selectedOpacity})`
              : alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
          },
        },
      },
    },
    {
      props: ({ ownerState }) => ownerState.hasSecondaryAction,
      style: {
        // Add some space to avoid collision as `ListItemSecondaryAction`
        // is absolutely positioned.
        paddingRight: 48,
      },
    },
  ],
}));

const ListItemContainer = styled('li', {
  name: 'MuiListItem',
  slot: 'Container',
  overridesResolver: (props, styles) => styles.container,
})({
  position: 'relative',
});

/**
 * Uses an additional container component if `ListItemSecondaryAction` is the last child.
 */
const ListItem = React.forwardRef(function ListItem(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiListItem' });
  const {
    verticalAlign = 'center',
    initialFocus = false,
    isButton = false,
    content: childrenProp,
    className,
    rootComponent: componentProp,
    customComponents: components = {},
    customComponentProps: componentsProps = {},
    ContainerComponent = 'li',
    ContainerProps: { className: ContainerClassName, ...ContainerProps } = {},
    isDense = false,
    disabled = false,
    noGutters = false,
    noPadding = false,
    hasDivider = false,
    focusVisibleClassName,
    endAction: secondaryAction,
    isSelected = false,
    customSlotProps: slotProps = {},
    customSlots: slots = {},
    ...other
  } = props;

  const context = React.useContext(ListContext);
  const childContext = React.useMemo(
    () => ({
      isDense: isDense || context.dense || false,
      verticalAlign,
      noGutters,
    }),
    [verticalAlign, context.dense, isDense, noGutters],
  );

  const listItemRef = React.useRef(null);
  useEnhancedEffect(() => {
    if (initialFocus) {
      if (listItemRef.current) {
        listItemRef.current.focus();
      } else if (process.env.NODE_ENV !== 'production') {
        console.error(
          'MUI: Unable to set focus to a ListItem whose component has not been rendered.',
        );
      }
    }
  }, [initialFocus]);

  const children = React.Children.toArray(childrenProp);

  // v4 implementation, deprecated in v5, will be removed in v6
  const hasSecondaryAction =
    children.length && isMuiElement(children[children.length - 1], ['ListItemSecondaryAction']);

  const ownerState = {
    ...props,
    verticalAlign,
    initialFocus,
    isButton,
    isDense: childContext.isDense,
    disabled,
    noGutters,
    noPadding,
    hasDivider,
    hasSecondaryAction,
    isSelected,
  };

  const classes = useUtilityClasses(ownerState);

  const Root = slots.root || components.Root || ListItemRoot;
  const rootProps = slotProps.root || componentsProps.root || {};

  const Component = isButton ? ButtonBase : componentProp || slots.root || components.Root || 'div';

  const listItemProps = {
    className: clsx(classes.root, className, rootProps.className),
    disabled,
    ...other,
    ...rootProps,
    ...(!isHostComponent(Root) && {
      ownerState: { ...ownerState, ...rootProps.ownerState },
    }),
  };

  let component = (
    <ListItemContext.Provider value={childContext}>
      <Component
        ref={useForkRef(listItemRef, ref)}
        {...listItemProps}
        className={clsx(classes.root, className, rootProps.className)}
      >
        {children}
        {hasSecondaryAction && (
          <ListItemSecondaryAction>
            {children.pop()}
          </ListItemSecondaryAction>
        )}
      </Component>
    </ListItemContext.Provider>
  );

  if (hasSecondaryAction) {
    component = (
      <ListItemContext.Provider value={childContext}>
        <ContainerComponent
          className={clsx(classes.container, ContainerClassName)}
          {...ContainerProps}
        >
          {component}
        </ContainerComponent>
      </ListItemContext.Provider>
    );
  }

  return component;
});

ListItem.propTypes = {
  /**
   * Defines the `align-items` style property.
   * It's applied to all the children.
   * @default 'center'
   */
  verticalAlign: PropTypes.oneOf(['flex-start', 'center']),

  /**
   * If `true`, the list item is focused during the first mount.
   * Focus will also be triggered if the value changes from false to true.
   * @default false
   */
  initialFocus: PropTypes.bool,

  /**
   * If `true`, the list item is a button (using `ButtonBase`). Props intended for `ButtonBase` can then be applied to `ListItem`.
   * @default false
   */
  isButton: PropTypes.bool,

  /**
   * The content of the component.
   */
  content: PropTypes.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * The component to use as a root.
   * Either a string to use a HTML element or a component.
   * @default 'div'
   */
  rootComponent: elementTypeAcceptingRef,

  /**
   * The components used for each slot inside the ListItem.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  customComponents: PropTypes.shape({
    Root: PropTypes.elementType,
  }),

  /**
   * The props used for each slot inside the ListItem.
   * @default {}
   */
  customComponentProps: PropTypes.shape({
    root: PropTypes.object,
  }),

  /**
   * The container component used when `secondaryAction` is provided.
   * @default 'li'
   */
  ContainerComponent: elementTypeAcceptingRef,

  /**
   * Props applied to the container component if used.
   * @default {}
   */
  ContainerProps: PropTypes.object,

  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input is used for the list and list items.
   * The property is available to descendant components as the `dense` context.
   * @default false
   */
  isDense: PropTypes.bool,

  /**
   * If `true`, the list item is disabled.
   * @default false
   */
  disabled: PropTypes.bool,

  /**
   * If `true`, the left and right padding is removed.
   * @default false
   */
  noGutters: PropTypes.bool,

  /**
   * If `true`, the top and bottom padding is removed.
   * @default false
   */
  noPadding: PropTypes.bool,

  /**
   * If `true`, a 1px light border is added to the bottom of the list item.
   * @default false
   */
  hasDivider: PropTypes.bool,

  /**
   * Use to apply selected styling.
   * @default false
   */
  isSelected: PropTypes.bool,

  /**
   * @ignore
   */
  focusVisibleClassName: PropTypes.string,

  /**
   * The content of the component.
   */
  endAction: PropTypes.node,

  /**
   * The props used for each slot inside.
   * @default {}
   */
  customSlotProps: PropTypes.shape({
    root: PropTypes.object,
  }),

  /**
   * The components used for each slot inside.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  customSlots: PropTypes.shape({
    root: PropTypes.elementType,
  }),
};

export default ListItem;