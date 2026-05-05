import React, { useState, useRef, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';

export type AnchoredOverlayPlacement =
  | 'top' | 'top-start' | 'top-end'
  | 'bottom' | 'bottom-start' | 'bottom-end'
  | 'left' | 'left-start' | 'left-end'
  | 'right' | 'right-start' | 'right-end';

export type AnchoredOverlayTrigger = 'hover' | 'click' | 'focus' | 'manual';

export interface AnchoredOverlayProps {
  /** The content to show in the overlay (e.g. Coachmarks, any custom node) */
  content: React.ReactNode;
  /** The trigger element */
  children: React.ReactNode;
  /** Preferred placement relative to trigger */
  placement?: AnchoredOverlayPlacement;
  /** How the overlay is triggered */
  trigger?: AnchoredOverlayTrigger;
  /** Controlled visibility */
  visible?: boolean;
  /** Called when visibility should change */
  onVisibleChange?: (visible: boolean) => void;
  /** Gap in px between trigger edge and overlay */
  gap?: number;
  /** Delay in ms before showing on hover */
  enterDelay?: number;
  /** Delay in ms before hiding on hover */
  leaveDelay?: number;
  /** Keep overlay interactive (mouse events pass through) */
  interactive?: boolean;
  /** Flip to opposite side if viewport overflow detected */
  autoAdjustOverflow?: boolean;
  /** z-index of the overlay */
  zIndex?: number;
  /** Max width of the overlay container */
  maxWidth?: number | string;
  /** Portal target — defaults to document.body */
  getContainer?: () => HTMLElement;
  /** Called with the actual placement after any auto-flip */
  onPlacementChange?: (placement: AnchoredOverlayPlacement) => void;
  className?: string;
  style?: React.CSSProperties;
  /** Extra styles applied to the overlay portal div */
  overlayStyle?: React.CSSProperties;
  /** Close the overlay when clicking outside both the trigger and the overlay. Only applies to trigger="click" and trigger="manual". */
  dismissOnOutsideClick?: boolean;
}

function calcPosition(
  triggerRect: DOMRect,
  overlayRect: DOMRect,
  placement: AnchoredOverlayPlacement,
  gap: number,
  autoAdjust: boolean,
): { top: number; left: number; actualPlacement: AnchoredOverlayPlacement } {
  let t = 0, l = 0;
  let fp: AnchoredOverlayPlacement = placement;

  switch (placement) {
    case 'top':          t = triggerRect.top - overlayRect.height - gap;                              l = triggerRect.left + (triggerRect.width - overlayRect.width) / 2; break;
    case 'top-start':    t = triggerRect.top - overlayRect.height - gap;                              l = triggerRect.left; break;
    case 'top-end':      t = triggerRect.top - overlayRect.height - gap;                              l = triggerRect.right - overlayRect.width; break;
    case 'bottom':       t = triggerRect.bottom + gap;                                                l = triggerRect.left + (triggerRect.width - overlayRect.width) / 2; break;
    case 'bottom-start': t = triggerRect.bottom + gap;                                                l = triggerRect.left; break;
    case 'bottom-end':   t = triggerRect.bottom + gap;                                                l = triggerRect.right - overlayRect.width; break;
    case 'left':         t = triggerRect.top + (triggerRect.height - overlayRect.height) / 2;        l = triggerRect.left - overlayRect.width - gap; break;
    case 'left-start':   t = triggerRect.top;                                                         l = triggerRect.left - overlayRect.width - gap; break;
    case 'left-end':     t = triggerRect.bottom - overlayRect.height;                                 l = triggerRect.left - overlayRect.width - gap; break;
    case 'right':        t = triggerRect.top + (triggerRect.height - overlayRect.height) / 2;        l = triggerRect.right + gap; break;
    case 'right-start':  t = triggerRect.top;                                                         l = triggerRect.right + gap; break;
    case 'right-end':    t = triggerRect.bottom - overlayRect.height;                                 l = triggerRect.right + gap; break;
  }

  if (autoAdjust) {
    const vw = window.innerWidth, vh = window.innerHeight;
    if (t < 0 && placement.startsWith('top')) {
      t = triggerRect.bottom + gap;
      fp = placement.replace('top', 'bottom') as AnchoredOverlayPlacement;
    } else if (t + overlayRect.height > vh && placement.startsWith('bottom')) {
      t = triggerRect.top - overlayRect.height - gap;
      fp = placement.replace('bottom', 'top') as AnchoredOverlayPlacement;
    }
    if (l < 0 && placement.startsWith('left')) {
      l = triggerRect.right + gap;
      fp = placement.replace('left', 'right') as AnchoredOverlayPlacement;
    } else if (l + overlayRect.width > vw && placement.startsWith('right')) {
      l = triggerRect.left - overlayRect.width - gap;
      fp = placement.replace('right', 'left') as AnchoredOverlayPlacement;
    }
    // clamp to viewport edges
    l = Math.max(4, Math.min(l, vw - overlayRect.width - 4));
    t = Math.max(4, Math.min(t, vh - overlayRect.height - 4));
  }

  return { top: t, left: l, actualPlacement: fp };
}

const AnchoredOverlay: React.FC<AnchoredOverlayProps> = ({
  content,
  children,
  placement = 'bottom-start',
  trigger = 'hover',
  visible: controlledVisible,
  onVisibleChange,
  gap = 8,
  enterDelay = 0,
  leaveDelay = 0,
  interactive = false,
  autoAdjustOverflow = true,
  zIndex = 1200,
  maxWidth,
  getContainer,
  onPlacementChange,
  className = '',
  style,
  overlayStyle,
  dismissOnOutsideClick = false,
}) => {
  const isControlled = controlledVisible !== undefined;
  const [internalVisible, setInternalVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // drives opacity for fade-in
  // Start off-screen so the first mount doesn't cause a layout jerk at 0,0
  const [pos, setPos] = useState({ top: -9999, left: -9999 });
  const hasPositioned = useRef(false);
  const [actualPlacement, setActualPlacement] = useState<AnchoredOverlayPlacement>(placement);

  const triggerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const shouldShow = isControlled ? controlledVisible! : internalVisible;

  // Sync actualPlacement when placement prop changes
  useEffect(() => { setActualPlacement(placement); }, [placement]);

  const recalc = useCallback(() => {
    if (!triggerRef.current || !overlayRef.current) return;
    const result = calcPosition(
      triggerRef.current.getBoundingClientRect(),
      overlayRef.current.getBoundingClientRect(),
      placement,
      gap,
      autoAdjustOverflow,
    );
    setPos({ top: result.top, left: result.left });
    hasPositioned.current = true;
    if (result.actualPlacement !== actualPlacement) {
      setActualPlacement(result.actualPlacement);
      onPlacementChange?.(result.actualPlacement);
    }
  }, [placement, gap, autoAdjustOverflow, actualPlacement, onPlacementChange]);

  const show = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      hasPositioned.current = false;
      setPos({ top: -9999, left: -9999 });
      if (!isControlled) setInternalVisible(true);
      onVisibleChange?.(true);
      // position first, then fade in — eliminates the jerk
      requestAnimationFrame(() => requestAnimationFrame(() => {
        recalc();
        setIsVisible(true);
      }));
    }, enterDelay);
  }, [isControlled, onVisibleChange, enterDelay, recalc]);

  const hide = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (!isControlled) setInternalVisible(false);
      onVisibleChange?.(false);
      setIsVisible(false);
    }, leaveDelay);
  }, [isControlled, onVisibleChange, leaveDelay]);

  // Controlled mode sync
  useEffect(() => {
    if (!isControlled) return;
    if (controlledVisible) {
      hasPositioned.current = false;
      setPos({ top: -9999, left: -9999 });
      requestAnimationFrame(() => requestAnimationFrame(() => {
        recalc();
        setIsVisible(true);
      }));
    } else {
      setIsVisible(false);
    }
  }, [controlledVisible, isControlled, recalc]);

  // Recalc when overlay becomes visible
  useEffect(() => {
    if (shouldShow && overlayRef.current) requestAnimationFrame(() => recalc());
  }, [shouldShow, recalc]);

  // Scroll + resize tracking while open
  useEffect(() => {
    if (!shouldShow) return;
    window.addEventListener('resize', recalc);
    window.addEventListener('scroll', recalc, true);
    return () => {
      window.removeEventListener('resize', recalc);
      window.removeEventListener('scroll', recalc, true);
    };
  }, [shouldShow, recalc]);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  // Outside-click dismiss — uses mousedown so it fires before the trigger's onClick
  useEffect(() => {
    if (!dismissOnOutsideClick || !shouldShow) return;
    const onMouseDown = (e: MouseEvent) => {
      const target = e.target as Node;
      const insideTrigger = triggerRef.current?.contains(target);
      const insideOverlay = overlayRef.current?.contains(target);
      if (!insideTrigger && !insideOverlay) hide();
    };
    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, [dismissOnOutsideClick, shouldShow, hide]);

  const handleClick = () => { if (trigger === 'click') shouldShow ? hide() : show(); };
  const handleFocus = () => { if (trigger === 'focus') show(); };
  const handleBlur  = () => { if (trigger === 'focus') hide(); };

  // For hover: use document mousemove to check if pointer left both elements.
  // This avoids synthetic enter/leave firing on every child boundary inside the card.
  const handleEnter = () => {
    if (trigger !== 'hover') return;
    if (timerRef.current) clearTimeout(timerRef.current);
    show();
  };

  useEffect(() => {
    if (trigger !== 'hover' || !shouldShow) return;
    const onMove = (e: MouseEvent) => {
      const overTrigger = triggerRef.current?.contains(e.target as Node) ||
        triggerRef.current === e.target;
      const overOverlay = overlayRef.current?.contains(e.target as Node) ||
        overlayRef.current === e.target;
      if (!overTrigger && !overOverlay) {
        hide();
      } else {
        // still inside — cancel any pending hide
        if (timerRef.current) clearTimeout(timerRef.current);
      }
    };
    document.addEventListener('mousemove', onMove);
    return () => document.removeEventListener('mousemove', onMove);
  }, [trigger, shouldShow, hide]);

  const container = getContainer?.() ?? document.body;

  const overlay = shouldShow ? (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="false"
      style={{
        position: 'fixed',
        top: pos.top,
        left: pos.left,
        zIndex,
        maxWidth: maxWidth !== undefined ? (typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth) : undefined,
        opacity: isVisible ? 1 : 0,
        visibility: shouldShow ? 'visible' : 'hidden',
        transition: 'opacity 0.15s ease-in-out, visibility 0.15s ease-in-out',
        pointerEvents: interactive ? 'auto' : 'none',
        ...overlayStyle,
      }}
      onMouseEnter={trigger === 'hover' ? handleEnter : undefined}
      onMouseLeave={undefined}
    >
      {/* Expose actualPlacement via data attribute — consumers can read it for arrow sync */}
      <div data-anchored-placement={actualPlacement}>
        {content}
      </div>
    </div>
  ) : null;

  return (
    <>
      <div
        ref={triggerRef}
        className={className}
        style={{ display: 'inline-block', ...style }}
        onClick={handleClick}
        onMouseEnter={trigger === 'hover' ? handleEnter : undefined}
        onFocus={handleFocus}
        onBlur={handleBlur}
        tabIndex={trigger === 'focus' ? 0 : undefined}
      >
        {children}
      </div>
      {overlay && ReactDOM.createPortal(overlay, container)}
    </>
  );
};

export default AnchoredOverlay;
export { AnchoredOverlay };
