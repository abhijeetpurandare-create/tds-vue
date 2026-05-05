import React, { useState, useRef, useEffect, useContext, createContext, CSSProperties } from 'react'
import { css } from '@emotion/css'
import { useTheme } from '../ThemeProvider'
import { defaultThemeConfig } from '../../config/config'
import {
  buildCheckboxBoxStyles,
  buildCheckmarkStyles,
  buildWrapperStyles,
  buildLabelStyles,
  buildSubtextStyles,
} from './useCheckboxStyles'
import type {
  TarmacCheckboxVariant,
  TarmacCheckboxStyle,
  TarmacCheckboxSize,
  CheckboxTarmacConfig,
} from './useCheckboxStyles'

export type { TarmacCheckboxVariant, TarmacCheckboxStyle, TarmacCheckboxSize, CheckboxTarmacConfig }

export type CheckboxSize = 'sm' | 'md' | 'lg'
export type CheckboxGroupOptionType = 'default' | 'button'
export type CheckboxGroupButtonStyle = 'outline' | 'solid'

export interface CheckboxOptionType {
  label: React.ReactNode
  value: string | number
  disabled?: boolean
  title?: string
  style?: React.CSSProperties
  className?: string
  id?: string
  required?: boolean
}

export interface CheckboxChangeEventTarget {
  checked: boolean
  value?: string | number
  disabled?: boolean
}

export interface CheckboxChangeEvent {
  target: CheckboxChangeEventTarget
  stopPropagation: () => void
  preventDefault: () => void
  nativeEvent: MouseEvent
}

export interface CheckboxGroupContextValue {
  value?: (string | number)[]
  onChange?: (e: CheckboxChangeEvent) => void
  disabled?: boolean
  name?: string
  optionType?: CheckboxGroupOptionType
  block?: boolean
}

const CheckboxGroupContext = createContext<CheckboxGroupContextValue | null>(null)

export interface CheckboxProps extends Omit<React.HTMLAttributes<HTMLLabelElement>, 'onChange' | 'onFocus' | 'onBlur'> {
  value?: string | number
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  autoFocus?: boolean
  indeterminate?: boolean
  onChange?: (e: CheckboxChangeEvent) => void
  onClick?: React.MouseEventHandler<HTMLElement>
  onMouseEnter?: React.MouseEventHandler<HTMLElement>
  onMouseLeave?: React.MouseEventHandler<HTMLElement>
  onKeyPress?: React.KeyboardEventHandler<HTMLElement>
  onKeyDown?: React.KeyboardEventHandler<HTMLElement>
  onFocus?: React.FocusEventHandler<HTMLInputElement>
  onBlur?: React.FocusEventHandler<HTMLInputElement>
  name?: string
  id?: string
  tabIndex?: number
  required?: boolean
  title?: string
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
  size?: CheckboxSize
  /** @description Tarmac TDS variant (Standard/Blue/Green/DLV Red) */
  tarmacVariant?: TarmacCheckboxVariant
  /** @description Tarmac TDS style (Box/Rounded) */
  tarmacStyle?: TarmacCheckboxStyle
  /** @description Optional subtext shown below the label */
  subtext?: React.ReactNode
  // Style customization props
  classNames?: {
    wrapper?: string
    input?: string
    icon?: string
    label?: string
  }
  styles?: {
    wrapper?: CSSProperties
    input?: CSSProperties
    icon?: CSSProperties
    label?: CSSProperties
  }
}

