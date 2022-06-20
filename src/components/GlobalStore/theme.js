import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

const theme = extendTheme();
withDefaultColorScheme({
  colorScheme: "teal",
  components: ["Button"],
});

// withDefaultVariant({
//   variant: "ghost",
//   components: ["Button"],
// })
export default theme;
