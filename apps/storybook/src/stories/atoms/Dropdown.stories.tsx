import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { Dropdown } from '@delhivery/tarmac';

// Sample options for all examples
const sampleOptions = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
  { value: '4', label: 'Option 4' },
  { value: '5', label: 'Option 5' },
];

const longOptions = Array.from({ length: 20 }, (_, i) => ({
  value: `${i + 1}`,
  label: `Option ${i + 1}`,
}));

const meta: Meta<typeof Dropdown> = {
  title: 'Atoms/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline'],
      description: 'The visual style of the dropdown',
      defaultValue: 'primary',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the dropdown',
      defaultValue: 'md',
    },
    multiple: {
      control: 'boolean',
      description: 'Whether multiple options can be selected',
      defaultValue: false,
    },
    isSearchable: {
      control: 'boolean',
      description: 'Whether the dropdown is searchable',
      defaultValue: false,
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the dropdown is disabled',
      defaultValue: false,
    },
    isLoading: {
      control: 'boolean',
      description: 'Whether the dropdown is in a loading state',
      defaultValue: false,
    },
    isFullWidth: {
      control: 'boolean',
      description: 'Whether the dropdown takes full width',
      defaultValue: false,
    },
    isRounded: {
      control: 'boolean',
      description: 'Whether the dropdown has rounded corners',
      defaultValue: false,
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no option is selected',
    },
    pillVariant: {
      control: 'select',
      options: ['default', 'success', 'danger', 'warning', 'info'],
      description: 'The variant of pills in multi-select mode',
      defaultValue: 'info',
    },
    loading: {
      control: 'boolean',
      description: 'Whether the dropdown is in a loading state',
      defaultValue: false,
    },
    value: {
      control: 'text',
      description: 'Selected value',
    },
    options: {
      control: 'object',
      description: 'Dropdown options',
    },
    onChange: {
      action: 'changed',
      description: 'Callback when selection changes',
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names',
    },
    backgroundColor: {
      control: 'color',
      description: 'Custom background color',
    },
    textColor: {
      control: 'color',
      description: 'Custom text color',
    },
    borderColor: {
      control: 'color',
      description: 'Custom border color',
    },
    hoverColor: {
      control: 'color',
      description: 'Custom hover color',
    },
    radius: {
      control: 'text',
      description: 'Custom border radius',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    options: sampleOptions,
    placeholder: 'Select an option',
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Dropdown {...args} size="sm" />
        <Dropdown {...args} size="md" />
        <Dropdown {...args} size="lg" />
      </div>
      <div className="flex items-center gap-4">
        <Dropdown {...args} isLoading={true} />
        <Dropdown {...args} disabled={true} />
        <Dropdown {...args} value="1" />
      </div>
      <div className="flex items-center gap-4">
        <Dropdown
          {...args}
          backgroundColor="purple"
          textColor="white"
          borderColor="red"
        />
        <Dropdown
          {...args}
          isRounded={true}
          className="shadow-lg"
        />
      </div>
    </div>
  ),
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    options: sampleOptions,
    placeholder: 'Select an option',
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Dropdown {...args} size="sm" />
        <Dropdown {...args} size="md" />
        <Dropdown {...args} size="lg" />
      </div>
      <div className="flex items-center gap-4">
        <Dropdown {...args} isLoading={true} />
        <Dropdown {...args} disabled={true} />
        <Dropdown {...args} value="1" />
      </div>
      <div className="flex items-center gap-4">
        <Dropdown
          {...args}
          backgroundColor="purple"
          textColor="white"
          borderColor="red"
        />
        <Dropdown
          {...args}
          isRounded={true}
          className="shadow-lg"
        />
      </div>
    </div>
  ),
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    options: sampleOptions,
    placeholder: 'Select an option',
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Dropdown {...args} size="sm" />
        <Dropdown {...args} size="md" />
        <Dropdown {...args} size="lg" />
      </div>
      <div className="flex items-center gap-4">
        <Dropdown {...args} isLoading={true} />
        <Dropdown {...args} disabled={true} />
        <Dropdown {...args} value="1" />
      </div>
      <div className="flex items-center gap-4">
        <Dropdown
          {...args}
          backgroundColor="purple"
          textColor="white"
          borderColor="red"
        />
        <Dropdown
          {...args}
          isRounded={true}
          className="shadow-lg"
        />
      </div>
    </div>
  ),
};

