import React, { createContext, useContext, useMemo, useState, useCallback } from 'react';
import { css } from '@emotion/css';
import { useTheme } from '../ThemeProvider';
import { defaultThemeConfig } from '../../config/config';
import Popup from '../Popup';
import Button from '../Button';
import Badge from '../Badge';
import Tooltip from '../Tooltip';
import {
  buildContentStyles,
  buildEmojiSetStyles,
  buildEmojiIconStyles,
  buildStarSetStyles,
  buildStarIconStyles,
  buildSliderStyles,
  buildGhostStyles,
  type RatingSetConfig,
} from './useRatingSetStyles';

// ─── Types ───────────────────────────────────────────────────────────────────

/** A single rating option — icon + label pair */
export interface RatingItem {
  /** Emoji or ReactNode to display as the selectable icon */
  icon: string | React.ReactNode;
  /** Label shown in the badge when this item is selected */
  label: string;
}

export type RatingSetStyle = 'stars' | 'emojis' | 'slider' | (string & {});
export type RatingSetVariant = 'websitePopup' | 'mobileBottomSheet' | (string & {});

export interface RatingSetProps {
  /** Rating style: stars, emojis, or slider */
  ratingStyle?: RatingSetStyle;
  /** Layout variant */
  variant?: RatingSetVariant;
  /** Title text shown in the popup header */
  title?: string;
  /** Current rating value (1-based index for emojis/stars, 0-100 for slider) */
  value?: number;
  /** Change handler */
  onChange?: (value: number) => void;
  /**
   * Configurable rating items — each entry has an icon and a label.
   * For emojis: `[{ icon: "😔", label: "Unhappy" }, ...]`
   * For stars: `[{ icon: "⭐", label: "Poor" }, ...]`
   * For slider: `[{ icon: "😔", label: "Unhappy" }, ...]` (mapped to slider ranges)
   * The badge auto-derives its text from the selected item's label.
   */
  items?: RatingItem[];
  /** Custom feedback input node — pass a <TextArea> or any element. When provided, showFeedback renders it. */
  feedbackInput?: React.ReactNode;
  /** Submit handler */
  onSubmit?: () => void;
  /** Close handler */
  onClose?: () => void;
  /** Override badge label (ignores items[].label) */
  badgeLabel?: string;
  /** Submit button text */
  submitText?: string;
  /** Show feedback textarea */
  showFeedback?: boolean;
  /** Show badge label */
  showBadge?: boolean;
  /** Max stars count (only for stars style, ignored when items is provided) */
  maxStars?: number;
  /** Ghost/skeleton state */
  isGhost?: boolean;
  /** Whether the popup is open (controlled) */
  isOpen?: boolean;
  /** Popup size */
  popupSize?: string;
  /** Render inline instead of portal */
  renderInline?: boolean;
  /** Additional className */
  className?: string;
  /** Custom footer actions (overrides default submit button) */
  footerActions?: React.ReactNode;
  /** Children for full composition mode (bypasses default rendering) */
  children?: React.ReactNode;
}

// ─── Context ─────────────────────────────────────────────────────────────────

interface RatingSetContextValue {
  config: RatingSetConfig;
  variant: string;
  ratingStyle: string;
  value: number;
  items: RatingItem[];
  onChange: (v: number) => void;
}

const RatingSetCtx = createContext<RatingSetContextValue>({
  config: {} as RatingSetConfig,
  variant: 'websitePopup',
  ratingStyle: 'emojis',
  value: 0,
  items: [],
  onChange: () => {},
});

// ─── Defaults ────────────────────────────────────────────────────────────────

const DEFAULT_EMOJI_ITEMS: RatingItem[] = [
  { icon: '😔', label: 'Unhappy' },
  { icon: '😕', label: 'Hmm' },
  { icon: '😅', label: 'Ok' },
  { icon: '😍', label: 'Nice' },
  { icon: '🤩', label: 'Great' },
];

