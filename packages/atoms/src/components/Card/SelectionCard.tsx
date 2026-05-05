import React, { useCallback, useRef } from 'react';
import { useTheme } from '../ThemeProvider';
import { defaultThemeConfig } from '../../config/config';
import Radio from '../Radio';
import Checkbox from '../Checkbox';
import {
  buildSelectionCardStyles,
  buildSelectionCardContentStyles,
  buildSelectionCardGhostStyles,
  type CardTarmacConfig,
  type SelectionCardStyleParams,
} from './useCardStyles';

// ─── Open Union Types ────────────────────────────────────────────────────────

export type SelectionCardType = 'radio' | 'checkbox' | (string & {});
export type SelectionCardSize = 'lg' | 'sm' | (string & {});
export type CardInputStyle = 'tarmac-01' | (string & {});

// ─── Props Interface ─────────────────────────────────────────────────────────

export interface SelectionCardProps {
  /** Selection mechanism — "radio" or "checkbox". Default: "radio" */
  selectionType?: SelectionCardType;
  /** Card size — "lg" or "sm". Default: "lg" */
  size?: SelectionCardSize;

  /** Controlled selection state */
  selected?: boolean;
  /** Callback when selection changes */
  onChange?: (e: { value?: string | number; selected: boolean }) => void;
  /** Radio group association name */
  name?: string;
  /** Card identity within a group */
  value?: string | number;

  /** Primary label text */
  title?: React.ReactNode;
  /** Secondary descriptive text below title */
  subtext?: React.ReactNode;
  /** Colored dot status indicator adjacent to title */
  statusIndicator?: React.ReactNode;
  /** Icon on the right side of the card */
  trailingIcon?: React.ReactNode;

  /** Disabled state — prevents selection changes */
  isDisabled?: boolean;
  /** Ghost/skeleton state — renders placeholder blocks */
  isGhost?: boolean;

  /** Additional CSS class */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Tab index for focusability. Default: 0 */
  tabIndex?: number;
}

// ─── Component ───────────────────────────────────────────────────────────────

const SelectionCard: React.FC<SelectionCardProps> = ({
  selectionType = 'radio',
  size = 'lg',
  selected = false,
  onChange,
  name,
  value,
  title,
  subtext,
  statusIndicator,
  trailingIcon,
  isDisabled = false,
  isGhost = false,
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

  const styleParams: SelectionCardStyleParams = {
    config,
    selectionType,
    size,
    selected,
    isDisabled,
    isGhost,
  };

  const containerClass = buildSelectionCardStyles(styleParams);
  const contentStyles = buildSelectionCardContentStyles(styleParams);

  // Guard against double-fire: the Checkbox/Radio <label> causes the browser
  // to emit two click events (one from the label, one synthetic from the
  // hidden <input>). We debounce with a ref so only the first one counts.
  const clickGuard = useRef(false);

  const handleCardClick = useCallback(() => {
    if (isDisabled || isGhost) return;
    if (clickGuard.current) return;
    clickGuard.current = true;
    onChange?.({ value, selected: !selected });
    // Reset after the current event loop so the next real click works
    requestAnimationFrame(() => { clickGuard.current = false; });
  }, [isDisabled, isGhost, onChange, value, selected]);

  const ariaRole = selectionType === 'checkbox' ? 'checkbox' : 'radio';

  // ── Ghost rendering ──────────────────────────────────────────────────────
  if (isGhost) {
    const ghostClasses = buildSelectionCardGhostStyles(styleParams);
    return (
      <div
        className={`${containerClass}${className ? ` ${className}` : ''}`}
        style={style}
        tabIndex={-1}
        role={ariaRole}
        aria-checked={selected}
        aria-disabled
        data-testid="selection-card"
      >
        <div className={ghostClasses.wrapper} data-testid="selection-card-ghost-skeleton">
          <div className={ghostClasses.block1} />
          <div className={ghostClasses.block2} />
        </div>
      </div>
    );
  }

  // ── Normal rendering ─────────────────────────────────────────────────────
  return (
    <div
      className={`${containerClass}${className ? ` ${className}` : ''}`}
      style={style}
      onClick={handleCardClick}
      tabIndex={tabIndex}
      role={ariaRole}
      aria-checked={selected}
      aria-disabled={isDisabled}
      data-testid="selection-card"
    >
      {/* Content area */}
      <div className={contentStyles.contentArea}>
        <div className={contentStyles.textsColumn}>
          {title && (
            <span className={contentStyles.title} data-testid="selection-card-title">
              {title}
            </span>
          )}
          {subtext && (
            <span className={contentStyles.subtext} data-testid="selection-card-subtext">
              {subtext}
            </span>
          )}
        </div>
        {statusIndicator && (
          <div data-testid="selection-card-status-indicator">
            {statusIndicator}
          </div>
        )}
      </div>

      {/* Trailing icon */}
      {trailingIcon && (
        <span className={contentStyles.trailingIcon} data-testid="selection-card-trailing-icon">
          {trailingIcon}
        </span>
      )}

      {/* Selection indicator — pointer-events:none so all clicks go to the card */}
      <div style={{ pointerEvents: 'none', display: 'flex' }}>
        {selectionType === 'checkbox' ? (
          <Checkbox
            tarmacVariant="standard"
            tarmacStyle="box"
            size="md"
            checked={selected}
            disabled={isDisabled}
            onChange={() => {}}
          />
        ) : (
          <Radio
            variant="standard"
            radioStyle="filled"
            size="md"
            checked={selected}
            disabled={isDisabled}
            onChange={() => {}}
            name={name}
            value={value}
          />
        )}
      </div>
    </div>
  );
};

export default SelectionCard;
export { SelectionCard };
