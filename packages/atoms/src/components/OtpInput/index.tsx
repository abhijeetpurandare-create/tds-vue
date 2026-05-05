import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  KeyboardEvent,
  ClipboardEvent,
  ChangeEvent,
} from 'react'
import { useTheme } from '../ThemeProvider'
import { defaultThemeConfig } from '../../config/config'
import Input from '../Input'
import {
  buildOtpFieldsStyles,
  TITLE_TEXT_CLS,
  TITLE_ICON_CLS,
  HELPER_TEXT_CLS,
} from './useOtpFieldsStyles'
import type { OtpFieldsConfig } from './useOtpFieldsStyles'

// ─── Open Union Types ────────────────────────────────────────────────────────

export type OtpFieldOtpStyle = 'tarmac-01' | (string & {})
export type OtpFieldSize = 'sm' | 'md' | 'lg' | (string & {})
export type OtpFieldStyleVariant = 'default' | 'success' | 'error' | 'info' | (string & {})

// ─── Props Interface ─────────────────────────────────────────────────────────

export interface OtpInputProps {
  value?: string
  onChange?: (value: string) => void
  numDigits?: number
  autoFocus?: boolean
  isDisabled?: boolean
  placeholder?: string
  inputType?: 'text' | 'password' | 'number'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'outlined' | 'borderless' | 'filled' | 'underlined'
  status?: 'error' | 'warning' | 'success' | 'default'
  label?: React.ReactNode
  helperText?: React.ReactNode
  helperTextCss?: React.CSSProperties
  autoComplete?: string
  onComplete?: (value: string) => void
  className?: string
  style?: React.CSSProperties

  // === Tarmac discriminator ===
  otpStyle?: OtpFieldOtpStyle

  // === Tarmac-only props ===
  otpSize?: OtpFieldSize
  otpFieldStyle?: OtpFieldStyleVariant
  title?: string | React.ReactNode
  titleIcon?: React.ReactNode
  helperTextTop?: React.ReactNode
  helperTextBottom?: React.ReactNode
  subtext?: React.ReactNode
  isGhost?: boolean

  [key: string]: any
}

// ─── Shared Hooks ────────────────────────────────────────────────────────────

function useOtpState(value: string, numDigits: number) {
  const [otpValues, setOtpValues] = useState<string[]>(
    value
      .split('')
      .slice(0, numDigits)
      .concat(Array(Math.max(0, numDigits - value.length)).fill(''))
  )

  useEffect(() => {
    if (value) {
      const arr = value.split('').slice(0, numDigits)
      setOtpValues(arr.concat(Array(Math.max(0, numDigits - arr.length)).fill('')))
    } else {
      setOtpValues(Array(numDigits).fill(''))
    }
  }, [value, numDigits])

  return [otpValues, setOtpValues] as const
}

function useOtpHandlers(
  otpValues: string[],
  setOtpValues: React.Dispatch<React.SetStateAction<string[]>>,
  inputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>,
  numDigits: number,
  inputType: string,
  onChange?: (value: string) => void,
  onComplete?: (value: string) => void,
) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const rawValue = e.target.value
    if (rawValue === '') {
      const nv = [...otpValues]; nv[index] = ''; setOtpValues(nv); onChange?.(nv.join('')); return
    }
    const cleaned = inputType === 'number' ? rawValue.replace(/\D/g, '') : rawValue
    if (!cleaned) { const nv = [...otpValues]; setOtpValues(nv); onChange?.(nv.join('')); return }
    const lastChar = cleaned.slice(-1)
    const nv = [...otpValues]; nv[index] = lastChar; setOtpValues(nv)
    if (index < numDigits - 1) inputRefs.current[index + 1]?.focus()
    const str = nv.join(''); onChange?.(str)
    if (str.length === numDigits && onComplete) onComplete(str)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (inputType === 'number') {
      if (e.ctrlKey || e.metaKey || e.altKey) return
      const allowed = ['Backspace', 'ArrowLeft', 'ArrowRight']
      if (!/^\d$/.test(e.key) && !allowed.includes(e.key)) { e.preventDefault(); return }
    }
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
      const nv = [...otpValues]; nv[index - 1] = ''; setOtpValues(nv); onChange?.(nv.join(''))
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus()
    } else if (e.key === 'ArrowRight' && index < numDigits - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const paste = e.clipboardData.getData('text/plain').trim()
    if (!paste) return
    let valid = inputType === 'number' ? paste.replace(/\D/g, '') : paste
    valid = valid.slice(0, numDigits)
    const nv = [...valid.split(''), ...Array(Math.max(0, numDigits - valid.length)).fill('')]
    setOtpValues(nv.slice(0, numDigits)); onChange?.(nv.join('').slice(0, numDigits))
    inputRefs.current[Math.min(valid.length, numDigits - 1)]?.focus()
    if (valid.length === numDigits && onComplete) onComplete(valid)
  }

  return { handleChange, handleKeyDown, handlePaste }
}

