import { ThemeConfig, DropdownConfig, AudioPlayerConfig } from '../types/types'

/**
 * This file contains default configurations for all components in the Orca UI system.
 * These defaults are used when no theme is passed or when specific configuration is missing.
 * Each component has its own configuration object that can be extended as needed.
 */

/**
 * Check if value is an object
 */
function isObject(item: any): item is Record<string, any> {
  return item && typeof item === 'object' && !Array.isArray(item)
}

/**
 * Deep merge two objects together
 * @param target The target object to merge into
 * @param source The source object to merge from
 * @returns Merged object
 */
export function deepMerge<T extends Record<string, any>>(
  target: T,
  source: Partial<T>
): T {
  const output = { ...target } as T

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      const sourceValue = source[key as keyof typeof source]
      if (isObject(sourceValue)) {
        if (!(key in target)) {
          Object.assign(output, { [key]: sourceValue })
        } else {
          const targetValue = target[key as keyof T]
          if (targetValue !== undefined && isObject(targetValue)) {
            output[key as keyof T] = deepMerge(
              targetValue,
              sourceValue as any
            ) as any
          } else {
            Object.assign(output, { [key]: sourceValue })
          }
        }
      } else if (sourceValue !== undefined) {
        Object.assign(output, { [key]: sourceValue })
      }
    })
  }

  return output
}

// Default colors to be used across components
export const defaultColors = {
  primary: {
    main: '#3B82F6',
    light: '#93C5FD',
    dark: '#1D4ED8',
    contrast: '#FFFFFF',
  },
  secondary: {
    main: '#6B7280',
    light: '#D1D5DB',
    dark: '#374151',
    contrast: '#FFFFFF',
  },
  success: {
    main: '#10B981',
    light: '#A7F3D0',
    dark: '#047857',
    contrast: '#FFFFFF',
  },
  error: {
    main: '#EF4444',
    light: '#FCA5A5',
    dark: '#B91C1C',
    contrast: '#FFFFFF',
  },
  warning: {
    main: '#F59E0B',
    light: '#FCD34D',
    dark: '#B45309',
    contrast: '#000000',
  },
  info: {
    main: '#3B82F6',
    light: '#93C5FD',
    dark: '#1D4ED8',
    contrast: '#FFFFFF',
  },
}

// Default button component configuration
export const defaultButtonStyles = {
  base: {
    fontFamily: 'sans-serif',
    fontWeight: '500',
    transition: 'all 0.15s ease-in-out',
    focus: {
      outline: 'none',
      ring: '0 0 0 3px rgba(59, 130, 246, 0.5)',
    },
    radius: {
      default: '0.375rem',
      rounded: '9999px',
    },
  },
  variants: {
    primary: {
      backgroundColor: defaultColors.primary.main,
      textColor: defaultColors.primary.contrast,
      borderColor: defaultColors.primary.main,
      hoverColor: defaultColors.primary.dark,
      focusRingColor: defaultColors.primary.main,
    },
    secondary: {
      backgroundColor: defaultColors.secondary.main,
      textColor: defaultColors.secondary.contrast,
      borderColor: defaultColors.secondary.main,
      hoverColor: defaultColors.secondary.dark,
      focusRingColor: defaultColors.secondary.main,
    },
    outline: {
      backgroundColor: 'transparent',
      textColor: defaultColors.primary.main,
      borderColor: defaultColors.primary.main,
      hoverColor: defaultColors.primary.main,
      hoverTextColor: defaultColors.primary.contrast,
      focusRingColor: defaultColors.primary.main,
    },
  },
  sizes: {
    sm: {
      padding: '0.375rem 0.75rem',
      fontSize: '0.875rem',
      iconSize: '1rem',
      gap: '0.375rem',
    },
    md: {
      padding: '0.5rem 1rem',
      fontSize: '1rem',
      iconSize: '1.25rem',
      gap: '0.5rem',
    },
    lg: {
      padding: '0.75rem 1.5rem',
      fontSize: '1.125rem',
      iconSize: '1.5rem',
      gap: '0.625rem',
    },
  },
  states: {
    disabled: {
      backgroundColor: '#E0E0E0',
      textColor: '#9E9E9E',
      cursor: 'not-allowed',
    },
    loading: {
      opacity: '0.7',
      cursor: 'wait',
    },
  },
}

// Default card component configuration
export const defaultCardStyles = {
  base: {
    padding: '1rem',
    backgroundColor: '#FFFFFF',
    shadow:
      '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    border: '1px solid #E5E7EB',
    radius: {
      default: '0.5rem',
      sharp: '0',
      rounded: '0.75rem',
    },
  },
  variants: {
    elevated: {
      shadow:
        '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      border: 'none',
    },
    outlined: {
      shadow: 'none',
      border: '1px solid #E5E7EB',
    },
    flat: {
      shadow: 'none',
      border: 'none',
      backgroundColor: '#F9FAFB',
    },
  },
}

// Default modal component configuration
export const defaultModalStyles = {
  base: {
    fontFamily: 'font-sans',
    shadow: 'shadow-xl',
    radius: 'rounded-lg',
    transition: 'transition-all duration-300',
    zIndex: 50,
  },
  variants: {
    default: {
      backgroundColor: 'bg-white',
      textColor: 'text-gray-900',
      borderColor: 'border-gray-200',
    },
    info: {
      backgroundColor: 'bg-blue-50',
      textColor: 'text-blue-900',
      borderColor: 'border-blue-200',
    },
    success: {
      backgroundColor: 'bg-green-50',
      textColor: 'text-green-900',
      borderColor: 'border-green-200',
    },
    warning: {
      backgroundColor: 'bg-yellow-50',
      textColor: 'text-yellow-900',
      borderColor: 'border-yellow-200',
    },
    error: {
      backgroundColor: 'bg-red-50',
      textColor: 'text-red-900',
      borderColor: 'border-red-200',
    },
  },
  sizes: {
    sm: {
      width: 'max-w-md',
      padding: 'p-4',
    },
    md: {
      width: 'max-w-lg',
      padding: 'p-6',
    },
    lg: {
      width: 'max-w-2xl',
      padding: 'p-8',
    },
  },
  states: {
    loading: {
      opacity: 'opacity-50',
      cursor: 'cursor-wait',
    },
    disabled: {
      opacity: 'opacity-50',
      cursor: 'cursor-not-allowed',
    },
  },
  mask: {
    backgroundColor: 'bg-black bg-opacity-50',
    blur: 'backdrop-blur-sm',
  },
  header: {
    fontSize: 'text-lg font-semibold',
    padding: 'pb-4',
    borderBottom: 'border-b',
  },
  body: {
    padding: 'py-4',
  },
  footer: {
    padding: 'pt-4',
    borderTop: 'border-t',
    gap: 'gap-3',
  },
  closeButton: {
    padding: 'p-2',
    hover: 'hover:bg-gray-100',
    radius: 'rounded-full',
    transition: 'transition-colors',
  },
}

// Default spinner component configuration
export const defaultSpinnerStyles = {
  sizes: {
    sm: {
      size: 'h-4 w-4',
      strokeWidth: 3,
    },
    md: {
      size: 'h-6 w-6',
      strokeWidth: 4,
    },
    lg: {
      size: 'h-8 w-8',
      strokeWidth: 4,
    },
  },
  variants: {
    default: {
      color: '#4B5563', // gray-600
      trackColor: '#E5E7EB', // gray-200
    },
    primary: {
      color: '#2563EB', // blue-600
      trackColor: '#DBEAFE', // blue-100
    },
    secondary: {
      color: '#4B5563', // gray-600
      trackColor: '#E5E7EB', // gray-200
    },
    success: {
      color: '#059669', // green-600
      trackColor: '#D1FAE5', // green-100
    },
    error: {
      color: '#DC2626', // red-600
      trackColor: '#FEE2E2', // red-100
    },
    warning: {
      color: '#D97706', // yellow-600
      trackColor: '#FEF3C7', // yellow-100
    },
    info: {
      color: '#2563EB', // blue-600
      trackColor: '#DBEAFE', // blue-100
    },
  },
}

// Default pill component configuration
export const defaultPillStyles = {
  borderRadius: '9999px',
  sizes: {
    sm: {
      padding: '0.25rem 0.5rem',
      fontSize: '0.75rem',
    },
    md: {
      padding: '0.375rem 0.75rem',
      fontSize: '0.875rem',
    },
    lg: {
      padding: '0.5rem 1rem',
      fontSize: '1rem',
    },
  },
  variants: {
    default: {
      backgroundColor: '#E5E7EB', // gray-200
      textColor: '#374151', // gray-700
      borderColor: 'transparent',
      closeIconColor: '#6B7280', // gray-500
    },
    success: {
      backgroundColor: '#D1FAE5', // green-100
      textColor: '#065F46', // green-800
      borderColor: '#34D399', // green-400
      closeIconColor: '#065F46', // green-800
    },
    danger: {
      backgroundColor: '#FEE2E2', // red-100
      textColor: '#991B1B', // red-800
      borderColor: '#F87171', // red-400
      closeIconColor: '#991B1B', // red-800
    },
    warning: {
      backgroundColor: '#FEF3C7', // yellow-100
      textColor: '#92400E', // yellow-800
      borderColor: '#FBBF24', // yellow-400
      closeIconColor: '#92400E', // yellow-800
    },
    info: {
      backgroundColor: '#DBEAFE', // blue-100
      textColor: '#1E40AF', // blue-800
      borderColor: '#60A5FA', // blue-400
      closeIconColor: '#1E40AF', // blue-800
    },
  },
}

// Default Tarmac Pill component configuration (pill shape = borderRadius 999px)
export const defaultPillTarmacStyles = {
  base: {
    fontFamily: 'sans-serif',
    fontWeight: '500',
    borderRadius: '999px',
  },
  types: {
    solid: {
      black: { backgroundColor: '#2b2b2b', textColor: '#ffffff' },
      white: { backgroundColor: '#ffffff', textColor: '#2b2b2b', borderColor: '#e0e0e0' },
      coal: { backgroundColor: '#4a4a4a', textColor: '#ffffff' },
      blue: { backgroundColor: '#3b82f6', textColor: '#ffffff' },
      success: { backgroundColor: '#10b981', textColor: '#ffffff' },
      error: { backgroundColor: '#ef4444', textColor: '#ffffff' },
      warning: { backgroundColor: '#f59e0b', textColor: '#7b6414' },
      legacy_blue: { backgroundColor: '#5b80f7', textColor: '#ffffff' },
    },
    subtle: {
      black: { backgroundColor: '#e6e6e6', textColor: '#2b2b2b' },
      white: { backgroundColor: '#3a3a3a', textColor: '#ffffff' },
      coal: { backgroundColor: '#d9d9d9', textColor: '#4a4a4a' },
      blue: { backgroundColor: '#dbeafe', textColor: '#1d4ed8' },
      success: { backgroundColor: '#d1fae5', textColor: '#047857' },
      error: { backgroundColor: '#fee2e2', textColor: '#b91c1c' },
      warning: { backgroundColor: '#fef3c7', textColor: '#7b6414' },
      legacy_blue: { backgroundColor: '#e0e7ff', textColor: '#3b5bdb' },
    },
    outlined: {
      black: { backgroundColor: 'transparent', textColor: '#2b2b2b', borderColor: '#2b2b2b' },
      white: { backgroundColor: 'transparent', textColor: '#ffffff', borderColor: '#e0e0e0' },
      coal: { backgroundColor: 'transparent', textColor: '#4a4a4a', borderColor: '#999999' },
      blue: { backgroundColor: 'transparent', textColor: '#1d4ed8', borderColor: '#3b82f6' },
      success: { backgroundColor: 'transparent', textColor: '#047857', borderColor: '#10b981' },
      error: { backgroundColor: 'transparent', textColor: '#b91c1c', borderColor: '#ef4444' },
      warning: { backgroundColor: 'transparent', textColor: '#7b6414', borderColor: '#f59e0b' },
      legacy_blue: { backgroundColor: 'transparent', textColor: '#3b5bdb', borderColor: '#5b80f7' },
    },
  },
  variants: {
    black: { backgroundColor: '#2b2b2b', textColor: '#ffffff' },
    white: { backgroundColor: '#ffffff', textColor: '#2b2b2b', borderColor: '#e0e0e0' },
    coal: { backgroundColor: '#4a4a4a', textColor: '#ffffff' },
    blue: { backgroundColor: '#3b82f6', textColor: '#ffffff' },
    success: { backgroundColor: '#10b981', textColor: '#ffffff' },
    error: { backgroundColor: '#ef4444', textColor: '#ffffff' },
    warning: { backgroundColor: '#f59e0b', textColor: '#7b6414' },
    legacy_blue: { backgroundColor: '#5b80f7', textColor: '#ffffff' },
  },
  sizes: {
    sm: { padding: '4px', fontSize: '10px', lineHeight: '12px', iconSize: '12px', gap: '2px' },
    md: { padding: '6px', fontSize: '10px', lineHeight: '12px', iconSize: '12px', gap: '2px' },
    lg: { padding: '6px', fontSize: '12px', lineHeight: '16px', iconSize: '16px', gap: '2px' },
  },
  states: {
    disabled: { backgroundColor: '#dedede', textColor: '#cdcbcb', borderColor: 'transparent' },
    disabledOutlined: { backgroundColor: 'transparent', textColor: '#cdcbcb', borderColor: '#ededed' },
    ghost: { backgroundColor: '#dedede', textColor: 'transparent', borderColor: 'transparent' },
  },
};

// Default InputTag component configuration
export const defaultInputTagStyles = {
  container: {
    borderColor: '#E0E3EB',
    borderRadius: '0.5rem',
    backgroundColor: '#FFFFFF',
    focusBorderColor: '#5B80F7',
    errorBorderColor: '#FA3A2E',
    disabledBackgroundColor: '#E0E3EB',
    disabledBorderColor: '#E0E3EB',
    minHeight: '160px',
    maxHeight: '240px',
    padding: '0.5rem',
    gap: '0.25rem',
  },
  tag: {
    borderRadius: '9999px',
    padding: '2px 8px',
    fontSize: '0.75rem',
    fontWeight: 500,
    backgroundColor: '#F9F9FB',
    textColor: '#3D445C',
    errorBackgroundColor: '#FEF2F2',
    errorTextColor: '#DC2626',
    closeIconColor: '#525B7A',
    errorCloseIconColor: '#DC2626',
  },
  input: {
    fontSize: '0.875rem',
    minWidth: '120px',
    minHeight: '28px',
    color: '#3D445C',
    placeholderColor: '#A3AAC2',
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: 500,
    color: '#3D445C',
    marginBottom: '0.25rem',
  },
  helperText: {
    fontSize: '0.75rem',
    errorColor: '#FA3A2E',
  },
  clearButton: {
    fontSize: '0.75rem',
    color: '#5B80F7',
  },
}

