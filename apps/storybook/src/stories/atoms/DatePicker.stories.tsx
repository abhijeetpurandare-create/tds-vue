import React from "react";
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DateRangePicker } from "@delhivery/tarmac";

const meta: Meta<typeof DateRangePicker> = {
  title: "Atoms/DateRangePicker",
  component: DateRangePicker,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A comprehensive DateRangePicker component that allows users to select date ranges with various formatting options and theme variants.

## Features
- Date range selection with visual feedback
- Quick select options (Today, Yesterday, This Week, This Month, etc.)
- Theme variants for consistent styling
- Size variants for the main button
- Customizable calendar styling
- Month/year navigation
- Responsive design
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    dateFormat: {
      control: "text",
      description:
        'Format options for displaying dates (e.g., "{ day: "numeric", month: "short", year: "numeric" }")',
    },
    calendarContainerClass: {
      control: "text",
      description:
        'Tailwind CSS classes for the outer calendar popup container (e.g., "shadow-2xl rounded-lg")',
    },
    calendarInnerClass: {
      control: "text",
      description:
        'Tailwind CSS classes for the inner calendar content area (e.g., "bg-gray-100 p-4")',
    },
    calendarBorderClass: {
      control: "text",
      description:
        'Tailwind CSS classes for the border/ring of the inner calendar content area (e.g., "border-2 border-red-500")',
    },
    variant: {
      control: "select",
      options: ["default", "primary", "success", "warning", "error", "info"],
      description: "Theme variant that applies colors to selected dates and quick selects",
      table: {
        type: { summary: "DatePickerVariant" },
        defaultValue: { summary: "default" },
      },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size variant for the main DatePicker button",
      table: {
        type: { summary: "DatePickerSize" },
        defaultValue: { summary: "md" },
      },
    },
    mode: {
      control: "select",
      options: ["dropdown", "input"],
      description: "Choose between dropdown button mode or input field mode",
      table: {
        type: { summary: "dropdown | input" },
        defaultValue: { summary: "dropdown" },
      },
    },
    inputClass: {
      control: "text",
      description: "Custom CSS classes for styling the input field (input mode only)",
    },
    inputPlaceholder: {
      control: "text",
      description: "Placeholder text for the input field (input mode only)",
      table: {
        defaultValue: { summary: "Select date range..." },
      },
    },
    disabledWeekDays: {
      control: 'object',
      description: 'Array of weekdays to disable (0=Sun ... 6=Sat). e.g., [0] for Sundays, [0,6] for weekends',
      table: {
        type: { summary: 'number[]' },
      },
    },
    disabledDates: {
      control: 'object',
      description: 'Array of specific dates to disable',
      table: {
        type: { summary: 'Date[]' },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof DateRangePicker>;

export const Default: Story = {
  args: {
    dateFormat: "{ day: 'numeric', month: 'short', year: 'numeric' }",
    variant: "default",
    size: "md",
    maxDate: new Date(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic DateRangePicker with default theme and medium size.',
      },
    },
  },
};

// Theme Variants Stories
export const ThemeVariants: Story = {
  name: "🎨 Theme Variants",
  render: () => (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Default</label>
          <DateRangePicker
            variant="default"
            size="md"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Primary</label>
          <DateRangePicker
            variant="primary"
            size="md"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Success</label>
          <DateRangePicker
            variant="success"
            size="md"
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Warning</label>
          <DateRangePicker
            variant="warning"
            size="md"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Error</label>
          <DateRangePicker
            variant="error"
            size="md"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Info</label>
          <DateRangePicker
            variant="info"
            size="md"
          />
        </div>
      </div>
      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-sm font-medium mb-2">Note:</h3>
        <p className="text-sm text-gray-600">
          Theme colors are applied to selected dates, date ranges, and quick select buttons, not to the main button or dropdown container.
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Showcase of all available theme variants. Theme colors are applied to selected dates and quick select options.',
      },
    },
  },
};