// ─── Legacy OtpInput (unchanged logic) ───────────────────────────────────────

const LegacyOtpInput = forwardRef<HTMLDivElement, OtpInputProps>(
  (
    {
      value = '',
      onChange,
      numDigits = 6,
      autoFocus = false,
      isDisabled = false,
      placeholder = '',
      inputType = 'text',
      size = 'md',
      variant = 'outlined',
      status = 'default',
      label,
      helperText,
      helperTextCss,
      autoComplete = 'one-time-code',
      onComplete,
      className = '',
      style,
      ...restProps
    },
    ref
  ) => {
    const { theme } = useTheme()
    const activeTheme = theme || defaultThemeConfig

    const [otpValues, setOtpValues] = useState<string[]>(
      value
        .split('')
        .slice(0, numDigits)
        .concat(Array(Math.max(0, numDigits - value.length)).fill(''))
    )

    const inputRefs = useRef<(HTMLInputElement | null)[]>([])

    useEffect(() => {
      if (autoFocus && inputRefs.current[0]) {
        inputRefs.current[0].focus()
      }
    }, [autoFocus])

    useEffect(() => {
      if (value) {
        const valueArray = value.split('').slice(0, numDigits)
        setOtpValues(
          valueArray.concat(
            Array(Math.max(0, numDigits - valueArray.length)).fill('')
          )
        )
      } else {
        setOtpValues(Array(numDigits).fill(''))
      }
    }, [value, numDigits])

    const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
      const rawValue = e.target.value

      if (rawValue === '') {
        const newOtpValues = [...otpValues]
        newOtpValues[index] = ''
        setOtpValues(newOtpValues)
        onChange?.(newOtpValues.join(''))
        return
      }

      const cleanedValue =
        inputType === 'number' ? rawValue.replace(/\D/g, '') : rawValue

      if (!cleanedValue) {
        const newOtpValues = [...otpValues]
        setOtpValues(newOtpValues)
        onChange?.(newOtpValues.join(''))
        return
      }

      const lastChar = cleanedValue.slice(-1)

      const newOtpValues = [...otpValues]
      newOtpValues[index] = lastChar
      setOtpValues(newOtpValues)

      if (index < numDigits - 1 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1]?.focus()
      }

      const newOtpString = newOtpValues.join('')
      onChange?.(newOtpString)

      if (newOtpString.length === numDigits && onComplete) {
        onComplete(newOtpString)
      }
    }

    const handleKeyDown = (
      e: KeyboardEvent<HTMLInputElement>,
      index: number
    ) => {
      if (inputType === 'number') {
        const isModifierShortcut = e.ctrlKey || e.metaKey || e.altKey
        if (isModifierShortcut) {
          return
        }

        const allowedControlKeys = ['Backspace', 'ArrowLeft', 'ArrowRight']

        const isDigitKey = /^\d$/.test?.(e?.key)
        const isAllowedControlKey = allowedControlKeys.includes?.(e?.key)

        if (!isDigitKey && !isAllowedControlKey) {
          e?.preventDefault?.()
          return
        }
      }

      if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
        inputRefs.current[index - 1]?.focus()

        const newOtpValues = [...otpValues]
        newOtpValues[index - 1] = ''
        setOtpValues(newOtpValues)
        onChange?.(newOtpValues.join(''))
      } else if (e.key === 'ArrowLeft' && index > 0) {
        inputRefs.current[index - 1]?.focus()
      } else if (e.key === 'ArrowRight' && index < numDigits - 1) {
        inputRefs.current[index + 1]?.focus()
      }
    }

    const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault()
      const pasteData = e.clipboardData.getData('text/plain').trim()

      if (!pasteData) {
        return
      }

      let validInput = pasteData
      if (inputType === 'number') {
        validInput = validInput.replace(/\D/g, '')
      }

      validInput = validInput.slice(0, numDigits)

      const newOtpValues = [
        ...validInput.split(''),
        ...Array(Math.max(0, numDigits - validInput.length)).fill(''),
      ]
      setOtpValues(newOtpValues.slice(0, numDigits))
      onChange?.(newOtpValues.join('').slice(0, numDigits))

      const focusIndex = Math.min(validInput.length, numDigits - 1)
      inputRefs.current[focusIndex]?.focus()

      if (validInput.length === numDigits && onComplete) {
        onComplete(validInput)
      }
    }

    const sizeMap = {
      xs: '2rem',
      sm: '2.5rem',
      md: '3rem',
      lg: '3.5rem',
      xl: '4rem',
    }

    const inputWidth = sizeMap[size as keyof typeof sizeMap] || sizeMap.md

    useEffect(() => {
      if (inputType === 'number') {
        const styleElement = document.createElement('style')
        styleElement.textContent = `
          input[type=number]::-webkit-inner-spin-button,
          input[type=number]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
          input[type=number] {
            -moz-appearance: textfield;
            appearance: textfield;
          }
        `
        document.head.appendChild(styleElement)

        return () => {
          if (document.head.contains(styleElement)) {
            document.head.removeChild(styleElement)
          }
        }
      }
    }, [inputType])

    return (
      <div
        ref={ref}
        style={{ display: 'flex', flexDirection: 'column', ...style }}
        className={className}
        {...restProps}
      >
        {label && <div style={{ marginBottom: '0.5rem' }}>{label}</div>}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {Array.from({ length: numDigits }).map((_, index) => (
            <div
              key={index}
              style={{
                width: inputWidth,
                margin: '0 0.25rem',
              }}
            >
              <Input
                ref={(el: HTMLInputElement | HTMLTextAreaElement | null) => {
                  if (el && 'focus' in el) {
                    inputRefs.current[index] = el as HTMLInputElement
                  }
                }}
                type={inputType}
                value={otpValues[index]}
                placeholder={placeholder}
                maxLength={1}
                autoComplete={index === 0 ? autoComplete : 'off'}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChange(e, index)
                }
                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                  handleKeyDown(e, index)
                }
                onPaste={
                  index === 0
                    ? (e: ClipboardEvent<HTMLInputElement>) => handlePaste(e)
                    : undefined
                }
                disabled={isDisabled}
                aria-label={`Digit ${index + 1}`}
                size={size}
                variant={variant}
                status={status}
                style={{
                  textAlign: 'center',
                  padding: '0',
                  margin: '0',
                  width: '100%',
                  ...(inputType === 'number' && {
                    WebkitAppearance: 'none',
                    MozAppearance: 'textfield',
                    appearance: 'textfield',
                  }),
                }}
                label={undefined}
                helperText={undefined}
                classNames={{
                  wrapper: 'py-2',
                  input: '!text-center',
                }}
              />
            </div>
          ))}
        </div>
        {helperText && (
          <div
            style={{
              marginTop: '0.5rem',
              fontSize: '0.75rem',
              color: activeTheme?.colors?.text?.secondary || '#6B7280',
              ...helperTextCss,
            }}
          >
            {helperText}
          </div>
        )}
      </div>
    )
  }
)

