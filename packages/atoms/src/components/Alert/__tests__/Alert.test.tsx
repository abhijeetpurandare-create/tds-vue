import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Alert from '../Alert';

// ─── Mocks ───
jest.mock('../../Button', () => {
  const MockButton = (props: Record<string, unknown>) => (
    <button
      data-testid={`orca-btn-${props.buttonStyle}-${props.variant}`}
      data-button-style={props.buttonStyle as string}
      data-button-variant={props.variant as string}
      data-button-size={props.size as string}
      onClick={props.onClick as (() => void) | undefined}
    >
      {props.text as string}
    </button>
  );
  MockButton.Text = MockButton;
  MockButton.Icon = MockButton;
  return { __esModule: true, default: MockButton };
});

// ─── Mocks ───
jest.mock('../../ThemeProvider', () => ({
  useTheme: () => ({
    theme: {
      components: {
        alert: {
          base: { fontFamily: 'sans-serif', fontWeight: '500', transition: 'all 0.15s ease-in-out', radius: '0.5rem', padding: '1rem' },
          variants: {
            default: { backgroundColor: '#FFFFFF', textColor: '#111827', borderColor: '#E5E7EB', iconColor: '#6B7280' },
            primary: { backgroundColor: '#93C5FD20', textColor: '#1D4ED8', borderColor: '#93C5FD', iconColor: '#3B82F6' },
            destructive: { backgroundColor: '#FCA5A520', textColor: '#B91C1C', borderColor: '#FCA5A5', iconColor: '#EF4444' },
            success: { backgroundColor: '#A7F3D020', textColor: '#047857', borderColor: '#A7F3D0', iconColor: '#10B981' },
            warning: { backgroundColor: '#FCD34D20', textColor: '#B45309', borderColor: '#FCD34D', iconColor: '#F59E0B' },
            info: { backgroundColor: '#93C5FD20', textColor: '#1D4ED8', borderColor: '#93C5FD', iconColor: '#3B82F6' },
          },
          sizes: {
            sm: { padding: '0.5rem 1rem', fontSize: '0.875rem', iconSize: '1rem' },
            md: { padding: '1rem', fontSize: '1rem', iconSize: '1.25rem' },
            lg: { padding: '1.25rem', fontSize: '1.125rem', iconSize: '1.5rem' },
          },
        },
        alerts: {
          base: { fontFamily: 'Noto Sans, sans-serif', captionFontFamily: 'Noto Sans, sans-serif', borderRadius: '4px', shadow: '0px 0px 4px 0px rgba(0,0,0,0.1)', transition: 'all 0.15s ease-in-out' },
          variants: {
            white: { backgroundColor: '#ffffff', borderColor: '#e6e6e6', titleColor: '#121212', descriptionColor: '#3b3b3b', singleTextColor: '#2b2b2b', iconColor: '#2b2b2b' },
            black: { backgroundColor: '#1a1a1a', borderColor: '#3a3a3a', titleColor: '#ffffff', descriptionColor: '#b0b0b0', singleTextColor: '#e6e6e6', iconColor: '#e0e0e0' },
            coal: { backgroundColor: '#f5f5f5', borderColor: '#d0d0d0', titleColor: '#121212', descriptionColor: '#3b3b3b', singleTextColor: '#2b2b2b', iconColor: '#4a4a4a' },
            success: { backgroundColor: '#e6f9f0', borderColor: '#34d399', titleColor: '#121212', descriptionColor: '#3b3b3b', singleTextColor: '#2b2b2b', iconColor: '#10b981' },
            error: { backgroundColor: '#fef2f2', borderColor: '#f87171', titleColor: '#121212', descriptionColor: '#3b3b3b', singleTextColor: '#2b2b2b', iconColor: '#ef4444' },
            info: { backgroundColor: '#eff6ff', borderColor: '#60a5fa', titleColor: '#121212', descriptionColor: '#3b3b3b', singleTextColor: '#2b2b2b', iconColor: '#2396fb' },
            warning: { backgroundColor: '#fffbeb', borderColor: '#fbbf24', titleColor: '#121212', descriptionColor: '#3b3b3b', singleTextColor: '#2b2b2b', iconColor: '#d97706' },
          },
          sizes: {
            lg: { padding: '12px', titleFontSize: '16px', titleLineHeight: '24px', titleFontWeight: '400', descriptionFontSize: '14px', descriptionLineHeight: '20px', singleTextFontSize: '16px', singleTextLineHeight: '24px', iconSize: '24px', contentGap: '8px', iconGap: '10px', textGap: '4px' },
            sm: { padding: '12px', titleFontSize: '14px', titleLineHeight: '20px', titleFontWeight: '500', descriptionFontSize: '12px', descriptionLineHeight: '16px', singleTextFontSize: '14px', singleTextLineHeight: '20px', iconSize: '20px', contentGap: '10px', iconGap: '6px', textGap: '4px' },
          },
        },
      },
    },
  }),
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock('../../../config/config', () => ({
  defaultAlertStyles: {
    base: { fontFamily: 'sans-serif', fontWeight: '500', transition: 'all 0.15s ease-in-out', radius: '0.5rem', padding: '1rem' },
    variants: {
      default: { backgroundColor: '#FFFFFF', textColor: '#111827', borderColor: '#E5E7EB', iconColor: '#6B7280' },
      primary: { backgroundColor: '#93C5FD20', textColor: '#1D4ED8', borderColor: '#93C5FD', iconColor: '#3B82F6' },
      destructive: { backgroundColor: '#FCA5A520', textColor: '#B91C1C', borderColor: '#FCA5A5', iconColor: '#EF4444' },
      success: { backgroundColor: '#A7F3D020', textColor: '#047857', borderColor: '#A7F3D0', iconColor: '#10B981' },
      warning: { backgroundColor: '#FCD34D20', textColor: '#B45309', borderColor: '#FCD34D', iconColor: '#F59E0B' },
      info: { backgroundColor: '#93C5FD20', textColor: '#1D4ED8', borderColor: '#93C5FD', iconColor: '#3B82F6' },
    },
    sizes: {
      sm: { padding: '0.5rem 1rem', fontSize: '0.875rem', iconSize: '1rem' },
      md: { padding: '1rem', fontSize: '1rem', iconSize: '1.25rem' },
      lg: { padding: '1.25rem', fontSize: '1.125rem', iconSize: '1.5rem' },
    },
  },
}));

const LEGACY_VARIANTS = ['default', 'primary', 'destructive', 'success', 'warning', 'info'] as const;
const TARMAC_VARIANTS = ['white', 'black', 'coal', 'success', 'error', 'info', 'warning'] as const;
const TARMAC_SIZES = ['lg', 'sm'] as const;
const TARMAC_STYLES = ['singleText', 'dualText'] as const;

// ═══════════════════════════════════════════════════════════════
// 1. LEGACY BACKWARD COMPATIBILITY (≥20 tests)
// ═══════════════════════════════════════════════════════════════
describe('Alert — Legacy backward compatibility', () => {
  // Rendering
  it('renders with children', () => {
    render(<Alert>Default Alert</Alert>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Default Alert')).toBeInTheDocument();
  });

  it('renders with title prop', () => {
    render(<Alert title="Alert Title" />);
    expect(screen.getByText('Alert Title')).toBeInTheDocument();
  });

  it('renders with title and description', () => {
    render(<Alert title="Title" description="Description text" />);
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description text')).toBeInTheDocument();
  });

  it('renders correct HTML element (div with role=alert)', () => {
    render(<Alert>Test</Alert>);
    const el = screen.getByRole('alert');
    expect(el.tagName).toBe('DIV');
  });

  // All legacy variants
  it.each(LEGACY_VARIANTS)('renders with legacy variant=%s', (v) => {
    render(<Alert variant={v}>Alert</Alert>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  // All sizes
  it('renders with size=sm', () => {
    render(<Alert size="sm">Small</Alert>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('renders with size=md', () => {
    render(<Alert size="md">Medium</Alert>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('renders with size=lg', () => {
    render(<Alert size="lg">Large</Alert>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  // Icon
  it('renders with custom icon', () => {
    const CustomIcon = () => <svg data-testid="custom-icon" />;
    render(<Alert icon={<CustomIcon />}>Alert with Icon</Alert>);
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  // Close button
  it('renders close button when closable', () => {
    render(<Alert closable>Closable</Alert>);
    expect(screen.getByLabelText('Close alert')).toBeInTheDocument();
  });

  it('handles close button click', () => {
    const onClose = jest.fn();
    render(<Alert closable onClose={onClose}>Closable</Alert>);
    fireEvent.click(screen.getByLabelText('Close alert'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not render close button when not closable', () => {
    render(<Alert>Not closable</Alert>);
    expect(screen.queryByLabelText('Close alert')).not.toBeInTheDocument();
  });

  // HTML attributes
  it('applies className', () => {
    render(<Alert className="custom-class">Alert</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('custom-class');
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Alert ref={ref}>Alert</Alert>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('passes through data-testid', () => {
    render(<Alert data-testid="my-alert">Alert</Alert>);
    expect(screen.getByTestId('my-alert')).toBeInTheDocument();
  });

  // Backward compat: Tarmac-only props ignored in legacy mode
  it('ignores alertStyle prop in legacy mode', () => {
    render(<Alert variant="default" alertStyle="dualText" title="Title" description="Desc" />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
    // Legacy path always renders description regardless of alertStyle
    expect(screen.getByText('Desc')).toBeInTheDocument();
  });

  it('ignores leadingIcon prop in legacy mode', () => {
    const icon = <span data-testid="lead">L</span>;
    render(<Alert variant="primary" leadingIcon={icon}>Legacy</Alert>);
    expect(screen.queryByTestId('lead')).not.toBeInTheDocument();
  });

  it('ignores trailingIcon prop in legacy mode', () => {
    const icon = <span data-testid="trail">T</span>;
    render(<Alert variant="primary" trailingIcon={icon}>Legacy</Alert>);
    expect(screen.queryByTestId('trail')).not.toBeInTheDocument();
  });

  it('renders children as title in legacy mode', () => {
    render(<Alert>Child content</Alert>);
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });
});

// ═══════════════════════════════════════════════════════════════
// 2. TARMAC TDS (≥25 tests)
// ═══════════════════════════════════════════════════════════════
describe('Alert — Tarmac TDS', () => {
  // Rendering
  it('renders when variant is a Tarmac variant (white)', () => {
    render(<Alert variant="white" title="Tarmac Alert" />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Tarmac Alert')).toBeInTheDocument();
  });

  it('renders without title (empty content area)', () => {
    render(<Alert variant="black" />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('renders correct DOM structure (div with role=alert)', () => {
    render(<Alert variant="coal" title="Test" />);
    const el = screen.getByRole('alert');
    expect(el.tagName).toBe('DIV');
  });

  // All Tarmac variants (individual tests)
  it('renders white variant', () => {
    render(<Alert variant="white" title="White" />);
    expect(screen.getByText('White')).toBeInTheDocument();
  });

  it('renders black variant', () => {
    render(<Alert variant="black" title="Black" />);
    expect(screen.getByText('Black')).toBeInTheDocument();
  });

  it('renders coal variant', () => {
    render(<Alert variant="coal" title="Coal" />);
    expect(screen.getByText('Coal')).toBeInTheDocument();
  });

  it('renders success variant (Tarmac path)', () => {
    render(<Alert variant="success" title="Success" alertStyle="singleText" />);
    expect(screen.getByText('Success')).toBeInTheDocument();
  });

  it('renders error variant', () => {
    render(<Alert variant="error" title="Error" />);
    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  it('renders info variant', () => {
    render(<Alert variant="info" title="Info" />);
    expect(screen.getByText('Info')).toBeInTheDocument();
  });

  it('renders warning variant', () => {
    render(<Alert variant="warning" title="Warning" />);
    expect(screen.getByText('Warning')).toBeInTheDocument();
  });

  // All sizes
  it('renders with size=lg (default for Tarmac)', () => {
    render(<Alert variant="white" size="lg" title="Large" />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('renders with size=sm', () => {
    render(<Alert variant="white" size="sm" title="Small" />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('maps size=md to lg for Tarmac path', () => {
    render(<Alert variant="white" size="md" title="Medium mapped" />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  // Alert styles
  it('singleText: renders title only, no description', () => {
    render(<Alert variant="white" alertStyle="singleText" title="Title" description="Desc" />);
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.queryByText('Desc')).not.toBeInTheDocument();
  });

  it('dualText: renders both title and description', () => {
    render(<Alert variant="white" alertStyle="dualText" title="Title" description="Desc" />);
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Desc')).toBeInTheDocument();
  });

  it('dualText without description: renders title only', () => {
    render(<Alert variant="black" alertStyle="dualText" title="Title Only" />);
    expect(screen.getByText('Title Only')).toBeInTheDocument();
  });

  // Exhaustive combo test
  it('all variant × style × size combinations render without error', () => {
    for (const v of TARMAC_VARIANTS) {
      for (const s of TARMAC_STYLES) {
        for (const sz of TARMAC_SIZES) {
          const { unmount } = render(
            <Alert variant={v} alertStyle={s} size={sz} title="Combo" description="Desc" />
          );
          expect(screen.getByRole('alert')).toBeInTheDocument();
          unmount();
        }
      }
    }
  });

  // Leading / Trailing icons
  it('renders leadingIcon', () => {
    const icon = <span data-testid="lead-icon">★</span>;
    render(<Alert variant="white" title="Test" leadingIcon={icon} />);
    expect(screen.getByTestId('lead-icon')).toBeInTheDocument();
  });

  it('renders trailingIcon', () => {
    const icon = <span data-testid="trail-icon">✕</span>;
    render(<Alert variant="black" title="Test" trailingIcon={icon} />);
    expect(screen.getByTestId('trail-icon')).toBeInTheDocument();
  });

  it('renders both leading and trailing icons', () => {
    const lead = <span data-testid="lead">L</span>;
    const trail = <span data-testid="trail">T</span>;
    render(<Alert variant="coal" title="Test" leadingIcon={lead} trailingIcon={trail} />);
    expect(screen.getByTestId('lead')).toBeInTheDocument();
    expect(screen.getByTestId('trail')).toBeInTheDocument();
  });

  it('no icons when not passed', () => {
    render(<Alert variant="white" title="No icons" />);
    expect(screen.queryByTestId('lead-icon')).not.toBeInTheDocument();
    expect(screen.queryByTestId('trail-icon')).not.toBeInTheDocument();
  });

  // CTAs
  it('renders custom ctaActions when showCtas is true', () => {
    render(
      <Alert variant="white" title="CTA" showCtas ctaActions={<button>Action</button>} />
    );
    expect(screen.getByText('Action')).toBeInTheDocument();
  });

  it('does not render ctaActions when showCtas is false', () => {
    render(
      <Alert variant="white" title="No CTA" ctaActions={<button>Action</button>} />
    );
    expect(screen.queryByText('Action')).not.toBeInTheDocument();
  });

  it('renders default Orca Buttons when showCtas=true and no ctaActions', () => {
    render(<Alert variant="white" title="Default CTAs" showCtas />);
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Proceed')).toBeInTheDocument();
  });

  it('default Cancel button fires onCancel', () => {
    const onCancel = jest.fn();
    render(<Alert variant="white" title="Test" showCtas onCancel={onCancel} />);
    fireEvent.click(screen.getByText('Cancel'));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('default Proceed button fires onProceed', () => {
    const onProceed = jest.fn();
    render(<Alert variant="white" title="Test" showCtas onProceed={onProceed} />);
    fireEvent.click(screen.getByText('Proceed'));
    expect(onProceed).toHaveBeenCalledTimes(1);
  });

  it('supports custom cancelText and proceedText', () => {
    render(<Alert variant="white" title="Test" showCtas cancelText="Dismiss" proceedText="Confirm" />);
    expect(screen.getByText('Dismiss')).toBeInTheDocument();
    expect(screen.getByText('Confirm')).toBeInTheDocument();
  });

  it('prefers ctaActions over default buttons when both provided', () => {
    render(
      <Alert variant="white" title="Test" showCtas ctaActions={<button>Custom</button>} />
    );
    expect(screen.getByText('Custom')).toBeInTheDocument();
    expect(screen.queryByText('Cancel')).not.toBeInTheDocument();
    expect(screen.queryByText('Proceed')).not.toBeInTheDocument();
  });

  // Variant-specific button mapping (from Figma)
  it.each([
    ['white', 'black'],
    ['black', 'white'],
    ['coal', 'white'],
    ['success', 'success'],
    ['error', 'error'],
    ['info', 'info'],
    ['warning', 'warning'],
  ] as const)('alert variant=%s renders default buttons with variant=%s', (alertVariant, expectedBtnVariant) => {
    render(<Alert variant={alertVariant} title="Test" showCtas />);
    const proceedBtn = screen.getByText('Proceed');
    expect(proceedBtn).toBeInTheDocument();
    expect(proceedBtn.getAttribute('data-button-variant')).toBe(expectedBtnVariant);
    expect(proceedBtn.getAttribute('data-button-style')).toBe('primary');
    const cancelBtn = screen.getByText('Cancel');
    expect(cancelBtn.getAttribute('data-button-variant')).toBe(expectedBtnVariant);
    expect(cancelBtn.getAttribute('data-button-style')).toBe('tertiary');
  });

  it('default buttons use size=sm when alert size=sm', () => {
    render(<Alert variant="white" size="sm" title="Test" showCtas />);
    const proceedBtn = screen.getByText('Proceed');
    expect(proceedBtn.getAttribute('data-button-size')).toBe('sm');
  });

  it('default buttons use size=md when alert size=lg', () => {
    render(<Alert variant="white" size="lg" title="Test" showCtas />);
    const proceedBtn = screen.getByText('Proceed');
    expect(proceedBtn.getAttribute('data-button-size')).toBe('md');
  });

  // Closable
  it('renders close button in Tarmac mode', () => {
    render(<Alert variant="white" title="Closable" closable />);
    expect(screen.getByLabelText('Close alert')).toBeInTheDocument();
  });

  it('close button fires onClose in Tarmac mode', () => {
    const onClose = jest.fn();
    render(<Alert variant="info" title="Close me" closable onClose={onClose} />);
    fireEvent.click(screen.getByLabelText('Close alert'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  // Children in Tarmac mode
  it('renders children in Tarmac mode', () => {
    render(<Alert variant="white"><span>Custom child</span></Alert>);
    expect(screen.getByText('Custom child')).toBeInTheDocument();
  });

  // HTML attributes
  it('applies className in Tarmac mode', () => {
    render(<Alert variant="white" title="Test" className="tarmac-custom" />);
    expect(screen.getByRole('alert')).toHaveClass('tarmac-custom');
  });

  it('forwards ref in Tarmac mode', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Alert ref={ref} variant="black" title="Ref test" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('passes through data-testid in Tarmac mode', () => {
    render(<Alert variant="coal" title="Test" data-testid="tarmac-alert" />);
    expect(screen.getByTestId('tarmac-alert')).toBeInTheDocument();
  });
});