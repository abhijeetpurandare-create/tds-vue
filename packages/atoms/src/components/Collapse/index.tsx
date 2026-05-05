import React, { useState, useCallback } from 'react';
import { css } from '@emotion/css';
import { useTheme } from '../ThemeProvider';
import { defaultThemeConfig } from '../../config/config';
import ThemeProvider from '../ThemeProvider';

// Enums
export enum CollapseSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

export enum ExpandIconPosition {
  START = 'start',
  END = 'end',
}

export enum CollapsibleType {
  HEADER = 'header',
  ICON = 'icon',
  DISABLED = 'disabled',
}

// Interfaces
export interface CollapsePanelProps {
  key: string;
  title?: React.ReactNode;
  content?: React.ReactNode;
  disabled?: boolean;
  extra?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  headerOnly?: boolean; // New prop for header-only panels
}

export interface CollapseProps {
  // Core functionality
  activeKey?: string | string[];
  defaultActiveKey?: string | string[];
  accordion?: boolean;
  items?: CollapsePanelProps[];
  children?: React.ReactNode;
  onChange?: (key: string | string[]) => void;
  
  // Basic customization props
  width?: string;
  height?: string;
  padding?: string;
  disabled?: boolean;
  bgColor?: string;
  
  // Layout and behavior
  size?: CollapseSize | 'small' | 'medium' | 'large';
  expandIconPosition?: ExpandIconPosition | 'start' | 'end';
  collapsible?: CollapsibleType | 'header' | 'icon' | 'disabled';
  
  // Advanced props (kept for compatibility but simplified)
  bordered?: boolean;
  ghost?: boolean;
  destroyOnHidden?: boolean;
  expandIcon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

// Utility functions for size calculations
const getSizeConfig = (size: string) => {
  const configs = {
    small: {
      headerPadding: '8px 12px',
      contentPadding: '12px',
      fontSize: '14px',
      iconSize: '14px',
    },
    medium: {
      headerPadding: '12px 16px',
      contentPadding: '16px',
      fontSize: '16px',
      iconSize: '16px',
    },
    large: {
      headerPadding: '16px 20px',
      contentPadding: '20px',
      fontSize: '18px',
      iconSize: '18px',
    },
  };
  return configs[size as keyof typeof configs] || configs.medium;
};

// Chevron Down Icon (for closed state)
const ChevronDownIcon: React.FC<{ className?: string; size?: string }> = ({ className, size = '16px' }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    style={{ transition: 'transform 0.2s ease-in-out' }}
  >
    <path d="M4.427 6.427a.75.75 0 011.06 0L8 8.94l2.513-2.513a.75.75 0 111.06 1.06l-3.043 3.044a.75.75 0 01-1.06 0L4.427 7.487a.75.75 0 010-1.06z" />
  </svg>
);

// Chevron Up Icon (for open state)
const ChevronUpIcon: React.FC<{ className?: string; size?: string }> = ({ className, size = '16px' }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    style={{ transition: 'transform 0.2s ease-in-out' }}
  >
    <path d="M11.573 9.573a.75.75 0 01-1.06 0L8 7.06 5.487 9.573a.75.75 0 11-1.06-1.06l3.043-3.044a.75.75 0 011.06 0l3.043 3.044a.75.75 0 010 1.06z" />
  </svg>
);

// Collapse Panel Component
const CollapsePanel: React.FC<{
  panel: CollapsePanelProps;
  isActive: boolean;
  onToggle: () => void;
  collapseProps: CollapseProps;
}> = ({ panel, isActive, onToggle, collapseProps }) => {
  const sizeConfig = getSizeConfig(collapseProps.size || 'medium');
  
  const isDisabled = collapseProps.disabled || panel.disabled;
  const canClick = collapseProps.collapsible !== 'disabled' && !isDisabled;
  
  // Header styles
  const headerStyles = css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: collapseProps.padding || sizeConfig.headerPadding,
    backgroundColor: collapseProps.bgColor || '#ffffff',
    border: collapseProps.bordered !== false ? '1px solid #d9d9d9' : 'none',
    borderBottom: isActive && collapseProps.bordered !== false ? '1px solid #d9d9d9' : 'none',
    cursor: canClick ? 'pointer' : 'default',
    fontSize: sizeConfig.fontSize,
    fontWeight: '500',
    color: isDisabled ? '#00000040' : '#000000d9',
    transition: 'all 0.2s ease-in-out',
    userSelect: 'none',
    '&:hover': canClick ? {
      backgroundColor: collapseProps.bgColor ? `${collapseProps.bgColor}f0` : '#fafafa',
    } : {},
    ...(collapseProps.ghost && {
      backgroundColor: 'transparent',
      border: 'none',
    }),
  });

  // Content styles
  const contentStyles = css({
    padding: sizeConfig.contentPadding,
    backgroundColor: collapseProps.bgColor || '#ffffff',
    border: collapseProps.bordered !== false ? '1px solid #d9d9d9' : 'none',
    borderTop: 'none',
    fontSize: sizeConfig.fontSize,
    color: '#000000d9',
    overflow: 'hidden',
    transition: 'all 0.2s ease-in-out',
    ...(collapseProps.ghost && {
      backgroundColor: 'transparent',
      border: 'none',
    }),
  });

  // Icon container styles
  const iconContainerStyles = css({
    display: 'flex',
    alignItems: 'center',
    color: isDisabled ? '#00000040' : '#000000d9',
    transition: 'transform 0.2s ease-in-out',
  });

  const handleHeaderClick = () => {
    if (collapseProps.collapsible === 'header' && canClick) {
      onToggle();
    }
  };

  const handleIconClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (collapseProps.collapsible !== 'disabled' && canClick) {
      onToggle();
    }
  };

  const renderIcon = () => {
    if (collapseProps.expandIcon === null) {
      return null;
    }
    
    if (collapseProps.expandIcon) {
      return collapseProps.expandIcon;
    }
    
    // Use ChevronDownIcon for closed state, ChevronUpIcon for open state
    return isActive ? (
      <ChevronUpIcon size={sizeConfig.iconSize} />
    ) : (
      <ChevronDownIcon size={sizeConfig.iconSize} />
    );
  };

  const titleContent = (
    <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
      {collapseProps.expandIconPosition === 'start' && (
        <div 
          className={iconContainerStyles} 
          onClick={handleIconClick}
          style={{ marginRight: '8px', cursor: canClick ? 'pointer' : 'not-allowed' }}
        >
          {renderIcon()}
        </div>
      )}
      <span style={{ flex: 1 }}>{panel.title}</span>
      {panel.extra && <div style={{ marginLeft: '8px' }}>{panel.extra}</div>}
      {collapseProps.expandIconPosition !== 'start' && (
        <div 
          className={iconContainerStyles} 
          onClick={handleIconClick}
          style={{ marginLeft: '8px', cursor: canClick ? 'pointer' : 'not-allowed' }}
        >
          {renderIcon()}
        </div>
      )}
    </div>
  );

  return (
    <div className={panel.className} style={panel.style}>
      <div 
        className={headerStyles} 
        onClick={handleHeaderClick}
        role="button"
        tabIndex={canClick ? 0 : -1}
        aria-expanded={isActive}
        aria-disabled={isDisabled}
      >
        {titleContent}
      </div>
      {isActive && !panel.headerOnly && (
        <div className={contentStyles}>
          {panel.content || panel.children}
        </div>
      )}
    </div>
  );
};

