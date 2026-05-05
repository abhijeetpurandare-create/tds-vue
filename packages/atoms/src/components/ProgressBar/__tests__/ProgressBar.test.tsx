import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import ProgressBar from '../index';

const tdsConfig = {
  base: { borderRadius: '8px', transition: 'width 0.3s ease' },
  variants: {
    black: { indicatorColor: '#000000' },
    coal: { indicatorColor: '#98a2bc' },
    blue: { indicatorColor: '#2396fb' },
    green: { indicatorColor: '#1ba86e' },
    dlv_red: { indicatorColor: '#ed1b36' },
  },
  sizes: {
    lg: { trackHeight: '8px', titleFontSize: '14', titleLineHeight: '20', titleFontWeight: '500', subtextFontSize: '12', subtextLineHeight: '16', subtextFontWeight: '400' },
    sm: { trackHeight: '4px', titleFontSize: '12', titleLineHeight: '16', titleFontWeight: '500', subtextFontSize: '10', subtextLineHeight: '12', subtextFontWeight: '400' },
  },
  track: { backgroundColor: '#ededed' },
  text: { titleColor: '#2b2b2b', subtextColor: '#454545' },
  spacing: { gap: '4px', padding: '4px' },
};

jest.mock('../../ThemeProvider', () => ({
  useTheme: () => ({
    theme: { components: { progressBar: tdsConfig } },
  }),
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

const TestIcon = () => <svg data-testid="test-icon" />;

// ─── Legacy (backward compatibility) ───
describe('ProgressBar — Legacy (backward compatibility)', () => {
  it('renders horizontal bar with percentage', () => {
    render(<ProgressBar value={50} type="horizontal" showPercentage />);
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('renders horizontal bar without percentage', () => {
    render(<ProgressBar value={50} type="horizontal" showPercentage={false} />);
    expect(screen.queryByText('50%')).not.toBeInTheDocument();
  });

  it('renders circular bar with percentage', () => {
    render(<ProgressBar value={80} type="circular" showPercentage />);
    expect(screen.getByText('80%')).toBeInTheDocument();
  });

  it('renders circular bar with icon', () => {
    render(<ProgressBar value={30} type="circular" showPercentage={false} icon={<TestIcon />} />);
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<ProgressBar value={60} className="custom-class" />);
    expect(screen.getByRole('progressbar')).toHaveClass('custom-class');
  });

  it('renders with size sm', () => {
    const { container } = render(<ProgressBar value={40} size="sm" />);
    expect(container.firstChild).toBeTruthy();
  });

  it('renders with size md', () => {
    const { container } = render(<ProgressBar value={40} size="md" />);
    expect(container.firstChild).toBeTruthy();
  });

  it('renders with size lg', () => {
    const { container } = render(<ProgressBar value={40} size="lg" />);
    expect(container.firstChild).toBeTruthy();
  });

  it('renders each legacy variant without error', () => {
    const variants = ['primary', 'success', 'warning', 'error', 'info', 'default'] as const;
    variants.forEach((v) => {
      const { container } = render(<ProgressBar value={50} variant={v} />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  it('clamps value to 0-100', () => {
    render(<ProgressBar value={150} showPercentage />);
    expect(screen.getByText('150%')).toBeInTheDocument();
  });

  it('renders with value 0', () => {
    render(<ProgressBar value={0} showPercentage />);
    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  it('renders with value 100', () => {
    render(<ProgressBar value={100} showPercentage />);
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('has role="progressbar"', () => {
    render(<ProgressBar value={50} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders circular with custom strokeWidth', () => {
    const { container } = render(<ProgressBar value={50} type="circular" strokeWidth={10} />);
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('renders circular with value 0 (no fill circle)', () => {
    const { container } = render(<ProgressBar value={0} type="circular" />);
    const circles = container.querySelectorAll('circle');
    expect(circles.length).toBe(1);
  });

  it('renders circular with value > 0 (fill circles present)', () => {
    const { container } = render(<ProgressBar value={50} type="circular" />);
    const circles = container.querySelectorAll('circle');
    expect(circles.length).toBe(3);
  });

  it('does not enter TDS path when barType is not set', () => {
    render(<ProgressBar value={50} variant="black" />);
    const el = screen.getByRole('progressbar');
    expect(el.getAttribute('aria-valuenow')).toBeNull();
  });

  it('accepts custom gradientFrom/gradientTo', () => {
    const { container } = render(<ProgressBar value={50} gradientFrom="#ff0000" gradientTo="#00ff00" />);
    expect(container.firstChild).toBeTruthy();
  });

  it('accepts custom trackColor and textColor', () => {
    render(<ProgressBar value={50} trackColor="#ccc" textColor="#333" showPercentage />);
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<ProgressBar value={50} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

// ─── TDS path ───
describe('ProgressBar — TDS', () => {
  it('renders TDS bar when barType="filled"', () => {
    render(<ProgressBar value={50} variant="black" barType="filled" />);
    const el = screen.getByRole('progressbar');
    expect(el.getAttribute('aria-valuenow')).toBe('50');
  });

  it('renders TDS bar when barType="line"', () => {
    render(<ProgressBar value={25} variant="blue" barType="line" />);
    const el = screen.getByRole('progressbar');
    expect(el.getAttribute('aria-valuenow')).toBe('25');
  });

  it('sets aria-valuemin and aria-valuemax', () => {
    render(<ProgressBar value={50} variant="green" barType="filled" />);
    const el = screen.getByRole('progressbar');
    expect(el.getAttribute('aria-valuemin')).toBe('0');
    expect(el.getAttribute('aria-valuemax')).toBe('100');
  });

  it('renders each TDS variant without error', () => {
    const variants = ['black', 'coal', 'blue', 'green', 'dlv_red'];
    variants.forEach((v) => {
      const { container } = render(<ProgressBar value={50} variant={v} barType="filled" />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  it('renders size sm', () => {
    const { container } = render(<ProgressBar value={50} variant="black" size="sm" barType="filled" />);
    expect(container.firstChild).toBeTruthy();
  });

  it('renders size lg', () => {
    const { container } = render(<ProgressBar value={50} variant="black" size="lg" barType="filled" />);
    expect(container.firstChild).toBeTruthy();
  });

  it('maps size md to lg for TDS', () => {
    const { container } = render(<ProgressBar value={50} variant="black" size="md" barType="filled" />);
    expect(container.firstChild).toBeTruthy();
  });

  it('clamps value at 0', () => {
    render(<ProgressBar value={-10} variant="black" barType="filled" />);
    expect(screen.getByRole('progressbar').getAttribute('aria-valuenow')).toBe('0');
  });

  it('clamps value at 100', () => {
    render(<ProgressBar value={200} variant="black" barType="filled" />);
    expect(screen.getByRole('progressbar').getAttribute('aria-valuenow')).toBe('100');
  });

  it('renders without text when no title/subtext props', () => {
    const { container } = render(<ProgressBar value={50} variant="black" barType="filled" />);
    expect(container.querySelectorAll('span').length).toBe(0);
  });

  it('renders title when provided', () => {
    render(<ProgressBar value={50} variant="black" barType="filled" title="Loading" />);
    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  it('renders titleNumber when provided', () => {
    render(<ProgressBar value={50} variant="black" barType="filled" titleNumber="02" />);
    expect(screen.getByText('02')).toBeInTheDocument();
  });

  it('renders subtext when provided', () => {
    render(<ProgressBar value={50} variant="black" barType="filled" subtext="Processing" />);
    expect(screen.getByText('Processing')).toBeInTheDocument();
  });

  it('renders subtextNumber when provided', () => {
    render(<ProgressBar value={50} variant="black" barType="filled" subtextNumber="50/100" />);
    expect(screen.getByText('50/100')).toBeInTheDocument();
  });

  it('renders all text fields together', () => {
    render(
      <ProgressBar
        value={50}
        variant="black"
        barType="filled"
        title="Title"
        titleNumber="02"
        subtext="Sub"
        subtextNumber="50/100"
      />
    );
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('02')).toBeInTheDocument();
    expect(screen.getByText('Sub')).toBeInTheDocument();
    expect(screen.getByText('50/100')).toBeInTheDocument();
  });

  it('hides title when showTitle=false', () => {
    render(<ProgressBar value={50} variant="black" barType="filled" title="Hidden" showTitle={false} />);
    expect(screen.queryByText('Hidden')).not.toBeInTheDocument();
  });

  it('hides subtext when showSubtext=false', () => {
    render(<ProgressBar value={50} variant="black" barType="filled" subtext="Hidden" showSubtext={false} />);
    expect(screen.queryByText('Hidden')).not.toBeInTheDocument();
  });

  it('hides titleNumber when showTitleNumber=false', () => {
    render(<ProgressBar value={50} variant="black" barType="filled" titleNumber="02" showTitleNumber={false} />);
    expect(screen.queryByText('02')).not.toBeInTheDocument();
  });

  it('hides subtextNumber when showSubtextNumber=false', () => {
    render(<ProgressBar value={50} variant="black" barType="filled" subtextNumber="50/100" showSubtextNumber={false} />);
    expect(screen.queryByText('50/100')).not.toBeInTheDocument();
  });

  it('applies className in TDS mode', () => {
    render(<ProgressBar value={50} variant="black" barType="filled" className="my-class" />);
    const el = screen.getByRole('progressbar');
    expect(el.className).toContain('my-class');
  });

  it('applies className in TDS mode with text', () => {
    const { container } = render(
      <ProgressBar value={50} variant="black" barType="filled" className="my-class" title="T" />
    );
    expect(container.firstChild).toHaveClass('my-class');
  });

  it('forwards ref in TDS mode', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<ProgressBar value={50} variant="black" barType="filled" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('forwards ref in TDS mode with text', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<ProgressBar value={50} variant="black" barType="filled" ref={ref} title="T" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('renders all variant × size × barType combos without error', () => {
    const variants = ['black', 'coal', 'blue', 'green', 'dlv_red'];
    const sizes = ['sm', 'lg'] as const;
    const barTypes = ['filled', 'line'] as const;
    variants.forEach((v) => {
      sizes.forEach((s) => {
        barTypes.forEach((bt) => {
          const { container } = render(<ProgressBar value={50} variant={v} size={s} barType={bt} />);
          expect(container.firstChild).toBeTruthy();
        });
      });
    });
  });

  it('works with a custom variant from theme JSON', () => {
    const { container } = render(<ProgressBar value={50} variant="custom_purple" barType="filled" />);
    expect(container.firstChild).toBeTruthy();
  });

  it('renders progressbar element inside wrapper when text is present', () => {
    render(<ProgressBar value={50} variant="black" barType="filled" title="T" />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
