import React, { useEffect, useState } from "react";
import "./App.scss";

const { API_URL, API_HOST, API_KEY } = window;

function App() {
  const [marketData, setMarketData] = useState([]);
  useEffect(() => {
    const grabMarketData = async () => {
      const req = await fetch(API_URL, {
        method: "GET",
        headers: {
          "x-rapidapi-host": API_HOST,
          "x-rapidapi-key": API_KEY,
          useQueryString: true,
        },
      });
      const res = await req.json();
      if (res) {
        setMarketData(res.marketSummaryResponse.result);
      }
    };
    grabMarketData();
  }, []);

  return (
    <div className="App">
      {marketData.map((ticker) => {
        const positive = ticker.regularMarketChangePercent.raw > 0;
        return (
          <div key={ticker.symbol} className="tickerDataWrapper">
            <span>{ticker.shortName}</span>{" "}
            <span>{ticker.regularMarketPrice.fmt}</span>{" "}
            <span className={positive ? "green" : "red"}>
              {positive && "+"}
              {ticker.regularMarketChangePercent.fmt}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default App;
