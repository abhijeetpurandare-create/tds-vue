import type { Meta, StoryObj } from '@storybook/html';
import { page, sectionTitle, gridHeader, gridRow, buttonCell, styles, STATES } from './utils/showcase';

const VARIANTS = ['black', 'white', 'info', 'success', 'error', 'warning', 'dlv_red', 'coal'] as const;
const SIZES = ['lg', 'md', 'sm'] as const;
const STYLES = ['primary', 'secondary', 'tertiary'] as const;
const TYPES = ['button', 'iconButton'] as const;
const SIZE_MAP: Record<string, string> = { lg: 'Large', md: 'Regular', sm: 'Small' };
const STYLE_MAP: Record<string, string> = { primary: 'Primary', secondary: 'Secondary', tertiary: 'Tertiary' };
const TYPE_MAP: Record<string, string> = { button: 'Button', iconButton: 'Icon Btn' };

function variantSection(variant: string): string {
  const dark = variant === 'white';
  const wrapStart = dark ? `<div style="${styles.darkBg}">` : '';
  const wrapEnd = dark ? '</div>' : '';
  const subtitle = dark ? 'dark bg' : undefined;

  const cols = STATES.length;
  const gridStyle = `${styles.grid}grid-template-columns:130px repeat(${cols}, 1fr);`;

  let rows = gridHeader();
  for (const bStyle of STYLES) {
    for (const bType of TYPES) {
      for (const bSize of SIZES) {
        const label = `${STYLE_MAP[bStyle]} / ${TYPE_MAP[bType]} / ${SIZE_MAP[bSize]}`;
        const cells = STATES.map(state => buttonCell({ variant, size: bSize, buttonStyle: bStyle, buttonType: bType, state }));
        rows += gridRow(label, cells, dark);
      }
    }
  }

  return sectionTitle(variant.charAt(0).toUpperCase() + variant.slice(1), subtitle) +
    wrapStart + `<div style="${gridStyle}">${rows}</div>` + wrapEnd;
}

const meta: Meta = {
  title: 'Tarmac TDS/Button',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

export const Playground: Story = {
  name: 'Playground',
  parameters: { layout: 'centered' },
  render: () => {
    const el = document.createElement('tarmac-button');
    el.setAttribute('variant', 'black');
    el.setAttribute('size', 'md');
    el.setAttribute('button-style', 'primary');
    el.setAttribute('text', 'Button');
    el.innerHTML = `<svg slot="leading-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M13 7H11V11H7V13H11V17H13V13H17V11H13V7ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"/></svg>`;
    return el;
  },
};

export const FullMatrix: Story = {
  name: 'Full 648 Matrix',
  render: () => page(
    VARIANTS.map(v => variantSection(v)).join(''),
    '3 Styles × 2 Types × 3 Sizes × 6 States × 8 Variants = 864 buttons'
  ),
};

// Per-variant stories
export const Black: Story = { name: 'Black', render: () => page(variantSection('black')) };
export const White: Story = { name: 'White', render: () => page(variantSection('white')) };
export const Info: Story = { name: 'Info (Blue)', render: () => page(variantSection('info')) };
export const Success: Story = { name: 'Success', render: () => page(variantSection('success')) };
export const Error_: Story = { name: 'Error', render: () => page(variantSection('error')) };
export const Warning: Story = { name: 'Warning', render: () => page(variantSection('warning')) };
export const DLVRed: Story = { name: 'DLV Red', render: () => page(variantSection('dlv_red')) };
export const Coal: Story = { name: 'Coal', render: () => page(variantSection('coal')) };
