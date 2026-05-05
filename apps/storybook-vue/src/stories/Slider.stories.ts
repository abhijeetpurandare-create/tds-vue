import type { Meta, StoryObj } from '@storybook/html';
import { page, sectionTitle, gridHeader, gridRow, styles } from './utils/showcase';

const VARIANTS = ['black', 'coal', 'dlv_red'] as const;
const SIZES = ['sm', 'lg'] as const;
const SLIDER_TYPES = ['single', 'dual'] as const;
const VALUES = [0, 25, 50, 75, 100] as const;

function sliderCell(variant: string, size: string, sliderType: string, value: number): string {
  let attrs = `variant="${variant}" size="${size}" slider-type="${sliderType}" value="${value}"`;
  if (sliderType === 'dual') attrs += ` value-end="${Math.min(value + 25, 100)}"`;
  return `<div style="width:120px;"><tarmac-slider ${attrs}></tarmac-slider></div>`;
}

function variantSection(variant: string): string {
  const cols = VALUES.length;
  const gridStyle = `${styles.grid}grid-template-columns:100px repeat(${cols}, 1fr);`;

  let rows = gridHeader(VALUES.map(v => `${v}%`) as unknown as string[]);
  for (const sliderType of SLIDER_TYPES) {
    for (const size of SIZES) {
      const label = `${sliderType} / ${size}`;
      const cells = VALUES.map(value => sliderCell(variant, size, sliderType, value));
      rows += gridRow(label, cells);
    }
  }

  return sectionTitle(variant.charAt(0).toUpperCase() + variant.slice(1)) +
    `<div style="${gridStyle}">${rows}</div>`;
}

const meta: Meta = {
  title: 'Tarmac TDS/Slider',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

export const Playground: Story = {
  name: 'Playground',
  parameters: { layout: 'centered' },
  render: () => {
    const el = document.createElement('tarmac-slider');
    el.setAttribute('variant', 'black');
    el.setAttribute('size', 'lg');
    el.setAttribute('slider-type', 'single');
    el.setAttribute('value', '50');
    el.style.width = '200px';
    return el;
  },
};

export const FullMatrix: Story = {
  name: 'Full Matrix',
  render: () => page(
    VARIANTS.map(v => variantSection(v)).join(''),
    '3 Variants × 2 Sizes × 2 Types × 5 Values'
  ),
};
