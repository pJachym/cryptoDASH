import React from "react";
import styled from "styled-components";

const Wrapper = styled.a`
  width: 150px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.main};
  font-size: 16px;
  text-decoration: none;
  color: white;

  img {
    margin-right: 5px;
  }
`;

const LinkButton = ({ value, link, children }) => {
  return (
    <Wrapper href={link[0]}>
      <img src={value} />
      <p>{children}</p>
    </Wrapper>
  );
};

export default LinkButton;