// Multi-select examples
export const MultiSelect: Story = {
  args: {
    options: sampleOptions,
    placeholder: 'Select multiple options',
    multiple: true,
    value: ['1', '2'],
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Dropdown {...args} size="sm" />
        <Dropdown {...args} size="md" />
        <Dropdown {...args} size="lg" />
      </div>
      <div className="flex items-center gap-4">
        <Dropdown {...args} isLoading={true} />
        <Dropdown {...args} disabled={true} />
        <Dropdown {...args} value={['1', '2']} />
      </div>
      <div className="flex items-center gap-4">
        <Dropdown
          {...args}
          pillVariant="success"
          placeholder="Success pills"
        />
        <Dropdown
          {...args}
          pillVariant="warning"
          placeholder="Warning pills"
        />
        <Dropdown
          {...args}
          pillVariant="danger"
          placeholder="Danger pills"
        />
      </div>
    </div>
  ),
};

// Searchable examples
export const Searchable: Story = {
  args: {
    options: sampleOptions,
    placeholder: 'Search options...',
    isSearchable: true,
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Dropdown {...args} size="sm" />
        <Dropdown {...args} size="md" />
        <Dropdown {...args} size="lg" />
      </div>
      <div className="flex items-center gap-4">
        <Dropdown {...args} isLoading={true} />
        <Dropdown {...args} disabled={true} />
        <Dropdown {...args} value="1" />
      </div>
      <div className="flex items-center gap-4">
        <Dropdown
          {...args}
          multiple
          placeholder="Search multiple options"
        />
        <Dropdown
          {...args}
          isRounded={true}
          className="shadow-lg"
        />
      </div>
    </div>
  ),
};

// Multi-select with pre-selected values
export const MultiSelectWithPreselected: Story = {
  args: {
    options: sampleOptions,
    placeholder: 'Select multiple options',
    multiple: true,
    value: ['1', '3'],
  },
  parameters: {
    docs: {
      description: {
        story: 'Multi-select dropdown with pre-selected values displayed as Pills inside the dropdown.',
      },
    },
  },
};

// Multi-select with long option list
export const MultiSelectLongList: Story = {
  args: {
    options: longOptions,
    placeholder: 'Select from many options',
    multiple: true,
    isSearchable: true,
    value: ['1', '5', '10'],
  },
  parameters: {
    docs: {
      description: {
        story: 'Multi-select dropdown with a long list of options and search functionality. Selected items are displayed as Pills inside the dropdown.',
      },
    },
  },
};

// Multi-select with different pill variants
export const MultiSelectPillVariants = () => {
  const [selectedValues, setSelectedValues] = useState<(string | number)[]>(['1', '2']);

  return (
    <div className="flex flex-col gap-4">
      <Dropdown
        options={sampleOptions}
        value={selectedValues}
        onChange={(value) => setSelectedValues(value as (string | number)[])}
        multiple
        pillVariant="success"
        placeholder="Success pills"
      />
      <Dropdown
        options={sampleOptions}
        value={selectedValues}
        onChange={(value) => setSelectedValues(value as (string | number)[])}
        multiple
        pillVariant="warning"
        placeholder="Warning pills"
      />
      <Dropdown
        options={sampleOptions}
        value={selectedValues}
        onChange={(value) => setSelectedValues(value as (string | number)[])}
        multiple
        pillVariant="danger"
        placeholder="Danger pills"
      />
      <Dropdown
        options={sampleOptions}
        value={selectedValues}
        onChange={(value) => setSelectedValues(value as (string | number)[])}
        multiple
        pillVariant="info"
        placeholder="Info pills"
      />
    </div>
  );
};

MultiSelectPillVariants.parameters = {
  docs: {
    description: {
      story: 'Multi-select dropdowns with different Pill variants. Selected items are displayed as Pills inside the dropdown with the specified variant.',
    },
  },
};

// Multi-select with different states
export const MultiSelectStates = () => {
  return (
    <div className="flex flex-col gap-4">
      <Dropdown
        options={sampleOptions}
        multiple
        disabled
        placeholder="Disabled multi-select"
        value={['1', '2']}
      />
      <Dropdown
        options={sampleOptions}
        multiple
        isLoading
        placeholder="Loading multi-select"
        value={['1', '2']}
      />
      <Dropdown
        options={sampleOptions}
        multiple
        error="Error state example"
        placeholder="Error multi-select"
        value={['1', '2']}
      />
    </div>
  );
};

MultiSelectStates.parameters = {
  docs: {
    description: {
      story: 'Multi-select dropdowns in different states (disabled, loading, error). Selected items are displayed as Pills inside the dropdown.',
    },
  },
};

