import React from 'react';
import { useTheme } from '../ThemeProvider';
import { defaultThemeConfig } from '../../config/config';
import {
  buildCoachmarksOuterStyles,
  buildCoachmarksBodyStyles,
  buildCoachmarksImageStyles,
  buildCoachmarksBadgeRowStyles,
  buildCoachmarksTitleStyles,
  buildCoachmarksDescStyles,
  buildCoachmarksCtaRowStyles,
} from './useCoachmarksStyles';
import type {
  CoachmarksVariant,
  CoachmarksSize,
  CoachmarksArrowPosition,
  CoachmarksThemeConfig,
} from './useCoachmarksStyles';

export type { CoachmarksVariant, CoachmarksSize, CoachmarksArrowPosition };

export interface CoachmarksProps {
  /** Visual theme — 'white' (light surface) or 'black' (dark surface) */
  variant?: CoachmarksVariant;
  /** Size — 'sm' (264px) or 'lg' (300px) */
  size?: CoachmarksSize;
  /** Which edge + alignment the arrow sits on */
  arrowPosition?: CoachmarksArrowPosition;
  /** Title text */
  title?: React.ReactNode;
  /** Description / body text */
  description?: React.ReactNode;
  /** Optional image slot (shown at top of card) */
  image?: React.ReactNode;
  /** Optional badge row slot */
  badges?: React.ReactNode;
  /** Optional CTA row slot — pass Tarmac <Button> components */
  ctas?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** data-testid for the outer wrapper */
  'data-testid'?: string;
}

const Coachmarks: React.FC<CoachmarksProps> = ({
  variant = 'white',
  size = 'sm',
  arrowPosition = 'top-left',
  title,
  description,
  image,
  badges,
  ctas,
  className = '',
  style,
  'data-testid': testId = 'coachmarks-root',
}) => {
  const { theme } = useTheme();
  const config: CoachmarksThemeConfig =
    (theme.components as Record<string, CoachmarksThemeConfig>)?.coachmarks ||
    (defaultThemeConfig as Record<string, unknown>)?.coachmarks as CoachmarksThemeConfig ||
    {};

  const sp = { config, variant, size };
  const outerCls = buildCoachmarksOuterStyles(sp, arrowPosition);
  const bodyCls = buildCoachmarksBodyStyles(sp);
  const imageCls = buildCoachmarksImageStyles(sp);
  const badgeRowCls = buildCoachmarksBadgeRowStyles();
  const titleCls = buildCoachmarksTitleStyles(sp);
  const descCls = buildCoachmarksDescStyles(sp);
  const ctaRowCls = buildCoachmarksCtaRowStyles(sp);

  return (
    <div
      className={`${outerCls} ${className}`}
      style={style}
      data-testid={testId}
      role="dialog"
      aria-modal="false"
    >
      <div className={bodyCls} data-testid="coachmarks-body">
        {image && (
          <div className={imageCls} data-testid="coachmarks-image">
            {image}
          </div>
        )}
        {badges && (
          <div className={badgeRowCls} data-testid="coachmarks-badges">
            {badges}
          </div>
        )}
        {(title || description) && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {title && (
              <div className={titleCls} data-testid="coachmarks-title">
                {title}
              </div>
            )}
            {description && (
              <div className={descCls} data-testid="coachmarks-description">
                {description}
              </div>
            )}
          </div>
        )}
        {ctas && (
          <div className={ctaRowCls} data-testid="coachmarks-ctas">
            {ctas}
          </div>
        )}
      </div>
    </div>
  );
};

export default Coachmarks;
export { Coachmarks };
