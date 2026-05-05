/**
 * Tabs Component
 *
 * A comprehensive tabs component that mimics Ant Design's Tabs functionality.
 * Supports all major features including line, card, and editable-card types.
 *
 * @example
 * ```tsx
 * // Basic usage with items prop
 * <Tabs
 *   items={[
 *     { key: '1', label: 'Tab 1', children: <div>Content 1</div> },
 *     { key: '2', label: 'Tab 2', children: <div>Content 2</div> },
 *   ]}
 *   onChange={(key) => console.log(key)}
 * />
 *
 * // Editable tabs
 * <Tabs
 *   type="editable-card"
 *   items={tabs}
 *   onEdit={(key, action) => {
 *     if (action === 'add') {
 *       // Add new tab
 *     } else {
 *       // Remove tab
 *     }
 *   }}
 * />
 *
 * // With children (TabPane)
 * <Tabs activeKey="1" onChange={(key) => setActiveKey(key)}>
 *   <Tabs.TabPane tabKey="1" tab="Tab 1">Content 1</Tabs.TabPane>
 *   <Tabs.TabPane tabKey="2" tab="Tab 2">Content 2</Tabs.TabPane>
 * </Tabs>
 * ```
 */

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { css } from '@emotion/css'
import { useTheme } from '../ThemeProvider'
import { defaultThemeConfig } from '../../config/config'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPlus,
  faTimes,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'

export type TabsType = 'line' | 'card' | 'editable-card'
export type TabPosition = 'top' | 'right' | 'bottom' | 'left'
export type TabsSize = 'sm' | 'md' | 'lg'

export interface TabItem {
  key: string | number
  label: string | React.ReactNode
  children?: React.ReactNode
  disabled?: boolean
  icon?: React.ReactNode
  closable?: boolean
  forceRender?: boolean
  className?: string
  style?: React.CSSProperties
}

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  items?: TabItem[]
  activeKey?: string | number
  defaultActiveKey?: string | number
  onChange?: (activeKey: string | number) => void
  onTabClick?: (activeKey: string | number, e: React.MouseEvent | React.KeyboardEvent) => void
  type?: TabsType
  tabPosition?: TabPosition
  size?: TabsSize
  centered?: boolean
  animated?: boolean | { inkBar?: boolean; tabPane?: boolean }
  hideAdd?: boolean
  addIcon?: React.ReactNode
  removeIcon?: React.ReactNode
  moreIcon?: React.ReactNode
  onEdit?: (
    targetKey: string | number | React.MouseEvent | React.KeyboardEvent,
    action: 'add' | 'remove'
  ) => void
  tabBarExtraContent?: React.ReactNode | { left?: React.ReactNode; right?: React.ReactNode }
  indicator?: {
    size?: number | ((origin: number) => number)
    align?: 'start' | 'center' | 'end'
  }
  destroyInactiveTabPane?: boolean
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
}