export const defaultInputStyles = {
  base: {
    fontFamily: 'inherit',
    fontWeight: '400',
    transition: 'all 0.2s ease-in-out',
    focus: {
      outline: '2px solid transparent',
      ring: '0 0 0 2px rgba(59, 130, 246, 0.5)', // blue-500 ring
    },
    radius: {
      default: '0.5rem',
      sharp: '0',
      rounded: '9999px',
    },
  },
  label: {
    color: '#1E1A1A',
    fontWeight: '500',
    fontSize: '0.875rem',
  },
  helperText: {
    fontWeight: '400',
    fontSize: '0.75rem',
  },
  addOnBefore: {
    backgroundColor: '#FAF7F7',
    padding: '8px 12px',
    borderTopLeftRadius: '8px',
    borderBottomLeftRadius: '8px',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizes: {
    sm: {
      padding: '0.375rem 0.5rem', // py-1.5 px-2
      fontSize: '0.875rem', // text-sm
      height: 'auto',
    },
    md: {
      padding: '0.5rem 0.75rem', // py-2 px-3
      fontSize: '1rem', // text-base
      height: 'auto',
    },
    lg: {
      padding: '0.75rem 1rem', // py-3 px-4
      fontSize: '1.125rem', // text-lg
      height: 'auto',
    },
  },
  variants: {
    filled: {
      backgroundColor: '#FFFFFF',
      borderColor: '#E5E3E3',
      textColor: '#1E1A1A',
      placeholderColor: '#9CA3AF',
      focusBorderColor: 'black',
    },
    outlined: {
      backgroundColor: 'transparent',
      borderColor: '#E5E3E3',
      textColor: '#1E1A1A',
      placeholderColor: '#9CA3AF',
      focusBorderColor: 'black',
    },
  },
  states: {
    default: {
      backgroundColor: '#FFFFFF',
      borderColor: '#E5E3E3',
      textColor: '#1E1A1A',
      shadow:
        '0px 1px 3px 0px rgba(0, 0, 0, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)',
    },
    error: {
      backgroundColor: '#FFFFFF',
      borderColor: '#ED4136',
      textColor: '#991B1B',
      shadow:
        '0px 1px 3px 0px rgba(0, 0, 0, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)',
    },
    success: {
      backgroundColor: '#FFFFFF',
      borderColor: '#A7F3D0',
      textColor: '#065F46',
      shadow:
        '0px 1px 3px 0px rgba(0, 0, 0, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)',
    },
    warning: {
      backgroundColor: '#FFFFFF',
      borderColor: '#FDECCE',
      textColor: '#92400E',
      shadow:
        '0px 0px 0px 4px rgba(245, 158, 11, 0.10), 0px 1px 3px 0px rgba(245, 158, 11, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)',
    },
    disabled: {
      opacity: '0.5',
      cursor: 'not-allowed',
      backgroundColor: '#F9FAFB',
      shadow:
        '0px 1px 3px 0px rgba(0, 0, 0, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)',
    },
  },
}

// Default radio component configuration
export const defaultRadioStyles = {
  base: {
    fontFamily: 'inherit',
    fontWeight: '400',
    transition: 'all 0.2s ease-in-out',
    focus: {
      outline: 'none',
      ring: '0 0 0 3px rgba(0, 0, 0, 0.2)',
    },
    wrapper: {
      className: 'flex items-center cursor-pointer select-none relative',
    },
    input: {
      style: {
        position: 'absolute' as const,
        opacity: 0,
        margin: 0,
        padding: 0,
      },
    },
    icon: {
      size: '1rem',
      borderColor: '#D1D5DB',
      backgroundColor: 'transparent',
      hoverBorderColor: '#9CA3AF',
      focusRingColor: 'rgba(0, 0, 0, 0.2)',
    },
    label: {
      color: '#374151',
      style: {
        userSelect: 'none' as const,
      },
    },
  },
  sizes: {
    sm: {
      wrapper: {
        className: 'text-sm gap-2',
      },
      icon: {
        size: '0.875rem',
      },
      label: {
        fontSize: '0.875rem',
      },
    },
    md: {
      wrapper: {
        className: 'text-base gap-2',
      },
      icon: {
        size: '1rem',
      },
      label: {
        fontSize: '1rem',
      },
    },
    lg: {
      wrapper: {
        className: 'text-lg gap-2',
      },
      icon: {
        size: '1.25rem',
      },
      label: {
        fontSize: '1.125rem',
      },
    },
  },
  states: {
    checked: {
      icon: {
        backgroundColor: '#000000',
        borderColor: '#000000',
        hoverBorderColor: '#000000',
        dotColor: '#FFFFFF',
      },
    },
    disabled: {
      wrapper: {
        className: 'cursor-not-allowed opacity-60',
      },
      icon: {
        opacity: 0.6,
      },
      label: {
        color: '#9CA3AF',
      },
    },
  },
  button: {
    padding: '0.5rem 1rem',
    borderRadius: '0.25rem',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    textColor: '#374151',
    hoverBackgroundColor: '#F3F4F6',
    hoverBorderColor: '#D1D5DB',
    checked: {
      borderColor: '#5B80F7',
      solidBackgroundColor: '#5B80F7',
      outlineBackgroundColor: '#EFF6FF',
      solidTextColor: '#FFFFFF',
      outlineTextColor: '#5B80F7',
      hoverBackgroundColor: '#4C6EF5',
      hoverOutlineBackgroundColor: '#DBEAFE',
      hoverBorderColor: '#4C6EF5',
    },
    disabled: {
      opacity: 0.6,
    },
  },
  pill: {
    padding: '0.5rem 1rem',
    borderRadius: '9999px',
    backgroundColor: '#FFFFFF',
    borderColor: '#E0E3EB',
    textColor: '#525B7A',
    hoverBackgroundColor: '#F9F9FB',
    hoverBorderColor: '#D1D5DB',
    checked: {
      borderColor: '#000000',
      textColor: '#3D445C',
      hoverBorderColor: '#000000',
    },
    disabled: {
      opacity: 0.6,
    },
    wrapper: {
      className: 'w-full justify-center',
    },
  },
  group: {
    base: {
      className: 'flex items-center flex-wrap',
    },
    horizontal: {
      className: 'flex-row',
    },
    vertical: {
      className: 'flex-col',
    },
    block: {
      className: 'w-full',
    },
    sizes: {
      sm: {
        className: 'gap-2',
      },
      md: {
        className: 'gap-3',
      },
      lg: {
        className: 'gap-4',
      },
    },
  },
  buttonGroup: {
    backgroundColor: '#F9FAFB',
    borderRadius: '0.375rem',
    padding: '0.25rem',
    borderColor: '#E5E7EB',
  },
  pillGroup: {
    gap: '0.75rem',
  },
}

// Default checkbox component configuration
export const defaultCheckboxStyles = {
  base: {
    fontFamily: 'inherit',
    fontWeight: '400',
    transition: 'all 0.2s ease-in-out',
    focus: {
      outline: 'none',
      ring: '0 0 0 3px rgba(0, 0, 0, 0.2)',
    },
    wrapper: {
      className: 'flex items-center cursor-pointer select-none relative',
    },
    input: {
      style: {
        position: 'absolute' as const,
        opacity: 0,
        margin: 0,
        padding: 0,
      },
    },
    icon: {
      size: '1.25rem',
      borderColor: '#D1D5DB',
      backgroundColor: 'transparent',
      hoverBorderColor: '#9CA3AF',
      focusRingColor: 'rgba(0, 0, 0, 0.2)',
      borderRadius: '0.25rem',
    },
    label: {
      color: '#374151',
      style: {
        userSelect: 'none' as const,
      },
    },
  },
  sizes: {
    sm: {
      wrapper: {
        className: 'text-sm gap-2',
      },
      icon: {
        size: '1rem',
      },
      label: {
        fontSize: '0.875rem',
      },
    },
    md: {
      wrapper: {
        className: 'text-base gap-2',
      },
      icon: {
        size: '1.25rem',
      },
      label: {
        fontSize: '1rem',
      },
    },
    lg: {
      wrapper: {
        className: 'text-lg gap-2',
      },
      icon: {
        size: '1.5rem',
      },
      label: {
        fontSize: '1.125rem',
      },
    },
  },
  states: {
    checked: {
      icon: {
        backgroundColor: '#000000',
        borderColor: '#000000',
        hoverBorderColor: '#000000',
        checkmarkColor: '#FFFFFF',
      },
    },
    indeterminate: {
      icon: {
        backgroundColor: '#000000',
        borderColor: '#000000',
        dashColor: '#FFFFFF',
      },
    },
    disabled: {
      wrapper: {
        className: 'cursor-not-allowed opacity-60',
      },
      icon: {
        opacity: 0.6,
      },
      label: {
        color: '#9CA3AF',
      },
    },
  },
  button: {
    padding: '0.5rem 1rem',
    borderRadius: '0.25rem',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    textColor: '#374151',
    hoverBackgroundColor: '#F3F4F6',
    hoverBorderColor: '#D1D5DB',
    checked: {
      borderColor: '#5B80F7',
      solidBackgroundColor: '#5B80F7',
      outlineBackgroundColor: '#EFF6FF',
      solidTextColor: '#FFFFFF',
      outlineTextColor: '#5B80F7',
      hoverBackgroundColor: '#4C6EF5',
      hoverOutlineBackgroundColor: '#DBEAFE',
      hoverBorderColor: '#4C6EF5',
    },
    disabled: {
      opacity: 0.6,
    },
    wrapper: {
      className: 'w-full justify-center',
    },
  },
  group: {
    base: {
      className: 'flex items-center flex-wrap',
    },
    horizontal: {
      className: 'flex-row',
    },
    vertical: {
      className: 'flex-col',
    },
    block: {
      className: 'w-full',
    },
    sizes: {
      sm: {
        className: 'gap-2',
      },
      md: {
        className: 'gap-3',
      },
      lg: {
        className: 'gap-4',
      },
    },
  },
  buttonGroup: {
    backgroundColor: '#F9FAFB',
    borderRadius: '0.375rem',
    padding: '0.25rem',
    borderColor: '#E5E7EB',
  },
}

// Default dropdown component configuration
export const defaultDropdownStyles: DropdownConfig = {
  base: {
    fontFamily: 'font-sans',
    fontWeight: 'font-medium',
    transition: 'transition-all duration-200',
    focus: {
      outline: 'focus:outline-none',
      ring: 'focus:ring-2 focus:ring-offset-2',
    },
    radius: {
      default: 'rounded-md',
      rounded: 'rounded-full',
    },
  },
  variants: {
    primary: {
      backgroundColor: '#FFFFFF',
      textColor: '#374151',
      borderColor: '#D1D5DB',
      hoverBackgroundColor: '#F9FAFB',
      hoverBorderColor: '#9CA3AF',
      focusRingColor: 'rgba(59, 130, 246, 0.4)',
    },
    secondary: {
      backgroundColor: '#F3F4F6',
      textColor: '#374151',
      borderColor: '#E5E7EB',
      hoverBackgroundColor: '#E5E7EB',
      hoverBorderColor: '#D1D5DB',
      focusRingColor: 'rgba(107, 114, 128, 0.4)',
    },
    outline: {
      backgroundColor: 'transparent',
      textColor: '#374151',
      borderColor: '#D1D5DB',
      hoverBackgroundColor: '#F9FAFB',
      hoverBorderColor: '#9CA3AF',
      focusRingColor: 'rgba(59, 130, 246, 0.4)',
    },
  },
  sizes: {
    sm: {
      padding: 'py-2 px-3',
      fontSize: 'text-sm',
      iconSize: 'w-4 h-4',
      iconSpacing: 'gap-1.5',
    },
    md: {
      padding: 'py-2 px-4',
      fontSize: 'text-base',
      iconSize: 'w-5 h-5',
      iconSpacing: 'gap-2',
    },
    lg: {
      padding: 'py-2 px-4',
      fontSize: 'text-lg',
      iconSize: 'w-6 h-6',
      iconSpacing: 'gap-2.5',
    },
  },
  states: {
    disabled: {
      opacity: 0.6,
      backgroundColor: '#F3F4F6',
      color: '#9CA3AF',
      borderColor: '#E5E7EB',
      cursor: 'not-allowed',
    },
    loading: {
      opacity: 0.7,
      cursor: 'wait',
    },
  },
  popup: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
    boxShadow:
      '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    zIndex: 50,
  },
  options: {
    hoverBackgroundColor: '#F3F4F6',
    selectedBackgroundColor: '#EFF6FF',
    selectedTextColor: '#2563EB',
    disabledOpacity: 0.5,
  },
  search: {
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
    textColor: '#374151',
    focusBorderColor: '#3B82F6',
    focusBoxShadow: '0 0 0 2px rgba(59, 130, 246, 0.4)',
  },
  multiSelect: {
    tagBackgroundColor: '#E5E7EB',
    tagTextColor: '#374151',
  },
  label: {
    fontWeight: '500',
  },
}

// Default table component configuration
export const defaultTableStyles = {
  base: {
    fontFamily: 'IBM Plex Sans, sans-serif',
    transition: 'all 0.2s ease',
    radius: '8px',
    borderColor: '#f0f0f0',
    backgroundColor: '#FFFFFF',
  },
  sizes: {
    small: {
      headerPadding: '8px 12px',
      cellPadding: '8px 12px',
      fontSize: '12px',
      headerFontSize: '12px',
    },
    medium: {
      headerPadding: '12px 16px',
      cellPadding: '12px 16px',
      fontSize: '14px',
      headerFontSize: '14px',
    },
    large: {
      headerPadding: '16px 20px',
      cellPadding: '16px 20px',
      fontSize: '16px',
      headerFontSize: '16px',
    },
  },
  header: {
    backgroundColor: '#fafafa',
    textColor: '#000000d9',
    fontWeight: '600',
    hoverBackgroundColor: '#f0f0f0',
  },
  body: {
    backgroundColor: '#FFFFFF',
    textColor: '#000000d9',
    hoverBackgroundColor: '#fafafa',
    stripedBackgroundColor: '#fafafa',
  },
  states: {
    selected: {
      backgroundColor: '#e6f4ff',
    },
    disabled: {
      cursor: 'not-allowed',
    },
  },
  selection: {
    width: '48px',
    checkedColor: '#1677ff',
    borderColor: '#d9d9d9',
    disabledBorderColor: '#d9d9d9',
    disabledBackgroundColor: '#f5f5f5',
  },
  sorter: {
    activeColor: '#1677ff',
    inactiveColor: '#bfbfbf',
    iconSize: '10px',
    gap: '2px',
  },
  pagination: {
    gap: '16px',
    fontSize: '14px',
    buttonMinWidth: '32px',
    buttonHeight: '32px',
    buttonPadding: '0 8px',
    buttonBorderColor: '#d9d9d9',
    buttonBackgroundColor: '#FFFFFF',
    buttonRadius: '6px',
    activeColor: '#1677ff',
    activeFontWeight: '500',
    disabledTextColor: '#d9d9d9',
    disabledBackgroundColor: '#f5f5f5',
    inputWidth: '50px',
  },
  empty: {
    padding: '48px 16px',
    textColor: '#00000040',
    iconFill: '#f5f5f5',
    iconStroke: '#d9d9d9',
  },
  loading: {
    overlayBackground: 'rgba(255, 255, 255, 0.7)',
    spinnerColor: '#1677ff',
    trackColor: '#e6e6e6',
    spinnerSize: '24',
  },
  rowFooter: {
    borderStyle: 'dashed',
    borderColor: '#E0E3EB',
    padding: '12px 16px',
    backgroundColor: 'transparent',
  },
  variants: {
    default: {
      container: {
        backgroundColor: '#FFFFFF',
        borderRadius: '8px',
        overflow: 'hidden',
        border: '1px solid #f0f0f0',
      },
      table: {
        borderCollapse: 'collapse',
        borderSpacing: '0',
      },
      row: {
        backgroundColor: '#FFFFFF',
        borderRadius: '0',
        borderColor: '#f0f0f0',
      },
      cell: {
        borderBottom: '1px solid #f0f0f0',
      },
      header: {
        backgroundColor: '#fafafa',
      },
      states: {
        hover: { backgroundColor: '#fafafa' },
        selected: { backgroundColor: '#e6f4ff' },
        striped: { backgroundColor: '#fafafa' },
        disabled: { cursor: 'not-allowed' },
      },
    },
    card: {
      container: {
        backgroundColor: 'transparent',
        borderRadius: '0',
        overflow: 'visible',
        border: 'none',
      },
      table: {
        borderCollapse: 'separate',
        borderSpacing: '0 6px',
      },
      row: {
        backgroundColor: '#fff',
        borderRadius: '8px',
        borderColor: '#E0E3EB',
      },
      cell: {
        borderBottom: 'none',
      },
      header: {
        backgroundColor: 'transparent',
      },
      states: {
        hover: { backgroundColor: '#fafafa' },
        selected: { backgroundColor: '#e6f4ff' },
        striped: { backgroundColor: '#fafafa' },
        disabled: { cursor: 'not-allowed' },
      },
    },
  },
  tableHeader: {
    container: {
      backgroundColor: '#FFFFFF',
      borderRadius: '8px',
    },
    tabs: {
      fontFamily: 'IBM Plex Sans, sans-serif',
      fontSize: '12px',
      lineHeight: '16px',
      padding: '8px 12px',
      gap: '0px',
      activeFontWeight: '600',
      inactiveFontWeight: '500',
      activeTextColor: '#1a1a1a',
      inactiveTextColor: '#808080',
      activeBorderWidth: '2px',
      activeBorderColor: '#e6e6e6',
      borderBottomColor: '#e6e6e6',
    },
    search: {
      borderWidth: '1px',
      borderColor: '#e6e6e6',
      borderRadius: '4px',
      backgroundColor: '#FFFFFF',
      padding: '8px 12px',
      fontSize: '14px',
      lineHeight: '20px',
      placeholderColor: '#808080',
      textColor: '#2b2b2b',
      fontFamily: 'IBM Plex Sans, sans-serif',
    },
    filter: {
      borderWidth: '1px',
      borderColor: '#e6e6e6',
      borderRadius: '4px',
      backgroundColor: '#FFFFFF',
      padding: '8px 12px',
      fontSize: '12px',
      lineHeight: '16px',
      textColor: '#2b2b2b',
      fontFamily: 'IBM Plex Sans, sans-serif',
      activeBorderColor: '#48a7fc',
      activeBackgroundColor: '#f4fbf8',
    },
    actionBar: {
      padding: '12px',
      gap: '24px',
      itemGap: '8px',
    },
    buttons: {
      borderRadius: '4px',
      padding: '8px 12px',
      fontSize: '12px',
      lineHeight: '16px',
      fontFamily: 'IBM Plex Sans, sans-serif',
      fontWeight: '500',
      primary: {
        backgroundColor: '#1a1a1a',
        textColor: '#e6e6e6',
      },
      secondary: {
        backgroundColor: 'transparent',
        textColor: '#2b2b2b',
        borderWidth: '0.5px',
        borderColor: '#a6a5a5',
      },
      icon: {
        borderWidth: '1px',
        borderColor: '#48a7fc',
        backgroundColor: 'transparent',
      },
    },
  },
}

