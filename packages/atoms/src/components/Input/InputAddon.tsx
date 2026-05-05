import React, { forwardRef } from 'react'
import { css } from '@emotion/css'
import { useTheme } from '../ThemeProvider'
import { defaultThemeConfig } from '../../config/config'
import { toCssDimension } from '../../utils/toCssDimension'
import type { InputFieldConfig } from './useInputFieldStyles'

function dim(v: string | number | undefined, fallback = '0'): string {
  if (v === undefined || v === null || v === '') return fallback
  return String(toCssDimension(v) ?? fallback)
}

// ─── InputAddon Props ────────────────────────────────────────────────────────

export interface InputAddonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Content inside the addon — icons, text, any ReactNode */
  children?: React.ReactNode
  /** Click handler for the addon area */
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
  /** Keyboard handler — Enter/Space trigger onClick by default */
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void
  /** Accessible label for the addon (e.g. "Select country code") */
  'aria-label'?: string
  /** Set to "listbox", "menu", "dialog" etc. when addon opens a popup */
  'aria-haspopup'?: React.AriaAttributes['aria-haspopup']
  /** Whether the associated popup is open */
  'aria-expanded'?: boolean
  /** Override tabIndex (defaults to 0 when onClick is provided) */
  tabIndex?: number
  /** Additional CSS class */
  className?: string
  /** Whether the addon is disabled */
  isDisabled?: boolean
}

// ─── InputAddon Component ────────────────────────────────────────────────────

const InputAddon = forwardRef<HTMLDivElement, InputAddonProps>(
  (
    {
      children,
      onClick,
      onKeyDown,
      tabIndex,
      className,
      isDisabled = false,
      ...rest
    },
    ref
  ) => {
    const isInteractive = !!onClick && !isDisabled

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (onKeyDown) {
        onKeyDown(e)
        if (e.defaultPrevented) return
      }
      if (isInteractive && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault()
        onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>)
      }
    }

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (isDisabled) return
      onClick?.(e)
    }

    const { theme } = useTheme()
    const config = (theme.components?.inputField_tarmac ||
      (defaultThemeConfig.components as any)?.inputField_tarmac || {}) as InputFieldConfig

    const base = config.base || {}

    const addonContentCls = css({
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      cursor: isInteractive ? 'pointer' : isDisabled ? 'default' : 'inherit',
      userSelect: 'none',
      fontFamily: base.fontFamily || 'Noto Sans, sans-serif',
      fontWeight: 500,
      // Reset button-like appearance for clean composition
      background: 'none',
      border: 'none',
      padding: 0,
      margin: 0,
      color: 'inherit',
      fontSize: 'inherit',
      lineHeight: 'inherit',
      whiteSpace: 'nowrap',
      outline: 'none',
      ...(isDisabled && { opacity: 0.6, pointerEvents: 'none' as const }),
    })

    return (
      <div
        ref={ref}
        className={`${addonContentCls}${className ? ` ${className}` : ''}`}
        role={isInteractive ? 'button' : undefined}
        tabIndex={tabIndex ?? (isInteractive ? 0 : undefined)}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-disabled={isDisabled || undefined}
        data-testid="input-addon"
        {...rest}
      >
        {children}
      </div>
    )
  }
)

InputAddon.displayName = 'InputAddon'
export default InputAddon
