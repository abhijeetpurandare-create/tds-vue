import type { Meta, StoryObj } from '@storybook/html';
import { page, sectionTitle, gridHeader, gridRow, styles } from './utils/showcase';

const LINK_STYLES = ['blue', 'black', 'white'] as const;
const SIZES = ['xl', 'lg', 'md', 'sm', 'xs'] as const;
const LINK_STATES = ['default', 'hover', 'focused', 'disabled'] as const;

function linkCell(linkStyle: string, size: string, state: string): string {
  let attrs = `link-style="${linkStyle}" size="${size}" href="#"`;
  if (state === 'disabled') attrs += ' disabled';
  return `<tarmac-link ${attrs}>Link text</tarmac-link>`;
}

function styleSection(linkStyle: string): string {
  const dark = linkStyle === 'white';
  const wrapStart = dark ? `<div style="${styles.darkBg}">` : '';
  const wrapEnd = dark ? '</div>' : '';

  const cols = LINK_STATES.length;
  const gridStyle = `${styles.grid}grid-template-columns:80px repeat(${cols}, 1fr);`;

  let rows = gridHeader(LINK_STATES as unknown as string[]);
  for (const size of SIZES) {
    const label = size;
    const cells = LINK_STATES.map(state => linkCell(linkStyle, size, state));
    rows += gridRow(label, cells, dark);
  }

  return sectionTitle(linkStyle.charAt(0).toUpperCase() + linkStyle.slice(1), dark ? 'dark bg' : undefined) +
    wrapStart + `<div style="${gridStyle}">${rows}</div>` + wrapEnd;
}

const meta: Meta = {
  title: 'Tarmac TDS/Link',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

export const Playground: Story = {
  name: 'Playground',
  parameters: { layout: 'centered' },
  render: () => {
    const el = document.createElement('tarmac-link');
    el.setAttribute('link-style', 'blue');
    el.setAttribute('size', 'md');
    el.setAttribute('href', '#');
    el.textContent = 'Link text';
    return el;
  },
};

export const FullMatrix: Story = {
  name: 'Full Matrix',
  render: () => page(
    LINK_STYLES.map(s => styleSection(s)).join(''),
    '3 Styles × 5 Sizes × 4 States'
  ),
};