// Internal Collapse Component (without ThemeProvider wrapper)
const CollapseInternal: React.FC<CollapseProps> = ({
  activeKey,
  defaultActiveKey,
  accordion = false,
  items,
  children,
  onChange,
  width,
  height,
  padding,
  disabled = false,
  bgColor = '#ffffff',
  size = 'medium',
  expandIconPosition = 'end',
  collapsible = 'header',
  bordered = true,
  ghost = false,
  destroyOnHidden = false,
  expandIcon,
  className = '',
  style = {},
  ...props
}) => {
  // State management
  const [internalActiveKey, setInternalActiveKey] = useState<string | string[]>(() => {
    if (activeKey !== undefined) return activeKey;
    if (defaultActiveKey !== undefined) return defaultActiveKey;
    return accordion ? '' : [];
  });

  const currentActiveKey = activeKey !== undefined ? activeKey : internalActiveKey;

  // Convert children to items if provided
  const panelItems = React.useMemo(() => {
    if (items && items.length > 0) {
      return items;
    }

    if (children) {
      return React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return {
            key: child.key?.toString() || index.toString(),
            title: child.props.title || `Panel ${index + 1}`,
            content: child.props.children,
            ...child.props,
          } as CollapsePanelProps;
        }
        return {
          key: index.toString(),
          title: `Panel ${index + 1}`,
          content: child,
        } as CollapsePanelProps;
      }) || [];
    }

    // Default single panel if no items or children provided
    return [{
      key: '1',
      title: 'Panel',
      content: 'Panel content',
    }];
  }, [items, children]);

  const handlePanelToggle = useCallback((key: string) => {
    let newActiveKey: string | string[];

    if (accordion) {
      newActiveKey = currentActiveKey === key ? '' : key;
    } else {
      const activeKeys = Array.isArray(currentActiveKey) ? currentActiveKey : [currentActiveKey].filter(Boolean);
      if (activeKeys.includes(key)) {
        newActiveKey = activeKeys.filter(k => k !== key);
      } else {
        newActiveKey = [...activeKeys, key];
      }
    }

    if (activeKey === undefined) {
      setInternalActiveKey(newActiveKey);
    }
    onChange?.(newActiveKey);
  }, [currentActiveKey, accordion, activeKey, onChange]);

  // Container styles
  const containerStyles = css({
    width: width || 'auto',
    height: height || 'auto',
    backgroundColor: bgColor,
    border: bordered && !ghost ? '1px solid #d9d9d9' : 'none',
    borderRadius: '6px',
    overflow: 'hidden',
    ...(ghost && {
      backgroundColor: 'transparent',
      border: 'none',
    }),
  });

  const collapseProps: CollapseProps = {
    size,
    expandIconPosition,
    collapsible,
    bordered,
    ghost,
    disabled,
    bgColor,
    padding,
    expandIcon,
  };

  return (
    <div 
      className={`${containerStyles} ${className}`} 
      style={style}
      {...props}
    >
      {panelItems.map((panel) => {
        const isActive = accordion 
          ? currentActiveKey === panel.key
          : Array.isArray(currentActiveKey) 
            ? currentActiveKey.includes(panel.key)
            : currentActiveKey === panel.key;

        return (
          <CollapsePanel
            key={panel.key}
            panel={panel}
            isActive={isActive}
            onToggle={() => handlePanelToggle(panel.key)}
            collapseProps={collapseProps}
          />
        );
      })}
    </div>
  );
};

// Main Collapse Component with ThemeProvider wrapper
const Collapse: React.FC<CollapseProps> = (props) => {
  return (
    <ThemeProvider initialTheme={defaultThemeConfig}>
      <CollapseInternal {...props} />
    </ThemeProvider>
  );
};

// Panel sub-component for compatibility
const Panel: React.FC<CollapsePanelProps> = () => {
  return null; // This is just for API compatibility
};

// Attach Panel to Collapse
(Collapse as any).Panel = Panel;

export { Collapse };
export default Collapse; 