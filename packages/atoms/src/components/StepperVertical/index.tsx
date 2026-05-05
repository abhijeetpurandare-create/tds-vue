import React from 'react';
import { useTheme } from '../ThemeProvider';
import { defaultThemeConfig } from '../../config/config';
import StepperText from '../StepperText';
import { buildContainerStyles, buildStepStyles } from './useStepperVerticalStyles';

export type StepperVerticalSize = 'sm' | 'md' | 'lg';
export type StepperVerticalState = 'default' | 'active' | 'disabled';
export type StepperVerticalIconStyle =
  | 'numeric'
  | 'icon'
  | 'black'
  | 'coal'
  | 'dlv_red'
  | 'blue'
  | 'green'
  | (string & {});

export interface StepperVerticalStep {
  title?: string;
  subtext?: string;
  state?: StepperVerticalState;
  icon?: React.ReactNode;
}

export interface StepperVerticalProps {
  steps: StepperVerticalStep[];
  size?: StepperVerticalSize;
  iconStyle?: StepperVerticalIconStyle;
  showSubtext?: boolean;
  className?: string;
  'data-testid'?: string;
}

const StepperVertical: React.FC<StepperVerticalProps> = ({
  steps,
  size = 'lg',
  iconStyle = 'numeric',
  showSubtext = false,
  className = '',
  'data-testid': testId = 'stepper-vertical',
}) => {
  const { theme } = useTheme();
  const config =
    ((theme.components as Record<string, unknown>)?.stepperVertical_tarmac as Record<string, unknown>) ||
    ((defaultThemeConfig.components as Record<string, unknown>)?.stepperVertical_tarmac as Record<string, unknown>) ||
    {};

  const containerStyles = buildContainerStyles({ config, size });
  const stepStyles = buildStepStyles();

  return (
    <div
      className={`${containerStyles} ${className}`.trim()}
      data-testid={testId}
      data-size={size}
    >
      {steps.map((step, idx) => (
        <div
          key={idx}
          className={stepStyles}
          data-testid={`stepper-vertical-step-${idx}`}
        >
          <StepperText
            title={step.title || `Step ${idx + 1}`}
            subtext={step.subtext}
            showSubtext={showSubtext && !!step.subtext}
            size={size}
            position="horizontal"
            state={step.state || 'default'}
            stepNumber={idx + 1}
            iconStyle={iconStyle}
            icon={step.icon}
          />
        </div>
      ))}
    </div>
  );
};

export default StepperVertical;
