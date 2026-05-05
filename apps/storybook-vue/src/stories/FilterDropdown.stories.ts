import type { Meta, StoryObj } from '@storybook/html';
import { page, sectionTitle, styles } from './utils/showcase';

const SIZES = ['sm', 'lg'] as const;

const meta: Meta = {
  title: 'Tarmac TDS/FilterDropdown',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

export const Playground: Story = {
  name: 'Playground',
  parameters: { layout: 'centered' },
  render: () => {
    const el = document.createElement('tarmac-filter-dropdown');
    el.setAttribute('size', 'lg');
    el.setAttribute('placeholder', 'Select filter');
    el.innerHTML = `
      <tarmac-filter-option value="opt1">Option 1</tarmac-filter-option>
      <tarmac-filter-option value="opt2">Option 2</tarmac-filter-option>
      <tarmac-filter-option value="opt3">Option 3</tarmac-filter-option>
    `;
    return el;
  },
};

export const Showcase: Story = {
  name: 'Showcase',
  render: () => {
    let content = '';
    for (const size of SIZES) {
      content += `
        <div style="margin:16px 0;">
          <p style="font-size:11px;color:#9ca3af;margin-bottom:8px;">Size: ${size}</p>
          <tarmac-filter-dropdown size="${size}" placeholder="Select filter">
            <tarmac-filter-option value="opt1">Option 1</tarmac-filter-option>
            <tarmac-filter-option value="opt2">Option 2</tarmac-filter-option>
            <tarmac-filter-option value="opt3">Option 3</tarmac-filter-option>
          </tarmac-filter-dropdown>
        </div>
      `;
    }

    return page(
      sectionTitle('Filter Dropdown Sizes') + content,
      '2 Sizes with sample options'
    );
  },
};
