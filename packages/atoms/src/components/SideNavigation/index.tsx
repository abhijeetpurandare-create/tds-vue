import React, { createContext, useContext, useMemo, useState, useCallback } from 'react';
import { useTheme } from '../ThemeProvider';
import { defaultThemeConfig } from '../../config/config';
import {
  buildContainerStyles,
  buildNavCellStyles,
  buildNavCellIconStyles,
  buildNavCellLabelStyles,
  buildNavCellSubtextStyles,
  buildTrailingIconStyles,
  buildSubNavStyles,
  buildDividerStyles,
  buildSlotStyles,
  buildNavGroupStyles,
  SideNavConfig,
  SideNavStyleParams,
} from './useSideNavStyles';

// ─── Types ───────────────────────────────────────────────────────────────────

export type SideNavStyle = 'standard' | 'coal' | 'd-one' | (string & {});
export type SideNavType = 'single' | 'dual';

export interface SideNavigationProps {
  /** Visual style: standard (white), coal (dark blue-grey), d-one (dark/black) */
  navStyle?: SideNavStyle;
  /** Single set or dual set (two groups with divider) */
  navType?: SideNavType;
  /** Whether the nav is collapsed to icon-only mode */
  isCollapsed?: boolean;
  /** Controlled collapse state setter */
  onCollapsedChange?: (collapsed: boolean) => void;
  /** Expand on hover, collapse on mouse leave (only active when isCollapsed=true) */
  hoverToExpand?: boolean;
  /**
   * overlay — expanded nav floats over content (position: absolute, content doesn't move)
   * push    — expanded nav pushes content to the right (default flex behaviour)
   * Defaults to 'push'. Only relevant when hoverToExpand=true.
   */
  expandMode?: 'overlay' | 'push';
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export interface NavCellProps {
  /** Unique key for this item — used to track active state */
  itemKey?: string;
  /** Leading icon slot */
  leadingIcon?: React.ReactNode;
  /** Trailing icon slot */
  trailingIcon?: React.ReactNode;
  /** Label text */
  label?: string;
  /** Secondary subtext below the label */
  subtext?: string;
  /** Show status dot (avatar status indicator) */
  status?: boolean;
  /** Whether this item is currently active/selected */
  isActive?: boolean;
  /** Whether this item is disabled */
  isDisabled?: boolean;
  /** Click handler */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  children?: React.ReactNode;
  tabIndex?: number;
}

export interface NavTabCellProps {
  /** Unique key for this item */
  itemKey?: string;
  /** Leading icon slot */
  leadingIcon?: React.ReactNode;
  /** Label text */
  label?: string;
  /** Secondary subtext below the label (shown when expanded) */
  subtext?: string;
  /** Show status dot (avatar status indicator) */
  status?: boolean;
  /** Whether this item is currently active/selected */
  isActive?: boolean;
  /** Whether this item is disabled */
  isDisabled?: boolean;
  /** Click handler */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  tabIndex?: number;
  /** Sub-navigation items rendered when expanded */
  subItems?: React.ReactNode;
  /** Controlled expanded state */
  isExpanded?: boolean;
  /** Callback when expanded state changes */
  onExpandedChange?: (expanded: boolean) => void;
}

export interface NavDividerProps {
  className?: string;
}

export interface NavSlotProps {
  children?: React.ReactNode;
  className?: string;
}

export interface NavGroupProps {
  children?: React.ReactNode;
  className?: string;
}

// ─── Group index context ──────────────────────────────────────────────────────
// Tells each NavGroup whether it's the first or last group (for dual set layout)
const GroupIndexContext = createContext<{ index: number; total: number; groupIndex: number }>({ index: 0, total: 1, groupIndex: 0 });

interface SideNavContextValue {
  navStyle: SideNavStyle;
  navType: SideNavType;
  isCollapsed: boolean;
  config: SideNavConfig;
  sp: SideNavStyleParams;
  isSubNav: boolean;
  isOverlay: boolean;
}

const SideNavContext = createContext<SideNavContextValue>({
  navStyle: 'standard',
  navType: 'single',
  isCollapsed: false,
  config: {},
  sp: { config: {}, navStyle: 'standard', isCollapsed: false },
  isSubNav: false,
  isOverlay: false,
});

// ─── Status dot ──────────────────────────────────────────────────────────────

const StatusDot: React.FC = () => (
  <span
    aria-hidden="true"
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2px',
      flexShrink: 0,
    }}
  >
    <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#22c55e', display: 'block' }} />
  </span>
);

// ─── Sub-components ───────────────────────────────────────────────────────────

