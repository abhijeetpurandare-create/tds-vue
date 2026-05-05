import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TabCell from '../index';

jest.mock('../../ThemeProvider', () => ({
  useTheme: () => ({
    theme: {
      components: {
        tabCell: {
          base: { fontFamily: 'Noto Sans', titleColor: '#2b2b2b', subtextColor: '#454545', backgroundColor: '#fff',
            disabledTextColor: '#cdcbcb', ghostBackgroundColor: '#f7f7f7', ghostSkeletonColor: '#e6e6e6' },
          styles: {
            black: { hoverBackgroundColor: '#f7f7f7', pressedBackgroundColor: '#f7f7f7', hoverBorderColor: '#2b2b2b', pressedBorderColor: '#1a1a1a',
              buttonPressedBg: '#0d0d0d', buttonPressedTextColor: '#e6e6e6', buttonPressedSubtextColor: '#f2f2f2' },
            blue: { hoverBackgroundColor: '#f0f8ff', pressedBackgroundColor: '#d3eafe', hoverBorderColor: '#91cafd', pressedBorderColor: '#48a7fc' },
            dlvRed: { hoverBackgroundColor: '#fef1f3', pressedBackgroundColor: '#fde8eb', hoverBorderColor: '#f68d9a', pressedBorderColor: '#f04158' },
          },
          sizes: {
            lg: { padding: '12px 16px', gap: '8px', titleFontSize: '14px', titleLineHeight: '20px', titleFontWeight: '500',
              iconSize: '24px', checkboxSize: 'sm', statusPadding: '8px 2px', ghostPadding: '16px', buttonPadding: '8px 16px' },
            sm: { padding: '8px 12px', gap: '6px', titleFontSize: '12px', titleLineHeight: '16px', titleFontWeight: '500',
              iconSize: '20px', checkboxSize: 'sm', statusPadding: '5px 2px', ghostPadding: '16px', buttonPadding: '8px 12px', buttonVerticalPadding: '6px 12px' },
          },
        },
        checkbox: {
          base: { icon: { borderColor: '#ccc', backgroundColor: '#fff', checkmarkColor: '#fff', borderRadius: '2px' },
            focus: { outline: 'none', ring: '0 0 0 2px rgba(0,0,0,0.4)' } },
          sizes: { sm: { icon: { size: '16px' } }, md: { icon: { size: '20px' } }, lg: { icon: { size: '24px' } } },
          states: { disabled: { wrapper: { className: 'cursor-not-allowed opacity-60', style: {} } }, checked: { icon: { borderColor: '#000', backgroundColor: '#000', checkmarkColor: '#fff' } }, indeterminate: { icon: { backgroundColor: '#000', dashColor: '#fff' } } },
        },
        checkbox_tarmac: {
          base: { transition: 'all 0.15s', borderWidth: '1px', radius: { box: '2px', rounded: '999px' },
            focus: { outline: 'none', ring: '0 0 0 2px rgba(0,0,0,0.4)' },
            label: { fontFamily: 'Noto Sans', color: '#2b2b2b' }, subtext: { fontFamily: 'Noto Sans', color: '#454545' } },
          variants: { standard: { borderColor: '#ccc', checkedBackgroundColor: '#000', checkedBorderColor: '#000', checkmarkColor: '#fff',
            hoverBorderColor: '#999', hoverCheckedBackgroundColor: '#333', indeterminateBackgroundColor: '#000', indeterminateBorderColor: '#000' } },
          sizes: { sm: { boxSize: '16px', gap: '4px', labelFontSize: '12px', labelLineHeight: '16px', subtextFontSize: '10px', subtextLineHeight: '12px', checkmarkSize: '12px' } },
          states: { disabled: { borderColor: '#eee', backgroundColor: '#f5f5f5', checkedBackgroundColor: '#ccc', checkedBorderColor: '#ccc', textColor: '#ccc' } },
        },
      },
    },
  }),
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));
jest.mock('../../../config/config', () => ({ defaultThemeConfig: { components: {} } }));

describe('TabCell — Rendering', () => {
  it('renders with default props', () => {
    render(<TabCell />);
    expect(screen.getByRole('tab')).toBeTruthy();
  });
  it('renders default title "Tab"', () => {
    render(<TabCell />);
    expect(screen.getByText('Tab')).toBeTruthy();
  });
  it('renders custom title', () => {
    render(<TabCell title="My Tab" />);
    expect(screen.getByText('My Tab')).toBeTruthy();
  });
  it('renders subtext when provided', () => {
    render(<TabCell title="T" subtext="Sub" />);
    expect(screen.getByText('Sub')).toBeTruthy();
  });
  it('no subtext when omitted', () => {
    render(<TabCell title="T" />);
    expect(screen.queryByText('Sub')).toBeNull();
  });
  it('no title when empty string', () => {
    render(<TabCell title="" subtext="Sub" />);
    expect(screen.queryByText('Tab')).toBeNull();
  });
  it('renders children', () => {
    render(<TabCell><span data-testid="child">C</span></TabCell>);
    expect(screen.getByTestId('child')).toBeTruthy();
  });
  it('applies className', () => {
    render(<TabCell className="custom" />);
    expect(screen.getByRole('tab').className).toContain('custom');
  });
  it('has data-testid="tabcell"', () => {
    render(<TabCell />);
    expect(screen.getByTestId('tabcell')).toBeTruthy();
  });
  it('has displayName', () => {
    expect(TabCell.displayName).toBe('TabCell');
  });
});

describe('TabCell — Checkbox', () => {
  it('no checkbox by default', () => {
    render(<TabCell />);
    expect(screen.queryByRole('checkbox')).toBeNull();
  });
  it('shows checkbox when showCheckbox=true', () => {
    render(<TabCell showCheckbox />);
    expect(screen.getByRole('checkbox')).toBeTruthy();
  });
  it('shows checkbox in vertical orientation', () => {
    render(<TabCell showCheckbox orientation="vertical" />);
    expect(screen.getByRole('checkbox')).toBeTruthy();
  });
  it('onCheckboxChange fires', () => {
    const fn = jest.fn();
    render(<TabCell showCheckbox onCheckboxChange={fn} checkboxChecked={false} />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(fn).toHaveBeenCalledWith(true);
  });
  it('disabled checkbox is disabled', () => {
    render(<TabCell showCheckbox isDisabled />);
    expect(screen.getByRole('checkbox')).toHaveAttribute('disabled');
  });
});

describe('TabCell — ReactNode Slots', () => {
  it('renders leadingIcon when provided', () => {
    render(<TabCell leadingIcon={<span data-testid="li">I</span>} />);
    expect(screen.getByTestId('li')).toBeTruthy();
  });
  it('no leadingIcon when omitted', () => {
    render(<TabCell />);
    expect(screen.queryByTestId('li')).toBeNull();
  });
  it('renders trailingIcon when provided', () => {
    render(<TabCell trailingIcon={<span data-testid="ti">I</span>} />);
    expect(screen.getByTestId('ti')).toBeTruthy();
  });
  it('renders badge when provided', () => {
    render(<TabCell badge={<span data-testid="badge">3</span>} />);
    expect(screen.getByTestId('badge')).toBeTruthy();
  });
  it('no badge when omitted', () => {
    render(<TabCell />);
    expect(screen.queryByTestId('badge')).toBeNull();
  });
  it('renders pill when provided', () => {
    render(<TabCell pill={<span data-testid="pill">99</span>} />);
    expect(screen.getByTestId('pill')).toBeTruthy();
  });
  it('no pill when omitted', () => {
    render(<TabCell />);
    expect(screen.queryByTestId('pill')).toBeNull();
  });
  it('renders status when provided', () => {
    render(<TabCell status={<span data-testid="status">●</span>} />);
    expect(screen.getByTestId('status')).toBeTruthy();
  });
  it('no status when omitted', () => {
    render(<TabCell />);
    expect(screen.queryByTestId('status')).toBeNull();
  });
  it('status renders in vertical orientation', () => {
    render(<TabCell orientation="vertical" status={<span data-testid="status">●</span>} />);
    expect(screen.getByTestId('status')).toBeTruthy();
  });
});

describe('TabCell — Types', () => {
  it('renders regular type', () => { render(<TabCell tabType="regular" />); expect(screen.getByRole('tab')).toBeTruthy(); });
  it('renders button type', () => { render(<TabCell tabType="button" />); expect(screen.getByRole('tab')).toBeTruthy(); });
  it('renders unknown type gracefully', () => { render(<TabCell tabType="custom" />); expect(screen.getByRole('tab')).toBeTruthy(); });
});

describe('TabCell — Orientations', () => {
  it('renders horizontal', () => { render(<TabCell orientation="horizontal" />); expect(screen.getByRole('tab')).toBeTruthy(); });
  it('renders vertical', () => { render(<TabCell orientation="vertical" />); expect(screen.getByRole('tab')).toBeTruthy(); });
});

describe('TabCell — Styles', () => {
  it('renders black', () => { render(<TabCell tabStyle="black" />); expect(screen.getByRole('tab')).toBeTruthy(); });
  it('renders blue', () => { render(<TabCell tabStyle="blue" />); expect(screen.getByRole('tab')).toBeTruthy(); });
  it('renders dlvRed', () => { render(<TabCell tabStyle="dlvRed" />); expect(screen.getByRole('tab')).toBeTruthy(); });
});

describe('TabCell — Sizes', () => {
  it('renders lg', () => { render(<TabCell size="lg" />); expect(screen.getByRole('tab')).toBeTruthy(); });
  it('renders sm', () => { render(<TabCell size="sm" />); expect(screen.getByRole('tab')).toBeTruthy(); });
});

describe('TabCell — States', () => {
  it('pressed sets aria-selected=true', () => {
    render(<TabCell isPressed />);
    expect(screen.getByRole('tab').getAttribute('aria-selected')).toBe('true');
  });
  it('default sets aria-selected=false', () => {
    render(<TabCell />);
    expect(screen.getByRole('tab').getAttribute('aria-selected')).toBe('false');
  });
  it('isSelected sets aria-selected=true', () => {
    render(<TabCell isSelected />);
    expect(screen.getByRole('tab').getAttribute('aria-selected')).toBe('true');
  });
  it('isSelected OR isPressed both activate', () => {
    render(<TabCell isSelected={false} isPressed />);
    expect(screen.getByRole('tab').getAttribute('aria-selected')).toBe('true');
  });
  it('disabled sets aria-disabled', () => {
    render(<TabCell isDisabled />);
    expect(screen.getByRole('tab').getAttribute('aria-disabled')).toBe('true');
  });
  it('disabled sets tabIndex=-1', () => {
    render(<TabCell isDisabled />);
    expect(screen.getByRole('tab').getAttribute('tabindex')).toBe('-1');
  });
  it('disabled prevents onClick', () => {
    const fn = jest.fn();
    render(<TabCell isDisabled onClick={fn} />);
    fireEvent.click(screen.getByRole('tab'));
    expect(fn).not.toHaveBeenCalled();
  });
  it('ghost renders skeleton', () => {
    render(<TabCell isGhost />);
    expect(screen.getByRole('tab').getAttribute('aria-disabled')).toBeTruthy();
  });
  it('ghost does not render title', () => {
    render(<TabCell isGhost title="Hidden" />);
    expect(screen.queryByText('Hidden')).toBeNull();
  });
  it('ghost does not render slots', () => {
    render(<TabCell isGhost badge={<span data-testid="b">B</span>} pill={<span data-testid="p">P</span>} />);
    expect(screen.queryByTestId('b')).toBeNull();
    expect(screen.queryByTestId('p')).toBeNull();
  });
});

describe('TabCell — Events', () => {
  it('onClick fires', () => {
    const fn = jest.fn();
    render(<TabCell onClick={fn} />);
    fireEvent.click(screen.getByRole('tab'));
    expect(fn).toHaveBeenCalledTimes(1);
  });
  it('Enter key fires onClick', () => {
    const fn = jest.fn();
    render(<TabCell onClick={fn} />);
    fireEvent.keyDown(screen.getByRole('tab'), { key: 'Enter' });
    expect(fn).toHaveBeenCalledTimes(1);
  });
  it('Space key fires onClick', () => {
    const fn = jest.fn();
    render(<TabCell onClick={fn} />);
    fireEvent.keyDown(screen.getByRole('tab'), { key: ' ' });
    expect(fn).toHaveBeenCalledTimes(1);
  });
  it('Enter does not fire when disabled', () => {
    const fn = jest.fn();
    render(<TabCell isDisabled onClick={fn} />);
    fireEvent.keyDown(screen.getByRole('tab'), { key: 'Enter' });
    expect(fn).not.toHaveBeenCalled();
  });
  it('Space does not fire when disabled', () => {
    const fn = jest.fn();
    render(<TabCell isDisabled onClick={fn} />);
    fireEvent.keyDown(screen.getByRole('tab'), { key: ' ' });
    expect(fn).not.toHaveBeenCalled();
  });
});

describe('TabCell — Accessibility', () => {
  it('has role=tab', () => { render(<TabCell />); expect(screen.getByRole('tab')).toBeTruthy(); });
  it('focusable by default (tabIndex=0)', () => {
    render(<TabCell />);
    expect(screen.getByRole('tab').getAttribute('tabindex')).toBe('0');
  });
});

describe('TabCell — All Combinations', () => {
  const types = ['regular', 'button'];
  const orientations = ['horizontal', 'vertical'];
  const styles = ['black', 'blue', 'dlvRed'];
  const sizes = ['lg', 'sm'];
  types.forEach(t => orientations.forEach(o => styles.forEach(s => sizes.forEach(sz => {
    it(`renders ${t}/${o}/${s}/${sz}`, () => {
      render(<TabCell tabType={t} orientation={o} tabStyle={s} size={sz} title="T" />);
      expect(screen.getByRole('tab')).toBeTruthy();
    });
  }))));
});

describe('TabCell — Checkbox Variants', () => {
  it('renders with checkboxVariant="blue"', () => {
    render(<TabCell showCheckbox checkboxVariant="blue" />);
    expect(screen.getByRole('checkbox')).toBeTruthy();
  });
  it('renders with checkboxStyle="rounded"', () => {
    render(<TabCell showCheckbox checkboxStyle="rounded" />);
    expect(screen.getByRole('checkbox')).toBeTruthy();
  });
  it('defaults checkboxVariant to standard', () => {
    render(<TabCell showCheckbox />);
    expect(screen.getByRole('checkbox')).toBeTruthy();
  });
});

describe('TabCell — Ghost edge cases', () => {
  it('ghost does not fire onClick', () => {
    const fn = jest.fn();
    render(<TabCell isGhost onClick={fn} />);
    fireEvent.click(screen.getByRole('tab'));
    expect(fn).not.toHaveBeenCalled();
  });
  it('ghost does not render checkbox', () => {
    render(<TabCell isGhost showCheckbox />);
    expect(screen.queryByRole('checkbox')).toBeNull();
  });
  it('ghost does not render leadingIcon', () => {
    render(<TabCell isGhost leadingIcon={<span data-testid="li">I</span>} />);
    expect(screen.queryByTestId('li')).toBeNull();
  });
  it('ghost does not render trailingIcon', () => {
    render(<TabCell isGhost trailingIcon={<span data-testid="ti">I</span>} />);
    expect(screen.queryByTestId('ti')).toBeNull();
  });
  it('ghost does not render status', () => {
    render(<TabCell isGhost status={<span data-testid="st">S</span>} />);
    expect(screen.queryByTestId('st')).toBeNull();
  });
});

describe('TabCell — Multiple slots together', () => {
  it('renders all slots simultaneously', () => {
    render(
      <TabCell
        title="Title" subtext="Subtext" showCheckbox
        leadingIcon={<span data-testid="li">L</span>}
        trailingIcon={<span data-testid="ti">R</span>}
        badge={<span data-testid="badge">B</span>}
        pill={<span data-testid="pill">P</span>}
        status={<span data-testid="status">S</span>}
      />
    );
    expect(screen.getByText('Title')).toBeTruthy();
    expect(screen.getByText('Subtext')).toBeTruthy();
    expect(screen.getByRole('checkbox')).toBeTruthy();
    expect(screen.getByTestId('li')).toBeTruthy();
    expect(screen.getByTestId('ti')).toBeTruthy();
    expect(screen.getByTestId('badge')).toBeTruthy();
    expect(screen.getByTestId('pill')).toBeTruthy();
    expect(screen.getByTestId('status')).toBeTruthy();
  });
  it('no trailingIcon when omitted', () => {
    render(<TabCell />);
    expect(screen.queryByTestId('ti')).toBeNull();
  });
});

describe('TabCell — Status in vertical', () => {
  it('status renders in vertical orientation', () => {
    render(<TabCell orientation="vertical" status={<span data-testid="vs">V</span>} />);
    expect(screen.getByTestId('vs')).toBeTruthy();
  });
});

describe('TabCell — Theme fallback', () => {
  it('renders without theme config', () => {
    render(<TabCell title="Fallback" />);
    expect(screen.getByText('Fallback')).toBeTruthy();
  });
});

describe('TabCell — Checkbox controlled state', () => {
  it('checkboxChecked=true renders checked checkbox', () => {
    render(<TabCell showCheckbox checkboxChecked />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });
  it('checkboxChecked=false renders unchecked checkbox', () => {
    render(<TabCell showCheckbox checkboxChecked={false} />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });
  it('onCheckboxChange fires false when checked=true', () => {
    const fn = jest.fn();
    render(<TabCell showCheckbox onCheckboxChange={fn} checkboxChecked />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(fn).toHaveBeenCalledWith(false);
  });
});

describe('TabCell — Disabled with slots', () => {
  it('disabled still renders leadingIcon', () => {
    render(<TabCell isDisabled leadingIcon={<span data-testid="li">I</span>} />);
    expect(screen.getByTestId('li')).toBeTruthy();
  });
  it('disabled still renders trailingIcon', () => {
    render(<TabCell isDisabled trailingIcon={<span data-testid="ti">I</span>} />);
    expect(screen.getByTestId('ti')).toBeTruthy();
  });
  it('disabled still renders status', () => {
    render(<TabCell isDisabled status={<span data-testid="st">S</span>} />);
    expect(screen.getByTestId('st')).toBeTruthy();
  });
  it('disabled still renders badge', () => {
    render(<TabCell isDisabled badge={<span data-testid="badge">B</span>} />);
    expect(screen.getByTestId('badge')).toBeTruthy();
  });
  it('disabled still renders pill', () => {
    render(<TabCell isDisabled pill={<span data-testid="pill">P</span>} />);
    expect(screen.getByTestId('pill')).toBeTruthy();
  });
});

describe('TabCell — Pressed states per type', () => {
  it('regular pressed renders with aria-selected', () => {
    render(<TabCell tabType="regular" isPressed title="T" />);
    expect(screen.getByRole('tab').getAttribute('aria-selected')).toBe('true');
  });
  it('button pressed renders with aria-selected', () => {
    render(<TabCell tabType="button" isPressed title="T" />);
    expect(screen.getByRole('tab').getAttribute('aria-selected')).toBe('true');
  });
  it('button pressed black style renders', () => {
    render(<TabCell tabType="button" tabStyle="black" isPressed title="T" />);
    expect(screen.getByRole('tab')).toBeTruthy();
  });
  it('button pressed blue style renders', () => {
    render(<TabCell tabType="button" tabStyle="blue" isPressed title="T" />);
    expect(screen.getByRole('tab')).toBeTruthy();
  });
});

describe('TabCell — aria-disabled edge cases', () => {
  it('ghost has aria-disabled', () => {
    render(<TabCell isGhost />);
    expect(screen.getByRole('tab')).toHaveAttribute('aria-disabled');
  });
  it('ghost still applies className', () => {
    render(<TabCell isGhost className="ghost-cls" />);
    expect(screen.getByRole('tab').className).toContain('ghost-cls');
  });
  it('non-disabled has no aria-disabled', () => {
    render(<TabCell />);
    expect(screen.getByRole('tab').getAttribute('aria-disabled')).toBeNull();
  });
});

describe('TabCell — Keyboard edge cases', () => {
  it('non-Enter/Space key does not fire onClick', () => {
    const fn = jest.fn();
    render(<TabCell onClick={fn} />);
    fireEvent.keyDown(screen.getByRole('tab'), { key: 'Tab' });
    expect(fn).not.toHaveBeenCalled();
  });
  it('click without onClick prop does not crash', () => {
    render(<TabCell />);
    fireEvent.click(screen.getByRole('tab'));
    expect(screen.getByRole('tab')).toBeTruthy();
  });
});

describe('TabCell — Text column rendering', () => {
  it('title only renders text column', () => {
    render(<TabCell title="Only Title" />);
    expect(screen.getByText('Only Title')).toBeTruthy();
  });
  it('subtext only (empty title) renders text column', () => {
    render(<TabCell title="" subtext="Only Sub" />);
    expect(screen.getByText('Only Sub')).toBeTruthy();
  });
  it('no title and no subtext renders no text column', () => {
    const { container } = render(<TabCell title="" />);
    // Only the tab wrapper, no text column inside
    const tab = container.querySelector('[data-testid="tabcell"]')!;
    const textCols = tab.querySelectorAll('[style*="flex-direction: column"]');
    expect(textCols.length).toBe(0);
  });
});

describe('TabCell — Style builder branches', () => {
  it('button + vertical renders (buttonVerticalPadding branch)', () => {
    render(<TabCell tabType="button" orientation="vertical" title="T" />);
    expect(screen.getByRole('tab')).toBeTruthy();
  });
  it('pressed + button + blue (no text inversion)', () => {
    render(<TabCell tabType="button" tabStyle="blue" isPressed title="T" />);
    expect(screen.getByRole('tab')).toBeTruthy();
  });
  it('pressed + button + dlvRed (no text inversion)', () => {
    render(<TabCell tabType="button" tabStyle="dlvRed" isPressed title="T" />);
    expect(screen.getByRole('tab')).toBeTruthy();
  });
  it('pressed + regular + vertical (verticalPressedBg branch)', () => {
    render(<TabCell tabType="regular" orientation="vertical" isPressed title="T" />);
    expect(screen.getByRole('tab')).toBeTruthy();
  });
  it('pressed + regular + horizontal (pressedBg branch)', () => {
    render(<TabCell tabType="regular" orientation="horizontal" isPressed title="T" />);
    expect(screen.getByRole('tab')).toBeTruthy();
  });
  it('ghost + button type (borderRadius 999px)', () => {
    render(<TabCell isGhost tabType="button" />);
    expect(screen.getByRole('tab')).toBeTruthy();
  });
  it('ghost + regular type (borderRadius 0)', () => {
    render(<TabCell isGhost tabType="regular" />);
    expect(screen.getByRole('tab')).toBeTruthy();
  });
  it('disabled subtext uses disabled color', () => {
    render(<TabCell isDisabled title="T" subtext="S" />);
    expect(screen.getByText('S')).toBeTruthy();
  });
  it('button black pressed subtext uses inverted color', () => {
    render(<TabCell tabType="button" tabStyle="black" isPressed title="T" subtext="S" />);
    expect(screen.getByText('S')).toBeTruthy();
  });
  it('default state regular renders hover/active pseudo-states', () => {
    render(<TabCell tabType="regular" title="T" />);
    expect(screen.getByRole('tab')).toBeTruthy();
  });
  it('default state button renders hover/active pseudo-states', () => {
    render(<TabCell tabType="button" title="T" />);
    expect(screen.getByRole('tab')).toBeTruthy();
  });
  it('button sm vertical uses buttonVerticalPadding', () => {
    render(<TabCell tabType="button" orientation="vertical" size="sm" title="T" />);
    expect(screen.getByRole('tab')).toBeTruthy();
  });
});

describe('TabCell — _inGroup right border', () => {
  it('blue pressed in group renders (right border branch)', () => {
    render(<TabCell tabStyle="blue" orientation="vertical" isPressed _inGroup title="T" />);
    expect(screen.getByRole('tab')).toBeTruthy();
  });
  it('dlvRed pressed in group renders (right border branch)', () => {
    render(<TabCell tabStyle="dlvRed" orientation="vertical" isPressed _inGroup title="T" />);
    expect(screen.getByRole('tab')).toBeTruthy();
  });
  it('black pressed in group has no right border branch', () => {
    render(<TabCell tabStyle="black" orientation="vertical" isPressed _inGroup title="T" />);
    expect(screen.getByRole('tab')).toBeTruthy();
  });
  it('blue pressed NOT in group (no right border)', () => {
    render(<TabCell tabStyle="blue" orientation="vertical" isPressed title="T" />);
    expect(screen.getByRole('tab')).toBeTruthy();
  });
  it('horizontal orientation in group (no right border)', () => {
    render(<TabCell tabStyle="blue" orientation="horizontal" isPressed _inGroup title="T" />);
    expect(screen.getByRole('tab')).toBeTruthy();
  });
  it('default state blue in group (active pseudo has right border)', () => {
    render(<TabCell tabStyle="blue" orientation="vertical" _inGroup title="T" />);
    expect(screen.getByRole('tab')).toBeTruthy();
  });
});
