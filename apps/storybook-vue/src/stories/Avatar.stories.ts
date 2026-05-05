import type { Meta, StoryObj } from '@storybook/html';
import { page, sectionTitle, gridHeader, gridRow, styles, ICON_SVG } from './utils/showcase';

const TYPES = ['initials', 'image', 'numeric', 'icon'] as const;
const SIZES = ['xl', 'lg', 'md', 'sm'] as const;
const SHAPES = ['round', 'square'] as const;
const AVATAR_STATES = ['default', 'hover', 'focused', 'disabled', 'ghost'] as const;
const STATUS_DOTS = ['active', 'inactive', 'idle', 'brand'] as const;

function avatarCell(type: string, size: string, shape: string, state: string): string {
  let attrs = `size="${size}" shape="${shape}"`;
  if (state === 'disabled') attrs += ' disabled';
  if (state === 'ghost') attrs += ' is-ghost';

  let content = '';
  if (type === 'initials') { attrs += ' initials="AB"'; }
  else if (type === 'image') { attrs += ' src="https://i.pravatar.cc/150?img=3"'; }
  else if (type === 'numeric') { attrs += ' text="+5"'; }
  else if (type === 'icon') { content = ICON_SVG; }

  return `<tarmac-avatar ${attrs}>${content}</tarmac-avatar>`;
}

function typeSection(type: string): string {
  const cols = AVATAR_STATES.length;
  const gridStyle = `${styles.grid}grid-template-columns:120px repeat(${cols}, 1fr);`;

  let rows = gridHeader(AVATAR_STATES as unknown as string[]);
  for (const shape of SHAPES) {
    for (const size of SIZES) {
      const label = `${shape} / ${size}`;
      const cells = AVATAR_STATES.map(state => avatarCell(type, size, shape, state));
      rows += gridRow(label, cells);
    }
  }

  return sectionTitle(type.charAt(0).toUpperCase() + type.slice(1)) +
    `<div style="${gridStyle}">${rows}</div>`;
}

function statusSection(): string {
  const cols = STATUS_DOTS.length;
  const gridStyle = `${styles.grid}grid-template-columns:120px repeat(${cols}, 1fr);`;

  let rows = gridHeader(STATUS_DOTS as unknown as string[]);
  for (const size of SIZES) {
    const label = `round / ${size}`;
    const cells = STATUS_DOTS.map(status =>
      `<tarmac-avatar size="${size}" shape="round" initials="AB" status="${status}"></tarmac-avatar>`
    );
    rows += gridRow(label, cells);
  }

  return sectionTitle('Status Dots') + `<div style="${gridStyle}">${rows}</div>`;
}

const meta: Meta = {
  title: 'Tarmac TDS/Avatar',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

export const Playground: Story = {
  name: 'Playground',
  parameters: { layout: 'centered' },
  render: () => {
    const el = document.createElement('tarmac-avatar');
    el.setAttribute('size', 'lg');
    el.setAttribute('shape', 'round');
    el.setAttribute('initials', 'AB');
    return el;
  },
};

export const FullMatrix: Story = {
  name: 'Full Matrix',
  render: () => page(
    TYPES.map(t => typeSection(t)).join('') + statusSection(),
    '4 Types × 4 Sizes × 2 Shapes × 5 States + Status Dots'
  ),
};
