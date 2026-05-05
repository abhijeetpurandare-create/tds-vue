import type { Meta, StoryObj } from '@storybook/html';
import { page, sectionTitle, gridHeader, gridRow, styles } from './utils/showcase';

const VARIANTS = ['black', 'white', 'info', 'success', 'error', 'warning'] as const;
const SNACK_STYLES = ['singleText', 'dualText'] as const;
const SIZES = ['lg', 'sm'] as const;

function snackbarCell(variant: string, snackStyle: string, size: string): string {
  let attrs = `variant="${variant}" size="${size}"`;
  if (snackStyle === 'dualText') attrs += ' title="Snackbar Title"';
  const text = snackStyle === 'dualText' ? 'Description message here.' : 'This is a snackbar message.';
  return `<tarmac-snackbar ${attrs}>${text}</tarmac-snackbar>`;
}

function variantSection(variant: string): string {
  const dark = variant === 'white';
  const wrapStart = dark ? `<div style="${styles.darkBg}">` : '';
  const wrapEnd = dark ? '</div>' : '';

  const cols = SIZES.length;
  const gridStyle = `${styles.grid}grid-template-columns:100px repeat(${cols}, 1fr);`;

  let rows = gridHeader(SIZES as unknown as string[]);
  for (const snackStyle of SNACK_STYLES) {
    const label = snackStyle;
    const cells = SIZES.map(size => snackbarCell(variant, snackStyle, size));
    rows += gridRow(label, cells, dark);
  }

  return sectionTitle(variant.charAt(0).toUpperCase() + variant.slice(1), dark ? 'dark bg' : undefined) +
    wrapStart + `<div style="${gridStyle}">${rows}</div>` + wrapEnd;
}

const meta: Meta = {
  title: 'Tarmac TDS/Snackbar',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

export const Playground: Story = {
  name: 'Playground',
  parameters: { layout: 'centered' },
  render: () => {
    const el = document.createElement('tarmac-snackbar');
    el.setAttribute('variant', 'info');
    el.setAttribute('size', 'lg');
    el.setAttribute('title', 'Snackbar Title');
    el.textContent = 'This is a snackbar description.';
    return el;
  },
};

export const FullMatrix: Story = {
  name: 'Full Matrix',
  render: () => page(
    VARIANTS.map(v => variantSection(v)).join(''),
    '6 Variants × 2 Styles × 2 Sizes'
  ),
};
