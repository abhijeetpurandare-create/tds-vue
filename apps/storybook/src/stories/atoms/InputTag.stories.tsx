import React, { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { InputTag } from '@delhivery/tarmac';
import type { TagItem, TagStatus } from '@delhivery/tarmac';

const meta: Meta<typeof InputTag> = {
  title: 'Atoms/InputTag',
  component: InputTag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  // Use `args` at meta level for defaults (Storybook 7 best practice — `defaultValue` in argTypes is deprecated)
  args: {
    value: [],
    tokenSeparators: [',', ' '],
    disabled: false,
    placeholder: '',
    label: undefined,
    errorMessage: '',
    customClearErrorButtonText: 'Clear items with errors',
    tagSize: 'sm',
    tagBordered: false,
  },
  argTypes: {
    value: {
      control: 'object',
      description:
        'Controlled array of `TagItem` objects (`{ value: string, status?: TagStatus }`) or plain strings.',
      table: {
        type: { summary: '(TagItem | string)[]' },
        defaultValue: { summary: '[]' },
      },
    },
    onChange: {
      action: 'changed',
      description: 'Called when tags change — always emits `TagItem[]`.',
      table: {
        type: { summary: '(tags: TagItem[]) => void' },
      },
    },
    tokenSeparators: {
      control: 'object',
      description:
        'Characters that trigger tag creation when typed/pasted. Enter key always creates a tag regardless.',
      table: {
        type: { summary: 'string[]' },
        defaultValue: { summary: "[',', ' ']" },
      },
    },
    maxTagCount: {
      control: { type: 'number', min: 0, step: 1 },
      description: 'Maximum number of tags allowed',
      table: {
        type: { summary: 'number | undefined' },
        defaultValue: { summary: 'undefined' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text shown when no tags exist',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "''" },
      },
    },
    label: {
      control: 'text',
      description: 'Label text above the input',
      table: {
        type: { summary: 'ReactNode' },
        defaultValue: { summary: 'undefined' },
      },
    },
    errorMessage: {
      control: 'text',
      description: 'Error message to display below the input',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "''" },
      },
    },
    customClearErrorButtonText: {
      control: 'text',
      description: 'Text for the clear error button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'Clear items with errors'" },
      },
    },
    tagSize: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Orca Pill size for tags',
      table: {
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: "'sm'" },
      },
    },
    tagBordered: {
      control: 'boolean',
      description: 'Whether tags have a border',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    showClearErrorButton: {
      control: 'boolean',
      description: 'Show/hide the clear error button',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'auto (true when onClearErrors provided)' },
      },
    },
    onClearErrors: {
      action: 'clearErrors',
      description: 'Called when the clear errors button is clicked',
      table: {
        type: { summary: '() => void' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof InputTag>;

// ── Helper: stateful wrapper so args from controls are reactive ──────────

const normalizeValue = (raw: (TagItem | string)[] = []): TagItem[] =>
  raw.map((v) =>
    typeof v === 'string' ? { value: v, status: 'default' as TagStatus } : v
  );

const StatefulInputTag = (props: React.ComponentProps<typeof InputTag>) => {
  const [tags, setTags] = useState<TagItem[]>(() => normalizeValue(props.value));

  // Sync external args into local state when controls change
  useEffect(() => {
    setTags(normalizeValue(props.value));
  }, [JSON.stringify(props.value)]);

  return (
    <div style={{ width: 480 }}>
      <InputTag {...props} value={tags} onChange={setTags} />
    </div>
  );
};

// ── Default ──────────────────────────────────────────────────

export const Default: Story = {
  args: {
    value: [
      { value: 'tag-1', status: 'default' },
      { value: 'tag-2', status: 'default' },
      { value: 'tag-3', status: 'default' },
    ],
    label: 'Add tags',
    placeholder: 'Type and press Enter or comma to add',
    tokenSeparators: [',', ' '],
    tagSize: 'sm',
    tagBordered: false,
    disabled: false,
    errorMessage: '',
    customClearErrorButtonText: 'Clear items with errors',
  },
  render: (args) => <StatefulInputTag {...args} />,
};

// ── With Status-based Error Highlighting ─────────────────────

export const WithErrors: Story = {
  args: {
    value: [
      { value: '84722710001735', status: 'default' },
      { value: 'INVALID-001', status: 'error' },
      { value: '84722710001999', status: 'default' },
      { value: 'INVALID-002', status: 'error' },
    ],
    label: 'Add AWBs to process (Max 200)',
    placeholder: 'Enter AWB numbers separated by commas',
    errorMessage: '2 AWBs are invalid',
    customClearErrorButtonText: 'Clear AWBs with errors',
    tagSize: 'sm',
    tagBordered: false,
  },
  render: (args) => {
    const [tags, setTags] = useState<TagItem[]>(args.value as TagItem[]);
    const handleClearErrors = () => {
      setTags(tags.filter((t) => t.status !== 'error'));
    };
    return (
      <div style={{ width: 480 }}>
        <InputTag
          {...args}
          value={tags}
          onChange={setTags}
          onClearErrors={handleClearErrors}
        />
      </div>
    );
  },
};

// ── Multiple Statuses (error, warning, success, info) ────────

export const MultipleStatuses: Story = {
  args: {
    value: [
      { value: 'delivered-001', status: 'success' },
      { value: 'pending-002', status: 'warning' },
      { value: 'failed-003', status: 'error' },
      { value: 'info-004', status: 'info' },
      { value: 'normal-005', status: 'default' },
    ],
    label: 'Shipment statuses',
    placeholder: 'Enter AWBs',
    tagSize: 'sm',
    tagBordered: true,
  },
  render: (args) => <StatefulInputTag {...args} />,
};

// ── Max Tag Limit ────────────────────────────────────────────

export const MaxTagCount: Story = {
  args: {
    value: [
      { value: 'one' },
      { value: 'two' },
      { value: 'three' },
      { value: 'four' },
      { value: 'five' },
    ],
    maxTagCount: 5,
    label: 'Tags (5/5)',
    placeholder: 'Max 5 tags allowed',
    tagSize: 'sm',
  },
  render: (args) => <StatefulInputTag {...args} />,
};

// ── Disabled ─────────────────────────────────────────────────

export const Disabled: Story = {
  args: {
    value: [
      { value: 'read-only-1' },
      { value: 'read-only-2' },
      { value: 'read-only-3' },
    ],
    disabled: true,
    label: 'Disabled state',
    tagSize: 'sm',
  },
  render: (args) => <StatefulInputTag {...args} />,
};

// ── Custom Separators ────────────────────────────────────────

export const CustomSeparators: Story = {
  args: {
    value: [],
    tokenSeparators: [';'],
    label: 'Semicolon separated',
    placeholder: 'Use semicolons to add tags',
    tagSize: 'sm',
  },
  render: (args) => <StatefulInputTag {...args} />,
};

// ── Backward-Compatible: plain string[] value ────────────────

export const PlainStringValues: Story = {
  args: {
    value: ['hello', 'world', 'orca'],
    label: 'Plain strings (backward-compat)',
    placeholder: 'Enter values...',
    tagSize: 'sm',
  },
  render: (args) => {
    const [tags, setTags] = useState<TagItem[]>(
      (args.value as string[]).map((v) => ({ value: v, status: 'default' as TagStatus }))
    );
    return (
      <div style={{ width: 480 }}>
        <InputTag {...args} value={tags} onChange={setTags} />
      </div>
    );
  },
};

// ── Tag Sizes ────────────────────────────────────────────────

export const TagSizes: Story = {
  render: () => {
    const [smTags, setSmTags] = useState<TagItem[]>([
      { value: 'small-1' },
      { value: 'small-2' },
    ]);
    const [mdTags, setMdTags] = useState<TagItem[]>([
      { value: 'medium-1' },
      { value: 'medium-2' },
    ]);
    const [lgTags, setLgTags] = useState<TagItem[]>([
      { value: 'large-1' },
      { value: 'large-2' },
    ]);
    return (
      <div style={{ width: 480, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <InputTag value={smTags} onChange={setSmTags} tagSize="sm" label="Small tags" placeholder="sm" />
        <InputTag value={mdTags} onChange={setMdTags} tagSize="md" label="Medium tags" placeholder="md" />
        <InputTag value={lgTags} onChange={setLgTags} tagSize="lg" label="Large tags" placeholder="lg" />
      </div>
    );
  },
};
