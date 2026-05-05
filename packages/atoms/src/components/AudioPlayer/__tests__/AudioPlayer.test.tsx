import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import AudioPlayer from '../index';

describe('AudioPlayer Component', () => {
    const sampleSrc = 'https://example.com/audio.mp3';

    it('renders without crashing', () => {
        const { container } = render(<AudioPlayer src={sampleSrc} />);
        expect(container.firstChild).toBeInTheDocument();
    });

    it('renders a play button by default', () => {
        render(<AudioPlayer src={sampleSrc} />);
        expect(screen.getByLabelText('Play')).toBeInTheDocument();
    });

    it('renders the seek slider', () => {
        render(<AudioPlayer src={sampleSrc} />);
        expect(screen.getByLabelText('Seek')).toBeInTheDocument();
    });

    it('renders the time label', () => {
        render(<AudioPlayer src={sampleSrc} />);
        expect(screen.getByText('00:00')).toBeInTheDocument();
    });

    it('applies custom className', () => {
        const { container } = render(
            <AudioPlayer src={sampleSrc} className="custom-class" />
        );
        expect(container.firstChild).toHaveClass('custom-class');
    });

    it('renders all three sizes without errors', () => {
        const { rerender, container } = render(
            <AudioPlayer src={sampleSrc} size="sm" />
        );
        expect(container.firstChild).toBeInTheDocument();

        rerender(<AudioPlayer src={sampleSrc} size="md" />);
        expect(container.firstChild).toBeInTheDocument();

        rerender(<AudioPlayer src={sampleSrc} size="lg" />);
        expect(container.firstChild).toBeInTheDocument();
    });

    it('applies custom borderColor via prop override', () => {
        const { container } = render(
            <AudioPlayer src={sampleSrc} borderColor="#FF0000" />
        );
        const wrapper = container.firstChild as HTMLElement;
        const style = window.getComputedStyle(wrapper);
        expect(style.border.toLowerCase()).toContain('#ff0000');
    });

    it('applies custom backgroundColor via prop override', () => {
        const { container } = render(
            <AudioPlayer src={sampleSrc} backgroundColor="#123456" />
        );
        const wrapper = container.firstChild as HTMLElement;
        const style = window.getComputedStyle(wrapper);
        expect(style.backgroundColor).toBe('rgb(18, 52, 86)');
    });

    it('applies custom timeColor via prop override', () => {
        render(<AudioPlayer src={sampleSrc} timeColor="#AABBCC" />);
        const timeSpan = screen.getByText('00:00');
        const style = window.getComputedStyle(timeSpan);
        expect(style.color).toBe('rgb(170, 187, 204)');
    });

    it('applies custom buttonColor via prop override', () => {
        render(<AudioPlayer src={sampleSrc} buttonColor="#112233" />);
        const button = screen.getByLabelText('Play');
        const style = window.getComputedStyle(button);
        expect(style.color).toBe('rgb(17, 34, 51)');
    });

    it('uses theme defaults when no prop overrides provided', () => {
        const { container } = render(<AudioPlayer src={sampleSrc} />);
        const wrapper = container.firstChild as HTMLElement;
        const style = window.getComputedStyle(wrapper);
        expect(style.backgroundColor).toBe('rgb(255, 255, 255)');
    });
});
