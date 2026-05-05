import * as React from 'react';
import { css } from '@emotion/css';
import { useTheme } from '../ThemeProvider';
import { defaultThemeConfig } from '../../config/config';
import Spinner from '../Spinner';
import {
  buildToggleTrackStyles,
  buildToggleHandleStyles,
} from './useToggleStyles';
import type {
  ToggleTarmacConfig,
  TarmacToggleColor,
  TarmacToggleStyle,
  TarmacToggleSize,
} from './useToggleStyles';

export type { ToggleTarmacConfig, TarmacToggleColor, TarmacToggleStyle, TarmacToggleSize };

export type SwitchSize = 'sm' | 'md' | 'lg';
export type SwitchVariant = 'primary' | 'secondary' | 'outline';
export type SwitchChangeEventHandler = (checked: boolean, event: React.MouseEvent<HTMLButtonElement>) => void;
export type SwitchClickEventHandler = (checked: boolean, event: React.MouseEvent<HTMLButtonElement>) => void;

export interface SwitchProps {
  prefixCls?: string;
  size?: SwitchSize;
  variant?: SwitchVariant;
  className?: string;
  rootClassName?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  value?: boolean;
  defaultValue?: boolean;
  onChange?: SwitchChangeEventHandler;
  onClick?: SwitchClickEventHandler;
  checkedChildren?: React.ReactNode;
  unCheckedChildren?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  autoFocus?: boolean;
  style?: React.CSSProperties;
  title?: string;
  tabIndex?: number;
  id?: string;
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
  hoverColor?: string;
  radius?: string;
  /** @description Tarmac TDS color (black/blue/dlv_red/green) — activates Tarmac rendering path */
  tarmacColor?: TarmacToggleColor;
  /** @description Tarmac TDS style (filled/outlined) */
  tarmacStyle?: TarmacToggleStyle;
  /** @description Tarmac TDS size (lg/sm) */
  tarmacSize?: TarmacToggleSize;
  /** @description Ghost state — renders a placeholder toggle */
  isGhost?: boolean;
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>((props, ref) => {
  const {
    prefixCls: customizePrefixCls = 'switch',
    size = 'md',
    variant = 'primary',
    disabled = false,
    loading = false,
    className = '',
    rootClassName = '',
    style = {},
    checked: checkedProp,
    value,
    defaultChecked = false,
    defaultValue = false,
    onChange,
    onClick,
    checkedChildren,
    unCheckedChildren,
    autoFocus,
    title,
    tabIndex,
    id,
    color,
    backgroundColor,
    borderColor,
    hoverColor,
    radius,
    tarmacColor,
    tarmacStyle = 'filled',
    tarmacSize = 'lg',
    isGhost = false,
    ...restProps
  } = props;

  const { theme } = useTheme();

  // Use internal state if not controlled
  const [innerChecked, setInnerChecked] = React.useState(defaultChecked || defaultValue || false);

  // Determine if component is controlled
  const isControlled = checkedProp !== undefined || value !== undefined;
  const mergedChecked = isControlled ? (checkedProp ?? value) : innerChecked;

  // Merge disabled state
  const mergedDisabled = disabled || loading;

  // Handle click event
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (mergedDisabled || isGhost) {
      return;
    }

    if (!isControlled) {
      setInnerChecked(!mergedChecked);
    }

    onClick?.(mergedChecked!, e);
    onChange?.(!mergedChecked, e);
  };

  // Focus on mount if autoFocus is true
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  React.useImperativeHandle(ref, () => buttonRef.current!);

  React.useEffect(() => {
    if (autoFocus && buttonRef.current) {
      buttonRef.current.focus();
    }
  }, [autoFocus]);

  // ─── Tarmac TDS rendering path ───
  if (tarmacColor) {
    const toggleConfig: ToggleTarmacConfig = theme.components?.toggle_tarmac || {};
    const styleParams = {
      config: toggleConfig,
      color: tarmacColor,
      toggleStyle: tarmacStyle,
      size: tarmacSize,
      checked: !!mergedChecked,
      disabled: mergedDisabled,
      isGhost,
    };

    const trackClass = buildToggleTrackStyles(styleParams);
    const handleClass = buildToggleHandleStyles(styleParams);

    const tarmacSpinnerSize = tarmacSize === 'sm' ? '12px' : '16px';

    return (
      <button
        {...restProps}
        ref={buttonRef}
        type="button"
        role="switch"
        aria-checked={!!mergedChecked}
        aria-disabled={mergedDisabled}
        disabled={mergedDisabled}
        className={`${trackClass} ${className}`.trim()}
        onClick={handleClick}
        tabIndex={tabIndex}
        id={id}
        title={title}
      >
        <span className={handleClass}>
          {loading && (
            <Spinner
              tarmacVariant="tarmac-01"
              tarmacSize={tarmacSpinnerSize}
            />
          )}
        </span>
      </button>
    );
  }

  // ─── Legacy rendering path ───
  const switchConfig = theme.components?.switch || defaultThemeConfig.components.switch;
  const variantConfig = switchConfig.variants[variant] || {};
  const sizeConfig = switchConfig.sizes[size] || switchConfig.sizes.md;

  // Emotion CSS styles
  const switchStyles = css({
    position: 'relative',
    display: 'inline-block',
    boxSizing: 'border-box',
    minWidth: sizeConfig.width,
    height: sizeConfig.height,
    lineHeight: sizeConfig.height,
    padding: '0',
    verticalAlign: 'middle',
    background: mergedChecked 
      ? backgroundColor || color || variantConfig.backgroundColor
      : variantConfig.uncheckedBackgroundColor,
    borderRadius: radius || switchConfig.base.radius.default,
    cursor: mergedDisabled ? switchConfig.states.disabled.cursor : 'pointer',
    transition: switchConfig.base.transition,
    userSelect: 'none',
    border: borderColor ? `1px solid ${borderColor}` : variant === 'outline' ? `1px solid ${variantConfig.borderColor}` : 'none',
    '&:hover:not(:disabled)': {
      backgroundColor: hoverColor || variantConfig.hoverColor,
    },
    '&:focus-visible': {
      outline: switchConfig.base.focus.outline,
      boxShadow: switchConfig.base.focus.ring,
    },
    ...(mergedDisabled && {
      opacity: switchConfig.states.disabled.opacity,
    }),
    ...(loading && {
      opacity: switchConfig.states.loading.opacity,
      cursor: switchConfig.states.loading.cursor,
    }),
    ...style,
  });

  const handleStyles = css({
    position: 'absolute',
    top: '2px',
    left: mergedChecked
      ? `calc(100% - ${sizeConfig.handleSize} - 2px)`
      : '2px',
    width: sizeConfig.handleSize,
    height: sizeConfig.handleSize,
    background: '#fff',
    borderRadius: '50%',
    transition: switchConfig.base.transition,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  });

  const innerStyles = css({
    display: 'block',
    margin: 0,
    padding: `0 ${sizeConfig.padding}`,
    color: '#fff',
    fontSize: sizeConfig.fontSize,
    textAlign: mergedChecked ? 'left' : 'right',
  });

  const loadingIcon = loading ? (
    <div className={css({ 
      width: '100%', 
      height: '100%', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center' 
    })}>
      <Spinner 
        size={size === 'lg' ? 'md' : 'sm'} 
        variant={mergedChecked ? 'primary' : 'default'}
      />
    </div>
  ) : null;
  
  return (
    <button
      {...restProps}
      ref={buttonRef}
      type="button"
      role="switch"
      aria-checked={mergedChecked}
      aria-disabled={mergedDisabled}
      disabled={mergedDisabled}
      className={`${switchStyles} ${className} ${rootClassName}`}
      onClick={handleClick}
      tabIndex={tabIndex}
      id={id}
      title={title}
    >
      <div className={handleStyles}>
        {loadingIcon}
      </div>
      <span className={innerStyles}>
        {mergedChecked ? checkedChildren : unCheckedChildren}
      </span>
    </button>
  );
});

Switch.displayName = 'Switch';

export default Switch;