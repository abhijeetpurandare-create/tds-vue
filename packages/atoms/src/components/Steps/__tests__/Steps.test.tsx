import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Steps from '../index';
import type { StepProps } from '../index';

const TestIcon = () => <svg data-testid="test-icon" />;

const basicItems: StepProps[] = [
  { title: 'Step One', description: 'First description', icon: <TestIcon /> },
  { title: 'Step Two', description: 'Second description' },
  { title: 'Step Three' },
];

describe('Steps Component', () => {
  it('renders with default props and items', () => {
    render(<Steps items={basicItems} />);
    expect(screen.getByText('Step One')).toBeInTheDocument();
    expect(screen.getByText('Step Two')).toBeInTheDocument();
    expect(screen.getByText('Step Three')).toBeInTheDocument();
  });

  it('renders step descriptions', () => {
    render(<Steps items={basicItems} />);
    expect(screen.getByText('First description')).toBeInTheDocument();
    expect(screen.getByText('Second description')).toBeInTheDocument();
  });

  it('renders custom icons when provided', () => {
    render(<Steps items={basicItems} />);
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  it('renders fallback numbers when no icon is provided', () => {
    const noIconItems: StepProps[] = [
      { title: 'A' },
      { title: 'B' },
    ];
    const { container } = render(<Steps items={noIconItems} current={-1} />);
    const texts = Array.from(container.querySelectorAll('div')).map(d => d.textContent);
    expect(texts.some(t => t?.includes('1'))).toBe(true);
    expect(texts.some(t => t?.includes('2'))).toBe(true);
  });

  it('renders horizontal layout by default', () => {
    const { container } = render(<Steps items={basicItems} />);
    const stepsContainer = container.firstElementChild?.firstElementChild;
    const style = window.getComputedStyle(stepsContainer as Element);
    expect(style.flexDirection).toBe('row');
  });

  it('renders vertical layout when direction is vertical', () => {
    const { container } = render(<Steps items={basicItems} direction="vertical" />);
    const stepsContainer = container.firstElementChild?.firstElementChild;
    const style = window.getComputedStyle(stepsContainer as Element);
    expect(style.flexDirection).toBe('column');
  });

  it('handles onChange callback when step is clicked', () => {
    const handleChange = jest.fn();
    render(<Steps items={basicItems} onChange={handleChange} />);
    fireEvent.click(screen.getByText('Step Two'));
    expect(handleChange).toHaveBeenCalledWith(1);
  });

  it('handles step-level onClick callback', () => {
    const handleClick = jest.fn();
    const clickItems: StepProps[] = [
      { title: 'Clickable', onClick: handleClick },
    ];
    render(<Steps items={clickItems} />);
    fireEvent.click(screen.getByText('Clickable'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not fire callbacks on disabled steps', () => {
    const handleChange = jest.fn();
    const disabledItems: StepProps[] = [
      { title: 'Disabled Step', disabled: true },
    ];
    render(<Steps items={disabledItems} onChange={handleChange} />);
    fireEvent.click(screen.getByText('Disabled Step'));
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('renders connectors between steps but not after the last', () => {
    const { container } = render(<Steps items={basicItems} />);
    const stepContainers = container.firstElementChild?.firstElementChild?.children;
    expect(stepContainers).toBeDefined();
    if (!stepContainers) return;

    const lastStep = stepContainers[stepContainers.length - 1];
    const otherSteps = Array.from(stepContainers).slice(0, -1);

    otherSteps.forEach(step => {
      expect(step.children.length).toBeGreaterThanOrEqual(2);
    });
    expect(lastStep.children.length).toBeLessThanOrEqual(
      otherSteps[0]?.children.length ?? Infinity
    );
  });

  describe('connector variants', () => {
    it('renders solid connectors by default (no dashed border)', () => {
      const { container } = render(
        <Steps items={basicItems} direction="vertical" />
      );
      const stepContainers = container.firstElementChild?.firstElementChild?.children;
      if (!stepContainers) return;

      const firstStepChildren = Array.from(stepContainers[0].children);
      const connector = firstStepChildren[firstStepChildren.length - 1] as HTMLElement;
      const style = window.getComputedStyle(connector);
      expect(style.borderLeftStyle).not.toBe('dashed');
    });

    it('renders dotted connectors when connectorVariant is dotted (vertical)', () => {
      const { container } = render(
        <Steps items={basicItems} direction="vertical" connectorVariant="dotted" />
      );
      const stepContainers = container.firstElementChild?.firstElementChild?.children;
      if (!stepContainers) return;

      const firstStepChildren = Array.from(stepContainers[0].children);
      const connector = firstStepChildren[firstStepChildren.length - 1] as HTMLElement;
      const style = window.getComputedStyle(connector);
      expect(style.width).toBe('0px');
    });

    it('renders dotted connectors when connectorVariant is dotted (horizontal)', () => {
      const { container } = render(
        <Steps items={basicItems} direction="horizontal" connectorVariant="dotted" />
      );
      const stepContainers = container.firstElementChild?.firstElementChild?.children;
      if (!stepContainers) return;

      const firstStepChildren = Array.from(stepContainers[0].children);
      const connector = firstStepChildren[firstStepChildren.length - 1] as HTMLElement;
      const style = window.getComputedStyle(connector);
      expect(style.height).toBe('0px');
    });
  });

  describe('description styling props', () => {
    it('applies descriptionColor', () => {
      const { container } = render(
        <Steps items={basicItems} descriptionColor="#FF0000" />
      );
      const desc = screen.getByText('First description');
      const style = window.getComputedStyle(desc);
      expect(style.color).toBe('rgb(255, 0, 0)');
    });

    it('applies descriptionSize', () => {
      const { container } = render(
        <Steps items={basicItems} descriptionSize="18px" />
      );
      const desc = screen.getByText('First description');
      const style = window.getComputedStyle(desc);
      expect(style.fontSize).toBe('18px');
    });

    it('applies descriptionWeight', () => {
      render(<Steps items={basicItems} descriptionWeight="700" />);
      const desc = screen.getByText('First description');
      const style = window.getComputedStyle(desc);
      expect(style.fontWeight).toBe('700');
    });

    it('applies descriptionFont', () => {
      render(<Steps items={basicItems} descriptionFont="Georgia, serif" />);
      const desc = screen.getByText('First description');
      const style = window.getComputedStyle(desc);
      expect(style.fontFamily.replace(/\s/g, '')).toBe('Georgia,serif');
    });

    it('falls back to default description styles when no props provided', () => {
      render(<Steps items={basicItems} />);
      const desc = screen.getByText('First description');
      const style = window.getComputedStyle(desc);
      expect(style.color).toBe('rgb(156, 163, 175)');
      expect(style.fontWeight).toBe('400');
    });
  });

  describe('title styling props', () => {
    it('applies titleColor', () => {
      render(<Steps items={basicItems} titleColor="#0000FF" />);
      const title = screen.getByText('Step One');
      const style = window.getComputedStyle(title);
      expect(style.color).toBe('rgb(0, 0, 255)');
    });

    it('applies titleSize', () => {
      render(<Steps items={basicItems} titleSize="20px" />);
      const title = screen.getByText('Step One');
      const style = window.getComputedStyle(title);
      expect(style.fontSize).toBe('20px');
    });

    it('applies titleWeight', () => {
      render(<Steps items={basicItems} titleWeight="800" />);
      const title = screen.getByText('Step One');
      const style = window.getComputedStyle(title);
      expect(style.fontWeight).toBe('800');
    });
  });

  describe('step statuses', () => {
    it('renders check icon for finished steps', () => {
      const finishedItems: StepProps[] = [
        { title: 'Done', status: 'finish' },
        { title: 'Pending' },
      ];
      const { container } = render(<Steps items={finishedItems} />);
      const svgs = container.querySelectorAll('svg');
      expect(svgs.length).toBeGreaterThan(0);
    });

    it('renders close icon for error steps', () => {
      const errorItems: StepProps[] = [
        { title: 'Failed', status: 'error' },
        { title: 'Pending' },
      ];
      const { container } = render(<Steps items={errorItems} />);
      const svgs = container.querySelectorAll('svg');
      expect(svgs.length).toBeGreaterThan(0);
    });

    it('applies status override from parent', () => {
      const items: StepProps[] = [
        { title: 'First' },
        { title: 'Second' },
      ];
      const { container } = render(
        <Steps items={items} current={0} status="error" />
      );
      const svgs = container.querySelectorAll('svg');
      expect(svgs.length).toBeGreaterThan(0);
    });
  });

  describe('backward compatibility', () => {
    it('renders correctly with no new props (solid connectors, default desc styles)', () => {
      const items: StepProps[] = [
        { title: 'A', description: 'desc A' },
        { title: 'B', description: 'desc B' },
      ];
      const { container } = render(<Steps items={items} current={0} />);
      expect(screen.getByText('A')).toBeInTheDocument();
      expect(screen.getByText('desc A')).toBeInTheDocument();
      expect(screen.getByText('B')).toBeInTheDocument();
      expect(screen.getByText('desc B')).toBeInTheDocument();

      const desc = screen.getByText('desc A');
      const style = window.getComputedStyle(desc);
      expect(style.color).toBe('rgb(156, 163, 175)');
    });

    it('renders without items (empty state)', () => {
      const { container } = render(<Steps />);
      expect(container.firstElementChild).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(
        <Steps items={basicItems} className="my-custom-class" />
      );
      expect(container.firstElementChild).toHaveClass('my-custom-class');
    });
  });
});
