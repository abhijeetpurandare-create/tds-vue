import React from 'react';
import { css } from '@emotion/css';
import { useTheme } from '../ThemeProvider';
import { defaultThemeConfig } from '../../config/config';
import Spinner, { SpinnerVariant } from '../Spinner';
import Checkbox from '../Checkbox';
import Pill from '../Pill';
import {
  buildCardContainerStyles,
  buildCardHeaderRowStyles,
  buildCardTextColumnStyles,
  buildCardSubitemsStyles,
  buildCardButtonsRowStyles,
  buildCardStepperIconStyles,
  buildCardStatusIndicatorStyles,
  buildCardChipsAreaStyles,
  buildCardInfoSetsStyles,
  buildCardBannerStyles,
  buildCardGhostStyles,
  type CardTarmacConfig,
  type CardStyleParams,
} from './useCardStyles';

// ─── Legacy Types ────────────────────────────────────────────────────────────

export type CardVariant = 'elevated' | 'outlined' | 'flat';
export type CardSize = 'sm' | 'md' | 'lg';

// ─── Tarmac Open Union Types ─────────────────────────────────────────────────

export type CardTarmacVariant =
  | 'standard' | 'standardType2' | 'slotBanner' | 'standardPills'
  | 'standardIconButtons' | 'infoSets' | 'badgeBottom' | 'buttonsTacked'
  | (string & {});

export type CardInputStyle = 'tarmac-01' | (string & {});

// ─── Tarmac Data Interfaces ──────────────────────────────────────────────────

export interface SubitemItem {
  icon: React.ReactNode;
  label: string;
}

export interface InfoSetItem {
  label: string;
  value: string | number;
}

export interface ChipItem {
  label: string;
  variant?: string;
  type?: string;
  /** Pill variant for Tarmac rendering (e.g. 'success', 'blue', 'warning') */
  pillVariant?: string;
  /** Pill type for Tarmac rendering (e.g. 'subtle', 'solid', 'outlined') */
  pillType?: string;
  /** Leading icon for the pill */
  leadingIcon?: React.ReactNode;
}

// ─── Legacy Constants ────────────────────────────────────────────────────────

const spinnerVariantMap: Record<string, SpinnerVariant> = {
  default: 'default',
  primary: 'primary',
  secondary: 'secondary'
};

// ─── CardProps (legacy + Tarmac-specific) ────────────────────────────────────

export interface CardProps {
  // === All existing legacy props preserved ===
  variant?: CardVariant;
  size?: CardSize;
  title?: React.ReactNode;
  extra?: React.ReactNode;
  cover?: React.ReactNode;
  actions?: React.ReactNode[];
  children?: React.ReactNode;
  isLoading?: boolean;
  isHoverable?: boolean;
  isRounded?: boolean;
  width?: string | number;
  height?: string | number;
  backgroundColor?: string;
  borderColor?: string;
  shadow?: string;
  radius?: string;
  border?: string;
  headerStyle?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  footerStyle?: React.CSSProperties;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  style?: React.CSSProperties;

  // === Tarmac-specific props ===
  cardStyle?: CardInputStyle;
  cardVariant?: CardTarmacVariant;
  subtitle?: React.ReactNode;
  description?: React.ReactNode;
  subtextTop?: React.ReactNode;
  subtextBottom?: React.ReactNode;
  badge?: React.ReactNode;
  chips?: ChipItem[];
  avatar?: React.ReactNode;
  snackbar?: React.ReactNode;
  statusIndicator?: React.ReactNode;
  statusText?: React.ReactNode;
  number?: number;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  subitems?: SubitemItem[];
  infoSets?: InfoSetItem[];
  bannerImage?: React.ReactNode;
  checkbox?: boolean;
  onCheckboxChange?: (checked: boolean) => void;
  isDisabled?: boolean;
  isGhost?: boolean;
  tabIndex?: number;
}