// Default switch component configuration
export const defaultSwitchStyles = {
  base: {
    fontFamily: 'sans-serif',
    transition: 'all 0.2s ease-in-out',
    focus: {
      outline: 'none',
      ring: '0 0 0 3px rgba(59, 130, 246, 0.5)',
    },
    radius: {
      default: '100px',
      rounded: '9999px',
    },
  },
  variants: {
    primary: {
      backgroundColor: defaultColors.primary.main,
      uncheckedBackgroundColor: 'rgba(0, 0, 0, 0.25)',
      hoverColor: defaultColors.primary.dark,
      focusRingColor: defaultColors.primary.main,
    },
    secondary: {
      backgroundColor: defaultColors.secondary.main,
      uncheckedBackgroundColor: 'rgba(0, 0, 0, 0.25)',
      hoverColor: defaultColors.secondary.dark,
      focusRingColor: defaultColors.secondary.main,
    },
    outline: {
      backgroundColor: defaultColors.primary.main,
      uncheckedBackgroundColor: 'transparent',
      borderColor: defaultColors.primary.main,
      hoverColor: defaultColors.primary.dark,
      focusRingColor: defaultColors.primary.main,
    },
  },
  sizes: {
    sm: {
      width: '28px',
      height: '16px',
      handleSize: '12px',
      fontSize: '12px',
      padding: '6px',
    },
    md: {
      width: '40px',
      height: '22px',
      handleSize: '16px',
      fontSize: '14px',
      padding: '8px',
    },
    lg: {
      width: '50px',
      height: '28px',
      handleSize: '20px',
      fontSize: '16px',
      padding: '10px',
    },
  },
  states: {
    disabled: {
      opacity: '0.6',
      cursor: 'not-allowed',
    },
    loading: {
      opacity: '0.8',
      cursor: 'wait',
    },
  },
}

// Default steps component configuration
export const defaultStepsStyles = {
  base: {
    fontFamily: 'IBM Plex Sans, sans-serif',
    fontSize: '14px',
    lineHeight: '1.4285714285714286',
    backgroundColor: '#ECF0FF',
    borderColor: '#E0E3EB',
  },
  sizes: {
    small: {
      iconSize: '32px',
      iconBorderRadius: '16px',
      fontSize: '12px',
      fontFamily: 'Roboto, sans-serif',
      lineHeight: '1.3333333333333333',
      stepPadding: '12px 0px',
      stepGap: '4px',
      containerPadding: '0px 16px',
      containerGap: '8px',
      connectorHeight: '2px',
      iconInnerPadding: '2px',
      iconInnerSize: '20px',
      iconContentSize: '16px',
    },
    medium: {
      iconSize: '32px',
      iconBorderRadius: '16px',
      fontSize: '14px',
      fontFamily: 'IBM Plex Sans, sans-serif',
      lineHeight: '1.4285714285714286',
      stepPadding: '12px 0px',
      stepGap: '4px',
      containerPadding: '0px 24px',
      containerGap: '12px',
      connectorHeight: '2px',
      iconInnerPadding: '2px',
      iconInnerSize: '20px',
      iconContentSize: '16px',
    },
    large: {
      iconSize: '48px',
      iconBorderRadius: '24px',
      fontSize: '16px',
      fontFamily: 'IBM Plex Sans, sans-serif',
      lineHeight: '1.4285714285714286',
      stepPadding: '16px 0px',
      stepGap: '6px',
      containerPadding: '0px 32px',
      containerGap: '16px',
      connectorHeight: '2px',
      iconInnerPadding: '3px',
      iconInnerSize: '30px',
      iconContentSize: '24px',
    },
  },
  colors: {
    wait: {
      backgroundColor: '#FFFFFF',
      borderColor: '#E0E3EB',
      textColor: '#3D445C',
      iconColor: '#3D445C',
    },
    process: {
      backgroundColor: '#FFFFFF',
      borderColor: '#5B80F7',
      textColor: '#3D445C',
      iconColor: '#5B80F7',
    },
    finish: {
      backgroundColor: '#5B80F7',
      borderColor: '#5B80F7',
      textColor: '#3D445C',
      iconColor: '#FFFFFF',
    },
    error: {
      backgroundColor: '#FFFFFF',
      borderColor: '#EF4444',
      textColor: '#EF4444',
      iconColor: '#EF4444',
    },
  },
  connectors: {
    default: '#E0E3EB',
    active: '#5B80F7',
  },
}

// Default collapse component configuration
export const defaultCollapseStyles = {
  base: {
    fontFamily: 'IBM Plex Sans, sans-serif',
    backgroundColor: '#FFFAEA',
    borderColor: '#E0E3EB',
    borderRadius: '8px',
    primaryColor: '#5B80F7',
  },
  sizes: {
    small: {
      borderRadius: '6px',
      headerBackgroundColor: '#FFFAEA',
      headerFontWeight: '500',
      headerTextColor: '#1F222E',
      headerHoverBackgroundColor: '#F5F5F5',
      contentBackgroundColor: '#FFFAEA',
      contentTextColor: '#525B7A',
      iconColor: '#D97706',
      arrowColor: '#A3AAC2',
      fontFamily: 'IBM Plex Sans, sans-serif',
      lineHeight: '1.5',
    },
    medium: {
      borderRadius: '8px',
      headerBackgroundColor: '#FFFAEA',
      headerFontWeight: '500',
      headerTextColor: '#1F222E',
      headerHoverBackgroundColor: '#F5F5F5',
      contentBackgroundColor: '#FFFAEA',
      contentTextColor: '#525B7A',
      iconColor: '#D97706',
      arrowColor: '#A3AAC2',
      fontFamily: 'IBM Plex Sans, sans-serif',
      lineHeight: '1.5',
    },
    large: {
      borderRadius: '10px',
      headerBackgroundColor: '#FFFAEA',
      headerFontWeight: '500',
      headerTextColor: '#1F222E',
      headerHoverBackgroundColor: '#F5F5F5',
      contentBackgroundColor: '#FFFAEA',
      contentTextColor: '#525B7A',
      iconColor: '#D97706',
      arrowColor: '#A3AAC2',
      fontFamily: 'IBM Plex Sans, sans-serif',
      lineHeight: '1.5',
    },
  },
}

// Default upload component configuration
export const defaultUploadStyles = {
  base: {
    fontFamily: 'IBM Plex Sans, sans-serif',
    fontWeight: '500',
    borderRadius: '8px',
    backgroundColor: '#F9F9FB',
    textColor: '#3D445C',
    descriptionColor: '#525B7A',
    iconColor: '#A3AAC2',
    iconBackgroundColor: '#FFFFFF',
    actionColor: '#5B80F7',
    actionHoverColor: '#E0E3EB',
    borderStyle: 'dashed',
  },
  variants: {
    default: {
      backgroundColor: '#F9F9FB',
      borderColor: '#E0E3EB',
      hoverBackgroundColor: '#F5F5F7',
      hoverBorderColor: '#C4C9D4',
      borderStyle: 'dashed',
    },
    error: {
      backgroundColor: '#F9F9FB',
      borderColor: '#BB2B22',
      hoverBackgroundColor: '#FEF2F2',
      hoverBorderColor: '#DC2626',
      borderStyle: 'dashed',
    },
    drag: {
      backgroundColor: '#F9F9FB',
      borderColor: '#E0E3EB',
      hoverBackgroundColor: '#F0F4FF',
      hoverBorderColor: '#5B80F7',
      borderStyle: 'dashed',
    },
  },
  sizes: {
    small: {
      padding: '12px',
      fontSize: '12px',
      descriptionFontSize: '10px',
      iconSize: '20px',
      iconContainerSize: '24px',
      gap: '8px',
      width: '200px',
      minHeight: '60px',
      listMarginTop: '8px',
      listGap: '6px',
      listItemGap: '8px',
      listItemPadding: '8px',
      actionGap: '4px',
    },
    medium: {
      padding: '16px',
      fontSize: '14px',
      descriptionFontSize: '12px',
      iconSize: '28px',
      iconContainerSize: '32px',
      gap: '12px',
      width: '284px',
      minHeight: '80px',
      listMarginTop: '12px',
      listGap: '8px',
      listItemGap: '12px',
      listItemPadding: '12px',
      actionGap: '6px',
    },
    large: {
      padding: '20px',
      fontSize: '16px',
      descriptionFontSize: '14px',
      iconSize: '32px',
      iconContainerSize: '40px',
      gap: '16px',
      width: '350px',
      minHeight: '100px',
      listMarginTop: '16px',
      listGap: '10px',
      listItemGap: '16px',
      listItemPadding: '16px',
      actionGap: '8px',
    },
  },
}

// Default Upload V2 component configuration
export const defaultUploadV2Styles = {
  base: {
    fontFamily: 'IBM Plex Sans, sans-serif',
    fontWeight: '500',
    borderRadius: '4px',
    borderWidth: '1.5px',
    borderStyle: 'dashed',
    titleFontSize: '14px',
    titleFontWeight: '500',
    titleColor: '#3D445C',
    descriptionFontSize: '12px',
    descriptionColor: '#615655',
    padding: '16px 24px 16px 16px',
    gap: '10px',
  },
  variants: {
    default: {
      backgroundColor: '#F9F9FB',
      borderColor: '#E0E3EB',
      hoverBackgroundColor: 'rgba(91, 128, 247, 0.08)',
      hoverBorderColor: '#5B80F7',
    },
    drag: {
      backgroundColor: 'rgba(91, 128, 247, 0.08)',
      borderColor: '#5B80F7',
    },
    error: {
      backgroundColor: '#fdf2f4',
      borderColor: '#ED899D',
      errorTextColor: '#bb2b22',
    },
    fileSelected: {
      backgroundColor: '#F9F9FB',
      borderColor: '#E0E3EB',
      borderStyle: 'solid',
    },
    fileSelectedError: {
      backgroundColor: '#FEF2F2',
      borderColor: '#FA3A2E',
      borderStyle: 'solid',
    },
  },
  button: {
    backgroundColor: '#FFFFFF',
    borderColor: '#a6a5a5',
    borderWidth: '0.5px',
    textColor: '#454545',
    fontSize: '14px',
    fontWeight: '500',
    paddingX: '12px',
    paddingY: '8px',
    borderRadius: '4px',
    hoverBackgroundColor: '#F9F9FB',
  },
  deleteButton: {
    borderColor: '#e23b5d',
    borderWidth: '0.5px',
    backgroundColor: 'transparent',
    hoverBackgroundColor: '#fef2f2',
    padding: '6px',
    borderRadius: '4px',
    iconSize: '24px',
  },
  fileInfo: {
    nameFontSize: '14px',
    nameFontWeight: '500',
    nameColor: '#3D445C',
    sizeFontSize: '12px',
    sizeColor: '#525B7A',
  },
  iconSize: {
    width: '52px',
    height: '60px',
  },
}

// Default alert component configuration
export const defaultAlertStyles = {
  base: {
    fontFamily: 'sans-serif',
    fontWeight: '500',
    transition: 'all 0.15s ease-in-out',
    radius: '0.5rem',
    padding: '1rem',
  },
  variants: {
    default: {
      backgroundColor: '#FFFFFF',
      textColor: '#111827',
      borderColor: '#E5E7EB',
      iconColor: '#6B7280',
    },
    primary: {
      backgroundColor: defaultColors.primary.light + '20',
      textColor: defaultColors.primary.dark,
      borderColor: defaultColors.primary.light,
      iconColor: defaultColors.primary.main,
    },
    destructive: {
      backgroundColor: defaultColors.error.light + '20',
      textColor: defaultColors.error.dark,
      borderColor: defaultColors.error.light,
      iconColor: defaultColors.error.main,
    },
    success: {
      backgroundColor: defaultColors.success.light + '20',
      textColor: defaultColors.success.dark,
      borderColor: defaultColors.success.light,
      iconColor: defaultColors.success.main,
    },
    warning: {
      backgroundColor: defaultColors.warning.light + '20',
      textColor: defaultColors.warning.dark,
      borderColor: defaultColors.warning.light,
      iconColor: defaultColors.warning.main,
    },
    info: {
      backgroundColor: defaultColors.info.light + '20',
      textColor: defaultColors.info.dark,
      borderColor: defaultColors.info.light,
      iconColor: defaultColors.info.main,
    },
  },
  sizes: {
    sm: {
      padding: '0.5rem 1rem',
      fontSize: '0.875rem',
      iconSize: '1rem',
    },
    md: {
      padding: '1rem',
      fontSize: '1rem',
      iconSize: '1.25rem',
    },
    lg: {
      padding: '1.25rem',
      fontSize: '1.125rem',
      iconSize: '1.5rem',
    },
  },
}

