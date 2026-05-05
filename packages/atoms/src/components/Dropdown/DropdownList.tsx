import React from 'react'
import { css } from '@emotion/css'
import { useTheme } from '../ThemeProvider'
import { defaultThemeConfig } from '../../config/config'
import Checkbox from '../Checkbox'
import AvatarComponent from '../Avatar'
import Pill from '../Pill'
import { toCssDimension } from '../../utils/toCssDimension'
import type {
  DropdownTarmacConfig,
  DropCellStyleConfig,
  DropCellSizeConfig,
} from './useDropdownStyles'
import {
  buildDropCellStyles,
  getDropCellStyleConfig,
  getDropCellSizeConfig,
} from './useDropdownStyles'

// ─── Dimension helper (handles raw numbers and string numbers) ───────────────

function dim(v: string | number | undefined, fallback = '0'): string {
  if (v === undefined || v === null || v === '') return fallback
  return String(toCssDimension(v) ?? fallback)
}

// ─── Injected props that Cell passes to sub-components ───────────────────────

interface CellInjectedProps {
  _cellStyle?: string
  _isSelected?: boolean
  _isDisabled?: boolean
  _styleConfig?: DropCellStyleConfig
  _sizeConfig?: DropCellSizeConfig
  _onToggle?: () => void
}

// ─── Public Types ────────────────────────────────────────────────────────────

export type DropdownListCellStyle = 'regular' | 'infoBlue' | (string & {})
export type DropdownListCellSize = 'sm' | 'md' | 'lg' | (string & {})

export interface DropdownListCellProps {
  cellStyle?: DropdownListCellStyle
  size?: DropdownListCellSize
  isSelected?: boolean
  isDisabled?: boolean
  onClick?: () => void
  children: React.ReactNode
  className?: string
}

export interface DropdownListCheckboxProps extends CellInjectedProps {
  checked?: boolean
  disabled?: boolean
}

export interface DropdownListAvatarProps extends CellInjectedProps {
  children?: React.ReactNode
  src?: string
  alt?: string
}

export interface DropdownListContentProps extends CellInjectedProps {
  label: string
  subtext?: string
}

export interface DropdownListIconProps extends CellInjectedProps {
  children: React.ReactNode
}

export interface DropdownListPillsProps extends CellInjectedProps {
  label: string
  variant?: string
}

// ─── Cell (container) ────────────────────────────────────────────────────────

const Cell: React.FC<DropdownListCellProps> = ({
  cellStyle = 'regular',
  size = 'md',
  isSelected = false,
  isDisabled = false,
  onClick,
  children,
  className,
}) => {
  const { theme } = useTheme()
  const config = (theme.components?.dropdown_tarmac ||
    (defaultThemeConfig.components as any)?.dropdown_tarmac || {}) as DropdownTarmacConfig

  const styleConfig = getDropCellStyleConfig(config, cellStyle)
  const sizeConfig = getDropCellSizeConfig(config, size)

  const cellCls = buildDropCellStyles({
    config, cellStyle, size, isSelected, isDisabled,
  })

  const injected: CellInjectedProps = {
    _cellStyle: cellStyle,
    _isSelected: isSelected,
    _isDisabled: isDisabled,
    _styleConfig: styleConfig,
    _sizeConfig: sizeConfig,
    _onToggle: onClick,
  }

  return (
    <div
      className={`${cellCls}${className ? ` ${className}` : ''}`}
      role="option"
      aria-selected={isSelected}
      aria-disabled={isDisabled || undefined}
      data-testid="dropdown-list-cell"
      onClick={!isDisabled ? onClick : undefined}
    >
      {React.Children.map(children, child =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<CellInjectedProps>, injected)
          : child
      )}
    </div>
  )
}


// ─── Checkbox sub-component ──────────────────────────────────────────────────

