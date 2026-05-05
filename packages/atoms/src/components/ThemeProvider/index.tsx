import {createContext, ReactNode, useContext, useState, useEffect, useMemo} from "react";
import {resolveTemplatePlaceholders} from "../../utils/templateResolver";
import type {ModeOverrides} from "../../types/tokenTypes";
import "./tarmac-variables.css"
interface Theme {
  [key: string]: string | number | Theme | any;
}

interface ThemeContextType {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
  updateTheme: (updates: Partial<Theme>) => void;
  loadThemeFromSource: (
    source: string,
    overrides?: Theme,
    activeTheme?: string
  ) => Promise<void>;
  activeTheme: "light" | "dark" | string | undefined;
  isLoading: boolean;
  isReady: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: {},
  setTheme: () => {},
  updateTheme: () => {},
  loadThemeFromSource: async () => {},
  activeTheme: "light",
  isLoading: false,
  isReady: true,
});

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: Theme;
  initialSource?: string;
  initialOverrides?: Theme;
  activeTheme?: string;
  loadingComponent?: ReactNode;
  showLoadingUntilReady?: boolean;
  /** Mode overrides for Figma variable resolution (collection name → mode name) */
  modeOverrides?: ModeOverrides;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialTheme = {},
  initialSource,
  initialOverrides = {},
  activeTheme = "light",
  loadingComponent,
  showLoadingUntilReady = true,
  modeOverrides,
}) => {
  const [theme, setTheme] = useState<Theme>({
    ...initialTheme,
    ...initialOverrides,
  });

  const [isLoading, setIsLoading] = useState<boolean>(Boolean(initialSource));
  const [isReady, setIsReady] = useState<boolean>(!initialSource);

  const updateTheme = (updates: Partial<Theme>) => {
    setTheme(
      (prevTheme) =>
        ({
          ...prevTheme,
          ...updates,
        } as Theme)
    );
  };

  const loadThemeFromSource = async (
    source: string,
    overrides: Theme = {},
    themeType?: string
  ) => {
    const activeThemeType = themeType || activeTheme;
    let themeData: Theme = {};

    setIsLoading(true);
    setIsReady(false);

    try {
      if (isValidUrl(source)) {
        const response = await fetch(source);
        const contentType = response.headers.get("Content-Type");
        if (!response.ok) {
          throw new Error(
            `HTTP error while fetching theme! status: ${response.status}`
          );
        }
        if (contentType !== "application/json") {
          const text = await response.text();
          try {
            themeData = JSON.parse(text).record;
          } catch (parseError) {
            console.error("JSON parsing error:", parseError);
            throw new Error(`Invalid JSON: ${text}`);
          }
        } else {
          themeData = await response.json();
        }
      } else {
        // Support both absolute ("/file.json") and relative ("./file.json") paths
        const finalPath = source.startsWith("/") || source.startsWith("./")
          ? source
          : `/${source}`;
        const response = await fetch(finalPath, {
          method: "GET",
          headers: {"Content-Type": "application/json"},
        });

        if (!response.ok) {
          throw new Error(`File not found! status: ${response.status}`);
        }

        const text = await response.text();
        try {
          themeData = JSON.parse(text);
        } catch (parseError) {
          console.error("JSON parsing error:", parseError);
          throw new Error(`Invalid JSON: ${text}`);
        }
      }
    } catch (error) {
      console.error("Error loading theme:", error);
      throw error;
    } finally {
      const themeToUse:any = themeData[activeThemeType]
        ? themeData[activeThemeType]
        : themeData;

      const mergedTheme = {
        ...themeToUse,
        ...overrides,
      };
      setTheme(mergedTheme);
      setIsLoading(false);
      setIsReady(true);
    }
  };

  const isValidUrl = (urlString: string): boolean => {
    try {
      new URL(urlString);
      return true;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    if (initialSource) {
      loadThemeFromSource(initialSource, initialOverrides, activeTheme).catch(
        (err) => {
          console.error("Initial theme load failed:", err);
          setIsLoading(false);
          setIsReady(true);
        }
      );
    }
  }, [initialSource]);

  // Resolve {{VariableName}} template placeholders via Figma TDS
  const resolvedTheme = useMemo(() => {
    return resolveTemplatePlaceholders(theme, modeOverrides ?? {});
  }, [theme, modeOverrides]);

  // Default loading component
  const defaultLoadingComponent = (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#ffffff',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
      }}>
        <div style={{
          width: '24px',
          height: '24px',
          border: '2px solid #e5e7eb',
          borderTop: '2px solid #3b82f6',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }} />
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
        <span style={{
          fontSize: '14px',
          color: '#6b7280',
        }}>Loading theme...</span>
      </div>
    </div>
  );

  if (showLoadingUntilReady && !isReady) {
    return <>{loadingComponent || defaultLoadingComponent}</>;
  }

  return (
    <ThemeContext.Provider
      value={{
        theme: resolvedTheme,
        setTheme,
        updateTheme,
        loadThemeFromSource,
        activeTheme,
        isLoading,
        isReady,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
