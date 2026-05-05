import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  createContext,
  CSSProperties,
} from 'react'
import { css } from '@emotion/css'
import { useTheme } from '../ThemeProvider'
import { defaultThemeConfig } from '../../config/config'
import {
  buildRadioCircleStyles,
  buildRadioWrapperStyles,
  buildRadioLabelStyles,
  buildRadioSubtextStyles,
} from './useRadioStyles'
import type {
  TarmacRadioVariant,
  TarmacRadioStyle,
  TarmacRadioSize,
  RadioTarmacConfig,
} from './useRadioStyles'

export type { TarmacRadioVariant, TarmacRadioStyle, TarmacRadioSize, RadioTarmacConfig }

export type RadioSize = 'sm' | 'md' | 'lg'
export type RadioGroupOptionType = 'default' | 'button' | 'pill'
export type RadioGroupButtonStyle = 'outline' | 'solid'

export interface RadioOptionType {
  label: React.ReactNode
  value: string | number
  disabled?: boolean
  title?: string
  style?: React.CSSProperties
  className?: string
  id?: string
  required?: boolean
}

export interface RadioChangeEventTarget {
  checked: boolean
  value: string | number
  disabled?: boolean
}

export interface RadioChangeEvent {
  target: RadioChangeEventTarget
  stopPropagation: () => void
  preventDefault: () => void
  nativeEvent: MouseEvent
}

export interface RadioGroupContextValue {
  value?: string | number
  onChange?: (e: RadioChangeEvent) => void
  disabled?: boolean
  name?: string
  optionType?: RadioGroupOptionType
  block?: boolean
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null)

