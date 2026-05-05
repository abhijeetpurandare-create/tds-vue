// @ts-nocheck

import React, {
  forwardRef,
  useEffect,
  useRef,
  useState,
  useCallback,
  ReactElement,
  ReactNode,
} from "react";
import { css } from "@emotion/css";
import { useTheme } from "../ThemeProvider";
import { defaultThemeConfig } from "../../config/config";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleInfo,
  faAngleLeft,
  faAngleRight,
  faCaretRight,
  faCircle,
  faGauge,
  faUser,
  faFolder,
  faCalendar,
  faInbox,
  faChartLine,
  faHouseChimney
} from '@fortawesome/free-solid-svg-icons';
import type { SidebarProps, SidebarIconType } from '../../types/types';
import { SidebarItem, SidebarChildItem, SidebarIcon } from "../../types/types";
import { toCssDimension } from "../../utils/toCssDimension";

const disclosureClosers = new Map<string, () => void>();

// Icon mapping from old names to FontAwesome icons
const iconMapping: Record<string, any> = {
  'gauge-simple': faGauge,
  'gauge': faGauge,
  'user': faUser,
  'folder': faFolder,
  'calendar': faCalendar,
  'inbox': faInbox,
  'chart-line': faChartLine,
  'caret-right': faCaretRight,
  'circle': faCircle,
  'angles-left': faAngleLeft,
  'angles-right': faAngleRight,
  'house-chimney': faHouseChimney,
};

// Helper function to check if icon is legacy format
const isLegacyIcon = (icon: any): icon is SidebarIcon => {
  return icon && typeof icon === 'object' && 'name' in icon && !React.isValidElement(icon);
};

// Helper function to convert legacy icon to FontAwesome
const renderLegacyIcon = (icon: SidebarIcon, className?: string) => {
  const faIcon = iconMapping[icon.name];
  if (faIcon) {
    return <FontAwesomeIcon icon={faIcon} className={className} />;
  }
  // Fallback to default icon if mapping not found
  console.warn(`Icon "${icon.name}" not found in mapping, using default icon`);
  return <FontAwesomeIcon icon={faCircleInfo} className={className} />;
};

// Add a helper to render any icon prop (ReactNode, icon name, or function)
const renderIcon = (icon: SidebarIconType | undefined, className?: string, isActive: boolean = false) => {
  if (!icon) return <DefaultIcon className={className} />;
  if (typeof icon === 'function') {
    const iconElement = icon(isActive);
    return <span className={className}>{iconElement}</span>;
  }
  if (typeof icon === 'string') {
    const faIcon = iconMapping[icon];
    if (faIcon) return <FontAwesomeIcon icon={faIcon} className={className} />;
    return <DefaultIcon className={className} />;
  }
  if (React.isValidElement(icon)) return <span className={className}>{icon}</span>;
  return <DefaultIcon className={className} />;
};

// Replace DefaultIcon with a single export and use everywhere
export const DefaultIcon: React.FC<{ size?: string; className?: string;[key: string]: any }> = ({ size = "md", className = "", ...rest }) => (
  <FontAwesomeIcon
    icon={faCircleInfo}
    className={className}
    style={{
      width: size === 'md' ? '1rem' : size,
      height: size === 'md' ? '1rem' : size
    }}
    data-testid="orca-default-icon"
    {...rest}
  />
);



// Utility functions for class manipulation
const classie = {
  hasClass: (elem: HTMLElement | null, c: string) => {
    if (!elem) return false;
    return elem.classList.contains(c);
  },
  addClass: (elem: HTMLElement | null, c: string) => {
    if (!elem) return;
    elem.classList.add(c);
  },
  removeClass: (elem: HTMLElement | null, c: string) => {
    if (!elem) return;
    elem.classList.remove(c);
  },
  toggle: (elem: HTMLElement | null, c: string) => {
    const fn = classie.hasClass(elem, c)
      ? classie.removeClass
      : classie.addClass;
    fn(elem, c);
  },
};

