import React from 'react';
import { useTheme } from '../ThemeProvider';
import { defaultThemeConfig } from '../../config/config';
import StepperIcon from '../StepperIcon';
import {
  buildContainerStyles,
  buildStepColumnStyles,
  buildConnectorStyles,
} from './useStepperHorizontalStyles';
import { buildTitleStyles, buildSubtextStyles, buildTextBlockStyles } from './useStepperHorizontalTextStyles';

export type StepperHorizontalSize = 'sm' | 'md' | 'lg';
export type StepperHorizontalState = 'default' | 'active' | 'disabled';
export type StepperHorizontalIconStyle =
  | 'numeric'
  | 'icon'
  | 'black'
  | 'coal'
  | 'dlv_red'
  | 'blue'
  | 'green'
  | (string & {});

export interface StepperHorizontalStep {
  title?: string;
  subtext?: string;
  state?: StepperHorizontalState;
  icon?: React.ReactNode;
}

export interface StepperHorizontalProps {
  steps: StepperHorizontalStep[];
  size?: StepperHorizontalSize;
  iconStyle?: StepperHorizontalIconStyle;
  showSubtext?: boolean;
  className?: string;
  'data-testid'?: string;
}

const STATE_TO_ICON_VARIANT: Record<StepperHorizontalState, 'solid' | 'outlined' | 'disabled'> = {
  default: 'solid',
  active: 'outlined',
  disabled: 'disabled',
};

const StepperHorizontal: React.FC<StepperHorizontalProps> = ({
  steps,
  size = 'lg',
  iconStyle = 'numeric',
  showSubtext = false,
  className = '',
  'data-testid': testId = 'stepper-horizontal',
}) => {
  const { theme } = useTheme();
  const config =
    ((theme.components as Record<string, unknown>)?.stepperHorizontal_tarmac as Record<string, unknown>) ||
    ((defaultThemeConfig.components as Record<string, unknown>)?.stepperHorizontal_tarmac as Record<string, unknown>) ||
    {};

  const stepperTextConfig =
    ((theme.components as Record<string, unknown>)?.stepperText_tarmac as Record<string, unknown>) ||
    ((defaultThemeConfig.components as Record<string, unknown>)?.stepperText_tarmac as Record<string, unknown>) ||
    {};

  const containerStyles = buildContainerStyles();
  const stepColumnStyles = buildStepColumnStyles({ size });
  const connectorStyles = buildConnectorStyles({ config, size });
  const textBlockStyles = buildTextBlockStyles({ size });

  return (
    <div
      className={`${containerStyles} ${className}`.trim()}
      data-testid={testId}
      data-size={size}
    >
      {steps.map((step, idx) => {
        const state = step.state || 'default';
        const isLast = idx === steps.length - 1;

        return (
          <React.Fragment key={idx}>
            {/*
              Step column: w=iconSize, flex-col, items-center, overflow:visible
              Icon is in normal flow; text block is position:absolute below icon,
              centered via left:50% translateX(-50%) — overflows symmetrically
            */}
            <div
              className={stepColumnStyles}
              data-testid={`stepper-horizontal-step-${idx}`}
            >
              <StepperIcon
                stepperStyle={iconStyle}
                variant={STATE_TO_ICON_VARIANT[state]}
                size={size}
                stepNumber={idx + 1}
                icon={step.icon}
              />
              <div className={textBlockStyles}>
                <span className={buildTitleStyles({ config: stepperTextConfig, size, state })}>
                  {step.title || `Step ${idx + 1}`}
                </span>
                {showSubtext && step.subtext && (
                  <span className={buildSubtextStyles({ config: stepperTextConfig, size, state })}>
                    {step.subtext}
                  </span>
                )}
              </div>
            </div>
            {/*
              Connector: flex:1 0 0, self-stretch, py=iconSize/2
              The <span> is h-0 with border-top — renders as a line at the top of the padding box,
              which is exactly at the icon's vertical midpoint
            */}
            {!isLast && (
              <div
                className={connectorStyles}
                data-testid={`stepper-horizontal-connector-${idx}`}
                aria-hidden="true"
              >
                <span />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default StepperHorizontal;
