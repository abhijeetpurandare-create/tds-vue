import type { Meta, StoryObj } from '@storybook/html';
import { page, sectionTitle, gridHeader, gridRow, styles } from './utils/showcase';

const DIVIDERS = ['slash', 'chevron'] as const;
const SIZES = ['lg', 'sm'] as const;
const CELL_STYLES = ['black', 'blue', 'dlvRed'] as const;
const BREADCRUMB_STATES = ['default', 'disabled', 'ghost', 'current'] as const;

function breadcrumbCell(divider: string, size: string, cellStyle: string, state: string): string {
  let attrs = `divider="${divider}" size="${size}" cell-style="${cellStyle}"`;
  if (state === 'disabled') attrs += ' disabled';
  if (state === 'ghost') attrs += ' is-ghost';
  if (state === 'current') attrs += ' is-current';
  return `<tarmac-breadcrumbs ${attrs}>
    <tarmac-breadcrumb-item>Home</tarmac-breadcrumb-item>
    <tarmac-breadcrumb-item>Products</tarmac-breadcrumb-item>
    <tarmac-breadcrumb-item>Detail</tarmac-breadcrumb-item>
  </tarmac-breadcrumbs>`;
}

function styleSection(cellStyle: string): string {
  const cols = BREADCRUMB_STATES.length;
  const gridStyle = `${styles.grid}grid-template-columns:120px repeat(${cols}, 1fr);`;

  let rows = gridHeader(BREADCRUMB_STATES as unknown as string[]);
  for (const divider of DIVIDERS) {
    for (const size of SIZES) {
      const label = `${divider} / ${size}`;
      const cells = BREADCRUMB_STATES.map(state => breadcrumbCell(divider, size, cellStyle, state));
      rows += gridRow(label, cells);
    }
  }

  return sectionTitle(cellStyle.charAt(0).toUpperCase() + cellStyle.slice(1)) +
    `<div style="${gridStyle}">${rows}</div>`;
}

const meta: Meta = {
  title: 'Tarmac TDS/Breadcrumbs',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

export const Playground: Story = {
  name: 'Playground',
  parameters: { layout: 'centered' },
  render: () => {
    const el = document.createElement('tarmac-breadcrumbs');
    el.setAttribute('divider', 'slash');
    el.setAttribute('size', 'lg');
    el.setAttribute('cell-style', 'black');
    el.innerHTML = `
      <tarmac-breadcrumb-item>Home</tarmac-breadcrumb-item>
      <tarmac-breadcrumb-item>Products</tarmac-breadcrumb-item>
      <tarmac-breadcrumb-item>Detail</tarmac-breadcrumb-item>
    `;
    return el;
  },
};

export const FullMatrix: Story = {
  name: 'Full Matrix',
  render: () => page(
    CELL_STYLES.map(s => styleSection(s)).join(''),
    '2 Dividers × 2 Sizes × 3 Cell Styles × 4 States'
  ),
};
