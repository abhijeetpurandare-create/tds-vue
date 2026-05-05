import React from 'react';
import { useTheme } from '../ThemeProvider';
import { defaultThemeConfig } from '../../config/config';
import {
  buildInfoCardStyles,
  buildInfoCardSlotsStyles,
  buildInfoCardSlotTopStyles,
  buildInfoCardBannerStyles,
  buildInfoCardRegularStyles,
  buildInfoCardGhostStyles,
  type CardTarmacConfig,
  type InfoCardStyleParams,
} from './useCardStyles';

// ─── Open Union Types ────────────────────────────────────────────────────────

export type InfoCardStyle = 'slots' | 'slotTop' | 'slotBanner' | 'regular' | (string & {});

// ─── Data Interfaces ─────────────────────────────────────────────────────────

export interface SlotItem {
  value: string | number;
  label: string;
}

// ─── Props Interface ─────────────────────────────────────────────────────────

export interface InfoCardProps {
  /** Style variant — "slots", "slotTop", "slotBanner", or "regular". Default: "regular" */
  infoStyle?: InfoCardStyle;

  /** Primary card title — in Slots style this is a large number (heading/semibold/24px) */
  title?: React.ReactNode;
  /** Secondary text below title */
  subtitle?: React.ReactNode;
  /** Tarmac Badge element */
  badge?: React.ReactNode;
  /** Icon/image for Slot Top style */
  icon?: React.ReactNode;
  /** Banner image for Slot Banner / Slot Top styles */
  bannerImage?: React.ReactNode;
  /** Custom content for Regular style */
  children?: React.ReactNode;
  /** Trailing icon (default: keyboard-arrow-right, 20px) */
  trailingIcon?: React.ReactNode;

  /** Slot items array for Slots style */
  slots?: SlotItem[];
  /** Custom ReactNode for 48px leading slot area */
  slotLeading?: React.ReactNode;
  /** Custom ReactNode for 32px trailing slot area */
  slotTrailing?: React.ReactNode;
  /** Subtext above title (with optional info icon) */
  subtextTop?: React.ReactNode;
  /** Subtext below title */
  subtextBottom?: React.ReactNode;

  /** Disabled state — prevents click interactions */
  isDisabled?: boolean;
  /** Ghost/skeleton state — renders placeholder blocks */
  isGhost?: boolean;

  /** Click callback */
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;

  /** Additional CSS class */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Tab index for focusability. Default: 0 */
  tabIndex?: number;
}

// ─── Component ───────────────────────────────────────────────────────────────