export interface RadioProps
  extends Omit<
    React.HTMLAttributes<HTMLLabelElement>,
    'onChange' | 'onFocus' | 'onBlur'
  > {
  value?: string | number
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  autoFocus?: boolean
  onChange?: (e: RadioChangeEvent) => void
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
  size?: RadioSize
  /** @description Tarmac TDS variant (Standard/Blue/Green/DLV Red) */
  variant?: TarmacRadioVariant
  /** @description Tarmac TDS style (Filled/Outlined) */
  radioStyle?: TarmacRadioStyle
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

const Radio = React.forwardRef<HTMLLabelElement, RadioProps>(
  (
    {
      value,
      checked: controlledChecked,
      defaultChecked = false,
      disabled = false,
      autoFocus = false,
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
      variant,
      radioStyle = 'filled',
      subtext,
      classNames = {},
      styles = {},
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme()
    const radioTheme =
      theme.components?.radio || defaultThemeConfig.components.radio

    const base = radioTheme.base
    const sizeConfig = radioTheme.sizes[size]
    const stateConfig = radioTheme.states

    const groupContext = useContext(RadioGroupContext)
    const radioRef = useRef<HTMLInputElement>(null)
    const [uncontrolledChecked, setUncontrolledChecked] =
      useState(defaultChecked)

    // Determine if controlled or uncontrolled
    const isControlled = controlledChecked !== undefined
    const checked = isControlled
      ? controlledChecked
      : groupContext
      ? groupContext.value === value
      : uncontrolledChecked

    // Determine disabled state
    const isDisabled = disabled || groupContext?.disabled || false

    // Determine name
    const radioName = name || groupContext?.name || ''

    // Determine option type (for button style)
    const optionType = groupContext?.optionType || 'default'
    const isButtonType = optionType === 'button'
    const isPillType = optionType === 'pill'

    // Handle change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isDisabled) return

      const newChecked = e.target.checked
      if (!isControlled && !groupContext) {
        setUncontrolledChecked(newChecked)
      }

      const changeEvent: RadioChangeEvent = {
        target: {
          checked: newChecked,
          value: value!,
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
      if (autoFocus && radioRef.current) {
        radioRef.current.focus()
      }
    }, [autoFocus])

    // Use Tailwind for layout, spacing, typography and other static styles
    const baseWrapperClasses =
      base.wrapper?.className ||
      'flex items-center cursor-pointer select-none relative flex-row gap-2 '

    const sizeWrapperClasses = sizeConfig.wrapper?.className || ''

    const buttonWrapperClasses = isButtonType
      ? radioTheme.pill?.wrapper?.className || 'w-full justify-center'
      : ''

    const pillWrapperClasses = isPillType
      ? radioTheme.pill?.wrapper?.className || 'w-full justify-center'
      : ''

    const disabledWrapperClasses = isDisabled
      ? stateConfig.disabled?.wrapper?.className ||
        'cursor-not-allowed opacity-60'
      : ''

    // Combine Tailwind classes
    const tailwindWrapperClasses = [
      baseWrapperClasses,
      sizeWrapperClasses,
      buttonWrapperClasses,
      pillWrapperClasses,
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
      ...{ display: 'flex' },
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

    const iconBaseSize = sizeConfig.icon?.size || base.icon?.size || '1rem'
    const iconStyles = css({
      display: isButtonType || isPillType ? 'none' : 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: iconBaseSize,
      height: iconBaseSize,
      borderWidth: '2px',
      borderStyle: 'solid',
      borderColor: checked
        ? stateConfig.checked?.icon?.borderColor ||
          base.icon?.borderColor ||
          '#000000'
        : base.icon?.borderColor || '#D1D5DB',
      borderRadius: '50%',
      backgroundColor: checked
        ? stateConfig.checked?.icon?.backgroundColor || '#000000'
        : base.icon?.backgroundColor || 'transparent',
      transition: base.transition || 'all 0.2s ease-in-out',
      position: 'relative',
      flexShrink: 0,

      '&::after': checked
        ? {
            content: '""',
            position: 'absolute',
            width: '0.375rem',
            height: '0.375rem',
            borderRadius: '50%',
            backgroundColor: stateConfig.checked?.icon?.dotColor || '#FFFFFF',
            transform: 'scale(1)',
            transition: 'transform 0.2s ease-in-out',
          }
        : {
            content: '""',
            position: 'absolute',
            width: '0.375rem',
            height: '0.375rem',
            borderRadius: '50%',
            backgroundColor: 'transparent',
            transform: 'scale(0)',
            transition: 'transform 0.2s ease-in-out',
          },

      '&:hover:not(:disabled)': {
        borderColor: checked
          ? stateConfig.checked?.icon?.hoverBorderColor ||
            stateConfig.checked?.icon?.borderColor ||
            '#000000'
          : base.icon?.hoverBorderColor || '#9CA3AF',
      },

      '&:focus-within': {
        outline: base.focus.outline,
        boxShadow: base.focus.ring.replace(
          'rgba(0, 0, 0, 0.2)',
          base.icon?.focusRingColor || 'rgba(0, 0, 0, 0.2)'
        ),
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
    const tarmacConfig = theme.components?.radio_tarmac as RadioTarmacConfig | undefined
    if (variant && tarmacConfig) {
      const styleParams = {
        config: tarmacConfig,
        variant: variant,
        radioStyle: radioStyle,
        size: size as TarmacRadioSize,
        checked: !!checked,
        disabled: isDisabled,
      }
      const circleCls = buildRadioCircleStyles(styleParams)
      const wrapCls = buildRadioWrapperStyles({ ...styleParams, hasLabel: !!(children || subtext) })
      const lblCls = buildRadioLabelStyles(tarmacConfig, size as TarmacRadioSize, isDisabled)
      const subCls = buildRadioSubtextStyles(tarmacConfig, size as TarmacRadioSize, isDisabled)

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
            ref={radioRef}
            type='radio'
            name={radioName}
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
            aria-checked={checked}
            aria-disabled={isDisabled}
          />
          <span className={circleCls} tabIndex={-1} />
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
          ref={radioRef}
          type='radio'
          name={radioName}
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
        {children && (
          <span className={`${labelStyles} ${classNames.label || ''}`}>
            {children}
          </span>
        )}
      </label>
    )
  }
)

Radio.displayName = 'Radio'

export interface RadioGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: string | number
  defaultValue?: string | number
  onChange?: (e: RadioChangeEvent) => void
  disabled?: boolean
  name?: string
  options?: (string | number | RadioOptionType)[]
  optionType?: RadioGroupOptionType
  buttonStyle?: RadioGroupButtonStyle
  size?: RadioSize
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
    radio?: RadioProps['classNames']
    button?: string
    pill?: string
    pillChecked?: string
    pillUnchecked?: string
  }
  styles?: {
    group?: CSSProperties
    radio?: RadioProps['styles']
    button?: CSSProperties
    pill?: CSSProperties
    pillChecked?: CSSProperties
    pillUnchecked?: CSSProperties
    // Function-based style: receives isChecked and returns styles
    getPillStyle?: (isChecked: boolean) => CSSProperties
    icon?: CSSProperties
  }
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
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
      orientation = 'horizontal',
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
    const radioTheme =
      theme.components?.radio || defaultThemeConfig.components.radio

    const [uncontrolledValue, setUncontrolledValue] = useState<
      string | number | undefined
    >(defaultValue)

    // Determine if controlled or uncontrolled
    const isControlled = controlledValue !== undefined
    const value = isControlled ? controlledValue : uncontrolledValue

    // Handle change
    const handleChange = (e: RadioChangeEvent) => {
      if (!isControlled) {
        setUncontrolledValue(e.target.value)
      }
      onChange?.(e)
    }

    // Determine orientation
    const isVertical = vertical || orientation === 'vertical'

    // Generate name if not provided
    const groupName =
      name || `radio-group-${Math.random().toString(36).substr(2, 9)}`

    // Context value
    const contextValue: RadioGroupContextValue = {
      value,
      onChange: handleChange,
      disabled,
      name: groupName,
      optionType,
      block,
    }

    // Use Tailwind for layout
    const baseGroupClasses =
      radioTheme.group?.base?.className || 'flex items-center'

    const orientationClasses = isVertical
      ? radioTheme.group?.vertical?.className || 'flex-col'
      : radioTheme.group?.horizontal?.className || 'flex-row'

    const blockClasses = block
      ? radioTheme.group?.block?.className || 'w-full'
      : ''

    const sizeGroupClasses =
      radioTheme.group?.sizes?.[size]?.className ||
      {
        sm: 'gap-2',
        md: 'gap-2',
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
      ...(radioTheme.group?.base?.style || {}),
      ...styles.group,
      ...style,
      ...{ display: 'flex', gap: '12px' },
    })

    const combinedGroupClassName = `${tailwindGroupClasses} ${groupStyles}`

    // Render options if provided
    let childrenToRender = children
    if (options && options.length > 0) {
      childrenToRender = options.map((option, index) => {
        if (typeof option === 'string' || typeof option === 'number') {
          return (
            <Radio
              key={option.toString()}
              value={option}
              disabled={disabled}
              size={size}
              classNames={classNames.radio}
              styles={styles.radio}
            >
              {option}
            </Radio>
          )
        }

        return (
          <Radio
            key={`radio-group-option-${option.value}-${index}`}
            value={option.value}
            disabled={option.disabled || disabled}
            size={size}
            title={option.title}
            style={option.style}
            className={option.className}
            id={option.id}
            required={option.required}
            classNames={classNames.radio}
            styles={styles.radio}
          >
            {option.label}
          </Radio>
        )
      })
    }

    // Pill style wrapper if optionType is pill
    if (optionType === 'pill') {
      return (
        <div
          ref={ref}
          className={`${combinedGroupClassName} ${classNames.button || ''}`}
          style={{
            display: 'flex',
            flexDirection: isVertical ? 'column' : 'row',
            gap: radioTheme.pillGroup?.gap || '0.75rem',
            ...styles.button,
            ...style,
          }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onFocus={onFocus}
          onBlur={onBlur}
          id={id}
          role='radiogroup'
          aria-orientation={isVertical ? 'vertical' : 'horizontal'}
          {...props}
        >
          <RadioGroupContext.Provider value={contextValue}>
            {React.Children.map(childrenToRender, (child, index) => {
              if (React.isValidElement(child) && child.type === Radio) {
                const isChecked = (child.props as RadioProps).value === value
                const pillStyles = css({
                  padding: radioTheme.pill?.padding || '0.5rem 1rem',
                  borderRadius: radioTheme.pill?.borderRadius || '9999px',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: isChecked
                    ? radioTheme.pill?.checked?.borderColor || '#000000'
                    : radioTheme.pill?.borderColor || '#E0E3EB',
                  backgroundColor:
                    radioTheme.pill?.backgroundColor || '#FFFFFF',
                  color: isChecked
                    ? radioTheme.pill?.checked?.textColor || '#3D445C'
                    : radioTheme.pill?.textColor || '#525B7A',
                  transition: 'all 0.2s ease-in-out',
                  cursor: disabled ? 'not-allowed' : 'pointer',
                  '&:hover:not(:disabled)': {
                    backgroundColor:
                      radioTheme.pill?.hoverBackgroundColor || '#F9F9FB',
                    borderColor: isChecked
                      ? radioTheme.pill?.checked?.hoverBorderColor || '#000000'
                      : radioTheme.pill?.hoverBorderColor || '#D1D5DB',
                  },
                  ...(disabled && {
                    opacity: radioTheme.pill?.disabled?.opacity || 0.6,
                  }),
                })

                // Build className with conditional classes
                const pillClassName = [
                  pillStyles,
                  classNames.pill,
                  isChecked ? classNames.pillChecked : classNames.pillUnchecked,
                ]
                  .filter(Boolean)
                  .join(' ')

                // Build style object with multiple methods support
                const pillStyleObject: CSSProperties = {
                  ...styles.pill,
                  ...(isChecked ? styles.pillChecked : styles.pillUnchecked),
                  // Function-based style (highest priority, can override everything)
                  ...(styles.getPillStyle ? styles.getPillStyle(isChecked) : {}),
                }

                return (
                  <div
                    key={child.key || index}
                    className={pillClassName}
                    style={pillStyleObject}
                  >
                    {child}
                  </div>
                )
              }
              return child
            })}
          </RadioGroupContext.Provider>
        </div>
      )
    }

    // Button style wrapper if optionType is button
    if (optionType === 'button') {
      const buttonGroupStyles = css({
        display: 'flex',
        flexDirection: isVertical ? 'column' : 'row',
        gap: '0',
        backgroundColor: radioTheme.buttonGroup?.backgroundColor || '#F9FAFB',
        borderRadius: radioTheme.buttonGroup?.borderRadius || '0.375rem',
        padding: radioTheme.buttonGroup?.padding || '0.25rem',
        borderWidth: buttonStyle === 'outline' ? '1px' : '0',
        borderStyle: 'solid',
        borderColor: radioTheme.buttonGroup?.borderColor || '#E5E7EB',
        ...styles.button,
      })

      return (
        <div
          ref={ref}
          className={`${combinedGroupClassName} ${buttonGroupStyles} ${
            classNames.button || ''
          }`}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onFocus={onFocus}
          onBlur={onBlur}
          id={id}
          role='radiogroup'
          aria-orientation={isVertical ? 'vertical' : 'horizontal'}
          {...props}
        >
          <RadioGroupContext.Provider value={contextValue}>
            {React.Children.map(childrenToRender, (child, index) => {
              if (React.isValidElement(child) && child.type === Radio) {
                const isChecked = (child.props as RadioProps).value === value
                const buttonStyles = css({
                  padding: radioTheme.button?.padding || '0.5rem 1rem',
                  borderRadius: radioTheme.button?.borderRadius || '0.25rem',
                  borderWidth: buttonStyle === 'outline' ? '1px' : '0',
                  borderStyle: 'solid',
                  borderColor: isChecked
                    ? radioTheme.button?.checked?.borderColor || '#5B80F7'
                    : radioTheme.button?.borderColor || 'transparent',
                  backgroundColor: isChecked
                    ? buttonStyle === 'solid'
                      ? radioTheme.button?.checked?.solidBackgroundColor ||
                        '#5B80F7'
                      : radioTheme.button?.checked?.outlineBackgroundColor ||
                        '#EFF6FF'
                    : radioTheme.button?.backgroundColor || 'transparent',
                  color: isChecked
                    ? buttonStyle === 'solid'
                      ? radioTheme.button?.checked?.solidTextColor || '#FFFFFF'
                      : radioTheme.button?.checked?.outlineTextColor ||
                        '#5B80F7'
                    : radioTheme.button?.textColor || '#374151',
                  transition: 'all 0.2s ease-in-out',
                  cursor: disabled ? 'not-allowed' : 'pointer',
                  '&:hover:not(:disabled)': {
                    backgroundColor: isChecked
                      ? buttonStyle === 'solid'
                        ? radioTheme.button?.checked?.hoverBackgroundColor ||
                          '#4C6EF5'
                        : radioTheme.button?.checked
                            ?.hoverOutlineBackgroundColor || '#DBEAFE'
                      : radioTheme.button?.hoverBackgroundColor || '#F3F4F6',
                    borderColor: isChecked
                      ? radioTheme.button?.checked?.hoverBorderColor ||
                        '#4C6EF5'
                      : radioTheme.button?.hoverBorderColor || '#D1D5DB',
                  },
                  ...(disabled && {
                    opacity: radioTheme.button?.disabled?.opacity || 0.6,
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
          </RadioGroupContext.Provider>
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
        role='radiogroup'
        aria-orientation={isVertical ? 'vertical' : 'horizontal'}
        {...props}
      >
        <RadioGroupContext.Provider value={contextValue}>
          {childrenToRender}
        </RadioGroupContext.Provider>
      </div>
    )
  }
)

RadioGroup.displayName = 'RadioGroup'

// Attach Group to Radio component (for ant-design compatibility)
;(Radio as any).Group = RadioGroup

// Export both Radio and RadioGroup
export { RadioGroup }
export default Radio
