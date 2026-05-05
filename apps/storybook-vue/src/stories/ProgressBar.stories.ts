import type { Meta, StoryObj } from '@storybook/html';
import { page, sectionTitle, gridHeader, gridRow, styles } from './utils/showcase';

const VARIANTS = ['black', 'coal', 'blue', 'green', 'dlv_red'] as const;
const SIZES = ['sm', 'lg'] as const;
const VALUES = [0, 25, 50, 75, 100] as const;

function progressCell(variant: string, size: string, value: number): string {
  const attrs = `variant="${variant}" size="${size}" value="${value}"`;
  return `<div style="width:120px;"><tarmac-progress-bar ${attrs}></tarmac-progress-bar></div>`;
}

function variantSection(variant: string): string {
  const cols = VALUES.length;
  const gridStyle = `${styles.grid}grid-template-columns:80px repeat(${cols}, 1fr);`;

  let rows = gridHeader(VALUES.map(v => `${v}%`) as unknown as string[]);
  for (const size of SIZES) {
    const label = size;
    const cells = VALUES.map(value => progressCell(variant, size, value));
    rows += gridRow(label, cells);
  }

  return sectionTitle(variant.charAt(0).toUpperCase() + variant.slice(1)) +
    `<div style="${gridStyle}">${rows}</div>`;
}

const meta: Meta = {
  title: 'Tarmac TDS/ProgressBar',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

export const Playground: Story = {
  name: 'Playground',
  parameters: { layout: 'centered' },
  render: () => {
    const el = document.createElement('tarmac-progress-bar');
    el.setAttribute('variant', 'blue');
    el.setAttribute('size', 'lg');
    el.setAttribute('value', '50');
    el.style.width = '200px';
    return el;
  },
};

export const FullMatrix: Story = {
  name: 'Full Matrix',
  render: () => page(
    VARIANTS.map(v => variantSection(v)).join(''),
    '5 Variants × 2 Sizes × 5 Values'
  ),
};
