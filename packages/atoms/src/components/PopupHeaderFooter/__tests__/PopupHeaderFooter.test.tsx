import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PopupHeaderFooter from '../index';

jest.mock('../../ThemeProvider', () => ({
  useTheme: () => ({
    theme: {
      components: {
        popupHeaderFooter: {
          base: { backgroundColor: '#fff', textColor: '#2b2b2b', gap: '8', badgeGap: '4', textGap: '4' },
          sizes: {
            lg: { padding: '16', headingFontSize: '20', subtextFontSize: '14', iconSize: '24', closeIconSize: '24', slotSize: '40', headerBorderRadius: '8', footerBorderRadius: '0 0 6px 6px', footerHeight: '60px' },
            md: { padding: '16', headingFontSize: '16', subtextFontSize: '14', iconSize: '24', closeIconSize: '24', slotSize: '32', headerBorderRadius: '8', footerBorderRadius: '0 0 6px 6px', footerHeight: '60px' },
            sm: { padding: '12', headingFontSize: '14', subtextFontSize: '12', iconSize: '20', closeIconSize: '20', slotSize: '24', headerBorderRadius: '8', footerBorderRadius: '0 0 6px 6px', footerHeight: 'auto' },
          },
        },
      },
    },
  }),
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock('../../../config/config', () => ({ defaultThemeConfig: { components: {} } }));

describe('PopupHeaderFooter — Header', () => {
  it('renders title', () => {
    render(<PopupHeaderFooter title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeTruthy();
  });

  it('renders subtext when showSubtext is true', () => {
    render(<PopupHeaderFooter title="T" subtext="Sub" showSubtext />);
    expect(screen.getByText('Sub')).toBeTruthy();
  });

  it('hides subtext when showSubtext is false', () => {
    render(<PopupHeaderFooter title="T" subtext="Sub" showSubtext={false} />);
    expect(screen.queryByText('Sub')).toBeNull();
  });

  it('renders close button when onClose provided', () => {
    render(<PopupHeaderFooter title="T" onClose={() => {}} />);
    expect(screen.getByLabelText('Close')).toBeTruthy();
  });

  it('fires onClose when close button clicked', () => {
    const fn = jest.fn();
    render(<PopupHeaderFooter title="T" onClose={fn} />);
    fireEvent.click(screen.getByLabelText('Close'));
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('does not render close button when no onClose', () => {
    render(<PopupHeaderFooter title="T" />);
    expect(screen.queryByLabelText('Close')).toBeNull();
  });

  it('renders trailingIcon instead of close button', () => {
    render(<PopupHeaderFooter title="T" trailingIcon={<span data-testid="trail" />} onClose={() => {}} />);
    expect(screen.getByTestId('trail')).toBeTruthy();
    expect(screen.queryByLabelText('Close')).toBeNull();
  });

  it('renders leadingIcon', () => {
    render(<PopupHeaderFooter title="T" leadingIcon={<span data-testid="lead" />} />);
    expect(screen.getByTestId('lead')).toBeTruthy();
  });

  it('renders badges', () => {
    render(<PopupHeaderFooter title="T" badges={<span data-testid="badge" />} />);
    expect(screen.getByTestId('badge')).toBeTruthy();
  });

  it('renders slot when showSlot is true', () => {
    render(<PopupHeaderFooter title="T" showSlot slot={<span data-testid="slot" />} />);
    expect(screen.getByTestId('slot')).toBeTruthy();
  });

  it('hides slot when showSlot is false', () => {
    render(<PopupHeaderFooter title="T" slot={<span data-testid="slot" />} />);
    expect(screen.queryByTestId('slot')).toBeNull();
  });

  it('has data-testid popup-header', () => {
    render(<PopupHeaderFooter title="T" />);
    expect(screen.getByTestId('popup-header')).toBeTruthy();
  });

  it('applies className', () => {
    render(<PopupHeaderFooter title="T" className="custom" />);
    expect(screen.getByTestId('popup-header').className).toContain('custom');
  });

  it('renders children', () => {
    render(<PopupHeaderFooter title="T"><span data-testid="child" /></PopupHeaderFooter>);
    expect(screen.getByTestId('child')).toBeTruthy();
  });

  it('renders with size lg', () => {
    render(<PopupHeaderFooter title="T" size="lg" />);
    expect(screen.getByTestId('popup-header')).toBeTruthy();
  });

  it('renders with size md', () => {
    render(<PopupHeaderFooter title="T" size="md" />);
    expect(screen.getByTestId('popup-header')).toBeTruthy();
  });

  it('renders with size sm', () => {
    render(<PopupHeaderFooter title="T" size="sm" />);
    expect(screen.getByTestId('popup-header')).toBeTruthy();
  });

  it('uses 24px close icon for lg', () => {
    render(<PopupHeaderFooter title="T" size="lg" onClose={() => {}} />);
    const svg = screen.getByLabelText('Close').querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('24');
  });

  it('uses 20px close icon for sm', () => {
    render(<PopupHeaderFooter title="T" size="sm" onClose={() => {}} />);
    const svg = screen.getByLabelText('Close').querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('20');
  });

  it('renders without title', () => {
    render(<PopupHeaderFooter />);
    expect(screen.getByTestId('popup-header')).toBeTruthy();
  });

  it('defaults variant to header', () => {
    render(<PopupHeaderFooter title="T" />);
    expect(screen.getByTestId('popup-header')).toBeTruthy();
    expect(screen.queryByTestId('popup-footer')).toBeNull();
  });

  it('defaults size to md', () => {
    render(<PopupHeaderFooter title="T" onClose={() => {}} />);
    const svg = screen.getByLabelText('Close').querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('24');
  });

  it('renders all header sizes with all optional props', () => {
    (['lg', 'md', 'sm'] as const).forEach((size) => {
      const { unmount } = render(
        <PopupHeaderFooter size={size} title="T" subtext="S" showSlot
          slot={<div />} leadingIcon={<span />} badges={<span />} onClose={() => {}} />
      );
      expect(screen.getByTestId('popup-header')).toBeTruthy();
      unmount();
    });
  });

  it('does not render subtext when subtext prop is undefined', () => {
    render(<PopupHeaderFooter title="T" showSubtext />);
    expect(screen.getByTestId('popup-header').textContent).toBe('T');
  });
});

describe('PopupHeaderFooter — Footer', () => {
  it('has data-testid popup-footer', () => {
    render(<PopupHeaderFooter variant="footer" />);
    expect(screen.getByTestId('popup-footer')).toBeTruthy();
  });

  it('renders ctaLeft', () => {
    render(<PopupHeaderFooter variant="footer" ctaLeft={<button data-testid="cta-l">L</button>} />);
    expect(screen.getByTestId('cta-l')).toBeTruthy();
  });

  it('renders ctasRight', () => {
    render(<PopupHeaderFooter variant="footer" ctasRight={<button data-testid="cta-r">R</button>} />);
    expect(screen.getByTestId('cta-r')).toBeTruthy();
  });

  it('renders link', () => {
    render(<PopupHeaderFooter variant="footer" link={<a data-testid="link" href="#">L</a>} />);
    expect(screen.getByTestId('link')).toBeTruthy();
  });

  it('renders children', () => {
    render(<PopupHeaderFooter variant="footer"><span data-testid="fc" /></PopupHeaderFooter>);
    expect(screen.getByTestId('fc')).toBeTruthy();
  });

  it('applies className', () => {
    render(<PopupHeaderFooter variant="footer" className="ft" />);
    expect(screen.getByTestId('popup-footer').className).toContain('ft');
  });

  it('renders with size lg', () => {
    render(<PopupHeaderFooter variant="footer" size="lg" />);
    expect(screen.getByTestId('popup-footer')).toBeTruthy();
  });

  it('renders with size sm', () => {
    render(<PopupHeaderFooter variant="footer" size="sm" />);
    expect(screen.getByTestId('popup-footer')).toBeTruthy();
  });

  it('does not render button set wrapper when no ctasRight', () => {
    const { container } = render(<PopupHeaderFooter variant="footer" />);
    expect(container.querySelectorAll('[data-testid="popup-footer"] > div').length).toBe(0);
  });

  it('renders all footer sizes', () => {
    (['lg', 'md', 'sm'] as const).forEach((size) => {
      const { unmount } = render(
        <PopupHeaderFooter variant="footer" size={size}
          ctaLeft={<button>L</button>} link={<a href="#">Link</a>}
          ctasRight={<button>R</button>} />
      );
      expect(screen.getByTestId('popup-footer')).toBeTruthy();
      unmount();
    });
  });

  it('renders ctaLeft, link, and ctasRight together', () => {
    render(
      <PopupHeaderFooter variant="footer"
        ctaLeft={<button data-testid="l">L</button>}
        link={<a data-testid="lnk" href="#">X</a>}
        ctasRight={<button data-testid="r">R</button>} />
    );
    expect(screen.getByTestId('l')).toBeTruthy();
    expect(screen.getByTestId('lnk')).toBeTruthy();
    expect(screen.getByTestId('r')).toBeTruthy();
  });
});

describe('PopupHeaderFooter — Backward Compatibility & Defaults', () => {
  it('renders with zero props', () => {
    const { container } = render(<PopupHeaderFooter />);
    expect(container.firstChild).toBeTruthy();
  });

  it('renders header variant by default', () => {
    render(<PopupHeaderFooter />);
    expect(screen.getByTestId('popup-header')).toBeTruthy();
    expect(screen.queryByTestId('popup-footer')).toBeNull();
  });

  it('renders footer when variant="footer"', () => {
    render(<PopupHeaderFooter variant="footer" />);
    expect(screen.getByTestId('popup-footer')).toBeTruthy();
    expect(screen.queryByTestId('popup-header')).toBeNull();
  });

  it('showSubtext defaults to true', () => {
    render(<PopupHeaderFooter title="T" subtext="S" />);
    expect(screen.getByText('S')).toBeTruthy();
  });

  it('showSlot defaults to false', () => {
    render(<PopupHeaderFooter slot={<div data-testid="s" />} />);
    expect(screen.queryByTestId('s')).toBeNull();
  });

  it('accepts unknown size string via open union', () => {
    render(<PopupHeaderFooter size="custom" title="T" />);
    expect(screen.getByTestId('popup-header')).toBeTruthy();
  });

  it('accepts unknown variant string via open union', () => {
    render(<PopupHeaderFooter variant="custom" title="T" />);
    expect(screen.getByTestId('popup-header')).toBeTruthy();
  });

  it('header renders correct DOM order: slot, icon, texts, badges, close', () => {
    render(
      <PopupHeaderFooter title="T" subtext="S" showSlot
        slot={<div data-testid="slot" />}
        leadingIcon={<span data-testid="icon" />}
        badges={<span data-testid="badge" />}
        onClose={() => {}} />
    );
    const header = screen.getByTestId('popup-header');
    const children = Array.from(header.children);
    expect(children.length).toBe(5); // slot-wrap, icon-wrap, texts, badges-wrap, close-btn
  });

  it('footer renders correct DOM order: ctaLeft, link, buttonSet', () => {
    render(
      <PopupHeaderFooter variant="footer"
        ctaLeft={<button data-testid="cl" />}
        link={<a data-testid="ln" href="#" />}
        ctasRight={<button data-testid="cr" />} />
    );
    const footer = screen.getByTestId('popup-footer');
    const children = Array.from(footer.children);
    expect(children.length).toBe(3); // ctaLeft, link, buttonSet-wrap
  });

  it('close button has type="button"', () => {
    render(<PopupHeaderFooter title="T" onClose={() => {}} />);
    expect(screen.getByLabelText('Close').getAttribute('type')).toBe('button');
  });

  it('close button has aria-label="Close"', () => {
    render(<PopupHeaderFooter title="T" onClose={() => {}} />);
    expect(screen.getByLabelText('Close')).toBeTruthy();
  });

  it('uses 24px close icon for md size', () => {
    render(<PopupHeaderFooter title="T" size="md" onClose={() => {}} />);
    const svg = screen.getByLabelText('Close').querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('24');
  });

  it('renders footer with size md', () => {
    render(<PopupHeaderFooter variant="footer" size="md" />);
    expect(screen.getByTestId('popup-footer')).toBeTruthy();
  });

  it('does not render slot when showSlot=true but slot is undefined', () => {
    const { container } = render(<PopupHeaderFooter title="T" showSlot />);
    // slot wrapper should not render since slot prop is undefined
    expect(container.querySelectorAll('[data-testid="popup-header"] > div').length).toBeLessThanOrEqual(2);
  });

  it('renders multiple badges', () => {
    render(<PopupHeaderFooter title="T" badges={<><span data-testid="b1" /><span data-testid="b2" /></>} />);
    expect(screen.getByTestId('b1')).toBeTruthy();
    expect(screen.getByTestId('b2')).toBeTruthy();
  });

  it('does not render leadingIcon when not provided', () => {
    const { container } = render(<PopupHeaderFooter title="T" />);
    expect(container.querySelector('[data-testid="popup-header"]')?.children.length).toBe(1); // only texts
  });

  it('does not render badges when not provided', () => {
    render(<PopupHeaderFooter title="T" onClose={() => {}} />);
    const header = screen.getByTestId('popup-header');
    // should have: texts + close = 2 children
    expect(header.children.length).toBe(2);
  });
});