const Checkbox = React.forwardRef<HTMLLabelElement, CheckboxProps>(
  (
    {
      value,
      checked: controlledChecked,
      defaultChecked = false,
      disabled = false,
      autoFocus = false,
      indeterminate = false,
      onChange,
      onClick,
      onMouseEnter,
      onMouseLeave,
      onKeyPress,
      onKeyDown,
      onFocus,
      onBlur,
      name,
      id,
      tabIndex,
      required = false,
      title,
      children,
      className = '',
      style,
      size = 'md',
      tarmacVariant,
      tarmacStyle = 'box',
      subtext,
      classNames = {},
      styles = {},
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme()
    const checkboxTheme =
      theme.components?.checkbox || defaultThemeConfig.components.checkbox

    const base = checkboxTheme.base
    const sizeConfig = checkboxTheme.sizes[size]
    const stateConfig = checkboxTheme.states

    const groupContext = useContext(CheckboxGroupContext)
    const checkboxRef = useRef<HTMLInputElement>(null)
    const [uncontrolledChecked, setUncontrolledChecked] = useState(defaultChecked)

    // Determine if controlled or uncontrolled
    const isControlled = controlledChecked !== undefined
    const checked = isControlled
      ? controlledChecked
      : groupContext && value !== undefined
      ? groupContext.value?.includes(value)
      : uncontrolledChecked

    // Determine disabled state
    const isDisabled = disabled || groupContext?.disabled || false

    // Determine name
    const checkboxName = name || groupContext?.name || ''

    // Determine option type (for button style)
    const optionType = groupContext?.optionType || 'default'
    const isButtonType = optionType === 'button'

    // Handle change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isDisabled) return

      const newChecked = e.target.checked
      if (!isControlled && !groupContext) {
        setUncontrolledChecked(newChecked)
      }

      const changeEvent: CheckboxChangeEvent = {
        target: {
          checked: newChecked,
          value: value,
          disabled: isDisabled,
        },
        stopPropagation: () => e.stopPropagation(),
        preventDefault: () => e.preventDefault(),
        nativeEvent: e.nativeEvent as MouseEvent,
      }

      if (groupContext?.onChange) {
        groupContext.onChange(changeEvent)
      } else if (onChange) {
        onChange(changeEvent)
      }
    }

    // Auto focus
    useEffect(() => {
      if (autoFocus && checkboxRef.current) {
        checkboxRef.current.focus()
      }
    }, [autoFocus])

    // Set indeterminate state
    useEffect(() => {
      if (checkboxRef.current) {
        checkboxRef.current.indeterminate = indeterminate
      }
    }, [indeterminate])

    // Use Tailwind for layout, spacing, typography and other static styles
    const baseWrapperClasses =
      base.wrapper?.className ||
      'inline-flex items-center cursor-pointer select-none relative'

    const sizeWrapperClasses = sizeConfig.wrapper?.className || ''

    const buttonWrapperClasses = isButtonType
      ? checkboxTheme.button?.wrapper?.className || 'w-full justify-center'
      : ''

    const disabledWrapperClasses = isDisabled
      ? stateConfig.disabled?.wrapper?.className || 'cursor-not-allowed opacity-60'
      : ''

    // Combine Tailwind classes
    const tailwindWrapperClasses = [
      baseWrapperClasses,
      sizeWrapperClasses,
      buttonWrapperClasses,
      disabledWrapperClasses,
      classNames.wrapper,
      className,
    ]
      .filter(Boolean)
      .join(' ')

    // Use Emotion CSS for dynamic color styling
    const wrapperStyles = css({
      ...(base.wrapper?.style || {}),
      ...(isDisabled && (stateConfig.disabled?.wrapper?.style || {})),
      ...(checked && { borderColor: '#000000' }),
      ...styles.wrapper,
      ...style,
    })

    const inputStyles = css({
      position: 'absolute',
      opacity: 0,
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      margin: 0,
      padding: 0,
      ...(base.input?.style || {}),
      ...styles.input,
    })

    const iconBaseSize = sizeConfig.icon?.size || base.icon?.size || '1.25rem'
    const iconStyles = css({
      display: isButtonType ? 'none' : 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: iconBaseSize,
      height: iconBaseSize,
      borderWidth: '2px',
      borderStyle: 'solid',
      borderColor: checked || indeterminate
        ? stateConfig.checked?.icon?.borderColor || base.icon?.borderColor || '#000000'
        : base.icon?.borderColor || '#D1D5DB',
      borderRadius: base.icon?.borderRadius || '0.25rem',
      backgroundColor: checked
        ? stateConfig.checked?.icon?.backgroundColor || '#000000'
        : indeterminate
        ? stateConfig.indeterminate?.icon?.backgroundColor || '#000000'
        : base.icon?.backgroundColor || 'transparent',
      transition: base.transition || 'all 0.2s ease-in-out',
      position: 'relative',
      flexShrink: 0,

      '&::after': checked
        ? {
            content: '""',
            position: 'absolute',
            width: '0.375rem',
            height: '0.625rem',
            borderWidth: '0 2px 2px 0',
            borderStyle: 'solid',
            borderColor: stateConfig.checked?.icon?.checkmarkColor || '#FFFFFF',
            transform: 'rotate(45deg) scale(1)',
            transition: 'transform 0.2s ease-in-out',
          }
        : indeterminate
        ? {
            content: '""',
            position: 'absolute',
            width: '0.5rem',
            height: '2px',
            backgroundColor: stateConfig.indeterminate?.icon?.dashColor || '#FFFFFF',
            transform: 'scale(1)',
            transition: 'transform 0.2s ease-in-out',
          }
        : {
            content: '""',
            position: 'absolute',
            width: '0.375rem',
            height: '0.625rem',
            borderWidth: '0 2px 2px 0',
            borderStyle: 'solid',
            borderColor: 'transparent',
            transform: 'rotate(45deg) scale(0)',
            transition: 'transform 0.2s ease-in-out',
          },

      '&:hover:not(:disabled)': {
        borderColor: checked || indeterminate
          ? stateConfig.checked?.icon?.hoverBorderColor ||
            stateConfig.checked?.icon?.borderColor ||
            '#000000'
          : base.icon?.hoverBorderColor || '#9CA3AF',
      },

      '&:focus-within': {
        outline: base.focus.outline,
        boxShadow: base.focus.ring.replace('rgba(0, 0, 0, 0.2)', base.icon?.focusRingColor || 'rgba(0, 0, 0, 0.2)'),
      },

      ...(isDisabled && {
        opacity: stateConfig.disabled?.icon?.opacity || 0.6,
        cursor: 'not-allowed',
      }),

      ...styles.icon,
    })

    const labelStyles = css({
      color: isDisabled
        ? stateConfig.disabled?.label?.color || base.label?.color || '#9CA3AF'
        : base.label?.color || '#374151',
      userSelect: 'none',
      fontSize: sizeConfig.label?.fontSize || base.label?.style?.fontSize,
      ...(base.label?.style || {}),
      ...styles.label,
    })

    const combinedWrapperClassName = `${tailwindWrapperClasses} ${wrapperStyles}`

    // Tarmac TDS rendering path
    const tarmacConfig = theme.components?.checkbox_tarmac as CheckboxTarmacConfig | undefined
    if (tarmacVariant && tarmacConfig) {
      const styleParams = {
        config: tarmacConfig,
        variant: tarmacVariant,
        checkboxStyle: tarmacStyle,
        size: size as TarmacCheckboxSize,
        checked: !!checked,
        indeterminate,
        disabled: isDisabled,
      }
      const boxCls = buildCheckboxBoxStyles(styleParams)
      const checkCls = buildCheckmarkStyles(styleParams)
      const wrapCls = buildWrapperStyles({ ...styleParams, hasLabel: !!(children || subtext) })
      const lblCls = buildLabelStyles(tarmacConfig, size as TarmacCheckboxSize, isDisabled)
      const subCls = buildSubtextStyles(tarmacConfig, size as TarmacCheckboxSize, isDisabled)

      return (
        <label
          ref={ref}
          className={`${wrapCls} ${className}`}
          style={style}
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          title={title}
          {...props}
        >
          <input
            ref={checkboxRef}
            type="checkbox"
            name={checkboxName}
            value={value}
            checked={checked}
            disabled={isDisabled}
            onChange={handleChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyPress={onKeyPress}
            onKeyDown={onKeyDown}
            id={id}
            tabIndex={tabIndex}
            required={required}
            className={css({ position: 'absolute', opacity: 0, width: 0, height: 0, margin: 0 })}
            aria-checked={indeterminate ? 'mixed' : checked}
            aria-disabled={isDisabled}
          />
          <span className={boxCls} tabIndex={-1}>
            <span className={checkCls}>
              {checked && !indeterminate && (
                <svg viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.76691 9.46756L1.21092 5.73602L0 6.99776L4.76691 12L15 1.26174L13.7976 0L4.76691 9.46756Z" fill="currentColor"/>
                </svg>
              )}
            </span>
          </span>
          {(children || subtext) && (
            <span className={css({ display: 'flex', flexDirection: 'column' })}>
              {children && <span className={lblCls}>{children}</span>}
              {subtext && <span className={subCls}>{subtext}</span>}
            </span>
          )}
        </label>
      )
    }

    return (
      <label
        ref={ref}
        className={combinedWrapperClassName}
        style={style}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        title={title}
        {...props}
      >
        <input
          ref={checkboxRef}
          type="checkbox"
          name={checkboxName}
          value={value}
          checked={checked}
          disabled={isDisabled}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyPress={onKeyPress}
          onKeyDown={onKeyDown}
          id={id}
          tabIndex={tabIndex}
          required={required}
          className={`${inputStyles} ${classNames.input || ''}`}
          aria-checked={checked}
          aria-disabled={isDisabled}
        />
        <span
          className={`${iconStyles} ${classNames.icon || ''}`}
          style={styles.icon}
        />
        {children && <span className={`${labelStyles} ${classNames.label || ''}`}>{children}</span>}
      </label>
    )
  }
)

Checkbox.displayName = 'Checkbox'

export interface CheckboxGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  value?: (string | number)[]
  defaultValue?: (string | number)[]
  onChange?: (checkedValues: (string | number)[]) => void
  disabled?: boolean
  name?: string
  options?: (string | number | CheckboxOptionType)[]
  optionType?: CheckboxGroupOptionType
  buttonStyle?: CheckboxGroupButtonStyle
  size?: CheckboxSize
  block?: boolean
  vertical?: boolean
  orientation?: 'horizontal' | 'vertical'
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>
  onFocus?: React.FocusEventHandler<HTMLDivElement>
  onBlur?: React.FocusEventHandler<HTMLDivElement>
  id?: string
  className?: string
  style?: React.CSSProperties
  // Style customization props
  classNames?: {
    group?: string
    checkbox?: CheckboxProps['classNames']
    button?: string
  }
  styles?: {
    group?: CSSProperties
    checkbox?: CheckboxProps['styles']
    button?: CSSProperties
    icon?: CSSProperties
  }
}

