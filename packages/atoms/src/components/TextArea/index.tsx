import React, { forwardRef } from 'react'
import { useTheme } from '../ThemeProvider'
import { defaultThemeConfig } from '../../config/config'
import Chip from '../Chip'
import {
  TextAreaConfig, TextAreaStyleParams,
  buildTextAreaContainerStyles, buildTextAreaInputContainerStyles,
  buildTextAreaElementStyles, buildTitleSectionStyles, buildHelperTextStyles,
  buildSubtextContainerStyles, buildIconContainerStyles, buildStatusTextStyles,
  buildTagsContainerStyles, buildGhostSkeletonStyles,
} from './useTextAreaStyles'

// ─── Open Union Types ────────────────────────────────────────────────────────

export type TextAreaType = 'regular' | 'success' | 'infoBlue' | 'error' | (string & {})
export type TextAreaSize = 'sm' | 'md' | 'lg' | (string & {})
export type TextAreaStyleVariant = 'standard' | 'withTags' | (string & {})
export type TextAreaInputStyle = 'tarmac-01' | (string & {})

export interface TagItem { value: string; status?: 'default' | 'error' | 'success' }

export interface TextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  textAreaStyle?: TextAreaInputStyle
  textAreaType?: TextAreaType; textAreaSize?: TextAreaSize; styleVariant?: TextAreaStyleVariant
  isDisabled?: boolean; isGhost?: boolean
  label?: React.ReactNode; isMandatory?: boolean; titleIcon?: React.ReactNode; descriptionText?: React.ReactNode
  helperTextTop?: React.ReactNode; helperTextBottom?: React.ReactNode
  trailingIcon?: React.ReactNode; statusText?: React.ReactNode
  rows?: number; resize?: 'none' | 'vertical' | 'horizontal' | 'both'
  subtext?: React.ReactNode
  tags?: TagItem[]; onTagsChange?: (tags: TagItem[]) => void; maxTagCount?: number; tokenSeparators?: string[]
}

const CUSTOM_KEYS = new Set([
  'textAreaStyle', 'textAreaType', 'textAreaSize', 'styleVariant', 'isDisabled', 'isGhost',
  'label', 'isMandatory', 'titleIcon', 'descriptionText', 'helperTextTop', 'helperTextBottom',
  'trailingIcon', 'statusText', 'resize', 'subtext', 'tags', 'onTagsChange', 'maxTagCount', 'tokenSeparators',
])
function getNativeProps(props: TextAreaProps): Record<string, unknown> {
  const n: Record<string, unknown> = {}
  for (const k of Object.keys(props)) { if (!CUSTOM_KEYS.has(k)) n[k] = (props as any)[k] }
  return n
}

const TAG_CHIP_TYPE_MAP: Record<string, string> = { default: 'blue', error: 'error', success: 'success' }

