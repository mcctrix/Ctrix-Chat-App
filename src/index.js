import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

import { BrowserRouter } from "react-router-dom";

import { ContextWrapper } from "./components/GlobalStore/Context";

import { ChakraProvider } from "@chakra-ui/react";
import theme from "./components/GlobalStore/theme";

const container = document.getElementById("root");

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ContextWrapper>
      <BrowserRouter>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </BrowserRouter>
    </ContextWrapper>
  </React.StrictMode>
);