const DEFAULT_STAR_ITEMS: RatingItem[] = [
  { icon: '⭐', label: 'Poor' },
  { icon: '⭐', label: 'Below Average' },
  { icon: '⭐', label: 'Average' },
  { icon: '⭐', label: 'Good' },
  { icon: '⭐', label: 'Excellent' },
];

const DEFAULT_SLIDER_ITEMS: RatingItem[] = DEFAULT_EMOJI_ITEMS;

function getDefaultItems(style: string): RatingItem[] {
  if (style === 'stars') return DEFAULT_STAR_ITEMS;
  if (style === 'slider') return DEFAULT_SLIDER_ITEMS;
  return DEFAULT_EMOJI_ITEMS;
}

/** Derive the badge label from value + items */
function deriveLabel(value: number, items: RatingItem[], style: string): string {
  if (style === 'slider' && items.length > 0) {
    const step = 100 / items.length;
    const idx = Math.min(Math.floor(value / step), items.length - 1);
    return items[Math.max(0, idx)]?.label || '';
  }
  const idx = Math.max(0, Math.min(value - 1, items.length - 1));
  return items[idx]?.label || '';
}

/** Get slider tooltip icon from value + items */
function getSliderIcon(value: number, items: RatingItem[]): string | React.ReactNode {
  if (items.length === 0) return '';
  const step = 100 / items.length;
  const idx = Math.min(Math.floor(value / step), items.length - 1);
  return items[Math.max(0, idx)]?.icon || '';
}

// ─── Emoji Rating Sub-Component ──────────────────────────────────────────────

export interface EmojiRatingProps {
  items?: RatingItem[];
  value?: number;
  onChange?: (value: number) => void;
}

const EmojiRating: React.FC<EmojiRatingProps> = ({ items: propItems, value: propValue, onChange: propOnChange }) => {
  const ctx = useContext(RatingSetCtx);
  const items = propItems ?? ctx.items;
  const val = propValue ?? ctx.value;
  const onChangeHandler = propOnChange ?? ctx.onChange;
  const config = ctx.config;
  const setStyles = buildEmojiSetStyles(config);

  return (
    <div className={setStyles} data-testid="ratingset-emoji-set">
      {items.map((item, i) => {
        const isSelected = val === i + 1;
        const iconStyles = buildEmojiIconStyles(config, isSelected);
        return (
          <button
            key={i}
            type="button"
            className={iconStyles}
            onClick={() => onChangeHandler(i + 1)}
            aria-label={`Rate ${i + 1}: ${item.label}`}
            aria-pressed={isSelected}
            data-testid={`ratingset-emoji-${i}`}
          >
            <span style={{ fontSize: 16, lineHeight: '1em' }}>
              {typeof item.icon === 'string' ? item.icon : item.icon}
            </span>
          </button>
        );
      })}
    </div>
  );
};

// ─── Star Rating Sub-Component ───────────────────────────────────────────────

const STAR_PATH = 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z';

