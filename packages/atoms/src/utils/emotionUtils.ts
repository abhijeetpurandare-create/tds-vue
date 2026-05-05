import { css } from '@emotion/css';

/**
 * Utility function to create dynamic styles with Emotion CSS
 * Use this for dynamic/computed styles, while using Tailwind for static styles
 */
export const createDynamicStyles = (styles: Record<string, any>) => {
  return css(styles);
};

/**
 * Combine Tailwind classes with Emotion CSS
 * @param tailwindClasses - Space-separated Tailwind classes
 * @param dynamicStyles - Emotion CSS class string
 */
export const combineCss = (tailwindClasses: string, dynamicStyles?: string) => {
  return dynamicStyles ? `${tailwindClasses} ${dynamicStyles}` : tailwindClasses;
}; 