import { createContext, useContext, useState, useEffect, useCallback } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

export type SelectionValue = string | number

export interface DropdownStateContextValue {
  /** The "draft" selection — what checkboxes reflect while the panel is open */
  draftValue: SelectionValue[]
  /** The "committed" selection — what the trigger label reflects */
  committedValue: SelectionValue[]
  /** Toggle a single option in the draft */
  handleSelect: (itemValue: SelectionValue) => void
  /** Commit the current draft (called by Apply button or immediate-commit paths) */
  apply: () => void
  /** Discard the draft and revert to committed (called on dismiss) */
  discard: () => void
  /** Whether the panel is open */
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  /** Whether this is a multi-select dropdown */
  multiple: boolean
  /** Whether an Apply button gates the commit */
  hasApply: boolean
}

export const DropdownStateContext = createContext<DropdownStateContextValue>({
  draftValue: [],
  committedValue: [],
  handleSelect: () => {},
  apply: () => {},
  discard: () => {},
  isOpen: false,
  setIsOpen: () => {},
  multiple: true,
  hasApply: true,
})

export function useDropdownStateContext() {
  return useContext(DropdownStateContext)
}

// ─── State manager hook ───────────────────────────────────────────────────────

export interface UseDropdownStateOptions {
  /** Controlled committed value from parent */
  value?: SelectionValue[]
  /** Default value for uncontrolled mode */
  defaultValue?: SelectionValue[]
  /** Called on every option click (informational for multi; committed for single/instant) */
  onChange?: (val: SelectionValue[]) => void
  /** Called when Apply is clicked (multi+hasApply only) */
  onApply?: (val: SelectionValue[]) => void
  /** Multi-select mode */
  multiple?: boolean
  /** Whether an Apply button gates the commit (only relevant for multi) */
  hasApply?: boolean
}

export function useDropdownState({
  value,
  defaultValue,
  onChange,
  onApply,
  multiple = true,
  hasApply = true,
}: UseDropdownStateOptions) {
  const isControlled = value !== undefined

  // Committed state — what the trigger label shows
  const [internalCommitted, setInternalCommitted] = useState<SelectionValue[]>(
    defaultValue ?? (multiple ? [] : [])
  )
  const committedValue = isControlled ? value : internalCommitted

  // Draft state — live in-panel selection
  const [draftValue, setDraftValue] = useState<SelectionValue[]>(committedValue)

  const [isOpen, setIsOpenRaw] = useState(false)

  // Sync draft when panel opens (so it always starts from committed)
  const setIsOpen = useCallback((open: boolean) => {
    if (open) setDraftValue(committedValue)
    setIsOpenRaw(open)
  }, [committedValue])

  // Sync when parent changes value prop externally
  useEffect(() => {
    if (isControlled) {
      setInternalCommitted(value)
      setDraftValue(value)
    }
  }, [isControlled, value])

  // Commit helper — updates internal state and fires callbacks
  const commit = useCallback((val: SelectionValue[]) => {
    if (!isControlled) setInternalCommitted(val)
    onChange?.(val)
  }, [isControlled, onChange])

  const handleSelect = useCallback((itemValue: SelectionValue) => {
    if (!multiple) {
      // Single select: always commit immediately and close
      const next = [itemValue]
      setDraftValue(next)
      commit(next)
      setIsOpenRaw(false)
      return
    }

    // Multi-select: toggle in draft
    const next = draftValue.includes(itemValue)
      ? draftValue.filter(v => v !== itemValue)
      : [...draftValue, itemValue]
    setDraftValue(next)

    if (!hasApply) {
      // Instant commit — no Apply button
      commit(next)
    } else {
      // Batch/Apply UX — just inform parent of in-progress selection
      onChange?.(next)
    }
  }, [multiple, hasApply, draftValue, commit, onChange])

  const apply = useCallback(() => {
    commit(draftValue)
    onApply?.(draftValue)
    setIsOpenRaw(false)
  }, [draftValue, commit, onApply])

  const discard = useCallback(() => {
    setDraftValue(committedValue)
    setIsOpenRaw(false)
  }, [committedValue])

  return {
    draftValue,
    committedValue,
    handleSelect,
    apply,
    discard,
    isOpen,
    setIsOpen,
    multiple,
    hasApply,
  }
}
