import React from 'react';
import StepperHorizontal from '../StepperHorizontal';
import StepperVertical from '../StepperVertical';
import type { StepperHorizontalStep } from '../StepperHorizontal';

export type StepperOrientation = 'horizontal' | 'vertical';
export type StepperSize = 'sm' | 'md' | 'lg';
export type StepperState = 'default' | 'active' | 'disabled';
export type StepperIconStyle =
  | 'numeric' | 'icon' | 'black' | 'coal' | 'dlv_red' | 'blue' | 'green' | (string & {});

export interface StepperStep {
  title?: string;
  subtext?: string;
  state?: StepperState;
  icon?: React.ReactNode;
}

export interface StepperProps {
  steps: StepperStep[];
  orientation?: StepperOrientation;
  size?: StepperSize;
  iconStyle?: StepperIconStyle;
  showSubtext?: boolean;
  className?: string;
  'data-testid'?: string;
}

const Stepper: React.FC<StepperProps> = ({
  orientation = 'horizontal',
  ...rest
}) => {
  if (orientation === 'vertical') {
    return <StepperVertical {...rest} />;
  }
  return <StepperHorizontal {...(rest as Parameters<typeof StepperHorizontal>[0])} />;
};

export default Stepper;