// Default toggle component configuration
export const defaultToggleStyles = {
  base: {
    fontFamily: 'sans-serif',
    fontWeight: '500',
    transition: 'all 0.2s ease-in-out',
    focus: {
      outline: 'none',
      ring: '0 0 0 3px rgba(59, 130, 246, 0.5)',
    },
    radius: '0.375rem',
  },
  variants: {
    primary: {
      backgroundColor: defaultColors.primary.main,
      uncheckedBackgroundColor: '#F3F4F6',
      checkedTextColor: '#FFFFFF',
      uncheckedTextColor: '#374151',
      borderColor: defaultColors.primary.main,
      hoverBackgroundColor: defaultColors.primary.dark,
      hoverTextColor: '#FFFFFF',
      hoverBorderColor: defaultColors.primary.dark,
      focusRingColor: defaultColors.primary.main,
    },
    secondary: {
      backgroundColor: defaultColors.secondary.main,
      uncheckedBackgroundColor: '#F3F4F6',
      checkedTextColor: '#FFFFFF',
      uncheckedTextColor: '#374151',
      borderColor: defaultColors.secondary.main,
      hoverBackgroundColor: defaultColors.secondary.dark,
      hoverTextColor: '#FFFFFF',
      hoverBorderColor: defaultColors.secondary.dark,
      focusRingColor: defaultColors.secondary.main,
    },
    outline: {
      backgroundColor: defaultColors.primary.main,
      uncheckedBackgroundColor: 'transparent',
      checkedTextColor: '#FFFFFF',
      uncheckedTextColor: defaultColors.primary.main,
      borderColor: defaultColors.primary.main,
      hoverBackgroundColor: defaultColors.primary.dark,
      hoverTextColor: '#FFFFFF',
      hoverBorderColor: defaultColors.primary.dark,
      focusRingColor: defaultColors.primary.main,
    },
    success: {
      backgroundColor: defaultColors.success.main,
      uncheckedBackgroundColor: '#F3F4F6',
      checkedTextColor: '#FFFFFF',
      uncheckedTextColor: '#374151',
      borderColor: defaultColors.success.main,
      hoverBackgroundColor: defaultColors.success.dark,
      hoverTextColor: '#FFFFFF',
      hoverBorderColor: defaultColors.success.dark,
      focusRingColor: defaultColors.success.main,
    },
    warning: {
      backgroundColor: defaultColors.warning.main,
      uncheckedBackgroundColor: '#F3F4F6',
      checkedTextColor: '#000000',
      uncheckedTextColor: '#374151',
      borderColor: defaultColors.warning.main,
      hoverBackgroundColor: defaultColors.warning.dark,
      hoverTextColor: '#000000',
      hoverBorderColor: defaultColors.warning.dark,
      focusRingColor: defaultColors.warning.main,
    },
    danger: {
      backgroundColor: defaultColors.error.main,
      uncheckedBackgroundColor: '#F3F4F6',
      checkedTextColor: '#FFFFFF',
      uncheckedTextColor: '#374151',
      borderColor: defaultColors.error.main,
      hoverBackgroundColor: defaultColors.error.dark,
      hoverTextColor: '#FFFFFF',
      hoverBorderColor: defaultColors.error.dark,
      focusRingColor: defaultColors.error.main,
    },
  },
  sizes: {
    sm: {
      width: 'auto',
      height: '28px',
      padding: '0.375rem 0.75rem',
      fontSize: '0.875rem',
      iconSize: '1rem',
      gap: '0.375rem',
    },
    md: {
      width: 'auto',
      height: '36px',
      padding: '0.5rem 1rem',
      fontSize: '1rem',
      iconSize: '1.25rem',
      gap: '0.5rem',
    },
    lg: {
      width: 'auto',
      height: '44px',
      padding: '0.75rem 1.5rem',
      fontSize: '1.125rem',
      iconSize: '1.5rem',
      gap: '0.625rem',
    },
  },
  states: {
    disabled: {
      opacity: '0.6',
      cursor: 'not-allowed',
    },
    loading: {
      opacity: '0.8',
      cursor: 'wait',
    },
  },
}

// Default sidebar component configuration
export const defaultSidebarStyles = {
  base: {
    fontFamily: 'sans-serif',
    transition: 'all 0.01s ease',
    transitionTime: '0.01s',
    radius: {
      default: '0.5rem',
    },
    width: '240px', // expanded width (default prop value)
    collapsedWidth: '4.5rem',
    toggler: {
      width: '1.75rem',
      height: '1.75rem',
      top: '1.25rem',
      borderRadius: '0.25rem',
      boxShadow:
        '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      backgroundColor: 'white',
      color: 'black',
    },
    padding: {
      sidebarParentLeft: '0.75rem',
      sidebarParentRight: '0.75rem',
      logoTop: '1.25rem',
      item: '0.5rem',
      chipMarginLeft: '0.75rem',
      disclosurePanelPaddingLeftExpanded: '2.75rem',
      disclosurePanelPaddingLeftCollapsed: '1rem',
    },
    zIndex: 30,
  },
  variants: {
    light: {
      backgroundColor: '#ffffff',
      textColor: '#1e1a1a',
      borderColor: '#e5e3e3',
      activeBackgroundColor: '#eff6ff',
      activeTextColor: '#3b82f6',
      hoverBackgroundColor: '#f9fafb',
      hoverTextColor: '#1e1a1a',
      iconColor: '#1e1a1a',
      activeIconColor: '#3b82f6',
      chipBackgroundColor: '#f3f4f6',
      chipTextColor: '#4b5563',
      activeChipBackgroundColor: '#3b82f6',
      activeChipTextColor: '#ffffff',
      itemFontSize: '0.875rem',
      itemFontWeight: '500',
      itemBorderRadius: '0.375rem',
      chipFontSize: '0.75rem',
      chipBorderRadius: '9999px',
      sidebarBoxShadowLeftHovered:
        '0px 16px 10px 0px rgb(0 0 0 / 14%), 0px 11px 18px 0px rgb(0 0 0 / 12%), 0px 13px 5px -1px rgb(0 0 0 / 20%)',
      sidebarBoxShadowRightHovered: '-4px 0 6px 0px rgb(0 0 0 / 18%)',
    },
    dark: {
      backgroundColor: '#1f2937',
      textColor: '#f9fafb',
      borderColor: '#374151',
      activeBackgroundColor: '#374151',
      activeTextColor: '#ffffff',
      hoverBackgroundColor: '#374151',
      hoverTextColor: '#f9fafb',
      iconColor: '#f9fafb',
      activeIconColor: '#ffffff',
      chipBackgroundColor: '#374151',
      chipTextColor: '#f9fafb',
      activeChipBackgroundColor: '#f9fafb',
      activeChipTextColor: '#1f2937',
      itemFontSize: '0.875rem',
      itemFontWeight: '500',
      itemBorderRadius: '0.375rem',
      chipFontSize: '0.75rem',
      chipBorderRadius: '9999px',
      sidebarBoxShadowLeftHovered:
        '0px 16px 10px 0px rgb(0 0 0 / 14%), 0px 11px 18px 0px rgb(0 0 0 / 12%), 0px 13px 5px -1px rgb(0 0 0 / 20%)',
      sidebarBoxShadowRightHovered: '-4px 0 6px 0px rgb(0 0 0 / 18%)',
    },
    'dark-plus': {
      backgroundColor: '#1f222e',
      textColor: '#f9fafb',
      borderColor: '#ed4136',
      activeBackgroundColor: '#374151',
      activeTextColor: '#ffffff',
      hoverBackgroundColor: '#374151',
      hoverTextColor: '#f9fafb',
      iconColor: '#f9fafb',
      activeIconColor: '#ffffff',
      chipBackgroundColor: '#374151',
      chipTextColor: '#f9fafb',
      activeChipBackgroundColor: '#f9fafb',
      activeChipTextColor: '#111827',
      itemFontSize: '0.775rem',
      itemFontWeight: '500',
      itemBorderRadius: '0.375rem',
      chipFontSize: '0.75rem',
      chipBorderRadius: '9999px',
      sidebarBoxShadowLeftHovered:
        '0px 16px 10px 0px rgb(0 0 0 / 14%), 0px 11px 18px 0px rgb(0 0 0 / 12%), 0px 13px 5px -1px rgb(0 0 0 / 20%)',
      sidebarBoxShadowRightHovered: '-4px 0 6px 0px rgb(0 0 0 / 18%)',
    },
  },
}

// Default tooltip component configuration
export const defaultTooltipStyles = {
  base: {
    fontFamily: 'inherit',
    fontWeight: '400',
    lineHeight: '1.4',
    radius: '4px',
    shadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    transition: '0.2s ease-in-out',
  },
  sizes: {
    sm: {
      padding: '4px 8px',
      fontSize: '12px',
    },
    md: {
      padding: '6px 10px',
      fontSize: '14px',
    },
    lg: {
      padding: '8px 12px',
      fontSize: '16px',
    },
  },
  variants: {
    default: {
      backgroundColor: '#333',
      textColor: '#fff',
      borderColor: 'transparent', // Transparent border
    },
    primary: {
      backgroundColor: '#007bff',
      textColor: '#fff',
      borderColor: 'transparent',
    },
    success: {
      backgroundColor: '#28a745',
      textColor: '#fff',
      borderColor: 'transparent',
    },
    warning: {
      backgroundColor: '#ffc107',
      textColor: '#fff',
      borderColor: 'transparent',
    },
    error: {
      backgroundColor: '#dc3545',
      textColor: '#fff',
      borderColor: 'transparent',
    },
    info: {
      backgroundColor: '#17a2b8',
      textColor: '#fff',
      borderColor: 'transparent',
    },
  },
}

// Default toast component configuration
export const defaultToastStyles = {
  base: {
    fontFamily: 'IBM Plex Sans, sans-serif',
    fontWeight: '500',
    lineHeight: '1.4',
    radius: '8px',
    shadow: '0px 8px 28px -8px rgba(61,72,107,0.2)',
    transition: '0.3s ease-in-out',
    zIndex: 9999,
  },
  sizes: {
    sm: {
      padding: '8px 12px',
      fontSize: '12px',
      titleSize: '13px',
      messageSize: '12px',
      iconSize: '16px',
      maxWidth: '300px',
    },
    md: {
      padding: '12px 16px',
      fontSize: '14px',
      titleSize: '14px',
      messageSize: '12px',
      iconSize: '20px',
      maxWidth: '380px',
    },
    lg: {
      padding: '16px 20px',
      fontSize: '16px',
      titleSize: '16px',
      messageSize: '14px',
      iconSize: '24px',
      maxWidth: '480px',
    },
  },
  variants: {
    default: {
      backgroundColor: '#FFFFFF',
      textColor: '#3D445C',
      borderColor: '#E0E3EB',
      iconColor: '#3D445C',
    },
    success: {
      backgroundColor: '#10B981',
      textColor: '#FFFFFF',
      borderColor: 'transparent',
      iconColor: '#FFFFFF',
    },
    error: {
      backgroundColor: '#FA3A2E',
      textColor: '#FFFFFF',
      borderColor: 'transparent',
      iconColor: '#FFFFFF',
    },
    warning: {
      backgroundColor: '#F59E0B',
      textColor: '#FFFFFF',
      borderColor: 'transparent',
      iconColor: '#FFFFFF',
    },
    info: {
      backgroundColor: '#5B80F7',
      textColor: '#FFFFFF',
      borderColor: 'transparent',
      iconColor: '#FFFFFF',
    },
  },
}

// Default pagination component configuration
export const defaultPaginationStyles = {
  base: {
    fontFamily: 'IBM Plex Sans, sans-serif',
    transition: 'all 0.2s ease',
  },
  container: {
    padding: '16px 0',
    gap: '16px',
    fontSize: '14px',
  },
  sizes: {
    default: {
      padding: '0 8px',
      fontSize: '14px',
      minWidth: '32px',
      height: '32px',
      iconSize: '18px',
    },
    small: {
      padding: '0 6px',
      fontSize: '12px',
      minWidth: '28px',
      height: '28px',
      iconSize: '16px',
    },
  },
  button: {
    backgroundColor: '#fff',
    borderColor: '#d9d9d9',
    borderRadius: '6px',
    hoverBorderColor: '#1677ff',
    hoverColor: '#1677ff',
    disabledTextColor: '#d9d9d9',
    disabledBackgroundColor: '#f5f5f5',
  },
  activeButton: {
    backgroundColor: '#1677ff',
    color: '#fff',
    fontWeight: '500',
    hoverBackgroundColor: '#1677ff',
    hoverColor: '#fff',
  },
  navButton: {
    backgroundColor: 'transparent',
    fontSize: '18px',
    hoverBorderColor: '#1677ff',
    hoverColor: '#1677ff',
    disabledColor: '#d9d9d9',
  },
  select: {
    height: '32px',
    padding: '0 8px',
    borderColor: '#d9d9d9',
    borderRadius: '6px',
    fontSize: '14px',
  },
  input: {
    width: '50px',
    height: '32px',
    padding: '0 8px',
    borderColor: '#d9d9d9',
    borderRadius: '6px',
    fontSize: '14px',
    textAlign: 'center',
  },
  iconButton: {
    width: '32px',
    height: '32px',
    borderColor: '#d9d9d9',
    borderRadius: '6px',
    backgroundColor: '#fff',
    fontSize: '14px',
    hoverBorderColor: '#1677ff',
    hoverColor: '#1677ff',
    disabledColor: '#d9d9d9',
    disabledBackgroundColor: '#f5f5f5',
  },
  ellipsis: {
    padding: '0 8px',
    lineHeight: '32px',
  },
  states: {
    disabled: {
      cursor: 'not-allowed',
      color: '#d9d9d9',
      backgroundColor: '#f5f5f5',
    },
  },
}

// Default tabs component configuration
export const defaultTabsStyles = {
  base: {
    fontFamily: 'inherit',
    transition: 'all 0.2s ease-in-out',
  },
  borderColor: '#E0E3EB',
  cardBackgroundColor: '#F9F9FB',
  tabTextColor: '#525B7A',
  tabHoverTextColor: '#3D445C',
  tabHoverBackgroundColor: '#FFFFFF',
  activeTabTextColor: '#5B80F7',
  activeTabBackgroundColor: '#FFFFFF',
  indicatorColor: '#5B80F7',
  disabledTabTextColor: '#A3AAC2',
  cardTabBackgroundColor: '#FFFFFF',
  cardTabBorderColor: '#E0E3EB',
  cardTabBoxShadow: '0px 1px 2px 0px rgba(0,0,0,0.05)',
  sizes: {
    sm: {
      padding: '0.375rem 0.75rem',
      fontSize: '0.875rem',
    },
    md: {
      padding: '0.5rem 1rem',
      fontSize: '1rem',
    },
    lg: {
      padding: '0.625rem 1.25rem',
      fontSize: '1.125rem',
    },
  },
}

