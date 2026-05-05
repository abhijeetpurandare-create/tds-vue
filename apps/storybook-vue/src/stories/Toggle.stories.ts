import type { Meta, StoryObj } from '@storybook/html';
import { page, sectionTitle, gridHeader, gridRow, styles } from './utils/showcase';

const COLORS = ['black', 'blue', 'dlv_red', 'green'] as const;
const TOGGLE_STYLES = ['filled', 'outlined'] as const;
const SIZES = ['lg', 'sm'] as const;
const TOGGLE_STATES = ['default', 'hover', 'pressed', 'focused', 'disabled', 'ghost'] as const;

function toggleCell(color: string, toggleStyle: string, size: string, state: string): string {
  let attrs = `color="${color}" toggle-style="${toggleStyle}" size="${size}"`;
  if (state === 'disabled') attrs += ' disabled';
  if (state === 'ghost') attrs += ' is-ghost';
  return `<tarmac-toggle ${attrs}></tarmac-toggle>`;
}

function colorSection(color: string): string {
  const cols = TOGGLE_STATES.length;
  const gridStyle = `${styles.grid}grid-template-columns:120px repeat(${cols}, 1fr);`;

  let rows = gridHeader(TOGGLE_STATES as unknown as string[]);
  for (const toggleStyle of TOGGLE_STYLES) {
    for (const size of SIZES) {
      const label = `${toggleStyle} / ${size}`;
      const cells = TOGGLE_STATES.map(state => toggleCell(color, toggleStyle, size, state));
      rows += gridRow(label, cells);
    }
  }

  return sectionTitle(color.charAt(0).toUpperCase() + color.slice(1)) +
    `<div style="${gridStyle}">${rows}</div>`;
}

const meta: Meta = {
  title: 'Tarmac TDS/Toggle',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

export const Playground: Story = {
  name: 'Playground',
  parameters: { layout: 'centered' },
  render: () => {
    const el = document.createElement('tarmac-toggle');
    el.setAttribute('color', 'blue');
    el.setAttribute('toggle-style', 'filled');
    el.setAttribute('size', 'lg');
    return el;
  },
};

export const FullMatrix: Story = {
  name: 'Full Matrix',
  render: () => page(
    COLORS.map(c => colorSection(c)).join(''),
    '4 Colors × 2 Styles × 2 Sizes × 6 States'
  ),
};
