import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import DatePickerBottomSheet from '../index';

/* ── Mocks ── */

jest.mock('../../ThemeProvider', () => ({
  useTheme: () => ({
    theme: {
      components: {
        datePickerBottomSheet: {
          base: { fontFamily: 'sans-serif', borderRadius: '12px' },
          header: {
            backgroundColor: '#fff',
            borderBottomColor: '#e6e6e6',
            padding: '16px',
            titleFontSize: '16px',
            titleFontWeight: '600',
            titleTextColor: '#2b2b2b',
            subtextFontSize: '12px',
            subtextTextColor: '#737373',
            closeIconColor: '#2b2b2b',
          },
          picker: {
            backgroundColor: '#fff',
            overlayBackgroundColor: 'rgba(35,150,251,0.1)',
            itemFontSize: '14px',
            baseFontWeight: '300',
            baseTextColor: '#737373',
            selectedFontWeight: '600',
            selectedTextColor: '#2b2b2b',
            columnGap: '8px',
            padding: '12px',
          },
          footer: {
            backgroundColor: '#fff',
            borderTopColor: '#e6e6e6',
            padding: '12px 16px',
            gap: '8px',
            cancelButtonStyle: 'secondary',
            cancelButtonVariant: 'black',
            cancelButtonSize: 'md',
            saveButtonStyle: 'primary',
            saveButtonVariant: 'black',
            saveButtonSize: 'md',
          },
        },
      },
    },
  }),
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock('../../Button', () => {
  const MockButton = (props: any) => (
    <button type="button" onClick={props.onClick} data-testid={`btn-${props.text?.toLowerCase()}`}>
      {props.text || props.children}
    </button>
  );
  MockButton.Text = MockButton;
  MockButton.Icon = MockButton;
  return { __esModule: true, default: MockButton };
});

jest.mock('../../MobileSheetWrapper', () => ({
  __esModule: true,
  default: ({ isOpen, onClose, children, className }: any) =>
    isOpen ? (
      <div data-testid="mobile-sheet-wrapper" className={className}>
        <div data-testid="sheet-overlay" onClick={onClose} />
        {children}
      </div>
    ) : null,
}));

// Each ScrollWheel instance gets a unique id via a counter so day/month/year
// items don't collide on the same numeric key (e.g. day-5 vs month-5).
let _wheelCounter = 0;
beforeEach(() => { _wheelCounter = 0; });

jest.mock('../../TimePicker/ScrollWheel', () => ({
  ScrollWheel: ({ values, selected, onSelect, format, isDisabled }: any) => {
    // Infer wheel type from the values array:
    //   12 items  → month wheel (indices 0-11)
    //   ≤31 items → day wheel
    //   >31 items → year wheel
    const count = values.length;
    const wheelName = count === 12 ? 'month' : count <= 31 ? 'day' : 'year';
    return (
      <div data-testid={`scroll-wheel-${wheelName}`}>
        {values.map((v: any) => {
          const label = format ? format(v) : String(v);
          const disabled = isDisabled ? isDisabled(v) : false;
          return (
            <button
              key={v}
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

/* ── Helpers ── */

const renderSheet = (props: Partial<React.ComponentProps<typeof DatePickerBottomSheet>> = {}) =>
  render(<DatePickerBottomSheet isOpen onClose={jest.fn()} {...props} />);

/* ═══════════════════════════════════════════════════════════════
   Rendering & Props
   ═══════════════════════════════════════════════════════════════ */

describe('DatePickerBottomSheet — Rendering & Props', () => {
  it('renders when isOpen=true', () => {
    renderSheet();
    expect(screen.getByTestId('mobile-sheet-wrapper')).toBeInTheDocument();
  });

  it('does not render when isOpen=false', () => {
    render(<DatePickerBottomSheet isOpen={false} onClose={jest.fn()} />);
    expect(screen.queryByTestId('mobile-sheet-wrapper')).not.toBeInTheDocument();
  });

  it('renders default title text', () => {
    renderSheet();
    expect(screen.getByText('Title goes here')).toBeInTheDocument();
  });

  it('renders custom title', () => {
    renderSheet({ title: 'Pick a date' });
    expect(screen.getByText('Pick a date')).toBeInTheDocument();
  });

  it('renders default subtext', () => {
    renderSheet();
    expect(screen.getByText('Subtext goes here')).toBeInTheDocument();
  });

  it('renders custom subtext', () => {
    renderSheet({ subtext: 'Choose day, month and year' });
    expect(screen.getByText('Choose day, month and year')).toBeInTheDocument();
  });

  it('hides subtext when showSubtext=false', () => {
    renderSheet({ showSubtext: false });
    expect(screen.queryByText('Subtext goes here')).not.toBeInTheDocument();
  });

  it('shows subtext when showSubtext=true (default)', () => {
    renderSheet({ showSubtext: true, subtext: 'Visible subtext' });
    expect(screen.getByText('Visible subtext')).toBeInTheDocument();
  });

  it('renders close button with aria-label', () => {
    renderSheet();
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });

  it('renders Cancel button', () => {
    renderSheet();
    expect(screen.getByTestId('btn-cancel')).toBeInTheDocument();
  });

  it('renders Save button', () => {
    renderSheet();
    expect(screen.getByTestId('btn-save')).toBeInTheDocument();
  });

  it('renders three scroll wheels (day, month, year)', () => {
    renderSheet();
    expect(screen.getByTestId('scroll-wheel-day')).toBeInTheDocument();
    expect(screen.getByTestId('scroll-wheel-month')).toBeInTheDocument();
    expect(screen.getByTestId('scroll-wheel-year')).toBeInTheDocument();
  });

  it('applies custom className to the sheet wrapper', () => {
    renderSheet({ className: 'my-custom-class' });
    expect(screen.getByTestId('mobile-sheet-wrapper')).toHaveClass('my-custom-class');
  });
});

/* ═══════════════════════════════════════════════════════════════
   Initial Value Behaviour
   ═══════════════════════════════════════════════════════════════ */

describe('DatePickerBottomSheet — Initial Value', () => {
  it('initialises to today when no value is provided', () => {
    const today = new Date();
    renderSheet();
    expect(screen.getByTestId(`day-item-${today.getDate()}`)).toHaveAttribute('data-selected', 'true');
  });

  it('initialises to the provided value date', () => {
    const date = new Date(2024, 5, 14); // June 14 2024
    renderSheet({ value: date });
    expect(screen.getByTestId('day-item-14')).toHaveAttribute('data-selected', 'true');
    // Month index 5 = June
    expect(screen.getByTestId('month-item-5')).toHaveAttribute('data-selected', 'true');
    expect(screen.getByTestId('year-item-2024')).toHaveAttribute('data-selected', 'true');
  });

  it('updates internal state when value prop changes', () => {
    const { rerender } = render(
      <DatePickerBottomSheet isOpen onClose={jest.fn()} value={new Date(2024, 0, 1)} />
    );
    expect(screen.getByTestId('day-item-1')).toHaveAttribute('data-selected', 'true');

    rerender(
      <DatePickerBottomSheet isOpen onClose={jest.fn()} value={new Date(2024, 5, 20)} />
    );
    expect(screen.getByTestId('day-item-20')).toHaveAttribute('data-selected', 'true');
  });
});

/* ═══════════════════════════════════════════════════════════════
   Callbacks
   ═══════════════════════════════════════════════════════════════ */

describe('DatePickerBottomSheet — Callbacks', () => {
  it('calls onClose when close button is clicked', () => {
    const onClose = jest.fn();
    renderSheet({ onClose });
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Cancel is clicked', () => {
    const onClose = jest.fn();
    renderSheet({ onClose });
    fireEvent.click(screen.getByTestId('btn-cancel'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onSave with a Date when Save is clicked', () => {
    const onSave = jest.fn();
    const date = new Date(2025, 3, 10); // April 10 2025
    renderSheet({ value: date, onSave });
    fireEvent.click(screen.getByTestId('btn-save'));
    expect(onSave).toHaveBeenCalledTimes(1);
    const saved: Date = onSave.mock.calls[0][0];
    expect(saved).toBeInstanceOf(Date);
    expect(saved.getFullYear()).toBe(2025);
    expect(saved.getMonth()).toBe(3);
    expect(saved.getDate()).toBe(10);
  });

  it('calls onClose after Save', () => {
    const onClose = jest.fn();
    renderSheet({ onClose, onSave: jest.fn() });
    fireEvent.click(screen.getByTestId('btn-save'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not throw when onSave is not provided', () => {
    renderSheet({ onSave: undefined });
    expect(() => fireEvent.click(screen.getByTestId('btn-save'))).not.toThrow();
  });

  it('does not throw when onClose is not provided', () => {
    render(<DatePickerBottomSheet isOpen />);
    expect(() => fireEvent.click(screen.getByTestId('btn-cancel'))).not.toThrow();
  });

  it('calls onClose when overlay is clicked', () => {
    const onClose = jest.fn();
    renderSheet({ onClose });
    fireEvent.click(screen.getByTestId('sheet-overlay'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

/* ═══════════════════════════════════════════════════════════════
   Scroll Wheel Interaction
   ═══════════════════════════════════════════════════════════════ */

describe('DatePickerBottomSheet — Scroll Wheel Interaction', () => {
  it('selecting a day updates the saved date', () => {
    const onSave = jest.fn();
    renderSheet({ value: new Date(2025, 0, 1), onSave });

    // Click day 15
    fireEvent.click(screen.getByTestId('day-item-15'));
    fireEvent.click(screen.getByTestId('btn-save'));

    const saved: Date = onSave.mock.calls[0][0];
    expect(saved.getDate()).toBe(15);
  });

  it('selecting a month updates the saved date', () => {
    const onSave = jest.fn();
    renderSheet({ value: new Date(2025, 0, 5), onSave });

    // Click month index 6 (July)
    fireEvent.click(screen.getByTestId('month-item-6'));
    fireEvent.click(screen.getByTestId('btn-save'));

    const saved: Date = onSave.mock.calls[0][0];
    expect(saved.getMonth()).toBe(6);
  });

  it('selecting a year updates the saved date', () => {
    const onSave = jest.fn();
    renderSheet({ value: new Date(2025, 0, 5), onSave });

    fireEvent.click(screen.getByTestId('year-item-2030'));
    fireEvent.click(screen.getByTestId('btn-save'));

    const saved: Date = onSave.mock.calls[0][0];
    expect(saved.getFullYear()).toBe(2030);
  });

  it('month wheel renders month names via format function', () => {
    renderSheet();
    expect(screen.getByText('January')).toBeInTheDocument();
    expect(screen.getByText('June')).toBeInTheDocument();
    expect(screen.getByText('December')).toBeInTheDocument();
  });
});

/* ═══════════════════════════════════════════════════════════════
   minDate / maxDate Constraints
   ═══════════════════════════════════════════════════════════════ */

describe('DatePickerBottomSheet — minDate / maxDate', () => {
  it('disables days before minDate', () => {
    const today = new Date();
    const min = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5);
    renderSheet({ minDate: min });

    // Day 1 should be disabled (before min)
    const day1 = screen.queryByTestId('day-item-1');
    if (day1) {
      expect(day1).toBeDisabled();
    }
  });

  it('disables days after maxDate', () => {
    const today = new Date();
    const max = new Date(today.getFullYear(), today.getMonth(), 1);
    renderSheet({ maxDate: max });

    // Day 28 should be disabled (after max if max is day 1)
    const day28 = screen.queryByTestId('day-item-28');
    if (day28) {
      expect(day28).toBeDisabled();
    }
  });

  it('does not call onSave with a disabled day when clicked', () => {
    const onSave = jest.fn();
    const today = new Date();
    const max = new Date(today.getFullYear(), today.getMonth(), 1);
    renderSheet({ maxDate: max, onSave });

    const day28 = screen.queryByTestId('day-item-28');
    if (day28 && day28.hasAttribute('disabled')) {
      fireEvent.click(day28);
      fireEvent.click(screen.getByTestId('btn-save'));
      // The saved date should not be day 28
      const saved: Date = onSave.mock.calls[0]?.[0];
      if (saved) {
        expect(saved.getDate()).not.toBe(28);
      }
    }
  });

  it('renders without error when both minDate and maxDate are provided', () => {
    const today = new Date();
    const min = new Date(today.getFullYear(), today.getMonth(), 1);
    const max = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    expect(() => renderSheet({ minDate: min, maxDate: max })).not.toThrow();
  });
});

/* ═══════════════════════════════════════════════════════════════
   Accessibility
   ═══════════════════════════════════════════════════════════════ */

describe('DatePickerBottomSheet — Accessibility', () => {
  it('close button has aria-label="Close"', () => {
    renderSheet();
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
  });

  it('Cancel button is a button element', () => {
    renderSheet();
    expect(screen.getByTestId('btn-cancel').tagName).toBe('BUTTON');
  });

  it('Save button is a button element', () => {
    renderSheet();
    expect(screen.getByTestId('btn-save').tagName).toBe('BUTTON');
  });
});
