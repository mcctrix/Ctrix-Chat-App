import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

const theme = extendTheme(
  withDefaultColorScheme({
    colorScheme: "teal",
    components: ["Button"],
  })
  // {
  //   colors: {
  //     brand: {
  //       100: "#f7fafc",
  //       // ...
  //       900: "white",
  //     },
  //   },
  // }
);

// withDefaultVariant({
//   variant: "ghost",
//   components: ["Button"],
// })
export default theme;