// Multi-select with different sizes
export const MultiSelectSizes = () => {
  return (
    <div className="flex flex-col gap-4">
      <Dropdown
        options={sampleOptions}
        multiple
        size="sm"
        placeholder="Small multi-select"
        value={['1']}
      />
      <Dropdown
        options={sampleOptions}
        multiple
        size="md"
        placeholder="Medium multi-select"
        value={['1', '2']}
      />
      <Dropdown
        options={sampleOptions}
        multiple
        size="lg"
        placeholder="Large multi-select"
        value={['1', '2', '3']}
      />
    </div>
  );
};

MultiSelectSizes.parameters = {
  docs: {
    description: {
      story: 'Multi-select dropdowns in different sizes. Selected items are displayed as Pills inside the dropdown.',
    },
  },
};

// Multi-select with different variants
export const MultiSelectVariants = () => {
  return (
    <div className="flex flex-col gap-4">
      <Dropdown
        options={sampleOptions}
        multiple
        variant="primary"
        placeholder="Primary multi-select"
        value={['1', '2']}
      />
      <Dropdown
        options={sampleOptions}
        multiple
        variant="secondary"
        placeholder="Secondary multi-select"
        value={['1', '2']}
      />
      <Dropdown
        options={sampleOptions}
        multiple
        variant="outline"
        placeholder="Outline multi-select"
        value={['1', '2']}
      />
    </div>
  );
};

MultiSelectVariants.parameters = {
  docs: {
    description: {
      story: 'Multi-select dropdowns with different visual variants. Selected items are displayed as Pills inside the dropdown.',
    },
  },
};

// Single-select with different variants
export const SingleSelectVariants = () => {
  return (
    <div className="flex flex-col gap-4">
      <Dropdown
        options={sampleOptions}
        variant="primary"
        placeholder="Primary dropdown"
        value="1"
      />
      <Dropdown
        options={sampleOptions}
        variant="secondary"
        placeholder="Secondary dropdown"
        value="1"
      />
      <Dropdown
        options={sampleOptions}
        variant="outline"
        placeholder="Outline dropdown"
        value="1"
      />
    </div>
  );
};

SingleSelectVariants.parameters = {
  docs: {
    description: {
      story: 'Single-select dropdowns with different visual variants.',
    },
  },
};

// Single-select with different states
export const SingleSelectStates = () => {
  return (
    <div className="flex flex-col gap-4">
      <Dropdown
        options={sampleOptions}
        disabled
        placeholder="Disabled dropdown"
        value="1"
      />
      <Dropdown
        options={sampleOptions}
        isLoading
        placeholder="Loading dropdown"
        value="1"
      />
      <Dropdown
        options={sampleOptions}
        error="Error state example"
        placeholder="Error dropdown"
        value="1"
      />
    </div>
  );
};

SingleSelectStates.parameters = {
  docs: {
    description: {
      story: 'Single-select dropdowns in different states (disabled, loading, error).',
    },
  },
};

// With icons
export const WithIcons = () => {
  const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );

  return (
    <div className="flex flex-col gap-4">
      <Dropdown
        options={sampleOptions}
        placeholder="Left icon"
        icon={<PlusIcon />}
        iconPosition="left"
      />
      <Dropdown
        options={sampleOptions}
        placeholder="Right icon"
        icon={<PlusIcon />}
        iconPosition="right"
      />
      <Dropdown
        options={sampleOptions}
        placeholder="Multi-select with icon"
        multiple
        value={['1', '2']}
        icon={<PlusIcon />}
        iconPosition="left"
      />
    </div>
  );
};

WithIcons.parameters = {
  docs: {
    description: {
      story: 'Dropdowns with icons positioned on the left or right. Also shows a multi-select dropdown with an icon.',
    },
  },
};

// Icon-only (compact "More" trigger)
export const IconOnly: Story = {
  args: {
    options: sampleOptions,
    placeholder: '',
    displayOnlyPlaceholder: true,
    value: undefined,
  },
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      <Dropdown
        {...args}
        iconOnly
        icon={<FontAwesomeIcon icon={faEllipsis} className="w-4 h-4" />}
        className="!p-0 !min-w-[2.375rem] !w-[2.375rem] !h-[2.375rem] !bg-[#1F222E] !text-white !border-0 rounded-lg"
      />
      <Dropdown
        {...args}
        iconOnly
        icon={<FontAwesomeIcon icon={faEllipsis} className="w-4 h-4" />}
        variant="outline"
        className="!p-0 !min-w-[2.375rem] !w-[2.375rem] !h-[2.375rem]"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Compact trigger showing only the icon (e.g. "More" ellipsis). No placeholder or selected value. Use className to style the trigger.',
      },
    },
  },
}; 