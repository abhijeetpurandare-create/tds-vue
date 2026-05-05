import type { Meta, StoryObj } from '@storybook/html';
import { page, sectionTitle, gridHeader, gridRow, styles } from './utils/showcase';

const VARIANTS = ['tarmac-01', 'tarmac-02', 'tarmac-03', 'tarmac-04'] as const;
const SPINNER_SIZES = ['16', '20', '24', '28', '32', '36', '40', '44'] as const;

function spinnerCell(variant: string, size: string): string {
  const attrs = `variant="${variant}" size="${size}"`;
  return `<tarmac-spinner ${attrs}></tarmac-spinner>`;
}

const meta: Meta = {
  title: 'Tarmac TDS/Spinner',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

export const Playground: Story = {
  name: 'Playground',
  parameters: { layout: 'centered' },
  render: () => {
    const el = document.createElement('tarmac-spinner');
    el.setAttribute('variant', 'tarmac-01');
    el.setAttribute('size', '32');
    return el;
  },
};

export const FullMatrix: Story = {
  name: 'Full Matrix',
  render: () => {
    const cols = SPINNER_SIZES.length;
    const gridStyle = `${styles.grid}grid-template-columns:100px repeat(${cols}, 1fr);`;

    let rows = gridHeader(SPINNER_SIZES.map(s => `${s}px`) as unknown as string[]);
    for (const variant of VARIANTS) {
      const cells = SPINNER_SIZES.map(size => spinnerCell(variant, size));
      rows += gridRow(variant, cells);
    }

    return page(
      sectionTitle('Spinner Variants × Sizes') + `<div style="${gridStyle}">${rows}</div>`,
      '4 Variants × 8 Sizes'
    );
  },
};