const CheckboxGroup = React.forwardRef<HTMLDivElement, CheckboxGroupProps>(
  (
    {
      value: controlledValue,
      defaultValue,
      onChange,
      disabled = false,
      name,
      options,
      optionType = 'default',
      buttonStyle = 'outline',
      size = 'md',
      block = false,
      vertical = false,
      orientation,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      id,
      className = '',
      style,
      classNames = {},
      styles = {},
      children,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme()
    const checkboxTheme =
      theme.components?.checkbox || defaultThemeConfig.components.checkbox

    const [uncontrolledValue, setUncontrolledValue] = useState<(string | number)[] | undefined>(
      defaultValue || []
    )

    // Determine if controlled or uncontrolled
    const isControlled = controlledValue !== undefined
    const value = isControlled ? controlledValue : uncontrolledValue || []

    // Handle change
    const handleChange = (e: CheckboxChangeEvent) => {
      if (!e.target.value) return

      const currentValue = value || []
      const targetValue = e.target.value
      const newValue = e.target.checked
        ? [...currentValue, targetValue]
        : currentValue.filter((v) => v !== targetValue)

      if (!isControlled) {
        setUncontrolledValue(newValue)
      }
      onChange?.(newValue)
    }

    // Determine orientation
    const isVertical = vertical || orientation === 'vertical'

    // Generate name if not provided
    const groupName = name || `checkbox-group-${Math.random().toString(36).substr(2, 9)}`

    // Context value
    const contextValue: CheckboxGroupContextValue = {
      value,
      onChange: handleChange,
      disabled,
      name: groupName,
      optionType,
      block,
    }

    // Use Tailwind for layout
    const baseGroupClasses =
      checkboxTheme.group?.base?.className || 'inline-flex items-center flex-wrap'

    const orientationClasses = isVertical
      ? checkboxTheme.group?.vertical?.className || 'flex-col'
      : checkboxTheme.group?.horizontal?.className || 'flex-row'

    const blockClasses = block ? checkboxTheme.group?.block?.className || 'w-full' : ''

    const sizeGroupClasses =
      checkboxTheme.group?.sizes?.[size]?.className ||
      {
        sm: 'gap-2',
        md: 'gap-3',
        lg: 'gap-4',
      }[size]

    // Combine Tailwind classes
    const tailwindGroupClasses = [
      baseGroupClasses,
      orientationClasses,
      blockClasses,
      sizeGroupClasses,
      classNames.group,
      className,
    ]
      .filter(Boolean)
      .join(' ')

    // Use Emotion CSS for dynamic styling
    const groupStyles = css({
      ...(checkboxTheme.group?.base?.style || {}),
      ...styles.group,
      ...style,
    })

    const combinedGroupClassName = `${tailwindGroupClasses} ${groupStyles}`

    // Render options if provided
    let childrenToRender = children
    if (options && options.length > 0) {
      childrenToRender = options.map((option, index) => {
        if (typeof option === 'string' || typeof option === 'number') {
          return (
            <Checkbox
              key={option.toString()}
              value={option}
              disabled={disabled}
              size={size}
              classNames={classNames.checkbox}
              styles={{
                ...styles.checkbox,
                ...(styles.icon && { icon: { ...styles.icon } }),
              }}
            >
              {option}
            </Checkbox>
          )
        }

        return (
          <Checkbox
            key={`checkbox-group-option-${option.value}-${index}`}
            value={option.value}
            disabled={option.disabled || disabled}
            size={size}
            title={option.title}
            style={option.style}
            className={option.className}
            id={option.id}
            required={option.required}
            classNames={classNames.checkbox}
            styles={{
              ...styles.checkbox,
              ...(styles.icon && { icon: { ...styles.icon } }),
            }}
          >
            {option.label}
          </Checkbox>
        )
      })
    }

    // Button style wrapper if optionType is button
    if (optionType === 'button') {
      const buttonGroupStyles = css({
        display: 'flex',
        flexDirection: isVertical ? 'column' : 'row',
        gap: '0',
        backgroundColor: checkboxTheme.buttonGroup?.backgroundColor || '#F9FAFB',
        borderRadius: checkboxTheme.buttonGroup?.borderRadius || '0.375rem',
        padding: checkboxTheme.buttonGroup?.padding || '0.25rem',
        borderWidth: buttonStyle === 'outline' ? '1px' : '0',
        borderStyle: 'solid',
        borderColor: checkboxTheme.buttonGroup?.borderColor || '#E5E7EB',
        ...styles.button,
      })

      return (
        <div
          ref={ref}
          className={`${combinedGroupClassName} ${buttonGroupStyles} ${classNames.button || ''}`}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onFocus={onFocus}
          onBlur={onBlur}
          id={id}
          role="group"
          aria-orientation={isVertical ? 'vertical' : 'horizontal'}
          {...props}
        >
          <CheckboxGroupContext.Provider value={contextValue}>
            {React.Children.map(childrenToRender, (child, index) => {
              if (React.isValidElement(child) && child.type === Checkbox) {
                const isChecked = child.props.value !== undefined && value.includes(child.props.value)
                const buttonStyles = css({
                  padding: checkboxTheme.button?.padding || '0.5rem 1rem',
                  borderRadius: checkboxTheme.button?.borderRadius || '0.25rem',
                  borderWidth: buttonStyle === 'outline' ? '1px' : '0',
                  borderStyle: 'solid',
                  borderColor: isChecked
                    ? checkboxTheme.button?.checked?.borderColor || '#5B80F7'
                    : checkboxTheme.button?.borderColor || 'transparent',
                  backgroundColor: isChecked
                    ? buttonStyle === 'solid'
                      ? checkboxTheme.button?.checked?.solidBackgroundColor || '#5B80F7'
                      : checkboxTheme.button?.checked?.outlineBackgroundColor || '#EFF6FF'
                    : checkboxTheme.button?.backgroundColor || 'transparent',
                  color: isChecked
                    ? buttonStyle === 'solid'
                      ? checkboxTheme.button?.checked?.solidTextColor || '#FFFFFF'
                      : checkboxTheme.button?.checked?.outlineTextColor || '#5B80F7'
                    : checkboxTheme.button?.textColor || '#374151',
                  transition: 'all 0.2s ease-in-out',
                  cursor: disabled ? 'not-allowed' : 'pointer',
                  '&:hover:not(:disabled)': {
                    backgroundColor: isChecked
                      ? buttonStyle === 'solid'
                        ? checkboxTheme.button?.checked?.hoverBackgroundColor || '#4C6EF5'
                        : checkboxTheme.button?.checked?.hoverOutlineBackgroundColor || '#DBEAFE'
                      : checkboxTheme.button?.hoverBackgroundColor || '#F3F4F6',
                    borderColor: isChecked
                      ? checkboxTheme.button?.checked?.hoverBorderColor || '#4C6EF5'
                      : checkboxTheme.button?.hoverBorderColor || '#D1D5DB',
                  },
                  ...(disabled && {
                    opacity: checkboxTheme.button?.disabled?.opacity || 0.6,
                  }),
                })

                return (
                  <div key={child.key || index} className={buttonStyles}>
                    {child}
                  </div>
                )
              }
              return child
            })}
          </CheckboxGroupContext.Provider>
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={combinedGroupClassName}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onFocus={onFocus}
        onBlur={onBlur}
        id={id}
        role="group"
        aria-orientation={isVertical ? 'vertical' : 'horizontal'}
        {...props}
      >
        <CheckboxGroupContext.Provider value={contextValue}>
          {childrenToRender}
        </CheckboxGroupContext.Provider>
      </div>
    )
  }
)

CheckboxGroup.displayName = 'CheckboxGroup'

// Attach Group to Checkbox component (for ant-design compatibility)
;(Checkbox as any).Group = CheckboxGroup

// Export both Checkbox and CheckboxGroup
export { CheckboxGroup }
export default Checkbox