// Default map / map popup component configuration
export const defaultMapStyles = {
  /** Tokens for the outer map container wrapper */
  container: {
    borderRadius: '8px',
    boxShadow: 'none',
    borderColor: 'transparent',
    backgroundColor: '#F9FAFB',
    /** Background shown while tiles are loading */
    loadingBg: '#F9FAFB',
  },
  /** Tokens for the error / no-style placeholder */
  error: {
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    borderColor: '#E5E7EB',
    iconBg: '#FFF1F0',
    iconColor: defaultColors.error.main,
    titleColor: '#1A1A2E',
    titleFontSize: '14px',
    subtitleColor: '#6B7280',
    subtitleFontSize: '12px',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    padding: '24px',
    gap: '16px',
    iconSize: '64px',
  },
  /** Popup card base tokens */
  base: {
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    shadow: '0 8px 24px rgba(0,0,0,0.12)',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    minWidth: '260px',
    maxWidth: '320px',
    titleColor: '#1A1A2E',
    addressColor: '#6B7280',
    labelColor: '#6B7280',
    valueColor: '#1A1A2E',
    separatorColor: '#F0F0F0',
    iconBg: '#FFF1F0',
    iconColor: defaultColors.error.main,
    closeBtnColor: '#9CA3AF',
    closeBtnHoverBg: '#F3F4F6',
    closeBtnHoverColor: '#374151',
  },
  spacing: {
    headerPadding: '14px 16px 10px',
    bodyPadding: '12px 16px',
    footerPadding: '10px 16px 14px',
    headerGap: '10px',
    detailRowGap: '8px',
    detailLabelGap: '6px',
    actionGap: '8px',
    statusMarginBottom: '10px',
    iconWrapperSize: '36px',
  },
  typography: {
    titleFontSize: '14px',
    addressFontSize: '12px',
    detailFontSize: '12px',
    statusFontSize: '11px',
  },
  marker: {
    defaultColor: defaultColors.error.main,
    size: 36,
    /** CSS filter for pin drop-shadow (e.g. '0 2px 4px rgba(0,0,0,0.3)') */
    dropShadow: '0 2px 4px rgba(0,0,0,0.3)',
  },
  actions: {
    primary: {
      backgroundColor: defaultColors.error.main,
      textColor: defaultColors.error.contrast,
    },
    secondary: {
      backgroundColor: '#F3F4F6',
      textColor: '#374151',
    },
    ghost: {
      backgroundColor: 'transparent',
      textColor: '#6B7280',
      borderColor: '#E5E7EB',
    },
  },
}


// Default audio player component configuration
export const defaultAudioPlayerStyles: AudioPlayerConfig = {
  base: {
    fontFamily: 'inherit',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
    buttonColor: '#1E1A1A',
    timeColor: '#6B7280',
  },
  sizes: {
    sm: {
      height: 32,
      fontSize: 12,
      iconSize: 14,
      thumbSize: 6,
      trackHeight: 3,
      gap: 8,
      paddingX: 10,
    },
    md: {
      height: 40,
      fontSize: 14,
      iconSize: 16,
      thumbSize: 6,
      trackHeight: 4,
      gap: 12,
      paddingX: 12,
    },
    lg: {
      height: 48,
      fontSize: 16,
      iconSize: 20,
      thumbSize: 6,
      trackHeight: 5,
      gap: 14,
      paddingX: 16,
    },
  },
  track: {
    color: '#E5E7EB',
    playedColor: '#5B80F7',
    thumbColor: '#5B80F7',
  },
}

// Default date range picker component configuration
// Colors mapped from Figma design tokens (file QbYH1ed8a7JAMeRKAyVRrG, node 687-90910)
export const defaultDateRangePickerStyles = {
  base: {
    backgroundColor: '#FFFFFF',
    textColor: '#3D445C',              // Font/default black
    borderColor: '#E0E3EB',            // Background & outlines/sections & dividers
    hoverBorderColor: '#A3AAC2',
    placeholderColor: '#A3AAC2',       // Font/descriptions-placeholders
    iconColor: '#A3AAC2',              // Font/descriptions-placeholders
    fontFamily: 'IBM Plex Sans, sans-serif',
    borderRadius: '0.375rem',
    shadow: '0px 20px 56px -12px rgba(0,0,0,0.25)', // Figma popup shadow
  },
  variants: {
    primary: {
       backgroundColor: defaultColors.info.main,
      textColor: defaultColors.info.contrast,
      hoverColor: defaultColors.info.dark,
      lightBackground: defaultColors.info.light + '20',
      lightTextColor: defaultColors.info.dark,
    },
    success: {
      backgroundColor: defaultColors.success.main,
      textColor: defaultColors.success.contrast,
      hoverColor: defaultColors.success.dark,
      lightBackground: defaultColors.success.light + '20',
      lightTextColor: defaultColors.success.dark,
    },
    warning: {
      backgroundColor: defaultColors.warning.main,
      textColor: defaultColors.warning.contrast,
      hoverColor: defaultColors.warning.dark,
      lightBackground: defaultColors.warning.light + '20',
      lightTextColor: defaultColors.warning.dark,
    },
    error: {
      backgroundColor: defaultColors.error.main,
      textColor: defaultColors.error.contrast,
      hoverColor: defaultColors.error.dark,
      lightBackground: defaultColors.error.light + '20',
      lightTextColor: defaultColors.error.dark,
    },
    info: {
      backgroundColor: defaultColors.info.main,
      textColor: defaultColors.info.contrast,
      hoverColor: defaultColors.info.dark,
      lightBackground: defaultColors.info.light + '20',
      lightTextColor: defaultColors.info.dark,
    },
    default: {
      backgroundColor: defaultColors.info.main,
      textColor: defaultColors.info.contrast,
      hoverColor: defaultColors.info.dark,
      lightBackground: defaultColors.info.light + '20',
      lightTextColor: defaultColors.info.dark,
    },
  },
  sizes: {
    sm: {
      padding: '0.375rem 0.75rem',
      fontSize: '0.875rem',
      iconSize: '14px',
    },
    md: {
      padding: '0.5rem 1rem',
      fontSize: '1rem',
      iconSize: '16px',
    },
    lg: {
      padding: '0.75rem 1.5rem',
      fontSize: '1.125rem',
      iconSize: '18px',
    },
  },
  calendar: {
    backgroundColor: '#FFFFFF',
    headerTextColor: '#3D445C',        // Font/default black
    weekDayTextColor: '#A3AAC2',       // Font/descriptions-placeholders
    dayTextColor: '#3D445C',           // Font/default black
    dayHoverBackgroundColor: '#5B80F7', // CTA/Primary
    dayHoverTextColor: '#FFFFFF',
    todayBorderColor: '#5B80F7',       // CTA/Primary
    disabledTextColor: '#A3AAC2',      // Font/descriptions-placeholders
    outsideMonthOpacity: '1',          // Use direct color instead of opacity
    outsideMonthTextColor: '#A3AAC2',  // Font/descriptions-placeholders
    borderColor: '#E0E3EB',            // Background & outlines/sections & dividers
    navArrowHoverColor: '#5B80F7',     // CTA/Primary
    gridHoverBackgroundColor: '#C9D6FF', // CTA/Primary background
  },
  sidebar: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E0E3EB',            // Background & outlines/sections & dividers
    hoverBackgroundColor: '#F9F9FB',   // Surface/section (subtle hover)
  },
  footer: {
    clearTextColor: '#DC2626',         // CTA/Destructive
    doneBackgroundColor: '#1F222E',    // Background & outlines/Hyper dark
    doneTextColor: '#FFFFFF',
    borderColor: '#E0E3EB',            // Background & outlines/sections & dividers
  },
  states: {
    disabled: {
      opacity: '0.5',
      cursor: 'not-allowed',
    },
  },
  dropdown: {
    activeBackgroundColor: '#475569',
    activeTextColor: '#FFFFFF',
    inactiveBackgroundColor: '#F3F4F6',
    inactiveTextColor: '#3D445C',      // Font/default black
    clearIconColor: '#FFFFFF',
    clearIconHoverColor: '#FCA5A5',
  },
}

const defaultBadgeStyles = {
      base: {
        fontFamily: 'Noto Sans, sans-serif',
        fontWeight: '500',
        borderRadius: '4px',
      },
      types: {},
      variants: {
        black: { backgroundColor: '#000000', textColor: '#e6e6e6' },
        white: { backgroundColor: '#ffffff', textColor: '#2b2b2b', borderColor: '#e6e6e6' },
        coal: { backgroundColor: '#64739b', textColor: '#f2f2f2' },
        dlv_red: { backgroundColor: '#ed1b36', textColor: '#e6e6e6' },
        info: { backgroundColor: '#2396fb', textColor: '#e6e6e6' },
        success: { backgroundColor: '#1ba86e', textColor: '#e6e6e6' },
        warning: { backgroundColor: '#f5c828', textColor: '#7b6414' },
        error: { backgroundColor: '#dc143c', textColor: '#e6e6e6' },
        cardbox: { backgroundColor: '#b88b5c', textColor: '#e6e6e6' },
      },
      sizes: {
        sm: { padding: '2px 4px', fontSize: '10px', lineHeight: '12px', iconSize: '12px', gap: '2px' },
        md: { padding: '2px 6px', fontSize: '12px', lineHeight: '16px', iconSize: '12px', gap: '2px' },
        lg: { padding: '2px 6px', fontSize: '12px', lineHeight: '16px', iconSize: '16px', gap: '2px' },
      },
      states: {
        disabled: { backgroundColor: '#e6e6e6', textColor: '#cdcbcb', borderColor: 'transparent' },
        disabledOutlined: { backgroundColor: 'transparent', textColor: '#cdcbcb', borderColor: '#ededed' },
        ghost: { backgroundColor: '#e6e6e6', textColor: 'transparent', borderColor: 'transparent' },
      },
};

const defaultChipStyles = {
  base: {
    fontFamily: 'Noto Sans, sans-serif',
    fontWeight: '500',
    borderRadius: '8px',
    transition: 'all 0.15s ease-in-out',
    focus: { outline: 'none', ring: '0 0 0 2px rgba(0,0,0,0.4)' },
  },
  variants: {
    standard: {
      black: { backgroundColor: '#000000', textColor: '#e6e6e6', hoverColor: '#121212', pressedColor: '#1a1a1a', focusRingColor: 'rgba(0,0,0,0.4)' },
      white: { backgroundColor: '#ffffff', textColor: '#2b2b2b', hoverColor: '#f2f2f2', pressedColor: '#e6e6e6', focusRingColor: 'rgba(255,255,255,0.4)' },
      coal: { backgroundColor: '#64739b', textColor: '#e6e6e6', hoverColor: '#4e5d80', pressedColor: '#5a6a90', focusRingColor: 'rgba(0,0,0,0.4)' },
      blue: { backgroundColor: '#2396fb', textColor: '#e6e6e6', hoverColor: '#0d7de0', pressedColor: '#1a8af0', focusRingColor: 'rgba(35,150,251,0.4)' },
      success: { backgroundColor: '#1ba86e', textColor: '#e6e6e6', hoverColor: '#148a5a', pressedColor: '#189960', focusRingColor: 'rgba(27,168,110,0.4)' },
      error: { backgroundColor: '#dc143c', textColor: '#e6e6e6', hoverColor: '#b8102f', pressedColor: '#c41235', focusRingColor: 'rgba(220,20,60,0.4)' },
      warning: { backgroundColor: '#f5c828', textColor: '#52430d', hoverColor: '#ddb420', pressedColor: '#e6bc24', focusRingColor: 'rgba(245,200,40,0.4)' },
      legacy_blue: { backgroundColor: '#5b80f7', textColor: '#e6e6e6', hoverColor: '#4a6de0', pressedColor: '#5276f0', focusRingColor: 'rgba(0,0,0,0.4)' },
      dlv_red: { backgroundColor: '#ed1b36', textColor: '#e6e6e6', hoverColor: '#d0162e', pressedColor: '#de1832', focusRingColor: 'rgba(0,0,0,0.4)' },
    },
    outlined: {
      black: { backgroundColor: 'transparent', textColor: '#2b2b2b', borderColor: '#2b2b2b', hoverColor: '#f2f2f2', hoverBorderColor: '#1a1a1a', pressedColor: '#f2f2f2', focusRingColor: 'rgba(0,0,0,0.4)' },
      white: { backgroundColor: 'transparent', textColor: '#e6e6e6', borderColor: '#e6e6e6', hoverColor: 'rgba(255,255,255,0.1)', hoverBorderColor: '#cccccc', pressedColor: 'rgba(255,255,255,0.1)', focusRingColor: 'rgba(255,255,255,0.4)' },
      coal: { backgroundColor: 'transparent', textColor: '#64739b', borderColor: '#64739b', hoverColor: '#f0f2f7', hoverBorderColor: '#4e5d80', pressedColor: '#f0f2f7', focusRingColor: 'rgba(0,0,0,0.4)' },
      blue: { backgroundColor: 'transparent', textColor: '#2396fb', borderColor: '#2396fb', hoverColor: '#eef6ff', hoverBorderColor: '#0d7de0', pressedColor: '#eef6ff', focusRingColor: 'rgba(35,150,251,0.4)' },
      success: { backgroundColor: 'transparent', textColor: '#1ba86e', borderColor: '#1ba86e', hoverColor: '#edfaf4', hoverBorderColor: '#148a5a', pressedColor: '#edfaf4', focusRingColor: 'rgba(27,168,110,0.4)' },
      error: { backgroundColor: 'transparent', textColor: '#dc143c', borderColor: '#dc143c', hoverColor: '#fef0f2', hoverBorderColor: '#b8102f', pressedColor: '#fef0f2', focusRingColor: 'rgba(220,20,60,0.4)' },
      warning: { backgroundColor: 'transparent', textColor: '#7b6414', borderColor: '#f5c828', hoverColor: '#fef9e6', hoverBorderColor: '#ddb420', pressedColor: '#fef9e6', focusRingColor: 'rgba(245,200,40,0.4)' },
      legacy_blue: { backgroundColor: 'transparent', textColor: '#5b80f7', borderColor: '#5b80f7', hoverColor: '#f0f3ff', hoverBorderColor: '#4a6de0', pressedColor: '#f0f3ff', focusRingColor: 'rgba(0,0,0,0.4)' },
      dlv_red: { backgroundColor: 'transparent', textColor: '#ed1b36', borderColor: '#ed1b36', hoverColor: '#fef0f2', hoverBorderColor: '#d0162e', pressedColor: '#fef0f2', focusRingColor: 'rgba(0,0,0,0.4)' },
    },
  },
  sizes: {
    sm: { padding: '4px 6px', fontSize: '10px', lineHeight: '12px', iconSize: '12px', gap: '4px' },
    md: { padding: '4px 8px', fontSize: '12px', lineHeight: '16px', iconSize: '16px', gap: '4px' },
    lg: { padding: '6px 8px', fontSize: '14px', lineHeight: '20px', iconSize: '20px', gap: '4px' },
  },
  states: {
    disabled: { backgroundColor: '#e6e6e6', textColor: '#cdcbcb', borderColor: 'transparent' },
    disabledOutlined: { backgroundColor: 'transparent', textColor: '#cdcbcb', borderColor: '#ededed' },
    ghost: { backgroundColor: '#e6e6e6', textColor: 'transparent', borderColor: 'transparent' },
  },
};

const defaultAvatarStyles = {
  base: { transition: 'all 0.15s ease-in-out', focus: { outline: 'none', ring: '0 0 0 2px rgba(0,0,0,0.4)' } },
  default: {
    backgroundColor: '#2b2b2b', textColor: '#ffffff', borderColor: '#e6e6e6', borderWidth: '0.5',
    hoverBackgroundColor: '#000000', hoverTextColor: '#ffffff', hoverBorderColor: '#cccccc', hoverBorderWidth: '1',
    focusBackgroundColor: '#2b2b2b', focusTextColor: '#ffffff', focusBorderColor: '#e6e6e6', focusBorderWidth: '1',
    focusRingColor: 'rgba(0,0,0,0.4)',
  },
  sizes: {
    xl: { dimension: '48px', fontFamily: 'sans-serif', fontSize: '20px', lineHeight: '26px', fontWeight: '600', iconSize: '28px', statusDotSize: '12px', statusDotPadding: '2px' },
    lg: { dimension: '40px', fontFamily: 'sans-serif', fontSize: '16px', lineHeight: '24px', fontWeight: '600', iconSize: '28px', statusDotSize: '8px', statusDotPadding: '2px' },
    md: { dimension: '36px', fontFamily: 'sans-serif', fontSize: '14px', lineHeight: '20px', fontWeight: '600', iconSize: '24px', statusDotSize: '6px', statusDotPadding: '2px' },
    sm: { dimension: '28px', fontFamily: 'sans-serif', fontSize: '12px', lineHeight: '16px', fontWeight: '600', iconSize: '16px', statusDotSize: '6px', statusDotPadding: '2px' },
  },
  radius: { round: '999px', square: { xl: '8px', lg: '8px', md: '8px', sm: '4px' } },
  states: {
    disabled: { backgroundColor: '#e6e6e6', textColor: '#cdcbcb', imageOverlay: 'rgba(255,255,255,0.4)' },
    ghost: { backgroundColor: '#dedede' },
  },
  statusDot: { active: '#1ba86e', inactive: '#a0a0a0', idle: '#f5c828', brand: '#ed1b36' },
};

