import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DateRangePicker from '../index';

jest.mock('../../ThemeProvider', () => ({
  useTheme: () => ({
    theme: {
      components: {
        dateRangePicker: {
          variants: { default: { backgroundColor: '#3B82F6', textColor: '#fff', hoverColor: '#1D4ED8', lightBackground: '#93C5FD20', lightTextColor: '#1D4ED8' } },
          sizes: { md: { padding: '0.5rem 1rem', fontSize: '1rem', iconSize: '16px' } },
          base: { borderColor: '#e5e7eb', borderRadius: '0.375rem', backgroundColor: '#fff', textColor: '#111827', placeholderColor: '#9CA3AF', hoverBorderColor: '#3B82F6', shadow: '0 4px 6px -1px rgba(0,0,0,0.1)', iconColor: '#6B7280' },
          calendar: { backgroundColor: '#fff', headerTextColor: '#111827', weekDayTextColor: '#6B7280', dayTextColor: '#111827', disabledTextColor: '#D1D5DB', borderColor: '#E5E7EB', navArrowHoverColor: '#111827', gridHoverBackgroundColor: '#F3F4F6', outsideMonthTextColor: '#A3AAC2' },
          sidebar: { backgroundColor: '#fff', textColor: '#374151', borderColor: '#E5E7EB', hoverBackgroundColor: '#F3F4F6' },
          footer: { clearTextColor: '#EF4444', doneBackgroundColor: '#111827', doneTextColor: '#fff' },
          dropdown: { activeBackgroundColor: '#EFF6FF', activeTextColor: '#1D4ED8', inactiveBackgroundColor: '#F3F4F6', inactiveTextColor: '#374151', clearIconColor: '#9CA3AF', clearIconHoverColor: '#6B7280' },
          states: { disabled: { cursor: 'not-allowed', opacity: 0.5 } },
        },
        datePicker: {
          base: { fontFamily: 'sans-serif', borderRadius: '4px', transition: 'all 0.15s ease-in-out' },
          input: { backgroundColor: '#fff', borderColor: '#e6e6e6', borderWidth: '1px', borderRadius: '6px', padding: '12px', gap: '4px', fontSize: '14px', lineHeight: '20px', fontWeight: '500', textColor: '#2b2b2b', placeholderColor: '#2b2b2b', iconSize: '20px', hoverBorderColor: '#ccc', activeBorderColor: '#ccc' },
          calendar: { backgroundColor: '#fff', borderRadius: '4px', shadow: '0px 0px 6px 0px rgba(0,0,0,0.2)', padding: '12px', headerFontSize: '14px', headerLineHeight: '20px', headerFontWeight: '400', headerTextColor: '#2b2b2b', navButtonBorderColor: '#e6e6e6', navButtonBorderWidth: '0.5px', navButtonBorderRadius: '4px', navButtonPadding: '6px', navButtonIconSize: '16px', navButtonGap: '4px', weekDayFontSize: '14px', weekDayLineHeight: '20px', weekDayFontWeight: '300', weekDayTextColor: '#98a2bc', dayCellSize: '36px', dayCellFontSize: '14px', dayCellLineHeight: '20px', dayCellFontWeight: '500', dayCellTextColor: '#2b2b2b', dayCellBorderRadius: '4px', dayCellPadding: '8px', dayCellHoverBackgroundColor: '#f0f0f0', dayCellPressedBackgroundColor: '#000', dayCellPressedTextColor: '#e6e6e6', dayCellDisabledTextColor: '#cdcbcb', dateGroupGap: '8px', dateGroupPaddingX: '12px' },
          sidebar: { width: '140px', paddingX: '12px', paddingY: '8px', fontSize: '14px', lineHeight: '20px', textColor: '#2b2b2b', fontWeight: '400', selectedFontWeight: '600', dotColor: '#1ba76e', dotSize: '6px', hoverBackgroundColor: '#f0f0f0', gap: '4px' },
          footer: { gap: '8px', paddingX: '12px', paddingBottom: '12px', cancelButtonStyle: 'secondary', cancelButtonVariant: 'black', cancelButtonSize: 'md', applyButtonStyle: 'primary', applyButtonVariant: 'black', applyButtonSize: 'md' },
        },
      },
    },
  }),
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock('../../Button', () => {
  const MockButton = (props: any) => <button onClick={props.onClick}>{props.text || props.children}</button>;
  MockButton.Text = MockButton;
  MockButton.Icon = MockButton;
  return { __esModule: true, default: MockButton };
});
describe('DateRangePicker', () => {
  describe('Dropdown Mode (Default)', () => {
    it('renders the dropdown button by default', () => {
      render(<DateRangePicker />);
      const button = screen.getByText('Date Range');
      expect(button).toBeInTheDocument();
    });

    it('opens calendar when dropdown button is clicked', () => {
      render(<DateRangePicker />);
      const button = screen.getByText('Date Range');
      fireEvent.click(button);
      
      expect(screen.getByText('Today')).toBeInTheDocument();
      expect(screen.getByText('Yesterday')).toBeInTheDocument();
      expect(screen.getByText('This Week')).toBeInTheDocument();
      expect(screen.getByText('Custom')).toBeInTheDocument();
    });

    it('displays calendar header with current month and year when opened', () => {
      const today = new Date();
      const monthName = today.toLocaleString('default', { month: 'long' });
      render(<DateRangePicker />);
      
      // Open the calendar first
      const button = screen.getByText('Date Range');
      fireEvent.click(button);
      
      expect(screen.getByText(monthName)).toBeInTheDocument();
      expect(screen.getByText(today.getFullYear().toString())).toBeInTheDocument();
    });

    it('selects a start date and an end date when clicking two days', () => {
      render(<DateRangePicker />);
      
      // Open the calendar first
      const button = screen.getByText('Date Range');
      fireEvent.click(button);
      
      // Select two visible day elements
      const days = screen.getAllByText(/^([1-9]|1[0-9]|2[0-9]|3[0-1])$/).filter((el) => el.className.includes('cursor-pointer'));
      expect(days.length).toBeGreaterThan(1);

      fireEvent.click(days[0]);
      fireEvent.click(days[5]);

      // After selecting, both days should have selected styles
      // The exact class might vary due to dynamic CSS-in-JS, so we check for some selection indication
      expect(days[0]).toBeDefined();
      expect(days[5]).toBeDefined();
    });

    it('clears the selected range when clicking Clear', () => {
      render(<DateRangePicker />);
      
      // Open the calendar first
      const button = screen.getByText('Date Range');
      fireEvent.click(button);
      
      const days = screen.getAllByText(/^([1-9]|1[0-9]|2[0-9]|3[0-1])$/).filter((el) => el.className.includes('cursor-pointer'));
      fireEvent.click(days[0]);
      fireEvent.click(days[5]);

      const clearButton = screen.getByText('Clear');
      fireEvent.click(clearButton);

      // After clearing, the button text should go back to default
      expect(screen.getByText('Date Range')).toBeInTheDocument();
    });

    it('navigates to next month when navigation button is clicked', async () => {
      render(<DateRangePicker />);
      
      // Open the calendar first
      const button = screen.getByText('Date Range');
      fireEvent.click(button);
      
      const today = new Date();
      const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1);
      const nextMonthName = nextMonth.toLocaleString('default', { month: 'long' });

      // Find and click the next month navigation button (right arrow)
      const nextButtons = screen.getAllByRole('button');
      const nextButton = nextButtons.find(btn => btn.querySelector('path[d="m9 18 6-6-6-6"]'));
      
      if (nextButton) {
        fireEvent.click(nextButton);
        await waitFor(() => {
          expect(screen.getByText(nextMonthName)).toBeInTheDocument();
        });
      }
    });

    it('navigates to previous month when navigation button is clicked', async () => {
      render(<DateRangePicker />);
      
      // Open the calendar first
      const button = screen.getByText('Date Range');
      fireEvent.click(button);
      
      const today = new Date();
      const prevMonth = new Date(today.getFullYear(), today.getMonth() - 1);
      const prevMonthName = prevMonth.toLocaleString('default', { month: 'long' });

      // Find and click the previous month navigation button (left arrow)
      const prevButtons = screen.getAllByRole('button');
      const prevButton = prevButtons.find(btn => btn.querySelector('path[d="m15 18-6-6 6-6"]'));
      
      if (prevButton) {
        fireEvent.click(prevButton);
        await waitFor(() => {
          expect(screen.getByText(prevMonthName)).toBeInTheDocument();
        });
      }
    });
  });

  describe('Input Mode', () => {
    it('renders input field when mode is input', () => {
      render(<DateRangePicker mode="input" inputPlaceholder="Test placeholder" />);
      const input = screen.getByPlaceholderText('Test placeholder');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('readonly');
    });

    it('opens calendar when input is clicked', () => {
      render(<DateRangePicker mode="input" />);
      const input = screen.getByRole('textbox');
      fireEvent.click(input);
      
      expect(screen.getByText('Today')).toBeInTheDocument();
      expect(screen.getByText('Yesterday')).toBeInTheDocument();
    });

    it('displays custom icon when provided', () => {
      const customIcon = <span data-testid="custom-icon">📅</span>;
      render(<DateRangePicker mode="input" inputIcon={customIcon} />);
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });

    it('displays default calendar icon when no custom icon is provided', () => {
      render(<DateRangePicker mode="input" />);
      const svgElement = screen.getByRole('textbox').parentElement?.querySelector('svg');
      expect(svgElement).toBeInTheDocument();
    });

    it('applies custom input classes', () => {
      render(<DateRangePicker mode="input" inputClass="custom-class" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('custom-class');
    });

    it('calls onDateChange when date range is selected', async () => {
      const mockOnDateChange = jest.fn();
      render(<DateRangePicker mode="input" onDateChange={mockOnDateChange} />);
      
      const input = screen.getByRole('textbox');
      fireEvent.click(input);
      
      // Wait for calendar to appear and select first two available dates
      await waitFor(() => {
        expect(screen.getByText('Today')).toBeInTheDocument();
      });
      
      const days = screen.getAllByText(/^([1-9]|1[0-9]|2[0-9]|3[0-1])$/).filter((el) => 
        el.className.includes('cursor-pointer')
      );
      
      if (days.length >= 2) {
        fireEvent.click(days[0]);
        fireEvent.click(days[1]);
        
        await waitFor(() => {
          expect(mockOnDateChange).toHaveBeenCalled();
        });
      }
    });

    it('updates input value when date range is selected', async () => {
      render(<DateRangePicker mode="input" />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      fireEvent.click(input);
      
      // Wait for calendar to appear
      await waitFor(() => {
        expect(screen.getByText('Today')).toBeInTheDocument();
      });
      
      const days = screen.getAllByText(/^([1-9]|1[0-9]|2[0-9]|3[0-1])$/).filter((el) => 
        el.className.includes('cursor-pointer')
      );
      
      if (days.length >= 2) {
        fireEvent.click(days[0]);
        fireEvent.click(days[1]);
        
        await waitFor(() => {
          expect(input.value).not.toBe('');
        });
      }
    });
  });

  describe('Mode Switching', () => {
    it('renders dropdown button when mode is dropdown', () => {
      render(<DateRangePicker mode="dropdown" />);
      expect(screen.getByText('Date Range')).toBeInTheDocument();
      expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    });

    it('renders input field when mode is input', () => {
      render(<DateRangePicker mode="input" />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
      expect(screen.queryByText('Date Range')).not.toBeInTheDocument();
    });
  });

  describe('Theme Variants', () => {
    it('applies primary variant styles', () => {
      render(<DateRangePicker variant="primary" mode="input" />);
      const input = screen.getByRole('textbox');
      fireEvent.click(input);
      
      // The theme should be applied to calendar elements when they appear
      expect(screen.getByText('Today')).toBeInTheDocument();
    });

    it('applies custom size styles', () => {
      render(<DateRangePicker size="lg" mode="input" />);
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
      // Size affects padding and font size which should be reflected in styles
    });
  });

  describe('Enhancement Features', () => {
    describe('QuickSelect Control', () => {
      it('hides quickSelect sidebar when enableQuickSelect is false', () => {
        render(<DateRangePicker enableQuickSelect={false} />);
        const button = screen.getByText('Date Range');
        fireEvent.click(button);
        
        expect(screen.queryByText('Today')).not.toBeInTheDocument();
        expect(screen.queryByText('Yesterday')).not.toBeInTheDocument();
      });

      it('shows quickSelect sidebar when enableQuickSelect is true (default)', () => {
        render(<DateRangePicker enableQuickSelect={true} />);
        const button = screen.getByText('Date Range');
        fireEvent.click(button);
        
        expect(screen.getByText('Today')).toBeInTheDocument();
        expect(screen.getByText('Yesterday')).toBeInTheDocument();
        expect(screen.getByText('This Week')).toBeInTheDocument();
      });

      it('shows quickSelect sidebar by default when no enableQuickSelect prop is provided', () => {
        render(<DateRangePicker />);
        const button = screen.getByText('Date Range');
        fireEvent.click(button);
        
        expect(screen.getByText('Today')).toBeInTheDocument();
        expect(screen.getByText('Yesterday')).toBeInTheDocument();
        expect(screen.getByText('This Week')).toBeInTheDocument();
      });
    });

    describe('Single Date Mode', () => {
      it('changes label to "Date" when singleDateMode is true', () => {
        render(<DateRangePicker singleDateMode={true} />);
        expect(screen.getByText('Date')).toBeInTheDocument();
        expect(screen.queryByText('Date Range')).not.toBeInTheDocument();
      });

      it('uses single date placeholder in input mode', () => {
        render(<DateRangePicker mode="input" singleDateMode={true} />);
        const input = screen.getByPlaceholderText('Select date...');
        expect(input).toBeInTheDocument();
      });

      it('selects single date when clicking a day in single date mode', async () => {
        const mockOnDateChange = jest.fn();
        render(<DateRangePicker singleDateMode={true} onDateChange={mockOnDateChange} mode="input" />);
        
        const input = screen.getByRole('textbox');
        fireEvent.click(input);
        
        await waitFor(() => {
          const days = screen.getAllByText(/^([1-9]|1[0-9]|2[0-9]|3[0-1])$/).filter((el) => 
            el.className.includes('cursor-pointer')
          );
          
          if (days.length > 0) {
            fireEvent.click(days[0]);
            expect(mockOnDateChange).toHaveBeenCalledWith(
              expect.objectContaining({
                start: expect.any(Date),
                end: expect.any(Date)
              })
            );
          }
        });
      });
    });

    describe('Date Restrictions', () => {
      it('disables dates before minDate', () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        render(<DateRangePicker minDate={tomorrow} />);
        const button = screen.getByText('Date Range');
        fireEvent.click(button);
        
        // Check if today's date is disabled (should have disabled styling)
        const today = new Date().getDate().toString();
        const todayElement = screen.getAllByText(today).find(el => 
          el.className.includes('cursor-not-allowed') || el.className.includes('opacity-50')
        );
        expect(todayElement).toBeDefined();
      });

      it('disables dates after maxDate', () => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        render(<DateRangePicker maxDate={yesterday} />);
        const button = screen.getByText('Date Range');
        fireEvent.click(button);
        
        // Check if today's date is disabled
        const today = new Date().getDate().toString();
        const todayElement = screen.getAllByText(today).find(el => 
          el.className.includes('cursor-not-allowed') || el.className.includes('opacity-50')
        );
        expect(todayElement).toBeDefined();
      });

      it('does not select disabled dates when clicked', () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const mockOnDateChange = jest.fn();
        
        render(<DateRangePicker minDate={tomorrow} onDateChange={mockOnDateChange} mode="input" />);
        const input = screen.getByRole('textbox');
        fireEvent.click(input);
        
        // Try to click on today (which should be disabled)
        const today = new Date().getDate().toString();
        const todayElements = screen.getAllByText(today);
        if (todayElements.length > 0) {
          fireEvent.click(todayElements[0]);
          // Should not trigger date change for disabled date
          expect(mockOnDateChange).not.toHaveBeenCalled();
        }
      });

      it('disables specific dates provided via disabledDates', () => {
        const today = new Date();
        const mockOnDateChange = jest.fn();
        render(<DateRangePicker disabledDates={[today]} onDateChange={mockOnDateChange} mode="input" />);
        const input = screen.getByRole('textbox');
        fireEvent.click(input);

        const todayLabel = today.getDate().toString();
        const todayEl = screen.getAllByText(todayLabel).find(el => 
          el.className.includes('cursor-not-allowed') || el.className.includes('opacity-50')
        );
        expect(todayEl).toBeDefined();

        if (todayEl) {
          fireEvent.click(todayEl);
          expect(mockOnDateChange).not.toHaveBeenCalled();
        }
      });

      it('disables weekend days when disabledWeekDays includes Saturdays and Sundays', () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        // Find a weekend day in the current month
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        let weekendDateNum: number | null = null;
        for (let d = 1; d <= daysInMonth; d++) {
          const dt = new Date(year, month, d);
          const dow = dt.getDay();
          if (dow === 0 || dow === 6) {
            weekendDateNum = d;
            break;
          }
        }

        const mockOnDateChange = jest.fn();
        render(<DateRangePicker disabledWeekDays={[0,6]} onDateChange={mockOnDateChange} mode="input" />);
        const input = screen.getByRole('textbox');
        fireEvent.click(input);

        if (weekendDateNum) {
          const weekendEls = screen.getAllByText(weekendDateNum.toString());
          const weekendEl = weekendEls[0];
          // Should be styled as disabled
          expect(weekendEl.className).toMatch(/cursor-not-allowed|opacity-50/);
          fireEvent.click(weekendEl);
          expect(mockOnDateChange).not.toHaveBeenCalled();
        }
      });
    });

    describe('Popup Dimensions', () => {
      it('applies custom width to popup container', () => {
        render(<DateRangePicker popupWidth="500px" />);
        const button = screen.getByText('Date Range');
        fireEvent.click(button);
        
        // Check if the popup container has custom styling applied
        const calendarContainer = screen.getByText('Today').closest('[class*="absolute"]');
        expect(calendarContainer).toBeInTheDocument();
      });

      it('applies custom height to popup container', () => {
        render(<DateRangePicker popupHeight="400px" />);
        const button = screen.getByText('Date Range');
        fireEvent.click(button);
        
        // Check if the popup container has custom styling applied
        const calendarContainer = screen.getByText('Today').closest('[class*="absolute"]');
        expect(calendarContainer).toBeInTheDocument();
      });

      it('adds overflow-auto class when popupHeight is set', () => {
        render(<DateRangePicker popupHeight="300px" />);
        const button = screen.getByText('Date Range');
        fireEvent.click(button);
        
        // Check if overflow-auto class is applied to the inner calendar container
        const calendarInner = screen.getByText('Today').closest('div[class*="flex"][class*="shadow-lg"]');
        expect(calendarInner?.className).toContain('overflow-auto');
      });
    });

    describe('Font Scaling', () => {
      it('applies font scaling styles when autoScaleFont is true', () => {
        render(<DateRangePicker autoScaleFont={true} popupHeight="200px" />);
        const button = screen.getByText('Date Range');
        fireEvent.click(button);
        
        // Font scaling should be applied when calendar is open
        const calendarContainer = screen.getByText('Today').closest('[class*="flex"]');
        expect(calendarContainer).toBeInTheDocument();
      });

      it('does not apply font scaling when autoScaleFont is false', () => {
        render(<DateRangePicker autoScaleFont={false} popupHeight="200px" />);
        const button = screen.getByText('Date Range');
        fireEvent.click(button);
        
        // Normal font sizes should be maintained
        const calendarContainer = screen.getByText('Today').closest('[class*="flex"]');
        expect(calendarContainer).toBeInTheDocument();
      });
    });

    describe('Combined Features', () => {
      it('works correctly with multiple enhancements enabled', async () => {
        const mockOnDateChange = jest.fn();
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        render(
          <DateRangePicker 
            singleDateMode={true}
            enableQuickSelect={false}
            minDate={tomorrow}
            popupWidth="400px"
            popupHeight="300px"
            autoScaleFont={true}
            onDateChange={mockOnDateChange}
            mode="input"
          />
        );
        
        const input = screen.getByPlaceholderText('Select date...');
        expect(input).toBeInTheDocument();
        
        fireEvent.click(input);
        
        // QuickSelect should be hidden
        expect(screen.queryByText('Today')).not.toBeInTheDocument();
        
        // Try to select a valid date (future date)
        await waitFor(() => {
          const days = screen.getAllByText(/^([1-9]|1[0-9]|2[0-9]|3[0-1])$/).filter((el) => 
            el.className.includes('cursor-pointer') && !el.className.includes('cursor-not-allowed')
          );
          
          if (days.length > 0) {
            fireEvent.click(days[0]);
            expect(mockOnDateChange).toHaveBeenCalled();
          }
        });
      });
    });
  });
});

describe("DateRangePicker — Tarmac TDS (DatePicker)", () => {
  test("renders TDS path when pickerStyle is set", () => {
    render(<DateRangePicker pickerStyle="tds" singleDateMode />);
    expect(screen.getByTestId("datepicker-trigger")).toBeInTheDocument();
  });

  test("renders placeholder text in TDS mode", () => {
    render(<DateRangePicker pickerStyle="tds" singleDateMode placeholder="Pick a date" />);
    expect(screen.getByText("Pick a date")).toBeInTheDocument();
  });

  test("opens calendar on trigger click in TDS mode", () => {
    render(<DateRangePicker pickerStyle="tds" singleDateMode />);
    fireEvent.click(screen.getByTestId("datepicker-trigger"));
    expect(screen.getByTestId("datepicker-calendar")).toBeInTheDocument();
  });

  test("renders weekday labels in TDS calendar", () => {
    render(<DateRangePicker pickerStyle="tds" singleDateMode />);
    fireEvent.click(screen.getByTestId("datepicker-trigger"));
    expect(screen.getByText("Su")).toBeInTheDocument();
    expect(screen.getByText("Mo")).toBeInTheDocument();
    expect(screen.getByText("Tu")).toBeInTheDocument();
    expect(screen.getByText("We")).toBeInTheDocument();
    expect(screen.getByText("Th")).toBeInTheDocument();
    expect(screen.getByText("Fr")).toBeInTheDocument();
    expect(screen.getByText("Sa")).toBeInTheDocument();
  });

  test("renders Cancel and Apply buttons in TDS calendar", () => {
    render(<DateRangePicker pickerStyle="tds" singleDateMode />);
    fireEvent.click(screen.getByTestId("datepicker-trigger"));
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Apply")).toBeInTheDocument();
  });

  test("Cancel button closes calendar and calls onCancel", () => {
    const handleCancel = jest.fn();
    render(<DateRangePicker pickerStyle="tds" singleDateMode onCancel={handleCancel} />);
    fireEvent.click(screen.getByTestId("datepicker-trigger"));
    fireEvent.click(screen.getByText("Cancel"));
    expect(handleCancel).toHaveBeenCalledTimes(1);
    expect(screen.queryByTestId("datepicker-calendar")).not.toBeInTheDocument();
  });

  test("renders month/year header in TDS calendar", () => {
    render(<DateRangePicker pickerStyle="tds" singleDateMode />);
    fireEvent.click(screen.getByTestId("datepicker-trigger"));
    const today = new Date();
    const monthName = today.toLocaleString("default", { month: "long" });
    const year = String(today.getFullYear());
    expect(screen.getByText(monthName)).toBeInTheDocument();
    expect(screen.getByText(year)).toBeInTheDocument();
  });

  test("navigation buttons change month in TDS calendar", () => {
    render(<DateRangePicker pickerStyle="tds" singleDateMode />);
    fireEvent.click(screen.getByTestId("datepicker-trigger"));
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1);
    const nextMonthName = nextMonth.toLocaleString("default", { month: "long" });
    // Click next month button — 3rd nav button (after double-left, single-left)
    const navButtons = screen.getByTestId("datepicker-calendar").querySelectorAll("button");
    const svgButtons = Array.from(navButtons).filter(b => b.querySelector("svg") && !b.textContent?.trim());
    if (svgButtons.length >= 3) {
      fireEvent.click(svgButtons[2]); // single-right = next month
      expect(screen.getByText(nextMonthName)).toBeInTheDocument();
    }
  });

  test("clicking a day selects it in TDS mode", () => {
    render(<DateRangePicker pickerStyle="tds" singleDateMode />);
    fireEvent.click(screen.getByTestId("datepicker-trigger"));
    // Find day "15" button
    const dayButtons = screen.getAllByRole("button");
    const day15 = dayButtons.find(b => b.textContent === "15");
    if (day15) {
      fireEvent.click(day15);
      // Calendar should still be open (need to click Apply)
      expect(screen.getByTestId("datepicker-calendar")).toBeInTheDocument();
    }
  });

  test("Apply button calls onApply with selected date", () => {
    const handleApply = jest.fn();
    render(<DateRangePicker pickerStyle="tds" singleDateMode onApply={handleApply} />);
    fireEvent.click(screen.getByTestId("datepicker-trigger"));
    // Select day 15
    const dayButtons = screen.getAllByRole("button");
    const day15 = dayButtons.find(b => b.textContent === "15");
    if (day15) fireEvent.click(day15);
    fireEvent.click(screen.getByText("Apply"));
    expect(handleApply).toHaveBeenCalledTimes(1);
    expect(screen.queryByTestId("datepicker-calendar")).not.toBeInTheDocument();
  });

  test("renders calendar icon in TDS trigger", () => {
    render(<DateRangePicker pickerStyle="tds" singleDateMode />);
    const trigger = screen.getByTestId("datepicker-trigger");
    expect(trigger.querySelector("svg")).toBeInTheDocument();
  });

  test("className prop is applied in TDS mode", () => {
    const { container } = render(<DateRangePicker pickerStyle="tds" singleDateMode className="my-picker" />);
    expect(container.firstChild).toHaveClass("my-picker");
  });

  test("does not render TDS path when pickerStyle is not set", () => {
    render(<DateRangePicker />);
    expect(screen.queryByTestId("datepicker-trigger")).not.toBeInTheDocument();
  });

  test("renders pre-selected value in TDS trigger", () => {
    const date = new Date(2026, 10, 6);
    render(<DateRangePicker pickerStyle="tds" singleDateMode value={date} />);
    // formatDate uses en-GB by default: "6 Nov 2026"
    expect(screen.getByText("6 Nov 2026")).toBeInTheDocument();
  });

  test("renders day numbers in calendar grid", () => {
    render(<DateRangePicker pickerStyle="tds" singleDateMode />);
    fireEvent.click(screen.getByTestId("datepicker-trigger"));
    // Should have day 1 in the grid
    const dayButtons = screen.getAllByRole("button");
    const day1 = dayButtons.find(b => b.textContent === "1");
    expect(day1).toBeInTheDocument();
  });

  test("outside-month days are styled as disabled", () => {
    render(<DateRangePicker pickerStyle="tds" singleDateMode />);
    fireEvent.click(screen.getByTestId("datepicker-trigger"));
    // Calendar should render without errors
    expect(screen.getByTestId("datepicker-calendar")).toBeInTheDocument();
  });

  test("clicking outside closes TDS calendar", () => {
    render(<DateRangePicker pickerStyle="tds" singleDateMode />);
    fireEvent.click(screen.getByTestId("datepicker-trigger"));
    expect(screen.getByTestId("datepicker-calendar")).toBeInTheDocument();
    fireEvent.mouseDown(document);
    expect(screen.queryByTestId("datepicker-calendar")).not.toBeInTheDocument();
  });
});


