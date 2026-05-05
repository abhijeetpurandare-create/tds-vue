import React from 'react';
import { useTheme } from '../ThemeProvider';
import { defaultThemeConfig } from '../../config/config';
import {
  buildOuterStyles,
  buildInnerDotStyles,
  buildNumericTextStyles,
  buildIconContainerStyles,
} from './useStepperIconStyles';

export type StepperIconStyle = 'black' | 'coal' | 'dlv_red' | 'blue' | 'green' | 'numeric' | 'icon' | (string & {});
export type StepperIconVariant = 'solid' | 'outlined' | 'focused' | 'disabled' | 'ghost' | (string & {});
export type StepperIconSize = 'sm' | 'md' | 'lg';

export interface StepperIconProps {
  /** Visual style / color family of the stepper icon */
  stepperStyle?: StepperIconStyle;
  /** State variant */
  variant?: StepperIconVariant;
  /** Size */
  size?: StepperIconSize;
  /** Step number shown for numeric style */
  stepNumber?: number;
  /** Custom icon node for icon style */
  icon?: React.ReactNode;
  className?: string;
  'data-testid'?: string;
}

const StepperIcon: React.FC<StepperIconProps> = ({
  stepperStyle = 'numeric',
  variant = 'solid',
  size = 'lg',
  stepNumber = 1,
  icon,
  className = '',
  'data-testid': testId = 'stepper-icon',
}) => {
  const { theme } = useTheme();
  const config = (theme.components as Record<string, unknown>)?.stepperIcon_tarmac as Parameters<typeof buildOuterStyles>[0]['config']
    || (defaultThemeConfig.components as Record<string, unknown>)?.stepperIcon_tarmac as Parameters<typeof buildOuterStyles>[0]['config']
    || {};

  const params = { config, stepperStyle, variant, size };
  const outerStyles = buildOuterStyles(params);
  const isColorStyle = !['numeric', 'icon'].includes(stepperStyle);
  const isNumeric = stepperStyle === 'numeric';
  const isIcon = stepperStyle === 'icon';
  const isGhost = variant === 'ghost';

  return (
    <div
      className={`${outerStyles} ${className}`.trim()}
      data-testid={testId}
      data-stepper-style={stepperStyle}
      data-variant={variant}
      data-size={size}
    >
      {!isGhost && isColorStyle && (
        <div className={buildInnerDotStyles(params)} data-testid="stepper-icon-dot" />
      )}
      {!isGhost && isNumeric && (
        <span className={buildNumericTextStyles(params)} data-testid="stepper-icon-number">
          {stepNumber}
        </span>
      )}
      {!isGhost && isIcon && (
        <span className={buildIconContainerStyles(params)} data-testid="stepper-icon-icon">
          {icon}
        </span>
      )}
    </div>
  );
};

export default StepperIcon;
