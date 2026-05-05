import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// ── Mock ThemeProvider to avoid ESM import issues with figma-variables-resolver ──
const snackbarConfig = {
  base: {
    fontFamily: 'Noto Sans, sans-serif',
    borderRadius: '4px',
    shadow: '0px 4px 12px 0px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease-in-out',
    borderWidth: '1px',
  },
  styles: {
    filled: {
      black: { backgroundColor: '#000000', textColor: '#f2f2f2', titleColor: '#f2f2f2', descriptionColor: '#e6e6e6', ctaColor: '#e6e6e6' },
      white: { backgroundColor: '#ffffff', textColor: '#2b2b2b', titleColor: '#2b2b2b', descriptionColor: '#3b3b3b', ctaColor: '#2b2b2b' },
      info: { backgroundColor: '#2396fb', textColor: '#e6e6e6', titleColor: '#e6e6e6', descriptionColor: '#e6e6e6', ctaColor: '#e6e6e6' },
      positive: { backgroundColor: '#1ba86e', textColor: '#e6e6e6', titleColor: '#e6e6e6', descriptionColor: '#e6e6e6', ctaColor: '#e6e6e6' },
      negative: { backgroundColor: '#dc143c', textColor: '#e6e6e6', titleColor: '#e6e6e6', descriptionColor: '#e6e6e6', ctaColor: '#e6e6e6' },
      warning: { backgroundColor: '#f5c828', textColor: '#7b6414', titleColor: '#52430d', descriptionColor: '#7b6414', ctaColor: '#2b2b2b' },
    },
    subtle: {
      black: { backgroundColor: '#333333', textColor: '#f2f2f2', titleColor: '#f2f2f2', descriptionColor: '#e6e6e6', ctaColor: '#e6e6e6' },
      white: { backgroundColor: '#f7f7f7', textColor: '#2b2b2b', titleColor: '#2b2b2b', descriptionColor: '#3b3b3b', borderColor: '#e6e6e6', ctaColor: '#2b2b2b' },
      info: { backgroundColor: '#e6f3fe', textColor: '#2b2b2b', titleColor: '#2b2b2b', descriptionColor: '#2b2b2b', ctaColor: '#2396fb' },
    },
    outlined: {
      black: { backgroundColor: 'transparent', textColor: '#2b2b2b', titleColor: '#2b2b2b', descriptionColor: '#2b2b2b', borderColor: '#2b2b2b', ctaColor: '#000000' },
      white: { backgroundColor: 'transparent', textColor: '#e6e6e6', titleColor: '#e6e6e6', descriptionColor: '#e6e6e6', borderColor: '#e6e6e6', ctaColor: '#ffffff' },
    },
  },
  sizes: {
    lg: { paddingSingleText: '8px 12px', paddingDualText: '12px 16px', fontSize: '16px', lineHeight: '24px', titleFontWeight: '400', descFontSize: '14px', descLineHeight: '20px', descFontWeight: '400', iconSize: '24px', gap: '12px', textGap: '4px', ctaFontSize: '14px', ctaLineHeight: '20px', ctaPadding: '8px' },
    md: { paddingSingleText: '8px 12px', paddingDualText: '12px', fontSize: '14px', lineHeight: '20px', titleFontWeight: '400', descFontSize: '12px', descLineHeight: '16px', descFontWeight: '300', iconSize: '20px', gap: '12px', textGap: '4px', ctaFontSize: '12px', ctaLineHeight: '16px', ctaPadding: '6px' },
    sm: { paddingSingleText: '6px 12px', paddingDualText: '8px 12px', fontSize: '12px', lineHeight: '16px', titleFontWeight: '400', descFontSize: '10px', descLineHeight: '12px', descFontWeight: '300', iconSize: '20px', gap: '12px', textGap: '2px', ctaFontSize: '12px', ctaLineHeight: '16px', ctaPadding: '6px' },
  },
};

