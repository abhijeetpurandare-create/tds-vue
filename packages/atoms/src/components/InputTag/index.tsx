import React, { useState, useRef, useCallback, useMemo, CSSProperties } from 'react'
import { css } from '@emotion/css'
import { useTheme } from '../ThemeProvider'
import { defaultThemeConfig } from '../../config/config'
import Pill from '../Pill'

// ─── Tag Item Type ──────────────────────────────────────────────

/** Status determines which Pill variant + theme colors to use */
export type TagStatus = 'default' | 'error' | 'warning' | 'success' | 'info' | string

/** Each tag is an object with a value and an optional status */
export interface TagItem {
  value: string
  status?: TagStatus
}

// ─── Props Interface ───────────────────────────────────────────

export interface InputTagProps {
  /**
   * Current array of tag items (controlled).
   * Accepts either:
   *  - `TagItem[]` (objects with value + status)
   *  - `string[]`  (shorthand — each string treated as `{ value: str, status: 'default' }`)
   */
  value: (TagItem | string)[]
  /**
   * Called when tags change.
   * Always emits `TagItem[]` so the consumer has full control over statuses.
   */
  onChange: (tags: TagItem[]) => void
  /** Characters that trigger tag creation when typed/pasted */
  tokenSeparators?: string[]
  /** Maximum number of tags allowed */
  maxTagCount?: number
  /** Whether the input is disabled */
  disabled?: boolean
  /** Placeholder text shown when no tags exist */
  placeholder?: string
  /** Label text above the input */
  label?: React.ReactNode
  /** Error message to display below the input */
  errorMessage?: string
  /** Text for the clear error button */
  customClearErrorButtonText?: string
  /** Called when the clear error button is clicked */
  onClearErrors?: () => void
  /** Show/hide the clear error button (default: true when onClearErrors provided) */
  showClearErrorButton?: boolean

  // ── Tag Visual Customization ──

  /** Orca Pill size for tags */
  tagSize?: 'sm' | 'md' | 'lg'
  /** Whether tags have a border */
  tagBordered?: boolean
  /** Custom close icon for tags */
  tagCloseIcon?: React.ReactNode

  // ── Container Customization ──

  /** Additional className for the root wrapper */
  className?: string
  /** Additional className for the tag container */
  containerClassName?: string
  /** Style overrides for the tag container */
  containerStyle?: React.CSSProperties

  // ── Style Customization  ──

  /** Class names for individual elements */
  classNames?: {
    root?: string           // Root wrapper div
    label?: string          // Label element
    container?: string      // Tag container div (merge with existing containerClassName)
    input?: string         // Textarea input element
    helperText?: string     // Error message span
    clearButton?: string    // Clear errors button
    errorRow?: string       // Error + clear button row container
  }
  /** Inline styles for individual elements */
  styles?: {
    root?: CSSProperties
    label?: CSSProperties
    container?: CSSProperties
    input?: CSSProperties
    helperText?: CSSProperties
    clearButton?: CSSProperties
    errorRow?: CSSProperties
  }
}

// ─── Pill variant mapping from TagStatus ────────────────────────

const STATUS_TO_PILL_VARIANT: Record<TagStatus, 'default' | 'success' | 'danger' | 'warning' | 'info'> = {
  default: 'default',
  error: 'danger',
  warning: 'warning',
  success: 'success',
  info: 'info',
}

// ─── Component ─────────────────────────────────────────────────