const NavCell: React.FC<NavCellProps> = ({
  leadingIcon,
  trailingIcon,
  label,
  subtext,
  status = false,
  isActive = false,
  isDisabled = false,
  onClick,
  className = '',
  children,
  tabIndex,
}) => {
  const { sp, isCollapsed, isSubNav } = useContext(SideNavContext);

  const cellStyles = buildNavCellStyles({ ...sp, isActive, isDisabled });
  const iconStyles = buildNavCellIconStyles({ ...sp, isActive, isDisabled });
  const labelStyles = buildNavCellLabelStyles(sp);
  const subtextStyles = buildNavCellSubtextStyles(sp);
  const trailingStyles = buildTrailingIconStyles({ ...sp });

  return (
    <button
      data-testid="side-nav-cell"
      className={`${cellStyles} ${className}`.trim()}
      // Figma: sub-items use px-20px (padding: 8px 20px) vs normal 8px 12px
      style={isSubNav ? { paddingLeft: 20, paddingRight: 20 } : undefined}
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
      tabIndex={isDisabled ? -1 : (tabIndex ?? 0)}
      aria-current={isActive ? 'page' : undefined}
      aria-disabled={isDisabled}
    >
      {leadingIcon && (
        <span className={iconStyles} aria-hidden="true">
          {leadingIcon}
        </span>
      )}
      {status && !isCollapsed && <StatusDot />}
      <span style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4, justifyContent: 'center' }}>
        <span className={labelStyles}>{label || children}</span>
        {subtext && <span className={subtextStyles}>{subtext}</span>}
      </span>
      {trailingIcon && (
        <span className={trailingStyles} aria-hidden="true">
          {trailingIcon}
        </span>
      )}
    </button>
  );
};

const SubNavProvider: React.FC<{ subNavStyles: string; children: React.ReactNode }> = ({ subNavStyles, children }) => {
  const ctx = useContext(SideNavContext);
  return (
    <SideNavContext.Provider value={{ ...ctx, isSubNav: true }}>
      <div className={subNavStyles} role="group">
        {children}
      </div>
    </SideNavContext.Provider>
  );
};

const NavTabCell: React.FC<NavTabCellProps> = ({
  leadingIcon,
  label,
  subtext,
  status = false,
  isActive = false,
  isDisabled = false,
  onClick,
  className = '',
  subItems,
  isExpanded: isExpandedProp,
  onExpandedChange,
  tabIndex,
}) => {
  const { sp, isCollapsed } = useContext(SideNavContext);
  const [internalExpanded, setInternalExpanded] = useState(false);

  const isExpanded = isExpandedProp !== undefined ? isExpandedProp : internalExpanded;

  const handleToggle = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const next = !isExpanded;
    setInternalExpanded(next);
    onExpandedChange?.(next);
    onClick?.(e);
  }, [isExpanded, onExpandedChange, onClick]);

  const cellStyles = buildNavCellStyles({ ...sp, isActive, isDisabled });
  const iconStyles = buildNavCellIconStyles({ ...sp, isActive });
  const labelStyles = buildNavCellLabelStyles(sp);
  const subtextStyles = buildNavCellSubtextStyles(sp);
  const chevronStyles = buildTrailingIconStyles({ ...sp });
  const subNavStyles = buildSubNavStyles(sp);

  // Figma: keyboard-arrow-down (collapsed) / keyboard-arrow-up (expanded)
  const ChevronDown = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  const ChevronUp = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 12.5L10 7.5L15 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <div data-testid="side-nav-tab-cell" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <button
        className={`${cellStyles} ${className}`.trim()}
        onClick={isDisabled ? undefined : handleToggle}
        disabled={isDisabled}
        tabIndex={isDisabled ? -1 : (tabIndex ?? 0)}
        aria-expanded={!isCollapsed ? isExpanded : undefined}
        aria-disabled={isDisabled}
      >
        {leadingIcon && (
          <span className={iconStyles} aria-hidden="true">
            {leadingIcon}
          </span>
        )}
        {status && !isCollapsed && <StatusDot />}
        <span style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4, justifyContent: 'center' }}>
          <span className={labelStyles}>{label}</span>
          {subtext && <span className={subtextStyles}>{subtext}</span>}
        </span>
        <span className={chevronStyles} aria-hidden="true">
          {isExpanded ? <ChevronUp /> : <ChevronDown />}
        </span>
      </button>
      {!isCollapsed && isExpanded && subItems && (
        <SubNavProvider subNavStyles={subNavStyles}>
          {subItems}
        </SubNavProvider>
      )}
    </div>
  );
};

const NavDivider: React.FC<NavDividerProps> = ({ className = '' }) => {
  const { sp } = useContext(SideNavContext);
  const dividerStyles = buildDividerStyles(sp);
  return <div data-testid="side-nav-divider" className={`${dividerStyles} ${className}`.trim()} role="separator" />;
};

