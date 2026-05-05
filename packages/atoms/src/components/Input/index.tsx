import React, { forwardRef, CSSProperties } from 'react'
import { useTheme } from '../ThemeProvider'
import { defaultThemeConfig } from '../../config/config'
import LegacyInput from './LegacyInput'
import {
  InputFieldConfig, buildContainerStyles, buildTitleSectionStyles,
  buildHelperTextStyles, buildAddonStyles, buildIconContainerStyles,
  buildInputRowStyles, buildInputContainerStyles, buildInputElementStyles,
  buildInputSectionStyles, buildSubtextContainerStyles, buildStatusTextStyles,
  buildStatusIndicatorStyles, buildGhostSkeletonStyles,
} from './useInputFieldStyles'

// ─── Open Union Types ────────────────────────────────────────────────────────

export type InputFieldType = 'regular' | 'success' | 'infoBlue' | 'error' | (string & {})
export type InputFieldSize = 'sm' | 'md' | 'lg' | (string & {})
export type InputFieldStyleVariant = 'standard' | 'addonLeft' | 'addonRight' | (string & {})
export type InputFieldInputStyle = 'tarmac-01' | (string & {})
export type StatusIndicatorType = 'success' | 'failed' | 'information'

// ─── Props Interface ─────────────────────────────────────────────────────────

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>, 'size'> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; variant?: 'outlined' | 'borderless' | 'filled' | 'underlined'
  addonBefore?: React.ReactNode; addonAfter?: React.ReactNode; allowClear?: boolean
  /** @deprecated Use leadingIcon instead */ prefixIcon?: React.ReactNode
  /** @deprecated Use trailingIcon instead */ suffixIcon?: React.ReactNode
  isMobileNumberField?: boolean
  mobileFieldDetails?: { countryCode?: string; handleCountryChange?: (country: object) => void; showFlag?: boolean }
  showCount?: boolean; count?: number; status?: 'error' | 'warning' | 'success' | 'default'
  onPressEnter?: (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onClear?: () => void; label?: React.ReactNode; helperText?: React.ReactNode
  required?: boolean; multiline?: boolean; isPassword?: boolean
  classNames?: Record<string, string>; styles?: Record<string, CSSProperties>
  inputStyle?: InputFieldInputStyle
  inputType?: InputFieldType; inputSize?: InputFieldSize; styleVariant?: InputFieldStyleVariant
  addonText?: React.ReactNode; isDisabled?: boolean; isGhost?: boolean; isMandatory?: boolean
  titleIcon?: React.ReactNode; leadingIcon?: React.ReactNode; trailingIcon?: React.ReactNode
  helperTextTop?: React.ReactNode; helperTextBottom?: React.ReactNode
  statusIndicator?: StatusIndicatorType; badge?: React.ReactNode
  statusText?: React.ReactNode; subtext?: React.ReactNode
  /** Interactive addon content for the left slot — takes priority over addonText when styleVariant="addonLeft" */
  addonLeft?: React.ReactNode
  /** Interactive addon content for the right slot — takes priority over addonText when styleVariant="addonRight" */
  addonRight?: React.ReactNode
}

// Keys to strip before spreading onto the native <input>
const CUSTOM_PROP_KEYS = new Set([
  'inputStyle', 'inputType', 'inputSize', 'styleVariant', 'addonText',
  'addonLeft', 'addonRight',
  'isDisabled', 'isGhost', 'isMandatory', 'titleIcon', 'leadingIcon',
  'trailingIcon', 'helperTextTop', 'helperTextBottom', 'statusIndicator',
  'badge', 'statusText', 'subtext', 'size', 'variant', 'status',
  'addonBefore', 'addonAfter', 'allowClear', 'prefixIcon', 'suffixIcon',
  'isMobileNumberField', 'mobileFieldDetails', 'isPassword', 'showCount',
  'count', 'onPressEnter', 'onClear', 'multiline', 'classNames', 'styles',
  'helperText', 'label',
])

function getNativeProps(props: InputProps): Record<string, unknown> {
  const native: Record<string, unknown> = {}
  for (const key of Object.keys(props)) {
    if (!CUSTOM_PROP_KEYS.has(key)) native[key] = (props as any)[key]
  }
  return native
}

// ─── Status Indicator Element ────────────────────────────────────────────────

const StatusIndicatorElement: React.FC<{ type: StatusIndicatorType }> = ({ type }) => (
  <span className={buildStatusIndicatorStyles(type)} />
)

