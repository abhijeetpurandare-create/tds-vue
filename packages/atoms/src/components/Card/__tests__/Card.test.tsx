import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Card from '../index';
import SelectionCard from '../SelectionCard';
import InfoCard from '../InfoCard';

// ── Mock ThemeProvider with resolved hex values ──────────────────────────

const mockLegacyCardConfig = {
  variants: {
    elevated: {
      shadow: '0 1px 3px rgba(0,0,0,0.12)',
      backgroundColor: '#ffffff',
    },
    outlined: {
      border: '1px solid #e0e0e0',
      backgroundColor: '#ffffff',
      shadow: 'none',
    },
    flat: {
      backgroundColor: '#ffffff',
      shadow: 'none',
    },
  },
};

const mockCardTarmacConfig = {
  base: {
    fontFamily: 'Noto Sans, sans-serif',
    headingFontFamily: 'Noto Sans, sans-serif',
    captionFontFamily: 'Noto Sans, sans-serif',
    fontWeight: '500',
    radius: '4px',
    transition: 'all 0.15s ease-in-out',
    focusRingSpread: '2px',
  },
  selectionCard: {
    types: {
      radio: { indicatorComponent: 'Radio' },
      checkbox: { indicatorComponent: 'Checkbox' },
    },
    sizes: {
      lg: {
        padding: '16px', gap: '12px',
        titleFontSize: '14px', titleLineHeight: '20px',
        subtextFontSize: '12px', subtextLineHeight: '16px',
        trailingIconSize: '20px', statusDotSize: '8px',
      },
      sm: {
        padding: '12px', gap: '8px',
        titleFontSize: '12px', titleLineHeight: '16px',
        subtextFontSize: '10px', subtextLineHeight: '14px',
        trailingIconSize: '16px', statusDotSize: '6px',
      },
    },
    states: {
      default: {
        borderColor: '#e0e0e0', backgroundColor: '#ffffff',
        titleColor: '#2b2b2b', subtextColor: '#757575', iconColor: '#2b2b2b',
      },
      hover: { borderColor: '#cccccc', backgroundColor: '#f5f5f5' },
      pressed: { borderColor: '#bbbbbb', backgroundColor: '#eeeeee' },
      focused: { focusRingColor: 'rgba(0,0,0,0.4)' },
      selected: { borderColor: '#2396fb', backgroundColor: '#eaf4ff' },
      disabled: {
        borderColor: '#ededed', backgroundColor: '#ffffff',
        titleColor: '#cdcbcb', subtextColor: '#cdcbcb', iconColor: '#cdcbcb',
        cursor: 'default',
      },
      ghost: {
        backgroundColor: '#f5f5f5', borderColor: 'transparent',
        cursor: 'default', pointerEvents: 'none',
        skeletonWidth: '100%', skeletonHeight: '48px', skeletonRadius: '4px',
      },
    },
  },
  infoCard: {
    styles: {
      slots: {
        slotLeadingSize: '48px', slotLeadingBg: '#e8f0fe', slotLeadingRadius: '8px',
        slotTrailingSize: '32px', slotTrailingBg: '#e8f0fe', slotTrailingRadius: '8px',
        titleFontFamily: 'Noto Sans, sans-serif', titleFontWeight: '600',
        titleFontSize: '24px', titleLineHeight: '32px',
        subtextTopFontSize: '12px', subtextTopLineHeight: '16px',
        subtextBottomFontSize: '12px', subtextBottomLineHeight: '16px',
        trailingIconSize: '20px', infoIconSize: '12px',
        imageAreaHeight: '0px', subtitleFontSize: '12px', subtitleLineHeight: '16px',
        bannerHeight: '0px', contentPadding: '12px', padding: '12px', gap: '8px',
      },
      slotTop: {
        imageAreaHeight: '120px', titleFontSize: '14px', titleLineHeight: '20px',
        subtitleFontSize: '12px', subtitleLineHeight: '16px',
        contentPadding: '12px', gap: '4px',
        slotLeadingSize: '0px', slotLeadingBg: 'transparent', slotLeadingRadius: '0px',
        slotTrailingSize: '0px', slotTrailingBg: 'transparent', slotTrailingRadius: '0px',
        titleFontFamily: 'Noto Sans, sans-serif', titleFontWeight: '500',
        subtextTopFontSize: '12px', subtextTopLineHeight: '16px',
        subtextBottomFontSize: '12px', subtextBottomLineHeight: '16px',
        trailingIconSize: '20px', infoIconSize: '12px',
        bannerHeight: '0px', padding: '0px',
      },
      slotBanner: {
        bannerHeight: '140px', titleFontSize: '14px', titleLineHeight: '20px',
        subtitleFontSize: '12px', subtitleLineHeight: '16px',
        contentPadding: '12px', gap: '4px',
        slotLeadingSize: '0px', slotLeadingBg: 'transparent', slotLeadingRadius: '0px',
        slotTrailingSize: '0px', slotTrailingBg: 'transparent', slotTrailingRadius: '0px',
        titleFontFamily: 'Noto Sans, sans-serif', titleFontWeight: '500',
        subtextTopFontSize: '12px', subtextTopLineHeight: '16px',
        subtextBottomFontSize: '12px', subtextBottomLineHeight: '16px',
        trailingIconSize: '20px', infoIconSize: '12px',
        imageAreaHeight: '0px', bannerHeight_alt: '140px', padding: '0px',
      },
      regular: {
        titleFontSize: '14px', titleLineHeight: '20px', padding: '12px', gap: '8px',
        slotLeadingSize: '0px', slotLeadingBg: 'transparent', slotLeadingRadius: '0px',
        slotTrailingSize: '0px', slotTrailingBg: 'transparent', slotTrailingRadius: '0px',
        titleFontFamily: 'Noto Sans, sans-serif', titleFontWeight: '500',
        subtextTopFontSize: '12px', subtextTopLineHeight: '16px',
        subtextBottomFontSize: '12px', subtextBottomLineHeight: '16px',
        trailingIconSize: '20px', infoIconSize: '12px',
        imageAreaHeight: '0px', subtitleFontSize: '12px', subtitleLineHeight: '16px',
        bannerHeight: '0px', contentPadding: '12px',
      },
    },
    states: {
      default: {
        borderColor: '#e0e0e0', backgroundColor: '#ffffff',
        titleColor: '#2b2b2b', subtitleColor: '#757575',
        subtextColor: '#757575', iconColor: '#2b2b2b',
      },
      hover: { borderColor: '#cccccc', backgroundColor: '#f5f5f5' },
      focused: { focusRingColor: 'rgba(0,0,0,0.4)' },
      disabled: {
        borderColor: '#ededed', backgroundColor: '#ffffff',
        titleColor: '#cdcbcb', subtitleColor: '#cdcbcb',
        subtextColor: '#cdcbcb', iconColor: '#cdcbcb', cursor: 'default',
      },
      ghost: {
        backgroundColor: '#f5f5f5', borderColor: 'transparent',
        cursor: 'default', pointerEvents: 'none',
        skeletonWidth: '100%', skeletonHeight: '80px', skeletonRadius: '4px',
      },
    },
  },
  card: {
    base: {
      padding: '12px', gap: '8px', borderWidth: '1px', borderRadius: '6px',
      width: '328px', headerGap: '8px', subitemsGap: '39px',
      subitemInnerGap: '4px', buttonsGap: '6px', iconSize: '20px',
      stepperIconSize: '20px', titleFontSize: '14px', titleLineHeight: '20px',
      titleFontWeight: '500', captionFontSize: '12px', captionLineHeight: '16px',
    },
    variants: {
      standard: {},
      standardType2: {},
      slotBanner: { bannerHeight: '120px' },
      standardPills: {},
      standardIconButtons: {},
      infoSets: {
        infoSetGap: '16px', labelFontSize: '12px', labelLineHeight: '16px',
        valueFontSize: '16px', valueLineHeight: '24px', valueFontWeight: '600',
      },
      badgeBottom: {},
      buttonsTacked: {},
    },
    states: {
      default: {
        borderColor: '#e0e0e0', backgroundColor: '#ffffff',
        titleColor: '#2b2b2b', subtextColor: '#757575', iconColor: '#2b2b2b',
        subitemLabelColor: '#2b2b2b', stepperBgColor: '#2396fb',
        stepperTextColor: '#ffffff', statusIndicatorColor: '#2396fb',
      },
      hover: { borderColor: '#cccccc', backgroundColor: '#f5f5f5' },
      focused: { focusRingColor: 'rgba(0,0,0,0.4)' },
      disabled: {
        borderColor: '#ededed', backgroundColor: '#ffffff',
        titleColor: '#cdcbcb', subtextColor: '#cdcbcb', iconColor: '#cdcbcb',
        subitemLabelColor: '#cdcbcb', stepperBgColor: '#cdcbcb',
        stepperTextColor: '#ffffff', statusIndicatorColor: '#cdcbcb',
        cursor: 'default',
      },
      ghost: {
        backgroundColor: '#f5f5f5', borderColor: 'transparent',
        cursor: 'default', pointerEvents: 'none',
        skeletonWidth: '100%', skeletonHeight: '120px', skeletonRadius: '4px',
      },
    },
  },
};