const CardMeta: React.FC<{
  avatar?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}> = ({ avatar, title, description, className, style }) => {
  // Use Emotion for all styles
  const metaStyles = css({
    display: 'flex',
    alignItems: 'flex-start',
  });
  
  const avatarStyles = css({
    marginRight: '0.75rem',
  });
  
  const titleStyles = css({
    fontWeight: 500,
    color: '#111827', // gray-900
  });
  
  const descriptionStyles = css({
    color: '#6B7280', // gray-500
  });

  return (
    <div className={`${metaStyles} ${className || ''}`} style={style}>
      {avatar && <div className={avatarStyles}>{avatar}</div>}
      <div>
        {title && <div className={titleStyles}>{title}</div>}
        {description && <div className={descriptionStyles}>{description}</div>}
      </div>
    </div>
  );
};

export interface CardComponent extends React.FC<CardProps> {
  Meta: typeof CardMeta;
}

// ─── TarmacCard Internal Component ───────────────────────────────────────────

const TarmacCard: React.FC<CardProps> = ({
  cardStyle: _cardStyle,
  cardVariant = 'standard',
  title,
  subtitle,
  description,
  subtextTop,
  subtextBottom,
  badge,
  chips,
  actions,
  avatar,
  snackbar,
  statusIndicator,
  statusText,
  number,
  leadingIcon,
  trailingIcon,
  subitems,
  infoSets,
  bannerImage,
  checkbox,
  onCheckboxChange,
  isDisabled = false,
  isGhost = false,
  onClick,
  children,
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

  const styleParams: CardStyleParams = {
    config,
    cardVariant: cardVariant as string,
    isDisabled,
    isGhost,
    hasOnClick: !!onClick,
  };

  const containerClass = buildCardContainerStyles(styleParams);
  const headerRow = buildCardHeaderRowStyles(styleParams);
  const textCol = buildCardTextColumnStyles(styleParams);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDisabled || isGhost) return;
    onClick?.(e);
  };

  // ── Ghost rendering ──────────────────────────────────────────────────────
  if (isGhost) {
    const ghostClass = buildCardGhostStyles(styleParams);
    return (
      <div
        className={`${containerClass}${className ? ` ${className}` : ''}`}
        style={style}
        tabIndex={-1}
        data-testid="tarmac-card"
      >
        <div className={ghostClass} data-testid="tarmac-card-ghost-skeleton" />
      </div>
    );
  }

  // ── Children override ────────────────────────────────────────────────────
  if (children) {
    return (
      <div
        className={`${containerClass}${className ? ` ${className}` : ''}`}
        style={style}
        onClick={!isDisabled ? handleClick : undefined}
        tabIndex={tabIndex}
        data-testid="tarmac-card"
      >
        {children}
      </div>
    );
  }

  // ── Normal rendering ─────────────────────────────────────────────────────
  return (
    <div
      className={`${containerClass}${className ? ` ${className}` : ''}`}
      style={style}
      onClick={!isDisabled ? handleClick : undefined}
      tabIndex={tabIndex}
      data-testid="tarmac-card"
    >
      {/* Banner image (Slot Banner variant) */}
      {cardVariant === 'slotBanner' && bannerImage && (
        <div className={buildCardBannerStyles(styleParams)} data-testid="tarmac-card-banner">
          {bannerImage}
        </div>
      )}

      {/* Header Row */}
      <div className={headerRow.headerRow}>
        {/* Stepper Icon — raw HTML + TODO */}
        {number != null && (
          <div className={headerRow.numberArea}>
            {/* TODO: Replace with Tarmac Stepper Icon when available */}
            <div className={buildCardStepperIconStyles(styleParams)} data-testid="tarmac-card-stepper-icon">
              <span>{number}</span>
            </div>
          </div>
        )}

        {/* Leading Icon */}
        {leadingIcon && (
          <span className={headerRow.leadingIcon} data-testid="tarmac-card-leading-icon">
            {leadingIcon}
          </span>
        )}

        {/* Text Column */}
        <div className={headerRow.textColumn}>
          {subtextTop && (
            <span className={textCol.subtextTop} data-testid="tarmac-card-subtext-top">
              {subtextTop}
            </span>
          )}
          {title && (
            <span className={textCol.title} data-testid="tarmac-card-title">
              {title}
            </span>
          )}
          {subtitle && (
            <span className={textCol.subtextBottom} data-testid="tarmac-card-subtitle">
              {subtitle}
            </span>
          )}
          {subtextBottom && (
            <span className={textCol.subtextBottom} data-testid="tarmac-card-subtext-bottom">
              {subtextBottom}
            </span>
          )}
          {description && (
            <span className={textCol.subtextBottom} data-testid="tarmac-card-description">
              {description}
            </span>
          )}
        </div>

        {/* Badge (header position) */}
        {badge && (
          <div className={headerRow.badgeArea} data-testid="tarmac-card-badge">
            {badge}
          </div>
        )}

        {/* Trailing Icon */}
        {trailingIcon && (
          <span className={headerRow.trailingIcon} data-testid="tarmac-card-trailing-icon">
            {trailingIcon}
          </span>
        )}
      </div>

      {/* Subitems */}
      {subitems && subitems.length > 0 && (() => {
        const subStyles = buildCardSubitemsStyles(styleParams);
        return (
          <div className={subStyles.subitemsRow} data-testid="tarmac-card-subitems">
            {subitems.map((item, i) => (
              <div key={i} className={subStyles.subitem}>
                <span className={subStyles.subitemIcon}>{item.icon}</span>
                <span className={subStyles.subitemLabel}>{item.label}</span>
              </div>
            ))}
          </div>
        );
      })()}

      {/* Snackbar */}
      {snackbar && (
        <div data-testid="tarmac-card-snackbar">{snackbar}</div>
      )}

      {/* Status Indicator — raw HTML + TODO */}
      {statusIndicator && (
        <div className={buildCardStatusIndicatorStyles(styleParams)} data-testid="tarmac-card-status-indicator">
          {/* TODO: Replace with Tarmac Status Indicator when available */}
          {statusIndicator}
          {statusText && <span>{statusText}</span>}
        </div>
      )}

      {/* Pills (Standard + Pills variant) */}
      {chips && chips.length > 0 && (
        <div className={buildCardChipsAreaStyles(styleParams)} data-testid="tarmac-card-chips">
          {chips.map((chip, i) => (
            <Pill
              key={i}
              pillVariant={chip.pillVariant || chip.variant || 'black'}
              pillType={chip.pillType || chip.type || 'subtle'}
              size="md"
              text={chip.label}
              leadingIcon={chip.leadingIcon}
            />
          ))}
        </div>
      )}

      {/* Info Sets (Info Sets variant) */}
      {infoSets && infoSets.length > 0 && (() => {
        const infoStyles = buildCardInfoSetsStyles(styleParams);
        return (
          <div className={infoStyles.infoSetsRow} data-testid="tarmac-card-info-sets">
            {infoSets.map((set, i) => (
              <div key={i} className={infoStyles.infoSetItem}>
                <span className={infoStyles.infoSetLabel}>{set.label}</span>
                <span className={infoStyles.infoSetValue}>{set.value}</span>
              </div>
            ))}
          </div>
        );
      })()}

      {/* Avatar */}
      {avatar && (
        <div data-testid="tarmac-card-avatar">{avatar}</div>
      )}

      {/* Checkbox toggle */}
      {checkbox != null && (
        <div data-testid="tarmac-card-checkbox">
          <Checkbox
            tarmacVariant="standard"
            tarmacStyle="box"
            size="md"
            checked={!!checkbox}
            onChange={() => onCheckboxChange?.(!checkbox)}
          />
        </div>
      )}

      {/* Action Buttons */}
      {actions && (Array.isArray(actions) ? actions.length > 0 : true) && (
        <div className={buildCardButtonsRowStyles(styleParams)} data-testid="tarmac-card-actions">
          {actions}
        </div>
      )}
    </div>
  );
};