LegacyOtpInput.displayName = 'LegacyOtpInput'

// ─── Tarmac OTP Fields ───────────────────────────────────────────────────────

const TarmacOtpFields = forwardRef<HTMLDivElement, OtpInputProps>(
  (props, ref) => {
    const {
      value = '',
      onChange,
      numDigits = 6,
      autoFocus = false,
      isDisabled = false,
      placeholder = '',
      inputType = 'text',
      autoComplete = 'one-time-code',
      onComplete,
      className = '',
      style,
      otpSize = 'lg',
      otpFieldStyle = 'default',
      title,
      titleIcon,
      helperTextTop,
      helperTextBottom: htbProp,
      helperText,
      subtext,
      isGhost = false,
    } = props

    const { theme } = useTheme()
    const config = (theme?.components?.otpFields_tarmac ||
      (defaultThemeConfig.components as any)?.otpFields_tarmac || {}) as OtpFieldsConfig

    const helperTextBottom = htbProp ?? helperText

    const inputRefs = useRef<(HTMLInputElement | null)[]>([])
    const [otpValues, setOtpValues] = useOtpState(value, numDigits)
    const { handleChange, handleKeyDown, handlePaste } = useOtpHandlers(
      otpValues, setOtpValues, inputRefs, numDigits, inputType, onChange, onComplete
    )

    useEffect(() => {
      if (autoFocus && inputRefs.current[0]) inputRefs.current[0].focus()
    }, [autoFocus])

    const s = buildOtpFieldsStyles({ config, otpFieldStyle, otpSize, isDisabled, isGhost })
    const hasTopRow = !!(title || titleIcon || helperTextTop)
    const hasBottomRow = !!(subtext || helperTextBottom)
    const ariaLabel = title ? String(title) : 'OTP Input'

    if (isGhost) {
      return (
        <div ref={ref} className={`${s.ghostContainer} ${className}`} style={style} aria-hidden="true">
          {hasTopRow && (
            <div className={s.ghostTopRow}>
              <div className={s.ghostTitleBlock} />
              {helperTextTop && <div className={s.ghostHelperTopBlock} />}
            </div>
          )}
          <div className={s.ghostInputRow}>
            {Array.from({ length: numDigits }).map((_, i) => (
              <div key={i} className={s.ghostInputBox} />
            ))}
          </div>
          {hasBottomRow && (
            <div className={s.ghostBottomRow}>
              {subtext && <div className={s.ghostSubtextBlock} />}
              {helperTextBottom && <div className={s.ghostHelperBottomBlock} />}
            </div>
          )}
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={`${s.container} ${className}`}
        style={style}
        role="group"
        aria-label={ariaLabel}
        aria-disabled={isDisabled || undefined}
      >
        {hasTopRow && (
          <div className={s.topRow}>
            <div className={s.titleArea}>
              {titleIcon && <span className={`${TITLE_ICON_CLS} ${s.titleIcon}`}>{titleIcon}</span>}
              {title && <span className={`${TITLE_TEXT_CLS} ${s.titleText}`}>{title}</span>}
            </div>
            {helperTextTop && <span className={`${HELPER_TEXT_CLS} ${s.helperTextTop}`}>{helperTextTop}</span>}
          </div>
        )}
        <div className={s.inputRow}>
          {Array.from({ length: numDigits }).map((_, index) => (
            <input
              key={index}
              ref={(el) => { inputRefs.current[index] = el }}
              type={inputType}
              value={otpValues[index]}
              maxLength={1}
              placeholder={placeholder}
              autoComplete={index === 0 ? autoComplete : 'off'}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={index === 0 ? handlePaste : undefined}
              disabled={isDisabled}
              aria-label={`Digit ${index + 1}`}
              className={s.inputBox}
            />
          ))}
        </div>
        {hasBottomRow && (
          <div className={s.bottomRow}>
            {subtext && <span className={s.subtext}>{subtext}</span>}
            {helperTextBottom && <span className={`${HELPER_TEXT_CLS} ${s.helperTextBottom}`}>{helperTextBottom}</span>}
          </div>
        )}
      </div>
    )
  }
)

TarmacOtpFields.displayName = 'TarmacOtpFields'

// ─── Main OtpInput (Discriminator Branch) ────────────────────────────────────

const OtpInput = forwardRef<HTMLDivElement, OtpInputProps>(
  (props, ref) => {
    if (props.otpStyle) return <TarmacOtpFields {...props} ref={ref} />
    return <LegacyOtpInput {...props} ref={ref} />
  }
)

OtpInput.displayName = 'OtpInput'

export default OtpInput
