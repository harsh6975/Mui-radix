"use client";
import * as RadixPopover from "@radix-ui/react-popover";
import { forwardRef } from "react";

// Popover root component
export const Popover = RadixPopover.Root;

// Popover trigger button
export const PopoverTrigger = forwardRef((props, ref) => (
  <RadixPopover.Trigger asChild ref={ref}>
    <button {...props} />
  </RadixPopover.Trigger>
));
PopoverTrigger.displayName = "PopoverTrigger";

// Popover content component
export const PopoverContent = forwardRef(({ className, ...props }, ref) => (
  <RadixPopover.Content
    className={`bg-white shadow-md rounded-md p-4 ${className}`}
    {...props}
    ref={ref}
  />
));
PopoverContent.displayName = "PopoverContent";

// Popover arrow component
export const PopoverArrow = forwardRef(({ className, ...props }, ref) => (
  <RadixPopover.Arrow
    className={`fill-current text-gray-200 ${className}`}
    {...props}
    ref={ref}
  />
));
PopoverArrow.displayName = "PopoverArrow";

// Popover close button
export const PopoverClose = forwardRef((props, ref) => (
  <RadixPopover.Close asChild ref={ref}>
    <button {...props} />
  </RadixPopover.Close>
));
PopoverClose.displayName = "PopoverClose";