const CellCheckbox: React.FC<DropdownListCheckboxProps> = ({
  checked,
  disabled,
  _cellStyle,
  _isSelected = false,
  _isDisabled = false,
  _onToggle,
}) => {
  const resolvedChecked = checked ?? _isSelected
  const resolvedDisabled = disabled ?? _isDisabled

  const tarmacVariant =
    _cellStyle === 'infoBlue' && resolvedChecked ? 'blue' : 'standard'

  return (
    <span
      onClick={e => e.stopPropagation()}
      style={{ display: 'inline-flex', flexShrink: 0, width: 20, height: 20, alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' }}
      data-testid="dropdown-list-checkbox"
    >
      <Checkbox
        tarmacVariant={tarmacVariant}
        tarmacStyle="box"
        size="md"
        checked={resolvedChecked}
        disabled={resolvedDisabled}
        onChange={() => { if (_onToggle) _onToggle() }}
      />
    </span>
  )
}

// ─── Avatar sub-component ────────────────────────────────────────────────────

const CellAvatar: React.FC<DropdownListAvatarProps> = ({
  children,
  src,
  alt,
  _isDisabled = false,
}) => {
  return (
    <span style={{ display: 'inline-flex', flexShrink: 0, width: 28, height: 28 }} data-testid="dropdown-list-avatar">
      <AvatarComponent
        avatarType={src ? 'image' : 'initials'}
        size="sm"
        shape="round"
        src={src}
        alt={alt}
        isDisabled={_isDisabled}
      >
        {children}
      </AvatarComponent>
    </span>
  )
}

// ─── Content sub-component (label + optional subtext) ────────────────────────

const CellContent: React.FC<DropdownListContentProps> = ({
  label,
  subtext,
  _isDisabled = false,
  _sizeConfig,
  _styleConfig,
}) => {
  const sizeConfig = _sizeConfig || {} as DropCellSizeConfig
  const styleConfig = _styleConfig || {} as DropCellStyleConfig

  const labelStyle = css({
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const,
    fontWeight: 400,
    fontSize: dim(sizeConfig.fontSize, '14px'),
    lineHeight: dim(sizeConfig.lineHeight, '20px'),
  })

  const subtextStyle = css({
    fontSize: dim(sizeConfig.descriptionFontSize, '12px'),
    lineHeight: dim(sizeConfig.descriptionLineHeight, '16px'),
    fontWeight: 400,
    color: _isDisabled
      ? styleConfig.disabledTextColor
      : styleConfig.descriptionColor,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const,
  })

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}
      data-testid="dropdown-list-content"
    >
      <span className={labelStyle}>{label}</span>
      {subtext && (
        <span className={subtextStyle} data-testid="dropdown-list-subtext">
          {subtext}
        </span>
      )}
    </div>
  )
}


// ─── LeadingIcon sub-component ───────────────────────────────────────────────

const LeadingIcon: React.FC<DropdownListIconProps> = ({
  children,
  _isDisabled = false,
  _sizeConfig,
  _styleConfig,
}) => {
  const sizeConfig = _sizeConfig || {} as DropCellSizeConfig
  const styleConfig = _styleConfig || {} as DropCellStyleConfig
  const iconSize = dim(sizeConfig.iconSize, '20px')

  const iconCls = css({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: iconSize,
    height: iconSize,
    flexShrink: 0,
    color: _isDisabled ? styleConfig.disabledTextColor : styleConfig.iconColor,
    '& svg': { width: '100%', height: '100%' },
  })

  return (
    <span className={iconCls} data-testid="dropdown-list-leading-icon">
      {children}
    </span>
  )
}

// ─── TrailingIcon sub-component ──────────────────────────────────────────────

const TrailingIcon: React.FC<DropdownListIconProps> = ({
  children,
  _isDisabled = false,
  _sizeConfig,
  _styleConfig,
}) => {
  const sizeConfig = _sizeConfig || {} as DropCellSizeConfig
  const styleConfig = _styleConfig || {} as DropCellStyleConfig
  const iconSize = dim(sizeConfig.iconSize, '20px')

  const iconCls = css({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: iconSize,
    height: iconSize,
    flexShrink: 0,
    color: _isDisabled ? styleConfig.disabledTextColor : styleConfig.iconColor,
    '& svg': { width: '100%', height: '100%' },
  })

  return (
    <span className={iconCls} data-testid="dropdown-list-trailing-icon">
      {children}
    </span>
  )
}

// ─── Pills sub-component ────────────────────────────────────────────────────

const CellPills: React.FC<DropdownListPillsProps> = ({
  label,
  variant,
  _cellStyle,
}) => {
  const resolvedVariant = variant || (_cellStyle === 'infoBlue' ? 'blue' : 'black')

  return (
    <span style={{ display: 'inline-flex', flexShrink: 0 }} data-testid="dropdown-list-pills">
      <Pill
        pillVariant={resolvedVariant as any}
        pillType="solid"
        size="sm"
      >
        {label}
      </Pill>
    </span>
  )
}

// ─── Compound export ─────────────────────────────────────────────────────────

const DropdownList = Object.assign(Cell, {
  Cell,
  Checkbox: CellCheckbox,
  Avatar: CellAvatar,
  Content: CellContent,
  LeadingIcon,
  TrailingIcon,
  Pills: CellPills,
})

export default DropdownList
