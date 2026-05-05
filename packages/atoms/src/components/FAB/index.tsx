import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { useTheme } from '../ThemeProvider';
import { defaultThemeConfig } from '../../config/config';
import Avatar from '../Avatar';
import {
  FABPosition,
  FABConfig,
  buildContainerStyles,
  buildTriggerStyles,
  buildMenuStyles,
  buildMenuItemStyles,
  buildOverlayStyles,
} from './useFABStyles';

// ─── Re-export types from styles ─────────────────────────────────────────────
export type { FABPosition } from './useFABStyles';

// ─── Variant Type ────────────────────────────────────────────────────────────
export type FABVariant = 'light' | 'dark' | 'info-blue' | (string & {});

// ─── Trigger Type ────────────────────────────────────────────────────────────
export type FABTriggerType = 'default' | 'extended' | (string & {});

// ─── Public Prop Types ───────────────────────────────────────────────────────

export interface FABProps {
  position?: FABPosition;
  positionMode?: 'fixed' | 'absolute' | 'relative';
  zIndex?: number;
  showOverlay?: boolean;
  disableAnimation?: boolean;
  variant?: FABVariant;
  className?: string;
  children?: React.ReactNode;
}

export interface FABTriggerProps {
  icon?: React.ReactNode;
  openIcon?: React.ReactNode;
  badge?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  triggerType?: FABTriggerType;
  label?: string;
  'aria-label'?: string;
  className?: string;
  /** Override the icon rotation angle in degrees. When provided, the internal
   *  auto-rotate logic (45deg on open) is bypassed entirely. */
  iconRotation?: number;
}

export interface FABMenuProps {
  'aria-label'?: string;
  children?: React.ReactNode;
}

export interface FABMenuItemProps {
  label: string;
  icon?: React.ReactNode;
  /** Avatar to show — pass an <Avatar> node or use avatarSrc/avatarInitials shorthands */
  avatar?: React.ReactNode;
  /** Shorthand: image src for an Avatar (avatarType="image", size="sm", shape="round") */
  avatarSrc?: string;
  /** Shorthand: initials string for an Avatar (avatarType="initials", size="sm", shape="round") */
  avatarInitials?: string;
  onClick?: (event: React.MouseEvent) => void;
  isDisabled?: boolean;
  className?: string;
}

// ─── Default FAB Theme Config (fallback) ─────────────────────────────────────

const defaultFABConfig: FABConfig = {
  base: {
    fontFamily: 'Noto Sans, sans-serif',
    fontWeight: '500',
    transition: 'all 0.15s ease-in-out',
    focus: {
      outline: 'none',
      ring: '0 0 0 2px rgba(0, 0, 0, 0.4)',
    },
  },
  trigger: {
    backgroundColor: '#1F2937',
    iconColor: '#FFFFFF',
    hoverColor: '#111111',
    pressedColor: '#252525',
    focusRingColor: 'rgba(0, 0, 0, 0.4)',
    shadow: '-1px 1px 6px 2px rgba(0, 0, 0, 0.2)',
  },
  menu: {
    gap: '12px',
  },
  menuItem: {
    labelBackgroundColor: '#333333',
    labelTextColor: '#FFFFFF',
    labelFontFamily: 'Noto Sans, sans-serif',
    labelFontSize: '16px',
    labelPadding: '6px 12px',
    labelBorderRadius: '4px',
    iconButtonBackgroundColor: '#1F2937',
    iconButtonIconColor: '#FFFFFF',
    iconButtonHoverColor: '#374151',
    iconButtonFocusRingColor: 'rgba(0, 0, 0, 0.3)',
    height: '44px',
    padding: '10px 16px',
    gap: '8px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '500',
    lineHeight: '1.5em',
    iconSize: '24px',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  sizes: {
    sm: {
      triggerSize: '28px',
      triggerIconSize: '16px',
      triggerPadding: '4px',
      extendedTriggerPadding: '4px 8px 4px 6px',
      labelFontSize: '12px',
      labelLineHeight: '16px',
    },
    md: {
      triggerSize: '36px',
      triggerIconSize: '20px',
      triggerPadding: '8px',
      extendedTriggerPadding: '8px 10px 8px 8px',
      labelFontSize: '14px',
      labelLineHeight: '20px',
    },
    lg: {
      triggerSize: '44px',
      triggerIconSize: '24px',
      triggerPadding: '10px',
      extendedTriggerPadding: '10px 12px 10px 10px',
      labelFontSize: '16px',
      labelLineHeight: '24px',
    },
  },
  states: {
    disabled: {
      opacity: '0.5',
      cursor: 'not-allowed',
    },
  },
  animation: {
    revealDuration: '220ms',
    revealStagger: '60ms',
    exitDuration: '150ms',
    exitStagger: '30ms',
    triggerRotateDuration: '200ms',
  },
};

// ─── FABContext ───────────────────────────────────────────────────────────────

interface FABContextValue {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  position: FABPosition;
  zIndex: number;
  disableAnimation: boolean;
  variant: string;
  triggerRef: React.RefObject<HTMLButtonElement>;
  menuItemRefs: React.MutableRefObject<HTMLButtonElement[]>;
  registerMenuItem: (el: HTMLButtonElement | null, index: number) => void;
  config: FABConfig;
}

const FABContext = createContext<FABContextValue | null>(null);

function useFABContext(): FABContextValue {
  const ctx = useContext(FABContext);
  if (!ctx) {
    console.warn(
      '[FAB] Sub-components (FAB.Trigger, FAB.Menu, FAB.MenuItem) must be rendered inside a <FAB> parent.'
    );
  }
  return ctx as FABContextValue;
}

// ─── Reduced Motion Hook ─────────────────────────────────────────────────────

function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return prefersReduced;
}

