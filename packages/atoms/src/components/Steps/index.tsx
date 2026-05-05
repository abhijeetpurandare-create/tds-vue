import React from 'react';
import { css } from '@emotion/css';
import { useTheme } from '../ThemeProvider';
import { defaultThemeConfig } from '../../config/config';
import ThemeProvider from '../ThemeProvider';

export type StepStatus = 'wait' | 'process' | 'finish' | 'error';
export type StepsDirection = 'horizontal' | 'vertical';
export type StepsSize = 'small' | 'medium' | 'large';

export interface StepProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  status?: StepStatus;
  disabled?: boolean;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export type ConnectorVariant = 'solid' | 'dotted';

export interface StepsProps {
  current?: number;
  direction?: StepsDirection;
  size?: StepsSize;
  status?: StepStatus;
  items?: StepProps[];
  children?: React.ReactNode;
  className?: string;
  onChange?: (current: number) => void;
  // Styling props with more intuitive names
  backgroundColor?: string;
  titleSize?: string;
  titleWeight?: string;
  titleColor?: string;
  titleFont?: string;
  descriptionSize?: string;
  descriptionWeight?: string;
  descriptionColor?: string;
  descriptionFont?: string;
  iconBorderRadius?: string;
  iconSize?: string;
  primaryColor?: string;
  activeLineColor?: string;
  inactiveLineColor?: string;
  connectorVariant?: ConnectorVariant;
}

// Utility functions for calculations
const calculateIconCenter = (iconSize: string): string => {
  return `${parseInt(iconSize) / 2}px`;
};

const calculateConnectorPosition = (iconSize: string, padding: string): string => {
  const iconSizeNum = parseInt(iconSize);
  const paddingNum = parseInt(padding.split(' ')[0]);
  return `${paddingNum + iconSizeNum / 2 - 1}px`;
};

const calculateConnectorOffset = (iconSize: string): string => {
  return `calc(50% + ${parseInt(iconSize) / 2}px)`;
};

const calculateConnectorEnd = (iconSize: string): string => {
  return `calc(-50% + ${parseInt(iconSize) / 2}px)`;
};

const calculateVerticalConnectorHeight = (stepPadding: string): string => {
  return `${parseInt(stepPadding.split(' ')[0]) * 2}px`;
};

const calculateVerticalConnectorTop = (iconSize: string, stepPadding: string): string => {
  const iconSizeNum = parseInt(iconSize);
  const paddingNum = parseInt(stepPadding.split(' ')[0]);
  return `${paddingNum + iconSizeNum}px`;
};

const calculateVerticalConnectorLeft = (iconSize: string): string => {
  return `${parseInt(iconSize) / 2 - 1}px`;
};

const calculateIconFontSize = (iconSize: string): string => {
  return `${parseInt(iconSize) * 0.5}px`;
};

// Check icon component
const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"
    />
  </svg>
);

// Close icon component
const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
  </svg>
);