const InfoCard: React.FC<InfoCardProps> = ({
  infoStyle = 'regular',
  title,
  subtitle: _subtitle,
  badge,
  icon: _icon,
  bannerImage: _bannerImage,
  children,
  trailingIcon,
  slots: _slots,
  slotLeading,
  slotTrailing,
  subtextTop,
  subtextBottom,
  isDisabled = false,
  isGhost = false,
  onClick,
  className,
  style,
  tabIndex = 0,
}) => {
  const { theme } = useTheme();
  const config: CardTarmacConfig =
    (theme.components?.card_tarmac as CardTarmacConfig) ||
    (defaultThemeConfig as any).components?.card_tarmac ||
    ({
      base: {},
      selectionCard: { types: {}, sizes: {}, states: {} },
      infoCard: { styles: {}, states: {} },
      card: { base: {}, variants: {}, states: {} },
    } as CardTarmacConfig);

  const styleParams: InfoCardStyleParams = {
    config,
    infoStyle,
    isDisabled,
    isGhost,
    hasOnClick: !!onClick,
  };

  const containerClass = buildInfoCardStyles(styleParams);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDisabled || isGhost) return;
    onClick?.(e);
  };

  // ── Ghost rendering ──────────────────────────────────────────────────────
  if (isGhost) {
    const ghostClass = buildInfoCardGhostStyles(styleParams);
    return (
      <div
        className={`${containerClass}${className ? ` ${className}` : ''}`}
        style={style}
        tabIndex={-1}
        data-testid="info-card"
      >
        <div className={ghostClass} data-testid="info-card-ghost-skeleton" />
      </div>
    );
  }

  // ── Slots layout ─────────────────────────────────────────────────────────
  // Figma: Container (column, justifyContent:center, gap:8px, padding:12px)
  //   └── Frame 2085662520 (row, gap:4px)
  //        ├── Frame 2085662519 (row, gap:8px)
  //        │    ├── Slot Leading (48×48, centered, padding:10px)
  //        │    ├── Text set (column, no gap)
  //        │    └── Slot Trailing (32×32, centered, padding:10px)
  //        └── Trailing Icon (20×20)
  if (infoStyle === 'slots') {
    const slotsStyles = buildInfoCardSlotsStyles(styleParams);
    return (
      <div
        className={`${containerClass}${className ? ` ${className}` : ''}`}
        style={style}
        onClick={handleClick}
        tabIndex={tabIndex}
        data-testid="info-card"
      >
        <div className={slotsStyles.slotsRow}>
          <div className={slotsStyles.innerRow}>
            {slotLeading && (
              <div className={slotsStyles.slotLeading} data-testid="info-card-slot-leading">
                {slotLeading}
              </div>
            )}
            <div className={slotsStyles.textSet}>
              {subtextTop && (
                <span className={slotsStyles.subtextTop} data-testid="info-card-subtext-top">
                  {subtextTop}
                </span>
              )}
              {title && (
                <span className={slotsStyles.title} data-testid="info-card-title">
                  {title}
                </span>
              )}
              {subtextBottom && (
                <span className={slotsStyles.subtextBottom} data-testid="info-card-subtext-bottom">
                  {subtextBottom}
                </span>
              )}
            </div>
            {slotTrailing && (
              <div className={slotsStyles.slotTrailing} data-testid="info-card-slot-trailing">
                {slotTrailing}
              </div>
            )}
          </div>
          {trailingIcon && (
            <span className={slotsStyles.trailingIcon} data-testid="info-card-trailing-icon">
              {trailingIcon}
            </span>
          )}
        </div>
      </div>
    );
  }

  // ── Slot Top layout ──────────────────────────────────────────────────────
  // Figma: Container (column, alignItems:center, gap:8px, padding:12px)
  //   └── Frame 2085662520 (row, gap:4px)
  //        ├── Frame 2085662519 (column, gap:8px)
  //        │    ├── Slot Leading (48×48, centered, padding:10px)
  //        │    └── Text set (column, no gap)
  //        └── Trailing Icon (20×20)
  if (infoStyle === 'slotTop') {
    const slotTopStyles = buildInfoCardSlotTopStyles(styleParams);
    return (
      <div
        className={`${containerClass}${className ? ` ${className}` : ''}`}
        style={style}
        onClick={handleClick}
        tabIndex={tabIndex}
        data-testid="info-card"
      >
        <div className={slotTopStyles.contentRow}>
          <div className={slotTopStyles.innerColumn}>
            {slotLeading && (
              <div className={slotTopStyles.slotLeading} data-testid="info-card-slot-leading">
                {slotLeading}
              </div>
            )}
            <div className={slotTopStyles.textSet}>
              {subtextTop && (
                <span className={slotTopStyles.subtextTop} data-testid="info-card-subtext-top">
                  {subtextTop}
                </span>
              )}
              {title && (
                <span className={slotTopStyles.title} data-testid="info-card-title">
                  {title}
                </span>
              )}
              {subtextBottom && (
                <span className={slotTopStyles.subtextBottom} data-testid="info-card-subtext-bottom">
                  {subtextBottom}
                </span>
              )}
            </div>
          </div>
          {trailingIcon && (
            <span className={slotTopStyles.trailingIcon} data-testid="info-card-trailing-icon">
              {trailingIcon}
            </span>
          )}
        </div>
      </div>
    );
  }

  // ── Slot Banner layout ───────────────────────────────────────────────────
  // Figma: Container (column, alignItems:stretch, gap:8px, padding:12px, fixed width)
  //   └── Frame 2085662520 (row, alignSelf:stretch, gap:4px, fill)
  //        └── Frame 2085662519 (column, gap:8px, fill)
  //             ├── Slot Leading (full-width stretch, centered, padding:10px)
  //             └── Text set (column, no gap)
  if (infoStyle === 'slotBanner') {
    const bannerStyles = buildInfoCardBannerStyles(styleParams);
    return (
      <div
        className={`${containerClass}${className ? ` ${className}` : ''}`}
        style={style}
        onClick={handleClick}
        tabIndex={tabIndex}
        data-testid="info-card"
      >
        <div className={bannerStyles.contentRow}>
          <div className={bannerStyles.innerColumn}>
            {slotLeading && (
              <div className={bannerStyles.slotLeading} data-testid="info-card-slot-leading">
                {slotLeading}
              </div>
            )}
            <div className={bannerStyles.textSet}>
              {subtextTop && (
                <span className={bannerStyles.subtextTop} data-testid="info-card-subtext-top">
                  {subtextTop}
                </span>
              )}
              {title && (
                <span className={bannerStyles.title} data-testid="info-card-title">
                  {title}
                </span>
              )}
              {subtextBottom && (
                <span className={bannerStyles.subtextBottom} data-testid="info-card-subtext-bottom">
                  {subtextBottom}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Regular layout (default) ─────────────────────────────────────────────
  // Figma: Container (column, justifyContent:center, gap:8px, padding:12px)
  //   └── Frame 2085662520 (row, gap:4px)
  //        ├── Frame 2085662519 (row, gap:8px)
  //        │    ├── Slot Leading (32×32, centered, padding:10px)
  //        │    └── Text set (column, no gap)
  //        └── Trailing Icon (20×20)
  const regularStyles = buildInfoCardRegularStyles(styleParams);
  return (
    <div
      className={`${containerClass}${className ? ` ${className}` : ''}`}
      style={style}
      onClick={handleClick}
      tabIndex={tabIndex}
      data-testid="info-card"
    >
      <div className={regularStyles.contentRow}>
        <div className={regularStyles.innerRow}>
          {slotLeading && (
            <div className={regularStyles.slotLeading} data-testid="info-card-slot-leading">
              {slotLeading}
            </div>
          )}
          <div className={regularStyles.textSet}>
            {subtextTop && (
              <span className={regularStyles.subtextTop} data-testid="info-card-subtext-top">
                {subtextTop}
              </span>
            )}
            {title && (
              <span className={regularStyles.title} data-testid="info-card-title">
                {title}
              </span>
            )}
            {subtextBottom && (
              <span className={regularStyles.subtextBottom} data-testid="info-card-subtext-bottom">
                {subtextBottom}
              </span>
            )}
          </div>
        </div>
        {trailingIcon && (
          <span className={regularStyles.trailingIcon} data-testid="info-card-trailing-icon">
            {trailingIcon}
          </span>
        )}
      </div>
      {badge && (
        <div data-testid="info-card-badge">
          {badge}
        </div>
      )}
      {children}
    </div>
  );
};

export default InfoCard;
export { InfoCard };