// ─── FAB Root Component ──────────────────────────────────────────────────────

const FABBase: React.FC<FABProps> = ({
  position = 'bottom-right',
  positionMode = 'fixed',
  zIndex = 1050,
  showOverlay = false,
  disableAnimation = false,
  variant = 'dark',
  className = '',
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null!);
  const menuItemRefs = useRef<HTMLButtonElement[]>([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  const { theme } = useTheme();
  const config: FABConfig = useMemo(
    () => (theme?.components?.fab as FABConfig) || defaultFABConfig,
    [theme]
  );

  const effectiveDisableAnimation = disableAnimation || prefersReducedMotion;

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const close = useCallback(() => setIsOpen(false), []);

  const registerMenuItem = useCallback(
    (el: HTMLButtonElement | null, index: number) => {
      if (el) {
        menuItemRefs.current[index] = el;
      }
    },
    []
  );

  // Outside-click dismissal
  useEffect(() => {
    if (!isOpen) return;
    const handleMouseDown = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, [isOpen]);

  const containerClass = buildContainerStyles({ position, positionMode, zIndex });

  const ctxValue: FABContextValue = useMemo(
    () => ({
      isOpen,
      toggle,
      close,
      position,
      zIndex,
      disableAnimation: effectiveDisableAnimation,
      variant,
      triggerRef,
      menuItemRefs,
      registerMenuItem,
      config,
    }),
    [isOpen, toggle, close, position, zIndex, effectiveDisableAnimation, variant, registerMenuItem, config]
  );

  return (
    <FABContext.Provider value={ctxValue}>
      <div
        ref={containerRef}
        className={`${containerClass} ${className}`.trim()}
        data-testid="fab-container"
      >
        {children}
      </div>
      {showOverlay && isOpen && (
        <div
          className={buildOverlayStyles({ config, zIndex })}
          data-testid="fab-overlay"
          onClick={close}
        />
      )}
    </FABContext.Provider>
  );
};

// ─── FAB.Trigger ─────────────────────────────────────────────────────────────

const FABTrigger: React.FC<FABTriggerProps> = ({
  icon,
  openIcon,
  badge,
  size = 'md',
  triggerType = 'default',
  label,
  'aria-label': ariaLabel = 'Actions menu',
  className = '',
  iconRotation,
}) => {
  const ctx = useFABContext();
  if (!ctx) return null;

  const { isOpen, toggle, config, disableAnimation, triggerRef, variant } = ctx;

  const triggerClass = buildTriggerStyles({
    config,
    size,
    isOpen,
    disableAnimation,
    variant,
    triggerType,
    hasOpenIcon: !!openIcon,
    iconRotation,
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  };

  // Determine which icon to render: swap to openIcon when open (if provided)
  const displayIcon = isOpen && openIcon ? openIcon : icon;

  return (
    <button
      ref={triggerRef}
      className={`${triggerClass} ${className}`.trim()}
      onClick={toggle}
      onKeyDown={handleKeyDown}
      aria-expanded={isOpen}
      aria-haspopup="menu"
      aria-label={ariaLabel}
      data-testid="fab-trigger"
      type="button"
    >
      {openIcon && !disableAnimation ? (
        // Crossfade between icon and openIcon
        <span
          className="fab-trigger-icon"
          data-testid="fab-trigger-icon"
          style={{ position: 'relative' }}
        >
          {/* Default icon — visible when closed */}
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: isOpen ? 'absolute' : 'relative',
            inset: 0,
            opacity: isOpen ? 0 : 1,
            transform: isOpen ? 'scale(0.5) rotate(-90deg)' : 'scale(1) rotate(0deg)',
            transition: 'opacity 180ms cubic-bezier(0.4,0,0.2,1), transform 200ms cubic-bezier(0.4,0,0.2,1)',
            pointerEvents: 'none',
          }}>
            {icon}
          </span>
          {/* Open icon — visible when open */}
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: isOpen ? 'relative' : 'absolute',
            inset: 0,
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? 'scale(1) rotate(0deg)' : 'scale(0.5) rotate(90deg)',
            transition: 'opacity 180ms cubic-bezier(0.4,0,0.2,1), transform 200ms cubic-bezier(0.4,0,0.2,1)',
            pointerEvents: 'none',
          }}>
            {openIcon}
          </span>
        </span>
      ) : (
        <span className="fab-trigger-icon" data-testid="fab-trigger-icon">{displayIcon}</span>
      )}
      {triggerType === 'extended' && label && (
        <span className="fab-trigger-label" data-testid="fab-trigger-label">{label}</span>
      )}
      {badge && (
        <span
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            transform: 'translate(25%, -25%)',
          }}
          data-testid="fab-badge"
        >
          {badge}
        </span>
      )}
    </button>
  );
};