// Size Variants Stories
export const SizeVariants: Story = {
  name: "📏 Size Variants",
  render: () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Small (sm)</label>
          <DateRangePicker
            variant="primary"
            size="sm"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Medium (md) - Default</label>
          <DateRangePicker
            variant="primary"
            size="md"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Large (lg)</label>
          <DateRangePicker
            variant="primary"
            size="lg"
          />
        </div>
      </div>
      <div className="mt-4 p-4 bg-green-50 rounded-lg">
        <h3 className="text-sm font-medium mb-2">Size Variants:</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• <strong>Small (sm):</strong> Compact button with smaller padding and text</li>
          <li>• <strong>Medium (md):</strong> Standard size for most use cases</li>
          <li>• <strong>Large (lg):</strong> Prominent button with larger padding and text</li>
        </ul>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different size variants for the main DatePicker button. The size affects padding, font size, and icon size.',
      },
    },
  },
};

// Interactive Theme Selector
export const InteractiveThemeVariants: Story = {
  name: "🎯 Interactive Theme Variants",
  render: () => {
    const [selectedVariant, setSelectedVariant] = React.useState<"primary" | "success" | "warning" | "error" | "info" | "default">("primary");
    const [selectedSize, setSelectedSize] = React.useState<"sm" | "md" | "lg">("md");
    
    return (
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Theme Variant:</label>
              <select
                value={selectedVariant}
                onChange={(e) => setSelectedVariant(e.target.value as any)}
                className="p-2 border rounded"
              >
                <option value="default">Default</option>
                <option value="primary">Primary</option>
                <option value="success">Success</option>
                <option value="warning">Warning</option>
                <option value="error">Error</option>
                <option value="info">Info</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Size:</label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value as any)}
                className="p-2 border rounded"
              >
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">DateRangePicker with {selectedVariant} theme and {selectedSize} size:</label>
            <DateRangePicker
              variant={selectedVariant}
              size={selectedSize}
            />
          </div>
          
          <div className="p-3 bg-gray-50 rounded">
            <p className="text-sm">
              <strong>Current variant:</strong> {selectedVariant}
            </p>
            <p className="text-sm">
              <strong>Current size:</strong> {selectedSize}
            </p>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive example allowing you to switch between different theme variants and sizes in real-time.',
      },
    },
  },
};

// Combined Theme and Style Variants
export const CombinedVariants: Story = {
  name: "🎨 Combined Theme & Style Variants",
  render: () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Success Theme + Custom Styling</h3>
          <DateRangePicker
            variant="success"
            size="lg"
            calendarContainerClass="shadow-2xl rounded-xl"
            calendarInnerClass="bg-green-50"
            calendarBorderClass="border-2 border-green-200"
          />
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Error Theme + Dark Styling</h3>
          <DateRangePicker
            variant="error"
            size="md"
            calendarContainerClass="shadow-xl"
            calendarInnerClass="bg-red-50"
            calendarBorderClass="border-2 border-red-200"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Info Theme + Minimal Styling</h3>
          <DateRangePicker
            variant="info"
            size="sm"
            calendarContainerClass="shadow-none"
            calendarInnerClass="bg-blue-50"
            calendarBorderClass="border border-blue-200"
          />
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Warning Theme + Rounded Styling</h3>
          <DateRangePicker
            variant="warning"
            size="lg"
            calendarContainerClass="shadow-lg rounded-2xl"
            calendarInnerClass="bg-yellow-50"
            calendarBorderClass="border-2 border-yellow-200"
          />
        </div>
      </div>
      
      <div className="mt-4 p-4 bg-purple-50 rounded-lg">
        <h3 className="text-sm font-medium mb-2">Theme Colors Applied To:</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Selected start and end dates in the calendar</li>
          <li>• Date ranges (days between start and end)</li>
          <li>• Quick select buttons when selected</li>
          <li>• Month and year selection buttons when selected</li>
        </ul>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Examples combining theme variants with custom styling options to create unique date picker experiences.',
      },
    },
  },
};

// Original Stories (Enhanced with new props)
export const CustomShadowAndBorder: Story = {
  args: {
    ...Default.args,
    variant: "primary",
    size: "md",
    calendarContainerClass: "shadow-2xl rounded-xl",
    calendarInnerClass: "bg-white",
    calendarBorderClass: "border-4 border-blue-500",
  },
};

export const LargeShadowAndRoundedCorners: Story = {
  args: {
    ...Default.args,
    variant: "success",
    size: "lg",
    calendarContainerClass: "shadow-lg rounded-full", // Note: rounded-full might crop content if not managed
    calendarInnerClass: "bg-green-50 rounded-lg",
    calendarBorderClass: "ring-2 ring-green-700",
  },
};