const NavSlot: React.FC<NavSlotProps> = ({ children, className = '' }) => {
  const { index, total } = useContext(GroupIndexContext);
  const { navType } = useContext(SideNavContext);
  const slotStyles = buildSlotStyles();
  // Single set only: last slot grows to push bottom items down
  // Dual set: first NavGroup grows instead, slots stay fixed
  const isLast = index === total - 1;
  const shouldGrow = navType === 'single' && isLast && total > 1;
  return (
    <div
      data-testid="side-nav-slot"
      className={`${slotStyles} ${className}`.trim()}
      style={shouldGrow ? { flex: '1 0 0', minHeight: 0 } : undefined}
    >
      {children}
    </div>
  );
};
NavSlot.displayName = 'NavSlot';;

const NavGroup: React.FC<NavGroupProps> = ({ children, className = '' }) => {
  const { navType } = useContext(SideNavContext);
  const { groupIndex } = useContext(GroupIndexContext);
  const groupStyles = buildNavGroupStyles();
  // Dual set: first group (groupIndex=0) grows, subsequent groups pin to bottom
  const shouldGrow = navType === 'dual' && groupIndex === 0;

  return (
    <div
      data-testid="side-nav-group"
      data-nav-group="true"
      className={`${groupStyles} ${className}`.trim()}
      style={shouldGrow ? { flex: '1 0 0', minHeight: 0 } : undefined}
      role="navigation"
    >
      {children}
    </div>
  );
};
NavGroup.displayName = 'NavGroup';

// ─── Root Container ───────────────────────────────────────────────────────────

const SideNavigationBase: React.FC<SideNavigationProps> = ({
  navStyle = 'standard',
  navType = 'single',
  isCollapsed = false,
  onCollapsedChange,
  hoverToExpand = false,
  expandMode = 'push',
  className = '',
  style,
  children,
}) => {
  const { theme } = useTheme();
  const config: SideNavConfig =
    theme.components?.sideNavigation || defaultThemeConfig.components.sideNavigation || {};

  const [hoverExpanded, setHoverExpanded] = useState(false);
  const effectiveCollapsed = hoverToExpand && isCollapsed ? !hoverExpanded : isCollapsed;
  // Overlay: float over content when expandMode='overlay' and hoverToExpand is on
  const isOverlay = hoverToExpand && isCollapsed && expandMode === 'overlay';

  const sp: SideNavStyleParams = useMemo(
    () => ({ config, navStyle, isCollapsed: effectiveCollapsed, isOverlay }),
    [config, navStyle, effectiveCollapsed, isOverlay]
  );

  const ctx = useMemo<SideNavContextValue>(
    () => ({ navStyle, navType, isCollapsed: effectiveCollapsed, config, sp, isSubNav: false, isOverlay }),
    [navStyle, navType, effectiveCollapsed, config, sp, isOverlay]
  );

  const containerStyles = buildContainerStyles({ ...sp, navType });

  const handleMouseEnter = useCallback(() => {
    if (hoverToExpand && isCollapsed) {
      setHoverExpanded(true);
      onCollapsedChange?.(false);
    }
  }, [hoverToExpand, isCollapsed, onCollapsedChange]);

  const handleMouseLeave = useCallback(() => {
    if (hoverToExpand && isCollapsed) {
      setHoverExpanded(false);
      onCollapsedChange?.(true);
    }
  }, [hoverToExpand, isCollapsed, onCollapsedChange]);

  return (
    <SideNavContext.Provider value={ctx}>
      <nav
        data-testid="side-navigation"
        data-nav-style={navStyle}
        data-nav-type={navType}
        data-collapsed={effectiveCollapsed}
        className={`${containerStyles} ${className}`.trim()}
        style={style}
        aria-label="Side navigation"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {(() => {
          const childArray = React.Children.toArray(children);
          const total = childArray.length;
          // Count groups separately for dual-set grow logic
          let groupCount = 0;
          return childArray.map((child, index) => {
            if (!React.isValidElement(child)) return child;
            const isGroup = (child.type as React.FC)?.displayName === 'NavGroup';
            const groupIndex = isGroup ? groupCount++ : -1;
            return (
              <GroupIndexContext.Provider key={index} value={{ index, total, groupIndex }}>
                {child}
              </GroupIndexContext.Provider>
            );
          });
        })()}
      </nav>
    </SideNavContext.Provider>
  );
};

// ─── Compound export ──────────────────────────────────────────────────────────

export const SideNavigation = Object.assign(SideNavigationBase, {
  Cell: NavCell,
  TabCell: NavTabCell,
  Divider: NavDivider,
  Slot: NavSlot,
  Group: NavGroup,
});

export default SideNavigation;