// ─── FAB.Menu ────────────────────────────────────────────────────────────────

const FABMenu: React.FC<FABMenuProps> = ({
  'aria-label': ariaLabel,
  children,
}) => {
  const ctx = useFABContext();
  if (!ctx) return null;

  const {
    isOpen,
    close,
    position,
    config,
    disableAnimation,
    triggerRef,
    menuItemRefs,
  } = ctx;

  const [shouldRender, setShouldRender] = useState(false);
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const childCount = React.Children.count(children);

  const revealDuration = parseInt(config.animation?.revealDuration || '150', 10);
  const revealStagger = parseInt(config.animation?.revealStagger || '50', 10);
  const exitDuration = parseInt(config.animation?.exitDuration || '120', 10);
  const exitStagger = parseInt(config.animation?.exitStagger || '30', 10);

  const totalRevealTime = revealDuration + revealStagger * (childCount - 1);
  const totalExitTime = exitDuration + exitStagger * (childCount - 1);

  const isUpward = position.startsWith('bottom');

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Focus the visually first item: last index when upward, first index when downward
      const firstFocusIndex = isUpward ? childCount - 1 : 0;
      if (disableAnimation) {
        setIsAnimatingIn(true);
        requestAnimationFrame(() => {
          if (menuItemRefs.current[firstFocusIndex]) {
            menuItemRefs.current[firstFocusIndex].focus();
          }
        });
      } else {
        // Double rAF: first frame renders items at opacity:0/translateY(20px),
        // second frame triggers the transition so the browser sees the "from" state.
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsAnimatingIn(true);
          });
        });
        const focusTimer = setTimeout(() => {
          if (menuItemRefs.current[firstFocusIndex]) {
            menuItemRefs.current[firstFocusIndex].focus();
          }
        }, totalRevealTime);
        return () => clearTimeout(focusTimer);
      }
    } else if (shouldRender) {
      setIsAnimatingIn(false);
      setIsAnimatingOut(true);
      if (disableAnimation) {
        setShouldRender(false);
        setIsAnimatingOut(false);
      } else {
        const exitTimer = setTimeout(() => {
          setShouldRender(false);
          setIsAnimatingOut(false);
        }, totalExitTime);
        return () => clearTimeout(exitTimer);
      }
    }
  }, [isOpen]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const items = menuItemRefs.current.filter(Boolean);
      const count = items.length;
      if (count === 0) return;

      const currentIndex = items.findIndex(
        (el) => el === document.activeElement
      );

      switch (e.key) {
        case 'Escape':
          e.preventDefault();
          close();
          triggerRef.current?.focus();
          break;

        case 'ArrowDown':
          e.preventDefault();
          {
            // Menu opens upward when FAB is at the bottom — visually the first item is at the top
            // of the menu (highest on screen), which is the last in DOM order (index count-1).
            // ArrowDown = move visually downward = toward the FAB trigger = lower DOM index.
            const menuOpensUpward = position.startsWith('bottom');
            const nextIndex = menuOpensUpward
              ? currentIndex <= 0 ? count - 1 : currentIndex - 1
              : currentIndex < 0 ? 0 : (currentIndex + 1) % count;
            items[nextIndex]?.focus();
          }
          break;

        case 'ArrowUp':
          e.preventDefault();
          {
            // ArrowUp = move visually upward = away from the FAB trigger = higher DOM index.
            const menuOpensUpward = position.startsWith('bottom');
            const prevIndex = menuOpensUpward
              ? currentIndex < 0 ? 0 : (currentIndex + 1) % count
              : currentIndex <= 0 ? count - 1 : currentIndex - 1;
            items[prevIndex]?.focus();
          }
          break;

        case 'Tab':
          e.preventDefault();
          if (e.shiftKey) {
            const prevIndex =
              currentIndex <= 0 ? count - 1 : currentIndex - 1;
            items[prevIndex]?.focus();
          } else {
            const nextIndex =
              currentIndex < 0 ? 0 : (currentIndex + 1) % count;
            items[nextIndex]?.focus();
          }
          break;

        default:
          break;
      }
    },
    [close, triggerRef, menuItemRefs, position]
  );

  if (!shouldRender) return null;

  const menuClass = buildMenuStyles({ config, position });

  return (
    <div
      ref={menuRef}
      className={menuClass}
      role="menu"
      aria-orientation="vertical"
      aria-label={ariaLabel}
      onKeyDown={handleKeyDown}
      data-testid="fab-menu"
    >
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;

        const revealIndex = isUpward ? index : childCount - 1 - index;
        const exitIndex = childCount - 1 - revealIndex;

        const revealDelay = revealIndex * revealStagger;
        const exitDelay = exitIndex * exitStagger;

        const isRevealed = isAnimatingIn && !isAnimatingOut;

        const translateDir = isUpward ? '12px' : '-12px';

        const itemStyle: React.CSSProperties = disableAnimation
          ? { opacity: 1, transform: 'translateY(0)' }
          : {
              opacity: isRevealed ? 1 : 0,
              transform: isRevealed ? 'translateY(0)' : `translateY(${translateDir})`,
              // Keep transition always defined so the browser never sees it change mid-animation
              transition: isAnimatingOut
                ? `opacity ${exitDuration}ms cubic-bezier(0.4,0,1,1) ${exitDelay}ms, transform ${exitDuration}ms cubic-bezier(0.4,0,1,1) ${exitDelay}ms`
                : `opacity ${revealDuration}ms cubic-bezier(0,0,0.2,1) ${revealDelay}ms, transform ${revealDuration}ms cubic-bezier(0,0,0.2,1) ${revealDelay}ms`,
            };

        return (
          <div style={itemStyle} data-testid="fab-menu-item-wrapper">
            {React.cloneElement(child as React.ReactElement<any>, {
              _index: index,
            })}
          </div>
        );
      })}
    </div>
  );
};