export const DarkThemeExample: Story = {
  args: {
    ...Default.args,
    variant: "info",
    size: "md",
    calendarContainerClass: "shadow-xl",
    calendarInnerClass: "bg-gray-800 text-white rounded-md",
    calendarBorderClass: "border border-gray-600",
  },
};

export const NoShadowNoBorder: Story = {
  args: {
    ...Default.args,
    variant: "warning",
    size: "sm",
    calendarContainerClass: "shadow-none",
    calendarInnerClass: "bg-blue-50",
    calendarBorderClass: "border-none",
  },
};

// Input Mode Stories
export const InputMode: Story = {
  name: "📝 Input Mode",
  render: () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Basic Input Mode</label>
          <DateRangePicker
            mode="input"
            variant="primary"
            size="md"
            inputPlaceholder="Select your date range..."
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Input Mode with Custom Icon</label>
          <DateRangePicker
            mode="input"
            variant="success"
            size="md"
            inputIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M8 2v4" />
                <path d="M16 2v4" />
                <rect width="18" height="18" x="3" y="4" rx="2" />
                <path d="M3 10h18" />
                <path d="M8 14h.01" />
                <path d="M12 14h.01" />
                <path d="M16 14h.01" />
                <path d="M8 18h.01" />
                <path d="M12 18h.01" />
                <path d="M16 18h.01" />
              </svg>
            }
            inputPlaceholder="Pick dates..."
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Input Mode with Custom Styling</label>
          <DateRangePicker
            mode="input"
            variant="info"
            size="lg"
            inputClass="border-2 border-blue-300 rounded-lg shadow-md"
            inputPlaceholder="Choose date range..."
          />
        </div>
      </div>
      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-sm font-medium mb-2">Input Mode Features:</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Clean input field instead of button</li>
          <li>• Customizable placeholder text</li>
          <li>• Optional custom icon on the left</li>
          <li>• Custom styling with inputClass prop</li>
          <li>• Same calendar functionality as dropdown mode</li>
        </ul>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Input mode provides a cleaner input field interface instead of the dropdown button.',
      },
    },
  },
};

// Mode Comparison
export const ModeComparison: Story = {
  name: "🔄 Mode Comparison",
  render: () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Dropdown Mode (Default)</h3>
          <div className="space-y-3">
            <DateRangePicker
              mode="dropdown"
              variant="primary"
              size="sm"
            />
            <DateRangePicker
              mode="dropdown"
              variant="success"
              size="md"
            />
            <DateRangePicker
              mode="dropdown"
              variant="error"
              size="lg"
            />
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Input Mode</h3>
          <div className="space-y-3">
            <DateRangePicker
              mode="input"
              variant="primary"
              size="sm"
              inputPlaceholder="Small input..."
            />
            <DateRangePicker
              mode="input"
              variant="success"
              size="md"
              inputPlaceholder="Medium input..."
            />
            <DateRangePicker
              mode="input"
              variant="error"
              size="lg"
              inputPlaceholder="Large input..."
            />
          </div>
        </div>
      </div>
      <div className="mt-4 p-4 bg-purple-50 rounded-lg">
        <h3 className="text-sm font-medium mb-2">When to use each mode:</h3>
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <strong>Dropdown Mode:</strong>
            <ul className="mt-1 space-y-1">
              <li>• More prominent action buttons</li>
              <li>• Better for forms with multiple actions</li>
              <li>• Shows selected state clearly</li>
            </ul>
          </div>
          <div>
            <strong>Input Mode:</strong>
            <ul className="mt-1 space-y-1">
              <li>• Cleaner, more minimal appearance</li>
              <li>• Better for form-heavy interfaces</li>
              <li>• Integrates well with other inputs</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of dropdown mode and input mode with different sizes and variants.',
      },
    },
  },
};

