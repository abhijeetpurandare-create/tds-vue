/**
 * Resolves the iframe src for the Storybook content.
 *
 * If an explicit `envUrl` is provided (e.g. from VITE_STORYBOOK_URL in dev),
 * it is returned as-is. Otherwise the path is built from `basePath` + `sb/index.html`
 * with normalised slashes so no double-slash artifacts appear.
 */
export function getStorybookSrc(basePath: string, envUrl?: string): string {
  if (envUrl) {
    return envUrl;
  }

  const normalized = basePath.endsWith("/") ? basePath : `${basePath}/`;
  return `${normalized}sb/index.html`;
}
