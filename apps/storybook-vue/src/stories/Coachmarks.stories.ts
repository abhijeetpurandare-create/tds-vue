import type { Meta, StoryObj } from '@storybook/html';
import { page, sectionTitle, gridHeader, gridRow, styles } from './utils/showcase';

const VARIANTS = ['white', 'black'] as const;
const SIZES = ['sm', 'lg'] as const;
const POSITIONS = ['top-start', 'top-center', 'top-end', 'bottom-start', 'bottom-center', 'bottom-end', 'left-center', 'right-center'] as const;

function coachmarkCell(variant: string, size: string, position: string): string {
  const dark = variant === 'black';
  const attrs = `variant="${variant}" size="${size}" arrow-position="${position}"`;
  const text = size === 'lg' ? 'This is a coachmark with a longer description text.' : 'Coachmark';
  return `<tarmac-coachmark ${attrs}>${text}</tarmac-coachmark>`;
}

function variantSection(variant: string): string {
  const dark = variant === 'black';
  const wrapStart = dark ? `<div style="${styles.darkBg}">` : '';
  const wrapEnd = dark ? '</div>' : '';

  const cols = POSITIONS.length;
  const gridStyle = `${styles.grid}grid-template-columns:80px repeat(${cols}, 1fr);`;

  let rows = gridHeader(POSITIONS as unknown as string[]);
  for (const size of SIZES) {
    const label = size;
    const cells = POSITIONS.map(pos => coachmarkCell(variant, size, pos));
    rows += gridRow(label, cells, dark);
  }

  return sectionTitle(variant.charAt(0).toUpperCase() + variant.slice(1), dark ? 'dark bg' : undefined) +
    wrapStart + `<div style="${gridStyle}">${rows}</div>` + wrapEnd;
}

const meta: Meta = {
  title: 'Tarmac TDS/Coachmarks',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

export const Playground: Story = {
  name: 'Playground',
  parameters: { layout: 'centered' },
  render: () => {
    const el = document.createElement('tarmac-coachmark');
    el.setAttribute('variant', 'white');
    el.setAttribute('size', 'lg');
    el.setAttribute('arrow-position', 'bottom-center');
    el.textContent = 'This is a coachmark tooltip message.';
    return el;
  },
};

export const FullMatrix: Story = {
  name: 'Full Matrix',
  render: () => page(
    VARIANTS.map(v => variantSection(v)).join(''),
    '2 Variants × 2 Sizes × 8 Arrow Positions'
  ),
};