jest.mock('../../ThemeProvider', () => ({
  useTheme: () => ({
    theme: { components: { snackbar: snackbarConfig } },
  }),
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock('react-dom', () => {
  const original = jest.requireActual('react-dom');
  return {
    ...original,
    createPortal: (node: React.ReactNode) => node,
  };
});

import Snackbar, { snackbar, SnackbarManager } from '../index';

/* ═══════════════════════════════════════════════════════════════════════════
   1. RENDERING & PROPS
   ═══════════════════════════════════════════════════════════════════════════ */

describe('Snackbar — Rendering & Props', () => {
  beforeEach(() => { jest.useFakeTimers(); });
  afterEach(() => { jest.useRealTimers(); });

  test('renders with message (single text mode)', () => {
    render(<Snackbar message="Hello world" duration={0} />);
    expect(screen.getByTestId('orca-snackbar')).toBeInTheDocument();
    expect(screen.getByTestId('orca-snackbar-message')).toHaveTextContent('Hello world');
  });

  test('renders dual text when title is provided', () => {
    render(<Snackbar title="Title" message="Description" duration={0} />);
    expect(screen.getByTestId('orca-snackbar-title')).toHaveTextContent('Title');
    expect(screen.getByTestId('orca-snackbar-message')).toHaveTextContent('Description');
  });

  test('does not render title element in single text mode', () => {
    render(<Snackbar message="Only message" duration={0} />);
    expect(screen.queryByTestId('orca-snackbar-title')).not.toBeInTheDocument();
  });

  test('renders leading icon when provided', () => {
    render(<Snackbar message="msg" leadingIcon={<span data-testid="icon">★</span>} duration={0} />);
    expect(screen.getByTestId('orca-snackbar-icon')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  test('does not render leading icon when not provided', () => {
    render(<Snackbar message="msg" duration={0} />);
    expect(screen.queryByTestId('orca-snackbar-icon')).not.toBeInTheDocument();
  });

  test('renders trailing icon (close button) by default', () => {
    render(<Snackbar message="msg" duration={0} />);
    expect(screen.getByTestId('orca-snackbar-close')).toBeInTheDocument();
  });

  test('hides trailing icon when trailingIcon={false}', () => {
    render(<Snackbar message="msg" trailingIcon={false} duration={0} />);
    expect(screen.queryByTestId('orca-snackbar-close')).not.toBeInTheDocument();
  });

  test('hides trailing icon when closable={false}', () => {
    render(<Snackbar message="msg" closable={false} duration={0} />);
    expect(screen.queryByTestId('orca-snackbar-close')).not.toBeInTheDocument();
  });

  test('renders CTA buttons when ctAs is true', () => {
    render(<Snackbar message="msg" ctAs duration={0} />);
    expect(screen.getByTestId('orca-snackbar-ctas')).toBeInTheDocument();
    expect(screen.getByTestId('orca-snackbar-deny')).toHaveTextContent('Deny');
    expect(screen.getByTestId('orca-snackbar-approve')).toHaveTextContent('Approve');
  });

  test('does not render CTA buttons when ctAs is false', () => {
    render(<Snackbar message="msg" ctAs={false} duration={0} />);
    expect(screen.queryByTestId('orca-snackbar-ctas')).not.toBeInTheDocument();
  });

  test('renders custom deny and approve text', () => {
    render(<Snackbar message="msg" ctAs denyText="Cancel" approveText="OK" duration={0} />);
    expect(screen.getByTestId('orca-snackbar-deny')).toHaveTextContent('Cancel');
    expect(screen.getByTestId('orca-snackbar-approve')).toHaveTextContent('OK');
  });

  test('applies custom className', () => {
    render(<Snackbar message="msg" className="my-custom" duration={0} />);
    expect(screen.getByTestId('orca-snackbar').className).toContain('my-custom');
  });

  test('has role="status" and aria-live="polite"', () => {
    render(<Snackbar message="msg" duration={0} />);
    const el = screen.getByTestId('orca-snackbar');
    expect(el).toHaveAttribute('role', 'status');
    expect(el).toHaveAttribute('aria-live', 'polite');
  });

  test('close button has aria-label="Dismiss"', () => {
    render(<Snackbar message="msg" duration={0} />);
    expect(screen.getByTestId('orca-snackbar-close')).toHaveAttribute('aria-label', 'Dismiss');
  });

  test('renders ReactNode as message', () => {
    render(<Snackbar message={<strong data-testid="bold-msg">Bold</strong>} duration={0} />);
    expect(screen.getByTestId('bold-msg')).toBeInTheDocument();
  });

  test('renders ReactNode as title', () => {
    render(<Snackbar title={<em data-testid="em-title">Italic</em>} message="desc" duration={0} />);
    expect(screen.getByTestId('em-title')).toBeInTheDocument();
  });
});

/* ═══════════════════════════════════════════════════════════════════════════
   2. VARIANTS, STYLES & SIZES
   ═══════════════════════════════════════════════════════════════════════════ */

describe('Snackbar — Variants, Styles & Sizes', () => {
  const VARIANTS = ['black', 'white', 'info', 'positive', 'negative', 'warning'] as const;
  const STYLES = ['filled', 'subtle', 'outlined'] as const;
  const SIZES = ['lg', 'md', 'sm'] as const;

  test.each(VARIANTS)('renders variant=%s without error', (variant) => {
    const { unmount } = render(<Snackbar message="msg" variant={variant} duration={0} />);
    expect(screen.getByTestId('orca-snackbar')).toBeInTheDocument();
    unmount();
  });

  test.each(STYLES)('renders snackbarStyle=%s without error', (style) => {
    const { unmount } = render(<Snackbar message="msg" snackbarStyle={style} duration={0} />);
    expect(screen.getByTestId('orca-snackbar')).toBeInTheDocument();
    unmount();
  });

  test.each(SIZES)('renders size=%s without error', (size) => {
    const { unmount } = render(<Snackbar message="msg" size={size} duration={0} />);
    expect(screen.getByTestId('orca-snackbar')).toBeInTheDocument();
    unmount();
  });

  test('all variant × style × size combos render without error', () => {
    for (const variant of VARIANTS) {
      for (const style of STYLES) {
        for (const size of SIZES) {
          const { unmount } = render(
            <Snackbar message="msg" variant={variant} snackbarStyle={style} size={size} duration={0} />
          );
          expect(screen.getByTestId('orca-snackbar')).toBeInTheDocument();
          unmount();
        }
      }
    }
  });

  test('all variant × style combos render dual text without error', () => {
    for (const variant of VARIANTS) {
      for (const style of STYLES) {
        const { unmount } = render(
          <Snackbar title="Title" message="Desc" variant={variant} snackbarStyle={style} size="lg" duration={0} />
        );
        expect(screen.getByTestId('orca-snackbar-title')).toBeInTheDocument();
        unmount();
      }
    }
  });

  test('defaults to variant=black, snackbarStyle=filled, size=md', () => {
    render(<Snackbar message="msg" duration={0} />);
    expect(screen.getByTestId('orca-snackbar')).toBeInTheDocument();
  });
});

/* ═══════════════════════════════════════════════════════════════════════════
   3. INTERACTIONS & BEHAVIOR
   ═══════════════════════════════════════════════════════════════════════════ */

describe('Snackbar — Interactions & Behavior', () => {
  beforeEach(() => { jest.useFakeTimers(); });
  afterEach(() => { jest.useRealTimers(); });

  test('calls onClose when close button is clicked', async () => {
    const onClose = jest.fn();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<Snackbar message="msg" closable onClose={onClose} duration={0} />);

    await user.click(screen.getByTestId('orca-snackbar-close'));
    act(() => { jest.advanceTimersByTime(300); });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('auto-closes after duration', () => {
    const onClose = jest.fn();
    render(<Snackbar message="msg" duration={2000} onClose={onClose} />);

    act(() => { jest.advanceTimersByTime(2300); });
    expect(onClose).toHaveBeenCalled();
  });

  test('does not auto-close when duration=0', () => {
    const onClose = jest.fn();
    render(<Snackbar message="msg" duration={0} onClose={onClose} />);

    act(() => { jest.advanceTimersByTime(10000); });
    expect(onClose).not.toHaveBeenCalled();
  });

  test('calls onDeny when deny button is clicked', async () => {
    const onDeny = jest.fn();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<Snackbar message="msg" ctAs onDeny={onDeny} duration={0} />);

    await user.click(screen.getByTestId('orca-snackbar-deny'));
    expect(onDeny).toHaveBeenCalledTimes(1);
  });

  test('calls onApprove when approve button is clicked', async () => {
    const onApprove = jest.fn();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<Snackbar message="msg" ctAs onApprove={onApprove} duration={0} />);

    await user.click(screen.getByTestId('orca-snackbar-approve'));
    expect(onApprove).toHaveBeenCalledTimes(1);
  });

  test('ref is forwarded to the container div', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Snackbar ref={ref} message="msg" duration={0} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toHaveAttribute('data-testid', 'orca-snackbar');
  });
});

/* ═══════════════════════════════════════════════════════════════════════════
   4. PROGRAMMATIC API
   ═══════════════════════════════════════════════════════════════════════════ */

describe('Snackbar — Programmatic API', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    const rootDiv = document.createElement('div');
    rootDiv.id = 'root';
    document.body.appendChild(rootDiv);
    jest.useFakeTimers();
    render(<SnackbarManager />);
  });

  afterEach(() => {
    snackbar.removeAll();
    jest.useRealTimers();
  });

  test('snackbar.show() renders a snackbar', async () => {
    act(() => { snackbar.show({ message: 'Programmatic' }); });
    await waitFor(() => {
      expect(screen.getByText('Programmatic')).toBeInTheDocument();
    });
  });

  test('snackbar.info() renders with message', async () => {
    act(() => { snackbar.info('Info msg'); });
    await waitFor(() => { expect(screen.getByText('Info msg')).toBeInTheDocument(); });
  });

  test('snackbar.positive() renders with message', async () => {
    act(() => { snackbar.positive('Positive msg'); });
    await waitFor(() => { expect(screen.getByText('Positive msg')).toBeInTheDocument(); });
  });

  test('snackbar.negative() renders with message', async () => {
    act(() => { snackbar.negative('Negative msg'); });
    await waitFor(() => { expect(screen.getByText('Negative msg')).toBeInTheDocument(); });
  });

  test('snackbar.warning() renders with message', async () => {
    act(() => { snackbar.warning('Warning msg'); });
    await waitFor(() => { expect(screen.getByText('Warning msg')).toBeInTheDocument(); });
  });

  test('snackbar.remove() removes a specific snackbar', async () => {
    let id: string;
    act(() => { id = snackbar.show({ message: 'Remove me' }); });
    await waitFor(() => { expect(screen.getByText('Remove me')).toBeInTheDocument(); });

    act(() => { snackbar.remove(id!); });
    act(() => { jest.advanceTimersByTime(300); });
    await waitFor(() => { expect(screen.queryByText('Remove me')).not.toBeInTheDocument(); });
  });

  test('snackbar.removeAll() removes all snackbars', async () => {
    act(() => {
      snackbar.info('A');
      snackbar.positive('B');
      snackbar.negative('C');
    });
    await waitFor(() => { expect(screen.getByText('A')).toBeInTheDocument(); });

    act(() => { snackbar.removeAll(); });
    act(() => { jest.advanceTimersByTime(300); });
    await waitFor(() => {
      expect(screen.queryByText('A')).not.toBeInTheDocument();
      expect(screen.queryByText('B')).not.toBeInTheDocument();
      expect(screen.queryByText('C')).not.toBeInTheDocument();
    });
  });

  test('snackbar.show() returns a string id', () => {
    let id: string;
    act(() => { id = snackbar.show({ message: 'test' }); });
    expect(typeof id!).toBe('string');
    expect(id!.startsWith('snackbar-')).toBe(true);
  });
});

/* ═══════════════════════════════════════════════════════════════════════════
   5. THEME INTEGRATION
   ═══════════════════════════════════════════════════════════════════════════ */

describe('Snackbar — Theme Integration', () => {
  test('renders with mocked ThemeProvider (theme loaded)', () => {
    render(<Snackbar message="themed" duration={0} />);
    expect(screen.getByTestId('orca-snackbar')).toBeInTheDocument();
  });

  test('renders all three styles with theme config', () => {
    for (const style of ['filled', 'subtle', 'outlined'] as const) {
      const { unmount } = render(<Snackbar message="msg" snackbarStyle={style} duration={0} />);
      expect(screen.getByTestId('orca-snackbar')).toBeInTheDocument();
      unmount();
    }
  });

  test('subtle style with white variant renders (has borderColor in config)', () => {
    render(<Snackbar message="msg" variant="white" snackbarStyle="subtle" duration={0} />);
    expect(screen.getByTestId('orca-snackbar')).toBeInTheDocument();
  });

  test('outlined style with black variant renders (has borderColor in config)', () => {
    render(<Snackbar message="msg" variant="black" snackbarStyle="outlined" duration={0} />);
    expect(screen.getByTestId('orca-snackbar')).toBeInTheDocument();
  });

  test('falls back gracefully for unknown variant', () => {
    render(<Snackbar message="msg" variant={'custom' as any} duration={0} />);
    expect(screen.getByTestId('orca-snackbar')).toBeInTheDocument();
  });
});
