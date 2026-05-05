import React from 'react';
import { render, screen } from '@testing-library/react';
import Avatar from '../index';

jest.mock('../../ThemeProvider', () => ({
  useTheme: () => ({
    theme: { components: {} },
  }),
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('Avatar Component', () => {
  it('renders with initials children', () => {
    render(<Avatar>AB</Avatar>);
    expect(screen.getByText('AB')).toBeInTheDocument();
  });

  it('renders as a span element', () => {
    const { container } = render(<Avatar>X</Avatar>);
    expect(container.querySelector('span')).toBeInTheDocument();
  });

  it('renders image type with src', () => {
    render(<Avatar avatarType="image" src="https://example.com/photo.jpg" alt="user" />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://example.com/photo.jpg');
    expect(img).toHaveAttribute('alt', 'user');
  });

  it('renders numeric type with +N content', () => {
    render(<Avatar avatarType="numeric">+5</Avatar>);
    expect(screen.getByText('+5')).toBeInTheDocument();
  });

  it('renders icon type with icon prop', () => {
    render(
      <Avatar avatarType="icon" icon={<svg data-testid="test-icon" />} />
    );
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  it('renders all 4 sizes without error', () => {
    const sizes = ['sm', 'md', 'lg', 'xl'] as const;
    sizes.forEach((s) => {
      const { unmount } = render(<Avatar size={s}>{s}</Avatar>);
      expect(screen.getByText(s)).toBeInTheDocument();
      unmount();
    });
  });

  it('renders both shapes without error', () => {
    const shapes = ['round', 'square'] as const;
    shapes.forEach((sh) => {
      const { unmount } = render(<Avatar shape={sh}>{sh}</Avatar>);
      expect(screen.getByText(sh)).toBeInTheDocument();
      unmount();
    });
  });

  it('shows status dot when showStatus is true and shape is round', () => {
    render(<Avatar showStatus shape="round">A</Avatar>);
    expect(screen.getByTestId('avatar-status-dot')).toBeInTheDocument();
  });

  it('hides status dot when shape is square', () => {
    render(<Avatar showStatus shape="square">A</Avatar>);
    expect(screen.queryByTestId('avatar-status-dot')).not.toBeInTheDocument();
  });

  it('hides status dot by default', () => {
    render(<Avatar>A</Avatar>);
    expect(screen.queryByTestId('avatar-status-dot')).not.toBeInTheDocument();
  });

  it('renders disabled state', () => {
    render(<Avatar isDisabled>D</Avatar>);
    expect(screen.getByText('D')).toBeInTheDocument();
  });

  it('renders ghost state with no visible content', () => {
    const { container } = render(<Avatar isGhost>G</Avatar>);
    expect(screen.queryByText('G')).not.toBeInTheDocument();
    expect(container.querySelector('[data-testid="avatar"]')).toBeInTheDocument();
  });

  it('renders disabled image with overlay', () => {
    const { container } = render(
      <Avatar avatarType="image" src="https://example.com/photo.jpg" isDisabled />
    );
    const img = container.querySelector('img');
    expect(img).toBeInTheDocument();
    // Overlay span should exist after the img
    const spans = container.querySelectorAll('[data-testid="avatar"] > span');
    expect(spans.length).toBeGreaterThanOrEqual(1);
  });

  it('accepts className prop', () => {
    const { container } = render(<Avatar className="my-avatar">C</Avatar>);
    expect(container.querySelector('.my-avatar')).toBeInTheDocument();
  });

  it('handles onClick', () => {
    const handleClick = jest.fn();
    render(<Avatar onClick={handleClick}>Click</Avatar>);
    screen.getByText('Click').closest('[data-testid="avatar"]')?.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('sets role=button when onClick is provided', () => {
    render(<Avatar onClick={() => {}}>B</Avatar>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders all status dot types without error', () => {
    const types = ['active', 'inactive', 'idle', 'brand'] as const;
    types.forEach((t) => {
      const { unmount } = render(<Avatar showStatus statusType={t}>{t}</Avatar>);
      expect(screen.getByTestId('avatar-status-dot')).toBeInTheDocument();
      unmount();
    });
  });

  it('does not show status dot in ghost state', () => {
    render(<Avatar showStatus isGhost>G</Avatar>);
    expect(screen.queryByTestId('avatar-status-dot')).not.toBeInTheDocument();
  });
});
