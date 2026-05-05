import { css } from '@emotion/css';

export type StepperVerticalSize = 'sm' | 'md' | 'lg';

interface ConnectorConfig {
  connectorColor?: string;
}

export interface StepperVerticalConfig {
  connector?: ConnectorConfig;
}

export interface BuildParams {
  config: Record<string, unknown>;
  size: StepperVerticalSize;
}

// Icon outer sizes per size
const ICON_SIZE: Record<StepperVerticalSize, number> = { lg: 28, md: 24, sm: 20 };

// Gap between steps (connector visible height)
const STEP_GAP: Record<StepperVerticalSize, string> = {
  lg: '30px',
  md: '24px',
  sm: '20px',
};

export function buildContainerStyles({ config, size }: BuildParams): string {
  const cfg = (config as StepperVerticalConfig)?.connector || {};
  const connectorColor = cfg.connectorColor || '#e6e6e6';
  const iconSize = ICON_SIZE[size];
  const gap = STEP_GAP[size];

  // The container is position:relative.
  // A ::before pseudo draws a single continuous vertical line from top to bottom,
  // centered under the icon column (left = iconSize/2).
  // Steps render on top with gap between them.
  // The icon's background (#f7f7f7) naturally masks the line behind it.
  return css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap,
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: `${iconSize}px`,           // start below first icon
      bottom: `${iconSize}px`,        // end above last icon
      left: `${iconSize / 2}px`,      // centered under icon
      width: '1px',
      backgroundColor: connectorColor,
      transform: 'translateX(-50%)',
      zIndex: 0,
    },
  });
}

export function buildStepStyles(): string {
  return css({
    position: 'relative',
    zIndex: 1,  // steps sit above the line
  });
}
