import React from "react";
import styled, { createGlobalStyle } from "styled-components";

import { CssBaseline, Paper as MuiPaper, } from "@material-ui/core";

import { spacing } from "@material-ui/system";

const GlobalStyle = createGlobalStyle`
  html,
  body,
  #app {
    height: 100%;
    margin 36px;
  }
`;

const Paper = styled(MuiPaper)(spacing);

const MainContent = styled(Paper)`
  flex: 1;
  .MuiPaper-root {
    box-shadow: none;
  }
`;

function Layout({ children }) {
  return (
    <MainContent>
      <CssBaseline />
      <GlobalStyle />
      {children}
    </MainContent>
  );
}

export default Layout;