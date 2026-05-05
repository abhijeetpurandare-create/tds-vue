import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { css } from '@emotion/css';
import { useTheme } from '../ThemeProvider';
import { defaultTooltipStyles } from '../../config/config';
import {
  buildTooltipBodyStyles, buildTooltipTextStyles, buildTooltipTitleStyles,
  buildTooltipDescriptionStyles, buildTooltipDividerStyles, buildTooltipCtaStyles,
  buildTooltipIconWrapStyles, buildTooltipOuterStyles, buildCssArrowStyles,
  placementToArrowPosition,
} from './useTooltipStyles';
import type {
  TarmacTooltipVariant, TarmacTooltipType, TarmacTooltipStyle,
  TarmacArrowPosition, TooltipThemeConfig,
} from './useTooltipStyles';

export type { TarmacTooltipVariant, TarmacTooltipType, TarmacTooltipStyle, TarmacArrowPosition };

export type TooltipPlacement =
  | 'top' | 'top-start' | 'top-end'
  | 'bottom' | 'bottom-start' | 'bottom-end'
  | 'left' | 'left-start' | 'left-end'
  | 'right' | 'right-start' | 'right-end';

export type TooltipTrigger = 'hover' | 'click' | 'focus' | 'manual';
export type TooltipVariant =
  | 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info'
  | 'white' | 'black' | 'coal';
export type TooltipSize = 'sm' | 'md' | 'lg';

const TARMAC_VARIANTS: ReadonlySet<string> = new Set(['white', 'black', 'coal']);

export interface TooltipProps {
  content: React.ReactNode;
  children?: React.ReactNode;
  placement?: TooltipPlacement;
  trigger?: TooltipTrigger;
  variant?: TooltipVariant;
  size?: TooltipSize;
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  delay?: number;
  enterDelay?: number;
  leaveDelay?: number;
  className?: string;
  style?: React.CSSProperties;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  arrowColor?: string;
  maxWidth?: string | number;
  zIndex?: number;
  disabled?: boolean;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  overlayClassName?: string;
  overlayStyle?: React.CSSProperties;
  destroyTooltipOnHide?: boolean;
  autoAdjustOverflow?: boolean;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  interactive?: boolean;
  ellipsis?: boolean;
  tooltipType?: TarmacTooltipType;
  tooltipStyle?: TarmacTooltipStyle;
  arrowPosition?: TarmacArrowPosition;
  title?: React.ReactNode;
  description?: React.ReactNode;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  ctaActions?: {
    skip?: { label: string; onClick?: () => void };
    prev?: { label: string; onClick?: () => void };
    next?: { label: string; onClick?: () => void };
  };
  renderInline?: boolean;
}

const TarmacContent: React.FC<{
  tc: TooltipThemeConfig; variant: TarmacTooltipVariant;
  tooltipType: TarmacTooltipType; tooltipStyle: TarmacTooltipStyle;
  arrowPosition: TarmacArrowPosition; content: React.ReactNode;
  title?: React.ReactNode; description?: React.ReactNode;
  leadingIcon?: React.ReactNode; trailingIcon?: React.ReactNode;
  ctaActions?: TooltipProps['ctaActions'];
}> = ({ tc, variant, tooltipType, tooltipStyle, arrowPosition, content, title, description, leadingIcon, trailingIcon, ctaActions }) => {
  const sp = { tooltipConfig: tc, variant };
  const vc = tc.variants?.[variant] || {};
  const ac = vc.arrowColor || vc.backgroundColor || '#ffffff';
  const isStd = tooltipType === 'standard';
  const isDual = tooltipStyle === 'dualText';

  const renderText = () => {
    if (isStd && !isDual) return <div className={buildTooltipTextStyles(sp)}>{content}</div>;
    if (isStd && isDual) return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className={buildTooltipTitleStyles(sp)}>{title || content}</div>
        {description && <div className={buildTooltipDescriptionStyles(sp)}>{description}</div>}
      </div>
    );
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
        <div className={buildTooltipTextStyles(sp)}>{content}</div>
        {isDual && description && <div className={buildTooltipDescriptionStyles(sp)}>{description}</div>}
        <div className={buildTooltipDividerStyles(sp)} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '24px' }}>
          {ctaActions?.skip && <button className={buildTooltipCtaStyles(sp, 'primary')} onClick={ctaActions.skip.onClick} type="button">{ctaActions.skip.label}</button>}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {ctaActions?.prev && <button className={buildTooltipCtaStyles(sp, 'highlight')} onClick={ctaActions.prev.onClick} type="button">{ctaActions.prev.label}</button>}
            {ctaActions?.next && <button className={buildTooltipCtaStyles(sp, 'secondary')} onClick={ctaActions.next.onClick} type="button">{ctaActions.next.label}</button>}
          </div>
        </div>
      </div>
    );
  };

  const arrowCls = buildCssArrowStyles(arrowPosition, ac);
  const bodyEl = (
    <div className={buildTooltipBodyStyles(sp)}>
      {leadingIcon && <div className={buildTooltipIconWrapStyles(sp)}>{leadingIcon}</div>}
      {renderText()}
      {trailingIcon && <div className={buildTooltipIconWrapStyles(sp)}>{trailingIcon}</div>}
    </div>
  );

  // Outer container has the arrow as ::before pseudo-element; body z-index covers inner half
  const outerCls = `${buildTooltipOuterStyles(arrowPosition)} ${arrowCls}`;
  return (
    <div className={outerCls}>
      {bodyEl}
    </div>
  );
};