// Step Item Component
const StepItem: React.FC<{
  step: StepProps;
  index: number;
  current: number;
  direction: StepsDirection;
  isLast: boolean;
  onChange?: (current: number) => void;
  stepsProps: StepsProps;
}> = ({ step, index, current, direction, isLast, onChange, stepsProps }) => {
  const { theme } = useTheme();
  const stepsConfig = theme.components?.steps || defaultThemeConfig.components.steps;
  
  // Get size configuration
  const size = stepsProps.size || 'medium';
  const sizeConfig = stepsConfig.sizes[size];
  
  // Determine step status
  let stepStatus: StepStatus = step.status || 'wait';
  if (!step.status) {
    if (index < current) {
      stepStatus = 'finish';
    } else if (index === current) {
      stepStatus = stepsProps.status || 'process';
    } else {
      stepStatus = 'wait';
    }
  }

  const colorConfig = stepsConfig.colors[stepStatus];
  
  // Use primary color if provided
  const primaryColor = stepsProps.primaryColor || stepsConfig.connectors.active;
  const adjustedColorConfig = {
    ...colorConfig,
    ...(stepStatus === 'process' && stepsProps.primaryColor && {
      borderColor: primaryColor,
      iconColor: primaryColor,
    }),
    ...(stepStatus === 'finish' && stepsProps.primaryColor && {
      backgroundColor: primaryColor,
      borderColor: primaryColor,
    }),
  };

  // Icon dimensions
  const iconSize = stepsProps.iconSize || sizeConfig.iconSize;
  const iconBorderRadius = stepsProps.iconBorderRadius || sizeConfig.iconBorderRadius;

  // Step container styles
  const stepContainerStyles = css({
    display: 'flex',
    flexDirection: direction === 'vertical' ? 'row' : 'column',
    alignItems: direction === 'vertical' ? 'flex-start' : 'center',
    gap: direction === 'vertical' ? sizeConfig.stepGap : sizeConfig.stepGap,
    position: 'relative',
    flex: direction === 'horizontal' ? 1 : 'none',
    padding: sizeConfig.stepPadding,
    width: direction === 'vertical' ? '100%' : 'auto',
    ...(step.onClick && !step.disabled && { cursor: 'pointer' }),
    ...(step.disabled && { opacity: 0.6, cursor: 'not-allowed' }),
  });

  // Step icon styles
  const stepIconStyles = css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: iconSize,
    height: iconSize,
    borderRadius: iconBorderRadius,
    backgroundColor: adjustedColorConfig.backgroundColor,
    border: `2px solid ${adjustedColorConfig.borderColor}`,
    color: adjustedColorConfig.iconColor,
    fontSize: calculateIconFontSize(iconSize),
    fontWeight: '500',
    transition: 'all 0.2s ease-in-out',
    flexShrink: 0,
    zIndex: 2,
    position: 'relative',
  });

  // Step content styles
  const stepContentStyles = css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: direction === 'vertical' ? 'flex-start' : 'center',
    gap: '4px',
    textAlign: direction === 'vertical' ? 'left' : 'center',
    flex: direction === 'vertical' ? 1 : 'none',
  });

  // Step title styles
  const stepTitleStyles = css({
    fontSize: stepsProps.titleSize || sizeConfig.fontSize,
    fontWeight: stepsProps.titleWeight || '400',
    color: stepsProps.titleColor || adjustedColorConfig.textColor,
    fontFamily: stepsProps.titleFont || sizeConfig.fontFamily,
    lineHeight: sizeConfig.lineHeight,
    margin: 0,
  });

  // Step description styles
  const stepDescriptionStyles = css({
    fontSize: stepsProps.descriptionSize || `${parseInt(sizeConfig.fontSize) - 2}px`,
    fontWeight: stepsProps.descriptionWeight || '400',
    color: stepsProps.descriptionColor || '#9CA3AF',
    fontFamily: stepsProps.descriptionFont || stepsProps.titleFont || sizeConfig.fontFamily,
    lineHeight: '1.4',
    margin: 0,
  });

  // Connector styles
  const getConnectorStyles = () => {
    const connectorColor = stepStatus === 'finish' 
      ? (stepsProps.activeLineColor || primaryColor)
      : (stepsProps.inactiveLineColor || stepsConfig.connectors.default);

    const isDotted = stepsProps.connectorVariant === 'dotted';

    if (direction === 'horizontal') {
      return css({
        position: 'absolute',
        top: calculateConnectorPosition(iconSize, sizeConfig.stepPadding),
        left: calculateConnectorOffset(iconSize),
        right: calculateConnectorEnd(iconSize),
        zIndex: 1,
        ...(isDotted
          ? {
              height: 0,
              borderTop: `${sizeConfig.connectorHeight} dashed ${connectorColor}`,
            }
          : {
              height: sizeConfig.connectorHeight,
              backgroundColor: connectorColor,
            }),
      });
    } else {
      return css({
        position: 'absolute',
        left: calculateVerticalConnectorLeft(iconSize),
        top: calculateVerticalConnectorTop(iconSize, sizeConfig.stepPadding),
        height: calculateVerticalConnectorHeight(sizeConfig.stepPadding),
        zIndex: 1,
        ...(isDotted
          ? {
              width: 0,
              borderLeft: `${sizeConfig.connectorHeight} dashed ${connectorColor}`,
            }
          : {
              width: sizeConfig.connectorHeight,
              backgroundColor: connectorColor,
            }),
      });
    }
  };

  const connectorStyles = getConnectorStyles();

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!step.disabled && step.onClick) {
      step.onClick(event);
    } else if (!step.disabled && onChange) {
      onChange(index);
    }
  };

  // Render step icon content
  const renderStepIcon = () => {
    if (step.icon) {
      return step.icon;
    }

    switch (stepStatus) {
      case 'finish':
        return <CheckIcon />;
      case 'error':
        return <CloseIcon />;
      case 'process':
      case 'wait':
      default:
        return index + 1;
    }
  };

  return (
    <div className={`${stepContainerStyles} ${step.className || ''}`} onClick={handleClick}>
      <div className={stepIconStyles}>
        {renderStepIcon()}
      </div>
      
      {(step.title || step.description) && (
        <div className={stepContentStyles}>
          {step.title && <div className={stepTitleStyles}>{step.title}</div>}
          {step.description && <div className={stepDescriptionStyles}>{step.description}</div>}
        </div>
      )}

      {!isLast && <div className={connectorStyles} />}
    </div>
  );
};

