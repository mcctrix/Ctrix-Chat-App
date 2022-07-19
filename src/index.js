import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

import { ColorModeScript } from "@chakra-ui/react";

import { BrowserRouter } from "react-router-dom";

import { ChakraProvider } from "@chakra-ui/react";
import theme from "./components/GlobalStore/theme";

const container = document.getElementById("root");

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
