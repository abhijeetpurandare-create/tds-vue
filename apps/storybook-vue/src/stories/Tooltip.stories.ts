import type { Meta, StoryObj } from '@storybook/html';
import { page, sectionTitle, gridHeader, gridRow, styles } from './utils/showcase';

const VARIANTS = ['white', 'black', 'coal'] as const;
const TOOLTIP_TYPES = ['standard', 'ctas'] as const;
const TOOLTIP_STYLES = ['singleText', 'dualText'] as const;
const PLACEMENTS = ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'right'] as const;

function tooltipCell(variant: string, tooltipType: string, tooltipStyle: string, placement: string): string {
  let attrs = `variant="${variant}" tooltip-type="${tooltipType}" placement="${placement}"`;
  if (tooltipStyle === 'dualText') attrs += ' title="Tooltip Title"';
  const text = tooltipStyle === 'dualText' ? 'Description text here.' : 'Tooltip message';
  return `<div style="position:relative;display:inline-block;padding:8px;">
    <tarmac-tooltip ${attrs}>${text}</tarmac-tooltip>
  </div>`;
}

function variantSection(variant: string): string {
  const dark = variant === 'white';
  const wrapStart = dark ? `<div style="${styles.darkBg}">` : '';
  const wrapEnd = dark ? '</div>' : '';

  const cols = PLACEMENTS.length;
  const gridStyle = `${styles.grid}grid-template-columns:120px repeat(${cols}, 1fr);`;

  let rows = gridHeader(PLACEMENTS as unknown as string[]);
  for (const tooltipType of TOOLTIP_TYPES) {
    for (const tooltipStyle of TOOLTIP_STYLES) {
      const label = `${tooltipType} / ${tooltipStyle}`;
      const cells = PLACEMENTS.map(placement => tooltipCell(variant, tooltipType, tooltipStyle, placement));
      rows += gridRow(label, cells, dark);
    }
  }

  return sectionTitle(variant.charAt(0).toUpperCase() + variant.slice(1), dark ? 'dark bg' : undefined) +
    wrapStart + `<div style="${gridStyle}">${rows}</div>` + wrapEnd;
}

const meta: Meta = {
  title: 'Tarmac TDS/Tooltip',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

export const Playground: Story = {
  name: 'Playground',
  parameters: { layout: 'centered' },
  render: () => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'padding:60px;';
    const el = document.createElement('tarmac-tooltip');
    el.setAttribute('variant', 'black');
    el.setAttribute('tooltip-type', 'standard');
    el.setAttribute('placement', 'top');
    el.textContent = 'Tooltip message';
    wrapper.appendChild(el);
    return wrapper;
  },
};

export const FullMatrix: Story = {
  name: 'Full Matrix',
  render: () => page(
    VARIANTS.map(v => variantSection(v)).join(''),
    '3 Variants × 2 Types × 2 Styles × 8 Placements'
  ),
};
