import React from 'react'
import { cx } from '@emotion/css'
import { useTheme } from '../ThemeProvider'
import { defaultThemeConfig } from '../../config/config'
import { buildStatusIndicatorStyles } from './useStatusIndicatorStyles'

// ============================================
// Types
// ============================================

export type StatusIndicatorVariant =
  | 'success'
  | 'failed'
  | 'warning'
  | 'information'
  | 'synced'
  | 'scheduled'
  | 'unknown'
  | 'pause'
  | 'play'
  | 'downloading'
  | 'pending'
  | (string & {})

export type StatusIndicatorSize = 'lg' | 'md' | 'sm' | 'xs' | (string & {})

export interface StatusIndicatorProps {
  /** Status variant — drives icon and dot color from theme */
  variant?: StatusIndicatorVariant
  /** Size of the indicator */
  size?: StatusIndicatorSize
  /** Text label displayed next to the icon */
  label?: string
  /** Custom icon — overrides the default dot SVG */
  icon?: React.ReactNode
  /** Additional CSS class */
  className?: string
}

// ============================================
// Component
// ============================================

const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  variant = 'information',
  size = 'md',
  label,
  icon,
  className,
}) => {
  const { theme } = useTheme()
  const config =
    (theme?.components as Record<string, any>)?.statusIndicator ||
    (defaultThemeConfig?.components as Record<string, any>)?.statusIndicator ||
    {}

  const styles = buildStatusIndicatorStyles({ config, variant, size })

  // SVG circle: viewBox matches icon container size, radius = dotSize / 2
  const vb = styles.iconSizeNum
  const r = parseFloat(styles.dotSize) / 2

  return (
    <div className={cx(styles.container, className)} data-testid="status-indicator">
      <span className={styles.icon} data-testid="status-indicator-icon">
        {icon || (
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${vb} ${vb}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx={vb / 2} cy={vb / 2} r={r} fill={styles.dotColor} />
          </svg>
        )}
      </span>
      {label && (
        <span className={styles.label} data-testid="status-indicator-label">
          {label}
        </span>
      )}
    </div>
  )
}

export default StatusIndicator
export { StatusIndicator }
