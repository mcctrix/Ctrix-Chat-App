import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme(
  withDefaultColorScheme({
    colorScheme: "facebook",
    components: ["Button"],
  }),
  { config },
  {
    colors: {
      brand: {
        800: "green",
      },
    },
  }
);

export default theme;
