import React, {useEffect, useRef, useState} from "react";
import {css} from "@emotion/css";
import {useTheme} from "../ThemeProvider";
import {defaultColors} from "../../config/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { TdsTimePickerView } from "./TdsTimePickerView";
import { TdsTimePickerBottomSheetView } from "./TdsTimePickerBottomSheetView";

export type TimePickerVariant = "primary" | "success" | "warning" | "error" | "info" | "default";

export type TimePickerProps = {
  value?: string; // Format: 'HH:mm' or 'HH:mm:ss'
  onChange?: (value: string) => void;
  use24Hour?: boolean;
  showSeconds?: boolean;
  variant?: TimePickerVariant;
  className?: string;
  customClassNames?: {
    label?: string;
    input?: string;
    dropdown?: string;
    timeItem?: string;
    icon?: string;
  };
  icon?: React.ReactNode; 
  showIcon?: boolean;
  iconPosition?: 'left' | 'right';
  placeholder?: string; // Placeholder text when no time is selected
  allowClear?: boolean; // Allow clearing the selected time
  // Range restriction in 24h format: e.g. 9 to 18 means 09:00 to 18:59 allowed, but minutes disabled for 18:xx
  startTime?: number; // 0-23 (inclusive)
  EndTime?: number;   // 0-23 (inclusive)
  /** Activates the Tarmac TDS rendering path. When set, uses Emotion + theme tokens instead of Tailwind. */
  pickerStyle?: 'tds' | 'bottomSheet' | (string & {});
  /** Callback for cancel action */
  onCancel?: () => void;
  /** Title shown in the bottom sheet header (bottomSheet mode only) */
  title?: string;
  /** Subtext shown below the title (bottomSheet mode only) */
  subtext?: string;
  /** Whether to show the subtext row (bottomSheet mode only, default true) */
  showSubtext?: boolean;
};

const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);

interface ParsedTime {
  hour: number | null;
  minute: number | null;
  second: number | null;
  ampm: "AM" | "PM" | null;
}

// Function to get theme colors for selected items
const getSelectedItemColors = (variant: TimePickerVariant) => {
  const colors = {
    primary: {
      backgroundColor: defaultColors.primary.main,
      textColor: defaultColors.primary.contrast,
    },
    success: {
      backgroundColor: defaultColors.success.main,
      textColor: defaultColors.success.contrast,
    },
    warning: {
      backgroundColor: defaultColors.warning.main,
      textColor: defaultColors.warning.contrast,
    },
    error: {
      backgroundColor: defaultColors.error.main,
      textColor: defaultColors.error.contrast,
    },
    info: {
      backgroundColor: defaultColors.info.main,
      textColor: defaultColors.info.contrast,
    },
    default: {
      backgroundColor: "#3B82F6",
      textColor: "#FFFFFF",
    },
  };
  return colors[variant] || colors.default;
};