// Disclosure state emitter component
const DisclosureStateEmitter: React.FC<{
  show: boolean;
  onShow: (id: string) => void;
}> = ({ show, onShow }) => {
  useEffect(() => {
    if (show) {
      onShow("");
    }
  }, [show, onShow]);
  return null;
};

const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
      openByDefault = false,
      expandable = false,
      position = "left",
      variant = "light",
      iconSize = "md",
      routes,
      value = "",
      width = "240px",
      onRouteActive,
      onValueChange,
      onExpanded,
      children,
      className = "",
      onRouteChange,
      onToggle,
      renderNavBefore,
      renderNavAfter,
      bgImage,
      bgSvg,
      expandIcon,
      collapseIcon,
      topIcon,
      hidden = false,
    },
    ref
  ) => {
    const { theme } = useTheme();
    const sidebarTheme =
      theme?.components?.sidebar || defaultThemeConfig.components.sidebar;

    const [expanded, setExpanded] = useState(openByDefault || !expandable);
    const [hovered, setHovered] = useState(false);
    const [activeDisclosure, setActiveDisclosure] = useState<string | null>(
      null
    );

    const sidebarRef = useRef<HTMLDivElement>(null);
    const sidebarParentRef = useRef<HTMLDivElement>(null);
    const elements = useRef<HTMLButtonElement[]>([]);

    const containerOpenClass = "orca-sidebar-parent--open";
    const bodyPushToClass = `orca-sidebar-container-push-to${position === "left" ? "right" : "left"
      }`;

    const base = sidebarTheme.base;
    const variantStyle = sidebarTheme.variants[variant];
    const toggler = base.toggler || {};
    const padding = base.padding || {};

    const expandedWidth = base.width || width;
    const collapsedWidth = base.collapsedWidth || "4.5rem";
    const transitionTime = base.transitionTime || "0.01s";
    const zIndex = base.zIndex || 30;

    const apSidebarStyles = css({
      "&.orca-sidebar": {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        height: "100vh",
        overflowY: "auto",
        transition: `all ${transitionTime} ease`,
        borderRightWidth: '3px',
        borderRightStyle: 'solid',
        borderRightColor: variantStyle.borderColor,
      },
      "&.orca-sidebar--light": {
        backgroundColor: variantStyle.backgroundColor,
        color: variantStyle.textColor,
      },
      "&.orca-sidebar--dark": {
        backgroundColor: variantStyle.backgroundColor,
        color: variantStyle.textColor,
      },
      "&.orca-sidebar--dark-plus": {
        backgroundColor: variantStyle.backgroundColor,
        color: variantStyle.textColor,
      },
      "&.orca-sidebar--left--hovered": {
        boxShadow:
          variantStyle.sidebarBoxShadowLeftHovered ||
          "0px 16px 10px 0px rgb(0 0 0 / 14%), 0px 11px 18px 0px rgb(0 0 0 / 12%), 0px 13px 5px -1px rgb(0 0 0 / 20%)",
      },
      "&.orca-sidebar--right--hovered": {
        boxShadow:
          variantStyle.sidebarBoxShadowRightHovered ||
          "-4px 0 6px 0px rgb(0 0 0 / 18%)",
      },
    });

    const apSidebarParentStyles = css({
      "&.orca-sidebar-parent": {
        position: "fixed",
        height: "100%",
        top: 0,
        zIndex: zIndex,
        boxSizing: "border-box",
        width: expanded ? expandedWidth : collapsedWidth,
        transition: `all ${!expandable ? "0s" : transitionTime} ease`,
      },
      "&.orca-sidebar-parent--open": {
        width: expandedWidth,
      },
      "&.orca-sidebar-parent--left": {
        left: 0,
        paddingRight: padding.sidebarParentLeft || "0.75rem",
      },
      "&.orca-sidebar-parent--right": {
        right: 0,
        paddingLeft: padding.sidebarParentRight || "0.75rem",
      },
      "& .sidebar-bg-svg": {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 2,
        pointerEvents: "none",
        transition: `all ${!expandable ? "0s" : transitionTime} ease`,
        "& svg, & img": {
          bottom: 0,
          left: 0,
          right: 0,
          objectFit: "cover",
          preserveAspectRatio: "xMidYMid slice",
        },
      },
      "&.orca-sidebar-parent--left .sidebar-bg-svg": {
        left: 0,
        right: `-${padding.sidebarParentLeft || "0.75rem"}`,
      },
      "&.orca-sidebar-parent--right .sidebar-bg-svg": {
        left: `-${padding.sidebarParentRight || "0.75rem"}`,
        right: 0,
      },
    });

    const apSidebarTogglerStyles = css({
      position: "absolute",
      top: toggler.top || "1.25rem",
      zIndex: 100,
      right: 0,
      width: toggler.width || "1.75rem",
      height: toggler.height || "1.75rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: toggler.backgroundColor || "white",
      borderRadius: toggler.borderRadius || "0.25rem",
      boxShadow:
        toggler.boxShadow ||
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      cursor: "pointer",
      color: toggler.color || undefined,
      "&.ap-expandable--light": {
        backgroundColor: toggler.backgroundColor || "white",
      },
      "&.ap-expandable--dark": {
        backgroundColor: toggler.color || "#1a1a1a",
        color: "white",
      },
      "&.ap-expandable--dark-plus": {
        backgroundColor: toggler.color || "#1a1a1a",
        color: "white",
      },
    });

    const logoBgStyles = css({
      "&.logo-bg--light": {
        backgroundColor: variantStyle.backgroundColor,
      },
      "&.logo-bg--dark": {
        backgroundColor: variantStyle.backgroundColor,
      },
      "&.logo-bg--dark-plus": {
        backgroundColor: variantStyle.backgroundColor,
      },
    });

    const itemStyles = css({
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: padding.item || "0.5rem",
      textAlign: "left",
      fontSize: variantStyle.itemFontSize || "0.875rem",
      fontWeight: variantStyle.itemFontWeight || 500,
      borderRadius: variantStyle.itemBorderRadius || "0.375rem",
      cursor: "pointer",
      color: variantStyle.textColor,
      "&:hover": {
        backgroundColor: variantStyle.hoverBackgroundColor,
        color: variantStyle.hoverTextColor,
      },
      "&:focus": {
        outline: "none",
      },
      "&:focus-visible": {
        outline: "none",
      },
    });

    const activeItemStyles = css({
      backgroundColor: variantStyle.activeBackgroundColor,
      color: variantStyle.activeTextColor,
    });

    const iconStyles = css({
      flexShrink: 0,
      height: iconSize,
      width: iconSize,
      color: variantStyle.iconColor,
    });

    const activeIconStyles = css({
      color: variantStyle.activeIconColor,
    });

    const chipStyles = css({
      marginLeft: padding.chipMarginLeft || "0.75rem",
      display: "inline-block",
      padding: "0.125rem 0.75rem",
      fontSize: variantStyle.chipFontSize || "0.75rem",
      fontWeight: 500,
      borderRadius: variantStyle.chipBorderRadius || "9999px",
      backgroundColor: variantStyle.chipBackgroundColor,
      color: variantStyle.chipTextColor,
    });

    const activeChipStyles = css({
      backgroundColor: variantStyle.activeChipBackgroundColor,
      color: variantStyle.activeChipTextColor,
    });

    const disclosurePanelStyles = css({
      "& > a": {
        paddingLeft: expanded
          ? padding.disclosurePanelPaddingLeftExpanded || "2.75rem"
          : padding.disclosurePanelPaddingLeftCollapsed || "1rem",
        paddingRight: "0.5rem",
      },
    });

    const routeActivated = useCallback(
      (item: SidebarItem | SidebarChildItem) => {
        // Only call onValueChange if item has a 'to' property
        if ('to' in item && item.to) {
          onValueChange?.(item.to);
        }
        onRouteActive?.(item);
      },
      [onValueChange, onRouteActive]
    );

    const navItemsCount = routes.map((navItem) => {
      if (navItem.children && navItem.children.length) {
        return navItem.children.reduce((count, child) => {
          if (child.count && !child.hidden) return count + child.count;
          return count;
        }, 0);
      }
      return navItem.count || 0;
    });

    const isItemActive = useCallback(
      (item: SidebarItem) =>
        (item.to && item.to === value) ||
        (item.children && item.children.some((child) => child.to === value)),
      [value]
    );

    const isSubItemActive = useCallback(
      (item: SidebarChildItem) => item.to === value,
      [value]
    );

    const sidebarPushToggle = useCallback(async () => {
      const body = document.body;
      body.classList.toggle(bodyPushToClass);
      sidebarParentRef.current?.classList.toggle(containerOpenClass);
      setExpanded(
        sidebarParentRef.current?.classList.contains(containerOpenClass) ||
        false
      );

      if (!expanded) {
        setActiveDisclosure(null);
      }
    }, [bodyPushToClass, expanded]);

    const handleDisclosureChange = useCallback(
      (id: string, isOpen: boolean) => {
        if (isOpen) {
          setActiveDisclosure(id);
        } else if (activeDisclosure === id) {
          setActiveDisclosure(null);
        }
      },
      [activeDisclosure]
    );

    const hideOther = useCallback(
      (id: string) => {
        if (activeDisclosure && activeDisclosure !== id) {
          setActiveDisclosure(null);
        }
      },
      [activeDisclosure]
    );

    const hideAll = useCallback(() => {
      setActiveDisclosure(null);
    }, []);

    const doClose = useCallback(
      (id: string) => {
        if (activeDisclosure === id) {
          setActiveDisclosure(null);
        }
      },
      [activeDisclosure]
    );

    const onSidebarMouseEnter = useCallback(
      (e) => {
        if (!expandable) return;
        // Prevent sidebar from expanding/collapsing when hovering over the toggler button
        if (
          e &&
          e.target &&
          sidebarParentRef.current &&
          sidebarParentRef.current.querySelector(
            ".orca-sidebar-parent__toggler"
          ) &&
          sidebarParentRef.current
            .querySelector(".orca-sidebar-parent__toggler")
            .contains(e.target)
        ) {
          return;
        }
        if (sidebarParentRef.current?.classList.contains(containerOpenClass))
          return;

        sidebarParentRef.current?.classList.toggle(containerOpenClass);
        setExpanded(
          sidebarParentRef.current?.classList.contains(containerOpenClass) ||
          false
        );
        setHovered(true);
      },
      [containerOpenClass, expandable]
    );

    const onSidebarMouseLeave = useCallback(() => {
      if (!expandable) return;
      if (document.body.classList.contains(bodyPushToClass)) return;

      sidebarParentRef.current?.classList.toggle(containerOpenClass);
      setExpanded(
        sidebarParentRef.current?.classList.contains(containerOpenClass) ||
        false
      );
      setActiveDisclosure(null);
      setHovered(false);
    }, [bodyPushToClass, containerOpenClass, expandable]);

    useEffect(() => {
      const pushto = position === "left" ? "right" : "left";
      const pushClass = `orca-sidebar-container-push-${pushto}`;

      if (!document.body.classList.contains(pushClass)) {
        document.body.classList.add(pushClass);
      }

      if (openByDefault || !expandable) {
        sidebarPushToggle();
      } else {
        const root = document.querySelector(":root") as HTMLElement;
        root.style.setProperty(
          "--orca-sidebar-initial-width",
          toCssDimension(width) as string
        );
      }

      return () => {
        document.body.classList.remove(pushClass);
      };
    }, [openByDefault, expandable, position, sidebarPushToggle]);

    useEffect(() => {
      onExpanded?.(expanded);
    }, [expanded, onExpanded]);

    useEffect(() => {
      const root = document.querySelector(":root") as HTMLElement;
      root.style.setProperty("--orca-sidebar-width", width);
      root.style.setProperty("--orca-sidebar-initial-width", "4.5rem");
      root.style.setProperty(
        "--orca-sidebar-transition-time",
        !expandable ? "0s" : "0.01s"
      );
    }, [width, expandable]);

    useEffect(() => {
      onToggle?.(expanded);
    }, [expanded, onToggle]);

    // Auto-open disclosure when a child route is active
    useEffect(() => {
      if (!value) return;

      // Find the parent item that has an active child
      const activeParent = routes.find((item) =>
        item.children && item.children.some((child) => child.to === value)
      );

      if (activeParent && activeParent.children) {
        // Check if any child is active
        const hasActiveChild = activeParent.children.some((child) => child.to === value);
        if (hasActiveChild) {
          // Open the disclosure for this parent
          setActiveDisclosure(activeParent.name);
        }
      }
    }, [value, routes]);

    return (
      <div
        ref={sidebarParentRef}
        className={`orca-sidebar-parent orca-sidebar-parent--${position} ${className} ${expanded ? containerOpenClass : ""
          } ${apSidebarParentStyles}`}
        onMouseEnter={onSidebarMouseEnter}
        onMouseLeave={onSidebarMouseLeave}
        style={bgImage ? { backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' } : undefined}
      >
        {bgSvg && (
          <div className="sidebar-bg-svg">
            {bgSvg}
          </div>
        )}
        {expandable && (
          <button
            className={`ap-expandable--${variant} ${apSidebarTogglerStyles}`}
            onClick={sidebarPushToggle}
            aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
            style={{
              [position === "left" ? "right" : "left"]: 0,
            }}
          >
            {expanded
              ? renderIcon(collapseIcon, undefined)
              : renderIcon(expandIcon, undefined)}
          </button>
        )}

        <div
          ref={sidebarRef}
          className={`orca-sidebar orca-sidebar--${variant} ${hovered ? `orca-sidebar--${position}--hovered` : ""
            } scrollbar pt-0 ${apSidebarStyles}`}
        >
          {children || (
            <>
              <div
                className={`w-full sticky top-0 flex items-center flex-shrink-0 px-3 pt-5 logo-bg--${variant} ${logoBgStyles}`}
              >
                {topIcon ? renderIcon(topIcon, undefined) : <DefaultIcon />}
                {renderNavBefore?.(expanded)}
              </div>
              <div className="mt-5 flex-grow flex flex-col">
                <nav className="flex-1 px-2 space-y-1" aria-label="Sidebar">
                  {!hidden && routes.map((item, index) => {
                    if (item.hidden) return null;

                    if (!item.children) {
                      return (
                        <div key={item.name}>
                          <a
                            className={`${itemStyles} ${isItemActive(item) ? activeItemStyles : ""
                              }`}
                            onClick={(e) => {
                              e.preventDefault();
                              routeActivated(item);
                            }}
                            href={item.to || '#'}
                          >
                            {item.icon ? (
                              isLegacyIcon(item.icon) ? (
                                renderLegacyIcon(
                                  item.icon,
                                  `${iconStyles} ${isItemActive(item) ? activeIconStyles : ""}`
                                )
                              ) : typeof item.icon === 'function' ? (
                                renderIcon(
                                  item.icon,
                                  `${iconStyles} ${isItemActive(item) ? activeIconStyles : ""}`,
                                  isItemActive(item)
                                )
                              ) : (
                                <span className={`${iconStyles} ${isItemActive(item) ? activeIconStyles : ""}`}>
                                  {item.icon}
                                </span>
                              )
                            ) : (
                              <DefaultIcon
                                size={iconSize}
                                className={`${iconStyles} ${isItemActive(item) ? activeIconStyles : ""
                                  }`}
                              />
                            )}
                            {expanded && (
                              <>
                                <div className="flex-1 ml-3">{item.name}</div>
                                {navItemsCount[index] > 0 && (
                                  <div
                                    className={`${chipStyles} ${isItemActive(item) ? activeChipStyles : ""
                                      }`}
                                  >
                                    {navItemsCount[index]}
                                  </div>
                                )}
                              </>
                            )}
                          </a>
                        </div>
                      );
                    }

                    return (
                      <Disclosure
                        key={item.name}
                        defaultOpen={isItemActive(item) && item.children?.some((child) => child.to === value)}
                      >
                        {({ open, close }) => {
                          // register this panel's close() every render
                          disclosureClosers.set(item.name, close);

                          const isOpen = open;

                          return (
                            <div className="space-y-1">
                              <DisclosureButton
                                className={`${itemStyles} ${isItemActive(item) ? activeItemStyles : ""
                                  }`}
                                onClick={() => {
                                  // first close every OTHER panel
                                  disclosureClosers.forEach((fn, key) => {
                                    if (key !== item.name) fn();
                                  });
                                  // then let HeadlessUI toggle *this* one + fire your route logic
                                  routeActivated(item);
                                }}
                              >
                                {item.icon ? (
                                  isLegacyIcon(item.icon) ? (
                                    renderLegacyIcon(
                                      item.icon,
                                      `${iconStyles} ${isItemActive(item) ? activeIconStyles : ""}`
                                    )
                                  ) : typeof item.icon === 'function' ? (
                                    renderIcon(
                                      item.icon,
                                      `${iconStyles} ${isItemActive(item) ? activeIconStyles : ""}`,
                                      isItemActive(item)
                                    )
                                  ) : (
                                    <span className={`${iconStyles} ${isItemActive(item) ? activeIconStyles : ""}`}>
                                      {item.icon}
                                    </span>
                                  )
                                ) : (
                                  <DefaultIcon
                                    size={iconSize}
                                    className={`${iconStyles} ${isItemActive(item) ? activeIconStyles : ""}`}
                                  />
                                )}
                                {expanded && (
                                  <>
                                    <span className="flex-1 ml-3">
                                      {item.name}
                                    </span>
                                    {navItemsCount[index] > 0 && (
                                      <div
                                        className={`${chipStyles} ${isItemActive(item)
                                          ? activeChipStyles
                                          : ""
                                          }`}
                                      >
                                        {navItemsCount[index]}
                                      </div>
                                    )}
                                    <FontAwesomeIcon
                                      icon={faCaretRight}
                                      className={`ml-3 flex-shrink-0 h-5 w-5 transform transition ${isItemActive(item)
                                        ? activeIconStyles
                                        : ""
                                        }`}
                                    />
                                  </>
                                )}
                              </DisclosureButton>

                              {expanded && (
                                <DisclosurePanel
                                  className={`space-y-1 ${disclosurePanelStyles}`}
                                >
                                  {item.children.map((sub) => {
                                    if (sub.hidden) return null;
                                    const active = isSubItemActive(sub);
                                    return (
                                      <a
                                        key={sub.name}
                                        onClick={(e) => {
                                          e.preventDefault();
                                          routeActivated(sub);
                                        }}
                                        href={sub.to}
                                        className={`
                        ${itemStyles}
                        ${active ? activeItemStyles : ""}
                        pl-11
                      `}
                                      >
                                        <div className="flex items-center w-full space-x-1">
                                          <div className="w-1/12 flex">
                                            {active && (
                                              <FontAwesomeIcon
                                                icon={faCircle}
                                                className="w-1 h-1"
                                              />
                                            )}
                                          </div>
                                          <div className="w-11/12 flex justify-between">
                                            {sub.name}
                                            {sub.count && (
                                              <div
                                                className={`${chipStyles} ${active ? activeChipStyles : ""
                                                  }`}
                                              >
                                                {sub.count}
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      </a>
                                    );
                                  })}
                                </DisclosurePanel>
                              )}
                            </div>
                          );
                        }}
                      </Disclosure>
                    );
                  })}
                </nav>
              </div>

              <div className="flex sticky bottom-0">
                {renderNavAfter?.(expanded)}
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
);

Sidebar.displayName = "Sidebar";

export default Sidebar;