import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

const theme = extendTheme(
  {
    config,
    colors: {
      brand: {
        primary: "#121212",
        secondary: "#333b47",
        greyPrimary: "#38383d",
        greySecondary: "#42414d",
      },
    },
  },
  withDefaultColorScheme({
    colorScheme: "facebook",
    components: ["Button"],
  })
);

export default theme;
