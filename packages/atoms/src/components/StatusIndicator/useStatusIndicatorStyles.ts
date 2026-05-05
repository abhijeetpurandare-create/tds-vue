import { css } from '@emotion/css'

// ============================================
// Theme Config Interfaces
// ============================================

interface VariantConfig {
  color?: string
  iconColor?: string
}

interface SizeConfig {
  iconSize?: string
  dotSize?: string
  fontSize?: string
  fontWeight?: string
  lineHeight?: string
  gap?: string
}

interface StatusIndicatorConfig {
  base?: {
    fontFamily?: string
    labelColor?: string
  }
  sizes?: Record<string, SizeConfig>
  variants?: Record<string, VariantConfig>
}

// ============================================
// Fallback colors per variant
// ============================================

const FALLBACK_COLORS: Record<string, string> = {
  success: '#1BA86E',
  failed: '#DC143C',
  warning: '#F5C828',
  information: '#2396FB',
  synced: '#1BA86E',
  scheduled: '#121212',
  unknown: '#CCCCCC',
  pause: '#121212',
  play: '#1BA86E',
  downloading: '#2396FB',
  pending: '#F5C828',
}

// ============================================
// Fallback sizes
// ============================================

const FALLBACK_SIZES: Record<string, SizeConfig> = {
  lg: { iconSize: '24px', dotSize: '20', fontSize: '16px', fontWeight: '500', lineHeight: '24px', gap: '4px' },
  md: { iconSize: '20px', dotSize: '16.67', fontSize: '14px', fontWeight: '500', lineHeight: '20px', gap: '4px' },
  sm: { iconSize: '16px', dotSize: '13.33', fontSize: '12px', fontWeight: '500', lineHeight: '16px', gap: '4px' },
  xs: { iconSize: '12px', dotSize: '10', fontSize: '10px', fontWeight: '500', lineHeight: '12px', gap: '2px' },
}

// ============================================
// Style Params
// ============================================

export interface StatusIndicatorStyleParams {
  config: StatusIndicatorConfig
  variant: string
  size: string
}

// ============================================
// Builder
// ============================================

export function buildStatusIndicatorStyles(params: StatusIndicatorStyleParams) {
  const { config, variant, size } = params

  const vc = config.variants?.[variant] || {}
  const sc = config.sizes?.[size] || FALLBACK_SIZES[size] || FALLBACK_SIZES.md
  const fallback = FALLBACK_SIZES[size] || FALLBACK_SIZES.md
  const base = config.base || {}

  const dotColor =
    vc.color || vc.iconColor || FALLBACK_COLORS[variant] || '#CCCCCC'

  const iconSize = sc.iconSize || fallback.iconSize || '20px'
  const dotSize = sc.dotSize || fallback.dotSize || '16.67'

  // Parse numeric icon size for SVG viewBox
  const iconSizeNum = parseFloat(iconSize) || 20

  const container = css({
    display: 'flex',
    alignItems: 'center',
    gap: sc.gap || '4px',
    alignSelf: 'stretch',
  })

  const icon = css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: iconSize,
    height: iconSize,
    flexShrink: 0,
  })

  const label = css({
    fontFamily: base.fontFamily || 'Noto Sans, sans-serif',
    fontSize: sc.fontSize || '14px',
    fontWeight: Number(sc.fontWeight) || 500,
    lineHeight: sc.lineHeight || '20px',
    color: base.labelColor || '#2B2B2B',
  })

  return { container, icon, label, dotColor, dotSize, iconSizeNum }
}