// Default Tarmac Input Field component configuration (fallback when no ThemeProvider)
export const defaultInputFieldTarmacStyles = {
  base: {
    fontFamily: 'Noto Sans, sans-serif',
    fontWeight: '400',
    radius: '4px',
    transition: 'all 0.15s ease-in-out',
    focusRingSpread: '2px',
  },
  types: {
    regular: {
      borderColor: '#e0e0e0',
      textColor: '#2b2b2b',
      placeholderColor: '#cdcbcb',
      helperTextColor: '#6b6b6b',
      statusTextColor: '#6b6b6b',
      hoverBorderColor: '#b0b0b0',
      activeBorderColor: '#808080',
      focusRingColor: 'rgba(0,0,0,0.3)',
      backgroundColor: '#ffffff',
      hoverBackgroundColor: '#ffffff',
      labelColor: '#2b2b2b',
      subtextColor: '#6b6b6b',
      addonBackgroundColor: '#f5f5f5',
      addonTextColor: '#6b6b6b',
      addonBorderColor: '#e0e0e0',
    },
    success: {
      borderColor: '#2e7d32',
      textColor: '#2b2b2b',
      placeholderColor: '#cdcbcb',
      helperTextColor: '#2e7d32',
      statusTextColor: '#2e7d32',
      hoverBorderColor: '#1b5e20',
      activeBorderColor: '#145218',
      focusRingColor: 'rgba(46,125,50,0.3)',
      backgroundColor: '#ffffff',
      hoverBackgroundColor: '#ffffff',
      labelColor: '#2b2b2b',
      subtextColor: '#6b6b6b',
      addonBackgroundColor: '#f5f5f5',
      addonTextColor: '#6b6b6b',
      addonBorderColor: '#2e7d32',
    },
    infoBlue: {
      borderColor: '#1565c0',
      textColor: '#2b2b2b',
      placeholderColor: '#cdcbcb',
      helperTextColor: '#1565c0',
      statusTextColor: '#1565c0',
      hoverBorderColor: '#0d47a1',
      activeBorderColor: '#0a3880',
      focusRingColor: 'rgba(21,101,192,0.3)',
      backgroundColor: '#ffffff',
      hoverBackgroundColor: '#ffffff',
      labelColor: '#2b2b2b',
      subtextColor: '#6b6b6b',
      addonBackgroundColor: '#f5f5f5',
      addonTextColor: '#6b6b6b',
      addonBorderColor: '#1565c0',
    },
    error: {
      borderColor: '#c62828',
      textColor: '#2b2b2b',
      placeholderColor: '#cdcbcb',
      helperTextColor: '#c62828',
      statusTextColor: '#c62828',
      hoverBorderColor: '#b71c1c',
      activeBorderColor: '#8e1414',
      focusRingColor: 'rgba(198,40,40,0.3)',
      backgroundColor: '#ffffff',
      hoverBackgroundColor: '#ffffff',
      labelColor: '#2b2b2b',
      subtextColor: '#6b6b6b',
      addonBackgroundColor: '#f5f5f5',
      addonTextColor: '#6b6b6b',
      addonBorderColor: '#c62828',
    },
  },
  sizes: {
    lg: {
      height: '48px',
      fontSize: '16px',
      lineHeight: '24px',
      paddingVertical: '12px',
      paddingHorizontal: '16px',
      iconSize: '20px',
      iconGap: '8px',
      titleFontSize: '14px',
      titleLineHeight: '20px',
      helperFontSize: '12px',
      helperLineHeight: '16px',
      titleIconSize: '16px',
      containerGap: '4px',
    },
    md: {
      height: '40px',
      fontSize: '14px',
      lineHeight: '20px',
      paddingVertical: '8px',
      paddingHorizontal: '12px',
      iconSize: '16px',
      iconGap: '8px',
      titleFontSize: '12px',
      titleLineHeight: '16px',
      helperFontSize: '12px',
      helperLineHeight: '16px',
      titleIconSize: '14px',
      containerGap: '4px',
    },
    sm: {
      height: '32px',
      fontSize: '12px',
      lineHeight: '16px',
      paddingVertical: '6px',
      paddingHorizontal: '8px',
      iconSize: '12px',
      iconGap: '6px',
      titleFontSize: '10px',
      titleLineHeight: '12px',
      helperFontSize: '10px',
      helperLineHeight: '12px',
      titleIconSize: '12px',
      containerGap: '2px',
    },
  },
  states: {
    disabled: {
      backgroundColor: '#f5f5f5',
      borderColor: '#ededed',
      textColor: '#cdcbcb',
      labelColor: '#cdcbcb',
      placeholderColor: '#cdcbcb',
      cursor: 'default',
    },
    ghost: {
      backgroundColor: '#ffffff',
      borderColor: 'transparent',
      textColor: 'transparent',
      labelColor: 'transparent',
      cursor: 'default',
      pointerEvents: 'none',
    },
  },
}

// Default Tarmac TextArea component configuration (fallback when no ThemeProvider)
export const defaultTextAreaTarmacStyles = {
  base: {
    fontFamily: 'Noto Sans, sans-serif',
    fontWeight: '500',
    radius: '4px',
    transition: 'all 0.15s ease-in-out',
    focusRingSpread: '2px',
  },
  types: {
    regular: {
      borderColor: '#e0e0e0',
      textColor: '#2b2b2b',
      placeholderColor: '#cdcbcb',
      helperTextColor: '#6b6b6b',
      statusTextColor: '#2b2b2b',
      hoverBorderColor: '#b0b0b0',
      activeBorderColor: '#b0b0b0',
      focusRingColor: 'rgba(0,0,0,0.3)',
      backgroundColor: '#ffffff',
      hoverBackgroundColor: '#ffffff',
      labelColor: '#2b2b2b',
      subtextColor: '#6b6b6b',
      descriptionColor: '#6b6b6b',
      iconColor: '#2b2b2b',
      disabledBorderColor: '#ededed',
      disabledTextColor: '#cdcbcb',
      disabledLabelColor: '#cdcbcb',
      disabledHelperTextColor: '#cdcbcb',
      disabledIconColor: '#cdcbcb',
      disabledStatusTextColor: '#cdcbcb',
      disabledSubtextColor: '#cdcbcb',
      disabledDescriptionColor: '#cdcbcb',
    },
    success: {
      borderColor: '#2e7d32',
      textColor: '#2b2b2b',
      placeholderColor: '#cdcbcb',
      helperTextColor: '#6b6b6b',
      statusTextColor: '#2e7d32',
      hoverBorderColor: '#1b5e20',
      activeBorderColor: '#1b5e20',
      focusRingColor: 'rgba(46,125,50,0.3)',
      backgroundColor: '#ffffff',
      hoverBackgroundColor: '#ffffff',
      labelColor: '#2b2b2b',
      subtextColor: '#6b6b6b',
      descriptionColor: '#6b6b6b',
      iconColor: '#2e7d32',
      disabledBorderColor: '#a5d6a7',
      disabledTextColor: '#cdcbcb',
      disabledLabelColor: '#cdcbcb',
      disabledHelperTextColor: '#cdcbcb',
      disabledIconColor: '#a5d6a7',
      disabledStatusTextColor: '#a5d6a7',
      disabledSubtextColor: '#cdcbcb',
      disabledDescriptionColor: '#cdcbcb',
    },
    error: {
      borderColor: '#c62828',
      textColor: '#2b2b2b',
      placeholderColor: '#cdcbcb',
      helperTextColor: '#6b6b6b',
      statusTextColor: '#c62828',
      hoverBorderColor: '#b71c1c',
      activeBorderColor: '#b71c1c',
      focusRingColor: 'rgba(198,40,40,0.3)',
      backgroundColor: '#ffffff',
      hoverBackgroundColor: '#ffffff',
      labelColor: '#2b2b2b',
      subtextColor: '#6b6b6b',
      descriptionColor: '#6b6b6b',
      iconColor: '#c62828',
      disabledBorderColor: '#ef9a9a',
      disabledTextColor: '#cdcbcb',
      disabledLabelColor: '#cdcbcb',
      disabledHelperTextColor: '#cdcbcb',
      disabledIconColor: '#ef9a9a',
      disabledStatusTextColor: '#ef9a9a',
      disabledSubtextColor: '#cdcbcb',
      disabledDescriptionColor: '#cdcbcb',
    },
    infoBlue: {
      borderColor: '#1565c0',
      textColor: '#2b2b2b',
      placeholderColor: '#cdcbcb',
      helperTextColor: '#6b6b6b',
      statusTextColor: '#1565c0',
      hoverBorderColor: '#0d47a1',
      activeBorderColor: '#0d47a1',
      focusRingColor: 'rgba(21,101,192,0.3)',
      backgroundColor: '#ffffff',
      hoverBackgroundColor: '#ffffff',
      labelColor: '#2b2b2b',
      subtextColor: '#6b6b6b',
      descriptionColor: '#6b6b6b',
      iconColor: '#1565c0',
      disabledBorderColor: '#90caf9',
      disabledTextColor: '#cdcbcb',
      disabledLabelColor: '#cdcbcb',
      disabledHelperTextColor: '#cdcbcb',
      disabledIconColor: '#90caf9',
      disabledStatusTextColor: '#90caf9',
      disabledSubtextColor: '#cdcbcb',
      disabledDescriptionColor: '#cdcbcb',
    },
  },
  sizes: {
    lg: {
      minHeight: '120px',
      fontSize: '16px',
      lineHeight: '24px',
      paddingVertical: '12px',
      paddingHorizontal: '12px',
      iconSize: '20px',
      iconGap: '8px',
      titleFontSize: '14px',
      titleLineHeight: '20px',
      helperFontSize: '12px',
      helperLineHeight: '16px',
      descriptionFontSize: '12px',
      descriptionLineHeight: '16px',
      titleIconSize: '20px',
      containerGap: '8px',
      tagsGap: '4px',
    },
    md: {
      minHeight: '96px',
      fontSize: '14px',
      lineHeight: '20px',
      paddingVertical: '12px',
      paddingHorizontal: '12px',
      iconSize: '20px',
      iconGap: '8px',
      titleFontSize: '14px',
      titleLineHeight: '20px',
      helperFontSize: '12px',
      helperLineHeight: '16px',
      descriptionFontSize: '12px',
      descriptionLineHeight: '16px',
      titleIconSize: '20px',
      containerGap: '8px',
      tagsGap: '4px',
    },
    sm: {
      minHeight: '72px',
      fontSize: '14px',
      lineHeight: '20px',
      paddingVertical: '8px',
      paddingHorizontal: '12px',
      iconSize: '20px',
      iconGap: '6px',
      titleFontSize: '14px',
      titleLineHeight: '20px',
      helperFontSize: '12px',
      helperLineHeight: '16px',
      descriptionFontSize: '12px',
      descriptionLineHeight: '16px',
      titleIconSize: '20px',
      containerGap: '6px',
      tagsGap: '4px',
    },
  },
  states: {
    disabled: {
      backgroundColor: '#ffffff',
      borderColor: '#ededed',
      textColor: '#cdcbcb',
      labelColor: '#cdcbcb',
      placeholderColor: '#cdcbcb',
      helperTextColor: '#cdcbcb',
      mandatoryColor: '#ef9a9a',
      statusTextColor: '#cdcbcb',
      subtextColor: '#cdcbcb',
      descriptionColor: '#cdcbcb',
      cursor: 'default',
    },
    ghost: {
      backgroundColor: '#ededed',
      borderColor: 'transparent',
      textColor: 'transparent',
      labelColor: 'transparent',
      cursor: 'default',
      pointerEvents: 'none',
      skeletonTitleWidth: '100px',
      skeletonTitleHeight: '12px',
      skeletonTitleRadius: '12px',
      skeletonInputHeight: '80px',
      skeletonInputRadius: '4px',
    },
  },
}

// Default Tarmac Dropdown component configuration (fallback when no ThemeProvider)
export const defaultDropdownTarmacStyles = {
  base: {
    fontFamily: 'Noto Sans, sans-serif',
    fontWeight: '500',
    radius: '4px',
    transition: 'all 0.15s ease-in-out',
    focusRingSpread: '2px',
  },
  inputField: {
    types: {
      regular: {
        borderColor: '#e0e0e0',
        textColor: '#2b2b2b',
        placeholderColor: '#cdcbcb',
        helperTextColor: '#6b6b6b',
        statusTextColor: '#2b2b2b',
        hoverBorderColor: '#b0b0b0',
        activeBorderColor: '#b0b0b0',
        focusRingColor: 'rgba(0,0,0,0.3)',
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        labelColor: '#2b2b2b',
        subtextColor: '#6b6b6b',
        iconColor: '#2b2b2b',
        disabledBorderColor: '#ededed',
        disabledTextColor: '#cdcbcb',
        disabledLabelColor: '#cdcbcb',
        disabledHelperTextColor: '#cdcbcb',
        disabledIconColor: '#cdcbcb',
        disabledStatusTextColor: '#cdcbcb',
        disabledSubtextColor: '#cdcbcb',
      },
    },
    sizes: {
      lg: {
        height: '48px',
        fontSize: '16px',
        lineHeight: '24px',
        paddingVertical: '12px',
        paddingHorizontal: '12px',
        iconSize: '20px',
        iconGap: '8px',
        titleFontSize: '14px',
        titleLineHeight: '20px',
        helperFontSize: '12px',
        helperLineHeight: '16px',
        titleIconSize: '20px',
        containerGap: '8px',
        toggleSize: '20px',
      },
      md: {
        height: '40px',
        fontSize: '14px',
        lineHeight: '20px',
        paddingVertical: '12px',
        paddingHorizontal: '12px',
        iconSize: '20px',
        iconGap: '8px',
        titleFontSize: '14px',
        titleLineHeight: '20px',
        helperFontSize: '12px',
        helperLineHeight: '16px',
        titleIconSize: '20px',
        containerGap: '8px',
        toggleSize: '20px',
      },
      sm: {
        height: '32px',
        fontSize: '14px',
        lineHeight: '20px',
        paddingVertical: '8px',
        paddingHorizontal: '12px',
        iconSize: '20px',
        iconGap: '6px',
        titleFontSize: '14px',
        titleLineHeight: '20px',
        helperFontSize: '12px',
        helperLineHeight: '16px',
        titleIconSize: '20px',
        containerGap: '6px',
        toggleSize: '20px',
      },
    },
    addon: {
      backgroundColor: '#dedede',
      textColor: '#2b2b2b',
      borderColor: '#e0e0e0',
      fontWeight: '500',
    },
  },
  dropCell: {
    styles: {
      regular: {
        textColor: '#2b2b2b',
        descriptionColor: '#6b6b6b',
        backgroundColor: 'transparent',
        hoverBackgroundColor: '#f5f5f5',
        pressedBackgroundColor: '#ededed',
        disabledTextColor: '#cdcbcb',
        iconColor: '#2b2b2b',
        checkboxVariant: 'Standard',
      },
      infoBlue: {
        textColor: '#1565c0',
        descriptionColor: '#42a5f5',
        backgroundColor: 'transparent',
        hoverBackgroundColor: '#e3f2fd',
        pressedBackgroundColor: '#bbdefb',
        disabledTextColor: '#cdcbcb',
        iconColor: '#1565c0',
        checkboxVariant: 'blue',
      },
    },
    sizes: {
      lg: {
        height: '48px',
        fontSize: '16px',
        lineHeight: '24px',
        descriptionFontSize: '12px',
        descriptionLineHeight: '16px',
        paddingVertical: '8px',
        paddingHorizontal: '8px',
        iconSize: '20px',
        gap: '8px',
      },
      md: {
        height: '40px',
        fontSize: '14px',
        lineHeight: '20px',
        descriptionFontSize: '12px',
        descriptionLineHeight: '16px',
        paddingVertical: '8px',
        paddingHorizontal: '8px',
        iconSize: '20px',
        gap: '8px',
      },
      sm: {
        height: '32px',
        fontSize: '14px',
        lineHeight: '20px',
        descriptionFontSize: '12px',
        descriptionLineHeight: '16px',
        paddingVertical: '6px',
        paddingHorizontal: '8px',
        iconSize: '20px',
        gap: '6px',
      },
    },
  },
  list: {
    backgroundColor: '#ffffff',
    borderColor: '#e0e0e0',
    borderRadius: '4px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    scrollbarColor: '#dedede',
    scrollbarWidth: '4px',
    zIndex: 50,
  },
  sectionHeader: {
    color: '#999999',
    fontFamily: 'Noto Sans, sans-serif',
    fontSize: '10px',
    lineHeight: '12px',
    paddingTop: '8px',
    paddingBottom: '2px',
    paddingHorizontal: '8px',
  },
  footer: {
    borderTopColor: '#e0e0e0',
    padding: '8px',
    gap: '8px',
  },
  search: {
    borderColor: '#e0e0e0',
    backgroundColor: '#ffffff',
    textColor: '#2b2b2b',
    placeholderColor: '#cdcbcb',
    iconColor: '#6b6b6b',
  },
  states: {
    disabled: {
      backgroundColor: '#ffffff',
      borderColor: '#ededed',
      textColor: '#cdcbcb',
      labelColor: '#cdcbcb',
      placeholderColor: '#cdcbcb',
      helperTextColor: '#cdcbcb',
      mandatoryColor: '#ef9a9a',
      statusTextColor: '#cdcbcb',
      subtextColor: '#cdcbcb',
      cursor: 'default',
    },
    ghost: {
      backgroundColor: '#ededed',
      borderColor: 'transparent',
      textColor: 'transparent',
      labelColor: 'transparent',
      cursor: 'default',
      pointerEvents: 'none',
      skeletonTitleWidth: '100px',
      skeletonTitleHeight: '12px',
      skeletonTitleRadius: '12px',
      skeletonInputHeight: '40px',
      skeletonInputRadius: '4px',
    },
  },
}

