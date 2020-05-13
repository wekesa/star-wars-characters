import React from "react";
import { createGlobalStyle } from "styled-components";

import { Paper } from "@material-ui/core";

const GlobalStyle = createGlobalStyle`
  html,
  body,
  #app {
    height: 100%;
    margin 36px;
  }
`;

function Layout({ children }) {
  return (
    <Paper>
      <GlobalStyle />
      {children}
    </Paper>
  );
}

export default Layout;