export interface StarRatingProps {
  items?: RatingItem[];
  value?: number;
  onChange?: (value: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ items: propItems, value: propValue, onChange: propOnChange }) => {
  const ctx = useContext(RatingSetCtx);
  const items = propItems ?? ctx.items;
  const val = propValue ?? ctx.value;
  const onChangeHandler = propOnChange ?? ctx.onChange;
  const config = ctx.config;
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const setStyles = buildStarSetStyles(config);

  return (
    <div className={setStyles} onMouseLeave={() => setHoverIdx(null)} data-testid="ratingset-star-set">
      {items.map((item, i) => {
        const displayVal = hoverIdx !== null ? hoverIdx + 1 : val;
        const isFilled = i < displayVal;
        const iconStyles = buildStarIconStyles(config, isFilled);
        return (
          <button
            key={i}
            type="button"
            className={iconStyles}
            onClick={() => onChangeHandler(i + 1)}
            onMouseEnter={() => setHoverIdx(i)}
            aria-label={`Rate ${i + 1}: ${item.label}`}
            aria-pressed={i < val}
            data-testid={`ratingset-star-${i}`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d={STAR_PATH} fill={isFilled ? (config.star?.filledColor || '#F5C828') : (config.star?.emptyColor || 'rgba(0,0,0,0.2)')} />
            </svg>
          </button>
        );
      })}
    </div>
  );
};

// ─── Slider Rating Sub-Component ─────────────────────────────────────────────

export interface SliderRatingProps {
  items?: RatingItem[];
  value?: number;
  onChange?: (value: number) => void;
  sliderStyle?: 'black' | 'white';
}

const SliderRating: React.FC<SliderRatingProps> = ({ items: propItems, value: propValue, onChange: propOnChange, sliderStyle = 'white' }) => {
  const ctx = useContext(RatingSetCtx);
  const items = propItems ?? ctx.items;
  const val = propValue ?? ctx.value;
  const onChangeHandler = propOnChange ?? ctx.onChange;
  const config = ctx.config;
  const pct = Math.max(0, Math.min(100, val));
  const tooltipIcon = getSliderIcon(pct, items);

  const trackStyles = buildSliderStyles(config, sliderStyle);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeHandler(Number(e.target.value));
  }, [onChangeHandler]);

  // The knob + tooltip share a wrapper positioned at the knob's left%.
  // The wrapper uses bottom-anchoring so the knob sits at track center
  // and the tooltip extends upward, never overlapping the track.
  const knobWrapperCls = css({
    position: 'absolute' as const,
    bottom: '50%',
    left: `${pct}%`,
    transform: 'translateX(-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    pointerEvents: 'none' as const,
    zIndex: 1,
  });

  const knobDotCls = css({
    width: 16,
    height: 16,
    borderRadius: '999px',
    backgroundColor: config.slider?.knobColor || '#f2f2f2',
    boxShadow: config.slider?.knobShadow || '0px 0px 6px 0px rgba(0,0,0,0.2)',
    flexShrink: 0,
    // shift knob down so its center aligns with the track center
    transform: 'translateY(50%)',
  });

  return (
    <div className={trackStyles.wrapper} data-testid="ratingset-slider">
      <div className={trackStyles.track}>
        <div className={trackStyles.fill} style={{ width: `${pct}%` }} />
        <div className={knobWrapperCls}>
          <div style={{ marginBottom: 4 }} data-testid="ratingset-slider-tooltip">
            <Tooltip
              renderInline
              variant="white"
              tooltipStyle="singleText"
              tooltipType="standard"
              arrowPosition="bottom-mid"
              content={<span style={{ fontSize: 16, lineHeight: '1.5em', fontWeight: 500 }}>{tooltipIcon}</span>}
            />
          </div>
          <div className={knobDotCls} data-testid="ratingset-slider-knob" />
        </div>
        <input type="range" min={0} max={100} value={pct} onChange={handleChange}
          className={trackStyles.input} aria-label="Rating slider" data-testid="ratingset-slider-input" />
      </div>
    </div>
  );
};

// ─── Badge Label Sub-Component ───────────────────────────────────────────────

export interface BadgeLabelProps {
  label?: string;
  children?: React.ReactNode;
}

const BadgeLabel: React.FC<BadgeLabelProps> = ({ label: propLabel, children }) => {
  const { value, items, ratingStyle } = useContext(RatingSetCtx);
  const displayLabel = propLabel || deriveLabel(value, items, ratingStyle);
  if (!displayLabel && !children) return null;
  return (
    <div style={{ alignSelf: 'center' }} data-testid="ratingset-badge">
      <Badge badgeType="subtle" variant="info" size="sm">
        {children || displayLabel}
      </Badge>
    </div>
  );
};

// ─── Feedback TextArea Sub-Component ─────────────────────────────────────────

export interface FeedbackProps {
  children?: React.ReactNode;
}

const Feedback: React.FC<FeedbackProps> = ({ children }) => {
  return (
    <div data-testid="ratingset-feedback">
      {children}
    </div>
  );
};

