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
  { config }
);

export default theme;