const Tabs: React.FC<TabsProps> = ({
  items = [],
  activeKey: controlledActiveKey,
  defaultActiveKey,
  onChange,
  onTabClick,
  type = 'line',
  tabPosition = 'top',
  size = 'md',
  centered = false,
  animated = { inkBar: true, tabPane: false },
  hideAdd = false,
  addIcon,
  removeIcon,
  moreIcon,
  onEdit,
  tabBarExtraContent,
  indicator,
  destroyInactiveTabPane = false,
  className = '',
  style,
  children,
  ...props
}) => {
  const { theme } = useTheme()
  const tabsConfig = theme.components?.tabs || defaultThemeConfig.components.tabs

  // State management
  const [activeKey, setActiveKey] = useState<string | number>(() => {
    if (controlledActiveKey !== undefined) return controlledActiveKey
    if (defaultActiveKey !== undefined) return defaultActiveKey
    return items.length > 0 ? items[0].key : ''
  })
  const [visibleItems, setVisibleItems] = useState<TabItem[]>(items)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const tabsRef = useRef<HTMLDivElement>(null)
  const scrollableContainerRef = useRef<HTMLDivElement>(null)

  // Update active key when controlled prop changes
  useEffect(() => {
    if (controlledActiveKey !== undefined) {
      setActiveKey(controlledActiveKey)
    }
  }, [controlledActiveKey])

  // Update items when prop changes
  useEffect(() => {
    setVisibleItems(items)
  }, [items])

  // Check scroll position and update button visibility
  const checkScrollPosition = useCallback(() => {
    const container = scrollableContainerRef.current
    if (!container) return

    const { scrollLeft, scrollWidth, clientWidth } = container
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
  }, [])

  // Check scroll position on mount and when items change
  useEffect(() => {
    // Delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      checkScrollPosition()
    }, 0)

    const container = scrollableContainerRef.current
    if (container) {
      container.addEventListener('scroll', checkScrollPosition)
      // Check on resize
      const resizeObserver = new ResizeObserver(checkScrollPosition)
      resizeObserver.observe(container)
      return () => {
        clearTimeout(timeoutId)
        container.removeEventListener('scroll', checkScrollPosition)
        resizeObserver.disconnect()
      }
    }
    return () => clearTimeout(timeoutId)
  }, [items, visibleItems, checkScrollPosition])

  // Handle scroll left
  const handleScrollLeft = () => {
    const container = scrollableContainerRef.current
    if (container) {
      const scrollAmount = container.clientWidth * 0.8
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
    }
  }

  // Handle scroll right
  const handleScrollRight = () => {
    const container = scrollableContainerRef.current
    if (container) {
      const scrollAmount = container.clientWidth * 0.8
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  // Handle tab click
  const handleTabClick = (key: string | number, e: React.MouseEvent | React.KeyboardEvent) => {
    const item = items.find(item => item.key === key)
    if (item?.disabled) return

    if (controlledActiveKey === undefined) {
      setActiveKey(key)
    }
    onChange?.(key)
    onTabClick?.(key, e)
  }

  // Handle add tab
  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation()
    onEdit?.(e, 'add')
  }

  // Handle remove tab
  const handleRemove = (key: string | number, e: React.MouseEvent) => {
    e.stopPropagation()
    onEdit?.(key, 'remove')
  }

  // Get active tab content
  const activeTab = items.find(item => item.key === activeKey)
  const shouldRenderContent = (item: TabItem) => {
    // If children prop is not passed, only render if item has children property
    if (!children) {
      if (!item.children) return false
    }
    if (item.forceRender) return true
    if (destroyInactiveTabPane) return item.key === activeKey
    return true
  }

  // Tailwind classes for base container
  const baseContainerClasses = 'relative w-full'

  // Tailwind classes for tab list container
  const tabListContainerClasses = [
    'flex',
    tabPosition === 'top' || tabPosition === 'bottom' ? 'flex-row' : 'flex-col',
    tabPosition === 'top' || tabPosition === 'bottom'
      ? 'items-end'
      : tabPosition === 'left'
      ? 'items-start'
      : 'items-end',
    centered && (tabPosition === 'top' || tabPosition === 'bottom') ? 'justify-center' : '',
    'border-b',
    tabPosition === 'top' ? 'border-b' : tabPosition === 'bottom' ? 'border-t' : '',
    tabPosition === 'left' ? 'border-r' : tabPosition === 'right' ? 'border-l' : '',
    type === 'card' || type === 'editable-card' ? 'border-0' : '',
  ]
    .filter(Boolean)
    .join(' ')

  // Emotion CSS for dynamic styling
  const containerStyles = css({
    position: 'relative',
    width: '100%',
  })

  const tabListStyles = css({
    display: 'flex',
    flexDirection: tabPosition === 'top' || tabPosition === 'bottom' ? 'row' : 'column',
    alignItems: tabPosition === 'top' || tabPosition === 'bottom' ? 'flex-end' : 'flex-start',
    justifyContent:
      centered && (tabPosition === 'top' || tabPosition === 'bottom') ? 'center' : 'flex-start',
    borderBottomWidth: tabPosition === 'top' ? '1px' : '0px',
    borderTopWidth: tabPosition === 'bottom' ? '1px' : '0px',
    borderRightWidth: tabPosition === 'left' ? '1px' : '0px',
    borderLeftWidth: tabPosition === 'right' ? '1px' : '0px',
    borderColor: tabsConfig?.borderColor || '#E0E3EB',
    borderStyle: 'solid',
    gap: type === 'card' || type === 'editable-card' ? '0.25rem' : '0',
    padding: type === 'card' || type === 'editable-card' ? '0.25rem' : '0',
    backgroundColor:
      type === 'card' || type === 'editable-card'
        ? tabsConfig?.cardBackgroundColor || '#F9F9FB'
        : 'transparent',
    borderRadius: type === 'card' || type === 'editable-card' ? '0.375rem' : '0',
  })

  const tabStyles = css({
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'all 0.2s ease-in-out',
    color: tabsConfig?.tabTextColor || '#525B7A',
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
    padding:
      size === 'sm' ? '0.375rem 0.75rem' : size === 'md' ? '0.5rem 1rem' : '0.625rem 1.25rem',
    fontSize: size === 'sm' ? '0.875rem' : size === 'md' ? '1rem' : '1.125rem',
    fontWeight: 500,
    lineHeight: '1.5',
    borderRadius: type === 'card' || type === 'editable-card' ? '0.25rem' : '0',
    marginBottom: tabPosition === 'top' ? '-1px' : '0',
    marginTop: tabPosition === 'bottom' ? '-1px' : '0',
    marginRight: tabPosition === 'left' ? '-1px' : '0',
    marginLeft: tabPosition === 'right' ? '-1px' : '0',

    '&:hover:not(.disabled):not(.active)': {
      color: tabsConfig?.tabHoverTextColor || '#3D445C',
      backgroundColor:
        type === 'card' || type === 'editable-card'
          ? tabsConfig?.tabHoverBackgroundColor || '#FFFFFF'
          : 'transparent',
    },

    '&.active': {
      color: tabsConfig?.activeTabTextColor || '#5B80F7',
      fontWeight: 600,
      backgroundColor:
        type === 'card' || type === 'editable-card'
          ? tabsConfig?.activeTabBackgroundColor || '#FFFFFF'
          : 'transparent',
      // Border for active tab based on position
      ...(tabPosition === 'top' || tabPosition === 'bottom'
        ? {
            borderBottom: `2px solid ${tabsConfig?.indicatorColor || '#5B80F7'}`,
          }
        : tabPosition === 'left'
        ? {
            borderRight: `2px solid ${tabsConfig?.indicatorColor || '#5B80F7'}`,
          }
        : tabPosition === 'right'
        ? {
            borderLeft: `2px solid ${tabsConfig?.indicatorColor || '#5B80F7'}`,
          }
        : {}),
    },

    '&.disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
      color: tabsConfig?.disabledTabTextColor || '#A3AAC2',
    },
  })

  const contentStyles = css({
    padding: '1rem 0',
    minHeight: '2rem',
    transition:
      animated && (typeof animated === 'object' ? animated.tabPane : animated)
        ? 'opacity 0.3s ease-in-out'
        : 'none',
  })

  const cardTabStyles = css({
    backgroundColor: tabsConfig?.cardTabBackgroundColor || '#FFFFFF',
    border: `1px solid ${tabsConfig?.cardTabBorderColor || '#E0E3EB'}`,
    boxShadow: tabsConfig?.cardTabBoxShadow || '0px 1px 2px 0px rgba(0,0,0,0.05)',
  })

  // Render tab bar extra content
  const renderTabBarExtraContent = (position: 'left' | 'right' = 'right') => {
    if (!tabBarExtraContent) return null

    if (typeof tabBarExtraContent === 'object' && 'left' in tabBarExtraContent) {
      if (position === 'left') {
        return <div className="flex items-center mr-2">{tabBarExtraContent.left || null}</div>
      }
      return <div className="flex items-center ml-2">{tabBarExtraContent.right || null}</div>
    }

    if (position === 'right' && typeof tabBarExtraContent !== 'object') {
      return <div className="flex items-center ml-2">{tabBarExtraContent}</div>
    }
    return null
  }

  // Render tab item
  const renderTabItem = (item: TabItem) => {
    const isActive = item.key === activeKey
    const isDisabled = item.disabled

    return (
      <div
        key={item.key}
        className={`${tabStyles} ${isActive ? 'active' : ''} ${isDisabled ? 'disabled' : ''} ${
          type === 'card' || type === 'editable-card' ? cardTabStyles : ''
        } flex-shrink-0 ${item.className || ''}`}
        style={item.style}
        onClick={e => !isDisabled && handleTabClick(item.key, e)}
        onKeyDown={e => {
          if ((e.key === 'Enter' || e.key === ' ') && !isDisabled) {
            e.preventDefault()
            handleTabClick(item.key, e)
          }
        }}
        role="tab"
        aria-selected={isActive}
        aria-disabled={isDisabled}
        tabIndex={isDisabled ? -1 : 0}
      >
        <div className="flex items-center gap-2">
          {item.icon && <span className="flex items-center">{item.icon}</span>}
          <span>{item.label}</span>
          {type === 'editable-card' && item.closable !== false && (
            <span
              className="ml-2 hover:bg-gray-100 rounded p-0.5 transition-colors"
              onClick={e => handleRemove(item.key, e)}
              role="button"
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleRemove(item.key, e as any)
                }
              }}
            >
              {removeIcon || <FontAwesomeIcon icon={faTimes} className="text-xs" />}
            </span>
          )}
        </div>
      </div>
    )
  }

  return (
    <div
      ref={tabsRef}
      className={`${baseContainerClasses} ${containerStyles} ${className}`}
      style={style}
      {...props}
    >
      {/* Tab Bar */}
      <div className={`${tabListContainerClasses} ${tabListStyles}`}>
        <div className="flex items-center flex-1 relative w-full min-w-0">
          {tabPosition === 'top' || tabPosition === 'bottom' ? (
            <>
              {tabBarExtraContent &&
                typeof tabBarExtraContent === 'object' &&
                'left' in tabBarExtraContent &&
                renderTabBarExtraContent('left')}
              {/* Left scroll button */}
              {canScrollLeft && (
                <button
                  type="button"
                  onClick={handleScrollLeft}
                  className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-md hover:bg-surface-section transition-colors text-text-secondary hover:text-text-primary z-20 mr-1"
                  aria-label="Scroll left"
                  tabIndex={1}
                >
                  <FontAwesomeIcon icon={faChevronLeft} className="text-sm" />
                </button>
              )}
              <div
                ref={scrollableContainerRef}
                className={`flex flex-row items-center flex-nowrap ${
                  centered ? 'justify-center' : ''
                } relative overflow-x-auto overflow-y-hidden flex-1 min-w-0 scrollbar-hide scroll-smooth`}
              >
                {visibleItems.map(renderTabItem)}
                {type === 'editable-card' && !hideAdd && (
                  <div
                    className={`${tabStyles} ${cardTabStyles} ml-1 flex-shrink-0`}
                    onClick={handleAdd}
                    role="button"
                    tabIndex={0}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        handleAdd(e as any)
                      }
                    }}
                  >
                    {addIcon || <FontAwesomeIcon icon={faPlus} />}
                  </div>
                )}
              </div>
              {/* Right scroll button */}
              {canScrollRight && (
                <button
                  type="button"
                  onClick={handleScrollRight}
                  className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-md hover:bg-surface-section transition-colors text-text-secondary hover:text-text-primary z-10 ml-1"
                  aria-label="Scroll right"
                  tabIndex={2}
                >
                  <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
                </button>
              )}
              {renderTabBarExtraContent('right')}
            </>
          ) : (
            <div
              className={`flex ${
                tabPosition === 'left' || tabPosition === 'right' ? 'flex-col' : 'flex-row'
              } w-full relative`}
            >
              <div className="flex flex-col relative">
                {visibleItems.map(renderTabItem)}
                {type === 'editable-card' && !hideAdd && (
                  <div
                    className={`${tabStyles} ${cardTabStyles} mt-1`}
                    onClick={handleAdd}
                    role="button"
                    tabIndex={0}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        handleAdd(e as any)
                      }
                    }}
                  >
                    {addIcon || <FontAwesomeIcon icon={faPlus} />}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tab Content */}
      {(children ||
        (activeTab && shouldRenderContent(activeTab)) ||
        (!children && items.some(item => item.key !== activeKey && shouldRenderContent(item)))) && (
        <div className={contentStyles}>
          {children
            ? React.Children.map(children, child => {
                if (React.isValidElement<TabPaneProps>(child)) {
                  const childProps = child.props as TabPaneProps
                  if (childProps.tabKey === activeKey) {
                    return <div key={childProps.tabKey}>{childProps.children}</div>
                  }
                  if (childProps.forceRender) {
                    return (
                      <div
                        key={childProps.tabKey}
                        style={{ display: childProps.tabKey === activeKey ? 'block' : 'none' }}
                      >
                        {childProps.children}
                      </div>
                    )
                  }
                }
                return null
              })
            : activeTab &&
              shouldRenderContent(activeTab) && (
                <div
                  key={activeTab.key}
                  className={
                    animated && (typeof animated === 'object' ? animated.tabPane : animated)
                      ? 'animate-fade-in'
                      : ''
                  }
                >
                  {activeTab.children}
                </div>
              )}
          {!children &&
            items
              .filter(item => item.key !== activeKey && shouldRenderContent(item))
              .map(item => (
                <div key={item.key} style={{ display: 'none' }}>
                  {item.children}
                </div>
              ))}
        </div>
      )}
    </div>
  )
}

// TabPane component for children-based API
export interface TabPaneProps {
  tabKey: string | number
  tab?: string | React.ReactNode
  disabled?: boolean
  icon?: React.ReactNode
  closable?: boolean
  forceRender?: boolean
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
}

export const TabPane: React.FC<TabPaneProps> = ({ children }) => {
  return <>{children}</>
}

// Extend Tabs component with TabPane
const TabsWithTabPane = Tabs as typeof Tabs & {
  TabPane: typeof TabPane
}
TabsWithTabPane.TabPane = TabPane

export default TabsWithTabPane
