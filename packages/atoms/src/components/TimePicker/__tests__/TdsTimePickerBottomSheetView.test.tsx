import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TdsTimePickerBottomSheetView } from '../TdsTimePickerBottomSheetView';

/* ── Mocks ── */

jest.mock('../../MobileSheetWrapper', () => ({
  __esModule: true,
  default: ({ isOpen, onClose, children }: any) =>
    isOpen ? (
      <div data-testid="sheet-wrapper">
        <div data-testid="sheet-overlay" onClick={onClose} />
        {children}
      </div>
    ) : null,
}));

jest.mock('../../Button', () => {
  const MockButton = (props: any) => (
    <button
      type="button"
      onClick={props.onClick}
      disabled={props.isDisabled}
      data-testid={`btn-${props.text?.toLowerCase()}`}
    >
      {props.text}
    </button>
  );
  MockButton.Text = MockButton;
  MockButton.Icon = MockButton;
  return { __esModule: true, default: MockButton };
});

// Wheel mock — infers name from values length/content to avoid testid collisions
jest.mock('../ScrollWheel', () => ({
  ScrollWheel: ({ values, selected, onSelect, format, isDisabled, loop }: any) => {
    const count = values.length;
    // Identify wheel by its value set
    let wheelName: string;
    if (count === 2 && values.includes('AM')) {
      wheelName = 'ampm';
    } else if (count === 12 && values.includes(12)) {
      wheelName = 'hour12';
    } else if (count === 24) {
      wheelName = 'hour24';
    } else if (count === 12 && values.includes(0) && values.includes(55)) {
      wheelName = 'minute';
    } else if (count === 60) {
      wheelName = 'second';
    } else {
      wheelName = `wheel-${count}`;
    }
    return (
      <div data-testid={`scroll-wheel-${wheelName}`}>
        {values.map((v: any) => {
          const label = format ? format(v) : String(v);
          const disabled = isDisabled ? isDisabled(v) : false;
          return (
            <button
              key={String(v)}
              type="button"
              data-testid={`${wheelName}-item-${v}`}
              data-selected={v === selected}
              disabled={disabled}
              onClick={() => !disabled && onSelect(v)}
            >
              {label}
            </button>
          );
        })}
      </div>
    );
  },
}));

/* ── Default props ── */

const baseTheme = {
  base: { fontFamily: 'sans-serif' },
  bottomSheet: {
    backgroundColor: '#fff',
    header: {
      padding: '16px',
      titleFontSize: '14px',
      titleFontWeight: '500',
      titleTextColor: '#2b2b2b',
      subtextFontSize: '10px',
      subtextTextColor: '#737373',
      iconSize: '20px',
      iconColor: '#2b2b2b',
    },
    picker: {
      padding: '16px',
      overlayBackgroundColor: 'rgba(35,150,251,0.1)',
      overlayHeight: '36px',
      overlayBorderRadius: '4px',
      columnGap: '10px',
      itemFontSize: '14px',
      baseFontWeight: '300',
      baseTextColor: '#737373',
      selectedFontWeight: '600',
      selectedTextColor: '#2b2b2b',
    },
    footer: {
      gap: '8px',
      padding: '8px',
      cancelButtonStyle: 'secondary',
      cancelButtonVariant: 'black',
      cancelButtonSize: 'md',
      saveButtonStyle: 'primary',
      saveButtonVariant: 'black',
      saveButtonSize: 'md',
    },
  },
};

const defaultProps: React.ComponentProps<typeof TdsTimePickerBottomSheetView> = {
  isOpen: true,
  hour: 10,
  minute: 30,
  second: 0,
  ampm: 'AM',
  isDoneDisabled: false,
  use24Hour: false,
  showSeconds: false,
  title: 'Select Time',
  subtext: 'Choose hour and minute',
  showSubtext: true,
  themeConfig: baseTheme,
  onClose: jest.fn(),
  onHourChange: jest.fn(),
  onMinuteChange: jest.fn(),
  onSecondChange: jest.fn(),
  onAmpmChange: jest.fn(),
  onSave: jest.fn(),
  onCancel: jest.fn(),
};

