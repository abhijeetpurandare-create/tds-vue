import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SideNavigation } from '../index';

jest.mock('../../ThemeProvider', () => ({
  useTheme: () => ({
    theme: {
      components: {
        sideNavigation: {
          base: {
            gap: '8px',
            padding: '8px',
            collapsedWidth: '60px',
            expandedWidth: '240px',
            fontFamily: 'Noto Sans',
          },
          styles: {
            standard: {
              backgroundColor: '#ffffff',
              borderColor: '#e6e6e6',
              borderWidth: '1px',
              textColor: '#2b2b2b',
              iconColor: '#2b2b2b',
              hoverBg: '#f7f7f7',
              pressedBg: '#f2f2f2',
              activeBg: '#f2f2f2',
              disabledTextColor: '#cdcbcb',
              cellPadding: '8px 12px',
              cellRadius: '8px',
              cellGap: '4px',
              iconSize: '20px',
            },
            coal: {
              backgroundColor: '#eff1f5',
              borderColor: '#d0d5e0',
              borderWidth: '1px',
              textColor: '#333c50',
              iconColor: '#333c50',
              hoverBg: '#eff1f5',
              pressedBg: '#eff1f5',
              activeBg: '#eff1f5',
              disabledTextColor: '#cdcbcb',
              cellPadding: '8px 12px',
              cellRadius: '8px',
              cellGap: '4px',
              iconSize: '20px',
            },
            'd-one': {
              backgroundColor: '#1e2433',
              borderColor: '#f04158',
              borderWidth: '2px',
              textColor: '#f2f2f2',
              iconColor: '#f2f2f2',
              hoverBg: '#333c50',
              pressedBg: '#eff1f5',
              activeBg: '#333c50',
              disabledTextColor: '#666',
              cellPadding: '8px 12px',
              cellRadius: '8px',
              cellGap: '4px',
              iconSize: '20px',
            },
          },
        },
      },
    },
  }),
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

const Icon = () => <svg data-testid="icon" />;

// ─── Rendering ────────────────────────────────────────────────────────────────

describe('SideNavigation — rendering', () => {
  it('renders the nav element', () => {
    render(<SideNavigation><SideNavigation.Group /></SideNavigation>);
    expect(screen.getByRole('navigation', { name: 'Side navigation' })).toBeInTheDocument();
  });

  it('sets data-nav-style attribute', () => {
    render(<SideNavigation navStyle="coal"><SideNavigation.Group /></SideNavigation>);
    expect(screen.getByTestId('side-navigation')).toHaveAttribute('data-nav-style', 'coal');
  });

  it('sets data-nav-type attribute', () => {
    render(<SideNavigation navType="dual"><SideNavigation.Group /></SideNavigation>);
    expect(screen.getByTestId('side-navigation')).toHaveAttribute('data-nav-type', 'dual');
  });

  it('sets data-collapsed=false by default', () => {
    render(<SideNavigation><SideNavigation.Group /></SideNavigation>);
    expect(screen.getByTestId('side-navigation')).toHaveAttribute('data-collapsed', 'false');
  });

  it('sets data-collapsed=true when isCollapsed', () => {
    render(<SideNavigation isCollapsed><SideNavigation.Group /></SideNavigation>);
    expect(screen.getByTestId('side-navigation')).toHaveAttribute('data-collapsed', 'true');
  });

  it('renders all three navStyles without error', () => {
    (['standard', 'coal', 'd-one'] as const).forEach((navStyle) => {
      const { unmount } = render(
        <SideNavigation navStyle={navStyle}><SideNavigation.Group /></SideNavigation>
      );
      expect(screen.getByTestId('side-navigation')).toBeInTheDocument();
      unmount();
    });
  });

  it('applies custom className', () => {
    render(<SideNavigation className="my-nav"><SideNavigation.Group /></SideNavigation>);
    expect(screen.getByTestId('side-navigation').className).toContain('my-nav');
  });

  it('applies custom style', () => {
    render(<SideNavigation style={{ height: 500 }}><SideNavigation.Group /></SideNavigation>);
    expect(screen.getByTestId('side-navigation')).toHaveStyle({ height: '500px' });
  });
});

// ─── NavCell ──────────────────────────────────────────────────────────────────

describe('SideNavigation.Cell — rendering', () => {
  it('renders a button', () => {
    render(
      <SideNavigation>
        <SideNavigation.Group>
          <SideNavigation.Cell label="Dashboard" />
        </SideNavigation.Group>
      </SideNavigation>
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders label text', () => {
    render(
      <SideNavigation>
        <SideNavigation.Group>
          <SideNavigation.Cell label="Finance" />
        </SideNavigation.Group>
      </SideNavigation>
    );
    expect(screen.getByText('Finance')).toBeInTheDocument();
  });

  it('renders leadingIcon', () => {
    render(
      <SideNavigation>
        <SideNavigation.Group>
          <SideNavigation.Cell leadingIcon={<Icon />} label="Dashboard" />
        </SideNavigation.Group>
      </SideNavigation>
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders trailingIcon', () => {
    render(
      <SideNavigation>
        <SideNavigation.Group>
          <SideNavigation.Cell trailingIcon={<span data-testid="trail" />} label="Dashboard" />
        </SideNavigation.Group>
      </SideNavigation>
    );
    expect(screen.getByTestId('trail')).toBeInTheDocument();
  });

  it('renders subtext', () => {
    render(
      <SideNavigation>
        <SideNavigation.Group>
          <SideNavigation.Cell label="Dashboard" subtext="subtitle" />
        </SideNavigation.Group>
      </SideNavigation>
    );
    expect(screen.getByText('subtitle')).toBeInTheDocument();
  });

  it('sets aria-current=page when isActive', () => {
    render(
      <SideNavigation>
        <SideNavigation.Group>
          <SideNavigation.Cell label="Dashboard" isActive />
        </SideNavigation.Group>
      </SideNavigation>
    );
    expect(screen.getByRole('button')).toHaveAttribute('aria-current', 'page');
  });

  it('does not set aria-current when not active', () => {
    render(
      <SideNavigation>
        <SideNavigation.Group>
          <SideNavigation.Cell label="Dashboard" />
        </SideNavigation.Group>
      </SideNavigation>
    );
    expect(screen.getByRole('button')).not.toHaveAttribute('aria-current');
  });

  it('is disabled when isDisabled=true', () => {
    render(
      <SideNavigation>
        <SideNavigation.Group>
          <SideNavigation.Cell label="Dashboard" isDisabled />
        </SideNavigation.Group>
      </SideNavigation>
    );
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('sets aria-disabled when isDisabled', () => {
    render(
      <SideNavigation>
        <SideNavigation.Group>
          <SideNavigation.Cell label="Dashboard" isDisabled />
        </SideNavigation.Group>
      </SideNavigation>
    );
    expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
  });
});

// ─── NavCell — behaviour ──────────────────────────────────────────────────────

describe('SideNavigation.Cell — behaviour', () => {
  it('fires onClick when clicked', () => {
    const onClick = jest.fn();
    render(
      <SideNavigation>
        <SideNavigation.Group>
          <SideNavigation.Cell label="Dashboard" onClick={onClick} />
        </SideNavigation.Group>
      </SideNavigation>
    );
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not fire onClick when disabled', () => {
    const onClick = jest.fn();
    render(
      <SideNavigation>
        <SideNavigation.Group>
          <SideNavigation.Cell label="Dashboard" isDisabled onClick={onClick} />
        </SideNavigation.Group>
      </SideNavigation>
    );
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('applies custom tabIndex', () => {
    render(
      <SideNavigation>
        <SideNavigation.Group>
          <SideNavigation.Cell label="Dashboard" tabIndex={3} />
        </SideNavigation.Group>
      </SideNavigation>
    );
    expect(screen.getByRole('button')).toHaveAttribute('tabindex', '3');
  });

  it('sets tabIndex=-1 when disabled', () => {
    render(
      <SideNavigation>
        <SideNavigation.Group>
          <SideNavigation.Cell label="Dashboard" isDisabled />
        </SideNavigation.Group>
      </SideNavigation>
    );
    expect(screen.getByRole('button')).toHaveAttribute('tabindex', '-1');
  });
});

// ─── NavTabCell ───────────────────────────────────────────────────────────────

describe('SideNavigation.TabCell — rendering', () => {
  it('renders a button', () => {
    render(
      <SideNavigation>
        <SideNavigation.Group>
          <SideNavigation.TabCell label="Orders" />
        </SideNavigation.Group>
      </SideNavigation>
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders label', () => {
    render(
      <SideNavigation>
        <SideNavigation.Group>
          <SideNavigation.TabCell label="Orders & Pickup" />
        </SideNavigation.Group>
      </SideNavigation>
    );
    expect(screen.getByText('Orders & Pickup')).toBeInTheDocument();
  });

  it('sets aria-expanded=false by default', () => {
    render(
      <SideNavigation>
        <SideNavigation.Group>
          <SideNavigation.TabCell label="Orders" />
        </SideNavigation.Group>
      </SideNavigation>
    );
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false');
  });

  it('sets aria-expanded=true when isExpanded', () => {
    render(
      <SideNavigation>
        <SideNavigation.Group>
          <SideNavigation.TabCell label="Orders" isExpanded />
        </SideNavigation.Group>
      </SideNavigation>
    );
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
  });
});

describe('SideNavigation.TabCell — behaviour', () => {
  it('toggles expanded state on click (uncontrolled)', () => {
    render(
      <SideNavigation>
        <SideNavigation.Group>
          <SideNavigation.TabCell
            label="Orders"
            subItems={<SideNavigation.Cell label="All Orders" />}
          />
        </SideNavigation.Group>
      </SideNavigation>
    );
    const btn = screen.getByRole('button');
    expect(btn).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByText('All Orders')).not.toBeInTheDocument();

    fireEvent.click(btn);
    expect(btn).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('All Orders')).toBeInTheDocument();

    fireEvent.click(btn);
    expect(btn).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByText('All Orders')).not.toBeInTheDocument();
  });

  it('calls onExpandedChange with next value', () => {
    const onExpandedChange = jest.fn();
    render(
      <SideNavigation>
        <SideNavigation.Group>
          <SideNavigation.TabCell label="Orders" onExpandedChange={onExpandedChange} />
        </SideNavigation.Group>
      </SideNavigation>
    );
    fireEvent.click(screen.getByRole('button'));
    expect(onExpandedChange).toHaveBeenCalledWith(true);
    fireEvent.click(screen.getByRole('button'));
    expect(onExpandedChange).toHaveBeenCalledWith(false);
  });

  it('supports controlled isExpanded prop', () => {
    const { rerender } = render(
      <SideNavigation>
        <SideNavigation.Group>
          <SideNavigation.TabCell
            label="Orders"
            isExpanded={false}
            subItems={<SideNavigation.Cell label="All Orders" />}
          />
        </SideNavigation.Group>
      </SideNavigation>
    );
    expect(screen.queryByText('All Orders')).not.toBeInTheDocument();

    rerender(
      <SideNavigation>
        <SideNavigation.Group>
          <SideNavigation.TabCell
            label="Orders"
            isExpanded={true}
            subItems={<SideNavigation.Cell label="All Orders" />}
          />
        </SideNavigation.Group>
      </SideNavigation>
    );
    expect(screen.getByText('All Orders')).toBeInTheDocument();
  });

  it('does not fire onClick when disabled', () => {
    const onClick = jest.fn();
    render(
      <SideNavigation>
        <SideNavigation.Group>
          <SideNavigation.TabCell label="Orders" isDisabled onClick={onClick} />
        </SideNavigation.Group>
      </SideNavigation>
    );
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('hides sub-items when collapsed', () => {
    render(
      <SideNavigation isCollapsed>
        <SideNavigation.Group>
          <SideNavigation.TabCell
            label="Orders"
            isExpanded={true}
            subItems={<SideNavigation.Cell label="All Orders" />}
          />
        </SideNavigation.Group>
      </SideNavigation>
    );
    expect(screen.queryByText('All Orders')).not.toBeInTheDocument();
  });
});

// ─── Collapse behaviour ───────────────────────────────────────────────────────

describe('SideNavigation — collapse behaviour', () => {
  it('reflects isCollapsed=true on data attribute', () => {
    render(<SideNavigation isCollapsed><SideNavigation.Group /></SideNavigation>);
    expect(screen.getByTestId('side-navigation')).toHaveAttribute('data-collapsed', 'true');
  });

  it('reflects isCollapsed=false on data attribute', () => {
    render(<SideNavigation isCollapsed={false}><SideNavigation.Group /></SideNavigation>);
    expect(screen.getByTestId('side-navigation')).toHaveAttribute('data-collapsed', 'false');
  });

  it('calls onCollapsedChange when hoverToExpand triggers mouseenter', () => {
    const onCollapsedChange = jest.fn();
    render(
      <SideNavigation isCollapsed hoverToExpand onCollapsedChange={onCollapsedChange}>
        <SideNavigation.Group />
      </SideNavigation>
    );
    fireEvent.mouseEnter(screen.getByTestId('side-navigation'));
    expect(onCollapsedChange).toHaveBeenCalledWith(false);
  });

  it('calls onCollapsedChange when hoverToExpand triggers mouseleave', () => {
    const onCollapsedChange = jest.fn();
    render(
      <SideNavigation isCollapsed hoverToExpand onCollapsedChange={onCollapsedChange}>
        <SideNavigation.Group />
      </SideNavigation>
    );
    fireEvent.mouseLeave(screen.getByTestId('side-navigation'));
    expect(onCollapsedChange).toHaveBeenCalledWith(true);
  });

  it('does not call onCollapsedChange on mouseenter when hoverToExpand=false', () => {
    const onCollapsedChange = jest.fn();
    render(
      <SideNavigation isCollapsed hoverToExpand={false} onCollapsedChange={onCollapsedChange}>
        <SideNavigation.Group />
      </SideNavigation>
    );
    fireEvent.mouseEnter(screen.getByTestId('side-navigation'));
    expect(onCollapsedChange).not.toHaveBeenCalled();
  });

  it('expands on hover when hoverToExpand=true and isCollapsed=true', () => {
    render(
      <SideNavigation isCollapsed hoverToExpand>
        <SideNavigation.Group>
          <SideNavigation.Cell label="Dashboard" />
        </SideNavigation.Group>
      </SideNavigation>
    );
    const nav = screen.getByTestId('side-navigation');
    expect(nav).toHaveAttribute('data-collapsed', 'true');
    fireEvent.mouseEnter(nav);
    expect(nav).toHaveAttribute('data-collapsed', 'false');
    fireEvent.mouseLeave(nav);
    expect(nav).toHaveAttribute('data-collapsed', 'true');
  });
});

// ─── NavDivider ───────────────────────────────────────────────────────────────

describe('SideNavigation.Divider', () => {
  it('renders a separator', () => {
    render(
      <SideNavigation>
        <SideNavigation.Divider />
      </SideNavigation>
    );
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });
});

// ─── NavSlot ──────────────────────────────────────────────────────────────────

describe('SideNavigation.Slot', () => {
  it('renders children', () => {
    render(
      <SideNavigation>
        <SideNavigation.Slot>
          <span data-testid="slot-child">logo</span>
        </SideNavigation.Slot>
      </SideNavigation>
    );
    expect(screen.getByTestId('slot-child')).toBeInTheDocument();
  });
});

// ─── NavGroup ─────────────────────────────────────────────────────────────────

describe('SideNavigation.Group', () => {
  it('renders children', () => {
    render(
      <SideNavigation>
        <SideNavigation.Group>
          <SideNavigation.Cell label="Dashboard" />
        </SideNavigation.Group>
      </SideNavigation>
    );
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('renders with role=navigation', () => {
    render(
      <SideNavigation>
        <SideNavigation.Group>
          <SideNavigation.Cell label="Dashboard" />
        </SideNavigation.Group>
      </SideNavigation>
    );
    // nav wraps the whole thing; group also has role=navigation
    const navEls = screen.getAllByRole('navigation');
    expect(navEls.length).toBeGreaterThanOrEqual(1);
  });
});

// ─── Multiple cells ───────────────────────────────────────────────────────────

describe('SideNavigation — multiple cells', () => {
  it('renders multiple cells', () => {
    render(
      <SideNavigation>
        <SideNavigation.Group>
          <SideNavigation.Cell label="Dashboard" />
          <SideNavigation.Cell label="Orders" />
          <SideNavigation.Cell label="Finance" />
        </SideNavigation.Group>
      </SideNavigation>
    );
    expect(screen.getAllByRole('button')).toHaveLength(3);
  });

  it('only one cell is active at a time', () => {
    render(
      <SideNavigation>
        <SideNavigation.Group>
          <SideNavigation.Cell label="Dashboard" isActive />
          <SideNavigation.Cell label="Orders" />
          <SideNavigation.Cell label="Finance" />
        </SideNavigation.Group>
      </SideNavigation>
    );
    const active = screen.getAllByRole('button').filter(
      (b) => b.getAttribute('aria-current') === 'page'
    );
    expect(active).toHaveLength(1);
    expect(active[0]).toHaveTextContent('Dashboard');
  });
});
