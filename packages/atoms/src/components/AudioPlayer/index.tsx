import React, { useEffect, useRef, useState, useCallback } from 'react';
import { css } from '@emotion/css';
import { useTheme } from '../ThemeProvider';
import { defaultThemeConfig } from '../../config/config';
import ThemeProvider from '../ThemeProvider';

export type AudioPlayerSize = 'sm' | 'md' | 'lg';

export interface AudioPlayerProps {
    /** Audio source URL */
    src: string;
    /** Size variant */
    size?: AudioPlayerSize;
    /** Additional CSS class name */
    className?: string;
    /** Auto-play on mount */
    autoPlay?: boolean;
    /** Callback when playback ends */
    onEnded?: () => void;
    /** Callback when audio fails to load or play (e.g. expired presigned URL, network error) */
    onError?: (error: MediaError | null) => void;
    /** Callback when playback starts */
    onPlay?: () => void;
    /** Callback when playback pauses */
    onPause?: () => void;
    /** Custom track color */
    trackColor?: string;
    /** Custom played track color */
    playedTrackColor?: string;
    /** Custom thumb color */
    thumbColor?: string;
    /** Custom container border color */
    borderColor?: string;
    /** Custom container background color */
    backgroundColor?: string;
    /** Custom button icon color */
    buttonColor?: string;
    /** Custom time text color */
    timeColor?: string;
    /** Custom container padding (CSS shorthand, e.g. '0 16px') */
    padding?: string;
    /** Custom play icon — receives { size: number } */
    playIcon?: React.ReactNode;
    /** Custom pause icon — receives { size: number } */
    pauseIcon?: React.ReactNode;
}