const renderSheet = (overrides: Partial<React.ComponentProps<typeof TdsTimePickerBottomSheetView>> = {}) =>
  render(<TdsTimePickerBottomSheetView {...defaultProps} {...overrides} />);

/* ═══════════════════════════════════════════════════════════════
   Rendering & Props
   ═══════════════════════════════════════════════════════════════ */

describe('TdsTimePickerBottomSheetView — Rendering & Props', () => {
  it('renders when isOpen=true', () => {
    renderSheet();
    expect(screen.getByTestId('sheet-wrapper')).toBeInTheDocument();
  });

  it('does not render when isOpen=false', () => {
    renderSheet({ isOpen: false });
    expect(screen.queryByTestId('sheet-wrapper')).not.toBeInTheDocument();
  });

  it('renders the title', () => {
    renderSheet({ title: 'Pick a time' });
    expect(screen.getByText('Pick a time')).toBeInTheDocument();
  });

  it('renders default title when not provided', () => {
    renderSheet({ title: undefined });
    expect(screen.getByText('Title goes here')).toBeInTheDocument();
  });

  it('renders subtext when showSubtext=true', () => {
    renderSheet({ subtext: 'HH:MM format', showSubtext: true });
    expect(screen.getByText('HH:MM format')).toBeInTheDocument();
  });

  it('hides subtext when showSubtext=false', () => {
    renderSheet({ subtext: 'Hidden', showSubtext: false });
    expect(screen.queryByText('Hidden')).not.toBeInTheDocument();
  });

  it('renders close button with aria-label', () => {
    renderSheet();
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
  });

  it('renders Cancel button', () => {
    renderSheet();
    expect(screen.getByTestId('btn-cancel')).toBeInTheDocument();
  });

  it('renders Save button', () => {
    renderSheet();
    expect(screen.getByTestId('btn-save')).toBeInTheDocument();
  });

  it('Save button is disabled when isDoneDisabled=true', () => {
    renderSheet({ isDoneDisabled: true });
    expect(screen.getByTestId('btn-save')).toBeDisabled();
  });

  it('Save button is enabled when isDoneDisabled=false', () => {
    renderSheet({ isDoneDisabled: false });
    expect(screen.getByTestId('btn-save')).not.toBeDisabled();
  });
});

/* ═══════════════════════════════════════════════════════════════
   12-hour mode wheels
   ═══════════════════════════════════════════════════════════════ */

describe('TdsTimePickerBottomSheetView — 12-hour mode', () => {
  it('renders hour, minute, and AM/PM wheels', () => {
    renderSheet({ use24Hour: false, showSeconds: false });
    expect(screen.getByTestId('scroll-wheel-hour12')).toBeInTheDocument();
    expect(screen.getByTestId('scroll-wheel-minute')).toBeInTheDocument();
    expect(screen.getByTestId('scroll-wheel-ampm')).toBeInTheDocument();
  });

  it('does not render seconds wheel when showSeconds=false', () => {
    renderSheet({ use24Hour: false, showSeconds: false });
    expect(screen.queryByTestId('scroll-wheel-second')).not.toBeInTheDocument();
  });

  it('renders seconds wheel when showSeconds=true', () => {
    renderSheet({ use24Hour: false, showSeconds: true, second: 15 });
    expect(screen.getByTestId('scroll-wheel-second')).toBeInTheDocument();
  });

  it('hour wheel has 12 items (1–12)', () => {
    renderSheet({ use24Hour: false });
    const wheel = screen.getByTestId('scroll-wheel-hour12');
    expect(wheel.querySelectorAll('button')).toHaveLength(12);
  });

  it('minute wheel has 12 items (0,5,10…55)', () => {
    renderSheet({ use24Hour: false });
    const wheel = screen.getByTestId('scroll-wheel-minute');
    expect(wheel.querySelectorAll('button')).toHaveLength(12);
  });

  it('AM/PM wheel has 2 items', () => {
    renderSheet({ use24Hour: false });
    const wheel = screen.getByTestId('scroll-wheel-ampm');
    expect(wheel.querySelectorAll('button')).toHaveLength(2);
  });

  it('AM item is selected when ampm=AM', () => {
    renderSheet({ ampm: 'AM' });
    expect(screen.getByTestId('ampm-item-AM')).toHaveAttribute('data-selected', 'true');
    expect(screen.getByTestId('ampm-item-PM')).toHaveAttribute('data-selected', 'false');
  });

  it('PM item is selected when ampm=PM', () => {
    renderSheet({ ampm: 'PM' });
    expect(screen.getByTestId('ampm-item-PM')).toHaveAttribute('data-selected', 'true');
  });
});

