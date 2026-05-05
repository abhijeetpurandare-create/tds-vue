import { css } from '@emotion/css';

export type StepperHorizontalSize = 'sm' | 'md' | 'lg';

interface ConnectorConfig {
  connectorColor?: string;
}

export interface StepperHorizontalConfig {
  connector?: ConnectorConfig;
}

export interface BuildConnectorParams {
  config: Record<string, unknown>;
  size: StepperHorizontalSize;
}

// Exact values from Figma
const ICON_SIZE: Record<StepperHorizontalSize, number> = { lg: 28, md: 24, sm: 20 };
const ICON_TEXT_GAP: Record<StepperHorizontalSize, string> = { lg: '6px', md: '4px', sm: '2px' };
// paddingY = iconSize / 2 — positions the line at the icon vertical midpoint
const CONNECTOR_PADDING_Y: Record<StepperHorizontalSize, string> = { lg: '14px', md: '12px', sm: '10px' };
const OUTER_PADDING_X = '32px'; // same for all sizes per Figma

export function buildContainerStyles(): string {
  // Figma: flex items-start px-32px
  return css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingLeft: OUTER_PADDING_X,
    paddingRight: OUTER_PADDING_X,
    position: 'relative',
  });
}

export function buildStepColumnStyles({ size }: { size: StepperHorizontalSize }): string {
  const iconSize = ICON_SIZE[size];
  return css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',   // icon left-aligned, text anchors to left edge
    gap: ICON_TEXT_GAP[size],
    flexShrink: 0,
    width: `${iconSize}px`,
    position: 'relative',
    overflow: 'visible',
  });
}

export function buildConnectorStyles({ config, size }: BuildConnectorParams): string {
  const cfg = (config as StepperHorizontalConfig)?.connector || {};
  const connectorColor = cfg.connectorColor || '#e6e6e6';
  const paddingY = CONNECTOR_PADDING_Y[size];

  // Figma: flex flex-[1_0_0] flex-col items-start min-w-px py-14px self-stretch
  // The Divider child is h-0 with inset:-0.5px — renders as a 0.5px line at the top of the padding box
  return css({
    flex: '1 0 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    minWidth: '1px',
    paddingTop: paddingY,
    paddingBottom: paddingY,
    paddingLeft: '0',
    paddingRight: '0',
    alignSelf: 'stretch',
    position: 'relative',
    // Divider: h-0 with inset -0.5px renders a 0.5px line
    '& > span': {
      display: 'block',
      height: '0',
      width: '100%',
      flexShrink: 0,
      position: 'relative',
      // The actual line via border-top (equivalent to Figma's inset:-0.5px approach)
      borderTop: `1px solid ${connectorColor}`,
    },
  });
}
