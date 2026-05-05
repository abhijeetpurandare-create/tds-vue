import React, { useState, useCallback } from 'react';
import { css } from '@emotion/css';
import { useTheme } from '../ThemeProvider';
import { defaultThemeConfig } from '../../config/config';

export type RatingSize = 'lg' | 'md' | 'sm' | (string & {});

export interface RatingProps {
  /** Rating value (0 to maxStars, supports 0.5 increments) */
  value?: number;
  /** Maximum number of stars */
  maxStars?: number;
  /** Size of the stars */
  size?: RatingSize;
  /** Whether the rating is read-only */
  readOnly?: boolean;
  /** Change handler for interactive mode */
  onChange?: (value: number) => void;
  /** Allow half-star selection */
  allowHalf?: boolean;
  /** Additional CSS class */
  className?: string;
  /** data-testid for testing */
  'data-testid'?: string;
}

const SIZE_MAP: Record<string, number> = {
  lg: 20,
  md: 16,
  sm: 14,
};

const STAR_PATH = 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z';

interface StarProps {
  fill: 'full' | 'half' | 'empty';
  pixelSize: number;
  filledColor: string;
  emptyColor: string;
  hoverColor: string;
  isHovered: boolean;
  index: number;
  interactive: boolean;
  allowHalf: boolean;
  onRate?: (value: number) => void;
  onHover?: (index: number, isLeftHalf: boolean) => void;
}

const Star: React.FC<StarProps> = ({
  fill,
  pixelSize,
  filledColor,
  emptyColor,
  hoverColor,
  isHovered,
  index,
  interactive,
  allowHalf,
  onRate,
  onHover,
}) => {
  const uid = `star-clip-${index}`;
  const activeColor = isHovered ? hoverColor : filledColor;

  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!interactive || !onRate) return;
    if (allowHalf) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      onRate(x < rect.width / 2 ? index + 0.5 : index + 1);
    } else {
      onRate(index + 1);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!interactive || !onHover) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    onHover(index, x < rect.width / 2);
  };

  return (
    <svg
      width={pixelSize}
      height={pixelSize}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      onClick={handleClick}
      onMouseMove={interactive ? handleMouseMove : undefined}
      style={{ cursor: interactive ? 'pointer' : 'default', flexShrink: 0 }}
      role="presentation"
      data-testid={`rating-star-${index}`}
    >
      {fill === 'half' && (
        <defs>
          <clipPath id={uid}>
            <rect x="0" y="0" width="12" height="24" />
          </clipPath>
        </defs>
      )}
      <path d={STAR_PATH} fill={emptyColor} />
      {fill === 'full' && <path d={STAR_PATH} fill={activeColor} />}
      {fill === 'half' && <path d={STAR_PATH} fill={activeColor} clipPath={`url(#${uid})`} />}
    </svg>
  );
};

function computeStars(value: number, maxStars: number): Array<'full' | 'half' | 'empty'> {
  const result: Array<'full' | 'half' | 'empty'> = [];
  for (let i = 0; i < maxStars; i++) {
    if (value >= i + 1) result.push('full');
    else if (value >= i + 0.5) result.push('half');
    else result.push('empty');
  }
  return result;
}

const Rating: React.FC<RatingProps> = ({
  value = 0,
  maxStars = 5,
  size = 'lg',
  readOnly = true,
  onChange,
  allowHalf = true,
  className = '',
  'data-testid': testId,
}) => {
  const { theme } = useTheme();
  const ratingConfig = theme.components?.rating || defaultThemeConfig.components?.rating;

  const filledColor = ratingConfig?.filledColor || '#f5c828';
  const emptyColor = ratingConfig?.emptyColor || '#0000000d';
  const hoverColor = ratingConfig?.hoverColor || '#e0b420';
  const pixelSize = ratingConfig?.sizes?.[size]?.starSize
    ? Number(ratingConfig.sizes[size].starSize)
    : (SIZE_MAP[size] || 20);

  const interactive = !readOnly && typeof onChange === 'function';

  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const handleStarHover = useCallback((index: number, isLeftHalf: boolean) => {
    if (allowHalf && isLeftHalf) {
      setHoverValue(index + 0.5);
    } else {
      setHoverValue(index + 1);
    }
  }, [allowHalf]);

  const handleMouseLeave = useCallback(() => {
    setHoverValue(null);
  }, []);

  const displayValue = interactive && hoverValue !== null ? hoverValue : value;
  const stars = computeStars(displayValue, maxStars);
  const isHovering = interactive && hoverValue !== null;

  const containerStyles = css({
    display: 'inline-flex',
    alignItems: 'center',
    gap: 0,
    cursor: interactive ? 'pointer' : 'default',
  });

  return (
    <div
      className={`${containerStyles} ${className}`.trim()}
      role="img"
      aria-label={`Rating: ${value} out of ${maxStars}`}
      data-testid={testId}
      onMouseLeave={interactive ? handleMouseLeave : undefined}
    >
      {stars.map((fill, i) => (
        <Star
          key={i}
          fill={fill}
          pixelSize={pixelSize}
          filledColor={filledColor}
          emptyColor={emptyColor}
          hoverColor={hoverColor}
          isHovered={isHovering && fill !== 'empty'}
          index={i}
          interactive={interactive}
          allowHalf={allowHalf}
          onRate={onChange}
          onHover={handleStarHover}
        />
      ))}
    </div>
  );
};

export default Rating;
