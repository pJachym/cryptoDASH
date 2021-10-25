import axios from "axios";
import { MarketContext } from "providers/MarketProvider/MarketProvider";
import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink, Redirect, Route, useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import HistoricalChart from "components/molecules/HistoricalChart/HistoricalChart";
import LoadingPage from "components/molecules/loadingPage/LoadingPage";
import HomePageImg from "assets/images/homepage.png";
import ForumPageImg from "assets/images/chat.png";
import LinkButton from "components/atoms/LinkButton/LinkButton";
import MarketList from "components/molecules/MarketList/MarketList";
import BackBtn from "assets/images/back.png";
import favBtn from "assets/images/star.png";
import favBtnIcon from "assets/images/star(1).png";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.main};
`;

const ContentWrapper = styled.div`
  margin: 0 auto;
  width: 80%;
  height: 30%;
  display: flex;
  flex-wrap: wrap;
`;

const PriceWrapper = styled.div`
  width: 70%;
  height: 100%;
`;

const LinksWrapper = styled.div`
  width: 30%;
  height: 100%;
  padding-top: 50px;
  display: flex;
`;

const StyledButton = styled(Link)`
  position: absolute;
  left: 0;
  background-color: ${({ theme }) => theme.colors.main};
  color: white;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 50px;
  border-radius: 15px;
  padding: 10px 30px;
  cursor: pointer;
  text-decoration: none;
  font-weight: 500;
`;

const Name = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 10px;

  img {
    margin-right: 10px;
  }
`;

const Price = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  p {
    font-size: 26px;
    font-weight: 500;
    margin-right: 10px;
  }
`;

const RankP = styled.p`
  font-weight: 400;
  margin-left: 50px;
  font-size: 20px;

  span {
    font-weight: 600;
  }
`;

const PercentBox = styled.div`
  background-color: ${({ price }) => {
    if (price > 0) {
      return "#8FCB81";
    } else {
      return "#CB8581";
    }
  }};
  padding: 5px;
  border-radius: 7px;
  font-weight: 500;
  color: white;
`;

const Ath = styled.div`
  background-color: tomato;
  height: 100%;
  margin-top: 30px;
`;

const activeClassName = "active-link";
export const StyledLink = styled(NavLink).attrs({ activeClassName })`
  text-decoration: none;
  color: white;
  margin-right: 15px;
  border-radius: 12px;
  font-weight: 600;
  padding: 10px 40px;
  background-color: ${({ theme }) => theme.colors.main};

  &.${activeClassName} {
    background-color: ${({ theme }) => theme.colors.mainSoft};
  }
`;

const DetailsWrapper = styled.div`
  width: 90%;
  height: 64%;
  margin: 0 auto;
`;

const RouteSwitcher = styled.nav`
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.colors.soft};
  border-bottom: 1px solid ${({ theme }) => theme.colors.soft};
  position: fixed;
  height: 60px;
  position: relative;
  display: flex;
  justify-content: flex-start;
  background-color: white;
  align-items: center;
`;

const DetailsContentWrapper = styled.div`
  margin: 10px auto;
  width: 100%;
  height: 98%;
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

const CoinDetailsPage = ({ coin }) => {
  const [coinChartDetails, setCoinChartDetails] = useState(null);
  const [coinDetails, setCoinDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { currency, favouriteCoins, handleFavouriteCoins } = useContext(MarketContext);

  const pageCurrency = currency;

  const { id } = useParams();

  // console.log(id);

  const formatData = (data) => {
    return data.map((el) => {
      return {
        x: el[0],
        y: el[1],
      };
    });
  };

  const fetchData = async () => {
    try {
      const data = await axios
        .get(`https://api.coingecko.com/api/v3/coins/${id}`)
        .then(({ data }) => {
          console.log(data);
          setCoinDetails(data);
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(async () => {
    await fetchData();

    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [currency]);

  useEffect(async () => {
    await axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${currency}&days=1`
      )
      .then(({ data }) => setCoinChartDetails(formatData(data.prices)))
      .catch((err) => console.log(err));
  }, [currency]);

  const getPrice = () => {
    switch (currency) {
      case "usd":
        return `${coinDetails.market_data.current_price.usd} USD`;
      case "pln":
        return `${coinDetails.market_data.current_price.pln} PLN`;

      case "eur":
        return `${coinDetails.market_data.current_price.eur} EUR`;
      default:
        break;
    }
  };

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <Wrapper>
          {/* <StyledButton to="/market/">market</StyledButton> */}
          <ContentWrapper>
            <PriceWrapper>
              <Name>
                <img src={coinDetails.image.small} />
                <p>
                  {coinDetails.name} ({coinDetails.symbol.toUpperCase()})
                </p>
                <RankP>
                  rank: <span> {coinDetails.market_cap_rank} </span>
                </RankP>
              </Name>
              <Price>
                <p> {getPrice()} </p>
                <PercentBox price={coinDetails.market_data.price_change_percentage_24h.toFixed(2)}>
                  {coinDetails.market_data.price_change_percentage_24h.toFixed(2)}%
                </PercentBox>
              </Price>
            </PriceWrapper>
            <LinksWrapper>
              <LinkButton value={HomePageImg} link={coinDetails.links.homepage}>
                home page
              </LinkButton>
            </LinksWrapper>
          </ContentWrapper>
          <DetailsWrapper>
            <RouteSwitcher>
              <StyledLink to={`/market/${coin}/overview`}>Overview</StyledLink>
              <StyledLink to={`/market/${coin}/market-list`}>Market</StyledLink>
              <StyledLink to={`/market/${coin}/community`}>Community</StyledLink>
            </RouteSwitcher>
            <DetailsContentWrapper>
              <Route>
                <Redirect to={`/market/${coin}/overview`} />
              </Route>
              <Route path={`/market/${coin}/market-list`}>
                <MarketList />
              </Route>
              <Route exact path={`/market/${coin}/overview`}>
                <HistoricalChart coinChartDetails={coinChartDetails} />
              </Route>
              <Route path={`/market/${coin}/community`}>
                <div>community</div>
              </Route>
            </DetailsContentWrapper>
          </DetailsWrapper>
        </Wrapper>
      )}
    </>
  );
};

export default CoinDetailsPage;