// Internal Steps Component (without ThemeProvider wrapper)
const StepsInternal: React.FC<StepsProps> = ({
  current = 0,
  direction = 'horizontal',
  size = 'medium',
  status,
  items = [],
  children,
  className = '',
  onChange,
  backgroundColor,
  titleSize,
  titleWeight,
  titleColor,
  titleFont,
  descriptionSize,
  descriptionWeight,
  descriptionColor,
  descriptionFont,
  iconBorderRadius,
  iconSize,
  primaryColor,
  activeLineColor,
  inactiveLineColor,
  connectorVariant,
  ...props
}) => {
  const { theme } = useTheme();
  const stepsConfig = theme.components?.steps || defaultThemeConfig.components.steps;

  // Convert children to items if provided
  const stepItems = React.useMemo(() => {
    if (items.length > 0) {
      return items;
    }

    if (children) {
      return React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return child.props as StepProps;
        }
        return {};
      }) || [];
    }

    return [];
  }, [items, children]);

  // Get size configuration
  const sizeConfig = stepsConfig.sizes[size];

  // Wrapper styles
  const wrapperStyles = css({
    backgroundColor: backgroundColor || stepsConfig.base.backgroundColor,
    border: `1px solid ${stepsConfig.base.borderColor}`,
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    padding: sizeConfig.containerPadding,
    width: '100%',
  });

  // Steps container styles
  const stepsContainerStyles = css({
    display: 'flex',
    flexDirection: direction === 'vertical' ? 'column' : 'row',
    alignItems: direction === 'vertical' ? 'stretch' : 'stretch',
    justifyContent: direction === 'vertical' ? 'flex-start' : 'stretch',
    gap: direction === 'vertical' ? '0' : sizeConfig.containerGap,
    width: '100%',
    fontFamily: titleFont || sizeConfig.fontFamily,
    position: 'relative',
  });

  // Collect all props to pass to StepItem
  const stepsProps: StepsProps = {
    current,
    direction,
    size,
    status,
    items,
    children,
    className,
    onChange,
    backgroundColor,
    titleSize,
    titleWeight,
    titleColor,
    titleFont,
    descriptionSize,
    descriptionWeight,
    descriptionColor,
    descriptionFont,
    iconBorderRadius,
    iconSize,
    primaryColor,
    activeLineColor,
    inactiveLineColor,
    connectorVariant,
  };

  return (
    <div className={`${wrapperStyles} ${className}`} {...props}>
      <div className={stepsContainerStyles}>
        {stepItems.map((step, index) => (
          <StepItem
            key={index}
            step={step}
            index={index}
            current={current}
            direction={direction}
            isLast={index === stepItems.length - 1}
            onChange={onChange}
            stepsProps={stepsProps}
          />
        ))}
      </div>
    </div>
  );
};

// Main Steps Component with ThemeProvider wrapper
const Steps: React.FC<StepsProps> = (props) => {
  return (
    <ThemeProvider initialTheme={defaultThemeConfig}>
      <StepsInternal {...props} />
    </ThemeProvider>
  );
};

// Step sub-component for compatibility
const Step: React.FC<StepProps> = () => {
  return null; // This is just for API compatibility
};

// Attach Step to Steps
(Steps as any).Step = Step;

export { Steps };
export default Steps; 