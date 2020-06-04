import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import TrendingUp from "@material-ui/icons/TrendingUp";
import TrendingDown from "@material-ui/icons/TrendingDown";
import TrendingFlat from "@material-ui/icons/TrendingFlat";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";

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

  const grabMarketData = async () => {
    if (process.env.NODE_ENV === "development") {
      const res = require("./mocks/response.mock.json");
      return setMarketData([...res.result]);
    } else {
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
    }
  };

  useEffect(() => {
    grabMarketData();
  }, []);

  const handleRemoveOfItem = (ticker) => {
    const newMarketData = [...marketData];
    const indexToSplice = newMarketData.indexOf(ticker);
    newMarketData.splice(indexToSplice, 1);
    setMarketData([...newMarketData]);
  };

  return (
    <Grid container item xs={12} sm={8} md={7} lg={6} justify="center">
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
                <ListItemSecondaryAction>
                  <IconButton onClick={() => handleRemoveOfItem(ticker)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </React.Fragment>
          );
        })}
      </List>
      <Button onClick={grabMarketData}>Refresh Data</Button>
    </Grid>
  );
}

export default App;
