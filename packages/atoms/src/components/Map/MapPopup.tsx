import React from 'react';
import { css } from '@emotion/css';
import { useTheme } from '../ThemeProvider';
import Button from '../Button';
import { defaultMapStyles } from '../../config/config';
import { usePopupClose } from './PopupCloseContext';
import type { MapPopupProps } from './types';

const LocationIcon = ({ color }: { color: string }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    data-testid="map-popup-location-icon"
  >
    <path
      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
      fill={color}
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M18 6L6 18M6 6l12 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * **MapPopup** — A themed popup card for use as a map marker tooltip.
 *
 * Fully driven by the Orca ThemeProvider — all colours, shadows and typography
 * are sourced from `theme.components.map`. Override any token by passing a
 * custom theme to `<ThemeProvider>`.
 *
 * Uses the Orca `Button` component for action buttons so they inherit the
 * design system's interaction states automatically.
 *
 * @example
 * ```tsx
 * <MapPopup
 *   title="Bangalore Hub"
 *   address="Whitefield Industrial Area"
 *   city="Bangalore, 560066"
 *   status="Active"
 *   statusColor="#22C55E"
 *   details={[
 *     { label: 'AWB Pending', value: 342 },
 *     { label: 'Out for Delivery', value: 87 },
 *   ]}
 *   actions={[
 *     { label: 'View Hub', onClick: () => {}, variant: 'primary' },
 *     { label: 'Directions', onClick: () => {}, variant: 'secondary' },
 *   ]}
 *   onClose={() => {}}
 * />
 * ```
 */
const MapPopup: React.FC<MapPopupProps> = ({
  title,
  address,
  city,
  status,
  statusColor,
  details = [],
  actions = [],
  onClose,
}) => {
  const { theme } = useTheme();
  const mapCfg = theme.components?.map ?? defaultMapStyles;
  const dismissPopup = usePopupClose();

  // Safely resolve status colour — fallback to default map config then hardcoded
  const resolvedStatusColor =
    statusColor ??
    (theme.colors?.success?.main ?? defaultMapStyles.base.iconColor);
  const badgeBg = resolvedStatusColor + '1A';

  const sp = mapCfg.spacing;
  const ty = mapCfg.typography;

  const hasBodyContent = !!(status || details.length > 0);
  const hasFooter = actions.length > 0;
  const hasContentBelow = hasBodyContent || hasFooter;

  const card = css({
    background: mapCfg.base.backgroundColor,
    borderRadius: mapCfg.base.borderRadius,
    minWidth: mapCfg.base.minWidth,
    maxWidth: mapCfg.base.maxWidth,
    fontFamily: mapCfg.base.fontFamily,
    overflow: 'hidden',
    boxShadow: mapCfg.base.shadow,
  });

  const header = css({
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: sp.headerPadding,
    borderBottom: hasContentBelow ? `1px solid ${mapCfg.base.separatorColor}` : 'none',
    gap: '8px',
  });

  const iconWrapper = css({
    width: sp.iconWrapperSize,
    height: sp.iconWrapperSize,
    borderRadius: '8px',
    background: mapCfg.base.iconBg,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  });

  const titleStyle = css({
    fontSize: ty.titleFontSize,
    fontWeight: 600,
    color: mapCfg.base.titleColor,
    lineHeight: 1.3,
    margin: 0,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  });

  const addressStyle = css({
    fontSize: ty.addressFontSize,
    color: mapCfg.base.addressColor,
    lineHeight: 1.4,
    margin: '2px 0 0',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  });

  const closeBtn = css({
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '2px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    color: mapCfg.base.closeBtnColor,
    flexShrink: 0,
    '&:hover': {
      background: mapCfg.base.closeBtnHoverBg,
      color: mapCfg.base.closeBtnHoverColor,
    },
  });

  const body = css({ padding: sp.bodyPadding });

  const statusBadge = css({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: ty.statusFontSize,
    fontWeight: 600,
    padding: '3px 8px',
    borderRadius: '100px',
    letterSpacing: '0.3px',
    marginBottom: details.length > 0 ? sp.statusMarginBottom : 0,
    backgroundColor: badgeBg,
    color: resolvedStatusColor,
  });

  const statusDot = css({
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: resolvedStatusColor,
  });

  const detailRow = css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '8px',
    '& + &': { marginTop: sp.detailRowGap },
  });

  const detailLabel = css({
    display: 'flex',
    alignItems: 'center',
    gap: sp.detailLabelGap,
    fontSize: ty.detailFontSize,
    color: mapCfg.base.labelColor,
    flex: 1,
  });

  const detailValue = css({
    fontSize: ty.detailFontSize,
    fontWeight: 600,
    color: mapCfg.base.valueColor,
    textAlign: 'right' as const,
  });

  const footer = css({
    display: 'flex',
    gap: sp.actionGap,
    padding: sp.footerPadding,
    borderTop: `1px solid ${mapCfg.base.separatorColor}`,
    // Orca Buttons stretch to fill the footer equally
    '& > button': { flex: 1 },
  });

  /** Map MapPopup action variant → Orca Button variant */
  const toOrcaVariant = (
    v: 'primary' | 'secondary' | 'ghost' | string | undefined,
    idx: number
  ): 'primary' | 'secondary' | 'outline' => {
    if (v === 'ghost') return 'outline';
    if (v === 'secondary') return 'secondary';
    if (v === 'primary') return 'primary';
    // Default: first btn primary, rest secondary
    return idx === 0 ? 'primary' : 'secondary';
  };

  return (
    <div className={card} data-testid="map-popup">
      {/* ── Header ─────────────────────────────────── */}
      <div className={header} data-testid="map-popup-header">
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: sp.headerGap, flex: 1, minWidth: 0 }}>
          <div className={iconWrapper}>
            <LocationIcon color={mapCfg.base.iconColor} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p className={titleStyle} title={title} data-testid="map-popup-title">{title}</p>
            {address && (
              <p className={addressStyle} title={address} data-testid="map-popup-address">
                {address}
              </p>
            )}
            {city && (
              <p className={addressStyle} data-testid="map-popup-city">{city}</p>
            )}
          </div>
        </div>
        {onClose && (
          <button
            className={closeBtn}
            onClick={() => {
              onClose();
              dismissPopup?.();
            }}
            aria-label="Close popup"
            data-testid="map-popup-close"
          >
            <CloseIcon />
          </button>
        )}
      </div>

      {/* ── Body ───────────────────────────────────── */}
      {hasBodyContent && (
        <div className={body} data-testid="map-popup-body">
          {status && (
            <div className={statusBadge} data-testid="map-popup-status">
              <span className={statusDot} />
              {status}
            </div>
          )}

          {details.length > 0 && (
            <div data-testid="map-popup-details">
              {details.map((d, i) => (
                <div key={i} className={detailRow}>
                  <span className={detailLabel}>
                    {d.icon && <span aria-hidden="true">{d.icon}</span>}
                    {d.label}
                  </span>
                  <span className={detailValue} data-testid={`map-popup-detail-value-${i}`}>
                    {d.value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Footer actions (Orca Button) ────────────── */}
      {actions.length > 0 && (
        <div className={footer} data-testid="map-popup-actions">
          {actions.map((action, i) => (
            <Button
              key={i}
              variant={toOrcaVariant(action.variant, i)}
              size="sm"
              onClick={action.onClick}
              text={action.label}
            />
          ))}
        </div>
      )}
    </div>
  );
};

MapPopup.displayName = 'MapPopup';

export default MapPopup;
