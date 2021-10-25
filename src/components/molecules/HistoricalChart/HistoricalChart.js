import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { Chart, registerables } from "chart.js";
import "chartjs-adapter-date-fns";
import "chartjs-adapter-luxon";
import { MarketContext } from "providers/MarketProvider/MarketProvider";
Chart.register(...registerables);

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: white;
`;

const HistoricalChart = ({ coinChartDetails }) => {
  const chartRef = useRef();
  const { currency } = useContext(MarketContext);

  useEffect(() => {
    const chartInstance = new Chart(chartRef.current, {
      type: "line",
      data: {
        labels: coinChartDetails.map((coin) => {
          const date = new Date(coin.x);
          let time =
            date.getHours() > 24
              ? `${date.getHours() - 24}:${date.getMinutes()}`
              : `${date.getHours()}:${date.getMinutes()}`;
          date.toLocaleDateString();
          return time;
        }),
        datasets: [
          {
            label: `1 day`,
            data: coinChartDetails,
            borderColor: "rgba(118,106,192,1)",
            borderJoinStyle: "round",
            borderCapStyle: "round",
            borderWidth: 3,
            pointRadius: 0,
            pointHitRadius: 10,
            lineTension: 0.2,
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: " btc!",
          fontSize: 35,
        },
        legend: {
          display: false,
        },
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          },
        },
        scales: {
          xAxes: [
            {
              display: false,
              gridLines: {},
            },
          ],
          yAxes: [
            {
              display: false,
              gridLines: {},
            },
          ],
        },
        tooltips: {
          callbacks: {
            //This removes the tooltip title
          },
          //this removes legend color
        },
      },
    });

    return () => {
      chartInstance.destroy();
    };
  }, [currency, coinChartDetails]);

  return (
    <Wrapper>
      <div>
        <canvas ref={chartRef} id="myChart" width={500} height={500}></canvas>
      </div>
    </Wrapper>
  );
};

export default HistoricalChart;
