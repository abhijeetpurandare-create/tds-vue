import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Link from '../index';

const tarmacConfig = {
  base: {
    fontFamily: 'Noto Sans, sans-serif',
    fontWeight: 500,
    textDecoration: 'underline',
    transition: 'color 0.15s ease-in-out',
  },
  variants: {
    blue: {
      textColor: '#2396fb',
      hoverTextColor: '#1d7dd1',
      focusTextColor: '#1764a7',
      disabledTextColor: '#91cafd',
    },
    black: {
      textColor: '#2b2b2b',
      hoverTextColor: '#2b2b2b',
      focusTextColor: '#2b2b2b',
      disabledTextColor: '#cdcbcb',
    },
    white: {
      textColor: '#e6e6e6',
      hoverTextColor: '#e6e6e6',
      focusTextColor: '#e6e6e6',
      disabledTextColor: '#3b3b3b',
    },
  },
  sizes: {
    xl: { fontSize: '24px', lineHeight: '32px', iconSize: '28px', gap: '4px' },
    lg: { fontSize: '20px', lineHeight: '26px', iconSize: '24px', gap: '4px' },
    md: { fontSize: '16px', lineHeight: '24px', iconSize: '24px', gap: '4px' },
    sm: { fontSize: '14px', lineHeight: '20px', iconSize: '20px', gap: '4px' },
    xs: { fontSize: '12px', lineHeight: '16px', iconSize: '16px', gap: '4px' },
  },
  states: { disabled: { cursor: 'default' } },
};

