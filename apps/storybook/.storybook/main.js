// Pure ESM: uses import.meta.resolve for module resolution (Storybook 10–ready).
// See: https://storybook.js.org/docs/faq#how-do-i-fix-module-resolution-in-special-environments
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const getAbsolutePath = (packageName) =>
  dirname(fileURLToPath(import.meta.resolve(`${packageName}/package.json`)));

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    getAbsolutePath("@storybook/addon-onboarding"),
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@chromatic-com/storybook"),
    getAbsolutePath("@storybook/addon-vitest"),
    getAbsolutePath("@storybook/addon-docs"),
    {
      name: getAbsolutePath("@storybook/addon-mcp"),
      options: {
        toolsets: {
          dev: true,
          docs: true,
        },
      },
    },
  ],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },
  features: {
    experimentalComponentsManifest: true,
  },
  staticDirs: ['../public'],
  viteFinal: async (viteConfig) => {
    // Strip federation plugin — it transforms HTML and breaks Rollup (Expected ';', '}' or <eof>)
    const flattenPlugins = (plugins) =>
      plugins?.flatMap((p) => (Array.isArray(p) ? flattenPlugins(p) : [p])) ?? [];
    viteConfig.plugins = flattenPlugins(viteConfig.plugins).filter(
      (p) => p && !String(p?.name || "").toLowerCase().includes("federation"),
    );

    // Map component-library/* to local molecules (Storybook doesn't use the remote)
    const configDir = dirname(fileURLToPath(import.meta.url));
    const moleculesSrc = join(configDir, "../../../packages/molecules/src");
    viteConfig.resolve = viteConfig.resolve ?? {};
    viteConfig.resolve.alias = {
      ...(viteConfig.resolve.alias ?? {}),
      "component-library/OtpInput": join(moleculesSrc, "otpInput"),
      "component-library/marqueeBanner": join(moleculesSrc, "marqueeBanner"),
      "component-library/BusinessPill": join(moleculesSrc, "businessPill"),
      "component-library/Header": join(moleculesSrc, "customerAppsHeader"),
      "component-library/AnimatedJumbotron": join(moleculesSrc, "animatedJumbotron"),
      "component-library/Footer": join(moleculesSrc, "customerAppsFooter"),
      "component-library/waybillTimeline": join(moleculesSrc, "waybillTimeline"),
    };
    return viteConfig;
  },
};
export default config;
