import type { Meta, StoryObj } from '@storybook/html';
const meta: Meta = { title: 'Navigation/Breadcrumbs', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const d = document.createElement('div');
    d.innerHTML = `
      <tarmac-breadcrumbs divider-style="slash" size="lg">
        <tarmac-breadcrumb-cell label="Home" cell-style="blue" href="#"></tarmac-breadcrumb-cell>
        <tarmac-breadcrumb-cell label="Orders" cell-style="blue" href="#"></tarmac-breadcrumb-cell>
        <tarmac-breadcrumb-cell label="ORD-78901" cell-style="black" is-current></tarmac-breadcrumb-cell>
      </tarmac-breadcrumbs>
    `;
    return d;
  },
};

export const Chevron: Story = {
  render: () => {
    const d = document.createElement('div');
    d.innerHTML = `
      <tarmac-breadcrumbs divider-style="chevron" size="sm">
        <tarmac-breadcrumb-cell label="Dashboard" cell-style="blue" href="#"></tarmac-breadcrumb-cell>
        <tarmac-breadcrumb-cell label="Shipments" cell-style="blue" href="#"></tarmac-breadcrumb-cell>
        <tarmac-breadcrumb-cell label="AWB-9876543" cell-style="black" is-current></tarmac-breadcrumb-cell>
      </tarmac-breadcrumbs>
    `;
    return d;
  },
};
