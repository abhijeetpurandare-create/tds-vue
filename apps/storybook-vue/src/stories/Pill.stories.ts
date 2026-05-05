import type { Meta, StoryObj } from '@storybook/html';
import { page, sectionTitle, gridHeader, gridRow, styles } from './utils/showcase';

const PILL_TYPES = ['solid', 'subtle', 'outlined', 'disabled', 'ghost'] as const;
const VARIANTS = ['black', 'white', 'coal', 'blue', 'success', 'error', 'warning', 'legacy_blue'] as const;
const SIZES = ['lg', 'md', 'sm'] as const;

function pillCell(pillType: string, variant: string, size: string): string {
  let attrs = `pill-type="${pillType}" variant="${variant}" size="${size}" text="Pill"`;
  if (pillType === 'disabled') attrs += ' disabled';
  if (pillType === 'ghost') attrs += ' is-ghost';
  return `<tarmac-pill ${attrs}></tarmac-pill>`;
}

function variantSection(variant: string): string {
  const dark = variant === 'white';
  const wrapStart = dark ? `<div style="${styles.darkBg}">` : '';
  const wrapEnd = dark ? '</div>' : '';

  const cols = SIZES.length;
  const gridStyle = `${styles.grid}grid-template-columns:100px repeat(${cols}, 1fr);`;

  let rows = gridHeader(SIZES as unknown as string[]);
  for (const pillType of PILL_TYPES) {
    const label = pillType;
    const cells = SIZES.map(size => pillCell(pillType, variant, size));
    rows += gridRow(label, cells, dark);
  }

  return sectionTitle(variant.charAt(0).toUpperCase() + variant.slice(1), dark ? 'dark bg' : undefined) +
    wrapStart + `<div style="${gridStyle}">${rows}</div>` + wrapEnd;
}

const meta: Meta = {
  title: 'Tarmac TDS/Pill',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

export const Playground: Story = {
  name: 'Playground',
  parameters: { layout: 'centered' },
  render: () => {
    const el = document.createElement('tarmac-pill');
    el.setAttribute('pill-type', 'solid');
    el.setAttribute('variant', 'black');
    el.setAttribute('size', 'md');
    el.setAttribute('text', 'Pill');
    return el;
  },
};

export const FullMatrix: Story = {
  name: 'Full Matrix',
  render: () => page(
    VARIANTS.map(v => variantSection(v)).join(''),
    '5 Types × 8 Variants × 3 Sizes'
  ),
};
