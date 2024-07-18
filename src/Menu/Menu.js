'use client';
import * as RadixMenu from '@radix-ui/react-dropdown-menu';

export const Menu = RadixMenu.Root;
export const MenuProvider = RadixMenu.Provider;
export const MenuTrigger = RadixMenu.Trigger;

export function MenuItem({ className, ...props }: RadixMenu.DropdownMenuItemProps) {
  return (
    <RadixMenu.Item
      className={`cursor-pointer py-2 px-4 hover:bg-gray-200 ${className}`}
      {...props}
    />
  );
}
MenuItem.displayName = 'MenuItem';

export function MenuContent({ className, ...props }: RadixMenu.DropdownMenuContentProps) {
  return (
    <RadixMenu.Content
      className={`bg-white shadow-md rounded-md ${className}`}
      {...props}
    />
  );
}
MenuContent.displayName = 'MenuContent';

export function MenuArrow({ className, ...props }: RadixMenu.DropdownMenuArrowProps) {
  return (
    <RadixMenu.Arrow
      className={`fill-current text-gray-200 ${className}`}
      {...props}
    />
  );
}
MenuArrow.displayName = 'MenuArrow';
