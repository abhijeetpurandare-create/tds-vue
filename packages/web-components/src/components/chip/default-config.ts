import type { ChipConfig } from './chip-styles';

export const defaultChipConfig: ChipConfig = {
  base: {
    fontFamily: 'Noto Sans, sans-serif',
    fontWeight: '500',
    borderRadius: '8px',
    transition: 'all 0.15s ease-in-out',
    focus: { ring: '0 0 0 2px rgba(0,0,0,0.4)' },
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
