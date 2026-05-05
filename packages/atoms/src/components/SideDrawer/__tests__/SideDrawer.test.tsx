import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import SideDrawer from '../index';

jest.mock('../../ThemeProvider', () => ({
  useTheme: () => ({ theme: { components: {} } }),
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// ReactDOM.createPortal → render inline in tests
jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: (node: React.ReactNode) => node,
}));

/* ─── helpers ─────────────────────────────────────────────────────────────── */
const renderInline = (ui: React.ReactElement) => render(ui);

/* ═══════════════════════════════════════════════════════════════════════════
   SideDrawer — Root container
═══════════════════════════════════════════════════════════════════════════ */
describe('SideDrawer — Root container', () => {
  it('renders nothing when isOpen=false (default)', () => {
    const { container } = renderInline(<SideDrawer renderInline><p>content</p></SideDrawer>);
    expect(container.firstChild).toBeNull();
  });

  it('renders when isOpen=true with renderInline', () => {
    renderInline(<SideDrawer isOpen renderInline><p>hello</p></SideDrawer>);
    expect(screen.getByTestId('sidedrawer-container')).toBeInTheDocument();
  });

  it('renders via portal (createPortal mock) when renderInline=false', () => {
    renderInline(<SideDrawer isOpen><p>portal</p></SideDrawer>);
    expect(screen.getByTestId('sidedrawer-overlay')).toBeInTheDocument();
    expect(screen.getByTestId('sidedrawer-container')).toBeInTheDocument();
  });

  it('has role="dialog" on the container', () => {
    renderInline(<SideDrawer isOpen renderInline />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('aria-modal is true in portal mode', () => {
    renderInline(<SideDrawer isOpen><p>x</p></SideDrawer>);
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
  });

  it('aria-modal is false in renderInline mode', () => {
    renderInline(<SideDrawer isOpen renderInline />);
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'false');
  });

  it('applies custom className to the container', () => {
    renderInline(<SideDrawer isOpen renderInline className="my-class" />);
    expect(screen.getByTestId('sidedrawer-container').className).toContain('my-class');
  });

  it('renders children inside the container', () => {
    renderInline(
      <SideDrawer isOpen renderInline>
        <span data-testid="child">child</span>
      </SideDrawer>,
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('calls onClose when overlay is clicked (closeOnOverlay=true default)', () => {
    const onClose = jest.fn();
    renderInline(<SideDrawer isOpen onClose={onClose}><p>x</p></SideDrawer>);
    fireEvent.click(screen.getByTestId('sidedrawer-overlay'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does NOT call onClose when overlay clicked and closeOnOverlay=false', () => {
    const onClose = jest.fn();
    renderInline(<SideDrawer isOpen onClose={onClose} closeOnOverlay={false}><p>x</p></SideDrawer>);
    fireEvent.click(screen.getByTestId('sidedrawer-overlay'));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('calls onClose on Escape key when closeOnEsc=true (default)', () => {
    const onClose = jest.fn();
    renderInline(<SideDrawer isOpen onClose={onClose}><p>x</p></SideDrawer>);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does NOT call onClose on Escape when closeOnEsc=false', () => {
    const onClose = jest.fn();
    renderInline(<SideDrawer isOpen onClose={onClose} closeOnEsc={false}><p>x</p></SideDrawer>);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).not.toHaveBeenCalled();
  });

  it('does not propagate click from container to overlay', () => {
    const onClose = jest.fn();
    renderInline(<SideDrawer isOpen onClose={onClose}><p>x</p></SideDrawer>);
    fireEvent.click(screen.getByTestId('sidedrawer-container'));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('narrow variant renders (default)', () => {
    renderInline(<SideDrawer isOpen renderInline variant="narrow" />);
    expect(screen.getByTestId('sidedrawer-container')).toBeInTheDocument();
  });

  it('extended variant renders', () => {
    renderInline(<SideDrawer isOpen renderInline variant="extended" />);
    expect(screen.getByTestId('sidedrawer-container')).toBeInTheDocument();
  });

  it('hides after isOpen transitions to false (shouldRender becomes false after timeout)', async () => {
    jest.useFakeTimers();
    const { rerender } = renderInline(<SideDrawer isOpen renderInline><p>x</p></SideDrawer>);
    expect(screen.getByTestId('sidedrawer-container')).toBeInTheDocument();
    rerender(<SideDrawer isOpen={false} renderInline><p>x</p></SideDrawer>);
    // renderInline=false path hides immediately; renderInline=true hides on isOpen=false
    expect(screen.queryByTestId('sidedrawer-container')).toBeNull();
    jest.useRealTimers();
  });

  it('portal mode: hides after 300ms animation when closed', async () => {
    jest.useFakeTimers();
    const { rerender } = renderInline(<SideDrawer isOpen><p>x</p></SideDrawer>);
    expect(screen.getByTestId('sidedrawer-container')).toBeInTheDocument();
    rerender(<SideDrawer isOpen={false}><p>x</p></SideDrawer>);
    act(() => { jest.advanceTimersByTime(300); });
    expect(screen.queryByTestId('sidedrawer-container')).toBeNull();
    jest.useRealTimers();
  });
});

/* ═══════════════════════════════════════════════════════════════════════════
   SideDrawer.Header
═══════════════════════════════════════════════════════════════════════════ */
describe('SideDrawer.Header', () => {
  const wrap = (ui: React.ReactElement) =>
    renderInline(<SideDrawer isOpen renderInline>{ui}</SideDrawer>);

  it('renders title text', () => {
    wrap(<SideDrawer.Header title="My Title" />);
    expect(screen.getByText('My Title')).toBeInTheDocument();
  });

  it('renders subtext when showSubtext=true (default)', () => {
    wrap(<SideDrawer.Header title="T" subtext="Sub" />);
    expect(screen.getByText('Sub')).toBeInTheDocument();
  });

  it('hides subtext when showSubtext=false', () => {
    wrap(<SideDrawer.Header title="T" subtext="Sub" showSubtext={false} />);
    expect(screen.queryByText('Sub')).toBeNull();
  });

  it('renders close button when onClose is provided via context', () => {
    const onClose = jest.fn();
    renderInline(
      <SideDrawer isOpen renderInline onClose={onClose}>
        <SideDrawer.Header title="T" />
      </SideDrawer>,
    );
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = jest.fn();
    renderInline(
      <SideDrawer isOpen renderInline onClose={onClose}>
        <SideDrawer.Header title="T" />
      </SideDrawer>,
    );
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders leadingIcon when provided', () => {
    wrap(<SideDrawer.Header title="T" leadingIcon={<span data-testid="lead-icon" />} />);
    expect(screen.getByTestId('lead-icon')).toBeInTheDocument();
  });

  it('renders badges when provided', () => {
    wrap(<SideDrawer.Header title="T" badges={<span data-testid="badge">v1</span>} />);
    expect(screen.getByTestId('badge')).toBeInTheDocument();
  });

  it('renders slot when showSlot=true', () => {
    wrap(<SideDrawer.Header title="T" showSlot slot={<img data-testid="slot-img" alt="slot" />} />);
    expect(screen.getByTestId('slot-img')).toBeInTheDocument();
  });

  it('does not render slot when showSlot=false (default)', () => {
    wrap(<SideDrawer.Header title="T" slot={<img data-testid="slot-img" alt="slot" />} />);
    expect(screen.queryByTestId('slot-img')).toBeNull();
  });

  it('renders with size sm', () => {
    wrap(<SideDrawer.Header title="T" size="sm" />);
    expect(screen.getByText('T')).toBeInTheDocument();
  });

  it('renders with size lg', () => {
    wrap(<SideDrawer.Header title="T" size="lg" />);
    expect(screen.getByText('T')).toBeInTheDocument();
  });

  it('renders without title (empty header)', () => {
    const { container } = wrap(<SideDrawer.Header />);
    expect(screen.getByTestId('popup-header')).toBeInTheDocument();
  });
});

/* ═══════════════════════════════════════════════════════════════════════════
   SideDrawer.Snackbar
═══════════════════════════════════════════════════════════════════════════ */
describe('SideDrawer.Snackbar', () => {
  it('renders children inside snackbar wrapper', () => {
    renderInline(
      <SideDrawer isOpen renderInline>
        <SideDrawer.Snackbar><span data-testid="snack">alert</span></SideDrawer.Snackbar>
      </SideDrawer>,
    );
    expect(screen.getByTestId('sidedrawer-snackbar')).toBeInTheDocument();
    expect(screen.getByTestId('snack')).toBeInTheDocument();
  });

  it('has data-testid="sidedrawer-snackbar"', () => {
    renderInline(
      <SideDrawer isOpen renderInline>
        <SideDrawer.Snackbar><span>x</span></SideDrawer.Snackbar>
      </SideDrawer>,
    );
    expect(screen.getByTestId('sidedrawer-snackbar')).toBeInTheDocument();
  });
});

/* ═══════════════════════════════════════════════════════════════════════════
   SideDrawer.Tabs
═══════════════════════════════════════════════════════════════════════════ */
describe('SideDrawer.Tabs', () => {
  it('renders children inside tabs wrapper', () => {
    renderInline(
      <SideDrawer isOpen renderInline>
        <SideDrawer.Tabs><span data-testid="tab1">Tab 1</span></SideDrawer.Tabs>
      </SideDrawer>,
    );
    expect(screen.getByTestId('sidedrawer-tabs')).toBeInTheDocument();
    expect(screen.getByTestId('tab1')).toBeInTheDocument();
  });

  it('has data-testid="sidedrawer-tabs"', () => {
    renderInline(
      <SideDrawer isOpen renderInline>
        <SideDrawer.Tabs><span>x</span></SideDrawer.Tabs>
      </SideDrawer>,
    );
    expect(screen.getByTestId('sidedrawer-tabs')).toBeInTheDocument();
  });
});

/* ═══════════════════════════════════════════════════════════════════════════
   SideDrawer.Content
═══════════════════════════════════════════════════════════════════════════ */
describe('SideDrawer.Content', () => {
  it('renders children inside content wrapper', () => {
    renderInline(
      <SideDrawer isOpen renderInline>
        <SideDrawer.Content><p data-testid="body">body</p></SideDrawer.Content>
      </SideDrawer>,
    );
    expect(screen.getByTestId('sidedrawer-content')).toBeInTheDocument();
    expect(screen.getByTestId('body')).toBeInTheDocument();
  });

  it('has data-testid="sidedrawer-content"', () => {
    renderInline(
      <SideDrawer isOpen renderInline>
        <SideDrawer.Content><span>x</span></SideDrawer.Content>
      </SideDrawer>,
    );
    expect(screen.getByTestId('sidedrawer-content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    renderInline(
      <SideDrawer isOpen renderInline>
        <SideDrawer.Content className="extra"><span>x</span></SideDrawer.Content>
      </SideDrawer>,
    );
    expect(screen.getByTestId('sidedrawer-content').className).toContain('extra');
  });
});

/* ═══════════════════════════════════════════════════════════════════════════
   SideDrawer.Footer
═══════════════════════════════════════════════════════════════════════════ */
describe('SideDrawer.Footer', () => {
  const wrap = (ui: React.ReactElement) =>
    renderInline(<SideDrawer isOpen renderInline>{ui}</SideDrawer>);

  it('renders ctasRight', () => {
    wrap(<SideDrawer.Footer ctasRight={<button>Save</button>} />);
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it('renders ctaLeft', () => {
    wrap(<SideDrawer.Footer ctaLeft={<button>Back</button>} ctasRight={<button>OK</button>} />);
    expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument();
  });

  it('renders link', () => {
    wrap(<SideDrawer.Footer link={<a href="#">Learn more</a>} />);
    expect(screen.getByRole('link', { name: 'Learn more' })).toBeInTheDocument();
  });

  it('renders with size sm', () => {
    wrap(<SideDrawer.Footer size="sm" ctasRight={<button>OK</button>} />);
    expect(screen.getByRole('button', { name: 'OK' })).toBeInTheDocument();
  });

  it('renders with size lg', () => {
    wrap(<SideDrawer.Footer size="lg" ctasRight={<button>OK</button>} />);
    expect(screen.getByRole('button', { name: 'OK' })).toBeInTheDocument();
  });

  it('renders footer wrapper via popup-footer testid', () => {
    wrap(<SideDrawer.Footer ctasRight={<button>OK</button>} />);
    expect(screen.getByTestId('popup-footer')).toBeInTheDocument();
  });

  it('renders nothing extra when no props passed', () => {
    wrap(<SideDrawer.Footer />);
    expect(screen.getByTestId('popup-footer')).toBeInTheDocument();
  });
});

/* ═══════════════════════════════════════════════════════════════════════════
   SideDrawer — Compound composition
═══════════════════════════════════════════════════════════════════════════ */
describe('SideDrawer — Compound composition', () => {
  it('renders all sub-components together', () => {
    renderInline(
      <SideDrawer isOpen renderInline>
        <SideDrawer.Header title="Title" subtext="Sub" />
        <SideDrawer.Snackbar><span>alert</span></SideDrawer.Snackbar>
        <SideDrawer.Tabs><span>tabs</span></SideDrawer.Tabs>
        <SideDrawer.Content><span>body</span></SideDrawer.Content>
        <SideDrawer.Footer ctasRight={<button>Save</button>} />
      </SideDrawer>,
    );
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Sub')).toBeInTheDocument();
    expect(screen.getByTestId('sidedrawer-snackbar')).toBeInTheDocument();
    expect(screen.getByTestId('sidedrawer-tabs')).toBeInTheDocument();
    expect(screen.getByTestId('sidedrawer-content')).toBeInTheDocument();
    expect(screen.getByTestId('popup-footer')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it('renders with only Header and Content (minimal)', () => {
    renderInline(
      <SideDrawer isOpen renderInline>
        <SideDrawer.Header title="Min" />
        <SideDrawer.Content><span>body</span></SideDrawer.Content>
      </SideDrawer>,
    );
    expect(screen.getByText('Min')).toBeInTheDocument();
    expect(screen.getByTestId('sidedrawer-content')).toBeInTheDocument();
    expect(screen.queryByTestId('sidedrawer-snackbar')).toBeNull();
    expect(screen.queryByTestId('sidedrawer-tabs')).toBeNull();
    expect(screen.queryByTestId('popup-footer')).toBeNull();
  });

  it('Header close button uses onClose from root via context', () => {
    const onClose = jest.fn();
    renderInline(
      <SideDrawer isOpen renderInline onClose={onClose}>
        <SideDrawer.Header title="T" />
      </SideDrawer>,
    );
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('sub-components do not render when drawer is closed (renderInline)', () => {
    renderInline(
      <SideDrawer isOpen={false} renderInline>
        <SideDrawer.Header title="Hidden" />
        <SideDrawer.Content><span>hidden</span></SideDrawer.Content>
      </SideDrawer>,
    );
    expect(screen.queryByText('Hidden')).toBeNull();
    expect(screen.queryByTestId('sidedrawer-content')).toBeNull();
  });

  it('compound sub-components are accessible as SideDrawer.X', () => {
    expect(typeof SideDrawer.Header).toBe('function');
    expect(typeof SideDrawer.Snackbar).toBe('function');
    expect(typeof SideDrawer.Tabs).toBe('function');
    expect(typeof SideDrawer.Content).toBe('function');
    expect(typeof SideDrawer.Footer).toBe('function');
  });
});
