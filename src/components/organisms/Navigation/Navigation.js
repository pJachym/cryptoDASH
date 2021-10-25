import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import logoBg from "assets/images/crypto.png";
import monitorBg from "assets/images/monitor.png";
import walletBg124 from "assets/images/wallet124.png";
import marketBg from "assets/images/cryptocurrencies.png";
import { MarketContext } from "providers/MarketProvider/MarketProvider";
import { theme } from "assets/styles/theme";
import { useState } from "react/cjs/react.development";
import { useLocation } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${({ color }) => color};
  position: relative;
  box-shadow: 0 0 10px 1px black;
  border-right: 1px solid ${({ theme }) => theme.colors.darkTheme};
  transition: background-color 0.3s;
`;

const LogoWrapper = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-direction: column;
  padding-right: 60px;
  h2 {
    color: ${({ theme }) => theme.colors.main};
  }
`;

const FooterWrapper = styled.div`
  height: 20%;
  position: absolute;
  bottom: 10px;
  left: 0;
  width: 100%;

  label {
    color: ${({ theme }) => theme.colors.main};
    position: absolute;
    bottom: 0;
    left: 0;
  }

  select {
    margin-left: 10px;
    color: ${({ theme }) => theme.colors.main};
  }

  button {
    position: absolute;
    right: 30px;
    bottom: 30px;
  }
`;

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  height: 30%;
  width: 80%;
  align-self: center;
`;

const activeClassName = "active-link";
export const StyledLink = styled(NavLink).attrs({ activeClassName })`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  height: 40px;
  margin: 15px;
  background-image: url(${({ bgimg }) => bgimg});
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: left center;
  text-decoration: none;
  font-weight: 600;
  position: relative;
  font-size: 20px;

  &.${activeClassName} {
    &::after {
      opacity: 1;
    }
  }

  &::after {
    opacity: 0;
    transition: opacity 0.4s ease-in-out;
    content: "";
    position: absolute;
    width: 18px;
    height: 3px;
    top: 50%;
    transform: translateY(-50%);
    right: -20px;
    background-color: ${({ theme }) => theme.colors.white};
  }
`;

const Navigation = () => {
  const { setCurrency } = useContext(MarketContext);
  const [themeColor, setTHemeColor] = useState(null);

  const location = useLocation().pathname;

  const setThemeColorFunction = () => {
    if (location.includes("market")) {
      setTHemeColor("#FFCA01");
    }
  };

  useEffect(() => {
    setThemeColorFunction();
    switch (location) {
      case "/dashboard":
        return setTHemeColor("#1AA9D9");
      case "/wallet":
        return setTHemeColor("#DB00D5");
      case "/market":
        return setTHemeColor("#FFCA01");

      default:
        break;
    }
  }, []);

  const handleCurrency = (e) => {
    setCurrency(e.target.value);
  };

  const toggleTheme = () => {
    theme.colors.soft = "black";
  };

  return (
    <Wrapper color={themeColor}>
      <StyledNav>
        <StyledLink
          onClick={() => setTHemeColor("#1AA9D9")}
          bgimg={monitorBg}
          to="/dashboard"
        ></StyledLink>
        <StyledLink
          onClick={() => setTHemeColor("#DB00D5")}
          bgimg={walletBg124}
          to="/wallet"
        ></StyledLink>
        <StyledLink
          onClick={() => setTHemeColor("#FFCA01")}
          bgimg={marketBg}
          to="/market"
        ></StyledLink>
      </StyledNav>
      <FooterWrapper>
        <label>
          <select onChange={handleCurrency}>
            <option value="usd">USD</option>
            <option value="pln">PLN</option>
            <option value="eur">EUR</option>
          </select>
        </label>
      </FooterWrapper>
    </Wrapper>
  );
};

export default Navigation;