// ─── Legacy CardBase ─────────────────────────────────────────────────────────

const CardBase: React.FC<CardProps> = (props) => {
  // ── Tarmac discriminator branch ────────────────────────────────────────────
  if (props.cardStyle) {
    return <TarmacCard {...props} />;
  }

  // ── Legacy Card rendering ──────────────────────────────────────────────────
  const {
    variant = 'elevated',
    size = 'md',
    title,
    extra,
    cover,
    actions,
    children,
    isLoading = false,
    isHoverable = false,
    isRounded = false,
    width,
    height,
    backgroundColor,
    borderColor,
    shadow,
    radius,
    border,
    headerStyle,
    bodyStyle,
    footerStyle,
    className = '',
    onClick,
    style,
    // Destructure Tarmac-only props so they don't spread to the DOM
    cardStyle: _cardStyle,
    cardVariant: _cardVariant,
    subtitle: _subtitle,
    description: _description,
    subtextTop: _subtextTop,
    subtextBottom: _subtextBottom,
    badge: _badge,
    chips: _chips,
    avatar: _avatar,
    snackbar: _snackbar,
    statusIndicator: _statusIndicator,
    statusText: _statusText,
    number: _number,
    leadingIcon: _leadingIcon,
    trailingIcon: _trailingIcon,
    subitems: _subitems,
    infoSets: _infoSets,
    bannerImage: _bannerImage,
    checkbox: _checkbox,
    onCheckboxChange: _onCheckboxChange,
    isDisabled: _isDisabled,
    isGhost: _isGhost,
    tabIndex: _tabIndex,
    ...restProps
  } = props;
  const { theme } = useTheme();
  const cardConfig = theme.components?.card || defaultThemeConfig.components.card;
  
  // DYNAMIC STYLES WITH EMOTION
  
  // Get variant configuration
  const variantStyles = cardConfig.variants[variant] || {};
  
  // Use Emotion for all styling, converting Tailwind classes to actual CSS
  const dynamicStyles = css({
    // Base styles
    overflow: 'hidden',
    padding: !isLoading ? (size === 'sm' ? '0.75rem' : size === 'md' ? '1rem' : '1.25rem') : undefined,
    
    // Border radius
    borderRadius: isRounded ? '0.75rem' : '0.5rem',
    
    // Variant specific styling
    boxShadow: shadow || variantStyles.shadow || 'none',
    
    // Border handling
    ...(border ? { border } : 
       borderColor ? { 
         border: `1px solid ${borderColor}` 
       } : 
       variantStyles.border ? { border: variantStyles.border } : 
       { border: 'none' }),
    
    backgroundColor: backgroundColor || 
      (typeof variantStyles.backgroundColor === 'string' && variantStyles.backgroundColor.startsWith('bg-') 
        ? '#ffffff' // Default white for bg-white
        : variantStyles.backgroundColor) || 
      'white',
    
    // Custom dimensions
    width: width || 'auto',
    height: height || 'auto',
    
    // Hover styles if enabled
    ...(isHoverable && {
      transition: 'all 0.2s ease-in-out',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
      }
    }),
    
    // Cursor style for clickable cards
    cursor: onClick ? 'pointer' : 'default',
    
    // Additional custom styles
    ...style
  });
  
  // Header styles with Emotion
  const headerStyles = css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.75rem',
    borderBottom: '1px solid #e5e7eb',
    paddingBottom: '0.75rem'
  });
  
  const titleStyles = css({
    fontSize: '1.125rem',
    fontWeight: 600
  });

  // Footer styles with Emotion
  const footerStyles = css({
    borderTop: '1px solid #e5e7eb',
    marginTop: '0.75rem',
    paddingTop: '0.75rem',
    display: 'flex',
    justifyContent: 'space-around'
  });
  
  const actionStyles = css({
    flex: 1,
    textAlign: 'center'
  });

  // Loading styles with Emotion
  const loadingStyles = css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem'
  });

  const renderCardContent = () => {
    if (isLoading) {
      return (
        <div className={loadingStyles}>
          <Spinner 
            size="md" 
            variant={spinnerVariantMap[theme.spinnerVariant || 'default']} 
          />
        </div>
      );
    }

    return (
      <>
        {cover && <div style={{ width: '100%' }}>{cover}</div>}

        {(title || extra) && (
          <div className={headerStyles} style={headerStyle}>
            {title && (
              typeof title === 'string' 
                ? <h3 className={titleStyles}>{title}</h3>
                : title
            )}
            {extra && <div>{extra}</div>}
          </div>
        )}

        <div style={bodyStyle}>
          {children}
        </div>

        {actions && actions.length > 0 && (
          <div className={footerStyles} style={footerStyle}>
            {actions.map((action, index) => (
              <div key={`action-${index}`} className={actionStyles}>
                {action}
              </div>
            ))}
          </div>
        )}
      </>
    );
  };

  return (
    <div
      className={`${dynamicStyles} ${className}`}
      onClick={onClick}
      {...restProps}
    >
      {renderCardContent()}
    </div>
  );
};

export const Card = Object.assign(CardBase, {
  Meta: CardMeta,
}) as CardComponent;

export default Card;
