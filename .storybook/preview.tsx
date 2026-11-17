import type { Preview } from "@storybook/nextjs-vite";
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      values: [
        { name: "Cream", value: "#F5F3EB" },
        { name: "White", value: "#FFFFFF" },
        { name: "Night", value: "#1A1030" },
      ],
      default: "Cream",
    },
    layout: "centered",
    a11y: {
      test: "todo",
    },
  },
};

export default preview;
