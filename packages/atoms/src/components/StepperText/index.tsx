import React from 'react';
import { useTheme } from '../ThemeProvider';
import { defaultThemeConfig } from '../../config/config';
import {
  buildContainerStyles,
  buildTextBlockStyles,
  buildTitleStyles,
  buildSubtextStyles,
} from './useStepperTextStyles';
import StepperIcon from '../StepperIcon';

export type StepperTextSize = 'sm' | 'md' | 'lg';
export type StepperTextPosition = 'horizontal' | 'vertical';
export type StepperTextState = 'default' | 'active' | 'disabled';

export interface StepperTextProps {
  /** Step title */
  title?: string;
  /** Optional subtext below the title */
  subtext?: string;
  /** Show subtext (boolean toggle matching Figma) */
  showSubtext?: boolean;
  /** Size */
  size?: StepperTextSize;
  /** Layout direction */
  position?: StepperTextPosition;
  /** Step state */
  state?: StepperTextState;
  /** Step number shown in the icon (numeric style) */
  stepNumber?: number;
  /** Custom icon node for icon-style stepper */
  icon?: React.ReactNode;
  /** Icon style passed to StepperIcon */
  iconStyle?: string;
  className?: string;
  'data-testid'?: string;
}

/** Maps StepperText state → StepperIcon variant */
const STATE_TO_ICON_VARIANT: Record<StepperTextState, string> = {
  default: 'solid',
  active: 'outlined',
  disabled: 'disabled',
};

/** Maps StepperText size → StepperIcon size */
const SIZE_MAP: Record<StepperTextSize, 'sm' | 'md' | 'lg'> = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
};

const StepperText: React.FC<StepperTextProps> = ({
  title = 'Title here',
  subtext = 'Subtext here',
  showSubtext = false,
  size = 'lg',
  position = 'horizontal',
  state = 'default',
  stepNumber = 1,
  icon,
  iconStyle = 'black',
  className = '',
  'data-testid': testId = 'stepper-text',
}) => {
  const { theme } = useTheme();
  const config = (theme.components as Record<string, unknown>)?.stepperText_tarmac as Parameters<typeof buildContainerStyles>[0]['config']
    || (defaultThemeConfig.components as Record<string, unknown>)?.stepperText_tarmac as Parameters<typeof buildContainerStyles>[0]['config']
    || {};

  const params = { config, size, position, state };

  return (
    <div
      className={`${buildContainerStyles(params)} ${className}`.trim()}
      data-testid={testId}
      data-size={size}
      data-position={position}
      data-state={state}
    >
      <StepperIcon
        stepperStyle={iconStyle}
        variant={STATE_TO_ICON_VARIANT[state] as 'solid' | 'outlined' | 'disabled'}
        size={SIZE_MAP[size]}
        stepNumber={stepNumber}
        icon={icon}
        data-testid="stepper-text-icon"
      />
      <div className={buildTextBlockStyles(params)} data-testid="stepper-text-block">
        <span className={buildTitleStyles(params)} data-testid="stepper-text-title">
          {title}
        </span>
        {showSubtext && subtext && (
          <span className={buildSubtextStyles(params)} data-testid="stepper-text-subtext">
            {subtext}
          </span>
        )}
      </div>
    </div>
  );
};

export default StepperText;
