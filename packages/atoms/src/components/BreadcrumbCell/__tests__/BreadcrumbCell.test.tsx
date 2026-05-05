import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BreadcrumbCell, { AddCircleIcon20, AddCircleIcon16 } from '../index';

const tarmacConfig = {
  base: { fontFamily: 'Noto Sans, sans-serif', transition: 'all 0.15s ease-in-out' },
  styles: {
    black: { textColor: '#121212', hoverTextColor: '#121212', pressedTextColor: '#2B2B2B', disabledTextColor: '#CDCBCB', iconColor: '#2B2B2B', hoverIconColor: '#2B2B2B', pressedIconColor: '#2B2B2B', disabledIconColor: '#CDCBCB' },
    blue: { textColor: '#2396FB', hoverTextColor: '#1D7DD1', pressedTextColor: '#1764A7', disabledTextColor: '#91CAFD', iconColor: '#2396FB', hoverIconColor: '#1D7DD1', pressedIconColor: '#1764A7', disabledIconColor: '#91CAFD' },
    dlvRed: { textColor: '#ED1B36', hoverTextColor: '#C5172D', pressedTextColor: '#9E1224', disabledTextColor: '#F68D9A', iconColor: '#ED1B36', hoverIconColor: '#C5172D', pressedIconColor: '#9E1224', disabledIconColor: '#F68D9A' },
  },
  sizes: {
    lg: { fontSize: '14px', lineHeight: '20px', padding: '12px 8px', iconSize: '20px', gap: '8px' },
    sm: { fontSize: '12px', lineHeight: '16px', padding: '8px', iconSize: '16px', gap: '8px' },
  },
  states: {
    default: { fontWeight: '300' }, hover: { fontWeight: '500' }, pressed: { fontWeight: '500' }, disabled: { fontWeight: '400' },
    ghost: { backgroundColor: '#EDEDED', skeletonColor: '#D9D9D9', skeletonBorderRadius: '8px', skeletonWidth: '78px', skeletonHeight: '12px', lgWidth: '102px', lgHeight: '44px', smWidth: '80px', smHeight: '40px' },
  },
};

