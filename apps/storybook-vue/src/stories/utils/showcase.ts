/**
 * Shared showcase grid utilities for Tarmac TDS Storybook.
 * Generates the same matrix layout as the React reference Storybook.
 */

export const ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="currentColor"><path d="M13 7H11V11H7V13H11V17H13V13H17V11H13V7ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"/></svg>`;

export const SEARCH_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/></svg>`;

export const styles = {
  page: 'padding:24px;font-family:Noto Sans,sans-serif;font-size:12px;',
  title: 'font-size:15px;font-weight:700;color:#374151;margin:32px 0 8px;border-bottom:2px solid #e5e7eb;padding-bottom:6px;',
  grid: 'display:grid;gap:4px 8px;align-items:center;',
  colHdr: 'font-size:10px;font-weight:600;color:#9ca3af;text-transform:uppercase;text-align:center;padding:4px 0;',
  rowLabel: 'font-size:9px;color:#b0b0b0;text-align:right;padding-right:8px;',
  cell: 'display:flex;justify-content:center;align-items:center;padding:3px 0;',
  darkBg: 'background-color:#1a1a2e;padding:16px;border-radius:8px;',
};

type ShowcaseState = 'default' | 'hover' | 'pressed' | 'focused' | 'disabled' | 'ghost';
export const STATES: ShowcaseState[] = ['default', 'hover', 'pressed', 'focused', 'disabled', 'ghost'];

/**
 * Create a showcase grid header row.
 */
export function gridHeader(states: string[] = STATES as string[]): string {
  return `<div></div>${states.map(s => `<div style="${styles.colHdr}">${s}</div>`).join('')}`;
}

/**
 * Create a grid row with a label and cells.
 */
export function gridRow(label: string, cells: string[], dark = false): string {
  const labelStyle = dark ? styles.rowLabel + 'color:#6b7280;' : styles.rowLabel;
  return `<div style="${labelStyle}">${label}</div>${cells.map(c => `<div style="${styles.cell}">${c}</div>`).join('')}`;
}

/**
 * Create a section title.
 */
export function sectionTitle(text: string, subtitle?: string): string {
  const sub = subtitle ? `<span style="font-size:10px;color:#9ca3af;margin-left:8px;">(${subtitle})</span>` : '';
  return `<div style="${styles.title}">${text}${sub}</div>`;
}

/**
 * Wrap content in a page container.
 */
export function page(content: string, description?: string): HTMLDivElement {
  const div = document.createElement('div');
  div.style.cssText = styles.page;
  const desc = description ? `<p style="color:#6b7280;margin-bottom:8px;">${description}</p>` : '';
  div.innerHTML = desc + content;
  return div;
}

/**
 * Create a button element string for a given state.
 * For hover/pressed/focused, we can't truly simulate those states on a Custom Element,
 * so we show the default state with a label indicating the intended state.
 * For disabled/ghost, we apply the actual attributes.
 */
export function buttonCell(opts: {
  variant: string;
  size: string;
  buttonStyle: string;
  buttonType: string;
  state: string;
  text?: string;
}): string {
  const { variant, size, buttonStyle, buttonType, state, text } = opts;
  const isIcon = buttonType === 'iconButton';
  const label = isIcon ? '' : (text || 'Button');

  let attrs = `variant="${variant}" size="${size}" button-style="${buttonStyle}" button-type="${buttonType}"`;
  if (label) attrs += ` text="${label}"`;
  if (state === 'disabled') attrs += ' disabled';
  if (state === 'ghost') attrs += ' is-ghost';
  if (state === 'loading') attrs += ' is-loading';

  // For icon button, add icon via slot
  const iconSlot = `<svg slot="leading-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M13 7H11V11H7V13H11V17H13V13H17V11H13V7ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"/></svg>`;

  return `<tarmac-button ${attrs}>${iconSlot}</tarmac-button>`;
}