// Plus-circle icon matching Figma Tags trailing icon (add-circle-outline)
const PlusCircleIcon = ({ s = 16 }: { s?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={s} height={s} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 3a7 7 0 100 14 7 7 0 000-14zm-1 4a1 1 0 112 0v2h2a1 1 0 110 2h-2v2a1 1 0 11-2 0v-2H7a1 1 0 110-2h2V7z" clipRule="evenodd" />
  </svg>
)

// ─── TarmacTextArea (internal) ───────────────────────────────────────────────

const TarmacTextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => {
  const {
    textAreaType = 'regular', textAreaSize = 'md', styleVariant = 'standard',
    isDisabled = false, isGhost = false, isMandatory = false, resize = 'vertical',
    label, titleIcon, descriptionText, helperTextTop, helperTextBottom,
    trailingIcon, statusText, subtext, tags, onTagsChange,
  } = props

  const { theme } = useTheme()
  const config = (theme.components?.textArea_tarmac ||
    (defaultThemeConfig.components as any)?.textArea_tarmac || {}) as TextAreaConfig

  const sp: TextAreaStyleParams = { config, textAreaType, textAreaSize, styleVariant, isDisabled, isGhost }
  const ts = buildTitleSectionStyles(sp)
  const hs = buildHelperTextStyles(sp)
  const ss = buildSubtextContainerStyles(sp)
  const nativeProps = getNativeProps(props)

  if (isGhost) {
    const ghost = buildGhostSkeletonStyles(sp)
    return (
      <div className={buildTextAreaContainerStyles(sp)} style={{ pointerEvents: 'none' }}>
        <div className={ghost.skeletonTitle} data-testid="textarea-ghost-skeleton-title" />
        <div className={ghost.skeletonInput} data-testid="textarea-ghost-skeleton-input" />
      </div>
    )
  }

  const handleTagRemove = (idx: number) => {
    if (isDisabled || !onTagsChange || !tags) return
    onTagsChange(tags.filter((_, i) => i !== idx))
  }

  // Figma: Title row = [label + titleIcon (left)] ... [helperTextTop (right)]
  const showTitleContainer = !!(label || descriptionText || helperTextTop)
  // Figma: Subtext row = [subtext (left, flex-1)] ... [helperTextBottom (right)]
  const showSubtextContainer = !!(subtext || helperTextBottom)
  const isWithTags = styleVariant === 'withTags'

  return (
    <div className={buildTextAreaContainerStyles(sp)}>
      {showTitleContainer && (
        <div className={ts.titleContainer} data-testid="textarea-title-container">
          <div className={ts.titleRow}>
            {label && <label className={ts.labelStyles}>{label}</label>}
            {isMandatory && label && <span className={ts.mandatoryStyles}>*</span>}
            {titleIcon && <span className={ts.titleIconStyles}>{titleIcon}</span>}
            {helperTextTop && (
              <div className={hs.helperTextTopWrapperStyles}>
                <span className={hs.helperTextTopStyles}>{helperTextTop}</span>
              </div>
            )}
          </div>
          {descriptionText && <span className={ts.descriptionStyles}>{descriptionText}</span>}
        </div>
      )}

      {/* Figma bordered box */}
      <div className={buildTextAreaInputContainerStyles(sp)} data-testid="textarea-input-container">
        {isWithTags ? (
          /* With Tags: flex-col fills full height → [text row (flex-1)] then [tags at bottom] */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', height: '100%' }}>
            <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-start', width: '100%', flex: '1 1 auto' }}>
              <textarea ref={ref} className={buildTextAreaElementStyles(sp, 'none')} disabled={isDisabled} {...nativeProps} />
              {statusText && <span className={buildStatusTextStyles(sp)}>{statusText}</span>}
            </div>
            {tags && tags.length > 0 && (
              <div className={buildTagsContainerStyles(sp)} data-testid="textarea-tags-container">
                {tags.map((tag, idx) => (
                  <Chip key={idx} size="md"
                    chipType={TAG_CHIP_TYPE_MAP[tag.status || 'default'] as any}
                    chipVariant="outlined"
                    text={tag.value}
                    isDisabled={isDisabled}
                    trailingIcon={!isDisabled ? <PlusCircleIcon s={16} /> : undefined}
                    onClick={!isDisabled && onTagsChange ? () => handleTagRemove(idx) : undefined}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Standard: single row → [textarea (flex-1)] + [trailingIcon] + [statusText] */
          <>
            <textarea ref={ref} className={buildTextAreaElementStyles(sp, 'none')} disabled={isDisabled} {...nativeProps} />
            {trailingIcon && <span className={buildIconContainerStyles(sp)}>{trailingIcon}</span>}
            {statusText && <span className={buildStatusTextStyles(sp)}>{statusText}</span>}
          </>
        )}
      </div>

      {showSubtextContainer && (
        <div className={ss.subtextContainer} data-testid="textarea-subtext-container">
          <div>
            {subtext && <span className={ss.subtextStyles}>{subtext}</span>}
            {helperTextBottom && <span className={hs.helperTextBottomStyles}>{helperTextBottom}</span>}
          </div>
        </div>
      )}
    </div>
  )
})
TarmacTextArea.displayName = 'TarmacTextArea'

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => {
  if (!props.textAreaStyle) return null
  return <TarmacTextArea {...props} ref={ref} />
})
TextArea.displayName = 'TextArea'

export default TextArea
