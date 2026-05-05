import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';
import { TimePicker } from '@delhivery/tarmac';

const meta: Meta<typeof TimePicker> = {
  title: 'Atoms/TimePicker',
  component: TimePicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A flexible TimePicker component that allows users to select time with various formatting options.

## Features
- 12-hour and 24-hour formats
- Optional seconds selection
- Customizable styling
- Keyboard navigation
- AM/PM selection for 12-hour format
- Smooth scrolling interface
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'The current time value in "HH:mm" or "HH:mm:ss" format. For 12-hour format, use "HH:mm AM/PM".',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
    },
    onChange: {
      action: 'time changed',
      description: 'Callback function triggered when the time changes. Returns the formatted time string.',
      table: {
        type: { summary: '(value: string) => void' },
      },
    },
    use24Hour: {
      control: 'boolean',
      description: 'If true, displays and operates in 24-hour format (0-23 hours). If false, uses 12-hour format with AM/PM.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    showSeconds: {
      control: 'boolean',
      description: 'If true, includes seconds in the time selection interface.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional Tailwind CSS classes for the main component container.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
    },
    customClassNames: {
      control: 'object',
      description: 'Object containing custom Tailwind CSS classes for specific internal elements.',
      table: {
        type: { 
          summary: `{
  label?: string;
  input?: string;
  dropdown?: string;
  timeItem?: string;
  icon?: string;
}` 
        },
        defaultValue: { summary: '{}' },
      },
    },
    icon: {
      control: false,
      description: 'Custom React element/icon to display in the TimePicker. Defaults to a clock icon.',
      table: {
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: '<FontAwesome clock icon>' },
      },
    },
    showIcon: {
      control: 'boolean',
      description: 'Enable or disable the icon display in the TimePicker.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    iconPosition: {
      control: { type: 'select' },
      options: ['left', 'right'],
      description: 'Position of the icon relative to the input field.',
      table: {
        type: { summary: "'left' | 'right'" },
        defaultValue: { summary: "'right'" },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text shown when no time is selected.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '"Select time"' },
      },
    },
    allowClear: {
      control: 'boolean',
      description: 'Show a clear button to reset the time selection.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof TimePicker>;

// Basic Examples
export const Default: Story = {
  args: {
    value: '10:30',
    use24Hour: false,
    showSeconds: false,
    className: '',
    customClassNames: {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic TimePicker with 12-hour format and no seconds.',
      },
    },
  },
};

export const TwentyFourHour: Story = {
  args: {
    value: '14:30',
    use24Hour: true,
    showSeconds: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'TimePicker using 24-hour format (military time).',
      },
    },
  },
};

export const WithSeconds: Story = {
  args: {
    value: '14:45:30',
    use24Hour: true,
    showSeconds: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'TimePicker with seconds selection enabled in 24-hour format.',
      },
    },
  },
};

export const WithSecondsAMPM: Story = {
  args: {
    value: '02:45:30',
    use24Hour: false,
    showSeconds: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'TimePicker with seconds selection enabled in 12-hour format with AM/PM.',
      },
    },
  },
};

// Interactive Examples
export const Interactive: Story = {
  render: (args) => {
    const [time, setTime] = useState('09:30');
    
    return (
      <div className="space-y-4">
        <div className="text-sm text-gray-600">
          Selected time: <span className="font-mono font-bold">{time}</span>
        </div>
        <TimePicker
          {...args}
          value={time}
          onChange={setTime}
        />
      </div>
    );
  },
  args: {
    use24Hour: false,
    showSeconds: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive TimePicker that shows the selected time value.',
      },
    },
  },
};

export const InteractiveWithSeconds: Story = {
  render: (args) => {
    const [time, setTime] = useState('15:45:20');
    
    return (
      <div className="space-y-4">
        <div className="text-sm text-gray-600">
          Selected time: <span className="font-mono font-bold">{time}</span>
        </div>
        <TimePicker
          {...args}
          value={time}
          onChange={setTime}
        />
      </div>
    );
  },
  args: {
    use24Hour: true,
    showSeconds: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive TimePicker with seconds in 24-hour format.',
      },
    },
  },
};