/* ═══════════════════════════════════════════════════════════════
   24-hour mode wheels
   ═══════════════════════════════════════════════════════════════ */

describe('TdsTimePickerBottomSheetView — 24-hour mode', () => {
  it('renders hour and minute wheels', () => {
    renderSheet({ use24Hour: true, showSeconds: false });
    expect(screen.getByTestId('scroll-wheel-hour24')).toBeInTheDocument();
    expect(screen.getByTestId('scroll-wheel-minute')).toBeInTheDocument();
  });

  it('does not render AM/PM wheel in 24-hour mode', () => {
    renderSheet({ use24Hour: true });
    expect(screen.queryByTestId('scroll-wheel-ampm')).not.toBeInTheDocument();
  });

  it('hour wheel has 24 items (0–23)', () => {
    renderSheet({ use24Hour: true });
    const wheel = screen.getByTestId('scroll-wheel-hour24');
    expect(wheel.querySelectorAll('button')).toHaveLength(24);
  });

  it('renders seconds wheel in 24-hour mode when showSeconds=true', () => {
    renderSheet({ use24Hour: true, showSeconds: true, second: 0 });
    expect(screen.getByTestId('scroll-wheel-second')).toBeInTheDocument();
  });

  it('seconds wheel has 60 items', () => {
    renderSheet({ use24Hour: true, showSeconds: true, second: 0 });
    const wheel = screen.getByTestId('scroll-wheel-second');
    expect(wheel.querySelectorAll('button')).toHaveLength(60);
  });
});

/* ═══════════════════════════════════════════════════════════════
   Callbacks
   ═══════════════════════════════════════════════════════════════ */

