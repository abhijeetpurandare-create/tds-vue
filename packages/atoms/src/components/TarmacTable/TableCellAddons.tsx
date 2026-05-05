import React from 'react'
import { css, cx } from '@emotion/css'
import { useTheme } from '../ThemeProvider'
import { defaultThemeConfig } from '../../config/config'
import type { TableCellAddonsProps } from './types'
import type { TableConfig } from '../../types/types'

/**
 * TableCellAddons — Rich cell content with various layout types.
 *
 * Supports: checkbox, radio, button, multistop, badge, slot, and ghost types.
 *
 * Figma: "Table Cells Add-ons" component set
 */
const TableCellAddons: React.FC<TableCellAddonsProps> = ({
  type = 'primary-badge-horizontal',
  title,
  subtext,
  subtextBottom,
  badgeLabel,
  checked = false,
  onCheckChange,
  leadingIcon,
  trailingIcon,
  primaryAction,
  secondaryAction,
  slot,
  slot2,
  origin,
  destination,
  stops,
  distance,
  className,
  children,
}) => {
  const { theme } = useTheme()
  const tableConfig = (theme?.components?.table || defaultThemeConfig.components.table) as TableConfig
  const ca = tableConfig.cellAddons

  const containerStyle = css({
    display: 'flex',
    alignItems: 'center',
    gap: ca?.container?.gap || '8px',
    padding: ca?.container?.padding || '8px 12px',
    alignSelf: 'stretch',
  })

  const titleStyle = css({
    fontFamily: ca?.title?.fontFamily || 'Noto Sans, sans-serif',
    fontSize: ca?.title?.fontSize || '14px',
    fontWeight: Number(ca?.title?.fontWeight) || 400,
    lineHeight: ca?.title?.lineHeight || '20px',
    color: ca?.title?.color || '#2B2B2B',
  })

  const subtextStyle = css({
    fontFamily: ca?.subtext?.fontFamily || 'Noto Sans, sans-serif',
    fontSize: ca?.subtext?.fontSize || '12px',
    fontWeight: Number(ca?.subtext?.fontWeight) || 400,
    lineHeight: ca?.subtext?.lineHeight || '16px',
    color: ca?.subtext?.color || '#454545',
  })

  // Ghost
  if (type === 'ghost') {
    const gc = ca?.ghost
    return (
      <div className={cx(containerStyle, className)}>
        <div className={css({
          width: '100%',
          height: gc?.height || '40px',
          borderRadius: gc?.borderRadius || '4px',
          backgroundColor: gc?.backgroundColor || '#DEDEDE',
        })} />
      </div>
    )
  }

  // Slot types
  if (type === 'slot-1' || type === 'slot-2') {
    const sc = ca?.slot
    const slotPlaceholder = css({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: '1 0 0',
      height: sc?.height || '28px',
      backgroundColor: sc?.backgroundColor || '#E6F3FE',
      borderRadius: sc?.borderRadius || '4px',
      fontFamily: 'Noto Sans, sans-serif',
      fontSize: sc?.fontSize || '10px',
      color: sc?.color || '#000',
    })
    return (
      <div className={cx(css({
        display: 'flex',
        alignItems: 'stretch',
        gap: ca?.container?.gap || '8px',
        padding: ca?.container?.padding || '8px 12px',
        flex: '1 0 0',
      }), className)}>
        {slot || <div className={slotPlaceholder}>Slot</div>}
        {type === 'slot-2' && (slot2 || <div className={slotPlaceholder}>Slot</div>)}
      </div>
    )
  }

  // Button types
  if (type === 'button-1-cta' || type === 'button-2-cta') {
    return (
      <div className={cx(containerStyle, className)}>
        {type === 'button-2-cta' && secondaryAction}
        {primaryAction}
      </div>
    )
  }

  // Multistop types
  if (type?.startsWith('multistop')) {
    const mc = ca?.multistop
    return (
      <div className={cx(containerStyle, className)}>
        <MultistopContent
          type={type}
          origin={origin}
          destination={destination}
          stops={stops}
          distance={distance}
          originColor={mc?.originColor || '#41B686'}
          destinationColor={mc?.destinationColor || '#F04158'}
          lineColor={mc?.lineColor || '#41B686'}
          stopColor={mc?.stopColor || '#CCCCCC'}
          titleStyle={titleStyle}
          subtextStyle={subtextStyle}
        />
      </div>
    )
  }

  // Radio type
  if (type === 'radio-2-lines') {
    return <div className={cx(containerStyle, className)}>{children}</div>
  }

  // Checkbox + Primary content types
  const hasCheckbox = type?.startsWith('checkbox')
  const checkboxSize = ca?.checkbox?.size || '16px'

  const checkboxInputStyle = css({
    width: checkboxSize,
    height: checkboxSize,
    margin: 0,
    cursor: 'pointer',
    accentColor: ca?.checkbox?.accentColor || '#000',
    flexShrink: 0,
  })

  const iconSmStyle = css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '16px',
    height: '16px',
    flexShrink: 0,
  })

  const iconMdStyle = css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20px',
    height: '20px',
    flexShrink: 0,
  })

  const bodyStyle = css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '4px',
  })

  const rowStyle = css({
    display: 'flex',
    gap: '4px',
    alignItems: 'center',
  })

  const inlineBadgeStyle = css({
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: ca?.inlineBadge?.padding || '4px',
    borderRadius: ca?.inlineBadge?.borderRadius || '4px',
    border: `${ca?.inlineBadge?.borderWidth || '0.5px'} solid ${ca?.inlineBadge?.borderColor || '#48A7FC'}`,
    fontFamily: ca?.inlineBadge?.fontFamily || 'Noto Sans, sans-serif',
    fontSize: ca?.inlineBadge?.fontSize || '10px',
    fontWeight: Number(ca?.inlineBadge?.fontWeight) || 500,
    lineHeight: ca?.inlineBadge?.lineHeight || '12px',
    color: ca?.inlineBadge?.color || '#2396FB',
  })

  const isLineIconType = type === 'primary-2-line-icon' || type === 'primary-3-line-icon' || type === 'checkbox-2-line-icon'

  return (
    <div className={cx(containerStyle, className)}>
      {hasCheckbox && (
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onCheckChange?.(e.target.checked)}
          className={checkboxInputStyle}
        />
      )}
      {leadingIcon && <span className={iconSmStyle}>{leadingIcon}</span>}
      <div className={bodyStyle}>
        {isLineIconType ? (
          <>
            <div className={rowStyle}>
              <span className={titleStyle}>{title}</span>
              {trailingIcon && <span className={iconMdStyle}>{trailingIcon}</span>}
            </div>
            <div className={rowStyle}>
              <span className={subtextStyle}>{subtext}</span>
              {leadingIcon && <span className={iconSmStyle}>{leadingIcon}</span>}
            </div>
            {type === 'primary-3-line-icon' && subtextBottom && (
              <div className={rowStyle}>
                <span className={subtextStyle}>{subtextBottom}</span>
              </div>
            )}
          </>
        ) : (
          <>
            <div className={css({ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' })}>
              <span className={titleStyle}>{title}</span>
              {badgeLabel && <span className={inlineBadgeStyle}>{badgeLabel}</span>}
            </div>
            {subtext && <span className={subtextStyle}>{subtext}</span>}
            {subtextBottom && <span className={subtextStyle}>{subtextBottom}</span>}
          </>
        )}
      </div>
    </div>
  )
}

// ============================================
// Multistop sub-component
// ============================================

interface MultistopProps {
  type: string
  origin?: string
  destination?: string
  stops?: number
  distance?: string
  originColor: string
  destinationColor: string
  lineColor: string
  stopColor: string
  titleStyle: string
  subtextStyle: string
}

const MultistopContent: React.FC<MultistopProps> = ({
  type,
  origin = 'Bangalore (BLR)',
  destination = 'Gurgaon (GGN)',
  stops,
  distance,
  originColor,
  destinationColor,
  lineColor,
  stopColor,
  titleStyle,
  subtextStyle,
}) => {
  const odIconsStyle = css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2px',
    width: '8px',
  })

  const odLineStyle = css({
    width: '1px',
    flex: '1 0 0',
    minHeight: '8px',
    backgroundColor: lineColor,
  })

  return (
    <div className={css({ display: 'flex', alignItems: 'center', gap: '8px' })}>
      <div className={odIconsStyle}>
        <svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="3" fill={originColor} /></svg>
        <div className={odLineStyle} />
        {type === 'multistop-location-stops' && stops && (
          <>
            {Array.from({ length: Math.min(stops, 3) }).map((_, i) => (
              <React.Fragment key={i}>
                <svg width="4" height="4" viewBox="0 0 4 4"><circle cx="2" cy="2" r="2" fill={stopColor} /></svg>
                <div className={odLineStyle} />
              </React.Fragment>
            ))}
          </>
        )}
        <svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="3" fill={destinationColor} /></svg>
      </div>
      <div className={css({ display: 'flex', flexDirection: 'column', gap: '4px' })}>
        <span className={titleStyle}>{origin}</span>
        {type === 'multistop-location-stops' && stops != null && (
          <span className={subtextStyle}>{stops} Stops</span>
        )}
        <span className={titleStyle}>{destination}</span>
        {distance && <span className={subtextStyle}>Total distance: {distance}</span>}
      </div>
    </div>
  )
}

export default TableCellAddons
