import type { Meta, StoryObj } from '@storybook/html';
import { page, sectionTitle, gridHeader, gridRow, styles } from './utils/showcase';

const SIZES = ['lg', 'md', 'sm'] as const;
const VALUES = [0, 1, 2, 3, 4, 5] as const;

function ratingCell(size: string, value: number, readOnly: boolean, half: boolean): string {
  let attrs = `size="${size}" value="${half ? value + 0.5 : value}"`;
  if (readOnly) attrs += ' readonly';
  return `<tarmac-rating ${attrs}></tarmac-rating>`;
}

const meta: Meta = {
  title: 'Tarmac TDS/Rating',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

export const Playground: Story = {
  name: 'Playground',
  parameters: { layout: 'centered' },
  render: () => {
    const el = document.createElement('tarmac-rating');
    el.setAttribute('size', 'lg');
    el.setAttribute('value', '3');
    return el;
  },
};

export const FullMatrix: Story = {
  name: 'Full Matrix',
  render: () => {
    const cols = VALUES.length;
    const gridStyle = `${styles.grid}grid-template-columns:120px repeat(${cols}, 1fr);`;

    // Interactive
    let interactiveRows = gridHeader(VALUES.map(v => `${v}★`) as unknown as string[]);
    for (const size of SIZES) {
      const cells = VALUES.map(value => ratingCell(size, value, false, false));
      interactiveRows += gridRow(`${size}`, cells);
    }

    // Read-only
    let readonlyRows = gridHeader(VALUES.map(v => `${v}★`) as unknown as string[]);
    for (const size of SIZES) {
      const cells = VALUES.map(value => ratingCell(size, value, true, false));
      readonlyRows += gridRow(`${size}`, cells);
    }

    // Half stars
    let halfRows = gridHeader(VALUES.map(v => `${v}.5★`) as unknown as string[]);
    for (const size of SIZES) {
      const cells = VALUES.map(value => ratingCell(size, value, true, true));
      halfRows += gridRow(`${size}`, cells);
    }

    return page(
      sectionTitle('Interactive') + `<div style="${gridStyle}">${interactiveRows}</div>` +
      sectionTitle('Read-only') + `<div style="${gridStyle}">${readonlyRows}</div>` +
      sectionTitle('Half Stars (Read-only)') + `<div style="${gridStyle}">${halfRows}</div>`,
      '3 Sizes × 6 Values × Interactive/ReadOnly/Half'
    );
  },
};
