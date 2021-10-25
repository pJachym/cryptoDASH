import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { MarketContext } from "providers/MarketProvider/MarketProvider";
import CoinList from "components/organisms/CoinList/CoinList";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import CoinDetailsPage from "components/organisms/CoinDetailsPage/CoinDetailsPage";
import { useParams } from "react-router-dom";
import { el } from "date-fns/locale";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const HeaderWrapper = styled.div`
  padding: 20px;
  height: 35%;
  width: 100%;
  position: relative;
`;

const LegendWrapper = styled.div`
  width: 100%;
  height: 20px;
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-around;
`;

const MarketWrapper = styled.ul`
  border: 1px solid black;
  overflow-y: scroll;
  height: 75vh;
  width: 90%;
  border: none;
  margin: 0 auto;
  position: relative;
`;

const Market = () => {
  const { market, favouriteCoins } = useContext(MarketContext);
  const { id } = useParams();

  window.market = market;

  return (
    <Wrapper>
      {id ? (
        <CoinDetailsPage coin={id} />
      ) : (
        <>
          <HeaderWrapper>
            <p>market</p>

            <LegendWrapper>
              <p>#</p>
              <p>Cryptocurrency</p>
              <p>Price</p>
              <p>24h</p>
              <p>Market Cap</p>
            </LegendWrapper>
          </HeaderWrapper>
          <MarketWrapper>
            {market.map((coin) => {
              if (favouriteCoins.includes(coin.id)) {
                return <CoinList key={coin.id} coin={coin} favcoin="true" />;
              }
              return <CoinList key={coin.id} coin={coin} />;
            })}
          </MarketWrapper>
        </>
      )}
    </Wrapper>
  );
};

export default Market;