// Enhancement Feature Stories - demonstrating new functionality
export const EnhancementFeatures: Story = {
  name: "🚀 Enhancement Features Demo",
  render: () => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    const nextMonth = new Date();
    nextMonth.setMonth(today.getMonth() + 1);
    const dayAfterTomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2);

    return (
      <div className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Enhanced DateRangePicker Features</h2>
          <p className="text-gray-600">
            This story demonstrates all the new enhancement features added to DateRangePicker.
          </p>
        </div>

        {/* QuickSelect Control */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">1. QuickSelect Control</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Default (Enabled & Visible)</label>
              <DateRangePicker variant="primary" size="md" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">QuickSelect Disabled</label>
              <DateRangePicker variant="success" size="md" enableQuickSelect={false} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Completely Disabled</label>
              <DateRangePicker variant="error" size="md" enableQuickSelect={false} />
            </div>
          </div>
        </div>

        {/* Single Date Mode */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">2. Single Date Mode</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Range Mode (Default)</label>
              <DateRangePicker variant="primary" size="md" singleDateMode={false} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Single Date Mode</label>
              <DateRangePicker variant="success" size="md" singleDateMode={true} />
            </div>
          </div>
        </div>

        {/* Date Restrictions */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">3. Date Restrictions</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">No Restrictions</label>
              <DateRangePicker variant="primary" size="md" singleDateMode={true} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Future Dates Only</label>
              <DateRangePicker variant="warning" size="md" singleDateMode={true} minDate={tomorrow} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Limited Range</label>
              <DateRangePicker variant="error" size="md" singleDateMode={true} minDate={tomorrow} maxDate={nextMonth} />
            </div>
          </div>
        </div>

        {/* Disabled Days */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">7. Disabled Days</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Disable Sundays</label>
              <DateRangePicker variant="primary" size="md" disabledWeekDays={[0]} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Disable Weekends</label>
              <DateRangePicker variant="success" size="md" disabledWeekDays={[0,6]} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Disable Specific Dates</label>
              <DateRangePicker 
                variant="info" 
                size="md" 
                disabledDates={[today, dayAfterTomorrow]} 
                singleDateMode={true}
              />
            </div>
          </div>
        </div>

        {/* Popup Dimensions */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">4. Custom Popup Dimensions</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Default Size</label>
              <DateRangePicker variant="primary" size="md" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Custom Width (400px)</label>
              <DateRangePicker variant="success" size="md" popupWidth="400px" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Width & Height (350px × 300px)</label>
              <DateRangePicker variant="info" size="md" popupWidth="350px" popupHeight="300px" />
            </div>
          </div>
        </div>

        {/* Font Scaling */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">5. Font Scaling</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Fixed Font (Default)</label>
              <DateRangePicker variant="primary" size="md" popupHeight="250px" autoScaleFont={false} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Auto Scaling Font</label>
              <DateRangePicker variant="success" size="md" popupHeight="250px" autoScaleFont={true} />
            </div>
          </div>
        </div>

        {/* Combined Features */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">6. Combined Features Example</h3>
          <div className="space-y-2">
            <label className="text-sm font-medium">
              All Features: Single Date + No QuickSelect + Date Restrictions + Custom Size + Font Scaling
            </label>
            <DateRangePicker
              variant="info"
              size="lg"
              mode="input"
              singleDateMode={true}
              enableQuickSelect={false}
              minDate={tomorrow}
              maxDate={nextMonth}
              popupWidth="400px"
              popupHeight="300px"
              autoScaleFont={true}
              inputPlaceholder="Select a future date..."
            />
          </div>
        </div>

        {/* Documentation */}
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Enhancement Features Summary</h3>
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-medium mb-2">Functionality Enhancements:</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• <code>enableQuickSelect</code>: Enable/disable quickSelect functionality</li>
                <li>• <code>showQuickSelect</code>: Show/hide quickSelect sidebar</li>
                <li>• <code>singleDateMode</code>: Single date selection instead of range</li>
                <li>• <code>minDate</code>: Restrict selection before specified date</li>
                <li>• <code>maxDate</code>: Restrict selection after specified date</li>
                <li>• <code>disabledWeekDays</code>: Disable specific weekdays (0=Sun ... 6=Sat)</li>
                <li>• <code>disabledDates</code>: Disable specific calendar dates</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">UI Enhancements:</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• <code>popupWidth</code>: Custom popup width (CSS values)</li>
                <li>• <code>popupHeight</code>: Custom popup height (CSS values)</li>
                <li>• <code>autoScaleFont</code>: Auto-scale fonts to fit container</li>
                <li>• All features work independently or combined</li>
                <li>• Preserves all existing functionality and styling</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive demonstration of all new enhancement features including quickSelect control, single date mode, date restrictions, popup dimensions, and font scaling.',
      },
    },
  },
};
