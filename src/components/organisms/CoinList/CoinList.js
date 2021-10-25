import { MarketContext } from "providers/MarketProvider/MarketProvider";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import favBtn from "assets/images/star.png";
import favBtnIcon from "assets/images/star(1).png";

const Wrapper = styled(Link)`
  margin: 5px;
  margin-left: 20px;
  margin-bottom: 10px;
  padding-left: 20px;
  display: flex;
  text-align: start;
  font-weight: 600;
  justify-content: center;
  align-items: center;
  height: 70px;
  color: ${({ theme }) => theme.colors.main};
  /* border-bottom: 1px solid ${({ theme }) => theme.colors.main}; */
  text-decoration: none;
  opacity: ${({ favcoin }) => (favcoin ? 1 : 0.85)};
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }

  img {
    height: 50%;
    margin-right: 20px;
  }
  p {
    margin-left: 20px;
    width: 50%;
  }

  p:first-of-type {
    width: 20px;
    margin-right: 20px;
  }
`;

const SymbolP = styled.p`
  text-transform: uppercase;
  font-weight: bold;
`;

const PriceP = styled.p`
  font-weight: bold;

  ${({ price }) => {
    if (price > 0) {
      return `color: #8FCB81`;
    } else {
      return `color: #CB8581`;
    }
  }}
`;

const FavBtn = styled.div`
  width: 24px;
  height: 24px;
  background-size: contain;
  margin-right: 10px;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 23px;
  left: 0;
  margin-right: 10px;
  cursor: pointer;
  background-image: url(${({ favcoin }) => (favcoin ? `${favBtnIcon}` : `${favBtn}`)});
  transition: background-image 0.2s;
`;

const ContainerWrapper = styled.div`
  position: relative;
`;

const CoinList = ({ coin, favcoin }) => {
  const {
    currency,
    favouriteCoins,
    handleFavouriteCoins,
    setLoadingState,
    coinDetail,
    setCoinDetail,
  } = useContext(MarketContext);

  window.currency = currency;
  window.favCoins = favouriteCoins;

  const addToFav = () => {
    handleFavouriteCoins(coin.id);
  };
  return (
    <ContainerWrapper>
      <FavBtn favcoin={favcoin} onClick={addToFav} img={favBtn}></FavBtn>
      <Wrapper onClick={() => setCoinDetail(coin)} favcoin={favcoin} to={`/market/${coin.id}`}>
        <p> {coin.market_cap_rank}.</p>
        <img src={coin.image} />
        <p>{coin.name}</p>
        <SymbolP>{coin.symbol}</SymbolP>
        <p>
          {coin.current_price} {currency.toUpperCase()}
        </p>
        <PriceP price={coin.price_change_percentage_24h}>
          {coin.price_change_percentage_24h.toFixed(2)} %
        </PriceP>
        <p>
          {coin.market_cap.toLocaleString("de-DE")} {currency.toUpperCase()}
        </p>
      </Wrapper>
    </ContainerWrapper>
  );
};

export default CoinList;