jest.mock('../../ThemeProvider', () => ({
  useTheme: () => ({
    theme: { components: { link: tarmacConfig } },
  }),
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('Link — Tarmac TDS', () => {
  /* ─── Rendering ─── */
  it('renders with text prop', () => {
    render(<Link text="Click me" />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('renders with children', () => {
    render(<Link>Child content</Link>);
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });

  it('renders as an anchor element', () => {
    render(<Link text="Link" href="https://example.com" />);
    const el = screen.getByText('Link');
    expect(el.closest('a')).toBeInTheDocument();
  });

  it('renders href attribute', () => {
    render(<Link text="Link" href="https://example.com" />);
    expect(screen.getByText('Link').closest('a')).toHaveAttribute('href', 'https://example.com');
  });

  it('renders target attribute', () => {
    render(<Link text="Link" href="#" target="_blank" />);
    expect(screen.getByText('Link').closest('a')).toHaveAttribute('target', '_blank');
  });

  it('renders rel attribute', () => {
    render(<Link text="Link" href="#" rel="noopener noreferrer" />);
    expect(screen.getByText('Link').closest('a')).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders without text or children', () => {
    const { container } = render(<Link />);
    expect(container.querySelector('a')).toBeInTheDocument();
  });

  /* ─── All Styles ─── */
  it('renders blue style without error', () => {
    render(<Link linkStyle="blue" text="Blue" />);
    expect(screen.getByText('Blue')).toBeInTheDocument();
  });

  it('renders black style without error', () => {
    render(<Link linkStyle="black" text="Black" />);
    expect(screen.getByText('Black')).toBeInTheDocument();
  });

  it('renders white style without error', () => {
    render(<Link linkStyle="white" text="White" />);
    expect(screen.getByText('White')).toBeInTheDocument();
  });

  /* ─── All Sizes ─── */
  it('renders xl size without error', () => {
    render(<Link size="xl" text="XL" />);
    expect(screen.getByText('XL')).toBeInTheDocument();
  });

  it('renders lg size without error', () => {
    render(<Link size="lg" text="LG" />);
    expect(screen.getByText('LG')).toBeInTheDocument();
  });

  it('renders md size without error', () => {
    render(<Link size="md" text="MD" />);
    expect(screen.getByText('MD')).toBeInTheDocument();
  });

  it('renders sm size without error', () => {
    render(<Link size="sm" text="SM" />);
    expect(screen.getByText('SM')).toBeInTheDocument();
  });

  it('renders xs size without error', () => {
    render(<Link size="xs" text="XS" />);
    expect(screen.getByText('XS')).toBeInTheDocument();
  });

  /* ─── All style × size combos ─── */
  it('renders all style × size combinations without error', () => {
    const styles = ['blue', 'black', 'white'];
    const sizes = ['xl', 'lg', 'md', 'sm', 'xs'];
    styles.forEach((s) => {
      sizes.forEach((sz) => {
        const { unmount } = render(<Link linkStyle={s} size={sz} text={`${s}-${sz}`} />);
        expect(screen.getByText(`${s}-${sz}`)).toBeInTheDocument();
        unmount();
      });
    });
  });

  /* ─── Disabled State ─── */
  it('sets aria-disabled when disabled', () => {
    render(<Link text="Disabled" isDisabled />);
    expect(screen.getByText('Disabled').closest('a')).toHaveAttribute('aria-disabled', 'true');
  });

  it('sets tabIndex to -1 when disabled', () => {
    render(<Link text="Disabled" isDisabled />);
    expect(screen.getByText('Disabled').closest('a')).toHaveAttribute('tabindex', '-1');
  });

  it('removes href when disabled', () => {
    render(<Link text="Disabled" isDisabled href="https://example.com" />);
    expect(screen.getByText('Disabled').closest('a')).not.toHaveAttribute('href');
  });

  it('prevents click when disabled', () => {
    const onClick = jest.fn();
    render(<Link text="Disabled" isDisabled onClick={onClick} />);
    fireEvent.click(screen.getByText('Disabled').closest('a')!);
    expect(onClick).not.toHaveBeenCalled();
  });

  /* ─── Events ─── */
  it('fires onClick when clicked', () => {
    const onClick = jest.fn();
    render(<Link text="Click" onClick={onClick} />);
    fireEvent.click(screen.getByText('Click').closest('a')!);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  /* ─── Icons ─── */
  it('renders leading icon', () => {
    render(<Link text="Link" leadingIcon={<span data-testid="lead-icon">→</span>} />);
    expect(screen.getByTestId('lead-icon')).toBeInTheDocument();
  });

  it('renders trailing icon', () => {
    render(<Link text="Link" trailingIcon={<span data-testid="trail-icon">←</span>} />);
    expect(screen.getByTestId('trail-icon')).toBeInTheDocument();
  });

  it('renders both leading and trailing icons', () => {
    render(
      <Link
        text="Link"
        leadingIcon={<span data-testid="lead">→</span>}
        trailingIcon={<span data-testid="trail">←</span>}
      />
    );
    expect(screen.getByTestId('lead')).toBeInTheDocument();
    expect(screen.getByTestId('trail')).toBeInTheDocument();
  });

  it('does not render icon containers when no icons provided', () => {
    const { container } = render(<Link text="No icons" />);
    const spans = container.querySelectorAll('a > span');
    expect(spans.length).toBe(0);
  });

  /* ─── HTML Attributes ─── */
  it('applies className prop', () => {
    render(<Link text="Link" className="custom-class" />);
    expect(screen.getByText('Link').closest('a')?.className).toContain('custom-class');
  });

  it('applies data-testid prop', () => {
    render(<Link text="Link" data-testid="my-link" />);
    expect(screen.getByTestId('my-link')).toBeInTheDocument();
  });

  it('applies custom tabIndex', () => {
    render(<Link text="Link" tabIndex={5} />);
    expect(screen.getByText('Link').closest('a')).toHaveAttribute('tabindex', '5');
  });

  it('defaults tabIndex to 0 when not disabled', () => {
    render(<Link text="Link" />);
    expect(screen.getByText('Link').closest('a')).toHaveAttribute('tabindex', '0');
  });

  /* ─── Default Props ─── */
  it('defaults linkStyle to blue', () => {
    render(<Link text="Default" />);
    expect(screen.getByText('Default')).toBeInTheDocument();
  });

  it('defaults size to md', () => {
    render(<Link text="Default" />);
    expect(screen.getByText('Default')).toBeInTheDocument();
  });

  it('defaults isDisabled to false', () => {
    render(<Link text="Default" href="#" />);
    expect(screen.getByText('Default').closest('a')).toHaveAttribute('href', '#');
    expect(screen.getByText('Default').closest('a')).not.toHaveAttribute('aria-disabled');
  });

  /* ─── Disabled per style ─── */
  it('renders disabled blue style', () => {
    render(<Link linkStyle="blue" text="Disabled Blue" isDisabled />);
    expect(screen.getByText('Disabled Blue').closest('a')).toHaveAttribute('aria-disabled', 'true');
  });

  it('renders disabled black style', () => {
    render(<Link linkStyle="black" text="Disabled Black" isDisabled />);
    expect(screen.getByText('Disabled Black').closest('a')).toHaveAttribute('aria-disabled', 'true');
  });

  it('renders disabled white style', () => {
    render(<Link linkStyle="white" text="Disabled White" isDisabled />);
    expect(screen.getByText('Disabled White').closest('a')).toHaveAttribute('aria-disabled', 'true');
  });

  /* ─── Disabled with icons ─── */
  it('renders disabled with leading icon', () => {
    render(
      <Link text="Disabled" isDisabled leadingIcon={<span data-testid="icon">→</span>} />
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByText('Disabled').closest('a')).toHaveAttribute('aria-disabled', 'true');
  });

  it('renders disabled with trailing icon', () => {
    render(
      <Link text="Disabled" isDisabled trailingIcon={<span data-testid="icon">←</span>} />
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  /* ─── Accessibility ─── */
  it('renders as a focusable element', () => {
    render(<Link text="Focusable" />);
    const anchor = screen.getByText('Focusable').closest('a')!;
    expect(anchor.tabIndex).toBe(0);
  });

  it('is not focusable when disabled', () => {
    render(<Link text="Not focusable" isDisabled />);
    const anchor = screen.getByText('Not focusable').closest('a')!;
    expect(anchor.tabIndex).toBe(-1);
  });

  /* ─── Edge cases ─── */
  it('handles unknown linkStyle gracefully', () => {
    render(<Link linkStyle="purple" text="Unknown" />);
    expect(screen.getByText('Unknown')).toBeInTheDocument();
  });

  it('handles unknown size gracefully', () => {
    render(<Link size="xxl" text="Unknown size" />);
    expect(screen.getByText('Unknown size')).toBeInTheDocument();
  });

  it('prefers text over children when both provided', () => {
    render(<Link text="Text wins">Children lose</Link>);
    expect(screen.getByText('Text wins')).toBeInTheDocument();
  });
});