// ─── Content Container Sub-Component ─────────────────────────────────────────

export interface ContentProps {
  children: React.ReactNode;
}

const Content: React.FC<ContentProps> = ({ children }) => {
  const { config, ratingStyle } = useContext(RatingSetCtx);
  const styles = buildContentStyles(config, ratingStyle);
  return (
    <div className={styles} data-testid="ratingset-content">
      {children}
    </div>
  );
};

// ─── Main Container — uses existing Popup component ──────────────────────────

const Container: React.FC<RatingSetProps> = ({
  ratingStyle = 'emojis',
  variant = 'websitePopup',
  title = 'Rate Us !',
  value: controlledValue,
  onChange,
  items: propItems,
  feedbackInput,
  onSubmit,
  onClose,
  badgeLabel,
  submitText = 'Submit',
  showFeedback = true,
  showBadge = true,
  maxStars = 5,
  isGhost = false,
  isOpen = true,
  popupSize = 'xs',
  renderInline = true,
  className,
  footerActions,
  children,
}) => {
  const { theme } = useTheme();
  const config = ((theme.components as any)?.ratingSet ||
    (defaultThemeConfig.components as any)?.ratingSet || {}) as RatingSetConfig;

  // Resolve items: prop > defaults based on style
  const defaultItems = getDefaultItems(ratingStyle);
  const items = propItems ?? defaultItems;

  // If stars style and no custom items, generate from maxStars
  const resolvedItems = useMemo(() => {
    if (ratingStyle === 'stars' && !propItems) {
      return Array.from({ length: maxStars }, (_, i) => ({
        icon: '⭐',
        label: DEFAULT_STAR_ITEMS[i]?.label || `${i + 1} Star${i > 0 ? 's' : ''}`,
      }));
    }
    return items;
  }, [ratingStyle, propItems, maxStars, items]);

  const [internalValue, setInternalValue] = useState(ratingStyle === 'slider' ? 50 : 0);
  const value = controlledValue ?? internalValue;
  const handleChange = useCallback((v: number) => {
    if (onChange) onChange(v);
    else setInternalValue(v);
  }, [onChange]);

  const ctx = useMemo(() => ({
    config, variant, ratingStyle, value, items: resolvedItems, onChange: handleChange,
  }), [config, variant, ratingStyle, value, resolvedItems, handleChange]);

  if (isGhost) {
    const ghostCls = buildGhostStyles(config, variant);
    return <div className={`${ghostCls} ${className || ''}`} data-testid="ratingset-ghost" />;
  }

  const derivedLabel = badgeLabel || deriveLabel(value, resolvedItems, ratingStyle);

  // Build the footer CTA
  const footerCtas = footerActions ?? (
    <Button buttonStyle="primary" variant="black" size="sm" text={submitText} onClick={onSubmit} />
  );

  return (
    <RatingSetCtx.Provider value={ctx}>
      <Popup
        isOpen={isOpen}
        onClose={onClose}
        size={popupSize}
        title={title}
        showFooter
        footerCtasRight={footerCtas}
        renderInline={renderInline}
        className={className}
      >
        {children || (
          <Content>
            {ratingStyle === 'emojis' && <EmojiRating />}
            {ratingStyle === 'stars' && <StarRating />}
            {ratingStyle === 'slider' && <SliderRating />}
            {showBadge && (ratingStyle === 'slider' || value > 0) && <BadgeLabel label={derivedLabel} />}
            {showFeedback && <Feedback>{feedbackInput}</Feedback>}
          </Content>
        )}
      </Popup>
    </RatingSetCtx.Provider>
  );
};

// ─── Compound Export ─────────────────────────────────────────────────────────

const RatingSet = Object.assign(Container, {
  Content,
  EmojiRating,
  StarRating,
  SliderRating,
  BadgeLabel,
  Feedback,
});

export default RatingSet;
export type { RatingSetConfig };
