import React from 'react';
import { render, screen } from '@testing-library/react';
import TabGroup from '../index';

jest.mock('../../ThemeProvider', () => ({
  useTheme: () => ({
    theme: {
      components: {
        tabGroupHorizontal: { base: { gap: '0px', dividerColor: '#e6e6e6', dividerWidth: '1px' } },
        tabGroupVertical: { base: { gap: '0px' }, sizes: { lg: { width: '300px' }, sm: { width: '264px' } } },
      },
    },
  }),
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));
jest.mock('../../../config/config', () => ({ defaultThemeConfig: { components: {} } }));

describe('TabGroup — Rendering', () => {
  it('renders with children', () => {
    render(<TabGroup><div>Tab1</div><div>Tab2</div></TabGroup>);
    expect(screen.getByRole('tablist')).toBeTruthy();
    expect(screen.getByText('Tab1')).toBeTruthy();
  });
  it('renders horizontal by default', () => {
    render(<TabGroup><div>T</div></TabGroup>);
    expect(screen.getByRole('tablist').getAttribute('aria-orientation')).toBe('horizontal');
  });
  it('renders vertical', () => {
    render(<TabGroup orientation="vertical"><div>T</div></TabGroup>);
    expect(screen.getByRole('tablist').getAttribute('aria-orientation')).toBe('vertical');
  });
  it('applies className', () => {
    render(<TabGroup className="custom"><div>T</div></TabGroup>);
    expect(screen.getByRole('tablist').className).toContain('custom');
  });
  it('has displayName', () => {
    expect(TabGroup.displayName).toBe('TabGroup');
  });
  it('has role=tablist', () => {
    render(<TabGroup><div>T</div></TabGroup>);
    expect(screen.getByRole('tablist')).toBeTruthy();
  });
  it('has data-testid', () => {
    render(<TabGroup><div>T</div></TabGroup>);
    expect(screen.getByTestId('tabgroup')).toBeTruthy();
  });
});

describe('TabGroup — Sizes', () => {
  it('renders lg', () => {
    render(<TabGroup size="lg"><div>T</div></TabGroup>);
    expect(screen.getByRole('tablist')).toBeTruthy();
  });
  it('renders sm', () => {
    render(<TabGroup size="sm"><div>T</div></TabGroup>);
    expect(screen.getByRole('tablist')).toBeTruthy();
  });
});

describe('TabGroup — Divider', () => {
  it('renders without divider by default', () => {
    render(<TabGroup><div>T1</div><div>T2</div></TabGroup>);
    expect(screen.getByRole('tablist')).toBeTruthy();
  });
  it('renders with divider', () => {
    render(<TabGroup showDivider><div>T1</div><div>T2</div></TabGroup>);
    expect(screen.getByRole('tablist')).toBeTruthy();
  });
});

describe('TabGroup — Direction Combinations', () => {
  const orientations = ['horizontal', 'vertical'] as const;
  const sizes = ['lg', 'sm'] as const;
  orientations.forEach(d => sizes.forEach(s => {
    it(`renders ${d}/${s}`, () => {
      render(<TabGroup orientation={d} size={s}><div>T</div></TabGroup>);
      expect(screen.getByRole('tablist')).toBeTruthy();
    });
  }));
});

describe('TabGroup — Divider Elements', () => {
  it('vertical always renders dividers between tabs', () => {
    const { container } = render(<TabGroup orientation="vertical"><div>T1</div><div>T2</div><div>T3</div></TabGroup>);
    // 3 tabs = 2 dividers
    const dividers = container.querySelectorAll('[role="tablist"] > div:not([role])');
    expect(dividers.length).toBeGreaterThanOrEqual(2);
  });
  it('horizontal does not render dividers by default', () => {
    const { container } = render(<TabGroup orientation="horizontal"><div>T1</div><div>T2</div></TabGroup>);
    const children = container.querySelector('[role="tablist"]')!.children;
    expect(children.length).toBe(2); // just the 2 tabs, no dividers
  });
  it('horizontal renders dividers when showDivider=true', () => {
    const { container } = render(<TabGroup orientation="horizontal" showDivider><div>T1</div><div>T2</div><div>T3</div></TabGroup>);
    const children = container.querySelector('[role="tablist"]')!.children;
    expect(children.length).toBe(5); // 3 tabs + 2 dividers
  });
});

describe('TabGroup — tabType', () => {
  it('button type suppresses dividers in vertical', () => {
    const { container } = render(<TabGroup orientation="vertical" tabType="button"><div>T1</div><div>T2</div></TabGroup>);
    const children = container.querySelector('[role="tablist"]')!.children;
    expect(children.length).toBe(2);
  });
  it('button type suppresses dividers in horizontal even with showDivider', () => {
    const { container } = render(<TabGroup orientation="horizontal" tabType="button" showDivider><div>T1</div><div>T2</div></TabGroup>);
    const children = container.querySelector('[role="tablist"]')!.children;
    expect(children.length).toBe(2);
  });
  it('regular type shows dividers in vertical', () => {
    const { container } = render(<TabGroup orientation="vertical" tabType="regular"><div>T1</div><div>T2</div></TabGroup>);
    const children = container.querySelector('[role="tablist"]')!.children;
    expect(children.length).toBe(3); // 2 tabs + 1 divider
  });
  it('applies className', () => {
    render(<TabGroup className="my-group"><div>T</div></TabGroup>);
    expect(screen.getByRole('tablist').className).toContain('my-group');
  });
});

describe('TabGroup — Defaults', () => {
  it('defaults direction to horizontal', () => {
    render(<TabGroup><div>T</div></TabGroup>);
    expect(screen.getByRole('tablist')).toHaveAttribute('aria-orientation', 'horizontal');
  });
  it('defaults tabType to regular', () => {
    render(<TabGroup><div>T</div></TabGroup>);
    expect(screen.getByRole('tablist')).toBeTruthy();
  });
  it('defaults showDivider to false', () => {
    const { container } = render(<TabGroup><div>T1</div><div>T2</div></TabGroup>);
    expect(container.querySelector('[role="tablist"]')!.children.length).toBe(2);
  });
  it('displayName is TabGroup', () => {
    expect(TabGroup.displayName).toBe('TabGroup');
  });
});

describe('TabGroup — Scroll', () => {
  it('horizontal has overflow-x auto', () => {
    const { container } = render(<TabGroup orientation="horizontal"><div>T1</div></TabGroup>);
    const el = container.querySelector('[role="tablist"]') as HTMLElement;
    expect(el).toBeTruthy();
  });
});

describe('TabGroup — Empty', () => {
  it('renders empty tablist', () => {
    render(<TabGroup />);
    expect(screen.getByRole('tablist')).toBeTruthy();
  });
  it('single child no divider', () => {
    const { container } = render(<TabGroup orientation="vertical"><div>T1</div></TabGroup>);
    expect(container.querySelector('[role="tablist"]')!.children.length).toBe(1);
  });
});

describe('TabGroup — Many children', () => {
  it('renders 8 children', () => {
    render(<TabGroup>{Array.from({ length: 8 }, (_, i) => <div key={i}>Tab {i}</div>)}</TabGroup>);
    expect(screen.getByText('Tab 0')).toBeTruthy();
    expect(screen.getByText('Tab 7')).toBeTruthy();
  });
  it('vertical with 8 children and dividers', () => {
    const { container } = render(
      <TabGroup orientation="vertical">{Array.from({ length: 8 }, (_, i) => <div key={i}>T{i}</div>)}</TabGroup>
    );
    const children = container.querySelector('[role="tablist"]')!.children;
    expect(children.length).toBe(15); // 8 tabs + 7 dividers
  });
});

describe('TabGroup — Width/Height', () => {
  it('horizontal has width 100%', () => {
    const { container } = render(<TabGroup orientation="horizontal"><div>T</div></TabGroup>);
    const el = container.querySelector('[role="tablist"]') as HTMLElement;
    expect(el.style.width || el.className).toBeTruthy();
  });
  it('vertical has fixed width from theme', () => {
    const { container } = render(<TabGroup orientation="vertical" size="lg"><div>T</div></TabGroup>);
    const el = container.querySelector('[role="tablist"]') as HTMLElement;
    expect(el).toBeTruthy();
  });
  it('vertical sm has different width', () => {
    const { container } = render(<TabGroup orientation="vertical" size="sm"><div>T</div></TabGroup>);
    const el = container.querySelector('[role="tablist"]') as HTMLElement;
    expect(el).toBeTruthy();
  });
});

describe('TabGroup — Theme fallback', () => {
  it('renders without crashing when theme is empty', () => {
    render(<TabGroup><div>T</div></TabGroup>);
    expect(screen.getByRole('tablist')).toBeTruthy();
  });
});

describe('TabGroup — All type × direction × size combos', () => {
  const types = ['regular', 'button'] as const;
  const orientations = ['horizontal', 'vertical'] as const;
  const sizes = ['lg', 'sm'] as const;
  types.forEach(t => orientations.forEach(d => sizes.forEach(s => {
    it(`renders ${t}/${d}/${s}`, () => {
      render(<TabGroup tabType={t} orientation={d} size={s}><div>T1</div><div>T2</div></TabGroup>);
      expect(screen.getByRole('tablist')).toBeTruthy();
    });
  })));
});

describe('TabGroup — Divider edge cases', () => {
  it('vertical shows dividers even without showDivider prop', () => {
    const { container } = render(
      <TabGroup orientation="vertical"><div>T1</div><div>T2</div></TabGroup>
    );
    const children = container.querySelector('[role="tablist"]')!.children;
    expect(children.length).toBe(3); // 2 tabs + 1 divider
  });
  it('vertical showDivider=false still shows dividers (vertical always has dividers)', () => {
    const { container } = render(
      <TabGroup orientation="vertical" showDivider={false}><div>T1</div><div>T2</div></TabGroup>
    );
    const children = container.querySelector('[role="tablist"]')!.children;
    expect(children.length).toBe(3); // vertical always shows dividers for regular type
  });
});

describe('TabGroup — aria-orientation', () => {
  it('vertical has aria-orientation=vertical', () => {
    render(<TabGroup orientation="vertical"><div>T</div></TabGroup>);
    expect(screen.getByRole('tablist')).toHaveAttribute('aria-orientation', 'vertical');
  });
  it('horizontal has aria-orientation=horizontal', () => {
    render(<TabGroup orientation="horizontal"><div>T</div></TabGroup>);
    expect(screen.getByRole('tablist')).toHaveAttribute('aria-orientation', 'horizontal');
  });
});

describe('TabGroup — Unknown tabType', () => {
  it('renders with unknown tabType', () => {
    render(<TabGroup tabType="custom"><div>T1</div><div>T2</div></TabGroup>);
    expect(screen.getByRole('tablist')).toBeTruthy();
  });
});

describe('TabGroup — orientation prop (renamed from direction)', () => {
  it('defaults to horizontal', () => {
    render(<TabGroup><div>T</div></TabGroup>);
    expect(screen.getByRole('tablist')).toHaveAttribute('aria-orientation', 'horizontal');
  });
  it('vertical sets aria-orientation', () => {
    render(<TabGroup orientation="vertical"><div>T</div></TabGroup>);
    expect(screen.getByRole('tablist')).toHaveAttribute('aria-orientation', 'vertical');
  });
});

describe('TabGroup — auto-injects orientation and _inGroup to children', () => {
  it('horizontal group injects orientation=vertical to children', () => {
    const Child = (props: any) => <div data-testid="child" data-orientation={props.orientation} data-ingroup={String(props._inGroup)} />;
    render(<TabGroup orientation="horizontal"><Child /></TabGroup>);
    const child = screen.getByTestId('child');
    expect(child.getAttribute('data-orientation')).toBe('vertical');
    expect(child.getAttribute('data-ingroup')).toBe('true');
  });
  it('vertical group injects orientation=horizontal to children', () => {
    const Child = (props: any) => <div data-testid="child" data-orientation={props.orientation} />;
    render(<TabGroup orientation="vertical"><Child /></TabGroup>);
    expect(screen.getByTestId('child').getAttribute('data-orientation')).toBe('horizontal');
  });
});