// Default Tarmac Card component configuration (fallback when no ThemeProvider)
export const defaultCardTarmacStyles = {
  base: {
    fontFamily: 'Noto Sans, sans-serif',
    headingFontFamily: 'Noto Sans, sans-serif',
    captionFontFamily: 'Noto Sans, sans-serif',
    fontWeight: '500',
    radius: '4px',
    transition: 'all 0.15s ease-in-out',
    focusRingSpread: '2px',
  },
  selectionCard: {
    types: {
      radio: { indicatorComponent: 'Radio' },
      checkbox: { indicatorComponent: 'Checkbox' },
    },
    sizes: {
      lg: { padding: '16px', gap: '12px', titleFontSize: '14px', titleLineHeight: '20px', subtextFontSize: '12px', subtextLineHeight: '16px', trailingIconSize: '20px', statusDotSize: '8px' },
      sm: { padding: '12px', gap: '8px', titleFontSize: '12px', titleLineHeight: '16px', subtextFontSize: '10px', subtextLineHeight: '14px', trailingIconSize: '16px', statusDotSize: '6px' },
    },
    states: {
      default: { borderColor: '#e6e6e6', backgroundColor: '#fff', titleColor: '#2b2b2b', subtextColor: '#666', iconColor: '#2b2b2b' },
      hover: { borderColor: '#999', backgroundColor: '#f5f5f5' },
      pressed: { borderColor: '#999', backgroundColor: '#ebebeb' },
      focused: { focusRingColor: 'rgba(0,0,0,0.4)' },
      selected: { borderColor: '#1a73e8', backgroundColor: '#e8f0fe' },
      disabled: { borderColor: '#ededed', backgroundColor: '#fff', titleColor: '#cdcbcb', subtextColor: '#cdcbcb', iconColor: '#cdcbcb', cursor: 'default' },
      ghost: { backgroundColor: '#dedede', borderColor: 'transparent', cursor: 'default', pointerEvents: 'none', skeletonWidth: '100%', skeletonHeight: '48px', skeletonRadius: '4px' },
    },
  },
  infoCard: {
    styles: {
      slots: { slotLeadingSize: '48px', slotLeadingBg: '#e8f0fe', slotTrailingSize: '32px', slotTrailingBg: '#e8f0fe', titleFontFamily: 'Noto Sans, sans-serif', titleFontWeight: '600', titleFontSize: '24px', titleLineHeight: '32px', gap: '8px' },
      slotTop: { imageAreaHeight: '120px', titleFontSize: '14px', titleLineHeight: '20px', contentPadding: '12px', gap: '4px' },
      slotBanner: { bannerHeight: '120px', titleFontSize: '14px', titleLineHeight: '20px', contentPadding: '12px', gap: '4px' },
      regular: { titleFontSize: '14px', titleLineHeight: '20px', padding: '12px', gap: '8px' },
    },
    states: {
      default: { borderColor: '#e6e6e6', backgroundColor: '#fff', titleColor: '#2b2b2b', subtitleColor: '#666', subtextColor: '#666', iconColor: '#2b2b2b' },
      hover: { borderColor: '#999', backgroundColor: '#f5f5f5' },
      focused: { focusRingColor: 'rgba(0,0,0,0.4)' },
      disabled: { borderColor: '#ededed', backgroundColor: '#fff', titleColor: '#cdcbcb', subtitleColor: '#cdcbcb', subtextColor: '#cdcbcb', iconColor: '#cdcbcb', cursor: 'default' },
      ghost: { backgroundColor: '#dedede', borderColor: 'transparent', cursor: 'default', pointerEvents: 'none', skeletonWidth: '100%', skeletonHeight: '80px', skeletonRadius: '4px' },
    },
  },
  card: {
    base: { padding: '12px', gap: '8px', borderWidth: '1px', borderRadius: '6px', width: '328px', headerGap: '8px', subitemsGap: '39px', subitemInnerGap: '4px', buttonsGap: '6px', iconSize: '20px', stepperIconSize: '20px', titleFontSize: '14px', titleLineHeight: '20px', titleFontWeight: '500', captionFontSize: '12px', captionLineHeight: '16px' },
    variants: {
      standard: {}, standardType2: {}, slotBanner: { bannerHeight: '120px' }, standardPills: {}, standardIconButtons: {},
      infoSets: { infoSetGap: '16px', labelFontSize: '12px', labelLineHeight: '16px', valueFontSize: '16px', valueLineHeight: '24px', valueFontWeight: '600' },
      badgeBottom: {}, buttonsTacked: {},
    },
    states: {
      default: { borderColor: '#e6e6e6', backgroundColor: '#fff', titleColor: '#2b2b2b', subtextColor: '#666', iconColor: '#2b2b2b', subitemLabelColor: '#2b2b2b', stepperBgColor: '#1a73e8', stepperTextColor: '#fff', statusIndicatorColor: '#1a73e8' },
      hover: { borderColor: '#999', backgroundColor: '#f5f5f5' },
      focused: { focusRingColor: 'rgba(0,0,0,0.4)' },
      disabled: { borderColor: '#ededed', backgroundColor: '#fff', titleColor: '#cdcbcb', subtextColor: '#cdcbcb', iconColor: '#cdcbcb', subitemLabelColor: '#cdcbcb', stepperBgColor: '#f5f5f5', stepperTextColor: '#cdcbcb', statusIndicatorColor: '#cdcbcb', cursor: 'default' },
      ghost: { backgroundColor: '#dedede', borderColor: 'transparent', cursor: 'default', pointerEvents: 'none', skeletonWidth: '100%', skeletonHeight: '120px', skeletonRadius: '4px' },
    },
  },
}

// Default Tarmac OTP Fields component configuration (fallback when no ThemeProvider)
export const defaultOtpFieldsTarmacStyles = {
  base: {
    fontFamily: 'Noto Sans, sans-serif',
    captionFontFamily: 'Noto Sans, sans-serif',
    fontWeight: '500',
    radius: '6px',
    borderWidth: '1px',
    transition: 'all 0.15s ease-in-out',
    focusRingSpread: '2px',
    inputBoxGap: '8px',
    rowGap: '6px',
    titleIconGap: '4px',
    titleIconSize: '20px',
  },
  styles: {
    default: {
      borderColor: '#e6e6e6',
      backgroundColor: '#ffffff',
      textColor: '#2b2b2b',
      placeholderColor: '#cdcbcb',
      hoverBorderColor: '#cccccc',
      hoverBackgroundColor: '#ffffff',
      hoverTitleColor: '#2b2b2b',
      hoverTitleIconColor: '#2b2b2b',
      hoverHelperTextColor: '#454545',
      activeBorderColor: '#cccccc',
      focusBorderColor: '#cccccc',
      focusRingColor: 'rgba(0,0,0,0.4)',
      titleColor: '#808080',
      titleIconColor: '#808080',
      helperTextTopColor: '#666666',
      helperTextBottomColor: '#666666',
      subtextColor: '#666666',
    },
    success: {
      borderColor: '#e6e6e6',
      backgroundColor: '#ffffff',
      textColor: '#2b2b2b',
      placeholderColor: '#cdcbcb',
      hoverBorderColor: '#cccccc',
      hoverBackgroundColor: '#ffffff',
      hoverTitleColor: '#2b2b2b',
      hoverTitleIconColor: '#2b2b2b',
      hoverHelperTextColor: '#454545',
      activeBorderColor: '#cccccc',
      focusBorderColor: '#cccccc',
      focusRingColor: 'rgba(0,0,0,0.4)',
      titleColor: '#808080',
      titleIconColor: '#808080',
      helperTextTopColor: '#666666',
      helperTextBottomColor: '#666666',
      subtextColor: '#1ba86e',
    },
    error: {
      borderColor: '#e6e6e6',
      backgroundColor: '#ffffff',
      textColor: '#2b2b2b',
      placeholderColor: '#cdcbcb',
      hoverBorderColor: '#cccccc',
      hoverBackgroundColor: '#ffffff',
      hoverTitleColor: '#2b2b2b',
      hoverTitleIconColor: '#2b2b2b',
      hoverHelperTextColor: '#454545',
      activeBorderColor: '#cccccc',
      focusBorderColor: '#cccccc',
      focusRingColor: 'rgba(0,0,0,0.4)',
      titleColor: '#808080',
      titleIconColor: '#808080',
      helperTextTopColor: '#666666',
      helperTextBottomColor: '#666666',
      subtextColor: '#dc143c',
    },
    info: {
      borderColor: '#e6e6e6',
      backgroundColor: '#ffffff',
      textColor: '#2b2b2b',
      placeholderColor: '#cdcbcb',
      hoverBorderColor: '#cccccc',
      hoverBackgroundColor: '#ffffff',
      hoverTitleColor: '#2b2b2b',
      hoverTitleIconColor: '#2b2b2b',
      hoverHelperTextColor: '#454545',
      activeBorderColor: '#cccccc',
      focusBorderColor: '#cccccc',
      focusRingColor: 'rgba(0,0,0,0.4)',
      titleColor: '#808080',
      titleIconColor: '#808080',
      helperTextTopColor: '#666666',
      helperTextBottomColor: '#666666',
      subtextColor: '#2396fb',
    },
  },
  sizes: {
    lg: {
      inputBoxHeight: '48px',
      inputBoxWidth: '48px',
      inputFontSize: '16px',
      inputLineHeight: '24px',
      titleFontSize: '14px',
      titleLineHeight: '20px',
      captionFontSize: '12px',
      captionLineHeight: '16px',
      titleFontWeight: '500',
    },
    md: {
      inputBoxHeight: '40px',
      inputBoxWidth: '40px',
      inputFontSize: '14px',
      inputLineHeight: '20px',
      titleFontSize: '12px',
      titleLineHeight: '16px',
      captionFontSize: '10px',
      captionLineHeight: '14px',
      titleFontWeight: '500',
    },
    sm: {
      inputBoxHeight: '32px',
      inputBoxWidth: '32px',
      inputFontSize: '12px',
      inputLineHeight: '16px',
      titleFontSize: '10px',
      titleLineHeight: '14px',
      captionFontSize: '8px',
      captionLineHeight: '12px',
      titleFontWeight: '500',
    },
  },
  states: {
    disabled: {
      backgroundColor: '#f5f5f5',
      borderColor: '#ededed',
      textColor: '#cdcbcb',
      placeholderColor: '#cdcbcb',
      titleColor: '#cdcbcb',
      titleIconColor: '#cdcbcb',
      helperTextTopColor: '#cdcbcb',
      helperTextBottomColor: '#cdcbcb',
      subtextColor: '#cdcbcb',
      cursor: 'default',
    },
    ghost: {
      skeletonBackgroundColor: '#ededed',
      skeletonRadius: '6px',
      skeletonTitleRadius: '12px',
      pointerEvents: 'none',
      cursor: 'default',
    },
  },
}

