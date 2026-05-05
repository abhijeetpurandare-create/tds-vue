/**
 * <tarmac-theme-provider>
 *
 * Web Component equivalent of the React ThemeProvider.
 * Loads a theme JSON and exposes it to child components via a shared context.
 *
 * Usage:
 *   <tarmac-theme-provider source="/tarmac-theme.json" active-theme="light">
 *     <tarmac-button variant="black" size="md">Click me</tarmac-button>
 *   </tarmac-theme-provider>
 */

import { html, css, LitElement, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { loadTheme, type Theme } from '@tarmac/tokens';
import { themeVariables } from '@tarmac/tokens';

/**
 * Event name dispatched when theme is loaded/updated.
 * Child components listen for this to re-render with new theme data.
 */
export const THEME_LOADED_EVENT = 'tarmac-theme-loaded';
export const THEME_UPDATED_EVENT = 'tarmac-theme-updated';

@customElement('tarmac-theme-provider')
export class TarmacThemeProvider extends LitElement {
  /** URL or path to the theme JSON file */
  @property({ type: String }) source = '';

  /** Active theme variant (e.g. "light", "dark") */
  @property({ type: String, attribute: 'active-theme' }) activeTheme = 'light';

  /** The resolved theme object — available to child components */
  @state() theme: Theme = {};

  /** Loading state */
  @state() isLoading = false;

  /** Ready state */
  @state() isReady = false;

  static styles = [
    unsafeCSS(buildTokenHostCSS()),
    css`
      :host {
        display: contents;
      }
    `,
  ];

  connectedCallback(): void {
    super.connectedCallback();
    if (this.source) {
      this._loadTheme();
    } else {
      this.isReady = true;
    }
  }

  updated(changedProperties: Map<string, unknown>): void {
    if (changedProperties.has('source') && this.source) {
      this._loadTheme();
    }
  }

  private async _loadTheme(): Promise<void> {
    this.isLoading = true;
    this.isReady = false;

    try {
      this.theme = await loadTheme({
        source: this.source,
        activeTheme: this.activeTheme,
      });

      this.dispatchEvent(
        new CustomEvent(THEME_LOADED_EVENT, {
          bubbles: true,
          composed: true,
          detail: { theme: this.theme },
        }),
      );
    } catch (err) {
      console.error('[tarmac-theme-provider] Failed to load theme:', err);
    } finally {
      this.isLoading = false;
      this.isReady = true;
    }
  }

  /**
   * Get the current theme. Called by child components.
   */
  getTheme(): Theme {
    return this.theme;
  }

  render() {
    return html`<slot></slot>`;
  }
}

/**
 * Build :host CSS with all token variables.
 */
function buildTokenHostCSS(): string {
  const declarations = Object.entries(themeVariables)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n');
  return `:host {\n${declarations}\n}`;
}

declare global {
  interface HTMLElementTagNameMap {
    'tarmac-theme-provider': TarmacThemeProvider;
  }
}