export const TimePicker: React.FC<TimePickerProps> = ({
  value = "",
  onChange,
  use24Hour = false,
  showSeconds = false,
  variant = "default",
  className = "", 
  customClassNames = {},
  icon = <FontAwesomeIcon icon={faClock} className="text-gray-400" />, 
  showIcon = true, 
  iconPosition = 'right', 
  placeholder = "Select time", 
  allowClear = false, 
  startTime,
  EndTime,
  pickerStyle,
  onCancel,
  title,
  subtext,
  showSubtext = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const {theme} = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const columnRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Use theme colors as default, fallback to getSelectedItemColors if not available
  const getThemeColors = () => {
    const themeVariant = theme?.components?.timePicker?.variants?.[variant];
    if (themeVariant) {
      return {
        backgroundColor: themeVariant.backgroundColor,
        textColor: themeVariant.textColor,
        hoverColor: themeVariant.hoverColor,
        lightBackground: themeVariant.lightBackground,
        lightTextColor: themeVariant.lightTextColor,
      };
    }
    
    return getSelectedItemColors(variant);
  };
  
  const selectedColors = getThemeColors();

  // Helpers for 24h conversions and range checks
  const normalizeRange = () => {
    const start = typeof startTime === "number" && startTime >= 0 && startTime <= 23 ? startTime : 0;
    const end = typeof EndTime === "number" && EndTime >= 0 && EndTime <= 23 ? EndTime : 23;
    return { start, end };
  };

  const hasRange = typeof startTime === "number" || typeof EndTime === "number";

  const to24Hour = (displayHour: number, ampmValue: "AM" | "PM" | null, is24Mode: boolean): number => {
    if (is24Mode) return displayHour;
    if (ampmValue === null) {
      // Default assumption if AM/PM not selected yet: use AM mapping
      return displayHour % 12;
    }
    return ampmValue === "PM" ? (displayHour % 12) + 12 : displayHour % 12;
  };

  const isHourWithinRange = (h24: number): boolean => {
    const { start, end } = normalizeRange();
    return h24 >= start && h24 <= end;
  };

  const isHourOptionDisabled = (val: ColumnValue): boolean => {
    if (typeof val !== "number") return false;
    // If no constraints provided, nothing is disabled
    if (typeof startTime !== "number" && typeof EndTime !== "number") return false;

    if (use24Hour) {
      return !isHourWithinRange(val);
    }
    // 12-hour mode: if AM/PM is selected, evaluate exact mapping; otherwise evaluate both possibilities
    if (ampm) {
      const h24 = to24Hour(val, ampm, false);
      return !isHourWithinRange(h24);
    }
    // Without AM/PM selected yet, disable only if both AM and PM mappings are out of range
    const amH24 = to24Hour(val, "AM", false);
    const pmH24 = to24Hour(val, "PM", false);
    return !isHourWithinRange(amH24) && !isHourWithinRange(pmH24);
  };

  const getSelectedHour24 = (): number | null => {
    if (hour === null) return null;
    const h = use24Hour ? hour : to24Hour(hour % 12 || 12, ampm, false);
    return use24Hour ? h : h; // clarity
  };

  const isMinuteOptionDisabled = (_val: ColumnValue): boolean => {
    // If no constraints, never disable minutes
    if (typeof startTime !== "number" && typeof EndTime !== "number") return false;
    const selectedHour24 = getSelectedHour24();
    if (selectedHour24 === null) return false;
    const { end } = normalizeRange();
    // Disable all minutes when selected hour equals end boundary
    return selectedHour24 === end;
  };

  const getFirstAllowedSlot = () => {
    const { start } = normalizeRange();
    const hour24 = start;
    const minuteVal = 0;
    const secondVal = 0;
    if (use24Hour) {
      return { hour: hour24, minute: minuteVal, second: secondVal, ampm: null as "AM" | "PM" | null };
    }
    const displayH = hour24 % 12 || 12;
    const ampmVal: "AM" | "PM" = hour24 >= 12 ? "PM" : "AM";
    return { hour: displayH, minute: minuteVal, second: secondVal, ampm: ampmVal };
  };

  // Find the adjacent valid hour given a direction (-1 for up/previous, +1 for down/next)
  const findAdjacentValidHour = (direction: -1 | 1) => {
    if (use24Hour) {
      const current = (hour ?? (hasRange ? normalizeRange().start : 0));
      let next = current + direction;
      while (next >= 0 && next <= 23 && hasRange && !isHourWithinRange(next)) {
        next += direction;
      }
      if (next < 0 || next > 23) return null;
      if (hasRange && !isHourWithinRange(next)) return null;
      return { hour24: next, display: next, ampm: null as "AM" | "PM" | null };
    }

    // 12-hour mode: step display hour with AM/PM flips
    const currentDisplay = (displayHour ?? (hasRange ? (getFirstAllowedSlot().hour as number) : 12)) as number;
    let currDisplay = currentDisplay;
    let currAmpm: "AM" | "PM" = (ampm ?? (currDisplay >= 12 ? "PM" : "AM")) as "AM" | "PM";

    // Try up to 24 steps to find a valid mapping
    for (let i = 0; i < 24; i++) {
      let nextDisplay: number;
      let nextAmpm: "AM" | "PM" = currAmpm;
      if (direction === -1) {
        nextDisplay = currDisplay === 1 ? 12 : currDisplay - 1;
        if (currDisplay === 12) {
          nextAmpm = currAmpm === "AM" ? "PM" : "AM";
        }
      } else {
        nextDisplay = currDisplay === 12 ? 1 : currDisplay + 1;
        if (currDisplay === 11) {
          nextAmpm = currAmpm === "AM" ? "PM" : "AM";
        }
      }

      const candidate24 = to24Hour(nextDisplay % 12 || 12, nextAmpm, false);
      if (!hasRange || isHourWithinRange(candidate24)) {
        return { hour24: candidate24, display: nextDisplay, ampm: nextAmpm };
      }

      currDisplay = nextDisplay;
      currAmpm = nextAmpm;
    }

    return null;
  };

  const stepHourToAdjacentValid = (direction: -1 | 1) => {
    const result = findAdjacentValidHour(direction);
    if (!result) return;
    if (use24Hour) {
      setHour(result.hour24);
      const { end } = normalizeRange();
      const m = hasRange && result.hour24 === end ? 0 : (minute ?? 0);
      setMinute(m);
    } else {
      setHour(result.display);
      setAmpm(result.ampm);
      const { end } = normalizeRange();
      const m = hasRange && result.hour24 === end ? 0 : (minute ?? 0);
      setMinute(m);
    }
  };

  const parseTime = (timeStr: string): ParsedTime => {
    if (!timeStr || timeStr.trim() === "") {
      return {
        hour: null,
        minute: null,
        second: null,
        ampm: null,
      };
    }
    
    const trimmed = timeStr.trim();
    // Handle "HH:mm AM/PM" format
    const ampmMatch = trimmed.match(/\s*(AM|PM)$/i);
    const timePart = ampmMatch ? trimmed.replace(/\s*(AM|PM)$/i, '').trim() : trimmed;
    const explicitAmpm = ampmMatch ? ampmMatch[1].toUpperCase() as "AM" | "PM" : null;
    
    const [h, m, s] = timePart.split(":").map(Number);
    const hourVal = isNaN(h) ? 0 : h;
    const minuteVal = isNaN(m) ? 0 : m;
    const secondVal = isNaN(s) ? 0 : s;
    
    // If AM/PM was explicit in the string, convert to 24h for internal state
    let hour24 = hourVal;
    let resolvedAmpm: "AM" | "PM";
    if (explicitAmpm) {
      // Input is 12h format like "06:25 PM"
      hour24 = explicitAmpm === "PM" ? (hourVal % 12) + 12 : hourVal % 12;
      resolvedAmpm = explicitAmpm;
    } else {
      // Input is 24h format like "18:25"
      resolvedAmpm = hourVal >= 12 ? "PM" : "AM";
      hour24 = hourVal;
    }
    
    return {
      hour: hour24,
      minute: minuteVal,
      second: secondVal,
      ampm: resolvedAmpm,
    };
  };

  const {
    hour: initialHour,
    minute: initialMinute,
    second: initialSecond,
    ampm: initialAmpm,
  } = parseTime(value);

  const [hour, setHour] = useState<number | null>(initialHour);
  const [minute, setMinute] = useState<number | null>(initialMinute);
  const [second, setSecond] = useState<number | null>(initialSecond);
  const [ampm, setAmpm] = useState<"AM" | "PM" | null>(initialAmpm);

  // Commit buffered selection to consumer and close
  const commitSelection = () => {
    if (hour === null || minute === null || (showSeconds && second === null)) {
      setIsOpen(false);
      return;
    }
    let finalHour = hour;
    if (!use24Hour && ampm !== null) {
      finalHour = ampm === "PM" ? (hour % 12) + 12 : hour % 12;
    }
    const { end } = normalizeRange();
    const clampedMinute = hasRange && finalHour === end ? 0 : minute;
    const finalSecond = showSeconds ? (second ?? 0) : 0;
    const formatted = `${pad(finalHour)}:${pad(clampedMinute)}${showSeconds ? `:${pad(finalSecond)}` : ""}`;
    onChange?.(formatted);
    setIsOpen(false);
  };

  const handleClear = () => {
    setHour(null);
    setMinute(null);
    setSecond(null);
    setAmpm(null);
    onChange?.("");
    setIsOpen(false);
  };

  const displayHour = hour !== null ? (use24Hour ? hour : hour % 12 || 12) : null;
  const committedDisplayHour = initialHour !== null ? (use24Hour ? initialHour : (initialHour % 12) || 12) : null;
  const inputValue = initialHour !== null && initialMinute !== null 
    ? `${pad(committedDisplayHour!)}:${pad(initialMinute)}${
        showSeconds && initialSecond !== null ? `:${pad(initialSecond)}` : ""
      }${!use24Hour && initialAmpm ? ` ${initialAmpm}` : ""}` 
    : "";

  const hours = use24Hour
    ? [...Array(24).keys()]
    : [...Array(12).keys()]?.map((h) => (h === 0 ? 12 : h));
  const minutes = [...Array(60).keys()];
  const seconds = [...Array(60).keys()];
  const ampmOptions: ("AM" | "PM")[] = ["AM", "PM"];

  // Dynamic styles for selected items
  const selectedItemStyles = css({
    backgroundColor: selectedColors.backgroundColor,
    color: selectedColors.textColor,
    borderRadius: "0.25rem",
    fontWeight: "500",
  });

  type ColumnValue = number | "AM" | "PM" | null;
  interface Column {
    label: "hh" | "mm" | "ss" | "AM/PM";
    values: ColumnValue[];
    selected: ColumnValue;
    setter: (value: ColumnValue) => void;
    onChange: (value: ColumnValue) => void;
  }

  const columns: Column[] = [
    {
      label: "hh",
      values: hours as number[],
      selected: displayHour,
      setter: (v: ColumnValue) => {
        const newHour = Number(v);
        setHour(newHour);
        // Initialize minute and ampm if they're null
        const newMinute = minute ?? 0;
        const newSecond = second ?? 0;
        const newAmpm = !use24Hour && ampm === null ? (newHour >= 12 ? "PM" : "AM") : ampm;
        
        // If selecting end boundary hour, force minute to 0
        if (hasRange) {
          const newHour24 = use24Hour ? newHour : to24Hour(newHour % 12 || 12, newAmpm as any, false);
          const { end } = normalizeRange();
          if (newHour24 === end) {
            setMinute(0);
          } else if (minute === null) {
            setMinute(newMinute);
          }
        } else if (minute === null) {
          setMinute(newMinute);
        }
        if (second === null && showSeconds) setSecond(newSecond);
        if (!use24Hour && ampm === null) setAmpm(newAmpm);
      },
      onChange: (_v: ColumnValue) => {},
    },
    {
      label: "mm",
      values: minutes as number[],
      selected: minute,
      setter: (v: ColumnValue) => {
        const newMinute = Number(v);
        // If currently at end boundary hour, keep minutes at 0
        if (hasRange) {
          const selectedHour24 = getSelectedHour24();
          const { end } = normalizeRange();
          if (selectedHour24 === end) {
            setMinute(0);
          } else {
            setMinute(newMinute);
          }
        } else {
          setMinute(newMinute);
        }
        // Initialize hour and ampm if they're null
        const newHour = hour ?? 0;
        const newSecond = second ?? 0;
        const newAmpm = !use24Hour && ampm === null ? (newHour >= 12 ? "PM" : "AM") : ampm;
        
        if (hour === null) setHour(newHour);
        if (second === null && showSeconds) setSecond(newSecond);
        if (!use24Hour && ampm === null) setAmpm(newAmpm);
      },
      onChange: (_v: ColumnValue) => {},
    },
  ];

  if (showSeconds) {
    columns.push({
      label: "ss",
      values: seconds as number[],
      selected: second,
      setter: (v: ColumnValue) => {
        const newSecond = Number(v);
        setSecond(newSecond);
        // Initialize hour, minute and ampm if they're null
        const newHour = hour ?? 0;
        const newMinute = minute ?? 0;
        const newAmpm = !use24Hour && ampm === null ? (newHour >= 12 ? "PM" : "AM") : ampm;
        
        if (hour === null) setHour(newHour);
        if (minute === null) setMinute(newMinute);
        if (!use24Hour && ampm === null) setAmpm(newAmpm);
      },
      onChange: (_v: ColumnValue) => {},
    });
  }

  if (!use24Hour) {
    columns.push({
      label: "AM/PM",
      values: ampmOptions,
      selected: ampm,
      setter: (v: ColumnValue) => {
        const newAmpm = v as "AM" | "PM";
        setAmpm(newAmpm);
        // Initialize hour and minute if they're null
        const newHour = hour ?? 0;
        const newMinute = minute ?? 0;
        const newSecond = second ?? 0;
        
        if (hour === null) setHour(newHour);
        if (minute === null) setMinute(newMinute);
        if (second === null && showSeconds) setSecond(newSecond);
      },
      onChange: (_v: ColumnValue) => {},
    });
  }

  useEffect(() => {
    function onDocMouseDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        // Close without committing changes
        setIsOpen(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", onDocMouseDown);
      document.addEventListener("keydown", onKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", onDocMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  // Determine if Done should be disabled (incomplete or invalid selection)
  const isDoneDisabled = (() => {
    const isComplete = hour !== null && minute !== null && (!showSeconds || second !== null);
    if (!isComplete) return true;
    if (!hasRange) return false;
    const selectedHour24 = getSelectedHour24();
    if (selectedHour24 === null) return true;
    if (!isHourWithinRange(selectedHour24)) return true;
    const { end } = normalizeRange();
    if (selectedHour24 === end && (minute ?? 0) !== 0) return true;
    return false;
  })();

  // When opening with empty value and range specified, preselect first allowed slot
  useEffect(() => {
    if (isOpen && hasRange) {
      const noHour = hour === null;
      const noMinute = minute === null;
      const noSecond = showSeconds ? second === null : false;
      const needsInit = noHour || noMinute || noSecond || (!use24Hour && ampm === null);
      if (needsInit) {
        const first = getFirstAllowedSlot();
        setHour(first.hour);
        setMinute(first.minute);
        if (showSeconds) setSecond(first.second);
        if (!use24Hour) setAmpm(first.ampm);
      }
    }
  }, [isOpen]);

  // ── Bottom Sheet rendering path ──
  if (pickerStyle === 'bottomSheet') {
    const tpConfig = theme?.components?.timePicker || {};

    const tdsCommit = () => {
      if (hour === null || minute === null || (showSeconds && second === null)) {
        setIsOpen(false);
        return;
      }
      const dh = use24Hour ? hour : (hour % 12 || 12);
      const sec = showSeconds ? (second ?? 0) : 0;
      const time = `${pad(dh)}:${pad(minute)}${showSeconds ? `:${pad(sec)}` : ''}`;
      onChange?.(use24Hour ? time : `${time} ${ampm || 'AM'}`);
      setIsOpen(false);
    };

    return (
      <div ref={containerRef} className={className}>
        {/* Trigger button */}
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '10px 12px', fontSize: 14, fontWeight: 500,
            border: '1px solid #e6e6e6', borderRadius: 6,
            background: '#fff', cursor: 'pointer', color: '#2b2b2b',
          }}
        >
          <span>{inputValue || placeholder}</span>
        </button>

        <TdsTimePickerBottomSheetView
          isOpen={isOpen}
          hour={hour}
          minute={minute}
          second={second}
          ampm={ampm}
          isDoneDisabled={isDoneDisabled}
          use24Hour={use24Hour}
          showSeconds={showSeconds}
          title={title}
          subtext={subtext}
          showSubtext={showSubtext}
          themeConfig={tpConfig}
          isHourDisabled={hasRange ? (val) => isHourOptionDisabled(val) : undefined}
          isMinuteDisabled={hasRange ? (val) => isMinuteOptionDisabled(val) : undefined}
          onClose={() => setIsOpen(false)}
          onHourChange={(h) => columns[0].setter(h)}
          onMinuteChange={(m) => { setMinute(m); if (hour === null) setHour(use24Hour ? 0 : 12); if (!use24Hour && ampm === null) setAmpm('AM'); }}
          onSecondChange={(s) => { setSecond(s); if (hour === null) setHour(use24Hour ? 0 : 12); if (minute === null) setMinute(0); }}
          onAmpmChange={(v) => { setAmpm(v); if (hour === null) setHour(12); if (minute === null) setMinute(0); }}
          onSave={tdsCommit}
          onCancel={() => { setIsOpen(false); onCancel?.(); }}
        />
      </div>
    );
  }

  // ── Tarmac TDS rendering path ──
  // Delegates to TdsTimePickerView. All state/validation stays here.
  if (pickerStyle) {
    const tpConfig = theme?.components?.timePicker || {};

    // TDS commit: outputs "HH:MM AM/PM" for 12h, "HH:MM" for 24h
    const tdsCommit = () => {
      if (hour === null || minute === null || (showSeconds && second === null)) {
        setIsOpen(false);
        return;
      }
      const dh = use24Hour ? hour : (hour % 12 || 12);
      const sec = showSeconds ? (second ?? 0) : 0;
      const time = `${pad(dh)}:${pad(minute)}${showSeconds ? `:${pad(sec)}` : ''}`;
      onChange?.(use24Hour ? time : `${time} ${ampm || 'AM'}`);
      setIsOpen(false);
    };

    return (
      <div ref={containerRef} className={className}>
        <TdsTimePickerView
          isOpen={isOpen}
          hour={hour}
          minute={minute}
          second={second}
          ampm={ampm}
          inputValue={inputValue}
          isDoneDisabled={isDoneDisabled}
          use24Hour={use24Hour}
          showSeconds={showSeconds}
          placeholder={placeholder}
          className={className}
          themeConfig={tpConfig}
          isHourDisabled={hasRange ? (val) => isHourOptionDisabled(val) : undefined}
          isMinuteDisabled={hasRange ? (val) => isMinuteOptionDisabled(val) : undefined}
          onToggle={() => setIsOpen(!isOpen)}
          onHourChange={(h) => columns[0].setter(h)}
          onMinuteChange={(m) => { setMinute(m); if (hour === null) setHour(use24Hour ? 0 : 12); if (!use24Hour && ampm === null) setAmpm('AM'); }}
          onSecondChange={(s) => { setSecond(s); if (hour === null) setHour(use24Hour ? 0 : 12); if (minute === null) setMinute(0); }}
          onAmpmChange={(v) => { setAmpm(v); if (hour === null) setHour(12); if (minute === null) setMinute(0); }}
          onSave={tdsCommit}
          onCancel={() => { setIsOpen(false); onCancel?.(); }}
        />
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative w-fit ${className}`}>
      <div className="relative flex items-center">
        {showIcon && iconPosition === 'left' && (
          <div 
            className={`absolute left-2 z-10 pointer-events-none ${customClassNames.icon || ""}`}
            onClick={() => setIsOpen(!isOpen)}
            style={{ cursor: 'pointer', pointerEvents: 'auto' }}
          >
            {icon}
          </div>
        )}
        <input
          type="text"
          readOnly
          tabIndex={0}
          value={inputValue}
          placeholder={placeholder}
          onClick={() => setIsOpen(!isOpen)}
          className={`p-2 h-[40px] border rounded w-32 cursor-pointer bg-white focus:border-blue-500 focus:outline-none ${
            isOpen ? "ring-2 ring-blue-500" : ""
          } ${showIcon && iconPosition === 'left' ? 'pl-8' : ''} ${
            showIcon && iconPosition === 'right' ? (allowClear && inputValue ? 'pr-14' : 'pr-8') : (allowClear && inputValue ? 'pr-6' : '')
          } ${customClassNames.input || ""}`}
        />
        {allowClear && inputValue && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleClear();
            }}
            className={`absolute ${showIcon && iconPosition === 'right' ? 'right-8' : 'right-2'} z-10 text-gray-400 hover:text-gray-600 focus:outline-none`}
            aria-label="Clear time"
          >
            ×
          </button>
        )}
        {showIcon && iconPosition === 'right' && (
          <div 
            className={`absolute right-2 z-10 pointer-events-none ${customClassNames.icon || ""}`}
            onClick={() => setIsOpen(!isOpen)}
            style={{ cursor: 'pointer', pointerEvents: 'auto' }}
          >
            {icon}
          </div>
        )}
      </div>
      {isOpen ? (
        <div
          className={`absolute z-10 mt-2 bg-white border rounded shadow-md p-3 flex flex-col ${
            customClassNames.dropdown || ""
          }`}
        >
          <div className="flex gap-4">
          {columns?.map((col, index) => {
            const itemHeight = 32; // matches scrollBy amount
            // Compute initial scroll index so the selected value (or startTime) is visible on open
            let selectedIndex = col.values?.findIndex((v) => v === col.selected) ?? 0;
            if ((selectedIndex === -1 || selectedIndex === undefined) && hasRange) {
              if (col.label === "hh") {
                const { start } = normalizeRange();
                const displayStart = use24Hour ? start : (start % 12) || 12;
                selectedIndex = (col.values as number[])?.findIndex((v) => v === displayStart);
              } else if (col.label === "mm") {
                selectedIndex = 0; // 00 minute
              }
            }

            return (
              <div
                key={index}
                className={`flex flex-col items-center ${
                  col.label === "AM/PM" ? "mt-[80px]" : ""
                }`}
              >
                {col.label !== "AM/PM" ? (
                  <span
                    className={`text-sm font-medium mb-1 text-gray-400 ${
                      customClassNames.label || ""
                    }`}
                  >
                    {col.label}
                  </span>
                ) : null}

                {col.label !== "AM/PM" ? (
                  <button
                    className="w-10 h-6 text-gray-600 hover:text-black"
                    onClick={() => {
                      // Step value up (previous)
                      if (col.label === "hh") {
                        stepHourToAdjacentValid(-1);
                      } else if (col.label === "mm") {
                        // Step minute up
                        if (isMinuteOptionDisabled(0)) return;
                        const curr = minute ?? 0;
                        const next = (curr - 1 + 60) % 60;
                        setMinute(next);
                      }
                      columnRefs.current[index]?.scrollBy({ top: -32, behavior: "smooth" });
                    }}
                  >
                    <FontAwesomeIcon icon={faChevronUp}  className="w-4 h-4"/>
                  </button>
                ) : null}

                <div
                  ref={(el) => {
                    columnRefs.current[index] = el;
                    if (el) {
                      const idx = typeof selectedIndex === "number" && selectedIndex >= 0 ? selectedIndex : 0;
                      const top = Math.max(0, idx * itemHeight - itemHeight);
                      el.scrollTop = top;
                    }
                  }}
                  className="h-32 w-12 overflow-hidden scrollbar-hide snap-y snap-mandatory"
                >
                  <div className="flex flex-col items-center">
                    {col.values?.map((val: ColumnValue, i: number) => {
                      const disabled =
                        col.label === "hh"
                          ? isHourOptionDisabled(val)
                          : col.label === "mm"
                          ? isMinuteOptionDisabled(val)
                          : false;
                      return (
                        <div
                          key={i}
                          onClick={() => {
                            if (disabled) return;
                            col.setter(val);
                            col.onChange(val);
                          }}
                          className={`py-1 px-2 text-center snap-start rounded w-full ${
                            val === col.selected ? selectedItemStyles : ""
                          } ${
                            disabled
                              ? "opacity-40 cursor-not-allowed"
                              : "cursor-pointer"
                          } ${customClassNames.timeItem || ""}`}
                          aria-disabled={disabled || undefined}
                        >
                          {typeof val === "number" ? pad(val) : (val as "AM" | "PM")}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {col.label !== "AM/PM" ? (
                  <button
                    className="w-10 h-6 text-gray-600 hover:text-black"
                    onClick={() => {
                      // Step value down (next)
                      if (col.label === "hh") {
                        stepHourToAdjacentValid(1);
                      } else if (col.label === "mm") {
                        if (isMinuteOptionDisabled(0)) return;
                        const curr = minute ?? 0;
                        const next = (curr + 1) % 60;
                        setMinute(next);
                      }
                      columnRefs.current[index]?.scrollBy({ top: 32, behavior: "smooth" });
                    }}
                  >
                    <FontAwesomeIcon icon={faChevronDown} className="w-4 h-4"/>
                  </button>
                ) : null}
              </div>
            );
          })}
          </div>
          {/* Validation message above footer when selection is invalid */}
          {isDoneDisabled ? (
            <div className="mt-2 text-red-500 text-xs">Please choose a valid time.</div>
          ) : null}
          <div className="border-t mt-3 pt-3 flex justify-between items-center">
            <button
              type="button"
              className="!text-red-500 text-sm font-normal px-2 py-1 rounded"
              onClick={handleClear}
            >
              Clear
            </button>
            <button
              type="button"
              className="bg-black text-white px-4 py-2 rounded text-sm font-normal disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isDoneDisabled}
              onClick={commitSelection}
            >
              Done
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default TimePicker;
