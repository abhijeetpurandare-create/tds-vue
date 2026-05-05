import { css } from '@emotion/css';
import { useTheme } from '../components/ThemeProvider';
import { defaultThemeConfig } from '../config/config';

/**
 * Get component config from theme or default config
 * @param componentName - Name of the component in the theme
 * @returns Component configuration
 */
export const useComponentConfig = (componentName: string) => {
  const { theme } = useTheme();
  return theme.components?.[componentName] || defaultThemeConfig.components[componentName];
};

/**
 * Creates dynamic color styles based on theme config
 * @param componentName - Component name in theme config
 * @param variant - Component variant
 * @returns Dynamic styles as Emotion CSS class
 */
export const useDynamicColors = (componentName: string, variant: string) => {
  const { theme } = useTheme();
  const config = useComponentConfig(componentName);

  // Create dynamic color styles using Emotion
  const colorStyles = css({
    // Use config.variants[variant] for variant-specific colors
    // Fallback to appropriate default if not available
    backgroundColor: config.variants[variant]?.backgroundColor || config.base.backgroundColor,
    color: config.variants[variant]?.color || config.base.color,
    borderColor: config.variants[variant]?.borderColor || config.base.borderColor,

    // Hover state
    '&:hover:not(:disabled):not(.disabled)': {
      backgroundColor: config.variants[variant]?.hoverBackgroundColor || config.variants[variant]?.backgroundColor,
      color: config.variants[variant]?.hoverColor || config.variants[variant]?.color,
      borderColor: config.variants[variant]?.hoverBorderColor || config.variants[variant]?.borderColor,
    },

    // Focus state
    '&:focus-visible': {
      boxShadow: `0 0 0 3px ${config.variants[variant]?.focusRingColor || config.base.focusRingColor || 'rgba(0, 0, 0, 0.1)'}`,
      outline: 'none',
    },

    // Disabled state
    '&:disabled, &.disabled': {
      opacity: config.base.disabledOpacity || 0.6,
      backgroundColor: config.base.disabledBackgroundColor,
      color: config.base.disabledColor,
      borderColor: config.base.disabledBorderColor,
    },
  });

  return colorStyles;
};

/**
 * Get Tailwind classes for a component based on its config
 * @param componentName - Component name in theme config
 * @param size - Component size
 * @param additionalProps - Additional properties to consider
 * @returns String of Tailwind classes
 */
export const getTailwindClasses = (
  componentName: string,
  size: string,
  additionalProps: Record<string, any> = {}
) => {
  const config = useComponentConfig(componentName);
  
  // Get base classes from config
  const baseClasses = config.base.className || '';
  
  // Get size classes from config
  const sizeClasses = config.sizes?.[size]?.className || '';
  
  // Process additional classes based on props
  let additionalClasses = '';
  
  // Example: Handle fullWidth property
  if (additionalProps.isFullWidth) {
    additionalClasses += ' w-full';
  }
  
  // Example: Handle rounded property
  if (additionalProps.isRounded) {
    additionalClasses += ` ${config.base.radius?.rounded || 'rounded-full'}`;
  } else {
    additionalClasses += ` ${config.base.radius?.default || 'rounded-md'}`;
  }
  
  return `${baseClasses} ${sizeClasses} ${additionalClasses}`.trim();
};

/**
 * Combines Tailwind classes with Emotion dynamic styles
 * @param tailwindClasses - String of Tailwind classes 
 * @param dynamicStyles - Emotion CSS classes
 * @param additionalClasses - Any additional classes
 * @returns Combined class string
 */
export const combineStyles = (
  tailwindClasses: string,
  dynamicStyles: string,
  additionalClasses: string = ''
) => {
  return `${tailwindClasses} ${dynamicStyles} ${additionalClasses}`.trim();
}; 