const InputTag: React.FC<InputTagProps> = ({
  value,
  onChange,
  tokenSeparators = [',', ' ', '\n'],
  maxTagCount,
  disabled = false,
  placeholder = '',
  label,
  errorMessage = '',
  customClearErrorButtonText = 'Clear items with errors',
  onClearErrors,
  showClearErrorButton,

  tagSize = 'sm',
  tagBordered = false,
  tagCloseIcon,

  className = '',
  containerClassName = '',
  containerStyle,

  classNames = {},
  styles = {},

}) => {
  const { theme } = useTheme()
  const inputTagConfig =
    theme.components?.inputTag || defaultThemeConfig.components.inputTag

  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // ── Normalize value to TagItem[] ──────────────────────────

  const normalizedTags: TagItem[] = useMemo(() => {
    return value.map((item) => {
      if (typeof item === 'string') {
        return {
          value: item,
          status: 'default' as TagStatus,
        }
      }
      return { ...item, status: item.status || 'default' }
    })
  }, [value])

  // Check if any tag has a non-default status (for border color logic)
  const hasErrors = useMemo(
    () => !!errorMessage || normalizedTags.some((t) => t.status === 'error'),
    [errorMessage, normalizedTags]
  )

  // ── entriesFull ──
  const entriesFull = !!maxTagCount && normalizedTags.length >= maxTagCount

  // ──  hasSeparator ──
  const hasSeparator = useCallback(
    (str: string): boolean => {
      return tokenSeparators.length > 0 && tokenSeparators.some((sep) => str.includes(sep))
    },
    [tokenSeparators]
  )

  // ──  safeUpdate ──
  const safeUpdate = useCallback(
    (newItems: TagItem[]) => {
      const items = normalizedTags.concat(newItems)
      onChange(maxTagCount ? items.slice(0, maxTagCount) : items)
    },
    [normalizedTags, onChange, maxTagCount]
  )

  // ──  handleSeparators ──
  const handleSeparators = useCallback(
    (cValue: string) => {
      if (hasSeparator(cValue)) {
        const alphaSep = tokenSeparators[0]
        let str = cValue
        // Replace all separators with the first one (normalize to single separator type)
        tokenSeparators.forEach((s) => {
          str = str.replaceAll(s, alphaSep)
        })

        const existingValues = normalizedTags.map((t) => t.value)
        const strArr = str
          .split(alphaSep)
          .map((v) => v.trim())
          .filter((v) => v.length > 0 && !existingValues.includes(v))

        safeUpdate(strArr.map((v) => ({ value: v, status: 'default' as TagStatus })))
        setInputValue('')
      }
    },
    [normalizedTags, hasSeparator, safeUpdate, tokenSeparators]
  )

  // ──  onEnter ──
  const onEnter = useCallback(
    (event?: React.KeyboardEvent) => {
      if (event) {
        event.preventDefault()
        event.stopPropagation()
      }

      if (entriesFull) {
        return
      }

      const currVal = inputValue.replace(',', '').replaceAll('\n', '').trim()
      if (currVal.length) {
        const existingValues = normalizedTags.map((t) => t.value)
        const itemIndex = existingValues.findIndex(
          (item) => item.toLowerCase() === currVal
        )
        const inputItems =
          itemIndex > -1
            ? normalizedTags
                .filter((_, idx) => idx !== itemIndex)
                .concat({ value: currVal, status: 'default' as TagStatus })
            : [...normalizedTags, { value: currVal, status: 'default' as TagStatus }]

        onChange(maxTagCount ? inputItems.slice(0, maxTagCount) : inputItems)
        setInputValue('')
      }
    },
    [normalizedTags, inputValue, onChange, entriesFull, maxTagCount]
  )

  // ──  onDelete ──
  const onDelete = useCallback(() => {
    if (!inputValue.length) {
      if (normalizedTags.length > 0) {
        onChange(normalizedTags.filter((_, idx) => idx !== normalizedTags.length - 1))
      }
    }
  }, [inputValue, normalizedTags, onChange])

  // ── Event Handlers ──

  // Ref: prevent handleChange from re-processing after onEnter already handled Enter
  const enterHandledRef = useRef(false)
  // Ref: prevent handleChange from processing pasted text that we're handling in onPaste
  const pasteHandledRef = useRef(false)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      enterHandledRef.current = true
      onEnter(e)
    }
    if (e.key === 'Backspace') {
      onDelete()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // If onEnter already processed this Enter keypress, skip the change event
    // (some browsers fire onChange despite preventDefault on keydown)
    if (enterHandledRef.current) {
      enterHandledRef.current = false
      setInputValue('')
      return
    }

    // If onPaste already processed this paste, skip the change event
    // (some browsers fire onChange after paste even with preventDefault)
    if (pasteHandledRef.current) {
      pasteHandledRef.current = false
      setInputValue('')
      return
    }

    const val = e.target.value
    setInputValue(val)
    handleSeparators(val)
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const pastedText = e.clipboardData.getData('text')
    if (pastedText && hasSeparator(pastedText)) {
      e.preventDefault() // Stop browser from inserting text
      pasteHandledRef.current = true // Mark that we're handling this paste
      // Combine current input value with pasted text, then process separators
      const combined = inputValue + pastedText
      handleSeparators(combined)
      // Reset ref after a microtask to allow handleChange to skip if it fires
      setTimeout(() => {
        pasteHandledRef.current = false
      }, 0)
    }
  }

  const removeTag = (index: number) => {
    onChange(normalizedTags.filter((_, i) => i !== index))
  }

  const handlePillClose = (
    e: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    e.preventDefault() // CRITICAL: prevent Pill from hiding itself via internal state
    removeTag(index)
  }

  const focusInput = () => {
    inputRef.current?.focus()
  }

  // ── Theming / Styles ──

  const cfg = inputTagConfig

  const containerStyles = css({
    border: `1px solid ${hasErrors ? cfg.container.errorBorderColor : cfg.container.borderColor}`,
    borderRadius: cfg.container.borderRadius,
    backgroundColor: disabled
      ? cfg.container.disabledBackgroundColor
      : cfg.container.backgroundColor,
    minHeight: cfg.container.minHeight,
    maxHeight: cfg.container.maxHeight,
    padding: cfg.container.padding,
    gap: cfg.container.gap,
    overflowY: 'auto',
    cursor: disabled ? 'not-allowed' : 'text',
    display: 'flex',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
    transition: 'border-color 0.2s ease',
    ...(disabled
      ? { borderColor: cfg.container.disabledBorderColor }
      : {
          '&:hover': {
            borderColor: hasErrors
              ? cfg.container.errorBorderColor
              : cfg.container.focusBorderColor,
          },
          '&:focus-within': {
            borderColor: hasErrors
              ? cfg.container.errorBorderColor
              : cfg.container.focusBorderColor,
          },
        }),
  })

  const inputStyles = css({
    flex: 1,
    minWidth: cfg.input.minWidth,
    minHeight: cfg.input.minHeight,
    resize: 'none',
    border: 'none',
    outline: 'none',
    fontSize: cfg.input.fontSize,
    color: cfg.input.color,
    backgroundColor: 'transparent',
    fontFamily: 'inherit',
    '&::placeholder': {
      color: cfg.input.placeholderColor,
    },
  })

  const labelStyles = css({
    fontSize: cfg.label.fontSize,
    fontWeight: cfg.label.fontWeight,
    color: cfg.label.color,
    marginBottom: cfg.label.marginBottom,
  })

  const helperTextStyles = css({
    fontSize: cfg.helperText.fontSize,
    color: cfg.helperText.errorColor,
  })

  const clearBtnStyles = css({
    fontSize: cfg.clearButton.fontSize,
    color: cfg.clearButton.color,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    '&:hover': {
      textDecoration: 'underline',
    },
  })

  // Resolve whether to show clear button
  const shouldShowClear =
    showClearErrorButton !== undefined ? showClearErrorButton : !!onClearErrors

  // ── Get pill props for a given tag ──

  const getPillProps = (tag: TagItem) => {
    const status = tag.status || 'default'
    const pillVariant = STATUS_TO_PILL_VARIANT[status]
    
    return {
      variant: pillVariant,
    }
  }

  return (
    <div 
      className={`${css({ display: 'flex', flexDirection: 'column', width: '100%' })} ${className} ${classNames?.root || ''}`}
      style={styles?.root}
    >
      {/* Label */}
      {label && (
        <label 
          className={`${labelStyles} ${classNames?.label || ''}`}
          style={styles?.label}
        >
          {label}
        </label>
      )}

      {/* Tag container + input area */}
      <div
        ref={containerRef}
        className={`${containerStyles} ${containerClassName} ${classNames?.container || ''}`}
        style={{ ...containerStyle, ...styles?.container }}
        onClick={focusInput}
      >
        {/* Tags rendered as Orca Pills */}
        {normalizedTags.map((tag, idx) => {
          const pillProps = getPillProps(tag)

          return (
            <Pill
              key={`${tag.value}-${idx}`}
              size={tagSize}
              closable={!disabled}
              bordered={tagBordered}
              closeIcon={tagCloseIcon}
              variant={pillProps.variant}
              onClose={(e) => handlePillClose(e, idx)}
            >
              {tag.value}
            </Pill>
          )
        })}

        {/* Textarea input */}
        {!disabled && (
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            placeholder={normalizedTags.length === 0 ? placeholder : ''}
            className={`${inputStyles} ${classNames?.input || ''}`}
            style={styles?.input}
            rows={1}
          />
        )}
      </div>

      {/* Error + Clear button row */}
      <div
        className={`${css({
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '0.25rem',
        })} ${classNames?.errorRow || ''}`}
        style={styles?.errorRow}
      >
        {errorMessage ? (
          <span 
            className={`${helperTextStyles} ${classNames?.helperText || ''}`}
            style={styles?.helperText}
          >
            {errorMessage}
          </span>
        ) : (
          <span />
        )}
        {shouldShowClear && onClearErrors && (
          <button
            type="button"
            className={`${clearBtnStyles} ${classNames?.clearButton || ''}`}
            style={styles?.clearButton}
            onClick={onClearErrors}
          >
            {customClearErrorButtonText}
          </button>
        )}
      </div>
    </div>
  )
}

InputTag.displayName = 'InputTag'
export default InputTag
