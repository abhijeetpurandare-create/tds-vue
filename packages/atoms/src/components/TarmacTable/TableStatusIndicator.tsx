import React from 'react'
import StatusIndicatorStandalone from '../StatusIndicator'
import type { TableStatusIndicatorProps } from './types'

/**
 * TableStatusIndicator — Backward-compatible wrapper.
 *
 * Delegates to the standalone StatusIndicator component.
 * New consumers should use `<StatusIndicator>` directly.
 */
const TableStatusIndicator: React.FC<TableStatusIndicatorProps> = ({
  variant = 'information',
  label,
  className,
}) => {
  return (
    <StatusIndicatorStandalone
      variant={variant}
      size="sm"
      label={label}
      className={className}
    />
  )
}

export default TableStatusIndicator
