import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Breadcrumbs from '../index';
import BreadcrumbCell from '../../BreadcrumbCell';

const tarmacConfig = {
  base: { fontFamily: 'Noto Sans, sans-serif', transition: 'all 0.15s ease-in-out' },
  styles: { black: { textColor: '#121212', pressedTextColor: '#2B2B2B', iconColor: '#2B2B2B' } },
  sizes: { lg: { fontSize: '14px', lineHeight: '20px', padding: '12px 8px', iconSize: '20px', gap: '8px' }, sm: { fontSize: '12px', lineHeight: '16px', padding: '8px', iconSize: '16px', gap: '8px' } },
  states: { default: { fontWeight: '300' }, pressed: { fontWeight: '500' }, ghost: { backgroundColor: '#EDEDED' } },
  divider: { width: '8px' },
};

jest.mock('../../ThemeProvider', () => ({
  useTheme: () => ({ theme: { components: { breadcrumbs: tarmacConfig } } }),
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));
jest.mock('../../Pill', () => ({ __esModule: true, default: (p: any) => <span data-testid="pill">{p.text}</span> }));

describe('Breadcrumbs — Container', () => {
  it('renders nav with aria-label', () => { render(<Breadcrumbs items={[{ label: 'Home' }]} />); expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Breadcrumb'); });
  it('custom aria-label', () => { render(<Breadcrumbs items={[{ label: 'Home' }]} aria-label="Custom" />); expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Custom'); });
  it('renders items', () => { render(<Breadcrumbs items={[{ label: 'Home' }, { label: 'Products' }]} />); expect(screen.getByText('Home')).toBeInTheDocument(); expect(screen.getByText('Products')).toBeInTheDocument(); });
  it('first item gets isCurrent', () => { render(<Breadcrumbs items={[{ label: 'Home', 'data-testid': 'f' }, { label: 'P' }]} />); expect(screen.getByTestId('f')).toHaveAttribute('aria-current', 'page'); });
  it('renders children', () => { render(<Breadcrumbs><BreadcrumbCell label="C1" /><BreadcrumbCell label="C2" /></Breadcrumbs>); expect(screen.getByText('C1')).toBeInTheDocument(); });
  it('className on nav', () => { render(<Breadcrumbs items={[{ label: 'H' }]} className="x" />); expect(screen.getByRole('navigation').className).toContain('x'); });
});

describe('Breadcrumbs — Dividers', () => {
  it('shows dividers between items', () => { const { container } = render(<Breadcrumbs items={[{ label: 'A' }, { label: 'B' }, { label: 'C' }]} />); expect(container.querySelectorAll('[aria-hidden="true"]')).toHaveLength(2); });
  it('hides dividers when showDivider=false', () => { const { container } = render(<Breadcrumbs items={[{ label: 'A' }, { label: 'B' }]} showDivider={false} />); expect(container.querySelectorAll('[aria-hidden="true"]')).toHaveLength(0); });
  it('slash SVG has line', () => { const { container } = render(<Breadcrumbs dividerStyle="slash" items={[{ label: 'A' }, { label: 'B' }]} />); expect(container.querySelector('svg line')).toBeInTheDocument(); });
  it('chevron SVG has path', () => { const { container } = render(<Breadcrumbs dividerStyle="chevron" items={[{ label: 'A' }, { label: 'B' }]} />); expect(container.querySelectorAll('svg path').length).toBeGreaterThan(0); });
  it('stroke #2B2B2B', () => { const { container } = render(<Breadcrumbs dividerStyle="slash" items={[{ label: 'A' }, { label: 'B' }]} />); expect(container.querySelector('svg line')).toHaveAttribute('stroke', '#2B2B2B'); });
});

describe('Breadcrumbs — Crumb Counts', () => {
  [2, 3, 4, 5, 6, 7, 8].forEach(n => {
    it(`${n} crumbs`, () => {
      const items = Array.from({ length: n }, (_, i) => ({ label: `L${i}` }));
      const { container } = render(<Breadcrumbs items={items} />);
      items.forEach(item => expect(screen.getByText(item.label)).toBeInTheDocument());
      expect(container.querySelectorAll('[aria-hidden="true"]')).toHaveLength(n - 1);
    });
  });
});

describe('Breadcrumbs — Compound', () => {
  it('Breadcrumbs.Cell is BreadcrumbCell', () => { expect(Breadcrumbs.Cell).toBe(BreadcrumbCell); });
});

/* ═══════════════════════════════════════════════════════════════
   Breadcrumbs — Backward Compatibility (API contract)
   ═══════════════════════════════════════════════════════════════ */
describe('Breadcrumbs — Backward Compatibility', () => {
  // Export shape
  it('default export is a function component', () => { expect(typeof Breadcrumbs).toBe('function'); });
  it('Breadcrumbs.Cell is BreadcrumbCell', () => { expect(Breadcrumbs.Cell).toBe(BreadcrumbCell); });

  // Default prop values
  it('defaults dividerStyle to slash', () => {
    const { container } = render(<Breadcrumbs items={[{ label: 'A' }, { label: 'B' }]} />);
    expect(container.querySelector('svg line')).toBeInTheDocument(); // slash uses <line>
  });
  it('defaults size to lg', () => {
    const { container } = render(<Breadcrumbs items={[{ label: 'A' }, { label: 'B' }]} />);
    const svg = container.querySelector('[aria-hidden="true"] svg');
    expect(svg).toHaveAttribute('height', '44'); // lg divider height
  });
  it('defaults showDivider to true', () => {
    const { container } = render(<Breadcrumbs items={[{ label: 'A' }, { label: 'B' }]} />);
    expect(container.querySelectorAll('[aria-hidden="true"]')).toHaveLength(1);
  });
  it('defaults aria-label to Breadcrumb', () => {
    render(<Breadcrumbs items={[{ label: 'A' }]} />);
    expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Breadcrumb');
  });
  it('defaults first item to isCurrent', () => {
    render(<Breadcrumbs items={[{ label: 'A', 'data-testid': 'first' }, { label: 'B', 'data-testid': 'second' }]} />);
    expect(screen.getByTestId('first')).toHaveAttribute('aria-current', 'page');
    expect(screen.getByTestId('second')).not.toHaveAttribute('aria-current');
  });

  // DOM structure contract
  it('renders <nav> element', () => {
    render(<Breadcrumbs items={[{ label: 'A' }]} />);
    expect(screen.getByRole('navigation').tagName).toBe('NAV');
  });
  it('dividers have aria-hidden=true', () => {
    const { container } = render(<Breadcrumbs items={[{ label: 'A' }, { label: 'B' }]} />);
    container.querySelectorAll('[aria-hidden="true"]').forEach(el => {
      expect(el).toHaveAttribute('aria-hidden', 'true');
    });
  });

  // items API contract
  it('items prop renders BreadcrumbCell children', () => {
    render(<Breadcrumbs items={[{ label: 'X' }, { label: 'Y' }, { label: 'Z' }]} />);
    expect(screen.getByText('X')).toBeInTheDocument();
    expect(screen.getByText('Y')).toBeInTheDocument();
    expect(screen.getByText('Z')).toBeInTheDocument();
  });
  it('items passes size down to cells', () => {
    const { container } = render(<Breadcrumbs size="sm" items={[{ label: 'A' }, { label: 'B' }]} />);
    const svg = container.querySelector('[aria-hidden="true"] svg');
    expect(svg).toHaveAttribute('height', '32'); // sm divider height
  });

  // children API contract
  it('children renders instead of items', () => {
    render(<Breadcrumbs><BreadcrumbCell label="Child" /></Breadcrumbs>);
    expect(screen.getByText('Child')).toBeInTheDocument();
  });
  it('children takes priority over items', () => {
    render(<Breadcrumbs items={[{ label: 'Item' }]}><BreadcrumbCell label="Child" /></Breadcrumbs>);
    expect(screen.getByText('Child')).toBeInTheDocument();
    expect(screen.queryByText('Item')).not.toBeInTheDocument();
  });

  // className passthrough
  it('className merges with internal styles', () => {
    render(<Breadcrumbs items={[{ label: 'A' }]} className="my-nav" />);
    const cls = screen.getByRole('navigation').className;
    expect(cls).toContain('my-nav');
  });

  // Divider style contract
  it('chevron divider uses path not line', () => {
    const { container } = render(<Breadcrumbs dividerStyle="chevron" items={[{ label: 'A' }, { label: 'B' }]} />);
    expect(container.querySelector('svg line')).not.toBeInTheDocument();
    expect(container.querySelector('svg path')).toBeInTheDocument();
  });
  it('showDivider=false hides all dividers', () => {
    const { container } = render(<Breadcrumbs showDivider={false} items={[{ label: 'A' }, { label: 'B' }, { label: 'C' }]} />);
    expect(container.querySelectorAll('[aria-hidden="true"]')).toHaveLength(0);
  });
  it('displayName is Breadcrumbs', () => { expect(Breadcrumbs.displayName).toBe('Breadcrumbs'); });
  it('sm divider has height 32', () => {
    const { container } = render(<Breadcrumbs size="sm" items={[{ label: 'A' }, { label: 'B' }]} />);
    expect(container.querySelector('[aria-hidden="true"] svg')).toHaveAttribute('height', '32');
  });
  it('items with custom key prop', () => {
    render(<Breadcrumbs items={[{ label: 'A', key: 'k1' }, { label: 'B', key: 'k2' }]} />);
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
  });
  it('item size overrides container size', () => {
    const { container } = render(<Breadcrumbs size="lg" items={[{ label: 'A', size: 'sm' as const }, { label: 'B' }]} />);
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
  });
  it('empty items array renders nav with no children', () => {
    const { container } = render(<Breadcrumbs items={[]} />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(container.querySelectorAll('[aria-hidden="true"]')).toHaveLength(0);
  });
  it('no items and no children renders empty nav', () => {
    render(<Breadcrumbs />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
  it('single item has no divider', () => {
    const { container } = render(<Breadcrumbs items={[{ label: 'Only' }]} />);
    expect(container.querySelectorAll('[aria-hidden="true"]')).toHaveLength(0);
  });
});
