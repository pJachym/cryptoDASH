import Navigation from "components/organisms/Navigation/Navigation";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  overflow: hidden;
  grid-template-columns: 80px 1fr;
`;

const MainTemplate = ({ children }) => {
  return (
    <Wrapper>
      <Navigation />
      {children}
    </Wrapper>
  );
};

export default MainTemplate;
