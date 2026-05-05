import type { Meta, StoryObj } from '@storybook/html';
import { page, sectionTitle, gridHeader, gridRow, styles } from './utils/showcase';

const INPUT_TYPES = ['regular', 'success', 'infoBlue', 'error'] as const;
const SIZES = ['lg', 'md', 'sm'] as const;
const STYLE_VARIANTS = ['standard', 'addonLeft', 'addonRight'] as const;
const INPUT_STATES = ['default', 'hover', 'focused', 'disabled', 'ghost'] as const;

function inputCell(inputType: string, size: string, styleVariant: string, state: string): string {
  let attrs = `input-type="${inputType}" size="${size}" style-variant="${styleVariant}" placeholder="Enter text"`;
  if (state === 'disabled') attrs += ' disabled';
  if (state === 'ghost') attrs += ' is-ghost';
  if (state === 'focused') attrs += ' autofocus';
  return `<tarmac-input ${attrs}></tarmac-input>`;
}

function typeSection(inputType: string): string {
  const cols = INPUT_STATES.length;
  const gridStyle = `${styles.grid}grid-template-columns:140px repeat(${cols}, 1fr);`;

  let rows = gridHeader(INPUT_STATES as unknown as string[]);
  for (const styleVariant of STYLE_VARIANTS) {
    for (const size of SIZES) {
      const label = `${styleVariant} / ${size}`;
      const cells = INPUT_STATES.map(state => inputCell(inputType, size, styleVariant, state));
      rows += gridRow(label, cells);
    }
  }

  return sectionTitle(inputType.charAt(0).toUpperCase() + inputType.slice(1)) +
    `<div style="${gridStyle}">${rows}</div>`;
}

const meta: Meta = {
  title: 'Tarmac TDS/InputField',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

export const Playground: Story = {
  name: 'Playground',
  parameters: { layout: 'centered' },
  render: () => {
    const el = document.createElement('tarmac-input');
    el.setAttribute('input-type', 'regular');
    el.setAttribute('size', 'md');
    el.setAttribute('style-variant', 'standard');
    el.setAttribute('placeholder', 'Enter text');
    return el;
  },
};

export const FullMatrix: Story = {
  name: 'Full Matrix',
  render: () => page(
    INPUT_TYPES.map(t => typeSection(t)).join(''),
    '4 Types × 3 Sizes × 3 Style Variants × 5 States'
  ),
};
