import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import TrendingUp from "@material-ui/icons/TrendingUp";
import TrendingDown from "@material-ui/icons/TrendingDown";
import TrendingFlat from "@material-ui/icons/TrendingFlat";

const { API_URL, API_HOST, API_KEY } = window;

const useStyles = makeStyles((theme) => ({
  listContainer: {
    width: "100%",
  },
  positive: {
    color: theme.palette.success.main,
  },
  negative: {
    color: theme.palette.error.main,
  },
  neutral: {
    color: theme.palette.grey[500],
  },
}));

function App() {
  const classes = useStyles();
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
    <Grid container item xs={12} sm={6} md={4} justify="center">
      <List className={classes.listContainer}>
        {marketData.map((ticker) => {
          const {
            regularMarketChangePercent,
            symbol,
            shortName,
            regularMarketPrice,
          } = ticker;
          const getStatus = (delta) => {
            if (delta > 0) return "positive";
            if (delta < 0) return "negative";
            else return "neutral";
          };
          const status = getStatus(ticker.regularMarketChangePercent.raw);
          return (
            <React.Fragment key={symbol}>
              <ListItem>
                <ListItemIcon>
                  {status === "positive" ? (
                    <TrendingUp className={classes[status]} />
                  ) : status === "negative" ? (
                    <TrendingDown className={classes[status]} />
                  ) : (
                    <TrendingFlat className={classes[status]} />
                  )}
                </ListItemIcon>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Typography>{shortName}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography>{regularMarketPrice.fmt}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography className={classes[status]}>
                      {status === "positive" && "+"}
                      {regularMarketChangePercent.fmt}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <Divider />
            </React.Fragment>
          );
        })}
      </List>
    </Grid>
  );
}

export default App;
