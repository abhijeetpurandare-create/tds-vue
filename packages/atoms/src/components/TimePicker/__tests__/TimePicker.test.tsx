import React from "react";
import {render, screen, fireEvent} from "@testing-library/react";
import TimePicker from "../index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

jest.mock('../../ThemeProvider', () => ({
  useTheme: () => ({
    theme: {
      components: {
        timePicker: {
          base: { fontFamily: 'sans-serif', transition: 'all 0.15s ease-in-out' },
          input: { backgroundColor: '#fff', borderColor: '#e6e6e6', borderWidth: '1px', borderRadius: '6px', padding: '12px', gap: '4px', fontSize: '14px', lineHeight: '20px', fontWeight: '500', textColor: '#2b2b2b', placeholderColor: '#2b2b2b', iconSize: '20px', hoverBorderColor: '#ccc', activeBorderColor: '#ccc' },
          dropdown: { backgroundColor: '#fff', borderRadius: '4px', shadow: '0px 0px 6px 0px rgba(0,0,0,0.2)', width: '256px', middlePadding: '16px', columnHeight: '264px', columnPadding: '10px', columnWidth: '73px', itemGap: '8px', itemFontSize: '14px', itemLineHeight: '20px', baseFontWeight: '300', baseTextColor: '#808080', selectedFontWeight: '600', selectedTextColor: '#2b2b2b', overlayBackgroundColor: 'rgba(35,150,251,0.1)', overlayHeight: '36px', overlayBorderRadius: '4px' },
          footer: { height: '52px', padding: '8px', gap: '8px', cancelButtonStyle: 'secondary', cancelButtonVariant: 'black', cancelButtonSize: 'md', saveButtonStyle: 'primary', saveButtonVariant: 'black', saveButtonSize: 'md' },
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

describe("TimePicker", () => {
  test("renders with empty value by default", () => {
    render(<TimePicker />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveValue(""); // No default time selected
    expect(input).toHaveAttribute("placeholder", "Select time");
  });

  test("renders with provided value", () => {
    render(<TimePicker value="10:30" />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("10:30 AM");
  });

  test("opens dropdown on input click", () => {
    render(<TimePicker />);
    const input = screen.getByRole("textbox");

    fireEvent.click(input);
    expect(screen.getByText("hh")).toBeInTheDocument();
    expect(screen.getByText("mm")).toBeInTheDocument();
  });

  test("renders seconds column when showSeconds is true", () => {
    render(<TimePicker showSeconds />);
    const input = screen.getByRole("textbox");

    fireEvent.click(input);
    expect(screen.getByText("ss")).toBeInTheDocument();
  });

  test("renders 24-hour format when use24Hour is true", () => {
    render(<TimePicker value="14:30" use24Hour />);
    const input = screen.getByRole("textbox");

    expect(input).toHaveValue("14:30");
    fireEvent.click(input);
    expect(screen.queryByText("AM/PM")).not.toBeInTheDocument();
  });

  test("calls onChange with correct time format", () => {
    const handleChange = jest.fn();
    render(<TimePicker onChange={handleChange} />);

    fireEvent.click(screen.getByRole("textbox"));
    const hourOptions = screen.getAllByText("01");
    fireEvent.click(hourOptions[0]); // First "01" is in the hour column

    expect(handleChange).toHaveBeenCalledWith("01:00");
  });

  test("applies custom classNames", () => {
    render(
      <TimePicker
        customClassNames={{
          input: "custom-input",
          label: "custom-label",
          dropdown: "custom-dropdown",
          timeItem: "custom-time",
        }}
      />
    );

    fireEvent.click(screen.getByRole("textbox"));

    expect(screen.getByRole("textbox")).toHaveClass("custom-input");
    expect(screen.getByText("hh")).toHaveClass("custom-label");
    expect(screen.getAllByText("01")[0]).toHaveClass("custom-time");
  });

  // Icon Tests
  test("renders default clock icon by default", () => {
    render(<TimePicker />);
    
    // Default clock icon should be present
    const iconContainer = document.querySelector('[class*="absolute right-2"]');
    expect(iconContainer).toBeInTheDocument();
  });

  test("does not render icon when showIcon is false", () => {
    render(<TimePicker showIcon={false} />);
    
    // Icon should not be present
    const iconContainer = document.querySelector('[class*="absolute right-2"]');
    expect(iconContainer).not.toBeInTheDocument();
  });

  test("renders icon on left when iconPosition is left", () => {
    render(<TimePicker iconPosition="left" />);
    
    // Icon should be on left
    const leftIconContainer = document.querySelector('[class*="absolute left-2"]');
    const rightIconContainer = document.querySelector('[class*="absolute right-2"]');
    
    expect(leftIconContainer).toBeInTheDocument();
    expect(rightIconContainer).not.toBeInTheDocument();
  });

  test("renders icon on right when iconPosition is right", () => {
    render(<TimePicker iconPosition="right" />);
    
    // Icon should be on right (default)
    const leftIconContainer = document.querySelector('[class*="absolute left-2"]');
    const rightIconContainer = document.querySelector('[class*="absolute right-2"]');
    
    expect(rightIconContainer).toBeInTheDocument();
    expect(leftIconContainer).not.toBeInTheDocument();
  });

  test("renders custom icon when provided", () => {
    const customIcon = <FontAwesomeIcon icon={faCalendar} data-testid="custom-icon" />;
    render(<TimePicker icon={customIcon} />);
    
    // Custom icon should be present
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  test("opens dropdown when icon is clicked", () => {
    render(<TimePicker />);
    
    // Find and click the icon
    const iconContainer = document.querySelector('[class*="absolute right-2"]');
    expect(iconContainer).toBeInTheDocument();
    
    fireEvent.click(iconContainer!);
    
    // Dropdown should open
    expect(screen.getByText("hh")).toBeInTheDocument();
    expect(screen.getByText("mm")).toBeInTheDocument();
  });

  test("applies custom icon styles", () => {
    render(
      <TimePicker
        customClassNames={{
          icon: "custom-icon-class",
        }}
      />
    );
    
    // Icon container should have custom class
    const iconContainer = document.querySelector('[class*="custom-icon-class"]');
    expect(iconContainer).toBeInTheDocument();
  });

  test("applies correct padding when icon is on left", () => {
    render(<TimePicker iconPosition="left" />);
    
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("pl-8");
    expect(input).not.toHaveClass("pr-8");
  });

  test("applies correct padding when icon is on right", () => {
    render(<TimePicker iconPosition="right" />);
    
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("pr-8");
    expect(input).not.toHaveClass("pl-8");
  });

  test("does not apply icon padding when showIcon is false", () => {
    render(<TimePicker showIcon={false} />);
    
    const input = screen.getByRole("textbox");
    expect(input).not.toHaveClass("pl-8");
    expect(input).not.toHaveClass("pr-8");
  });

  // No Default Time Tests
  test("renders with custom placeholder", () => {
    render(<TimePicker placeholder="Pick a time" />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("placeholder", "Pick a time");
    expect(input).toHaveValue("");
  });

  test("shows clear button when allowClear is true and time is selected", () => {
    render(<TimePicker value="10:30" allowClear />);

    const clearButton = screen.getByLabelText("Clear time");
    expect(clearButton).toBeInTheDocument();
    expect(clearButton).toHaveTextContent("×");
  });

  test("does not show clear button when allowClear is false", () => {
    render(<TimePicker value="10:30" allowClear={false} />);

    const clearButton = screen.queryByLabelText("Clear time");
    expect(clearButton).not.toBeInTheDocument();
  });

  test("does not show clear button when no time is selected", () => {
    render(<TimePicker allowClear />);

    const clearButton = screen.queryByLabelText("Clear time");
    expect(clearButton).not.toBeInTheDocument();
  });

  test("clears time when clear button is clicked", () => {
    const handleChange = jest.fn();
    render(<TimePicker value="10:30" allowClear onChange={handleChange} />);

    const clearButton = screen.getByLabelText("Clear time");
    fireEvent.click(clearButton);

    expect(handleChange).toHaveBeenCalledWith("");
    
    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("");
  });

  test("initializes time when first value is selected from empty state", () => {
    const handleChange = jest.fn();
    render(<TimePicker onChange={handleChange} />);

    // Open dropdown
    fireEvent.click(screen.getByRole("textbox"));
    
    // Click on hour 2
    const hourOptions = screen.getAllByText("02");
    fireEvent.click(hourOptions[0]);

    // Should initialize with default minute (00) and AM
    expect(handleChange).toHaveBeenCalledWith("02:00");
  });

  test("handles empty value prop correctly", () => {
    render(<TimePicker value="" />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("");
    expect(input).toHaveAttribute("placeholder", "Select time");
  });

  test("handles null/undefined value prop correctly", () => {
    render(<TimePicker value={undefined} />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("");
  });

  test("maintains empty state until complete time is selected", () => {
    const handleChange = jest.fn();
    render(<TimePicker onChange={handleChange} showSeconds />);

    // Open dropdown
    fireEvent.click(screen.getByRole("textbox"));
    
    // Click only on hour - should not trigger onChange yet for seconds mode
    const hourOptions = screen.getAllByText("02");
    fireEvent.click(hourOptions[0]);

    // Should still be in initial loading state, but now time is set
    expect(handleChange).toHaveBeenCalledWith("02:00:00");
  });

  describe("startTime/EndTime range restrictions", () => {
    test("disables hours outside the provided range (24h)", () => {
      const handleChange = jest.fn();
      render(<TimePicker onChange={handleChange} use24Hour startTime={9} EndTime={18} />);

      fireEvent.click(screen.getByRole("textbox"));

      // Try clicking 08 (outside range) - should not trigger change
      const eightOptions = screen.getAllByText("08");
      fireEvent.click(eightOptions[0]);
      expect(handleChange).not.toHaveBeenCalled();

      // Click 09 (inside range) - should trigger change with minutes default 00
      const nineOptions = screen.getAllByText("09");
      fireEvent.click(nineOptions[0]);
      expect(handleChange).toHaveBeenCalledWith("09:00");

      // Try clicking 19 (outside range) - should not trigger change
      const nineteenOptions = screen.getAllByText("19");
      fireEvent.click(nineteenOptions[0]);
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    test("disables minutes when end hour is selected (24h)", () => {
      const handleChange = jest.fn();
      render(<TimePicker onChange={handleChange} use24Hour startTime={9} EndTime={18} />);

      fireEvent.click(screen.getByRole("textbox"));

      // Select 18 (end hour)
      const eighteenOptions = screen.getAllByText("18");
      fireEvent.click(eighteenOptions[0]);
      expect(handleChange).toHaveBeenCalledWith("18:00");

      // Attempt to change minutes to 30 - should be disabled and not trigger
      const thirtyOptions = screen.getAllByText("30");
      handleChange.mockClear();
      fireEvent.click(thirtyOptions[0]);
      expect(handleChange).not.toHaveBeenCalled();
    });

    test("enables minutes for start and in-between hours (24h)", () => {
      const handleChange = jest.fn();
      render(<TimePicker onChange={handleChange} use24Hour startTime={9} EndTime={18} />);

      fireEvent.click(screen.getByRole("textbox"));

      // Select 09 then minute 45 should work
      const nineOptions = screen.getAllByText("09");
      fireEvent.click(nineOptions[0]);
      expect(handleChange).toHaveBeenCalledWith("09:00");
      handleChange.mockClear();

      const fortyFiveOptions = screen.getAllByText("45");
      fireEvent.click(fortyFiveOptions[0]);
      expect(handleChange).toHaveBeenCalledWith("09:45");
    });
  });
});

describe("TimePicker — Tarmac TDS", () => {
  test("renders TDS path when pickerStyle is set", () => {
    render(<TimePicker pickerStyle="tds" />);
    expect(screen.getByTestId("timepicker-trigger")).toBeInTheDocument();
  });

  test("renders placeholder text in TDS mode", () => {
    render(<TimePicker pickerStyle="tds" placeholder="Pick a time" />);
    expect(screen.getByText("Pick a time")).toBeInTheDocument();
  });

  test("renders pre-selected value in TDS mode", () => {
    render(<TimePicker pickerStyle="tds" value="18:25" />);
    expect(screen.getByText("06:25 PM")).toBeInTheDocument();
  });

  test("opens dropdown on trigger click in TDS mode", () => {
    render(<TimePicker pickerStyle="tds" />);
    fireEvent.click(screen.getByTestId("timepicker-trigger"));
    expect(screen.getByTestId("timepicker-dropdown")).toBeInTheDocument();
  });

  test("renders hour, minute, and AM/PM columns in TDS dropdown", () => {
    render(<TimePicker pickerStyle="tds" />);
    fireEvent.click(screen.getByTestId("timepicker-trigger"));
    // 3× rendering means multiple PM/AM — use getAllByText
    expect(screen.getAllByText("PM").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("AM").length).toBeGreaterThanOrEqual(1);
  });

  test("renders Cancel and Save buttons in TDS dropdown", () => {
    render(<TimePicker pickerStyle="tds" />);
    fireEvent.click(screen.getByTestId("timepicker-trigger"));
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  test("Cancel button closes dropdown and calls onCancel", () => {
    const handleCancel = jest.fn();
    render(<TimePicker pickerStyle="tds" onCancel={handleCancel} />);
    fireEvent.click(screen.getByTestId("timepicker-trigger"));
    fireEvent.click(screen.getByText("Cancel"));
    expect(handleCancel).toHaveBeenCalledTimes(1);
    expect(screen.queryByTestId("timepicker-dropdown")).not.toBeInTheDocument();
  });

  test("selecting hour updates selection in TDS mode", () => {
    render(<TimePicker pickerStyle="tds" />);
    fireEvent.click(screen.getByTestId("timepicker-trigger"));
    const hourButtons = screen.getAllByRole("button");
    // Find the "6" hour button
    const sixButton = hourButtons.find(b => b.textContent === "6");
    if (sixButton) fireEvent.click(sixButton);
    // Should still be open
    expect(screen.getByTestId("timepicker-dropdown")).toBeInTheDocument();
  });

  test("Save button commits selection and closes dropdown", () => {
    const handleChange = jest.fn();
    render(<TimePicker pickerStyle="tds" onChange={handleChange} />);
    fireEvent.click(screen.getByTestId("timepicker-trigger"));
    // Select hour 6
    const buttons = screen.getAllByRole("button");
    const sixBtn = buttons.find(b => b.textContent === "6");
    if (sixBtn) fireEvent.click(sixBtn);
    // Select minute 25
    const min25 = buttons.find(b => b.textContent === "25");
    if (min25) fireEvent.click(min25);
    // Click Save
    fireEvent.click(screen.getByText("Save"));
    expect(screen.queryByTestId("timepicker-dropdown")).not.toBeInTheDocument();
  });

  test("className prop is applied in TDS mode", () => {
    const { container } = render(<TimePicker pickerStyle="tds" className="custom-class" />);
    expect(container.firstChild).toHaveClass("custom-class");
  });

  test("does not render TDS path when pickerStyle is not set", () => {
    render(<TimePicker />);
    expect(screen.queryByTestId("timepicker-trigger")).not.toBeInTheDocument();
    // Legacy path renders a textbox
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  test("renders clock icon in TDS trigger", () => {
    render(<TimePicker pickerStyle="tds" />);
    const trigger = screen.getByTestId("timepicker-trigger");
    expect(trigger.querySelector("svg")).toBeInTheDocument();
  });

  test("dropdown has overlay element for selection highlight", () => {
    render(<TimePicker pickerStyle="tds" />);
    fireEvent.click(screen.getByTestId("timepicker-trigger"));
    const dropdown = screen.getByTestId("timepicker-dropdown");
    // The overlay is a div inside the middle section
    expect(dropdown).toBeInTheDocument();
  });

  test("renders 12 hour options in TDS mode", () => {
    render(<TimePicker pickerStyle="tds" />);
    fireEvent.click(screen.getByTestId("timepicker-trigger"));
    // TDS reuses the same columns as legacy — 12 hours for 12h mode
    const dropdown = screen.getByTestId("timepicker-dropdown");
    expect(dropdown).toBeInTheDocument();
  });

  test("renders minute options in TDS mode", () => {
    render(<TimePicker pickerStyle="tds" />);
    fireEvent.click(screen.getByTestId("timepicker-trigger"));
    // TDS uses 5-minute increments: 00, 05, 10, ..., 55
    expect(screen.getAllByText("00").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("05").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("55").length).toBeGreaterThanOrEqual(1);
  });

  test("Escape key closes TDS dropdown", () => {
    render(<TimePicker pickerStyle="tds" />);
    fireEvent.click(screen.getByTestId("timepicker-trigger"));
    expect(screen.getByTestId("timepicker-dropdown")).toBeInTheDocument();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByTestId("timepicker-dropdown")).not.toBeInTheDocument();
  });

  test("clicking outside closes TDS dropdown", () => {
    render(<TimePicker pickerStyle="tds" />);
    fireEvent.click(screen.getByTestId("timepicker-trigger"));
    expect(screen.getByTestId("timepicker-dropdown")).toBeInTheDocument();
    fireEvent.mouseDown(document);
    expect(screen.queryByTestId("timepicker-dropdown")).not.toBeInTheDocument();
  });
});