describe('TdsTimePickerBottomSheetView — Callbacks', () => {
  it('calls onClose when close button is clicked', () => {
    const onClose = jest.fn();
    renderSheet({ onClose });
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when overlay is clicked', () => {
    const onClose = jest.fn();
    renderSheet({ onClose });
    fireEvent.click(screen.getByTestId('sheet-overlay'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onCancel when Cancel is clicked', () => {
    const onCancel = jest.fn();
    renderSheet({ onCancel });
    fireEvent.click(screen.getByTestId('btn-cancel'));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('calls onSave when Save is clicked', () => {
    const onSave = jest.fn();
    renderSheet({ onSave, isDoneDisabled: false });
    fireEvent.click(screen.getByTestId('btn-save'));
    expect(onSave).toHaveBeenCalledTimes(1);
  });

  it('does not call onSave when Save is disabled', () => {
    const onSave = jest.fn();
    renderSheet({ onSave, isDoneDisabled: true });
    fireEvent.click(screen.getByTestId('btn-save'));
    expect(onSave).not.toHaveBeenCalled();
  });

  it('calls onHourChange when an hour item is clicked', () => {
    const onHourChange = jest.fn();
    renderSheet({ use24Hour: false, onHourChange });
    fireEvent.click(screen.getByTestId('hour12-item-3'));
    expect(onHourChange).toHaveBeenCalledWith(3);
  });

  it('calls onMinuteChange when a minute item is clicked', () => {
    const onMinuteChange = jest.fn();
    renderSheet({ onMinuteChange });
    fireEvent.click(screen.getByTestId('minute-item-15'));
    expect(onMinuteChange).toHaveBeenCalledWith(15);
  });

  it('calls onAmpmChange when AM/PM item is clicked', () => {
    const onAmpmChange = jest.fn();
    renderSheet({ ampm: 'AM', onAmpmChange });
    fireEvent.click(screen.getByTestId('ampm-item-PM'));
    expect(onAmpmChange).toHaveBeenCalledWith('PM');
  });

  it('calls onSecondChange when a second item is clicked', () => {
    const onSecondChange = jest.fn();
    renderSheet({ showSeconds: true, second: 0, onSecondChange });
    fireEvent.click(screen.getByTestId('second-item-30'));
    expect(onSecondChange).toHaveBeenCalledWith(30);
  });

  it('calls onHourChange with 24h value in 24-hour mode', () => {
    const onHourChange = jest.fn();
    renderSheet({ use24Hour: true, hour: 0, onHourChange });
    fireEvent.click(screen.getByTestId('hour24-item-14'));
    expect(onHourChange).toHaveBeenCalledWith(14);
  });
});

/* ═══════════════════════════════════════════════════════════════
   Disabled items (isHourDisabled / isMinuteDisabled)
   ═══════════════════════════════════════════════════════════════ */

describe('TdsTimePickerBottomSheetView — Disabled wheel items', () => {
  it('disables hours via isHourDisabled', () => {
    renderSheet({ use24Hour: false, isHourDisabled: (h) => h === 1 });
    expect(screen.getByTestId('hour12-item-1')).toBeDisabled();
    expect(screen.getByTestId('hour12-item-2')).not.toBeDisabled();
  });

  it('does not fire onHourChange for a disabled hour', () => {
    const onHourChange = jest.fn();
    renderSheet({ use24Hour: false, isHourDisabled: (h) => h === 1, onHourChange });
    fireEvent.click(screen.getByTestId('hour12-item-1'));
    expect(onHourChange).not.toHaveBeenCalled();
  });

  it('disables minutes via isMinuteDisabled', () => {
    renderSheet({ isMinuteDisabled: (m) => m === 0 });
    expect(screen.getByTestId('minute-item-0')).toBeDisabled();
    expect(screen.getByTestId('minute-item-5')).not.toBeDisabled();
  });

  it('does not fire onMinuteChange for a disabled minute', () => {
    const onMinuteChange = jest.fn();
    renderSheet({ isMinuteDisabled: (m) => m === 0, onMinuteChange });
    fireEvent.click(screen.getByTestId('minute-item-0'));
    expect(onMinuteChange).not.toHaveBeenCalled();
  });
});

/* ═══════════════════════════════════════════════════════════════
   Selected state reflected in wheels
   ═══════════════════════════════════════════════════════════════ */

describe('TdsTimePickerBottomSheetView — Selected state', () => {
  it('marks the correct minute as selected', () => {
    // minute=30 → nearest MINS_5 value is 30
    renderSheet({ minute: 30 });
    expect(screen.getByTestId('minute-item-30')).toHaveAttribute('data-selected', 'true');
  });

  it('marks the correct second as selected', () => {
    renderSheet({ showSeconds: true, second: 45 });
    expect(screen.getByTestId('second-item-45')).toHaveAttribute('data-selected', 'true');
  });

  it('marks AM as selected when ampm=AM', () => {
    renderSheet({ ampm: 'AM' });
    expect(screen.getByTestId('ampm-item-AM')).toHaveAttribute('data-selected', 'true');
  });

  it('marks PM as selected when ampm=PM', () => {
    renderSheet({ ampm: 'PM' });
    expect(screen.getByTestId('ampm-item-PM')).toHaveAttribute('data-selected', 'true');
  });
});

/* ═══════════════════════════════════════════════════════════════
   Accessibility
   ═══════════════════════════════════════════════════════════════ */

describe('TdsTimePickerBottomSheetView — Accessibility', () => {
  it('close button has aria-label="Close"', () => {
    renderSheet();
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
  });

  it('Cancel is a native button element', () => {
    renderSheet();
    expect(screen.getByTestId('btn-cancel').tagName).toBe('BUTTON');
  });

  it('Save is a native button element', () => {
    renderSheet();
    expect(screen.getByTestId('btn-save').tagName).toBe('BUTTON');
  });
});