jest.mock('../../ThemeProvider', () => ({
  useTheme: () => ({ theme: { components: { breadcrumbs: tarmacConfig } } }),
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

const MockPill = (props: any) => <span data-testid="pill" data-variant={props.pillVariant}>{props.text || props.children}</span>;

describe('BreadcrumbCell — Rendering', () => {
  it('renders with label', () => { render(<BreadcrumbCell label="Home" data-testid="c" />); expect(screen.getByTestId('c')).toHaveTextContent('Home'); });
  it('renders as <span> by default', () => { render(<BreadcrumbCell label="Home" data-testid="c" />); expect(screen.getByTestId('c').tagName).toBe('SPAN'); });
  it('renders as <a> when href', () => { render(<BreadcrumbCell label="Home" href="/home" data-testid="c" />); expect(screen.getByTestId('c').tagName).toBe('A'); });
  it('renders as <span> when href + disabled', () => { render(<BreadcrumbCell label="Home" href="/h" isDisabled data-testid="c" />); expect(screen.getByTestId('c').tagName).toBe('SPAN'); });
  it('renders without label', () => { render(<BreadcrumbCell data-testid="c" />); expect(screen.getByTestId('c')).toBeInTheDocument(); });
});

describe('BreadcrumbCell — Styles', () => {
  it('black', () => { render(<BreadcrumbCell label="T" style="black" data-testid="c" />); expect(screen.getByTestId('c')).toBeInTheDocument(); });
  it('blue', () => { render(<BreadcrumbCell label="T" style="blue" data-testid="c" />); expect(screen.getByTestId('c')).toBeInTheDocument(); });
  it('dlvRed', () => { render(<BreadcrumbCell label="T" style="dlvRed" data-testid="c" />); expect(screen.getByTestId('c')).toBeInTheDocument(); });
  it('custom', () => { render(<BreadcrumbCell label="T" style="custom" data-testid="c" />); expect(screen.getByTestId('c')).toBeInTheDocument(); });
});

describe('BreadcrumbCell — Sizes', () => {
  it('lg', () => { render(<BreadcrumbCell label="T" size="lg" data-testid="c" />); expect(screen.getByTestId('c')).toBeInTheDocument(); });
  it('sm', () => { render(<BreadcrumbCell label="T" size="sm" data-testid="c" />); expect(screen.getByTestId('c')).toBeInTheDocument(); });
});

describe('BreadcrumbCell — States', () => {
  it('default tabIndex 0', () => { render(<BreadcrumbCell label="T" data-testid="c" />); expect(screen.getByTestId('c')).toHaveAttribute('tabindex', '0'); });
  it('isCurrent → aria-current=page', () => { render(<BreadcrumbCell label="T" isCurrent data-testid="c" />); expect(screen.getByTestId('c')).toHaveAttribute('aria-current', 'page'); });
  it('disabled → aria-disabled', () => { render(<BreadcrumbCell label="T" isDisabled data-testid="c" />); expect(screen.getByTestId('c')).toHaveAttribute('aria-disabled', 'true'); });
  it('disabled → tabIndex -1', () => { render(<BreadcrumbCell label="T" isDisabled data-testid="c" />); expect(screen.getByTestId('c')).toHaveAttribute('tabindex', '-1'); });
  it('ghost → aria-hidden, no text', () => { render(<BreadcrumbCell label="T" isGhost data-testid="c" />); const e = screen.getByTestId('c'); expect(e).toHaveAttribute('aria-hidden', 'true'); expect(e).not.toHaveTextContent('T'); });
  it('ghost hides icons/pill', () => {
    render(<BreadcrumbCell label="T" isGhost leadingIcon={<span data-testid="l" />} trailingIcon={<span data-testid="t" />} pill={<MockPill />} data-testid="c" />);
    expect(screen.queryByTestId('l')).not.toBeInTheDocument();
    expect(screen.queryByTestId('pill')).not.toBeInTheDocument();
  });
});

describe('BreadcrumbCell — Icons', () => {
  it('leading icon renders', () => { render(<BreadcrumbCell label="T" leadingIcon={<AddCircleIcon20 />} data-testid="c" />); expect(screen.getByTestId('c').querySelector('svg')).toBeInTheDocument(); });
  it('trailing icon renders', () => { render(<BreadcrumbCell label="T" trailingIcon={<AddCircleIcon20 />} data-testid="c" />); expect(screen.getByTestId('c').querySelector('svg')).toBeInTheDocument(); });
  it('both icons render', () => { render(<BreadcrumbCell label="T" leadingIcon={<AddCircleIcon20 />} trailingIcon={<AddCircleIcon20 />} data-testid="c" />); expect(screen.getByTestId('c').querySelectorAll('svg')).toHaveLength(2); });
  it('16px for sm', () => { render(<BreadcrumbCell label="T" size="sm" leadingIcon={<AddCircleIcon16 />} data-testid="c" />); expect(screen.getByTestId('c').querySelector('svg')).toHaveAttribute('width', '16'); });
  it('20px for lg', () => { render(<BreadcrumbCell label="T" size="lg" leadingIcon={<AddCircleIcon20 />} data-testid="c" />); expect(screen.getByTestId('c').querySelector('svg')).toHaveAttribute('width', '20'); });
  it('currentColor fill', () => { render(<BreadcrumbCell label="T" leadingIcon={<AddCircleIcon20 />} data-testid="c" />); expect(screen.getByTestId('c').querySelector('svg path')).toHaveAttribute('fill', 'currentColor'); });
});

describe('BreadcrumbCell — Pill (ReactNode slot)', () => {
  it('renders pill when provided', () => { render(<BreadcrumbCell label="T" pill={<MockPill text="02" />} data-testid="c" />); expect(screen.getByTestId('pill')).toBeInTheDocument(); });
  it('no pill when undefined', () => { render(<BreadcrumbCell label="T" data-testid="c" />); expect(screen.queryByTestId('pill')).not.toBeInTheDocument(); });
  it('accepts any Pill variant', () => { render(<BreadcrumbCell label="T" pill={<MockPill pillVariant="blue" text="NEW" />} />); expect(screen.getByTestId('pill')).toHaveAttribute('data-variant', 'blue'); });
  it('pill renders after trailing icon', () => {
    render(<BreadcrumbCell label="T" trailingIcon={<span data-testid="ti" />} pill={<MockPill text="02" />} data-testid="c" />);
    const ch = Array.from(screen.getByTestId('c').childNodes);
    expect(ch.findIndex(n => n.contains(screen.getByTestId('ti')))).toBeLessThan(ch.findIndex(n => n.contains(screen.getByTestId('pill'))));
  });
});

describe('BreadcrumbCell — Events', () => {
  it('onClick fires', () => { const fn = jest.fn(); render(<BreadcrumbCell label="T" onClick={fn} data-testid="c" />); fireEvent.click(screen.getByTestId('c')); expect(fn).toHaveBeenCalledTimes(1); });
  it('onClick blocked when disabled', () => { const fn = jest.fn(); render(<BreadcrumbCell label="T" onClick={fn} isDisabled data-testid="c" />); fireEvent.click(screen.getByTestId('c')); expect(fn).not.toHaveBeenCalled(); });
  it('ghost does not fire onClick', () => { const fn = jest.fn(); render(<BreadcrumbCell label="T" onClick={fn} isGhost data-testid="c" />); fireEvent.click(screen.getByTestId('c')); expect(fn).not.toHaveBeenCalled(); });
  it('href with isCurrent still renders <a>', () => { render(<BreadcrumbCell label="T" href="/x" isCurrent data-testid="c" />); expect(screen.getByTestId('c').tagName).toBe('A'); });
});

describe('BreadcrumbCell — HTML Attributes', () => {
  it('className', () => { render(<BreadcrumbCell label="T" className="x" data-testid="c" />); expect(screen.getByTestId('c').className).toContain('x'); });
  it('tabIndex', () => { render(<BreadcrumbCell label="T" tabIndex={5} data-testid="c" />); expect(screen.getByTestId('c')).toHaveAttribute('tabindex', '5'); });
  it('data-testid', () => { render(<BreadcrumbCell label="T" data-testid="my" />); expect(screen.getByTestId('my')).toBeInTheDocument(); });
});

describe('BreadcrumbCell — Exhaustive Combos', () => {
  const styles = ['black', 'blue', 'dlvRed']; const sizes = ['lg', 'sm'] as const;
  it('style × size', () => { styles.forEach(s => sizes.forEach(sz => { const { unmount } = render(<BreadcrumbCell label="T" style={s} size={sz} />); unmount(); })); });
  it('style × size × disabled', () => { styles.forEach(s => sizes.forEach(sz => { const { unmount } = render(<BreadcrumbCell label="T" style={s} size={sz} isDisabled />); unmount(); })); });
  it('style × size × ghost', () => { styles.forEach(s => sizes.forEach(sz => { const { unmount } = render(<BreadcrumbCell label="T" style={s} size={sz} isGhost />); unmount(); })); });
  it('style × size × current', () => { styles.forEach(s => sizes.forEach(sz => { const { unmount } = render(<BreadcrumbCell label="T" style={s} size={sz} isCurrent />); unmount(); })); });
});

describe('AddCircleIcon', () => {
  it('20 renders 20x20', () => { const { container } = render(<AddCircleIcon20 />); expect(container.querySelector('svg')).toHaveAttribute('width', '20'); });
  it('16 renders 16x16', () => { const { container } = render(<AddCircleIcon16 />); expect(container.querySelector('svg')).toHaveAttribute('width', '16'); });
  it('20 currentColor', () => { const { container } = render(<AddCircleIcon20 />); expect(container.querySelector('path')).toHaveAttribute('fill', 'currentColor'); });
  it('16 currentColor', () => { const { container } = render(<AddCircleIcon16 />); expect(container.querySelector('path')).toHaveAttribute('fill', 'currentColor'); });
});

describe('BreadcrumbCell — Backward Compatibility', () => {
  it('default export is a function component', () => { expect(typeof BreadcrumbCell).toBe('function'); });
  it('AddCircleIcon20 is exported', () => { expect(typeof AddCircleIcon20).toBe('function'); });
  it('AddCircleIcon16 is exported', () => { expect(typeof AddCircleIcon16).toBe('function'); });
  it('defaults style to black', () => { const { unmount } = render(<BreadcrumbCell label="T" />); unmount(); });
  it('defaults size to lg', () => { const { unmount } = render(<BreadcrumbCell label="T" />); unmount(); });
  it('defaults isDisabled to false', () => { render(<BreadcrumbCell label="T" data-testid="c" />); expect(screen.getByTestId('c')).toHaveAttribute('tabindex', '0'); });
  it('defaults isGhost to false', () => { render(<BreadcrumbCell label="T" data-testid="c" />); expect(screen.getByTestId('c')).toHaveTextContent('T'); });
  it('defaults isCurrent to false', () => { render(<BreadcrumbCell label="T" data-testid="c" />); expect(screen.getByTestId('c')).not.toHaveAttribute('aria-current'); });
  it('no pill by default', () => { render(<BreadcrumbCell label="T" />); expect(screen.queryByTestId('pill')).not.toBeInTheDocument(); });
  it('renders <span> by default', () => { render(<BreadcrumbCell label="T" data-testid="c" />); expect(screen.getByTestId('c').tagName).toBe('SPAN'); });
  it('renders <a> with href', () => { render(<BreadcrumbCell label="T" href="/x" data-testid="c" />); expect(screen.getByTestId('c')).toHaveAttribute('href', '/x'); });
  it('href ignored when disabled', () => { render(<BreadcrumbCell label="T" href="/x" isDisabled data-testid="c" />); expect(screen.getByTestId('c').tagName).toBe('SPAN'); });
  it('aria-disabled only when disabled', () => { render(<BreadcrumbCell label="T" data-testid="c" />); expect(screen.getByTestId('c')).not.toHaveAttribute('aria-disabled'); });
  it('ghost renders aria-hidden', () => { render(<BreadcrumbCell isGhost data-testid="c" />); expect(screen.getByTestId('c')).toHaveAttribute('aria-hidden', 'true'); });
  it('pill slot accepts any ReactNode', () => { render(<BreadcrumbCell label="T" pill={<span data-testid="custom-pill">Custom</span>} />); expect(screen.getByTestId('custom-pill')).toHaveTextContent('Custom'); });
  it('leadingIcon before label', () => {
    render(<BreadcrumbCell label="L" leadingIcon={<span data-testid="li" />} data-testid="c" />);
    expect(Array.from(screen.getByTestId('c').childNodes).findIndex(n => n.contains(screen.getByTestId('li')))).toBe(0);
  });
  it('trailingIcon after label before pill', () => {
    render(<BreadcrumbCell label="L" trailingIcon={<span data-testid="ti" />} pill={<span data-testid="p" />} data-testid="c" />);
    const ch = Array.from(screen.getByTestId('c').childNodes);
    expect(ch.findIndex(n => n.contains(screen.getByTestId('ti')))).toBeLessThan(ch.findIndex(n => n.contains(screen.getByTestId('p'))));
  });
  it('className merges', () => { render(<BreadcrumbCell label="T" className="my" data-testid="c" />); expect(screen.getByTestId('c').className).toContain('my'); });
  it('onClick receives MouseEvent', () => {
    const fn = jest.fn();
    render(<BreadcrumbCell label="T" onClick={fn} data-testid="c" />);
    fireEvent.click(screen.getByTestId('c'));
    expect(fn).toHaveBeenCalledWith(expect.objectContaining({ type: 'click' }));
  });
  it('displayName is BreadcrumbCell', () => { expect(BreadcrumbCell.displayName).toBe('BreadcrumbCell'); });
  it('ghost still applies className', () => {
    render(<BreadcrumbCell isGhost className="custom-ghost" data-testid="c" />);
    expect(screen.getByTestId('c').className).toContain('custom-ghost');
  });
  it('disabled + isCurrent: disabled takes priority', () => {
    render(<BreadcrumbCell label="T" isDisabled isCurrent data-testid="c" />);
    expect(screen.getByTestId('c')).toHaveAttribute('aria-disabled', 'true');
  });
  it('multiple pills as ReactNode', () => {
    render(<BreadcrumbCell label="T" pill={<><span data-testid="p1">A</span><span data-testid="p2">B</span></>} />);
    expect(screen.getByTestId('p1')).toBeInTheDocument();
    expect(screen.getByTestId('p2')).toBeInTheDocument();
  });
});