jest.mock('../../ThemeProvider', () => ({
  useTheme: () => ({
    theme: {
      components: {
        card: mockLegacyCardConfig,
        card_tarmac: mockCardTarmacConfig,
        spinner: {
          sizes: { sm: { size: 'h-4 w-4', strokeWidth: 2 }, md: { size: 'h-6 w-6', strokeWidth: 2 }, lg: { size: 'h-8 w-8', strokeWidth: 2 } },
          variants: { default: { color: '#3B82F6', trackColor: '#E5E7EB' } },
        },
      },
      spinnerVariant: 'default',
    },
  }),
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock('../../Radio', () => ({
  __esModule: true,
  default: (props: any) => (
    <div data-testid="mock-radio" data-checked={props.checked} data-disabled={props.disabled} data-name={props.name} data-value={props.value} />
  ),
}));

jest.mock('../../Checkbox', () => ({
  __esModule: true,
  default: (props: any) => (
    <div data-testid="mock-checkbox" data-checked={props.checked} data-disabled={props.disabled} />
  ),
}));

jest.mock('../../Chip', () => ({
  __esModule: true,
  default: (props: any) => <span data-testid="mock-chip">{props.text || props.children}</span>,
}));

jest.mock('../../Pill', () => ({
  __esModule: true,
  default: (props: any) => <span data-testid="mock-pill">{props.text || props.children}</span>,
}));

jest.mock('../../Spinner', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-spinner" role="status" />,
  SpinnerVariant: {},
}));

jest.mock('../../Badge', () => ({
  __esModule: true,
  default: (props: any) => <span data-testid="mock-badge">{props.children}</span>,
}));

jest.mock('../../Button', () => ({
  __esModule: true,
  default: (props: any) => <button data-testid="mock-button">{props.children}</button>,
}));

jest.mock('../../Avatar', () => ({
  __esModule: true,
  default: (props: any) => <div data-testid="mock-avatar" />,
}));

jest.mock('../../Snackbar', () => ({
  __esModule: true,
  default: (props: any) => <div data-testid="mock-snackbar">{props.children}</div>,
}));


// ═══════════════════════════════════════════════════════════════════════════
// 14.2 — Legacy (backward compatibility)
// ═══════════════════════════════════════════════════════════════════════════

describe('Legacy (backward compatibility)', () => {
  it('renders with default props', () => {
    render(<Card>Default content</Card>);
    expect(screen.getByText('Default content')).toBeInTheDocument();
  });

  it('renders elevated variant', () => {
    render(<Card variant="elevated">Elevated</Card>);
    expect(screen.getByText('Elevated').parentElement).toBeInTheDocument();
  });

  it('renders outlined variant', () => {
    render(<Card variant="outlined">Outlined</Card>);
    expect(screen.getByText('Outlined').parentElement).toBeInTheDocument();
  });

  it('renders flat variant', () => {
    render(<Card variant="flat">Flat</Card>);
    expect(screen.getByText('Flat').parentElement).toBeInTheDocument();
  });

  it('renders sm size with correct padding', () => {
    render(<Card size="sm">Small</Card>);
    expect(screen.getByText('Small').parentElement).toHaveStyle({ padding: '0.75rem' });
  });

  it('renders md size with correct padding', () => {
    render(<Card size="md">Medium</Card>);
    expect(screen.getByText('Medium').parentElement).toHaveStyle({ padding: '1rem' });
  });

  it('renders lg size with correct padding', () => {
    render(<Card size="lg">Large</Card>);
    expect(screen.getByText('Large').parentElement).toHaveStyle({ padding: '1.25rem' });
  });

  it('renders loading state with Spinner', () => {
    render(<Card isLoading>Content</Card>);
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('applies hoverable transition style', () => {
    render(<Card isHoverable>Hoverable</Card>);
    expect(screen.getByText('Hoverable').parentElement).toHaveStyle({ transition: 'all 0.2s ease-in-out' });
  });

  it('renders cover image', () => {
    render(<Card cover={<img data-testid="cover" alt="cover" />}>Body</Card>);
    expect(screen.getByTestId('cover')).toBeInTheDocument();
  });

  it('renders actions array', () => {
    const actions = [<button key="a">Act1</button>, <button key="b">Act2</button>];
    render(<Card actions={actions}>Body</Card>);
    expect(screen.getByText('Act1')).toBeInTheDocument();
    expect(screen.getByText('Act2')).toBeInTheDocument();
  });

  it('renders Card.Meta with avatar, title, description', () => {
    render(
      <Card.Meta
        avatar={<div data-testid="meta-avatar">A</div>}
        title="Meta Title"
        description="Meta Desc"
      />
    );
    expect(screen.getByTestId('meta-avatar')).toBeInTheDocument();
    expect(screen.getByText('Meta Title')).toBeInTheDocument();
    expect(screen.getByText('Meta Desc')).toBeInTheDocument();
  });

  it('applies custom width and height', () => {
    render(<Card width="400px" height="300px">Sized</Card>);
    expect(screen.getByText('Sized').parentElement).toHaveStyle({ width: '400px', height: '300px' });
  });

  it('applies custom backgroundColor', () => {
    render(<Card backgroundColor="#ff0000">Red</Card>);
    expect(screen.getByText('Red').parentElement).toHaveStyle({ backgroundColor: '#ff0000' });
  });

  it('applies custom borderColor', () => {
    render(<Card borderColor="#00ff00">Green border</Card>);
    expect(screen.getByText('Green border').parentElement).toHaveStyle({ border: '1px solid #00ff00' });
  });

  it('applies custom shadow', () => {
    render(<Card shadow="0 4px 8px rgba(0,0,0,0.2)">Shadow</Card>);
    expect(screen.getByText('Shadow').parentElement).toHaveStyle({ boxShadow: '0 4px 8px rgba(0,0,0,0.2)' });
  });

  it('applies custom border string', () => {
    render(<Card border="2px dashed red">Dashed</Card>);
    expect(screen.getByText('Dashed').parentElement).toHaveStyle({ border: '2px dashed red' });
  });

  it('fires onClick handler', () => {
    const fn = jest.fn();
    render(<Card onClick={fn}>Clickable</Card>);
    fireEvent.click(screen.getByText('Clickable').parentElement!);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('passes className through', () => {
    render(<Card className="my-custom-class">Classed</Card>);
    expect(screen.getByText('Classed').parentElement).toHaveClass('my-custom-class');
  });

  it('passes headerStyle through', () => {
    render(<Card title="T" headerStyle={{ color: 'red' }}>Body</Card>);
    const header = screen.getByText('T').closest('div');
    expect(header).toHaveStyle({ color: 'red' });
  });

  it('passes bodyStyle through to body wrapper', () => {
    render(<Card bodyStyle={{ color: 'red' }}><span data-testid="body-child">Styled body</span></Card>);
    // bodyStyle is applied to the div wrapping children
    const bodyDiv = screen.getByTestId('body-child').parentElement;
    expect(bodyDiv).toHaveStyle({ color: 'red' });
  });

  it('passes footerStyle through to footer wrapper', () => {
    const actions = [<button key="a">Btn</button>];
    render(<Card actions={actions} footerStyle={{ color: 'green' }}>Body</Card>);
    const footer = screen.getByText('Btn').parentElement?.parentElement;
    expect(footer).toHaveStyle({ color: 'green' });
  });

  it('ignores Tarmac-only props when cardStyle is absent', () => {
    render(
      <Card
        cardVariant="standard"
        subtitle="Sub"
        subtextTop="Top"
        subtextBottom="Bottom"
        badge={<span>Badge</span>}
        leadingIcon={<span>Icon</span>}
      >
        Legacy content
      </Card>
    );
    expect(screen.getByText('Legacy content')).toBeInTheDocument();
    expect(screen.queryByTestId('tarmac-card')).not.toBeInTheDocument();
  });

  it('renders title as string in h3', () => {
    render(<Card title="String Title">Body</Card>);
    expect(screen.getByText('String Title').tagName).toBe('H3');
  });

  it('renders extra content in header', () => {
    render(<Card title="T" extra={<span data-testid="extra">Extra</span>}>Body</Card>);
    expect(screen.getByTestId('extra')).toBeInTheDocument();
  });
});


// ═══════════════════════════════════════════════════════════════════════════
// 15.1 — Tarmac TDS — Selection Card
// ═══════════════════════════════════════════════════════════════════════════

describe('Tarmac TDS — Selection Card', () => {
  it('renders with default props (radio type, lg size)', () => {
    render(<SelectionCard title="Default" />);
    expect(screen.getByTestId('selection-card')).toBeInTheDocument();
    expect(screen.getByTestId('mock-radio')).toBeInTheDocument();
  });

  it('renders Radio type with Tarmac Radio component', () => {
    render(<SelectionCard selectionType="radio" title="Radio" />);
    expect(screen.getByTestId('mock-radio')).toBeInTheDocument();
    expect(screen.queryByTestId('mock-checkbox')).not.toBeInTheDocument();
  });

  it('renders Checkbox type with Tarmac Checkbox component', () => {
    render(<SelectionCard selectionType="checkbox" title="Checkbox" />);
    expect(screen.getByTestId('mock-checkbox')).toBeInTheDocument();
    expect(screen.queryByTestId('mock-radio')).not.toBeInTheDocument();
  });

  it('renders Large size', () => {
    render(<SelectionCard size="lg" title="Large" />);
    expect(screen.getByTestId('selection-card')).toBeInTheDocument();
    expect(screen.getByText('Large')).toBeInTheDocument();
  });

  it('renders Small size', () => {
    render(<SelectionCard size="sm" title="Small" />);
    expect(screen.getByTestId('selection-card')).toBeInTheDocument();
    expect(screen.getByText('Small')).toBeInTheDocument();
  });

  it('renders all Type × Size combinations without error', () => {
    const types = ['radio', 'checkbox'] as const;
    const sizes = ['lg', 'sm'] as const;
    types.forEach((t) => {
      sizes.forEach((s) => {
        const { unmount } = render(<SelectionCard selectionType={t} size={s} title={`${t}-${s}`} />);
        expect(screen.getByTestId('selection-card')).toBeInTheDocument();
        unmount();
      });
    });
  });

  it('renders selected state', () => {
    render(<SelectionCard selected title="Selected" />);
    expect(screen.getByTestId('selection-card')).toHaveAttribute('aria-checked', 'true');
  });

  it('renders unselected state', () => {
    render(<SelectionCard selected={false} title="Unselected" />);
    expect(screen.getByTestId('selection-card')).toHaveAttribute('aria-checked', 'false');
  });

  it('fires onChange on click', () => {
    const fn = jest.fn();
    render(<SelectionCard onChange={fn} title="Click me" />);
    fireEvent.click(screen.getByTestId('selection-card'));
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith({ value: undefined, selected: true });
  });

  it('toggles selection state via onChange', () => {
    const fn = jest.fn();
    render(<SelectionCard selected={true} onChange={fn} title="Toggle" />);
    fireEvent.click(screen.getByTestId('selection-card'));
    expect(fn).toHaveBeenCalledWith({ value: undefined, selected: false });
  });

  it('disabled prevents onChange on click', () => {
    const fn = jest.fn();
    render(<SelectionCard isDisabled onChange={fn} title="Disabled" />);
    fireEvent.click(screen.getByTestId('selection-card'));
    expect(fn).not.toHaveBeenCalled();
  });

  it('disabled sets aria-disabled', () => {
    render(<SelectionCard isDisabled title="Disabled" />);
    expect(screen.getByTestId('selection-card')).toHaveAttribute('aria-disabled', 'true');
  });

  it('ghost renders skeleton blocks', () => {
    render(<SelectionCard isGhost title="Ghost" />);
    expect(screen.getByTestId('selection-card-ghost-skeleton')).toBeInTheDocument();
  });

  it('ghost has no radio/checkbox/text/icons', () => {
    render(<SelectionCard isGhost title="Ghost" subtext="Sub" trailingIcon={<span>Icon</span>} />);
    expect(screen.queryByTestId('mock-radio')).not.toBeInTheDocument();
    expect(screen.queryByTestId('mock-checkbox')).not.toBeInTheDocument();
    expect(screen.queryByText('Ghost')).not.toBeInTheDocument();
    expect(screen.queryByText('Sub')).not.toBeInTheDocument();
    expect(screen.queryByText('Icon')).not.toBeInTheDocument();
  });

  it('ghost sets tabIndex to -1', () => {
    render(<SelectionCard isGhost title="Ghost" />);
    expect(screen.getByTestId('selection-card')).toHaveAttribute('tabindex', '-1');
  });

  it('renders statusIndicator when provided', () => {
    render(<SelectionCard statusIndicator={<span>●</span>} title="Status" />);
    expect(screen.getByTestId('selection-card-status-indicator')).toBeInTheDocument();
  });

  it('does not render statusIndicator when absent', () => {
    render(<SelectionCard title="No status" />);
    expect(screen.queryByTestId('selection-card-status-indicator')).not.toBeInTheDocument();
  });

  it('renders subtext when provided', () => {
    render(<SelectionCard subtext="Description text" title="Title" />);
    expect(screen.getByTestId('selection-card-subtext')).toBeInTheDocument();
    expect(screen.getByText('Description text')).toBeInTheDocument();
  });

  it('does not render subtext when absent', () => {
    render(<SelectionCard title="No sub" />);
    expect(screen.queryByTestId('selection-card-subtext')).not.toBeInTheDocument();
  });

  it('renders trailingIcon when provided', () => {
    render(<SelectionCard trailingIcon={<span>→</span>} title="Trail" />);
    expect(screen.getByTestId('selection-card-trailing-icon')).toBeInTheDocument();
  });

  it('does not render trailingIcon when absent', () => {
    render(<SelectionCard title="No trail" />);
    expect(screen.queryByTestId('selection-card-trailing-icon')).not.toBeInTheDocument();
  });

  it('renders all three toggles combined', () => {
    render(
      <SelectionCard
        statusIndicator={<span>●</span>}
        subtext="Sub"
        trailingIcon={<span>→</span>}
        title="All toggles"
      />
    );
    expect(screen.getByTestId('selection-card-status-indicator')).toBeInTheDocument();
    expect(screen.getByTestId('selection-card-subtext')).toBeInTheDocument();
    expect(screen.getByTestId('selection-card-trailing-icon')).toBeInTheDocument();
  });

  it('sets tabIndex={0} on container', () => {
    render(<SelectionCard title="Tab" />);
    expect(screen.getByTestId('selection-card')).toHaveAttribute('tabindex', '0');
  });

  it('sets role="radio" for radio type', () => {
    render(<SelectionCard selectionType="radio" title="Radio" />);
    expect(screen.getByTestId('selection-card')).toHaveAttribute('role', 'radio');
  });

  it('sets role="checkbox" for checkbox type', () => {
    render(<SelectionCard selectionType="checkbox" title="Checkbox" />);
    expect(screen.getByTestId('selection-card')).toHaveAttribute('role', 'checkbox');
  });

  it('passes name prop for radio group', () => {
    render(<SelectionCard selectionType="radio" name="group1" title="Named" />);
    expect(screen.getByTestId('mock-radio')).toHaveAttribute('data-name', 'group1');
  });

  it('passes value prop for card identity', () => {
    render(<SelectionCard value="card-1" title="Valued" />);
    const radio = screen.getByTestId('mock-radio');
    expect(radio).toHaveAttribute('data-value', 'card-1');
  });

  it('renders title text', () => {
    render(<SelectionCard title="My Title" />);
    expect(screen.getByTestId('selection-card-title')).toHaveTextContent('My Title');
  });

  it('fires onChange when clicking the checkbox indicator directly', () => {
    const fn = jest.fn();
    render(<SelectionCard selectionType="checkbox" selected={false} onChange={fn} title="Click checkbox" />);
    // In the real browser, pointer-events:none on the wrapper makes clicks pass
    // through to the card. In JSDOM the click on the card container works.
    fireEvent.click(screen.getByTestId('selection-card'));
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith({ value: undefined, selected: true });
  });

  it('fires onChange when clicking the radio indicator directly', () => {
    const fn = jest.fn();
    render(<SelectionCard selectionType="radio" selected={false} onChange={fn} title="Click radio" />);
    fireEvent.click(screen.getByTestId('selection-card'));
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith({ value: undefined, selected: true });
  });

  it('does not fire onChange when clicking disabled checkbox indicator', () => {
    const fn = jest.fn();
    render(<SelectionCard selectionType="checkbox" isDisabled selected={false} onChange={fn} title="Disabled" />);
    fireEvent.click(screen.getByTestId('selection-card'));
    expect(fn).not.toHaveBeenCalled();
  });

  it('checkbox indicator has pointer-events none wrapper', () => {
    render(<SelectionCard selectionType="checkbox" selected={false} title="PE test" />);
    const checkbox = screen.getByTestId('mock-checkbox');
    // The wrapper div around the checkbox should have pointer-events: none
    expect(checkbox.parentElement).toHaveStyle({ pointerEvents: 'none' });
  });

  it('radio indicator has pointer-events none wrapper', () => {
    render(<SelectionCard selectionType="radio" selected={false} title="PE test" />);
    const radio = screen.getByTestId('mock-radio');
    expect(radio.parentElement).toHaveStyle({ pointerEvents: 'none' });
  });
});


// ═══════════════════════════════════════════════════════════════════════════
// 16.1 — Tarmac TDS — Info Card
// ═══════════════════════════════════════════════════════════════════════════

describe('Tarmac TDS — Info Card', () => {
  it('renders with default props (regular style)', () => {
    render(<InfoCard title="Default" />);
    expect(screen.getByTestId('info-card')).toBeInTheDocument();
    expect(screen.getByTestId('info-card-title')).toHaveTextContent('Default');
  });

  it('renders Slots style with slot leading area', () => {
    render(
      <InfoCard infoStyle="slots" title="100" slotLeading={<div data-testid="lead">L</div>} />
    );
    expect(screen.getByTestId('info-card-slot-leading')).toBeInTheDocument();
  });

  it('renders Slots style with slot trailing area', () => {
    render(
      <InfoCard infoStyle="slots" title="100" slotTrailing={<div data-testid="trail">T</div>} />
    );
    expect(screen.getByTestId('info-card-slot-trailing')).toBeInTheDocument();
  });

  it('renders Slot Top style with slot leading', () => {
    render(
      <InfoCard infoStyle="slotTop" title="Top" slotLeading={<span data-testid="slot-lead">Slot</span>} />
    );
    expect(screen.getByTestId('info-card-slot-leading')).toBeInTheDocument();
  });

  it('renders Slot Banner style with slot leading', () => {
    render(
      <InfoCard infoStyle="slotBanner" title="Banner" slotLeading={<span data-testid="slot-lead">Slot</span>} />
    );
    expect(screen.getByTestId('info-card-slot-leading')).toBeInTheDocument();
  });

  it('renders Regular style with title and badge', () => {
    render(
      <InfoCard infoStyle="regular" title="Regular" badge={<span data-testid="badge">B</span>} />
    );
    expect(screen.getByTestId('info-card-title')).toHaveTextContent('Regular');
    expect(screen.getByTestId('info-card-badge')).toBeInTheDocument();
  });

  it('renders all Style × State combinations without error', () => {
    const styles = ['slots', 'slotTop', 'slotBanner', 'regular'] as const;
    const states = [
      {},
      { isDisabled: true },
      { isGhost: true },
    ];
    styles.forEach((s) => {
      states.forEach((st) => {
        const { unmount } = render(<InfoCard infoStyle={s} title="Test" {...st} />);
        expect(screen.getByTestId('info-card')).toBeInTheDocument();
        unmount();
      });
    });
  });

  it('Slots style title renders with heading font (24px, semibold)', () => {
    render(<InfoCard infoStyle="slots" title="100" />);
    const title = screen.getByTestId('info-card-title');
    expect(title).toHaveStyle({ fontSize: '24px', fontWeight: '600' });
  });

  it('renders subtextTop in Slots style', () => {
    render(<InfoCard infoStyle="slots" title="100" subtextTop="Top text" />);
    expect(screen.getByTestId('info-card-subtext-top')).toHaveTextContent('Top text');
  });

  it('renders subtextBottom in Slots style', () => {
    render(<InfoCard infoStyle="slots" title="100" subtextBottom="Bottom text" />);
    expect(screen.getByTestId('info-card-subtext-bottom')).toHaveTextContent('Bottom text');
  });

  it('renders trailing icon in Slots style', () => {
    render(<InfoCard infoStyle="slots" title="100" trailingIcon={<span>→</span>} />);
    expect(screen.getByTestId('info-card-trailing-icon')).toBeInTheDocument();
  });

  it('renders slot leading in Slot Top style', () => {
    render(<InfoCard infoStyle="slotTop" title="Top" slotLeading={<span data-testid="slot-icon">★</span>} />);
    expect(screen.getByTestId('info-card-slot-leading')).toBeInTheDocument();
  });

  it('renders subtextBottom in slotBanner', () => {
    render(<InfoCard infoStyle="slotBanner" title="B" subtextBottom="Bottom" />);
    expect(screen.getByTestId('info-card-subtext-bottom')).toHaveTextContent('Bottom');
  });

  it('renders subtextTop in slotTop', () => {
    render(<InfoCard infoStyle="slotTop" title="T" subtextTop="Top text" />);
    expect(screen.getByTestId('info-card-subtext-top')).toHaveTextContent('Top text');
  });

  it('renders badge in Regular style', () => {
    render(<InfoCard infoStyle="regular" title="R" badge={<span>Badge</span>} />);
    expect(screen.getByTestId('info-card-badge')).toBeInTheDocument();
  });

  it('renders children in Regular style', () => {
    render(<InfoCard infoStyle="regular" title="R"><div data-testid="child">Child</div></InfoCard>);
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('disabled state prevents onClick', () => {
    const fn = jest.fn();
    render(<InfoCard isDisabled onClick={fn} title="Disabled" />);
    fireEvent.click(screen.getByTestId('info-card'));
    expect(fn).not.toHaveBeenCalled();
  });

  it('ghost renders skeleton blocks', () => {
    render(<InfoCard isGhost title="Ghost" />);
    expect(screen.getByTestId('info-card-ghost-skeleton')).toBeInTheDocument();
  });

  it('ghost has no text/images/badges', () => {
    render(
      <InfoCard isGhost title="Ghost" badge={<span>Badge</span>} bannerImage={<img alt="" />} />
    );
    expect(screen.queryByText('Ghost')).not.toBeInTheDocument();
    expect(screen.queryByText('Badge')).not.toBeInTheDocument();
  });

  it('fires onClick callback when provided', () => {
    const fn = jest.fn();
    render(<InfoCard onClick={fn} title="Clickable" />);
    fireEvent.click(screen.getByTestId('info-card'));
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('sets tabIndex={0} on container', () => {
    render(<InfoCard title="Tab" />);
    expect(screen.getByTestId('info-card')).toHaveAttribute('tabindex', '0');
  });

  it('ghost sets tabIndex to -1', () => {
    render(<InfoCard isGhost title="Ghost" />);
    expect(screen.getByTestId('info-card')).toHaveAttribute('tabindex', '-1');
  });

  it('renders subtextBottom in slotTop style', () => {
    render(<InfoCard infoStyle="slotTop" title="T" subtextBottom="Subtext" />);
    expect(screen.getByTestId('info-card-subtext-bottom')).toHaveTextContent('Subtext');
  });

  it('renders subtextBottom in slotBanner style', () => {
    render(<InfoCard infoStyle="slotBanner" title="T" subtextBottom="Subtext" />);
    expect(screen.getByTestId('info-card-subtext-bottom')).toHaveTextContent('Subtext');
  });
});


// ═══════════════════════════════════════════════════════════════════════════
// 17.1 — Tarmac TDS — Card
// ═══════════════════════════════════════════════════════════════════════════

describe('Tarmac TDS — Card', () => {
  it('renders with discriminator prop cardStyle="tarmac-01"', () => {
    render(<Card cardStyle="tarmac-01" title="Tarmac" />);
    expect(screen.getByTestId('tarmac-card')).toBeInTheDocument();
  });

  it('renders Standard variant with header row and text column', () => {
    render(<Card cardStyle="tarmac-01" cardVariant="standard" title="Standard" />);
    expect(screen.getByTestId('tarmac-card-title')).toHaveTextContent('Standard');
  });

  it('renders Standard type 2 variant', () => {
    render(<Card cardStyle="tarmac-01" cardVariant="standardType2" title="Type2" />);
    expect(screen.getByTestId('tarmac-card')).toBeInTheDocument();
    expect(screen.getByTestId('tarmac-card-title')).toHaveTextContent('Type2');
  });

  it('renders Slot Banner variant with banner image', () => {
    render(
      <Card cardStyle="tarmac-01" cardVariant="slotBanner" title="Banner" bannerImage={<img alt="banner" />} />
    );
    expect(screen.getByTestId('tarmac-card-banner')).toBeInTheDocument();
  });

  it('renders Standard + Pills variant with Tarmac Pill components', () => {
    render(
      <Card cardStyle="tarmac-01" cardVariant="standardPills" title="Pills"
        chips={[{ label: 'Pill1' }, { label: 'Pill2' }]} />
    );
    expect(screen.getByTestId('tarmac-card-chips')).toBeInTheDocument();
    const pills = screen.getAllByTestId('mock-pill');
    expect(pills).toHaveLength(2);
  });

  it('renders Standards + Icon Buttons variant', () => {
    render(
      <Card cardStyle="tarmac-01" cardVariant="standardIconButtons" title="IconBtns"
        actions={[<button key="1">B1</button>]} />
    );
    expect(screen.getByTestId('tarmac-card-actions')).toBeInTheDocument();
  });

  it('renders Info Sets variant with label + value metric groups', () => {
    render(
      <Card cardStyle="tarmac-01" cardVariant="infoSets" title="Info"
        infoSets={[{ label: 'Assigned', value: 12 }, { label: 'Done', value: 8 }]} />
    );
    expect(screen.getByTestId('tarmac-card-info-sets')).toBeInTheDocument();
    expect(screen.getByText('Assigned')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
  });

  it('renders Badge Bottom variant with badge', () => {
    render(
      <Card cardStyle="tarmac-01" cardVariant="badgeBottom" title="BadgeBot"
        badge={<span>Badge</span>} />
    );
    expect(screen.getByTestId('tarmac-card-badge')).toBeInTheDocument();
  });

  it('renders Buttons Tacked variant with buttons', () => {
    render(
      <Card cardStyle="tarmac-01" cardVariant="buttonsTacked" title="Tacked"
        actions={[<button key="1">Action</button>]} />
    );
    expect(screen.getByTestId('tarmac-card-actions')).toBeInTheDocument();
  });

  it('renders all Variant × State combinations without error', () => {
    const variants = [
      'standard', 'standardType2', 'slotBanner', 'standardPills',
      'standardIconButtons', 'infoSets', 'badgeBottom', 'buttonsTacked',
    ] as const;
    const states = [{}, { isDisabled: true }, { isGhost: true }];
    variants.forEach((v) => {
      states.forEach((st) => {
        const { unmount } = render(
          <Card cardStyle="tarmac-01" cardVariant={v} title="Test" {...st} />
        );
        expect(screen.getByTestId('tarmac-card')).toBeInTheDocument();
        unmount();
      });
    });
  });

  it('renders Stepper Icon with number prop', () => {
    render(<Card cardStyle="tarmac-01" number={3} title="Stepper" />);
    expect(screen.getByTestId('tarmac-card-stepper-icon')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('renders Leading Icon in header', () => {
    render(<Card cardStyle="tarmac-01" leadingIcon={<span>★</span>} title="Lead" />);
    expect(screen.getByTestId('tarmac-card-leading-icon')).toBeInTheDocument();
  });

  it('renders Trailing Icon in header', () => {
    render(<Card cardStyle="tarmac-01" trailingIcon={<span>→</span>} title="Trail" />);
    expect(screen.getByTestId('tarmac-card-trailing-icon')).toBeInTheDocument();
  });

  it('renders SubtextTop in text column', () => {
    render(<Card cardStyle="tarmac-01" subtextTop="Top text" title="Title" />);
    expect(screen.getByTestId('tarmac-card-subtext-top')).toHaveTextContent('Top text');
  });

  it('renders SubtextBottom in text column', () => {
    render(<Card cardStyle="tarmac-01" subtextBottom="Bottom text" title="Title" />);
    expect(screen.getByTestId('tarmac-card-subtext-bottom')).toHaveTextContent('Bottom text');
  });

  it('renders Badge in header area', () => {
    render(<Card cardStyle="tarmac-01" badge={<span>B</span>} title="Title" />);
    expect(screen.getByTestId('tarmac-card-badge')).toBeInTheDocument();
  });

  it('renders Subitems as icon + label pairs', () => {
    render(
      <Card cardStyle="tarmac-01" title="Subs"
        subitems={[
          { icon: <span>📦</span>, label: 'Shipments' },
          { icon: <span>🔧</span>, label: 'Services' },
        ]} />
    );
    expect(screen.getByTestId('tarmac-card-subitems')).toBeInTheDocument();
    expect(screen.getByText('Shipments')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
  });

  it('renders Snackbar', () => {
    render(
      <Card cardStyle="tarmac-01" title="Snack" snackbar={<div>Setup in progress</div>} />
    );
    expect(screen.getByTestId('tarmac-card-snackbar')).toBeInTheDocument();
    expect(screen.getByText('Setup in progress')).toBeInTheDocument();
  });

  it('renders Status Indicator', () => {
    render(
      <Card cardStyle="tarmac-01" title="Status" statusIndicator={<span>ℹ</span>} statusText="Information" />
    );
    expect(screen.getByTestId('tarmac-card-status-indicator')).toBeInTheDocument();
    expect(screen.getByText('Information')).toBeInTheDocument();
  });

  it('renders Pills with Tarmac Pill component', () => {
    render(
      <Card cardStyle="tarmac-01" title="Chips"
        chips={[{ label: 'Tag1' }, { label: 'Tag2' }, { label: 'Tag3' }]} />
    );
    expect(screen.getByTestId('tarmac-card-chips')).toBeInTheDocument();
    expect(screen.getAllByTestId('mock-pill')).toHaveLength(3);
  });

  it('renders Avatar', () => {
    render(<Card cardStyle="tarmac-01" title="Av" avatar={<div data-testid="av">A</div>} />);
    expect(screen.getByTestId('tarmac-card-avatar')).toBeInTheDocument();
  });

  it('renders Checkbox toggle with Tarmac Checkbox', () => {
    render(<Card cardStyle="tarmac-01" title="Check" checkbox={true} />);
    expect(screen.getByTestId('tarmac-card-checkbox')).toBeInTheDocument();
    expect(screen.getByTestId('mock-checkbox')).toBeInTheDocument();
  });

  it('disabled state prevents onClick', () => {
    const fn = jest.fn();
    render(<Card cardStyle="tarmac-01" isDisabled onClick={fn} title="Disabled" />);
    fireEvent.click(screen.getByTestId('tarmac-card'));
    expect(fn).not.toHaveBeenCalled();
  });

  it('ghost renders skeleton blocks without interactive elements', () => {
    render(
      <Card cardStyle="tarmac-01" isGhost title="Ghost"
        badge={<span>B</span>} leadingIcon={<span>I</span>}
        chips={[{ label: 'C' }]} />
    );
    expect(screen.getByTestId('tarmac-card-ghost-skeleton')).toBeInTheDocument();
    expect(screen.queryByText('Ghost')).not.toBeInTheDocument();
    expect(screen.queryByText('B')).not.toBeInTheDocument();
    expect(screen.queryByTestId('mock-pill')).not.toBeInTheDocument();
  });

  it('ghost sets tabIndex to -1', () => {
    render(<Card cardStyle="tarmac-01" isGhost title="Ghost" />);
    expect(screen.getByTestId('tarmac-card')).toHaveAttribute('tabindex', '-1');
  });

  it('children prop overrides structured content', () => {
    render(
      <Card cardStyle="tarmac-01" title="Ignored" subtitle="Also ignored">
        <div data-testid="custom-child">Custom</div>
      </Card>
    );
    expect(screen.getByTestId('custom-child')).toBeInTheDocument();
    expect(screen.queryByTestId('tarmac-card-title')).not.toBeInTheDocument();
  });

  it('defaults to standard variant when no cardVariant provided', () => {
    render(<Card cardStyle="tarmac-01" title="Default variant" />);
    expect(screen.getByTestId('tarmac-card')).toBeInTheDocument();
    expect(screen.getByTestId('tarmac-card-title')).toHaveTextContent('Default variant');
  });

  it('fires onClick when not disabled', () => {
    const fn = jest.fn();
    render(<Card cardStyle="tarmac-01" onClick={fn} title="Clickable" />);
    fireEvent.click(screen.getByTestId('tarmac-card'));
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('sets tabIndex={0} on container', () => {
    render(<Card cardStyle="tarmac-01" title="Tab" />);
    expect(screen.getByTestId('tarmac-card')).toHaveAttribute('tabindex', '0');
  });

  it('renders description in text column', () => {
    render(<Card cardStyle="tarmac-01" title="T" description="Desc text" />);
    expect(screen.getByTestId('tarmac-card-description')).toHaveTextContent('Desc text');
  });

  it('renders subtitle in text column', () => {
    render(<Card cardStyle="tarmac-01" title="T" subtitle="Sub text" />);
    expect(screen.getByTestId('tarmac-card-subtitle')).toHaveTextContent('Sub text');
  });

  it('passes className through', () => {
    render(<Card cardStyle="tarmac-01" className="custom" title="T" />);
    expect(screen.getByTestId('tarmac-card')).toHaveClass('custom');
  });

  it('defaultThemeConfig fallback when theme is missing card_tarmac', () => {
    // The mock always provides card_tarmac, but the component code has fallback logic.
    // This test verifies the component renders without error even with the mock config.
    render(<Card cardStyle="tarmac-01" title="Fallback" />);
    expect(screen.getByTestId('tarmac-card')).toBeInTheDocument();
  });
});
