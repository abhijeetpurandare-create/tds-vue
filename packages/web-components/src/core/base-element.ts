/**
 * TarmacBaseElement
 *
 * Base class for all Tarmac Web Components.
 * Provides shared theme access and CSS variable injection into Shadow DOM.
 */

import { LitElement, css, unsafeCSS } from 'lit';
import { themeVariables } from '@tarmac/tokens';

/**
 * Generate a CSS string containing all Tarmac token variables
 * scoped to :host so they're available inside Shadow DOM.
 */
function buildTokenCSS(): string {
  const declarations = Object.entries(themeVariables)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n');
  return `:host {\n${declarations}\n}`;
}

/** Cached token CSS string — built once at module load */
const TOKEN_CSS = buildTokenCSS();

export class TarmacBaseElement extends LitElement {
  /**
   * Shared token styles injected into every component's shadow root.
   * Subclasses should include this in their `static styles` array.
   */
  static tokenStyles = unsafeCSS(TOKEN_CSS);

  /**
   * Base reset styles applied to all Tarmac components.
   * Ensures consistent box-sizing and font-family.
   */
  static baseStyles = css`
    :host {
      display: inline-block;
      box-sizing: border-box;
      font-family: 'Noto Sans', 'IBM Plex Sans', sans-serif;
    }

    :host *,
    :host *::before,
    :host *::after {
      box-sizing: border-box;
    }

    :host([hidden]) {
      display: none;
    }
  `;
}

export { css, unsafeCSS };
