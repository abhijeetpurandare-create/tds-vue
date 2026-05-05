import type { AnchoredOverlayPlacement } from './index';

/**
 * Maps AnchoredOverlay placement to Coachmarks arrowPosition.
 * 
 * placement=top → coachmark is above trigger → arrow on bottom edge pointing down
 * placement=bottom → coachmark is below trigger → arrow on top edge pointing up
 * placement=left → coachmark is left of trigger → arrow on right edge pointing right
 * placement=right → coachmark is right of trigger → arrow on left edge pointing left
 */
export function placementToCoachmarksArrow(
  placement: AnchoredOverlayPlacement,
): 'top-left' | 'top-mid' | 'top-right' | 'bottom-left' | 'bottom-mid' | 'bottom-right' | 'left-top' | 'left-mid' | 'left-bottom' | 'right-top' | 'right-mid' | 'right-bottom' {
  switch (placement) {
    case 'top':          return 'bottom-mid';
    case 'top-start':    return 'bottom-left';
    case 'top-end':      return 'bottom-right';
    case 'bottom':       return 'top-mid';
    case 'bottom-start': return 'top-left';
    case 'bottom-end':   return 'top-right';
    case 'left':         return 'right-mid';
    case 'left-start':   return 'right-top';
    case 'left-end':     return 'right-bottom';
    case 'right':        return 'left-mid';
    case 'right-start':  return 'left-top';
    case 'right-end':    return 'left-bottom';
    default:             return 'bottom-mid';
  }
}
