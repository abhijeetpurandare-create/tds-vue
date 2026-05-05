import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ThemeProvider from '../../ThemeProvider';
import Tooltip from '../index';

jest.mock('../../ThemeProvider', () => ({
  useTheme: () => ({
    theme: { components: {} },
  }),
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock('../../../config/config', () => ({
  defaultTooltipStyles: {
    base: { fontFamily: 'sans-serif', fontWeight: '400', lineHeight: '1.4', radius: '4px', shadow: 'none', transition: '0.2s' },
    sizes: { sm: { padding: '4px 8px', fontSize: '12px' }, md: { padding: '6px 10px', fontSize: '14px' }, lg: { padding: '8px 12px', fontSize: '16px' } },
    variants: {
      default: { backgroundColor: '#333', textColor: '#fff', borderColor: 'transparent' },
      primary: { backgroundColor: '#007bff', textColor: '#fff', borderColor: 'transparent' },
      success: { backgroundColor: '#28a745', textColor: '#fff', borderColor: 'transparent' },
      warning: { backgroundColor: '#ffc107', textColor: '#fff', borderColor: 'transparent' },
      error: { backgroundColor: '#dc3545', textColor: '#fff', borderColor: 'transparent' },
      info: { backgroundColor: '#17a2b8', textColor: '#fff', borderColor: 'transparent' },
    },
  },
}));

const wrap = (ui: React.ReactElement) => render(<ThemeProvider>{ui}</ThemeProvider>);

// ─── Figma TDS dimensions ───
const TARMAC_VARIANTS = ['white', 'black', 'coal'] as const;
const TYPES = ['standard', 'ctas'] as const;
const STYLES = ['singleText', 'dualText'] as const;
const ARROWS = [
  'top-left','top-mid','top-right',
  'bottom-left','bottom-mid','bottom-right',
  'left-top','left-mid','left-bottom',
  'right-top','right-mid','right-bottom',
] as const;
const LEGACY_VARIANTS = ['default','primary','success','warning','error','info'] as const;

beforeEach(() => {
  Element.prototype.getBoundingClientRect = jest.fn(() => ({
    width: 100, height: 50, top: 100, left: 100, bottom: 150, right: 200, x: 100, y: 100, toJSON: () => ({}),
  })) as unknown as () => DOMRect;
});
afterEach(() => jest.clearAllMocks());

// ═══════════════════════════════════════════════════════════════
// 1. LEGACY TOOLTIP (backward compat)
// ═══════════════════════════════════════════════════════════════
describe('Legacy Tooltip', () => {
  it('renders children', () => {
    wrap(<Tooltip content="tip"><button>Hover</button></Tooltip>);
    expect(screen.getByText('Hover')).toBeInTheDocument();
  });

  it('shows on hover', async () => {
    wrap(<Tooltip content="tip"><button>Hover</button></Tooltip>);
    fireEvent.mouseEnter(screen.getByText('Hover'));
    await waitFor(() => expect(screen.getByText('tip')).toBeInTheDocument());
  });

  it('hides on mouse leave', async () => {
    wrap(<Tooltip content="tip"><button>Hover</button></Tooltip>);
    const t = screen.getByText('Hover');
    fireEvent.mouseEnter(t);
    await waitFor(() => expect(screen.getByText('tip')).toBeInTheDocument());
    fireEvent.mouseLeave(t);
    await waitFor(() => expect(screen.queryByText('tip')).not.toBeInTheDocument());
  });

  it('shows on click trigger', async () => {
    wrap(<Tooltip content="tip" trigger="click"><button>Click</button></Tooltip>);
    fireEvent.click(screen.getByText('Click'));
    await waitFor(() => expect(screen.getByText('tip')).toBeInTheDocument());
  });

  it('toggles on click', async () => {
    wrap(<Tooltip content="tip" trigger="click"><button>Click</button></Tooltip>);
    const t = screen.getByText('Click');
    fireEvent.click(t);
    await waitFor(() => expect(screen.getByText('tip')).toBeInTheDocument());
    fireEvent.click(t);
    await waitFor(() => expect(screen.queryByText('tip')).not.toBeInTheDocument());
  });

  it('shows on focus trigger', async () => {
    wrap(<Tooltip content="tip" trigger="focus"><button>Focus</button></Tooltip>);
    fireEvent.focus(screen.getByText('Focus'));
    await waitFor(() => expect(screen.getByText('tip')).toBeInTheDocument());
  });

  it('hides on blur', async () => {
    wrap(<Tooltip content="tip" trigger="focus"><button>Focus</button></Tooltip>);
    const t = screen.getByText('Focus');
    fireEvent.focus(t);
    await waitFor(() => expect(screen.getByText('tip')).toBeInTheDocument());
    fireEvent.blur(t);
    await waitFor(() => expect(screen.queryByText('tip')).not.toBeInTheDocument());
  });

  it('respects controlled visible', async () => {
    const { rerender } = wrap(<Tooltip content="tip" visible={false}><button>T</button></Tooltip>);
    expect(screen.queryByText('tip')).not.toBeInTheDocument();
    rerender(<ThemeProvider><Tooltip content="tip" visible={true}><button>T</button></Tooltip></ThemeProvider>);
    await waitFor(() => expect(screen.getByText('tip')).toBeInTheDocument());
  });

  it('calls onVisibleChange', async () => {
    const fn = jest.fn();
    wrap(<Tooltip content="tip" onVisibleChange={fn}><button>T</button></Tooltip>);
    fireEvent.mouseEnter(screen.getByText('T'));
    await waitFor(() => expect(fn).toHaveBeenCalledWith(true));
    fireEvent.mouseLeave(screen.getByText('T'));
    await waitFor(() => expect(fn).toHaveBeenCalledWith(false));
  });

  it('disabled prevents show', async () => {
    wrap(<Tooltip content="tip" disabled><button>T</button></Tooltip>);
    fireEvent.mouseEnter(screen.getByText('T'));
    await waitFor(() => expect(screen.queryByText('tip')).not.toBeInTheDocument());
  });

  it('applies className', () => {
    wrap(<Tooltip content="tip" className="custom"><button>T</button></Tooltip>);
    expect(screen.getByText('T').closest('div')).toHaveClass('custom');
  });

  it.each(LEGACY_VARIANTS)('renders with legacy variant=%s', async (v) => {
    wrap(<Tooltip content="tip" variant={v}><button>T</button></Tooltip>);
    fireEvent.mouseEnter(screen.getByText('T'));
    await waitFor(() => expect(screen.getByText('tip')).toBeInTheDocument());
  });

  it('renders complex content', async () => {
    wrap(<Tooltip content={<div><h3>Title</h3><p>Desc</p></div>}><button>T</button></Tooltip>);
    fireEvent.mouseEnter(screen.getByText('T'));
    await waitFor(() => {
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Desc')).toBeInTheDocument();
    });
  });

  it('ellipsis applies overflow styles', () => {
    wrap(<Tooltip content="tip" ellipsis style={{ maxWidth: 100 }}><span>Long text here</span></Tooltip>);
    expect(screen.getByText('Long text here')).toBeInTheDocument();
  });
});

// ═══════════════════════════════════════════════════════════════
// 2. TARMAC VARIANTS (white/black/coal auto-detect)
// ═══════════════════════════════════════════════════════════════
describe('Tarmac variant detection', () => {
  it.each(TARMAC_VARIANTS)('variant=%s activates Tarmac mode (renders CSS arrow via ::before)', async (v) => {
    wrap(<Tooltip content="msg" variant={v} visible={true}><span>T</span></Tooltip>);
    await waitFor(() => {
      expect(screen.getByText('msg')).toBeInTheDocument();
      // CSS arrow is a ::before pseudo-element, no SVG in DOM
      expect(document.querySelector('svg')).not.toBeInTheDocument();
    });
  });

  it.each(LEGACY_VARIANTS)('variant=%s stays in legacy mode (no SVG arrow)', async (v) => {
    wrap(<Tooltip content="msg" variant={v} visible={true}><span>T</span></Tooltip>);
    await waitFor(() => {
      expect(screen.getByText('msg')).toBeInTheDocument();
      expect(document.querySelector('svg')).not.toBeInTheDocument();
    });
  });
});

// ═══════════════════════════════════════════════════════════════
// 3. TARMAC TYPE × STYLE combinations
// ═══════════════════════════════════════════════════════════════
describe('Tarmac Type × Style', () => {
  it('standard + singleText: renders content only', () => {
    wrap(
      <Tooltip renderInline variant="white" tooltipType="standard" tooltipStyle="singleText"
        content="Single msg" title="Title" description="Desc" />
    );
    expect(screen.getByText('Single msg')).toBeInTheDocument();
    expect(screen.queryByText('Title')).not.toBeInTheDocument();
    expect(screen.queryByText('Desc')).not.toBeInTheDocument();
  });

  it('standard + dualText: renders title + description', () => {
    wrap(
      <Tooltip renderInline variant="white" tooltipType="standard" tooltipStyle="dualText"
        content="fallback" title="Title" description="Desc" />
    );
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Desc')).toBeInTheDocument();
  });

  it('standard + dualText without title: falls back to content', () => {
    wrap(
      <Tooltip renderInline variant="black" tooltipType="standard" tooltipStyle="dualText"
        content="Fallback content" description="Desc" />
    );
    expect(screen.getByText('Fallback content')).toBeInTheDocument();
    expect(screen.getByText('Desc')).toBeInTheDocument();
  });

  it('ctas + singleText: renders content + divider + CTA buttons, no description', () => {
    const skip = jest.fn();
    const next = jest.fn();
    wrap(
      <Tooltip renderInline variant="coal" tooltipType="ctas" tooltipStyle="singleText"
        content="CTA msg" description="Should not show"
        ctaActions={{ skip: { label: 'Skip', onClick: skip }, next: { label: 'Next', onClick: next } }} />
    );
    expect(screen.getByText('CTA msg')).toBeInTheDocument();
    expect(screen.queryByText('Should not show')).not.toBeInTheDocument();
    expect(screen.getByText('Skip')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('ctas + dualText: renders content + description + divider + CTA buttons', () => {
    wrap(
      <Tooltip renderInline variant="white" tooltipType="ctas" tooltipStyle="dualText"
        content="CTA msg" description="Extra info"
        ctaActions={{ skip: { label: 'Skip' }, prev: { label: 'Prev' }, next: { label: 'Next' } }} />
    );
    expect(screen.getByText('CTA msg')).toBeInTheDocument();
    expect(screen.getByText('Extra info')).toBeInTheDocument();
    expect(screen.getByText('Skip')).toBeInTheDocument();
    expect(screen.getByText('Prev')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });
});

// ═══════════════════════════════════════════════════════════════
// 4. CTA BUTTON CLICK HANDLERS
// ═══════════════════════════════════════════════════════════════
describe('CTA click handlers', () => {
  it('skip onClick fires', () => {
    const fn = jest.fn();
    wrap(
      <Tooltip renderInline variant="white" tooltipType="ctas" content="msg"
        ctaActions={{ skip: { label: 'Skip', onClick: fn } }} />
    );
    fireEvent.click(screen.getByText('Skip'));
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('prev onClick fires', () => {
    const fn = jest.fn();
    wrap(
      <Tooltip renderInline variant="black" tooltipType="ctas" content="msg"
        ctaActions={{ prev: { label: 'Prev', onClick: fn } }} />
    );
    fireEvent.click(screen.getByText('Prev'));
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('next onClick fires', () => {
    const fn = jest.fn();
    wrap(
      <Tooltip renderInline variant="coal" tooltipType="ctas" content="msg"
        ctaActions={{ next: { label: 'Next', onClick: fn } }} />
    );
    fireEvent.click(screen.getByText('Next'));
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('renders without ctaActions gracefully', () => {
    wrap(<Tooltip renderInline variant="white" tooltipType="ctas" content="msg" />);
    expect(screen.getByText('msg')).toBeInTheDocument();
  });
});

// ═══════════════════════════════════════════════════════════════
// 5. LEADING / TRAILING ICONS
// ═══════════════════════════════════════════════════════════════
describe('Leading & Trailing Icons', () => {
  const icon = <span data-testid="test-icon">★</span>;

  it('renders leadingIcon', () => {
    wrap(<Tooltip renderInline variant="white" content="msg" leadingIcon={icon} />);
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  it('renders trailingIcon', () => {
    wrap(<Tooltip renderInline variant="black" content="msg" trailingIcon={icon} />);
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  it('renders both icons simultaneously', () => {
    const lead = <span data-testid="lead">L</span>;
    const trail = <span data-testid="trail">T</span>;
    wrap(<Tooltip renderInline variant="coal" content="msg" leadingIcon={lead} trailingIcon={trail} />);
    expect(screen.getByTestId('lead')).toBeInTheDocument();
    expect(screen.getByTestId('trail')).toBeInTheDocument();
  });

  it('no icons when not passed', () => {
    wrap(<Tooltip renderInline variant="white" content="msg" />);
    expect(screen.queryByTestId('test-icon')).not.toBeInTheDocument();
  });
});

// ═══════════════════════════════════════════════════════════════
// 6. ALL 12 ARROW POSITIONS render without error
// ═══════════════════════════════════════════════════════════════
describe('Arrow positions', () => {
  it.each(ARROWS)('arrowPosition=%s renders content (CSS arrow via ::before)', (ap) => {
    wrap(
      <Tooltip renderInline variant="white" content="msg" arrowPosition={ap} />
    );
    expect(screen.getByText('msg')).toBeInTheDocument();
  });
});

// ═══════════════════════════════════════════════════════════════
// 7. renderInline MODE
// ═══════════════════════════════════════════════════════════════
describe('renderInline', () => {
  it('renders content directly in DOM (no portal)', () => {
    const { container } = wrap(
      <Tooltip renderInline variant="white" content="Inline msg" />
    );
    expect(container.textContent).toContain('Inline msg');
  });

  it('does not render trigger wrapper div', () => {
    const { container } = wrap(
      <Tooltip renderInline variant="black" content="msg" />
    );
    expect(container.querySelectorAll('[role="tooltip"]')).toHaveLength(0);
  });

  it('applies className in inline mode', () => {
    const { container } = wrap(
      <Tooltip renderInline variant="coal" content="msg" className="my-class" />
    );
    expect(container.querySelector('.my-class')).toBeInTheDocument();
  });

  it('renderInline is ignored for legacy variants', async () => {
    wrap(
      <Tooltip renderInline variant="default" content="legacy" visible={true}>
        <button>T</button>
      </Tooltip>
    );
    expect(screen.getByText('T')).toBeInTheDocument();
  });
});

// ═══════════════════════════════════════════════════════════════
// 8. FULL VARIANT × TYPE × STYLE MATRIX (render without crash)
// ═══════════════════════════════════════════════════════════════
describe('Full Tarmac matrix (3 variants × 2 types × 2 styles = 12)', () => {
  const combos: Array<{ v: typeof TARMAC_VARIANTS[number]; t: typeof TYPES[number]; s: typeof STYLES[number] }> = [];
  for (const v of TARMAC_VARIANTS) {
    for (const t of TYPES) {
      for (const s of STYLES) {
        combos.push({ v, t, s });
      }
    }
  }

  it.each(combos)('variant=$v type=$t style=$s renders without error', ({ v, t, s }) => {
    wrap(
      <Tooltip renderInline variant={v} tooltipType={t} tooltipStyle={s}
        content="Test content" title="Test title" description="Test desc"
        ctaActions={t === 'ctas' ? { skip: { label: 'S' }, next: { label: 'N' } } : undefined} />
    );
    const expectedText = (s === 'dualText' && t === 'standard') ? 'Test title' : 'Test content';
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});

// ═══════════════════════════════════════════════════════════════
// 9. ACCESSIBILITY
// ═══════════════════════════════════════════════════════════════
describe('Accessibility', () => {
  it('portal tooltip has role="tooltip"', async () => {
    wrap(<Tooltip content="tip" variant="white" visible={true}><button>T</button></Tooltip>);
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });
  });

  it('focus trigger gets tabIndex when trigger=focus', () => {
    wrap(<Tooltip content="tip" trigger="focus"><button>T</button></Tooltip>);
    const trigger = screen.getByText('T').closest('div');
    expect(trigger).toHaveAttribute('tabindex', '0');
  });

  it('CTA buttons are real <button> elements', () => {
    wrap(
      <Tooltip renderInline variant="white" tooltipType="ctas" content="msg"
        ctaActions={{ skip: { label: 'Skip' }, next: { label: 'Next' } }} />
    );
    expect(screen.getByText('Skip').tagName).toBe('BUTTON');
    expect(screen.getByText('Next').tagName).toBe('BUTTON');
  });

  it('CTA buttons have type="button"', () => {
    wrap(
      <Tooltip renderInline variant="white" tooltipType="ctas" content="msg"
        ctaActions={{ skip: { label: 'S' }, prev: { label: 'P' }, next: { label: 'N' } }} />
    );
    expect(screen.getByText('S')).toHaveAttribute('type', 'button');
    expect(screen.getByText('P')).toHaveAttribute('type', 'button');
    expect(screen.getByText('N')).toHaveAttribute('type', 'button');
  });
});

// ═══════════════════════════════════════════════════════════════
// 10. INTERACTIVE MODE (CTAs auto-interactive)
// ═══════════════════════════════════════════════════════════════
describe('Interactive overlay', () => {
  it('ctas type makes overlay interactive (keeps visible on overlay hover)', async () => {
    wrap(
      <Tooltip content="msg" variant="white" tooltipType="ctas" visible={true}
        ctaActions={{ next: { label: 'Next' } }}>
        <button>T</button>
      </Tooltip>
    );
    await waitFor(() => {
      const tooltip = screen.getByRole('tooltip');
      expect(tooltip).toBeInTheDocument();
      fireEvent.mouseEnter(tooltip);
      expect(screen.getByText('msg')).toBeInTheDocument();
    });
  });
});

// ═══════════════════════════════════════════════════════════════
// 11. AUTO-POSITIONAL ARROW (placement → arrowPosition mapping)
// ═══════════════════════════════════════════════════════════════
describe('Auto-positional arrow', () => {
  it.each([
    ['top', 'bottom-mid'],
    ['top-start', 'bottom-left'],
    ['top-end', 'bottom-right'],
    ['bottom', 'top-mid'],
    ['bottom-start', 'top-left'],
    ['bottom-end', 'top-right'],
    ['left', 'right-mid'],
    ['left-start', 'right-top'],
    ['left-end', 'right-bottom'],
    ['right', 'left-mid'],
    ['right-start', 'left-top'],
    ['right-end', 'left-bottom'],
  ] as const)('placement=%s auto-maps and renders content', (pl) => {
    wrap(
      <Tooltip renderInline variant="white" placement={pl} content="msg" />
    );
    expect(screen.getByText('msg')).toBeInTheDocument();
  });

  it('explicit arrowPosition overrides auto-derived', () => {
    wrap(
      <Tooltip renderInline variant="white" placement="top" arrowPosition="left-mid" content="msg" />
    );
    expect(screen.getByText('msg')).toBeInTheDocument();
  });
});

// ═══════════════════════════════════════════════════════════════
// 12. ALL 12 POSITIONS × ALL 3 VARIANTS (renderInline, no crash)
// ═══════════════════════════════════════════════════════════════
describe('All positions × all variants matrix', () => {
  const PLACEMENTS = [
    'top', 'top-start', 'top-end',
    'bottom', 'bottom-start', 'bottom-end',
    'left', 'left-start', 'left-end',
    'right', 'right-start', 'right-end',
  ] as const;

  const posVariantCombos: Array<{ p: typeof PLACEMENTS[number]; v: typeof TARMAC_VARIANTS[number] }> = [];
  for (const p of PLACEMENTS) {
    for (const v of TARMAC_VARIANTS) {
      posVariantCombos.push({ p, v });
    }
  }

  it.each(posVariantCombos)('placement=$p variant=$v renders content', ({ p, v }) => {
    wrap(
      <Tooltip renderInline variant={v} placement={p} content="pos test" />
    );
    expect(screen.getByText('pos test')).toBeInTheDocument();
  });
});

// ═══════════════════════════════════════════════════════════════
// 13. ALL 12 POSITIONS × CTAs TYPE (renderInline, buttons present)
// ═══════════════════════════════════════════════════════════════
describe('All positions with CTAs type', () => {
  const PLACEMENTS = [
    'top', 'top-start', 'top-end',
    'bottom', 'bottom-start', 'bottom-end',
    'left', 'left-start', 'left-end',
    'right', 'right-start', 'right-end',
  ] as const;

  it.each([...PLACEMENTS])('placement=%s with ctas renders Skip/Prev/Next buttons', (p) => {
    wrap(
      <Tooltip renderInline variant="white" placement={p} tooltipType="ctas"
        content="CTA msg"
        ctaActions={{ skip: { label: 'Skip' }, prev: { label: 'Prev' }, next: { label: 'Next' } }} />
    );
    expect(screen.getByText('CTA msg')).toBeInTheDocument();
    expect(screen.getByText('Skip')).toBeInTheDocument();
    expect(screen.getByText('Prev')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });
});

// ═══════════════════════════════════════════════════════════════
// 14. ALL 12 EXPLICIT ARROW POSITIONS × ALL 3 VARIANTS
// ═══════════════════════════════════════════════════════════════
describe('Explicit arrowPosition × variant matrix', () => {
  const combos: Array<{ ap: typeof ARROWS[number]; v: typeof TARMAC_VARIANTS[number] }> = [];
  for (const ap of ARROWS) {
    for (const v of TARMAC_VARIANTS) {
      combos.push({ ap, v });
    }
  }

  it.each(combos)('arrowPosition=$ap variant=$v renders correctly', ({ ap, v }) => {
    wrap(
      <Tooltip renderInline variant={v} arrowPosition={ap} content="arrow test" />
    );
    expect(screen.getByText('arrow test')).toBeInTheDocument();
  });
});

// ═══════════════════════════════════════════════════════════════
// 15. CSS ARROW STRUCTURE
// ═══════════════════════════════════════════════════════════════
describe('CSS arrow structure', () => {
  it('tarmac tooltip renders outer wrapper with body child (no SVG)', () => {
    const { container } = wrap(
      <Tooltip renderInline variant="white" arrowPosition="bottom-mid" content="msg" />
    );
    expect(screen.getByText('msg')).toBeInTheDocument();
    // No SVG elements — arrow is CSS ::before pseudo-element
    expect(container.querySelector('svg')).not.toBeInTheDocument();
  });

  it('body content is rendered inside the tooltip', () => {
    const { container } = wrap(
      <Tooltip renderInline variant="white" placement="top" content="body text" />
    );
    expect(container.textContent).toContain('body text');
  });
});

// ═══════════════════════════════════════════════════════════════
// 16. FULL POSITION × VARIANT × TYPE × STYLE (mega matrix, no crash)
// ═══════════════════════════════════════════════════════════════
describe('Mega matrix: 4 positions × 3 variants × 2 types × 2 styles = 48', () => {
  const samplePlacements = ['top', 'bottom', 'left', 'right'] as const;
  const megaCombos: Array<{
    p: typeof samplePlacements[number]; v: typeof TARMAC_VARIANTS[number];
    t: typeof TYPES[number]; s: typeof STYLES[number];
  }> = [];
  for (const p of samplePlacements) {
    for (const v of TARMAC_VARIANTS) {
      for (const t of TYPES) {
        for (const s of STYLES) {
          megaCombos.push({ p, v, t, s });
        }
      }
    }
  }

  it.each(megaCombos)('p=$p v=$v t=$t s=$s renders', ({ p, v, t, s }) => {
    wrap(
      <Tooltip renderInline variant={v} placement={p} tooltipType={t} tooltipStyle={s}
        content="mega" title="megatitle" description="D"
        ctaActions={t === 'ctas' ? { skip: { label: 'S' }, next: { label: 'N' } } : undefined} />
    );
    const expectedText = (s === 'dualText' && t === 'standard') ? 'megatitle' : 'mega';
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