// Default Tarmac SearchDropdown component configuration (fallback when no ThemeProvider)
export const defaultSearchDropdownTarmacStyles = {
  base: {
    fontFamily: '{{Font_Family/body}}, sans-serif',
    captionFontFamily: '{{Font_Family/caption}}, sans-serif',
    fontWeight: '500',
    radius: '{{Radius/Default}}',
    listRadius: '{{Radius/Default}}',
    transition: 'all 0.15s ease-in-out',
    focusRingSpread: '{{Spacing/2}}',
  },
  searchField: {
    borderColor: '{{Border/Neutral/Primary}}',
    backgroundColor: '{{Surface/BG_Primary/Default}}',
    textColor: '{{Text/Body/Primary}}',
    placeholderColor: '{{Text/Body/Base}}',
    iconColor: '{{Text/Body/Base}}',
    hoverBorderColor: '{{Border/Neutral/Tertiary}}',
    hoverBackgroundColor: '{{Surface/BG_Primary/Default}}',
    activeBorderColor: '{{Border/Neutral/Tertiary}}',
    activeBackgroundColor: '{{Surface/BG_Primary/Default}}',
    focusRingColor: '{{Alpha/Black/300}}',
    borderWidth: '{{Stroke/Default}}',
    sizes: {
      lg: {
        height: '{{Scale/1200}}',
        fontSize: '{{Scale/600}}',
        lineHeight: '{{Scale/800}}',
        padding: '{{Spacing/12}}',
        gap: '{{Spacing/4}}',
        iconSize: '{{Scale/800}}',
      },
      md: {
        height: '{{Scale/1100}}',
        fontSize: '{{Scale/550}}',
        lineHeight: '{{Scale/700}}',
        padding: '{{Spacing/12}}',
        gap: '{{Spacing/4}}',
        iconSize: '{{Scale/700}}',
      },
      sm: {
        height: '{{Scale/900}}',
        fontSize: '{{Scale/500}}',
        lineHeight: '{{Scale/600}}',
        paddingHorizontal: '{{Spacing/12}}',
        paddingVertical: '{{Spacing/8}}',
        gap: '{{Spacing/4}}',
        iconSize: '{{Scale/600}}',
      },
    },
  },
  searchCell: {
    styles: {
      regular: {
        textColor: '{{Text/Body/Primary}}',
        descriptionColor: '{{Text/Caption/Base}}',
        backgroundColor: 'transparent',
        hoverBackgroundColor: '{{Surface/BG_Primary/Strong}}',
        activeBackgroundColor: '{{Surface/BG_Primary/Stronger}}',
        disabledTextColor: '{{Text/Body/Disabled}}',
        iconColor: '{{Icon/Body/Primary}}',
      },
      blue: {
        textColor: '{{Text/Body/Primary}}',
        descriptionColor: '{{Text/Caption/Base}}',
        backgroundColor: 'transparent',
        hoverBackgroundColor: '{{Surface/BG_Blue/Weakest}}',
        activeBackgroundColor: '{{Surface/BG_Blue/Weaker}}',
        disabledTextColor: '{{Text/Body/Disabled}}',
        iconColor: '{{Icon/Info_Blue/Primary}}',
      },
    },
    sizes: {
      lg: {
        fontSize: '{{Scale/600}}',
        lineHeight: '{{Scale/800}}',
        descriptionFontSize: '{{Scale/500}}',
        descriptionLineHeight: '{{Scale/600}}',
        padding: '{{Spacing/12}}',
        gap: '{{Spacing/8}}',
        iconSize: '{{Scale/800}}',
      },
      md: {
        fontSize: '{{Scale/550}}',
        lineHeight: '{{Scale/700}}',
        descriptionFontSize: '{{Scale/500}}',
        descriptionLineHeight: '{{Scale/600}}',
        padding: '{{Spacing/12}}',
        gap: '{{Spacing/8}}',
        iconSize: '{{Scale/700}}',
      },
      sm: {
        fontSize: '{{Scale/500}}',
        lineHeight: '{{Scale/600}}',
        descriptionFontSize: '{{Scale/500}}',
        descriptionLineHeight: '{{Scale/600}}',
        padding: '{{Spacing/12}}',
        gap: '{{Spacing/8}}',
        iconSize: '{{Scale/600}}',
      },
    },
  },
  list: {
    backgroundColor: '{{Surface/BG_Primary/Default}}',
    borderColor: '{{Border/Neutral/Primary}}',
    borderWidth: '{{Stroke/Default}}',
    borderRadiusBottomLeft: '{{Radius/Default}}',
    borderRadiusBottomRight: '{{Radius/Default}}',
    scrollbarColor: '{{Surface/BG_Primary/Subtle}}',
    scrollbarWidth: '{{Spacing/4}}',
    scrollbarRadius: '{{Radius/Max}}',
    scrollbarPaddingX: '{{Spacing/4}}',
    scrollbarPaddingY: '{{Spacing/24}}',
  },
  tagsRow: {
    padding: '{{Spacing/8}}',
    gap: '{{Spacing/4}}',
  },
  sectionHeader: {
    color: '{{Text/Caption/Base}}',
    fontFamily: '{{Font_Family/caption}}, sans-serif',
    fontSize: '{{Scale/450}}',
    lineHeight: '{{Scale/500}}',
    paddingTop: '{{Spacing/8}}',
    paddingBottom: '{{Spacing/2}}',
    paddingHorizontal: '{{Spacing/8}}',
  },
  searchHistoryLabel: {
    color: '{{Text/Caption/Primary}}',
    fontFamily: '{{Font_Family/caption}}, sans-serif',
    fontSize: '{{Scale/500}}',
    lineHeight: '{{Scale/600}}',
    iconSize: '{{Scale/600}}',
    padding: '{{Spacing/8}}',
    gap: '{{Spacing/4}}',
  },
  divider: {
    color: '{{Border/Neutral/Primary}}',
    height: '{{Stroke/Default}}',
  },
  footer: {
    borderTopColor: '{{Border/Neutral/Primary}}',
    padding: '{{Spacing/8}}',
    gap: '{{Spacing/8}}',
  },
  states: {
    disabled: {
      backgroundColor: '{{Surface/BG_Primary/Default}}',
      borderColor: '{{Border/Neutral/Secondary}}',
      textColor: '{{Text/Body/Disabled}}',
      placeholderColor: '{{Text/Body/Disabled}}',
      iconColor: '{{Icon/Body/Disabled}}',
      cursor: 'default',
    },
    ghost: {
      backgroundColor: '{{Surface/BG_Primary/Strong}}',
      borderColor: 'transparent',
      textColor: 'transparent',
      cursor: 'default',
      pointerEvents: 'none',
      skeletonFieldHeight: '{{Scale/1100}}',
      skeletonFieldRadius: '{{Radius/Default}}',
    },
  },
}

// Default theme configuration
export const defaultThemeConfig: ThemeConfig = {
  colors: defaultColors,
  components: {
    button: defaultButtonStyles,
    card: defaultCardStyles,
    floatingButton: {
      ...defaultButtonStyles,
      // Customize specific properties for floating buttons
      base: {
        ...defaultButtonStyles.base,
        transition: 'transition-all duration-300 ease-in-out',
        radius: {
          default: 'rounded-full',
          rounded: 'rounded-full',
        },
      },
      // Add specific floating button variants if needed
      variants: {
        ...defaultButtonStyles.variants,
        primary: {
          ...defaultButtonStyles.variants.primary,
          // Override primary variant for floating buttons if needed
        },
      },
      // Custom sizing for floating buttons
      sizes: {
        sm: {
          ...defaultButtonStyles.sizes.sm,
          padding: 'p-2', // Less padding for floating buttons
        },
        md: {
          ...defaultButtonStyles.sizes.md,
          padding: 'p-3',
        },
        lg: {
          ...defaultButtonStyles.sizes.lg,
          padding: 'p-4',
        },
      },
    },
    modal: defaultModalStyles,
    spinner: defaultSpinnerStyles,
    pill: defaultPillStyles,
    pill_tarmac: defaultPillTarmacStyles,
    input: defaultInputStyles,
    dropdown: defaultDropdownStyles,
    switch: defaultSwitchStyles,
    steps: defaultStepsStyles,
    collapse: defaultCollapseStyles,
    alert: defaultAlertStyles,
    upload: defaultUploadStyles,
    toggle: defaultToggleStyles,
    tooltip: defaultTooltipStyles,
    sidebar: defaultSidebarStyles,
    toast: defaultToastStyles,
    radio: defaultRadioStyles,
    checkbox: defaultCheckboxStyles,
    table: defaultTableStyles,
    pagination: defaultPaginationStyles,
    tabs: defaultTabsStyles,
    inputTag: defaultInputTagStyles,
    map: defaultMapStyles,
    audioPlayer: defaultAudioPlayerStyles,
    uploadV2: defaultUploadV2Styles,
    dateRangePicker: defaultDateRangePickerStyles,
    badge: defaultBadgeStyles,
    avatar: defaultAvatarStyles,
    chip: defaultChipStyles,
    inputField_tarmac: defaultInputFieldTarmacStyles,
    textArea_tarmac: defaultTextAreaTarmacStyles,
    dropdown_tarmac: defaultDropdownTarmacStyles,
    card_tarmac: defaultCardTarmacStyles,
    otpFields_tarmac: defaultOtpFieldsTarmacStyles,
    searchDropdown_tarmac: defaultSearchDropdownTarmacStyles,
    divider: {
      base: { color: '#cccccc', dashPattern: '6 6' },
      sizes: {
        '0.5': { strokeWeight: '0.5px' },
        '1': { strokeWeight: '1px' },
        '1.5': { strokeWeight: '1.5px' },
      },
    },
    pagination_tarmac: {
      base: {
        fontFamily: 'Noto Sans, sans-serif',
        captionFontFamily: 'Noto Sans, sans-serif',
        fontWeightMedium: '500',
        fontWeightSemibold: '600',
        radius: '4',
        transition: 'all 0.15s ease-in-out',
      },
      numberCell: {
        backgroundColor: '#ffffff',
        textColor: '#2b2b2b',
        borderRadius: '4',
        paddingX: '8',
        paddingY: '4',
        styles: {
          black: { activeBackgroundColor: '#2b2b2b', activeTextColor: '#f7f7f7' },
          legacyBlue: { activeBackgroundColor: '#5b80f7', activeTextColor: '#f7f7f7' },
          dlvRed: { activeBackgroundColor: '#ed1b36', activeTextColor: '#f7f7f7' },
        },
        sizes: {
          lg: { width: '40', height: '40', fontFamily: 'Noto Sans, sans-serif', fontSize: '16', lineHeight: '24', fontWeight: '500' },
          md: { width: '34', height: '34', fontFamily: 'Noto Sans, sans-serif', fontSize: '14', lineHeight: '20', fontWeight: '500' },
          sm: { width: '28', height: '28', fontFamily: 'Noto Sans, sans-serif', fontSize: '12', lineHeight: '16', fontWeight: '500' },
          xs: { width: '24', height: '24', fontFamily: 'Noto Sans, sans-serif', fontSize: '10', lineHeight: '12', fontWeight: '500' },
        },
        states: {
          hover: { backgroundColor: '#ffffff', textColor: '#2b2b2b', borderTopColor: '#e6e5e5', borderRadius: '0' },
          focused: { backgroundColor: '#ffffff', textColor: '#2b2b2b', borderColor: '#e6e5e5', borderWidth: '1', borderRadius: '4' },
          disabled: { backgroundColor: '#ffffff', textColor: '#cdcbcb', cursor: 'default' },
        },
      },
      numberCellGroup: {
        gap: '0',
        sizes: {
          lg: { chevronSize: '24', wrapperGap: '6' },
          md: { chevronSize: '20', wrapperGap: '6' },
          sm: { chevronSize: '16', wrapperGap: '8' },
        },
      },
      textCell: {
        padding: '4',
        states: {
          default: { textColor: '#666666', fontWeight: '500' },
          hover: { textColor: '#2b2b2b', fontWeight: '500', cursor: 'pointer' },
          pressed: { textColor: '#2b2b2b', fontWeight: '600' },
        },
        sizes: {
          lg: { iconSize: '24', fontFamily: 'Noto Sans, sans-serif', fontSize: '16', lineHeight: '24', gap: '6' },
          md: { iconSize: '20', fontFamily: 'Noto Sans, sans-serif', fontSize: '14', lineHeight: '20', gap: '6' },
          sm: { iconSize: '12', fontFamily: 'Noto Sans, sans-serif', fontSize: '12', lineHeight: '16', gap: '6' },
        },
      },
      textGroup: {
        left: { gap: '6' },
        right: { gap: '2' },
      },
      divider: {
        color: '#e6e5e5',
        width: '0.5',
        height: '100%',
      },
      assembled: {
        backgroundColor: '#ffffff',
        justifyContent: 'space-between',
        sizes: {
          lg: { paddingX: '12', paddingY: '12' },
          md: { paddingX: '12', paddingY: '8' },
          sm: { paddingX: '12', paddingY: '8' },
        },
        sizeMapping: {
          lg: { numberCell: 'lg', textCell: 'lg' },
          md: { numberCell: 'md', textCell: 'md' },
          sm: { numberCell: 'sm', textCell: 'md' },
        },
      },
      states: {
        disabled: {
          textColor: '#cdcbcb',
          iconColor: '#cdcbcb',
          cursor: 'default',
        },
      },
    },
    sideDrawer: {
      base: {
        backgroundColor: '#ffffff',
        textColor: '#2B2B2B',
        borderRadius: '8px 0 0 8px',
        boxShadow: '-1px 1px 4px 0px rgba(0, 0, 0, 0.1)',
        overlayColor: 'rgba(0, 0, 0, 0.5)',
        fontFamily: 'Noto Sans, sans-serif',
        titleColor: '#2B2B2B',
        titleFontSize: '16px',
        titleFontWeight: '500',
        subtextColor: '#2B2B2B',
        subtextFontSize: '14px',
        subtextFontWeight: '400',
        headerPadding: '16px',
        headerGap: '8px',
        textGap: '4px',
        contentPadding: '16px',
        contentBackgroundColor: '#F7F7F7',
        footerPadding: '16px',
        footerGap: '8px',
      },
      variants: {
        narrow: { width: '328px' },
        extended: { width: '464px' },
      },
    },
    sideNavigation: {
      base: {
        fontFamily: 'Noto Sans',
        fontSize: '14px',
        fontWeight: '500',
        lineHeight: '1.43em',
        gap: '8px',
        padding: '8px',
        expandedWidth: '240px',
        collapsedWidth: '60px',
      },
      styles: {
        standard: {
          backgroundColor: '#ffffff', borderColor: '#e6e6e6', defaultBg: 'transparent',
          textColor: '#2b2b2b', subtextColor: '#444444', iconColor: '#2b2b2b',
          hoverBg: '#f7f7f7', hoverTextColor: '#2b2b2b',
          pressedBg: '#f2f2f2', pressedTextColor: '#2b2b2b',
          activeBg: '#f2f2f2', activeTextColor: '#2b2b2b', activeIconColor: '#2b2b2b',
          disabledTextColor: '#cdcbcb', disabledIconColor: '#cdcbcb',
          cellGap: '4px', cellPadding: '8px 12px', cellRadius: '8px', iconSize: '20px', subNavIndent: '16px',
        },
        coal: {
          backgroundColor: '#f9f9fb', borderColor: '#eff1f5', defaultBg: 'transparent',
          textColor: '#343c51', subtextColor: '#343c51', iconColor: '#343c51',
          hoverBg: '#eff1f5', hoverTextColor: '#343c51',
          pressedBg: '#eff1f5', pressedTextColor: '#343c51',
          activeBg: '#eff1f5', activeTextColor: '#343c51', activeIconColor: '#343c51',
          disabledTextColor: '#cdcbcb', disabledIconColor: '#cdcbcb',
          cellGap: '4px', cellPadding: '8px 12px', cellRadius: '8px', iconSize: '20px', subNavIndent: '16px',
        },
        'd-one': {
          backgroundColor: '#1b202b', borderColor: '#f04158', defaultBg: '#1b202b',
          textColor: '#f2f2f2', subtextColor: '#e6e6e6', iconColor: '#f2f2f2',
          hoverBg: '#333c50', hoverTextColor: '#f2f2f2',
          pressedBg: '#eff1f5', pressedTextColor: '#2b2b2b',
          activeBg: '#eff1f5', activeTextColor: '#2b2b2b', activeIconColor: '#2b2b2b',
          disabledTextColor: '#3a3a3a', disabledIconColor: '#3a3a3a',
          cellGap: '4px', cellPadding: '8px 12px', cellRadius: '8px', iconSize: '20px', subNavIndent: '16px',
        },
      },
    },
  },
}

/**
 * Create a complete theme configuration by merging with defaults
 * @param customConfig Custom theme configuration
 * @returns Complete theme configuration
 */
export function createThemeConfig(
  customConfig?: Partial<ThemeConfig>
): ThemeConfig {
  if (!customConfig) return defaultThemeConfig
  return deepMerge(defaultThemeConfig, customConfig)
}

/**
 * Get a specific component's configuration, with fallback to default
 * @param theme Current theme configuration
 * @param componentName Name of the component
 * @returns Component configuration
 */
export function getComponentConfig<K extends keyof ThemeConfig['components']>(
  theme: ThemeConfig | undefined,
  componentName: K
): ThemeConfig['components'][K] {
  if (!theme || !theme.components || !theme.components[componentName]) {
    return defaultThemeConfig.components[componentName]
  }
  return theme.components[componentName]
}

// Export the default theme for backward compatibility
export const defaultConfig = defaultThemeConfig
