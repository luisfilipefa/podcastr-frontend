import { createBreakpoints, mode } from "@chakra-ui/theme-tools";

import { extendTheme } from "@chakra-ui/react";

const breakpoints = createBreakpoints({
  sm: "320px",
  md: "481px",
  lg: "769px",
  xl: "1025px",
  "2xl": "1201px",
});

const styles = {
  global: (props) => ({
    heading: {
      color: "gray.700",
      fontFamily: "Lexend",
      fontWeight: 600,
    },
    body: {
      bg: mode("light.gray.50", "dark.gray.900")(props),
      color: mode("light.gray.700", "dark.gray.50")(props),
      fontFamily: "Inter",
      fontWeight: 400,
    },
  }),
};

const colors = {
  dark: {
    "gray.900": "#282A36",
    "gray.800": "#44475A",
    "gray.50": "#F8F8F2",
    orange: "#FFB86C",
    purple: "#BD93F9",
    blue: "#6272A4",
    green: "#50FA7B",
  },
  light: {
    "gray.700": "#494D4B",
    "gray.600": "#808080",
    "gray.100": "#E6E8EB",
    "gray.50": "#F7F8FA",
    "purple.600": "#8257E5",
    "purple.100": "#DCCDFF",
    white: "#FFFFFF",
    green: "#04D361",
  },
};

export const theme = extendTheme({
  breakpoints,
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  styles,
  colors,
});
