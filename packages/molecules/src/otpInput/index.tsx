import React, {
  useState,
  useRef,
  useEffect,
  KeyboardEvent,
  ClipboardEvent,
  ChangeEvent,
} from "react";
import {ThemeProvider, Input} from "@delhivery/tarmac";

export interface OtpInputProps {
  value?: string;
  onChange?: (value: string) => void;
  numDigits?: number;
  autoFocus?: boolean;
  isDisabled?: boolean;
  placeholder?: string;
  inputType?: "text" | "password" | "number";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  variant?: "outlined" | "borderless" | "filled" | "underlined";
  status?: "error" | "warning" | "success" | "default";
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  helperTextCss?: React.CSSProperties;
  autoComplete?: string;
  onComplete?: (value: string) => void;
  [key: string]: any; // Allow for additional props
}

const OtpInput: React.FC<OtpInputProps> = ({
  value = "",
  onChange,
  numDigits = 6,
  autoFocus = false,
  isDisabled = false,
  placeholder = "",
  inputType = "text",
  size = "md",
  variant = "outlined",
  status = "default",
  label,
  helperText,
  helperTextCss,
  autoComplete = "one-time-code",
  onComplete,
  ...restProps
}) => {
  const [otpValues, setOtpValues] = useState<string[]>(
    value
      .split("")
      .slice(0, numDigits)
      .concat(Array(Math.max(0, numDigits - value.length)).fill(""))
  );

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    if (value) {
      const valueArray = value.split("").slice(0, numDigits);
      setOtpValues(
        valueArray.concat(
          Array(Math.max(0, numDigits - valueArray.length)).fill("")
        )
      );
    } else {
      setOtpValues(Array(numDigits).fill(""));
    }
  }, [value, numDigits]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = e.target.value;

    if (newValue === "") {
      // Handle backspace/delete
      const newOtpValues = [...otpValues];
      newOtpValues[index] = "";
      setOtpValues(newOtpValues);
      onChange?.(newOtpValues.join(""));
      return;
    }

    // Only accept the last character if multiple characters entered
    const lastChar = newValue.slice(-1);

    // Only accept digits for number inputType
    if (inputType === "number" && !/^\d$/.test(lastChar)) {
      return;
    }

    const newOtpValues = [...otpValues];
    newOtpValues[index] = lastChar;
    setOtpValues(newOtpValues);

    // Move focus to next input if available
    if (index < numDigits - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }

    const newOtpString = newOtpValues.join("");
    onChange?.(newOtpString);

    // Check if OTP is complete and call onComplete if needed
    if (newOtpString.length === numDigits && onComplete) {
      onComplete(newOtpString);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    // Handle backspace when input is empty to focus previous input
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();

      // Clear previous value
      const newOtpValues = [...otpValues];
      newOtpValues[index - 1] = "";
      setOtpValues(newOtpValues);
      onChange?.(newOtpValues.join(""));
    } else if (e.key === "ArrowLeft" && index > 0) {
      // Move focus left
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < numDigits - 1) {
      // Move focus right
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text/plain").trim();

    if (!pasteData) {
      return;
    }

    // For number inputType, filter non-digits
    let validInput = pasteData;
    if (inputType === "number") {
      validInput = validInput.replace(/\D/g, "");
    }

    // Limit to numDigits
    validInput = validInput.slice(0, numDigits);

    const newOtpValues = [
      ...validInput.split(""),
      ...Array(Math.max(0, numDigits - validInput.length)).fill(""),
    ];
    setOtpValues(newOtpValues.slice(0, numDigits));
    onChange?.(newOtpValues.join("").slice(0, numDigits));

    // Focus on next empty input or last input
    const focusIndex = Math.min(validInput.length, numDigits - 1);
    inputRefs.current[focusIndex]?.focus();

    // Check if OTP is complete after paste
    if (validInput.length === numDigits && onComplete) {
      onComplete(validInput);
    }
  };

  // Size configurations
  const sizeMap = {
    xs: "2rem",
    sm: "2.5rem",
    md: "3rem",
    lg: "3.5rem",
    xl: "4rem",
  };

  const inputWidth = sizeMap[size as keyof typeof sizeMap] || sizeMap.md;

  // Style to hide the up/down arrows in number inputs
  const noScrollbarStyle =
    inputType === "number"
      ? {
          // These will be applied to the container div to target all number inputs within
        }
      : {};

  // Additional global styles to hide number input spinners
  useEffect(() => {
    if (inputType === "number") {
      // Add a style tag to the document head to hide number input spinners
      const styleElement = document.createElement("style");
      styleElement.textContent = `
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type=number] {
          -moz-appearance: textfield;
          appearance: textfield;
        }
      `;
      document.head.appendChild(styleElement);

      // Clean up on component unmount
      return () => {
        document.head.removeChild(styleElement);
      };
    }
  }, [inputType]);

  return (
    <>
      <ThemeProvider>
        <div style={{ display: "flex", flexDirection: "column" }} {...restProps}>
          {label && <div style={{ marginBottom: "0.5rem" }}>{label}</div>}
          <div
            style={{
              display: "flex", 
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              ...noScrollbarStyle,
            }}
          >
            {Array.from({ length: numDigits }).map((_, index) => (
              <div
                key={index}
                style={{
                  width: inputWidth,
                  margin: "0 0.25rem",
                }}
              >
                <Input
                  ref={(
                    el:
                      | HTMLInputElement
                      | {querySelector: (selector: string) => HTMLInputElement}
                  ) => {
                    if (el) {
                      // Access the underlying input element
                      const inputEl =
                        typeof el.focus === "function"
                          ? el
                          : el.querySelector("input");
                      inputRefs.current[index] = inputEl;
                    }
                  }}
                  type={inputType}
                  value={otpValues[index]}
                  placeholder={placeholder}
                  maxLength={1}
                  autoComplete={index === 0 ? autoComplete : "off"}
                  onChange={(e: any) => handleChange(e, index)}
                  onKeyDown={(e: any) => handleKeyDown(e, index)}
                  onPaste={index === 0 ? (e: any) => handlePaste(e) : undefined}
                  disabled={isDisabled}
                  aria-label={`Digit ${index + 1}`}
                  size={size as "xs" | "sm" | "md" | "lg" | "xl"}
                  variant={
                    variant as
                      | "outlined"
                      | "borderless"
                      | "filled"
                      | "underlined"
                  }
                  status={status as "error" | "warning" | "success" | "default"}
                  style={{
                    textAlign: "center",
                    padding: "0",
                    margin: "0",
                    width: "100%",
                    ...(inputType === "number" && {
                      // Hide number input spinners
                      WebkitAppearance: "none",
                      MozAppearance: "textfield",
                      appearance: "textfield",
                    }),
                  }}
                  // Don't show individual labels/helper text for each input
                  label={undefined}
                  helperText={undefined}
                />
              </div>
            ))}
          </div>
          {helperText && (
            <div
              style={{
                marginTop: "0.5rem",
                fontSize: "0.75rem",
                color: "#6B7280",
                ...helperTextCss,
              }}
            >
              {helperText}
            </div>
          )}
        </div>
      </ThemeProvider>
    </>
  );
};

export default OtpInput;
