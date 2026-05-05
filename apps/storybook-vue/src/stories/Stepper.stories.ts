import type { Meta, StoryObj } from '@storybook/html';
import { page, sectionTitle, gridHeader, gridRow, styles } from './utils/showcase';

const STEPPER_STYLES = ['black', 'coal', 'dlv_red', 'blue', 'green', 'numeric', 'icon'] as const;
const STEPPER_VARIANTS = ['solid', 'outlined', 'focused', 'disabled', 'ghost'] as const;
const SIZES = ['sm', 'md', 'lg'] as const;

function stepperCell(stepperStyle: string, variant: string, size: string): string {
  let attrs = `stepper-style="${stepperStyle}" variant="${variant}" size="${size}"`;
  if (variant === 'disabled') attrs += ' disabled';
  if (variant === 'ghost') attrs += ' is-ghost';
  return `<tarmac-stepper ${attrs}>
    <tarmac-step label="Step 1" status="completed"></tarmac-step>
    <tarmac-step label="Step 2" status="active"></tarmac-step>
    <tarmac-step label="Step 3" status="pending"></tarmac-step>
  </tarmac-stepper>`;
}

function styleSection(stepperStyle: string): string {
  const cols = SIZES.length;
  const gridStyle = `${styles.grid}grid-template-columns:100px repeat(${cols}, 1fr);`;

  let rows = gridHeader(SIZES as unknown as string[]);
  for (const variant of STEPPER_VARIANTS) {
    const label = variant;
    const cells = SIZES.map(size => stepperCell(stepperStyle, variant, size));
    rows += gridRow(label, cells);
  }

  return sectionTitle(stepperStyle.charAt(0).toUpperCase() + stepperStyle.slice(1)) +
    `<div style="${gridStyle}">${rows}</div>`;
}

const meta: Meta = {
  title: 'Tarmac TDS/Stepper',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

export const Playground: Story = {
  name: 'Playground',
  parameters: { layout: 'centered' },
  render: () => {
    const el = document.createElement('tarmac-stepper');
    el.setAttribute('stepper-style', 'black');
    el.setAttribute('variant', 'solid');
    el.setAttribute('size', 'md');
    el.innerHTML = `
      <tarmac-step label="Step 1" status="completed"></tarmac-step>
      <tarmac-step label="Step 2" status="active"></tarmac-step>
      <tarmac-step label="Step 3" status="pending"></tarmac-step>
    `;
    return el;
  },
};

export const FullMatrix: Story = {
  name: 'Full Matrix',
  render: () => page(
    STEPPER_STYLES.map(s => styleSection(s)).join(''),
    '7 Styles × 5 Variants × 3 Sizes'
  ),
};