// ─── FAB.MenuItem ────────────────────────────────────────────────────────────

interface FABMenuItemInternalProps extends FABMenuItemProps {
  _index?: number;
}

const FABMenuItem: React.FC<FABMenuItemInternalProps> = ({
  label,
  icon,
  avatar,
  avatarSrc,
  avatarInitials,
  onClick,
  isDisabled = false,
  className = '',
  _index = 0,
}) => {
  const ctx = useFABContext();
  if (!ctx) return null;

  const { close, config, registerMenuItem, variant } = ctx;

  const styles = buildMenuItemStyles({
    config,
    size: 'md',
    isDisabled,
    variant,
  });

  const handleClick = (e: React.MouseEvent) => {
    if (isDisabled) return;
    onClick?.(e);
    close();
  };

  const handleRef = useCallback(
    (el: HTMLButtonElement | null) => {
      registerMenuItem(el, _index);
    },
    [registerMenuItem, _index]
  );

  // Resolve avatar: explicit node > avatarSrc shorthand > avatarInitials shorthand
  const resolvedAvatar = avatar ?? (
    avatarSrc
      ? <Avatar avatarType="image" src={avatarSrc} size="sm" shape="round" />
      : avatarInitials
        ? <Avatar avatarType="initials" size="sm" shape="round">{avatarInitials}</Avatar>
        : null
  );

  return (
    <button
      ref={handleRef}
      className={`${styles.container} ${className}`.trim()}
      onClick={handleClick}
      role="menuitem"
      tabIndex={-1}
      aria-disabled={isDisabled ? 'true' : undefined}
      aria-label={label}
      data-testid="fab-menu-item"
      type="button"
    >
      <span data-testid="fab-menu-item-label">{label}</span>
      {icon && (
        <span className="fab-menu-item-icon" data-testid="fab-menu-item-icon">
          {icon}
        </span>
      )}
      {resolvedAvatar && (
        <span data-testid="fab-menu-item-avatar">
          {resolvedAvatar}
        </span>
      )}
    </button>
  );
};

// ─── Compound Component Wiring ───────────────────────────────────────────────

interface FABComponent extends React.FC<FABProps> {
  Trigger: typeof FABTrigger;
  Menu: typeof FABMenu;
  MenuItem: typeof FABMenuItem;
}

export const FAB = Object.assign(FABBase, {
  Trigger: FABTrigger,
  Menu: FABMenu,
  MenuItem: FABMenuItem,
}) as FABComponent;

export default FAB;
