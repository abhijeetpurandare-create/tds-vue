import type { Meta, StoryObj } from '@storybook/html';
import { page, sectionTitle, gridHeader, gridRow, styles } from './utils/showcase';

const VARIANTS = ['standard', 'blue', 'green', 'dlv_red'] as const;
const RADIO_STYLES = ['filled', 'outlined'] as const;
const SIZES = ['lg', 'md', 'sm'] as const;
const RADIO_STATES = ['default', 'hover', 'selected', 'disabled'] as const;

function radioCell(variant: string, radioStyle: string, size: string, state: string): string {
  let attrs = `variant="${variant}" radio-style="${radioStyle}" size="${size}"`;
  if (state === 'selected') attrs += ' checked';
  if (state === 'disabled') attrs += ' disabled';
  return `<tarmac-radio ${attrs}></tarmac-radio>`;
}

function variantSection(variant: string): string {
  const cols = RADIO_STATES.length;
  const gridStyle = `${styles.grid}grid-template-columns:130px repeat(${cols}, 1fr);`;

  let rows = gridHeader(RADIO_STATES as unknown as string[]);
  for (const radioStyle of RADIO_STYLES) {
    for (const size of SIZES) {
      const label = `${radioStyle} / ${size}`;
      const cells = RADIO_STATES.map(state => radioCell(variant, radioStyle, size, state));
      rows += gridRow(label, cells);
    }
  }

  return sectionTitle(variant.charAt(0).toUpperCase() + variant.slice(1)) +
    `<div style="${gridStyle}">${rows}</div>`;
}

const meta: Meta = {
  title: 'Tarmac TDS/Radio',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

export const Playground: Story = {
  name: 'Playground',
  parameters: { layout: 'centered' },
  render: () => {
    const el = document.createElement('tarmac-radio');
    el.setAttribute('variant', 'standard');
    el.setAttribute('radio-style', 'filled');
    el.setAttribute('size', 'md');
    return el;
  },
};

export const FullMatrix: Story = {
  name: 'Full Matrix',
  render: () => page(
    VARIANTS.map(v => variantSection(v)).join(''),
    '4 Variants × 2 Styles × 3 Sizes × 4 States'
  ),
};
