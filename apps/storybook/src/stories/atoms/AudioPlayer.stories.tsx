import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AudioPlayer } from '@delhivery/tarmac';

const SAMPLE_AUDIO =
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

const meta: Meta<typeof AudioPlayer> = {
    title: 'Atoms/AudioPlayer',
    component: AudioPlayer,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        src: {
            control: 'text',
            description: 'Audio source URL',
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
            description: 'Size variant',
            defaultValue: 'md',
        },
        autoPlay: {
            control: 'boolean',
            description: 'Auto-play on mount',
            defaultValue: false,
        },
        trackColor: {
            control: 'color',
            description: 'Slider track color (overrides theme)',
        },
        playedTrackColor: {
            control: 'color',
            description: 'Slider played track color (overrides default)',
        },
        thumbColor: {
            control: 'color',
            description: 'Slider thumb color (overrides theme)',
        },
        borderColor: {
            control: 'color',
            description: 'Container border color (overrides theme)',
        },
        backgroundColor: {
            control: 'color',
            description: 'Container background color (overrides theme)',
        },
        buttonColor: {
            control: 'color',
            description: 'Play/pause button color (overrides theme)',
        },
        timeColor: {
            control: 'color',
            description: 'Time label color (overrides theme)',
        },
        padding: {
            control: 'text',
            description: 'Container padding (CSS shorthand)',
        },
        playIcon: {
            control: false,
            description: 'Custom play icon (React node)',
        },
        pauseIcon: {
            control: false,
            description: 'Custom pause icon (React node)',
        },
        className: {
            control: 'text',
            description: 'Additional CSS class names',
        },
        onPlay: {
            action: 'played',
            description: 'Fired when playback starts successfully',
        },
        onPause: {
            action: 'paused',
            description: 'Fired when audio is paused',
        },
        onEnded: {
            action: 'ended',
            description: 'Fired when audio playback completes',
        },
        onError: {
            action: 'error',
            description:
                'Fired when audio fails to load or play (e.g. expired S3 presigned URL). Receives MediaError | null — use error.code to distinguish network (2), decode (3), or unsupported-src/403 (4) errors.',
        },
    },
};

export default meta;

type Story = StoryObj<typeof AudioPlayer>;

export const Default: Story = {
    render: (args) => (
        <div style={{ width: 360 }}>
            <AudioPlayer {...args} />
        </div>
    ),
    args: {
        src: SAMPLE_AUDIO,
        size: 'md',
    },
};

export const Sizes: Story = {
    render: (args) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 360 }}>
            <AudioPlayer {...args} size="sm" />
            <AudioPlayer {...args} size="md" />
            <AudioPlayer {...args} size="lg" />
        </div>
    ),
    args: {
        src: SAMPLE_AUDIO,
    },
};

export const CustomColors: Story = {
    render: (args) => (
        <div style={{ width: 360 }}>
            <AudioPlayer {...args} />
        </div>
    ),
    args: {
        src: SAMPLE_AUDIO,
        size: 'md',
        trackColor: '#E0E3EB',
        playedTrackColor: '#10B981',
        thumbColor: '#ED4136',
    },
};

export const ThemedOverrides: Story = {
    render: (args) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 360 }}>
            <AudioPlayer {...args} />
            <AudioPlayer
                {...args}
                backgroundColor="#1F222E"
                borderColor="#3D445C"
                buttonColor="#FFFFFF"
                timeColor="#A3AAC2"
                trackColor="#3D445C"
                playedTrackColor="#FFB020"
                thumbColor="#5B80F7"
            />
        </div>
    ),
    args: {
        src: SAMPLE_AUDIO,
        size: 'md',
    },
};

export const WithCallbacks: Story = {
    name: 'With Callbacks (onPlay / onPause / onEnded / onError)',
    render: (args) => (
        <div style={{ width: 360 }}>
            <AudioPlayer {...args} />
        </div>
    ),
    args: {
        src: SAMPLE_AUDIO,
        size: 'md',
        onPlay: () => console.log('▶ Playing'),
        onPause: () => console.log('⏸ Paused'),
        onEnded: () => console.log('⏹ Ended'),
        onError: (err) =>
            console.warn('Audio error — code:', err?.code, err?.message),
    },
    parameters: {
        docs: {
            description: {
                story:
                    'All lifecycle callbacks are wired up. Open the browser console to see the events fire. `onError` receives a `MediaError` with a `.code` field: `2` = network, `3` = decode, `4` = src not supported / expired presigned URL (403).',
            },
        },
    },
};

/**
 * Simulates what happens when an S3 presigned URL has expired (returns 403).
 * The player resets to its initial state and surfaces the MediaError via onError.
 * In production, use onError to show a toast and re-fetch a fresh URL from the backend.
 */
export const WithErrorHandling: Story = {
    name: 'Error Handling (Expired / Broken URL)',
    render: (args) => {
        const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 360 }}>
                <AudioPlayer
                    {...args}
                    onError={(err) => {
                        const codeMap: Record<number, string> = {
                            1: 'Aborted',
                            2: 'Network error',
                            3: 'Decode error',
                            4: 'Source not supported / URL expired (403)',
                        };
                        setErrorMsg(
                            err ? `Error ${err.code}: ${codeMap[err.code] ?? 'Unknown'}` : 'Unknown error',
                        );
                    }}
                />
                {errorMsg && (
                    <div
                        style={{
                            padding: '8px 12px',
                            borderRadius: 6,
                            background: '#FEF2F2',
                            border: '1px solid #FECACA',
                            color: '#DC2626',
                            fontSize: 13,
                        }}
                    >
                        ⚠️ {errorMsg}
                    </div>
                )}
            </div>
        );
    },
    args: {
        // Intentionally broken URL to trigger onError — simulates an expired S3 presigned URL
        src: 'https://cms-call-recording-mumbai.s3.amazonaws.com/expired-url-demo.mp3',
        size: 'md',
    },
    parameters: {
        docs: {
            description: {
                story:
                    'Uses a broken URL to trigger the `onError` callback. The player resets to its idle state. In production, call your API to get a fresh presigned URL and update the `src` prop.',
            },
        },
    },
};

const CirclePlayIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="2" />
        <path d="M10 8l6 4-6 4V8z" fill="currentColor" />
    </svg>
);

const CirclePauseIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="2" />
        <rect x="9" y="8" width="2" height="8" rx="1" fill="currentColor" />
        <rect x="13" y="8" width="2" height="8" rx="1" fill="currentColor" />
    </svg>
);

export const CustomIconsAndBorder: Story = {
    render: (args) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 360 }}>
            <AudioPlayer {...args} />
            <AudioPlayer
                {...args}
                borderColor="#5B80F7"
                padding="0 20px"
                trackColor="#DBEAFE"
                playedTrackColor="#3B82F6"
                thumbColor="#1D4ED8"
            />
        </div>
    ),
    args: {
        src: SAMPLE_AUDIO,
        size: 'md',
        borderColor: '#ED4136',
        padding: '0 16px',
        playIcon: <CirclePlayIcon />,
        pauseIcon: <CirclePauseIcon />,
    },
};