// ─── Tarmac Input Field ──────────────────────────────────────────────────────

const TarmacInputField = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  (props, ref) => {
    const {
      inputType = 'regular', inputSize = 'md', styleVariant = 'standard',
      isDisabled = false, isGhost = false, isMandatory = false,
      label, titleIcon, badge, subtext, helperTextTop,
      helperTextBottom: htbProp, helperText, addonText,
      addonLeft, addonRight,
      leadingIcon: liProp, trailingIcon: tiProp, prefixIcon, suffixIcon,
      statusIndicator, statusText,
    } = props

    const { theme } = useTheme()
    const config = (theme.components?.inputField_tarmac ||
      (defaultThemeConfig.components as any)?.inputField_tarmac || {}) as InputFieldConfig

    const leadingIcon = liProp ?? prefixIcon
    const trailingIcon = tiProp ?? suffixIcon
    const helperTextBottom = htbProp ?? helperText
    const nativeProps = getNativeProps(props)

    const sp = { config, inputType, inputSize, styleVariant, isDisabled, isGhost }
    const ts = buildTitleSectionStyles(sp)
    const hs = buildHelperTextStyles(sp)
    const iconCls = buildIconContainerStyles(sp)

    // Figma Ghost state: render skeleton blocks instead of full component
    if (isGhost) {
      const ghost = buildGhostSkeletonStyles(sp)
      return (
        <div className={buildContainerStyles(sp)}>
          <div className={ghost.titleBlock} />
          <div className={buildInputSectionStyles()}>
            <div className={ghost.inputBlock} />
          </div>
        </div>
      )
    }

    return (
      <div className={buildContainerStyles(sp)}>
        {/* Figma: Title Container — flex row, justify-between */}
        {(label || subtext || helperTextTop) && (
          <div className={ts.titleContainer}>
            {(label || subtext) && (
              <div className={ts.titleRow}>
                {titleIcon && <span className={ts.titleIcon}>{titleIcon}</span>}
                <label className={ts.label}>{label}</label>
                {isMandatory && <span className={ts.mandatoryMarker}>*</span>}
              </div>
            )}
            {helperTextTop && (
              <div className={ts.helperTextTopWrapper}>
                <span className={hs.helperTextTop}>{helperTextTop}</span>
              </div>
            )}
          </div>
        )}
        {/* Figma: Input Section — flex-col, gap=6px */}
        <div className={buildInputSectionStyles()}>
          {/* Figma: Input Row — flex, overflow-clip, rounded */}
          <div className={buildInputRowStyles(sp)}>
            {styleVariant === 'addonLeft' && (
              <div className={buildAddonStyles(sp)} role="group" aria-label="Input addon" data-testid="input-addon-left">
                {addonLeft ?? addonText}
              </div>
            )}
            <div className={buildInputContainerStyles(sp)}>
              {leadingIcon && <span className={iconCls}>{leadingIcon}</span>}
              <input ref={ref as React.Ref<HTMLInputElement>} className={buildInputElementStyles(sp)} disabled={isDisabled} {...nativeProps} />
              {trailingIcon && <span className={iconCls}>{trailingIcon}</span>}
              {statusText && <span className={buildStatusTextStyles(sp)}>{statusText}</span>}
              {badge && <span>{badge}</span>}
            </div>
            {styleVariant === 'addonRight' && (
              <div className={buildAddonStyles(sp)} role="group" aria-label="Input addon" data-testid="input-addon-right">
                {addonRight ?? addonText}
              </div>
            )}
          </div>
          {/* Figma: Subtext Container — flex, items-center > inner flex gap=6px */}
          {(statusIndicator || subtext || helperTextBottom) && (
            <div className={buildSubtextContainerStyles(sp)}>
              <div>
                {statusIndicator && <StatusIndicatorElement type={statusIndicator} />}
                {subtext && <span className={hs.helperTextBottom}>{subtext}</span>}
                {helperTextBottom && <span className={hs.helperTextBottom}>{helperTextBottom}</span>}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
)
TarmacInputField.displayName = 'TarmacInputField'

// ─── Main Input Component (Discriminator Branch) ─────────────────────────────

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  (props, ref) => {
    if (props.inputStyle) return <TarmacInputField {...props} ref={ref} />
    return <LegacyInput {...props} ref={ref} />
  }
)
Input.displayName = 'Input'
export default Input
