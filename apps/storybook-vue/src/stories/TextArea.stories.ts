import type { Meta, StoryObj } from '@storybook/html';
import { page, sectionTitle, gridHeader, gridRow, styles } from './utils/showcase';

const TEXTAREA_TYPES = ['regular', 'success', 'infoBlue', 'error'] as const;
const SIZES = ['lg', 'md', 'sm'] as const;
const TEXTAREA_STATES = ['default', 'hover', 'focused', 'disabled', 'ghost'] as const;

function textareaCell(textareaType: string, size: string, state: string): string {
  let attrs = `textarea-type="${textareaType}" size="${size}" placeholder="Enter text..."`;
  if (state === 'disabled') attrs += ' disabled';
  if (state === 'ghost') attrs += ' is-ghost';
  return `<tarmac-textarea ${attrs}></tarmac-textarea>`;
}

function typeSection(textareaType: string): string {
  const cols = TEXTAREA_STATES.length;
  const gridStyle = `${styles.grid}grid-template-columns:100px repeat(${cols}, 1fr);`;

  let rows = gridHeader(TEXTAREA_STATES as unknown as string[]);
  for (const size of SIZES) {
    const label = size;
    const cells = TEXTAREA_STATES.map(state => textareaCell(textareaType, size, state));
    rows += gridRow(label, cells);
  }

  return sectionTitle(textareaType.charAt(0).toUpperCase() + textareaType.slice(1)) +
    `<div style="${gridStyle}">${rows}</div>`;
}

const meta: Meta = {
  title: 'Tarmac TDS/TextArea',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

export const Playground: Story = {
  name: 'Playground',
  parameters: { layout: 'centered' },
  render: () => {
    const el = document.createElement('tarmac-textarea');
    el.setAttribute('textarea-type', 'regular');
    el.setAttribute('size', 'md');
    el.setAttribute('placeholder', 'Enter text...');
    return el;
  },
};

export const FullMatrix: Story = {
  name: 'Full Matrix',
  render: () => page(
    TEXTAREA_TYPES.map(t => typeSection(t)).join(''),
    '4 Types × 3 Sizes × 5 States'
  ),
};
