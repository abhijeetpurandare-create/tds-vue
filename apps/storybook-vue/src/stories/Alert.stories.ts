import type { Meta, StoryObj } from '@storybook/html';
import { page, sectionTitle, gridHeader, gridRow, styles, STATES } from './utils/showcase';

const VARIANTS = ['white', 'black', 'coal', 'success', 'error', 'info', 'warning'] as const;
const ALERT_STYLES = ['singleText', 'dualText'] as const;
const SIZES = ['lg', 'sm'] as const;
const ALERT_STATES = ['default', 'disabled', 'ghost'] as const;

function alertCell(variant: string, alertStyle: string, size: string, state: string): string {
  let attrs = `variant="${variant}" size="${size}"`;
  if (alertStyle === 'dualText') attrs += ' title="Alert Title"';
  if (state === 'disabled') attrs += ' disabled';
  if (state === 'ghost') attrs += ' is-ghost';
  const text = alertStyle === 'dualText' ? 'This is a description message.' : 'This is an alert message.';
  return `<tarmac-alert ${attrs}>${text}</tarmac-alert>`;
}

function variantSection(variant: string): string {
  const dark = variant === 'white';
  const wrapStart = dark ? `<div style="${styles.darkBg}">` : '';
  const wrapEnd = dark ? '</div>' : '';

  const cols = ALERT_STATES.length;
  const gridStyle = `${styles.grid}grid-template-columns:140px repeat(${cols}, 1fr);`;

  let rows = gridHeader(ALERT_STATES as unknown as string[]);
  for (const aStyle of ALERT_STYLES) {
    for (const size of SIZES) {
      const label = `${aStyle} / ${size}`;
      const cells = ALERT_STATES.map(state => alertCell(variant, aStyle, size, state));
      rows += gridRow(label, cells, dark);
    }
  }

  return sectionTitle(variant.charAt(0).toUpperCase() + variant.slice(1), dark ? 'dark bg' : undefined) +
    wrapStart + `<div style="${gridStyle}">${rows}</div>` + wrapEnd;
}

const meta: Meta = {
  title: 'Tarmac TDS/Alert',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

export const Playground: Story = {
  name: 'Playground',
  parameters: { layout: 'centered' },
  render: () => {
    const el = document.createElement('tarmac-alert');
    el.setAttribute('variant', 'info');
    el.setAttribute('size', 'lg');
    el.setAttribute('title', 'Alert Title');
    el.textContent = 'This is an alert description message.';
    return el;
  },
};

export const FullMatrix: Story = {
  name: 'Full Matrix',
  render: () => page(
    VARIANTS.map(v => variantSection(v)).join(''),
    '7 Variants × 2 Styles × 2 Sizes × 3 States'
  ),
};
