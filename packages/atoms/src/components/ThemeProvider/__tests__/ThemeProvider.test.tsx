import { render, screen, act, waitFor } from "@testing-library/react";
import ThemeProvider, { useTheme } from "../index";

// Mock fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

// Mock console.error to avoid polluting test output
const originalConsoleError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalConsoleError;
});

// Test component that uses the theme context
const TestComponent = () => {
  const { theme, updateTheme, loadThemeFromSource, activeTheme } = useTheme();
  return (
    <div>
      <div data-testid="theme-value">{JSON.stringify(theme)}</div>
      <div data-testid="active-theme">{activeTheme}</div>
      <button
        onClick={() => updateTheme({ color: "blue" })}
        data-testid="update-button"
      >
        Update Theme
      </button>
      <button
        onClick={() => loadThemeFromSource("/test-theme.json")}
        data-testid="load-button"
      >
        Load Theme
      </button>
    </div>
  );
};

describe("ThemeProvider Component", () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it("provides default theme context values", () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(JSON.parse(screen.getByTestId("theme-value").textContent || "{}")).toEqual({});
    expect(screen.getByTestId("active-theme").textContent).toBe("light");
  });

  it("accepts and processes initial theme", () => {
    const initialTheme = {
      color: "red",
      "font-size": "16px",
    };

    render(
      <ThemeProvider initialTheme={initialTheme}>
        <TestComponent />
      </ThemeProvider>
    );

    const themeValue = JSON.parse(screen.getByTestId("theme-value").textContent || "{}");
    expect(themeValue).toEqual({
      color: "red",
      fontSize: "16px", // Note: processed from font-size to fontSize
    });
  });

  it("allows theme updates through context", async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const updateButton = screen.getByTestId("update-button");
    await act(async () => {
      updateButton.click();
    });

    const themeValue = JSON.parse(screen.getByTestId("theme-value").textContent || "{}");
    expect(themeValue).toEqual({
      color: "blue",
    });
  });

  it("loads theme from URL source", async () => {
    const mockThemeData = {
      light: {
        color: "white",
        background: "black",
      },
    };

    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        headers: {
          get: () => "application/json",
        },
        json: () => Promise.resolve(mockThemeData),
      })
    );

    render(
      <ThemeProvider initialSource="https://api.example.com/theme">
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      const themeValue = JSON.parse(screen.getByTestId("theme-value").textContent || "{}");
      expect(themeValue).toEqual(mockThemeData.light);
    });

    expect(mockFetch).toHaveBeenCalledWith("https://api.example.com/theme");
  });

  it("loads theme from local file source", async () => {
    const mockThemeData = {
      color: "purple",
      background: "white",
    };

    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockThemeData)),
        headers: {
          get: () => "text/plain",
        },
      })
    );

    render(
      <ThemeProvider initialSource="/themes/local-theme.json">
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      const themeValue = JSON.parse(screen.getByTestId("theme-value").textContent || "{}");
      expect(themeValue).toEqual(mockThemeData);
    });

    expect(mockFetch).toHaveBeenCalledWith("/themes/local-theme.json", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
  });

  it("applies theme overrides", () => {
    const initialTheme = {
      color: "red",
      fontSize: "16px",
    };

    const overrides = {
      color: "blue",
      padding: "10px",
    };

    render(
      <ThemeProvider initialTheme={initialTheme} initialOverrides={overrides}>
        <TestComponent />
      </ThemeProvider>
    );

    const themeValue = JSON.parse(screen.getByTestId("theme-value").textContent || "{}");
    expect(themeValue).toEqual({
      color: "blue",
      fontSize: "16px",
      padding: "10px",
    });
  });

  it("handles theme loading errors gracefully", async () => {
    mockFetch.mockImplementationOnce(() =>
      Promise.reject(new Error("Network error"))
    );

    render(
      <ThemeProvider initialSource="https://api.example.com/theme">
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(console.error).toHaveBeenCalled();
    });

    // Theme should remain empty on error
    const themeValue = JSON.parse(screen.getByTestId("theme-value").textContent || "{}");
    expect(themeValue).toEqual({});
  });

  it("handles invalid JSON response", async () => {
    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        text: () => Promise.resolve("invalid json"),
        headers: {
          get: () => "text/plain",
        },
      })
    );

    render(
      <ThemeProvider initialSource="/invalid-theme.json">
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(console.error).toHaveBeenCalled();
    });
  });

  it("respects activeTheme prop", () => {
    render(
      <ThemeProvider activeTheme="dark">
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId("active-theme").textContent).toBe("dark");
  });

  it("processes nested theme objects", () => {
    const initialTheme = {
      colors: {
        primary: {
          "background-color": "blue",
          "text-color": "white",
        },
      },
      "font-family": "Arial",
    };

    render(
      <ThemeProvider initialTheme={initialTheme}>
        <TestComponent />
      </ThemeProvider>
    );

    const themeValue = JSON.parse(screen.getByTestId("theme-value").textContent || "{}");
    expect(themeValue).toEqual({
      colors: {
        primary: {
          backgroundColor: "blue",
          textColor: "white",
        },
      },
      fontFamily: "Arial",
    });
  });
}); 