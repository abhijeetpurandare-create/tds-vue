import type { Meta, StoryObj } from '@storybook/html';
import { page, sectionTitle, gridHeader, gridRow, styles } from './utils/showcase';

const CHIP_TYPES = ['black', 'white', 'coal', 'blue', 'success', 'error', 'warning', 'legacy_blue', 'dlv_red'] as const;
const CHIP_VARIANTS = ['standard', 'outlined'] as const;
const SIZES = ['lg', 'md', 'sm'] as const;
const CHIP_STATES = ['default', 'hover', 'pressed', 'focused', 'disabled', 'ghost'] as const;

function chipCell(chipType: string, variant: string, size: string, state: string): string {
  let attrs = `chip-type="${chipType}" variant="${variant}" size="${size}" text="Chip"`;
  if (state === 'disabled') attrs += ' disabled';
  if (state === 'ghost') attrs += ' is-ghost';
  return `<tarmac-chip ${attrs}></tarmac-chip>`;
}

function typeSection(chipType: string): string {
  const dark = chipType === 'white';
  const wrapStart = dark ? `<div style="${styles.darkBg}">` : '';
  const wrapEnd = dark ? '</div>' : '';

  const cols = CHIP_STATES.length;
  const gridStyle = `${styles.grid}grid-template-columns:130px repeat(${cols}, 1fr);`;

  let rows = gridHeader(CHIP_STATES as unknown as string[]);
  for (const variant of CHIP_VARIANTS) {
    for (const size of SIZES) {
      const label = `${variant} / ${size}`;
      const cells = CHIP_STATES.map(state => chipCell(chipType, variant, size, state));
      rows += gridRow(label, cells, dark);
    }
  }

  return sectionTitle(chipType.charAt(0).toUpperCase() + chipType.slice(1), dark ? 'dark bg' : undefined) +
    wrapStart + `<div style="${gridStyle}">${rows}</div>` + wrapEnd;
}

const meta: Meta = {
  title: 'Tarmac TDS/Chip',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

export const Playground: Story = {
  name: 'Playground',
  parameters: { layout: 'centered' },
  render: () => {
    const el = document.createElement('tarmac-chip');
    el.setAttribute('chip-type', 'black');
    el.setAttribute('variant', 'standard');
    el.setAttribute('size', 'md');
    el.setAttribute('text', 'Chip');
    return el;
  },
};

export const FullMatrix: Story = {
  name: 'Full Matrix',
  render: () => page(
    CHIP_TYPES.map(t => typeSection(t)).join(''),
    '9 Types × 2 Variants × 3 Sizes × 6 States'
  ),
};
