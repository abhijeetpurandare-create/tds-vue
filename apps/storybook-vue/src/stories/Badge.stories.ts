import type { Meta, StoryObj } from '@storybook/html';
import { page, sectionTitle, gridHeader, gridRow, styles } from './utils/showcase';

const TYPES = ['solid', 'subtle', 'outlined', 'disabled', 'ghost'] as const;
const VARIANTS = ['black', 'white', 'coal', 'dlv_red', 'info', 'success', 'warning', 'error', 'cardbox'] as const;
const SIZES = ['lg', 'md', 'sm'] as const;

function badgeCell(type: string, variant: string, size: string): string {
  let attrs = `variant="${variant}" size="${size}" badge-type="${type}" text="Badge"`;
  if (type === 'disabled') attrs += ' disabled';
  if (type === 'ghost') attrs += ' is-ghost';
  return `<tarmac-badge ${attrs}></tarmac-badge>`;
}

function variantSection(variant: string): string {
  const dark = variant === 'white';
  const wrapStart = dark ? `<div style="${styles.darkBg}">` : '';
  const wrapEnd = dark ? '</div>' : '';

  const cols = SIZES.length;
  const gridStyle = `${styles.grid}grid-template-columns:120px repeat(${cols}, 1fr);`;

  let rows = gridHeader(SIZES as unknown as string[]);
  for (const type of TYPES) {
    const label = type;
    const cells = SIZES.map(size => badgeCell(type, variant, size));
    rows += gridRow(label, cells, dark);
  }

  return sectionTitle(variant.charAt(0).toUpperCase() + variant.slice(1), dark ? 'dark bg' : undefined) +
    wrapStart + `<div style="${gridStyle}">${rows}</div>` + wrapEnd;
}

const meta: Meta = {
  title: 'Tarmac TDS/Badge',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

export const Playground: Story = {
  name: 'Playground',
  parameters: { layout: 'centered' },
  render: () => {
    const el = document.createElement('tarmac-badge');
    el.setAttribute('variant', 'black');
    el.setAttribute('size', 'md');
    el.setAttribute('badge-type', 'solid');
    el.setAttribute('text', 'Badge');
    return el;
  },
};

export const FullMatrix: Story = {
  name: 'Full Matrix',
  render: () => page(
    VARIANTS.map(v => variantSection(v)).join(''),
    '5 Types × 9 Variants × 3 Sizes'
  ),
};
