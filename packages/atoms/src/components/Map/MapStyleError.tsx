import React from 'react';
import { css } from '@emotion/css';
import { useTheme } from '../ThemeProvider';
import { defaultMapStyles } from '../../config/config';
import { toCssDimension } from './mapUtils';

const MapStyleError: React.FC<{ height: string | number; width: string | number }> = ({
  height,
  width,
}) => {
  const { theme } = useTheme();
  const mapCfg = theme.components?.map ?? defaultMapStyles;
  const err = mapCfg.error ?? defaultMapStyles.error;

  const mainContainer = css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: toCssDimension(height),
    width: toCssDimension(width),
    background: err.backgroundColor,
    fontFamily: err.fontFamily,
    borderRadius: err.borderRadius,
    border: `1px solid ${err.borderColor}`,
    boxSizing: 'border-box',
  });

  const box = css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: err.gap,
    padding: err.padding,
    textAlign: 'center',
  });

  const iconWrapper = css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: err.iconSize,
    height: err.iconSize,
    borderRadius: '50%',
    background: err.iconBg,
  });

  const titleCls = css({
    margin: 0,
    fontSize: err.titleFontSize,
    fontWeight: 600,
    color: err.titleColor,
  });

  const subtitleCls = css({
    margin: '4px 0 0',
    fontSize: err.subtitleFontSize,
    color: err.subtitleColor,
    lineHeight: 1.5,
  });

  return (
    <div className={mainContainer} data-testid="map-no-style">
      <div className={box}>
        <div className={iconWrapper} data-testid="map-error-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"
              fill={err.iconColor}
            />
          </svg>
        </div>
        <div>
          <p className={titleCls} data-testid="map-error-title">Something went wrong</p>
          <p className={subtitleCls} data-testid="map-error-subtitle">Please try again after sometime</p>
        </div>
      </div>
    </div>
  );
};

export default MapStyleError;