export const RestrictedRange: Story = {
  render: (args) => {
    const [time, setTime] = useState('');
    return (
      <div className="space-y-3">
        <div className="text-sm text-gray-600">Allowed: 09:00 to 18:59 (minutes disabled at 18)</div>
        <TimePicker
          {...args}
          value={time}
          onChange={setTime}
          startTime={9}
          EndTime={18}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Restricts selectable hours from 09 to 18 inclusive. Minutes are disabled when 18 is selected.'
      }
    }
  }
};

// Time Formats
export const EarlyMorning: Story = {
  args: {
    value: '06:00',
    use24Hour: false,
    showSeconds: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'TimePicker set to early morning time (6:00 AM).',
      },
    },
  },
};

export const Midnight: Story = {
  args: {
    value: '00:00',
    use24Hour: true,
    showSeconds: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'TimePicker set to midnight in 24-hour format.',
      },
    },
  },
};

export const Noon: Story = {
  args: {
    value: '12:00',
    use24Hour: false,
    showSeconds: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'TimePicker set to noon (12:00 PM).',
      },
    },
  },
};

export const LateMidnight: Story = {
  args: {
    value: '23:59:59',
    use24Hour: true,
    showSeconds: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'TimePicker set to the last second of the day.',
      },
    },
  },
};

// Custom Styling Examples
export const CustomStyling: Story = {
  args: {
    value: '08:00',
    use24Hour: false,
    showSeconds: false,
    customClassNames: {
      input: 'border-purple-500 bg-purple-50 text-purple-800 font-semibold focus:border-purple-600 focus:ring-purple-500',
      dropdown: 'shadow-xl border-2 border-purple-400 bg-purple-50 rounded-xl p-6',
      label: 'text-purple-700 font-bold uppercase tracking-wide',
      timeItem: 'hover:bg-purple-200 hover:text-purple-900 data-[selected=true]:bg-purple-600 data-[selected=true]:text-white font-medium',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'TimePicker with custom purple theme styling.',
      },
    },
  },
};

export const MinimalStyling: Story = {
  args: {
    value: '14:30',
    use24Hour: true,
    showSeconds: false,
    customClassNames: {
      input: 'border-gray-300 text-gray-700 bg-gray-50 focus:border-gray-500 focus:ring-gray-400',
      dropdown: 'shadow-sm border border-gray-200 bg-white rounded-md p-2',
      label: 'text-gray-500 text-xs',
      timeItem: 'hover:bg-gray-100 text-gray-700 data-[selected=true]:bg-gray-600 data-[selected=true]:text-white',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'TimePicker with minimal, clean styling.',
      },
    },
  },
};



// Size Variations
export const Compact: Story = {
  args: {
    value: '12:00',
    use24Hour: false,
    showSeconds: false,
    customClassNames: {
      input: 'p-1 h-8 text-sm w-24',
      dropdown: 'p-2 text-sm',
      label: 'text-xs',
      timeItem: 'py-0.5 px-1 text-xs',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact TimePicker with smaller dimensions.',
      },
    },
  },
};

export const Large: Story = {
  args: {
    value: '15:30',
    use24Hour: true,
    showSeconds: false,
    customClassNames: {
      input: 'p-4 h-12 text-lg w-40 font-medium',
      dropdown: 'p-6 text-lg',
      label: 'text-base font-semibold',
      timeItem: 'py-2 px-3 text-base',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Large TimePicker with bigger dimensions and text.',
      },
    },
  },
};

// Edge Cases and Special Scenarios
export const EmptyValue: Story = {
  args: {
    value: '',
    use24Hour: false,
    showSeconds: false,
    placeholder: 'Select a time',
  },
  parameters: {
    docs: {
      description: {
        story: 'TimePicker with empty initial value and custom placeholder text.',
      },
    },
  },
};

