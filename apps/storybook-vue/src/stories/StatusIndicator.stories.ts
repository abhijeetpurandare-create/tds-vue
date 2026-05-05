import type { Meta, StoryObj } from '@storybook/html';
import { page, sectionTitle, gridHeader, gridRow, styles } from './utils/showcase';

const VARIANTS = ['success', 'failed', 'warning', 'information', 'synced', 'scheduled', 'unknown', 'pause', 'play', 'downloading', 'pending'] as const;
const SIZES = ['lg', 'md', 'sm', 'xs'] as const;

function statusCell(variant: string, size: string): string {
  const attrs = `variant="${variant}" size="${size}"`;
  return `<tarmac-status-indicator ${attrs}></tarmac-status-indicator>`;
}

const meta: Meta = {
  title: 'Tarmac TDS/StatusIndicator',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

export const Playground: Story = {
  name: 'Playground',
  parameters: { layout: 'centered' },
  render: () => {
    const el = document.createElement('tarmac-status-indicator');
    el.setAttribute('variant', 'success');
    el.setAttribute('size', 'md');
    return el;
  },
};

export const FullMatrix: Story = {
  name: 'Full Matrix',
  render: () => {
    const cols = SIZES.length;
    const gridStyle = `${styles.grid}grid-template-columns:120px repeat(${cols}, 1fr);`;

    let rows = gridHeader(SIZES as unknown as string[]);
    for (const variant of VARIANTS) {
      const cells = SIZES.map(size => statusCell(variant, size));
      rows += gridRow(variant, cells);
    }

    return page(
      sectionTitle('Status Indicator Variants × Sizes') + `<div style="${gridStyle}">${rows}</div>`,
      '11 Variants × 4 Sizes'
    );
  },
};
