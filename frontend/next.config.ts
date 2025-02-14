import { Rule, Configuration as WebpackConfig } from "webpack";
import { ENV } from "./config/env";

module.exports = {
  webpack(config: WebpackConfig): WebpackConfig {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule: Rule) =>
      rule.test?.test?.(".svg")
    ) as Rule;

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: {
          not: [...(fileLoaderRule.resourceQuery as any).not, /url/],
        }, // exclude if *.svg?url
        use: [{ loader: "@svgr/webpack", options: { icon: true } }],
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
      },
    ],
  },

  // ...other config
};
