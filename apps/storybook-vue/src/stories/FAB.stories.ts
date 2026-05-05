import type { Meta, StoryObj } from '@storybook/html';
import { page, sectionTitle, gridHeader, gridRow, styles, ICON_SVG } from './utils/showcase';

const VARIANTS = ['light', 'dark', 'info-blue'] as const;
const POSITIONS = ['bottom-right', 'bottom-left', 'top-right', 'top-left'] as const;

function fabCell(variant: string, position: string): string {
  const attrs = `variant="${variant}" position="${position}"`;
  return `<div style="position:relative;width:60px;height:60px;border:1px dashed #e5e7eb;border-radius:4px;">
    <tarmac-fab ${attrs}>${ICON_SVG}</tarmac-fab>
  </div>`;
}

const meta: Meta = {
  title: 'Tarmac TDS/FAB',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

export const Playground: Story = {
  name: 'Playground',
  parameters: { layout: 'centered' },
  render: () => {
    const el = document.createElement('tarmac-fab');
    el.setAttribute('variant', 'dark');
    el.setAttribute('position', 'bottom-right');
    el.innerHTML = ICON_SVG;
    return el;
  },
};

export const FullMatrix: Story = {
  name: 'Full Matrix',
  render: () => {
    const cols = POSITIONS.length;
    const gridStyle = `${styles.grid}grid-template-columns:100px repeat(${cols}, 1fr);`;

    let rows = gridHeader(POSITIONS as unknown as string[]);
    for (const variant of VARIANTS) {
      const cells = POSITIONS.map(pos => fabCell(variant, pos));
      rows += gridRow(variant, cells);
    }

    return page(
      sectionTitle('FAB Variants × Positions') +
      `<div style="${gridStyle}">${rows}</div>`,
      '3 Variants × 4 Positions'
    );
  },
};
