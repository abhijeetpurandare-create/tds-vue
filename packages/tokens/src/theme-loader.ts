/**
 * Tarmac Design System — Theme Loader
 *
 * Framework-agnostic utility to load theme JSON from a URL or local path.
 * This mirrors the loading logic from the React ThemeProvider but without
 * any React dependency.
 */

export interface Theme {
  [key: string]: string | number | Theme | any;
}

export interface ThemeLoaderOptions {
  /** URL or path to the theme JSON file */
  source: string;
  /** Theme variant to select (e.g. "light", "dark") */
  activeTheme?: string;
  /** Override values merged on top of the loaded theme */
  overrides?: Theme;
}

/**
 * Load a theme JSON from a URL or local path.
 * Returns the resolved theme object.
 */
export async function loadTheme(options: ThemeLoaderOptions): Promise<Theme> {
  const { source, activeTheme = 'light', overrides = {} } = options;

  let themeData: Theme = {};

  try {
    const isUrl = isValidUrl(source);
    const fetchUrl = isUrl
      ? source
      : source.startsWith('/') || source.startsWith('./')
        ? source
        : `/${source}`;

    const response = await fetch(fetchUrl, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`Failed to load theme: HTTP ${response.status}`);
    }

    const contentType = response.headers.get('Content-Type');
    if (contentType !== 'application/json') {
      const text = await response.text();
      try {
        const parsed = JSON.parse(text);
        themeData = parsed.record ?? parsed;
      } catch {
        throw new Error(`Invalid JSON in theme file: ${source}`);
      }
    } else {
      themeData = await response.json();
    }
  } catch (error) {
    console.error('[Tarmac Tokens] Error loading theme:', error);
    throw error;
  }

  // Select the active theme variant if present
  const themeToUse: any = themeData[activeTheme]
    ? themeData[activeTheme]
    : themeData;

  return { ...themeToUse, ...overrides };
}

function isValidUrl(urlString: string): boolean {
  try {
    new URL(urlString);
    return true;
  } catch {
    return false;
  }
}
