import type { Meta, StoryObj } from '@storybook/html';
import { page, sectionTitle, gridHeader, gridRow, styles } from './utils/showcase';

const TYPES = ['line', 'dash'] as const;
const THICKNESSES = ['0.5', '1', '1.5'] as const;
const ORIENTATIONS = ['horizontal', 'vertical'] as const;

function dividerCell(type: string, thickness: string, orientation: string): string {
  const attrs = `divider-type="${type}" thickness="${thickness}" orientation="${orientation}"`;
  const containerStyle = orientation === 'vertical'
    ? 'height:40px;display:flex;align-items:center;justify-content:center;'
    : 'width:120px;';
  return `<div style="${containerStyle}"><tarmac-divider ${attrs}></tarmac-divider></div>`;
}

function orientationSection(orientation: string): string {
  const cols = THICKNESSES.length;
  const gridStyle = `${styles.grid}grid-template-columns:100px repeat(${cols}, 1fr);`;

  let rows = gridHeader(THICKNESSES.map(t => `${t}px`) as unknown as string[]);
  for (const type of TYPES) {
    const label = type;
    const cells = THICKNESSES.map(thickness => dividerCell(type, thickness, orientation));
    rows += gridRow(label, cells);
  }

  return sectionTitle(orientation.charAt(0).toUpperCase() + orientation.slice(1)) +
    `<div style="${gridStyle}">${rows}</div>`;
}

const meta: Meta = {
  title: 'Tarmac TDS/Divider',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

export const Playground: Story = {
  name: 'Playground',
  parameters: { layout: 'centered' },
  render: () => {
    const el = document.createElement('tarmac-divider');
    el.setAttribute('divider-type', 'line');
    el.setAttribute('thickness', '1');
    el.setAttribute('orientation', 'horizontal');
    el.style.width = '200px';
    return el;
  },
};

export const FullMatrix: Story = {
  name: 'Full Matrix',
  render: () => page(
    ORIENTATIONS.map(o => orientationSection(o)).join(''),
    '2 Types × 3 Thicknesses × 2 Orientations'
  ),
};