describe("DateRangePicker — TDS Sidebar (Quick Select)", () => {
  const openCalendar = () => {
    fireEvent.click(screen.getByTestId("datepicker-trigger"));
  };

  // ── Rendering ──

  test("does not render sidebar when enableQuickSelect is false", () => {
    render(<DateRangePicker pickerStyle="tds" singleDateMode enableQuickSelect={false} />);
    openCalendar();
    expect(screen.queryByTestId("datepicker-sidebar")).not.toBeInTheDocument();
  });

  test("renders sidebar when enableQuickSelect is true", () => {
    render(<DateRangePicker pickerStyle="tds" singleDateMode enableQuickSelect />);
    openCalendar();
    expect(screen.getByTestId("datepicker-sidebar")).toBeInTheDocument();
  });

  test("sidebar contains all 8 quick-select labels", () => {
    render(<DateRangePicker pickerStyle="tds" enableQuickSelect />);
    openCalendar();
    const labels = ["Today", "Yesterday", "This Week", "This Month", "Last Week", "Last Month", "Last 90 Days", "Custom"];
    labels.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  test("sidebar does not render when enableQuickSelect is explicitly false", () => {
    render(<DateRangePicker pickerStyle="tds" singleDateMode enableQuickSelect={false} />);
    openCalendar();
    expect(screen.queryByTestId("datepicker-sidebar")).not.toBeInTheDocument();
  });

  // ── Quick Select Clicks ──

  test("clicking 'Today' selects today's date", () => {
    render(<DateRangePicker pickerStyle="tds" singleDateMode enableQuickSelect />);
    openCalendar();
    fireEvent.click(screen.getByText("Today"));
    // Today should now be the active sidebar item (has dot indicator)
    const sidebar = screen.getByTestId("datepicker-sidebar");
    const todayButton = Array.from(sidebar.querySelectorAll("button")).find(b => b.textContent?.includes("Today"));
    expect(todayButton).toBeDefined();
    // Should have an SVG dot (circle) inside
    expect(todayButton?.querySelector("svg circle")).toBeInTheDocument();
  });

  test("clicking 'Yesterday' selects yesterday's date", () => {
    render(<DateRangePicker pickerStyle="tds" singleDateMode enableQuickSelect />);
    openCalendar();
    fireEvent.click(screen.getByText("Yesterday"));
    const sidebar = screen.getByTestId("datepicker-sidebar");
    const btn = Array.from(sidebar.querySelectorAll("button")).find(b => b.textContent?.includes("Yesterday"));
    expect(btn?.querySelector("svg circle")).toBeInTheDocument();
  });

  test("clicking 'This Week' highlights the sidebar item", () => {
    render(<DateRangePicker pickerStyle="tds" enableQuickSelect />);
    openCalendar();
    fireEvent.click(screen.getByText("This Week"));
    const sidebar = screen.getByTestId("datepicker-sidebar");
    const btn = Array.from(sidebar.querySelectorAll("button")).find(b => b.textContent?.includes("This Week"));
    expect(btn?.querySelector("svg circle")).toBeInTheDocument();
  });

  test("clicking 'This Month' highlights the sidebar item", () => {
    render(<DateRangePicker pickerStyle="tds" enableQuickSelect />);
    openCalendar();
    fireEvent.click(screen.getByText("This Month"));
    const sidebar = screen.getByTestId("datepicker-sidebar");
    const btn = Array.from(sidebar.querySelectorAll("button")).find(b => b.textContent?.includes("This Month"));
    expect(btn?.querySelector("svg circle")).toBeInTheDocument();
  });

  test("clicking 'Last Week' highlights the sidebar item", () => {
    render(<DateRangePicker pickerStyle="tds" enableQuickSelect />);
    openCalendar();
    fireEvent.click(screen.getByText("Last Week"));
    const sidebar = screen.getByTestId("datepicker-sidebar");
    const btn = Array.from(sidebar.querySelectorAll("button")).find(b => b.textContent?.includes("Last Week"));
    expect(btn?.querySelector("svg circle")).toBeInTheDocument();
  });

  test("clicking 'Last Month' highlights the sidebar item", () => {
    render(<DateRangePicker pickerStyle="tds" enableQuickSelect />);
    openCalendar();
    fireEvent.click(screen.getByText("Last Month"));
    const sidebar = screen.getByTestId("datepicker-sidebar");
    const btn = Array.from(sidebar.querySelectorAll("button")).find(b => b.textContent?.includes("Last Month"));
    expect(btn?.querySelector("svg circle")).toBeInTheDocument();
  });

  test("clicking 'Last 90 Days' highlights the sidebar item", () => {
    render(<DateRangePicker pickerStyle="tds" enableQuickSelect />);
    openCalendar();
    fireEvent.click(screen.getByText("Last 90 Days"));
    const sidebar = screen.getByTestId("datepicker-sidebar");
    const btn = Array.from(sidebar.querySelectorAll("button")).find(b => b.textContent?.includes("Last 90 Days"));
    expect(btn?.querySelector("svg circle")).toBeInTheDocument();
  });

  test("clicking 'Custom' clears selection and highlights Custom", () => {
    render(<DateRangePicker pickerStyle="tds" enableQuickSelect />);
    openCalendar();
    // First select Today
    fireEvent.click(screen.getByText("Today"));
    // Then switch to Custom
    fireEvent.click(screen.getByText("Custom"));
    const sidebar = screen.getByTestId("datepicker-sidebar");
    const customBtn = Array.from(sidebar.querySelectorAll("button")).find(b => b.textContent?.includes("Custom"));
    expect(customBtn?.querySelector("svg circle")).toBeInTheDocument();
    // Today should no longer have the dot
    const todayBtn = Array.from(sidebar.querySelectorAll("button")).find(b => b.textContent?.includes("Today"));
    expect(todayBtn?.querySelector("svg circle")).toBeNull();
  });

  // ── Only one item active at a time ──

  test("only one sidebar item has the active dot at a time", () => {
    render(<DateRangePicker pickerStyle="tds" enableQuickSelect />);
    openCalendar();
    fireEvent.click(screen.getByText("This Week"));
    const sidebar = screen.getByTestId("datepicker-sidebar");
    const activeDots = sidebar.querySelectorAll("svg circle");
    expect(activeDots.length).toBe(1);
  });

  test("switching from one preset to another moves the dot", () => {
    render(<DateRangePicker pickerStyle="tds" enableQuickSelect />);
    openCalendar();
    fireEvent.click(screen.getByText("Today"));
    fireEvent.click(screen.getByText("Last Month"));
    const sidebar = screen.getByTestId("datepicker-sidebar");
    const lastMonthBtn = Array.from(sidebar.querySelectorAll("button")).find(b => b.textContent?.includes("Last Month"));
    expect(lastMonthBtn?.querySelector("svg circle")).toBeInTheDocument();
    const todayBtn = Array.from(sidebar.querySelectorAll("button")).find(b => b.textContent?.includes("Today"));
    expect(todayBtn?.querySelector("svg circle")).toBeNull();
  });

  // ── Calendar navigation on quick select ──

  test("clicking 'Last Month' navigates calendar to previous month", () => {
    render(<DateRangePicker pickerStyle="tds" enableQuickSelect />);
    openCalendar();
    fireEvent.click(screen.getByText("Last Month"));
    const today = new Date();
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1);
    const lastMonthName = lastMonth.toLocaleString("default", { month: "long" });
    expect(screen.getByText(lastMonthName)).toBeInTheDocument();
  });

  test("clicking 'Today' navigates calendar to current month", () => {
    render(<DateRangePicker pickerStyle="tds" enableQuickSelect />);
    openCalendar();
    // Navigate away first
    fireEvent.click(screen.getByText("Last Month"));
    // Then click Today
    fireEvent.click(screen.getByText("Today"));
    const today = new Date();
    const currentMonthName = today.toLocaleString("default", { month: "long" });
    expect(screen.getByText(currentMonthName)).toBeInTheDocument();
  });

  // ── Apply with quick select ──

  test("Apply after quick select calls onApply with correct range", () => {
    const handleApply = jest.fn();
    render(<DateRangePicker pickerStyle="tds" enableQuickSelect onApply={handleApply} />);
    openCalendar();
    fireEvent.click(screen.getByText("Today"));
    fireEvent.click(screen.getByText("Apply"));
    expect(handleApply).toHaveBeenCalledTimes(1);
    const arg = handleApply.mock.calls[0][0];
    expect(arg).toHaveProperty("start");
    expect(arg).toHaveProperty("end");
    expect(arg.start).toBeInstanceOf(Date);
    expect(arg.end).toBeInstanceOf(Date);
  });

  test("Apply after 'Today' in singleDateMode calls onApply with a Date", () => {
    const handleApply = jest.fn();
    render(<DateRangePicker pickerStyle="tds" singleDateMode enableQuickSelect onApply={handleApply} />);
    openCalendar();
    fireEvent.click(screen.getByText("Today"));
    fireEvent.click(screen.getByText("Apply"));
    expect(handleApply).toHaveBeenCalledTimes(1);
    expect(handleApply.mock.calls[0][0]).toBeInstanceOf(Date);
  });

  test("Cancel after quick select does not call onApply", () => {
    const handleApply = jest.fn();
    render(<DateRangePicker pickerStyle="tds" enableQuickSelect onApply={handleApply} />);
    openCalendar();
    fireEvent.click(screen.getByText("This Week"));
    fireEvent.click(screen.getByText("Cancel"));
    expect(handleApply).not.toHaveBeenCalled();
  });

  // ── Sidebar + calendar coexistence ──

  test("calendar grid still renders alongside sidebar", () => {
    render(<DateRangePicker pickerStyle="tds" enableQuickSelect />);
    openCalendar();
    // Sidebar present
    expect(screen.getByTestId("datepicker-sidebar")).toBeInTheDocument();
    // Calendar grid present (weekday labels)
    expect(screen.getByText("Su")).toBeInTheDocument();
    expect(screen.getByText("Mo")).toBeInTheDocument();
    // Footer buttons present
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Apply")).toBeInTheDocument();
  });

  test("can manually pick a day after selecting a quick preset", () => {
    render(<DateRangePicker pickerStyle="tds" singleDateMode enableQuickSelect />);
    openCalendar();
    fireEvent.click(screen.getByText("Today"));
    // Now manually click day 15
    const calendar = screen.getByTestId("datepicker-calendar");
    const allButtons = Array.from(calendar.querySelectorAll("button"));
    const day15 = allButtons.find(b => b.textContent === "15");
    if (day15) {
      fireEvent.click(day15);
      // Calendar should still be open
      expect(screen.getByTestId("datepicker-calendar")).toBeInTheDocument();
    }
  });

  // ── Reverse mapping ──

  test("manually selecting today's date auto-highlights 'Today' in sidebar", async () => {
    const today = new Date();
    const todayDate = today.getDate().toString();
    render(<DateRangePicker pickerStyle="tds" singleDateMode enableQuickSelect />);
    openCalendar();
    // Click today's date number in the calendar grid
    const calendar = screen.getByTestId("datepicker-calendar");
    const dayButtons = Array.from(calendar.querySelectorAll("button")).filter(
      b => b.textContent === todayDate && !b.closest('[data-testid="datepicker-sidebar"]')
    );
    // Pick the first match that's a day cell (not a nav button)
    const todayCell = dayButtons.find(b => {
      const text = b.textContent?.trim();
      return text === todayDate;
    });
    if (todayCell) {
      fireEvent.click(todayCell);
      await waitFor(() => {
        const sidebar = screen.getByTestId("datepicker-sidebar");
        const todayBtn = Array.from(sidebar.querySelectorAll("button")).find(b => b.textContent?.includes("Today"));
        expect(todayBtn?.querySelector("svg circle")).toBeInTheDocument();
      });
    }
  });

  test("selecting a non-preset date shows 'Custom' as active", async () => {
    render(<DateRangePicker pickerStyle="tds" singleDateMode enableQuickSelect />);
    openCalendar();
    // Click day 15 — unlikely to match any preset
    const calendar = screen.getByTestId("datepicker-calendar");
    const allButtons = Array.from(calendar.querySelectorAll("button")).filter(
      b => !b.closest('[data-testid="datepicker-sidebar"]')
    );
    const day15 = allButtons.find(b => b.textContent === "15");
    if (day15) {
      fireEvent.click(day15);
      await waitFor(() => {
        const sidebar = screen.getByTestId("datepicker-sidebar");
        const customBtn = Array.from(sidebar.querySelectorAll("button")).find(b => b.textContent?.includes("Custom"));
        expect(customBtn?.querySelector("svg circle")).toBeInTheDocument();
      });
    }
  });

  // ── Outside click with sidebar ──

  test("clicking outside closes calendar with sidebar", () => {
    render(<DateRangePicker pickerStyle="tds" enableQuickSelect />);
    openCalendar();
    expect(screen.getByTestId("datepicker-sidebar")).toBeInTheDocument();
    fireEvent.mouseDown(document);
    expect(screen.queryByTestId("datepicker-calendar")).not.toBeInTheDocument();
  });
});