export const NoDefaultTime: Story = {
  args: {
    use24Hour: false,
    showSeconds: false,
    placeholder: 'Choose your time',
  },
  parameters: {
    docs: {
      description: {
        story: 'TimePicker with no default time selected - shows placeholder until user selects a time.',
      },
    },
  },
};

export const WithClearButton: Story = {
  args: {
    value: '14:30',
    use24Hour: true,
    showSeconds: false,
    allowClear: true,
    placeholder: 'Select time',
  },
  parameters: {
    docs: {
      description: {
        story: 'TimePicker with clear button enabled - allows users to clear the selected time.',
      },
    },
  },
};

export const InvalidValue: Story = {
  args: {
    value: 'invalid-time',
    use24Hour: false,
    showSeconds: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'TimePicker with invalid time value - should handle gracefully.',
      },
    },
  },
};

// Multiple TimePickers
export const MultipleTimePickers: Story = {
  render: () => {
    const [startTime, setStartTime] = useState('09:00');
    const [endTime, setEndTime] = useState('17:00');
    const [breakTime, setBreakTime] = useState('12:30');

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Start Time</label>
            <TimePicker
              value={startTime}
              onChange={setStartTime}
              use24Hour={true}
              showSeconds={false}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">End Time</label>
            <TimePicker
              value={endTime}
              onChange={setEndTime}
              use24Hour={true}
              showSeconds={false}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Break Time</label>
            <TimePicker
              value={breakTime}
              onChange={setBreakTime}
              use24Hour={true}
              showSeconds={false}
            />
          </div>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-2">Selected Schedule:</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <div>Work starts at: <span className="font-mono font-bold">{startTime}</span></div>
            <div>Break time: <span className="font-mono font-bold">{breakTime}</span></div>
            <div>Work ends at: <span className="font-mono font-bold">{endTime}</span></div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Multiple TimePickers used together for a work schedule.',
      },
    },
  },
};

// Form Integration Example
export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      appointmentTime: '10:00',
      reminderTime: '09:45',
      duration: '01:30',
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert(`Form submitted with data: ${JSON.stringify(formData, null, 2)}`);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white border rounded-lg shadow-sm max-w-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Appointment Booking</h3>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Appointment Time</label>
          <TimePicker
            value={formData.appointmentTime}
            onChange={(value) => setFormData(prev => ({ ...prev, appointmentTime: value }))}
            use24Hour={false}
            showSeconds={false}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Reminder Time</label>
          <TimePicker
            value={formData.reminderTime}
            onChange={(value) => setFormData(prev => ({ ...prev, reminderTime: value }))}
            use24Hour={false}
            showSeconds={false}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Duration</label>
          <TimePicker
            value={formData.duration}
            onChange={(value) => setFormData(prev => ({ ...prev, duration: value }))}
            use24Hour={true}
            showSeconds={false}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Book Appointment
        </button>
      </form>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'TimePicker integrated into a form for appointment booking.',
      },
    },
  },
};

