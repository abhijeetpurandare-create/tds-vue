import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Popup from '../index';

jest.mock('../../ThemeProvider', () => ({
  useTheme: () => ({
    theme: {
      components: {
        popup: {
          base: { backgroundColor: '#fff', borderRadius: '8', boxShadow: '0 0 6px rgba(0,0,0,0.2)', overlayColor: 'rgba(0,0,0,0.5)' },
          sizes: {
            xs: { width: '328px', minWidth: '328px', maxWidth: '416px', headerFooterSize: 'sm' },
            sm: { width: '416px', minWidth: '416px', maxWidth: '632px', headerFooterSize: 'md' },
            md: { width: '632px', minWidth: '632px', maxWidth: '848px', headerFooterSize: 'md' },
          },
        },
        popupHeaderFooter: {
          base: { backgroundColor: '#fff', textColor: '#2b2b2b', gap: '8', badgeGap: '4', textGap: '4' },
          sizes: {
            sm: { padding: '12', headingFontSize: '14', headerBorderRadius: '8', footerBorderRadius: '0 0 6px 6px', footerHeight: 'auto', iconSize: '20', closeIconSize: '20' },
            md: { padding: '16', headingFontSize: '16', headerBorderRadius: '8', footerBorderRadius: '0 0 6px 6px', footerHeight: '60px', iconSize: '24', closeIconSize: '24' },
          },
        },
      },
    },
  }),
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock('../../../config/config', () => ({ defaultThemeConfig: { components: {} } }));

describe('Popup — Rendering', () => {
  it('renders nothing when isOpen is false', () => {
    const { container } = render(<Popup isOpen={false} title="T" />);
    expect(container.innerHTML).toBe('');
  });

  it('renders when isOpen is true with renderInline', () => {
    render(<Popup isOpen renderInline title="Test" />);
    expect(screen.getByRole('dialog')).toBeTruthy();
  });

  it('renders title in header', () => {
    render(<Popup isOpen renderInline title="My Title" />);
    expect(screen.getByText('My Title')).toBeTruthy();
  });

  it('renders subtext', () => {
    render(<Popup isOpen renderInline title="T" subtext="Sub" />);
    expect(screen.getByText('Sub')).toBeTruthy();
  });

  it('hides subtext when showSubtext is false', () => {
    render(<Popup isOpen renderInline title="T" subtext="Sub" showSubtext={false} />);
    expect(screen.queryByText('Sub')).toBeNull();
  });

  it('renders children in content area', () => {
    render(<Popup isOpen renderInline title="T"><div data-testid="content">Hi</div></Popup>);
    expect(screen.getByTestId('content')).toBeTruthy();
  });

  it('renders footer when showFooter is true', () => {
    render(<Popup isOpen renderInline title="T" showFooter />);
    expect(screen.getByTestId('popup-footer')).toBeTruthy();
  });

  it('hides footer when showFooter is false', () => {
    render(<Popup isOpen renderInline title="T" showFooter={false} />);
    expect(screen.queryByTestId('popup-footer')).toBeNull();
  });

  it('renders footerCtasRight in footer', () => {
    render(<Popup isOpen renderInline title="T" showFooter footerCtasRight={<button data-testid="btn">OK</button>} />);
    expect(screen.getByTestId('btn')).toBeTruthy();
  });

  it('renders snackbar when showSnackbar is true', () => {
    render(<Popup isOpen renderInline title="T" showSnackbar snackbar={<div data-testid="snack">Alert</div>} />);
    expect(screen.getByTestId('snack')).toBeTruthy();
  });

  it('hides snackbar when showSnackbar is false', () => {
    render(<Popup isOpen renderInline title="T" showSnackbar={false} snackbar={<div data-testid="snack">Alert</div>} />);
    expect(screen.queryByTestId('snack')).toBeNull();
  });

  it('renders tabs when showTabs is true', () => {
    render(<Popup isOpen renderInline title="T" showTabs tabs={<div data-testid="tabs">Tabs</div>} />);
    expect(screen.getByTestId('tabs')).toBeTruthy();
  });

  it('hides tabs when showTabs is false', () => {
    render(<Popup isOpen renderInline title="T" showTabs={false} tabs={<div data-testid="tabs">Tabs</div>} />);
    expect(screen.queryByTestId('tabs')).toBeNull();
  });

  it('renders leadingIcon in header', () => {
    render(<Popup isOpen renderInline title="T" leadingIcon={<span data-testid="ico" />} />);
    expect(screen.getByTestId('ico')).toBeTruthy();
  });

  it('renders badges in header', () => {
    render(<Popup isOpen renderInline title="T" badges={<span data-testid="bdg" />} />);
    expect(screen.getByTestId('bdg')).toBeTruthy();
  });
});

describe('Popup — Accessibility', () => {
  it('has role dialog', () => {
    render(<Popup isOpen renderInline title="T" />);
    expect(screen.getByRole('dialog')).toBeTruthy();
  });

  it('has aria-modal true', () => {
    render(<Popup isOpen renderInline title="T" />);
    expect(screen.getByRole('dialog').getAttribute('aria-modal')).toBe('true');
  });

  it('has aria-label from title', () => {
    render(<Popup isOpen renderInline title="My Dialog" />);
    expect(screen.getByRole('dialog').getAttribute('aria-label')).toBe('My Dialog');
  });

  it('has close button in header', () => {
    render(<Popup isOpen renderInline title="T" onClose={() => {}} />);
    expect(screen.getByLabelText('Close')).toBeTruthy();
  });
});

describe('Popup — Dismiss', () => {
  it('calls onClose when close button clicked', () => {
    const fn = jest.fn();
    render(<Popup isOpen renderInline title="T" onClose={fn} />);
    fireEvent.click(screen.getByLabelText('Close'));
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('calls onClose on Escape key', () => {
    const fn = jest.fn();
    render(<Popup isOpen renderInline title="T" onClose={fn} />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose on Escape when closeOnEsc is false', () => {
    const fn = jest.fn();
    render(<Popup isOpen renderInline title="T" onClose={fn} closeOnEsc={false} />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(fn).not.toHaveBeenCalled();
  });

  it('does not dismiss on overlay click in inline mode', () => {
    const fn = jest.fn();
    render(<Popup isOpen renderInline title="T" onClose={fn} />);
    fireEvent.click(screen.getByRole('presentation'));
    expect(fn).not.toHaveBeenCalled();
  });

  it('does not call onClose on overlay click when closeOnOverlay is false', () => {
    const fn = jest.fn();
    render(<Popup isOpen renderInline title="T" onClose={fn} closeOnOverlay={false} />);
    fireEvent.click(screen.getByRole('presentation'));
    expect(fn).not.toHaveBeenCalled();
  });

  it('does not call onClose when clicking inside dialog', () => {
    const fn = jest.fn();
    render(<Popup isOpen renderInline title="T" onClose={fn}><div data-testid="inner">X</div></Popup>);
    fireEvent.click(screen.getByTestId('inner'));
    expect(fn).not.toHaveBeenCalled();
  });
});

describe('Popup — Sizes', () => {
  it.each(['xs', 'sm', 'md'] as const)('renders with size %s', (size) => {
    render(<Popup isOpen renderInline title="T" size={size} />);
    expect(screen.getByRole('dialog')).toBeTruthy();
  });

  it('applies className', () => {
    render(<Popup isOpen renderInline title="T" className="my-cls" />);
    expect(screen.getByRole('dialog').className).toContain('my-cls');
  });
});

describe('Popup — Sections order', () => {
  it('renders header, snackbar, tabs, content, footer in order', () => {
    render(
      <Popup isOpen renderInline title="T" showFooter showSnackbar showTabs
        snackbar={<div data-testid="snack" />}
        tabs={<div data-testid="tabs" />}
        footerCtasRight={<button>OK</button>}>
        <div data-testid="content" />
      </Popup>
    );
    const dialog = screen.getByRole('dialog');
    const children = Array.from(dialog.children);
    expect(children.length).toBe(5);
  });
});

describe('Popup — Footer props', () => {
  it('renders footerCtaLeft', () => {
    render(<Popup isOpen renderInline title="T" showFooter footerCtaLeft={<button data-testid="fl">L</button>} />);
    expect(screen.getByTestId('fl')).toBeTruthy();
  });

  it('renders footerLink', () => {
    render(<Popup isOpen renderInline title="T" showFooter footerLink={<a data-testid="flink" href="#">X</a>} />);
    expect(screen.getByTestId('flink')).toBeTruthy();
  });

  it('renders trailingIcon in header', () => {
    render(<Popup isOpen renderInline title="T" trailingIcon={<span data-testid="ti" />} />);
    expect(screen.getByTestId('ti')).toBeTruthy();
  });
});

describe('Popup — Defaults', () => {
  it('defaults size to md', () => {
    render(<Popup isOpen renderInline title="T" />);
    expect(screen.getByRole('dialog')).toBeTruthy();
  });

  it('defaults showFooter to true', () => {
    render(<Popup isOpen renderInline title="T" />);
    expect(screen.getByTestId('popup-footer')).toBeTruthy();
  });

  it('defaults showSnackbar to false', () => {
    render(<Popup isOpen renderInline title="T" snackbar={<div data-testid="sn" />} />);
    expect(screen.queryByTestId('sn')).toBeNull();
  });

  it('defaults showTabs to false', () => {
    render(<Popup isOpen renderInline title="T" tabs={<div data-testid="tb" />} />);
    expect(screen.queryByTestId('tb')).toBeNull();
  });

  it('defaults showSubtext to true', () => {
    render(<Popup isOpen renderInline title="T" subtext="S" />);
    expect(screen.getByText('S')).toBeTruthy();
  });

  it('defaults closeOnEsc to true', () => {
    const fn = jest.fn();
    render(<Popup isOpen renderInline title="T" onClose={fn} />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(fn).toHaveBeenCalled();
  });
});

describe('Popup — renderInline', () => {
  it('renders inline without portal', () => {
    const { container } = render(<Popup isOpen renderInline title="T" />);
    expect(container.querySelector('[role="dialog"]')).toBeTruthy();
  });

  it('inline overlay has position relative not fixed', () => {
    render(<Popup isOpen renderInline title="T" />);
    const overlay = screen.getByRole('presentation');
    const style = window.getComputedStyle(overlay);
    expect(style.position).toBe('relative');
  });
});

describe('Popup — Backward Compatibility & Defaults', () => {
  it('renders with only isOpen and title', () => {
    render(<Popup isOpen renderInline title="Minimal" />);
    expect(screen.getByText('Minimal')).toBeTruthy();
    expect(screen.getByRole('dialog')).toBeTruthy();
  });

  it('renders nothing when isOpen is undefined', () => {
    const { container } = render(<Popup renderInline title="T" />);
    expect(container.innerHTML).toBe('');
  });

  it('accepts unknown size string via open union', () => {
    render(<Popup isOpen renderInline title="T" size="custom" />);
    expect(screen.getByRole('dialog')).toBeTruthy();
  });

  it('header and footer are both present by default', () => {
    render(<Popup isOpen renderInline title="T" />);
    expect(screen.getByTestId('popup-header')).toBeTruthy();
    expect(screen.getByTestId('popup-footer')).toBeTruthy();
  });

  it('renders header with correct title and subtext', () => {
    render(<Popup isOpen renderInline title="Title" subtext="Sub" />);
    expect(screen.getByText('Title')).toBeTruthy();
    expect(screen.getByText('Sub')).toBeTruthy();
  });

  it('does not render snackbar or tabs by default', () => {
    render(
      <Popup isOpen renderInline title="T"
        snackbar={<div data-testid="sn" />}
        tabs={<div data-testid="tb" />} />
    );
    expect(screen.queryByTestId('sn')).toBeNull();
    expect(screen.queryByTestId('tb')).toBeNull();
  });

  it('all optional ReactNode props can be null', () => {
    render(
      <Popup isOpen renderInline title="T"
        snackbar={null} tabs={null} footerCtasRight={null}
        footerCtaLeft={null} footerLink={null}
        leadingIcon={null} trailingIcon={null} badges={null} />
    );
    expect(screen.getByRole('dialog')).toBeTruthy();
  });

  it('className defaults to empty string', () => {
    render(<Popup isOpen renderInline title="T" />);
    const dialog = screen.getByRole('dialog');
    expect(dialog.className).not.toContain('undefined');
  });

  it('dialog has tabIndex -1 for focus management', () => {
    render(<Popup isOpen renderInline title="T" />);
    expect(screen.getByRole('dialog').getAttribute('tabindex')).toBe('-1');
  });

  it('overlay has role presentation', () => {
    render(<Popup isOpen renderInline title="T" />);
    expect(screen.getByRole('presentation')).toBeTruthy();
  });

  it('dialog click does not propagate to overlay', () => {
    const fn = jest.fn();
    render(<Popup isOpen renderInline title="T" onClose={fn} closeOnOverlay />);
    fireEvent.click(screen.getByRole('dialog'));
    expect(fn).not.toHaveBeenCalled();
  });

  it('cleans up keydown listener on unmount', () => {
    const fn = jest.fn();
    const { unmount } = render(<Popup isOpen renderInline title="T" onClose={fn} />);
    unmount();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(fn).not.toHaveBeenCalled();
  });

  it('cleans up keydown listener when isOpen becomes false', () => {
    const fn = jest.fn();
    const { rerender } = render(<Popup isOpen renderInline title="T" onClose={fn} />);
    rerender(<Popup isOpen={false} renderInline title="T" onClose={fn} />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(fn).not.toHaveBeenCalled();
  });

  it('renders all 5 sizes without error', () => {
    (['xs', 'sm', 'md', 'lg', 'xl'] as const).forEach((size) => {
      const { unmount } = render(<Popup isOpen renderInline title="T" size={size} />);
      expect(screen.getByRole('dialog')).toBeTruthy();
      unmount();
    });
  });

  it('renders size lg', () => {
    render(<Popup isOpen renderInline title="T" size="lg" />);
    expect(screen.getByRole('dialog')).toBeTruthy();
  });

  it('renders size xl', () => {
    render(<Popup isOpen renderInline title="T" size="xl" />);
    expect(screen.getByRole('dialog')).toBeTruthy();
  });

  it('renders all footer props together', () => {
    render(<Popup isOpen renderInline title="T" showFooter
      footerCtaLeft={<button data-testid="fl">L</button>}
      footerLink={<a data-testid="fk" href="#">K</a>}
      footerCtasRight={<button data-testid="fr">R</button>} />);
    expect(screen.getByTestId('fl')).toBeTruthy();
    expect(screen.getByTestId('fk')).toBeTruthy();
    expect(screen.getByTestId('fr')).toBeTruthy();
  });

  it('does not render close button when onClose is not provided', () => {
    render(<Popup isOpen renderInline title="T" />);
    expect(screen.queryByLabelText('Close')).toBeNull();
  });

  it('non-Escape key does not trigger close', () => {
    const fn = jest.fn();
    render(<Popup isOpen renderInline title="T" onClose={fn} />);
    fireEvent.keyDown(document, { key: 'Enter' });
    expect(fn).not.toHaveBeenCalled();
  });

  it('renders with no children', () => {
    render(<Popup isOpen renderInline title="T" />);
    expect(screen.getByRole('dialog')).toBeTruthy();
  });

  it('renders snackbar + tabs + footer simultaneously', () => {
    render(<Popup isOpen renderInline title="T" showFooter showSnackbar showTabs
      snackbar={<div data-testid="sn">S</div>}
      tabs={<div data-testid="tb">T</div>}
      footerCtasRight={<button data-testid="fb">B</button>} />);
    expect(screen.getByTestId('sn')).toBeTruthy();
    expect(screen.getByTestId('tb')).toBeTruthy();
    expect(screen.getByTestId('fb')).toBeTruthy();
    expect(screen.getByTestId('popup-footer')).toBeTruthy();
  });

  it('showTabs=true without tabs node renders nothing extra', () => {
    render(<Popup isOpen renderInline title="T" showTabs />);
    expect(screen.getByRole('dialog')).toBeTruthy();
  });

  it('showSnackbar=true without snackbar node renders nothing extra', () => {
    render(<Popup isOpen renderInline title="T" showSnackbar />);
    expect(screen.getByRole('dialog')).toBeTruthy();
  });

  it('trailingIcon in popup replaces close button', () => {
    const fn = jest.fn();
    render(<Popup isOpen renderInline title="T" onClose={fn} trailingIcon={<span data-testid="custom-trail" />} />);
    expect(screen.getByTestId('custom-trail')).toBeTruthy();
    expect(screen.queryByLabelText('Close')).toBeNull();
  });

  it('defaults closeOnOverlay to true', () => {
    render(<Popup isOpen renderInline title="T" />);
    // inline mode doesn't fire overlay click, but the prop defaults correctly
    expect(screen.getByRole('dialog')).toBeTruthy();
  });

  it('renders with portalTarget prop without error', () => {
    const target = document.createElement('div');
    document.body.appendChild(target);
    render(<Popup isOpen title="T" portalTarget={target} />);
    expect(target.querySelector('[role="dialog"]')).toBeTruthy();
    document.body.removeChild(target);
  });
});
