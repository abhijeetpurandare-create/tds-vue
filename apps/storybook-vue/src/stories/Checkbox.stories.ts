import type { Meta, StoryObj } from '@storybook/html';
import { page, sectionTitle, gridHeader, gridRow, styles } from './utils/showcase';

const VARIANTS = ['standard', 'blue', 'green', 'dlv_red'] as const;
const CHECK_STYLES = ['box', 'rounded'] as const;
const SIZES = ['lg', 'md', 'sm'] as const;
const CHECK_STATES = ['default', 'hover', 'checked', 'partial', 'disabled'] as const;

function checkboxCell(variant: string, checkStyle: string, size: string, state: string): string {
  let attrs = `variant="${variant}" checkbox-style="${checkStyle}" size="${size}"`;
  if (state === 'checked') attrs += ' checked';
  if (state === 'partial') attrs += ' indeterminate';
  if (state === 'disabled') attrs += ' disabled';
  return `<tarmac-checkbox ${attrs}></tarmac-checkbox>`;
}

function variantSection(variant: string): string {
  const cols = CHECK_STATES.length;
  const gridStyle = `${styles.grid}grid-template-columns:130px repeat(${cols}, 1fr);`;

  let rows = gridHeader(CHECK_STATES as unknown as string[]);
  for (const checkStyle of CHECK_STYLES) {
    for (const size of SIZES) {
      const label = `${checkStyle} / ${size}`;
      const cells = CHECK_STATES.map(state => checkboxCell(variant, checkStyle, size, state));
      rows += gridRow(label, cells);
    }
  }

  return sectionTitle(variant.charAt(0).toUpperCase() + variant.slice(1)) +
    `<div style="${gridStyle}">${rows}</div>`;
}

const meta: Meta = {
  title: 'Tarmac TDS/Checkbox',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

export const Playground: Story = {
  name: 'Playground',
  parameters: { layout: 'centered' },
  render: () => {
    const el = document.createElement('tarmac-checkbox');
    el.setAttribute('variant', 'standard');
    el.setAttribute('size', 'md');
    el.setAttribute('checkbox-style', 'box');
    return el;
  },
};

export const FullMatrix: Story = {
  name: 'Full Matrix',
  render: () => page(
    VARIANTS.map(v => variantSection(v)).join(''),
    '4 Variants × 2 Styles × 3 Sizes × 5 States'
  ),
};