// Theme Variants Story
export const ThemeVariants: Story = {
  name: "🎨 Theme Variants",
  render: () => (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Default</label>
          <TimePicker
            value="14:30"
            variant="default"
            onChange={(value) => console.log("Default:", value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Primary</label>
          <TimePicker
            value="14:30"
            variant="primary"
            onChange={(value) => console.log("Primary:", value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Success</label>
          <TimePicker
            value="14:30"
            variant="success"
            onChange={(value) => console.log("Success:", value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Warning</label>
          <TimePicker
            value="14:30"
            variant="warning"
            onChange={(value) => console.log("Warning:", value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Error</label>
          <TimePicker
            value="14:30"
            variant="error"
            onChange={(value) => console.log("Error:", value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Info</label>
          <TimePicker
            value="14:30"
            variant="info"
            onChange={(value) => console.log("Info:", value)}
          />
        </div>
      </div>
      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-sm font-medium mb-2">Note:</h3>
        <p className="text-sm text-gray-600">
          Theme colors are applied only to selected time values (hh, mm, ss, AM/PM), not to the input button or dropdown container.
        </p>
      </div>
    </div>
  ),
};

// Interactive Theme Variants Story
export const InteractiveThemeVariants: Story = {
  name: "🎯 Interactive Theme Variants",
  render: () => {
    const [selectedVariant, setSelectedVariant] = React.useState<"primary" | "success" | "warning" | "error" | "info" | "default">("primary");
    const [time, setTime] = React.useState("09:15:30");
    
    return (
      <div className="space-y-6">
        <div className="space-y-4">
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
            <label className="text-sm font-medium">TimePicker with {selectedVariant} theme:</label>
            <TimePicker
              value={time}
              variant={selectedVariant}
              showSeconds={true}
              onChange={setTime}
            />
          </div>
          
          <div className="p-3 bg-gray-50 rounded">
            <p className="text-sm">
              <strong>Selected time:</strong> {time}
            </p>
            <p className="text-sm">
              <strong>Current variant:</strong> {selectedVariant}
            </p>
          </div>
        </div>
      </div>
    );
  },
};

// Theme Variants with 12-hour format
export const ThemeVariants12Hour: Story = {
  name: "🕐 Theme Variants (12-hour)",
  render: () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">AM Times</h3>
          <div className="space-y-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Primary AM</label>
              <TimePicker
                value="09:30"
                variant="primary"
                use24Hour={false}
                onChange={(value) => console.log("Primary AM:", value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Success AM</label>
              <TimePicker
                value="10:45"
                variant="success"
                use24Hour={false}
                onChange={(value) => console.log("Success AM:", value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Warning AM</label>
              <TimePicker
                value="11:15"
                variant="warning"
                use24Hour={false}
                onChange={(value) => console.log("Warning AM:", value)}
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">PM Times</h3>
          <div className="space-y-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Error PM</label>
              <TimePicker
                value="14:30"
                variant="error"
                use24Hour={false}
                onChange={(value) => console.log("Error PM:", value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Info PM</label>
              <TimePicker
                value="16:45"
                variant="info"
                use24Hour={false}
                onChange={(value) => console.log("Info PM:", value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Default PM</label>
              <TimePicker
                value="18:00"
                variant="default"
                use24Hour={false}
                onChange={(value) => console.log("Default PM:", value)}
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 p-4 bg-green-50 rounded-lg">
        <h3 className="text-sm font-medium mb-2">Theme Colors Applied To:</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Selected hour values (hh)</li>
          <li>• Selected minute values (mm)</li>
          <li>• Selected second values (ss) - if enabled</li>
          <li>• Selected AM/PM values - if using 12-hour format</li>
        </ul>
      </div>
    </div>
  ),
};

// Icon Examples
export const WithCustomIcon: Story = {
  args: {
    value: '10:30',
    use24Hour: false,
    showSeconds: false,
    icon: React.createElement('span', { style: { fontSize: '16px' } }, '⏰'),
    showIcon: true,
    iconPosition: 'right',
  },
  parameters: {
    docs: {
      description: {
        story: 'TimePicker with custom icon (emoji) positioned on the right.',
      },
    },
  },
};

export const IconOnLeft: Story = {
  args: {
    value: '14:30',
    use24Hour: true,
    showSeconds: false,
    iconPosition: 'left',
    showIcon: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'TimePicker with default clock icon positioned on the left side.',
      },
    },
  },
};

export const NoIcon: Story = {
  args: {
    value: '09:15',
    use24Hour: false,
    showSeconds: false,
    showIcon: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'TimePicker with icon disabled - clean input field without any icon.',
      },
    },
  },
};

export const IconExamples: Story = {
  render: () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Icon Customization Examples</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Icon Positions</h3>
          <div className="space-y-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Icon on Right (Default)</label>
              <TimePicker
                value="10:30"
                use24Hour={false}
                iconPosition="right"
                onChange={(value) => console.log("Right icon:", value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Icon on Left</label>
              <TimePicker
                value="14:45"
                use24Hour={true}
                iconPosition="left"
                onChange={(value) => console.log("Left icon:", value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">No Icon</label>
              <TimePicker
                value="09:15"
                use24Hour={false}
                showIcon={false}
                onChange={(value) => console.log("No icon:", value)}
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Custom Icons</h3>
          <div className="space-y-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Default Clock Icon</label>
              <TimePicker
                value="12:00"
                use24Hour={false}
                onChange={(value) => console.log("Clock icon:", value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Emoji Icon</label>
              <TimePicker
                value="16:30"
                use24Hour={true}
                icon={React.createElement('span', { style: { fontSize: '16px' } }, '⏰')}
                onChange={(value) => console.log("Emoji icon:", value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Another Emoji</label>
              <TimePicker
                value="20:15"
                use24Hour={true}
                icon={React.createElement('span', { style: { fontSize: '16px' } }, '🕐')}
                onChange={(value) => console.log("Clock emoji:", value)}
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-sm font-medium mb-2">Icon Features:</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Customizable icon via <code>icon</code> prop (React element)</li>
          <li>• Enable/disable with <code>showIcon</code> prop (default: true)</li>
          <li>• Position control with <code>iconPosition</code> prop ('left' | 'right')</li>
          <li>• Default clock icon if no custom icon provided</li>
          <li>• Icon styling via <code>customClassNames.icon</code></li>
          <li>• Clickable icon that opens the time picker</li>
        </ul>
      </div>
    </div>
  ),
};

// No Default Time Examples
export const NoDefaultTimeExamples: Story = {
  name: "🆕 No Default Time Selection",
  render: () => {
    const [time1, setTime1] = React.useState("");
    const [time2, setTime2] = React.useState("");
    const [time3, setTime3] = React.useState("");
    
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-bold">No Default Time Selection Examples</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Basic Examples</h3>
            <div className="space-y-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Default Placeholder</label>
                <TimePicker
                  value={time1}
                  onChange={setTime1}
                  use24Hour={false}
                />
                <p className="text-xs text-gray-500">
                  Selected: {time1 || "None"}
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Custom Placeholder</label>
                <TimePicker
                  value={time2}
                  onChange={setTime2}
                  use24Hour={true}
                  placeholder="Pick your time"
                />
                <p className="text-xs text-gray-500">
                  Selected: {time2 || "None"}
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">With Clear Button</label>
                <TimePicker
                  value={time3}
                  onChange={setTime3}
                  use24Hour={false}
                  allowClear={true}
                  placeholder="Select appointment time"
                />
                <p className="text-xs text-gray-500">
                  Selected: {time3 || "None"}
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Features</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="p-3 bg-blue-50 rounded">
                <h4 className="font-medium mb-2">New Features:</h4>
                <ul className="space-y-1">
                  <li>• <code>placeholder</code> prop for custom placeholder text</li>
                  <li>• <code>allowClear</code> prop to show clear button</li>
                  <li>• No default time selected by default</li>
                  <li>• Empty input shows placeholder until time is selected</li>
                  <li>• Clear button appears only when time is selected</li>
                  <li>• Smart initialization when selecting from empty state</li>
                </ul>
              </div>
              
              <div className="p-3 bg-green-50 rounded">
                <h4 className="font-medium mb-2">Behavior:</h4>
                <ul className="space-y-1">
                  <li>• Selecting hour/minute auto-initializes missing values</li>
                  <li>• 12-hour format auto-sets AM/PM based on hour</li>
                  <li>• Clear button resets to empty state</li>
                  <li>• Maintains backward compatibility with existing usage</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};