const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  ({ content, children, placement = 'top', trigger = 'hover', variant = 'default', size = 'md',
    visible: controlledVisible, onVisibleChange, enterDelay = 0, leaveDelay = 0,
    className = '', style, backgroundColor, textColor, borderColor, arrowColor: arrowColorProp,
    maxWidth = 250, zIndex = 1050, disabled = false,
    mouseEnterDelay = 0.5, mouseLeaveDelay = 0.1,
    overlayClassName = '', overlayStyle, autoAdjustOverflow = true,
    getPopupContainer, interactive = false, ellipsis = false,
    tooltipType = 'standard', tooltipStyle = 'singleText',
    arrowPosition: arrowPositionProp,
    title: titleProp, description, leadingIcon, trailingIcon, ctaActions,
    renderInline = false,
    ...props
  }, _ref) => {
    const { theme } = useTheme();
    const isTarmac = TARMAC_VARIANTS.has(variant);
    const cfg = theme.components?.tooltip || defaultTooltipStyles;
    const vc = cfg?.variants?.[variant] || {};
    const sc = cfg?.sizes?.[size] || {};
    const tc: TooltipThemeConfig = theme.components?.tooltip || {};

    // --- Inline mode ---
    if (renderInline && isTarmac) {
      const ap = arrowPositionProp || placementToArrowPosition(placement);
      return (
        <div className={className} style={style}>
          <TarmacContent tc={tc} variant={variant as TarmacTooltipVariant}
            tooltipType={tooltipType} tooltipStyle={tooltipStyle} arrowPosition={ap}
            content={content} title={titleProp} description={description}
            leadingIcon={leadingIcon} trailingIcon={trailingIcon} ctaActions={ctaActions} />
        </div>
      );
    }

    // --- Portal mode ---
    const [visible, setVisible] = useState(false);
    const [pos, setPos] = useState({ top: 0, left: 0 });
    const [isVisible, setIsVisible] = useState(false);
    // Track the actual placement after auto-flip (used for arrow direction)
    const actualPlacementRef = useRef<TooltipPlacement>(placement);
    const [actualPlacement, setActualPlacement] = useState<TooltipPlacement>(placement);
    const triggerRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const isControlled = controlledVisible !== undefined;
    const shouldShow = isControlled ? controlledVisible : visible;

    // Arrow always synced: prop > auto from actual placement
    const resolvedArrow = arrowPositionProp || placementToArrowPosition(actualPlacement);

    // Sync when placement prop changes (storybook control)
    useEffect(() => {
      actualPlacementRef.current = placement;
      setActualPlacement(placement);
    }, [placement]);

    const calcPos = useCallback(() => {
      if (!triggerRef.current || !tooltipRef.current) return;
      const tr = triggerRef.current.getBoundingClientRect();
      const tt = tooltipRef.current.getBoundingClientRect();
      let t = 0, l = 0;
      let fp: TooltipPlacement = placement;
      // Gap between trigger and tooltip edge.
      // Tarmac variants have a CSS arrow that protrudes 5px (half of 10px notch)
      // outside the tooltip body. Since getBoundingClientRect() only measures the body,
      // the gap must include the arrow protrusion + desired visual spacing.
      const g = isTarmac ? 10 : 4;

      switch (placement) {
        case 'top':         t = tr.top - tt.height - g; l = tr.left + (tr.width - tt.width) / 2; break;
        case 'top-start':   t = tr.top - tt.height - g; l = tr.left; break;
        case 'top-end':     t = tr.top - tt.height - g; l = tr.right - tt.width; break;
        case 'bottom':      t = tr.bottom + g; l = tr.left + (tr.width - tt.width) / 2; break;
        case 'bottom-start':t = tr.bottom + g; l = tr.left; break;
        case 'bottom-end':  t = tr.bottom + g; l = tr.right - tt.width; break;
        case 'left':        t = tr.top + (tr.height - tt.height) / 2; l = tr.left - tt.width - g; break;
        case 'left-start':  t = tr.top; l = tr.left - tt.width - g; break;
        case 'left-end':    t = tr.bottom - tt.height; l = tr.left - tt.width - g; break;
        case 'right':       t = tr.top + (tr.height - tt.height) / 2; l = tr.right + g; break;
        case 'right-start': t = tr.top; l = tr.right + g; break;
        case 'right-end':   t = tr.bottom - tt.height; l = tr.right + g; break;
      }

      if (autoAdjustOverflow) {
        const vw = window.innerWidth, vh = window.innerHeight;
        if (t < 0 && placement.startsWith('top')) {
          t = tr.bottom + g; fp = placement.replace('top', 'bottom') as TooltipPlacement;
        } else if (t + tt.height > vh && placement.startsWith('bottom')) {
          t = tr.top - tt.height - g; fp = placement.replace('bottom', 'top') as TooltipPlacement;
        }
        if (l < 0 && placement.startsWith('left')) {
          l = tr.right + g; fp = placement.replace('left', 'right') as TooltipPlacement;
        } else if (l + tt.width > vw && placement.startsWith('right')) {
          l = tr.left - tt.width - g; fp = placement.replace('right', 'left') as TooltipPlacement;
        }
        if (l < 4) l = 4;
        if (l + tt.width > vw - 4) l = vw - tt.width - 4;
        if (t < 4) t = 4;
        if (t + tt.height > vh - 4) t = vh - tt.height - 4;
      }

      setPos({ top: t, left: l });
      actualPlacementRef.current = fp;
      setActualPlacement(fp);
    }, [placement, autoAdjustOverflow]);

    const show = useCallback(() => {
      if (disabled) return;
      const d = trigger === 'hover' ? mouseEnterDelay * 1000 : enterDelay;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        if (!isControlled) setVisible(true);
        onVisibleChange?.(true); setIsVisible(true);
        requestAnimationFrame(() => requestAnimationFrame(() => calcPos()));
      }, d);
    }, [disabled, trigger, mouseEnterDelay, enterDelay, isControlled, onVisibleChange, calcPos]);

    const hide = useCallback(() => {
      if (disabled) return;
      const d = trigger === 'hover' ? mouseLeaveDelay * 1000 : leaveDelay;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        if (!isControlled) setVisible(false);
        onVisibleChange?.(false); setIsVisible(false);
      }, d);
    }, [disabled, trigger, mouseLeaveDelay, leaveDelay, isControlled, onVisibleChange]);

    const handleClick = useCallback(() => { if (trigger === 'click') { shouldShow ? hide() : show(); } }, [trigger, shouldShow, show, hide]);
    const handleFocus = useCallback(() => { if (trigger === 'focus') show(); }, [trigger, show]);
    const handleBlur = useCallback(() => { if (trigger === 'focus') hide(); }, [trigger, hide]);
    const handleEnter = useCallback(() => { if (trigger === 'hover') show(); }, [trigger, show]);
    const handleLeave = useCallback(() => { if (trigger === 'hover') hide(); }, [trigger, hide]);

    useEffect(() => {
      if (isControlled) {
        setIsVisible(controlledVisible || false);
        if (controlledVisible) requestAnimationFrame(() => requestAnimationFrame(() => calcPos()));
      }
    }, [controlledVisible, isControlled, calcPos]);

    useEffect(() => {
      if (shouldShow && tooltipRef.current) requestAnimationFrame(() => calcPos());
    }, [shouldShow, calcPos]);

    useEffect(() => {
      if (!shouldShow) return;
      const h = () => calcPos();
      window.addEventListener('resize', h);
      window.addEventListener('scroll', h, true);
      return () => { window.removeEventListener('resize', h); window.removeEventListener('scroll', h, true); };
    }, [shouldShow, calcPos]);

    useEffect(() => () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }, []);

    const legacyOv = css({
      position: 'fixed', zIndex, maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
      padding: sc.padding, fontSize: sc.fontSize, fontFamily: cfg?.base?.fontFamily, fontWeight: cfg?.base?.fontWeight,
      lineHeight: cfg?.base?.lineHeight, borderRadius: cfg?.base?.radius, boxShadow: cfg?.base?.shadow,
      border: '1px solid', backgroundColor: backgroundColor || vc.backgroundColor, color: textColor || vc.textColor,
      borderColor: borderColor || vc.borderColor, opacity: isVisible ? 1 : 0, visibility: shouldShow ? 'visible' : 'hidden',
      transition: `opacity ${cfg?.base?.transition}, visibility ${cfg?.base?.transition}`,
      pointerEvents: interactive ? 'auto' : 'none', whiteSpace: 'pre-wrap', wordBreak: 'break-word', textAlign: 'center',
      '&::before': { content: '""', position: 'absolute', width: 0, height: 0, border: '6px solid transparent', pointerEvents: 'none' },
      ...(actualPlacement.startsWith('top') && { '&::before': { bottom: '-6px', left: '50%', transform: 'translateX(-50%)', borderTopColor: arrowColorProp || vc.backgroundColor } }),
      ...(actualPlacement.startsWith('bottom') && { '&::before': { top: '-6px', left: '50%', transform: 'translateX(-50%)', borderBottomColor: arrowColorProp || vc.backgroundColor } }),
      ...(actualPlacement.startsWith('left') && { '&::before': { right: '-6px', top: '50%', transform: 'translateY(-50%)', borderLeftColor: arrowColorProp || vc.backgroundColor } }),
      ...(actualPlacement.startsWith('right') && { '&::before': { left: '-6px', top: '50%', transform: 'translateY(-50%)', borderRightColor: arrowColorProp || vc.backgroundColor } }),
    });

    const tarmacOv = css({
      position: 'fixed', zIndex, maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
      opacity: isVisible ? 1 : 0, visibility: shouldShow ? 'visible' : 'hidden',
      transition: 'opacity 0.15s ease-in-out, visibility 0.15s ease-in-out',
      pointerEvents: (interactive || tooltipType === 'ctas') ? 'auto' : 'none',
    });

    const trig = css({
      display: 'inline-block', cursor: trigger === 'click' ? 'pointer' : 'default',
      ...(ellipsis && { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }),
    });

    const container = getPopupContainer?.(triggerRef.current!) || document.body;
    const intOv = interactive || (isTarmac && tooltipType === 'ctas');

    const overlay = shouldShow ? (
      <div ref={tooltipRef} className={`${isTarmac ? tarmacOv : legacyOv} ${overlayClassName}`}
        style={{ ...overlayStyle, top: pos.top, left: pos.left }}
        role="tooltip" aria-hidden={!shouldShow}
        onMouseEnter={intOv ? handleEnter : undefined} onMouseLeave={intOv ? handleLeave : undefined}>
        {isTarmac ? (
          <TarmacContent tc={tc} variant={variant as TarmacTooltipVariant}
            tooltipType={tooltipType} tooltipStyle={tooltipStyle} arrowPosition={resolvedArrow}
            content={content} title={titleProp} description={description}
            leadingIcon={leadingIcon} trailingIcon={trailingIcon} ctaActions={ctaActions} />
        ) : content}
      </div>
    ) : null;

    return (
      <>
        <div ref={triggerRef} className={`${trig} ${className}`} style={style}
          onClick={handleClick} onFocus={handleFocus} onBlur={handleBlur}
          onMouseEnter={handleEnter} onMouseLeave={handleLeave}
          tabIndex={trigger === 'focus' ? 0 : undefined} {...props}>
          {children}
        </div>
        {overlay && ReactDOM.createPortal(overlay, container)}
      </>
    );
  }
);

Tooltip.displayName = 'Tooltip';
export default Tooltip;