function formatTime(seconds: number): string {
    if (!seconds || Number.isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

const PlayIcon: React.FC<{ size: number }> = ({ size }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M8 5v14l11-7z" />
    </svg>
);

const PauseIcon: React.FC<{ size: number }> = ({ size }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
    </svg>
);

const AudioPlayerInternal = React.forwardRef<HTMLDivElement, AudioPlayerProps>(
    (
        {
            src,
            size = 'md',
            className = '',
            autoPlay = false,
            onEnded,
            onError,
            onPlay,
            onPause,
            trackColor,
            playedTrackColor,
            thumbColor,
            borderColor,
            backgroundColor,
            buttonColor,
            timeColor,
            padding,
            playIcon,
            pauseIcon,
        },
        ref
    ) => {
        const { theme } = useTheme();
        const audioPlayerConfig = theme.components?.audioPlayer || defaultThemeConfig.components.audioPlayer;

        const sz = audioPlayerConfig.sizes[size];

        const resolvedTrackColor = trackColor || audioPlayerConfig.track.color;
        const resolvedPlayedTrackColor = playedTrackColor || audioPlayerConfig.track.playedColor;
        const resolvedThumbColor = thumbColor || audioPlayerConfig.track.thumbColor;
        const resolvedBorderColor = borderColor || audioPlayerConfig.base.borderColor;
        const resolvedBackgroundColor = backgroundColor || audioPlayerConfig.base.backgroundColor;
        const resolvedButtonColor = buttonColor || audioPlayerConfig.base.buttonColor;
        const resolvedTimeColor = timeColor || audioPlayerConfig.base.timeColor;

        const audioRef = useRef<HTMLAudioElement | null>(null);
        const [isPlaying, setIsPlaying] = useState(false);
        const [currentTime, setCurrentTime] = useState(0);
        const [duration, setDuration] = useState(0);

        const togglePlay = useCallback(async () => {
            const audio = audioRef.current;
            if (!audio) return;

            try {
                if (audio.paused) {
                    await audio.play();
                    setIsPlaying(true);
                    onPlay?.();
                } else {
                    audio.pause();
                    setIsPlaying(false);
                    onPause?.();
                }
            } catch (err) {
                // Playback blocked (autoplay policy, iOS, Android WebView, etc.)
                console.warn('Audio playback failed:', err);
            }
        }, [onPlay, onPause]);

        const handleSeek = useCallback(
            (e: React.ChangeEvent<HTMLInputElement>) => {
                const audio = audioRef.current;
                if (!audio) return;
                const value = Number(e.target.value);
                audio.currentTime = value;
                setCurrentTime(value);
            },
            []
        );

        useEffect(() => {
            const audio = audioRef.current;
            if (!audio) return;

            const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
            const handleDurationReady = () => {
                if (!Number.isNaN(audio.duration)) {
                    setDuration(audio.duration);
                }
            };
            const handleEnded = () => {
                setIsPlaying(false);
                onEnded?.();
            };

            const handleError = () => {
                setIsPlaying(false);
                setCurrentTime(0);
                setDuration(0);
                onError?.(audio.error);
            };

            audio.addEventListener('timeupdate', handleTimeUpdate);
            audio.addEventListener('loadedmetadata', handleDurationReady);
            audio.addEventListener('canplay', handleDurationReady);
            audio.addEventListener('ended', handleEnded);
            audio.addEventListener('error', handleError);

            return () => {
                audio.removeEventListener('timeupdate', handleTimeUpdate);
                audio.removeEventListener('loadedmetadata', handleDurationReady);
                audio.removeEventListener('canplay', handleDurationReady);
                audio.removeEventListener('ended', handleEnded);
                audio.removeEventListener('error', handleError);
            };
        }, [onEnded, onError]);

        const containerStyles = css({
            display: 'flex',
            alignItems: 'center',
            gap: sz.gap,
            height: sz.height,
            padding: padding ?? `0 ${sz.paddingX}px`,
            borderRadius: audioPlayerConfig.base.borderRadius,
            border: `1px solid ${resolvedBorderColor}`,
            backgroundColor: resolvedBackgroundColor,
            boxSizing: 'border-box',
            fontFamily: audioPlayerConfig.base.fontFamily,
        });

        const buttonStyles = css({
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            color: resolvedButtonColor,
            flexShrink: 0,
            '&:focus-visible': {
                outline: `2px solid ${resolvedThumbColor}`,
                outlineOffset: 2,
                borderRadius: 4,
            },
        });

        const sliderStyles = css({
            flex: 1,
            appearance: 'none',
            WebkitAppearance: 'none',
            width: '100%',
            height: sz.trackHeight,
            background: `var(--track-bg, ${resolvedTrackColor})`,
            borderRadius: sz.trackHeight / 2,
            outline: 'none',
            cursor: 'pointer',
            '&::-webkit-slider-thumb': {
                WebkitAppearance: 'none',
                appearance: 'none',
                width: sz.thumbSize,
                height: sz.thumbSize,
                borderRadius: '50%',
                background: resolvedThumbColor,
                cursor: 'pointer',
                border: 'none',
            },
            '&::-moz-range-thumb': {
                width: sz.thumbSize,
                height: sz.thumbSize,
                borderRadius: '50%',
                background: resolvedThumbColor,
                cursor: 'pointer',
                border: 'none',
            },
            '&::-moz-range-track': {
                height: sz.trackHeight,
                background: `var(--track-bg, ${resolvedTrackColor})`,
                borderRadius: sz.trackHeight / 2,
                border: 'none',
            },
        });

        const timeStyles = css({
            fontSize: sz.fontSize,
            fontFamily: audioPlayerConfig.base.fontFamily,
            color: resolvedTimeColor,
            whiteSpace: 'nowrap',
            flexShrink: 0,
            fontVariantNumeric: 'tabular-nums',
            userSelect: 'none',
        });

        const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

        return (
            <div ref={ref} className={`${containerStyles} ${className}`}>
                <audio
                    ref={audioRef}
                    src={src}
                    preload="metadata"
                    autoPlay={autoPlay}
                />

                <button
                    type="button"
                    className={buttonStyles}
                    onClick={togglePlay}
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                    {isPlaying
                        ? (pauseIcon ?? <PauseIcon size={sz.iconSize} />)
                        : (playIcon ?? <PlayIcon size={sz.iconSize} />)}
                </button>

                <input
                    type="range"
                    className={sliderStyles}
                    style={{
                        '--track-bg': `linear-gradient(to right, ${resolvedPlayedTrackColor} ${progressPercentage}%, ${resolvedTrackColor} ${progressPercentage}%)`
                    } as React.CSSProperties}
                    min={0}
                    max={duration || 0}
                    step={0.1}
                    value={currentTime}
                    onChange={handleSeek}
                    aria-label="Seek"
                />

                <span className={timeStyles}>{formatTime(currentTime)} / {formatTime(duration)}</span>
            </div>
        );
    }
);

AudioPlayerInternal.displayName = 'AudioPlayerInternal';

const AudioPlayer = React.forwardRef<HTMLDivElement, AudioPlayerProps>(
    (props, ref) => {
        return (
            <ThemeProvider initialTheme={defaultThemeConfig}>
                <AudioPlayerInternal {...props} ref={ref} />
            </ThemeProvider>
        );
    }
);

AudioPlayer.displayName = 'AudioPlayer';

export default AudioPlayer;
