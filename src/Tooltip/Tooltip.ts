'use client';
import * as RadixTooltip from '@radix-ui/react-tooltip';

export const Tooltip = RadixTooltip.Root
export const TooltipProvider = RadixTooltip.Provider
export const TooltipTrigger = RadixTooltip.Trigger

export function TooltipArrow({
  className,
  ...props
} : RadixTooltip.TooltipArrowProps) {
  return (
    <RadixTooltip.TooltipArrow
      className={('fill-inverse', className)}
      height={6}
      width={12}
      {...props}
    />

  );
}
TooltipArrow.displayName = 'TooltipArrow';
