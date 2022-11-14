import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};

const theme = extendTheme(
  {
    config,
    colors: {
      brand: {

        primary: "#121212",
        secondary: "#90969e",

        // primary: "#1c1e21",
        // secondary: "#F0F2F5",

        primarytext: "#050505",
        primarytextDark: "#050505",

        sideBarHeader: "#17212B",
        sideBarHeaderDark: "#17212B",

        chatHeader: "#17212B",
        chatHeaderDark: "#17212B",

        // Telegram

        chatBackground: "#0E1621",

        sideBarBackground: "#17212B",

        sideBarActiveChatBg: "#2B5278",

        telegramBtn: "#50A7EA",

        // Messages Color

        currentUserMessageBg: "#2B5278",
        currentUserMessageTextColor: "#E4ECF2",

        otherUserMessageBg: "#182533",
        otherUserMessageTextColor: "#E4ECF2"
        

        // greyPrimary: "#38383d",
        // greySecondary: "#42414d",
      },
    },
  },
  withDefaultColorScheme({
    colorScheme: "facebook",
    components: ["Button"],
  })
  
);

export default theme;
// #F0F2F5
