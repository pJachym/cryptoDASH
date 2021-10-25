import React, { useState, useEffect } from "react";
import axios from "axios";

export const MarketContext = React.createContext({});

const MarketProvider = ({ children }) => {
  const [market, setMarket] = useState([]);
  const [currency, setCurrency] = useState("usd");
  const [favouriteCoins, setFavouriteCoins] = useState(["bitcoin", "terra-luna"]);
  const [loadingState, setLoadingState] = useState(false);
  const [coinDetail, setCoinDetail] = useState(null);

  // useEffect(() => {
  //   async function fetchData() {
  //     axios.get(
  //       `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`
  //     );
  //     const response = await axios.getData();
  //   }
  //   fetchData();
  // }, []);

  useEffect(async () => {
    await axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`
      )
      .then(({ data }) => setMarket(data))
      .catch((err) => console.log(err));
  }, [currency]);

  const handleCoinDetails = async (coin) => {
    await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${currency}&days=1`
    );
  };

  const handleFavouriteCoins = (coin) => {
    if (favouriteCoins.includes(coin)) {
      setFavouriteCoins(favouriteCoins.filter((item) => item !== coin));
    } else {
      setFavouriteCoins([...favouriteCoins, coin]);
    }
  };

  return (
    <MarketContext.Provider
      value={{
        market,
        setMarket,
        setCurrency,
        currency,
        favouriteCoins,
        handleFavouriteCoins,
        loadingState,
        setLoadingState,
        coinDetail,
        setCoinDetail,
      }}
    >
      {children}
    </MarketContext.Provider>
  );
};

export default MarketProvider;
