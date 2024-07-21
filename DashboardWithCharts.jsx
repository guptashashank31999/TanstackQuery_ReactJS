import React from "react";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import CardWithLabel from "./Cards/CardConnectedUser";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Box } from "@material-ui/core";
import Charts from "./Charts/Charts";
import { useQuery } from "@tanstack/react-query";

import CardConnectedUser from "./Cards/CardConnectedUser";
import CardConnectedDevices from "./Cards/CardConnectedDevices";
import CardUserHealth from "./Cards/CardUserHealth";
import CardTagCloud from "./Cards/CardTagCloud";
import ChartClientDataRate from "./Charts/ChartClientDataRate";
import ChartConnectivityRSSI from "./Charts/ChartConnectivityRSSI";
import ChartConnectivitySNR from "./Charts/ChartConnectivitySNR";
import ChartOnboarding from "./Charts/ChartOnboarding";
import CardActiveDevices from "./Cards/CardActiveDevices";

const useStyles = makeStyles({
  root: {},
  gridItem: {
    marginTop: "40px",
  },
  gridItem_charts: {
    marginTop: "40px",
    //  boxShadow: "0px 0px 8px 0px"
  },
});

const DashboardWithCharts = () => {
  const classes = useStyles();

  return (
    <>
      <div style={{background:"#F0F2F5"}}>
        <Header />

        <Box>
          <Grid className={classes.root} container spacing={0.5}>
            <Grid item sm={8}>
              <Grid container spacing={2}>
                <Grid className={classes.gridItem} item sm={6} xs={12}>
                  <CardConnectedUser />
                </Grid>
                <Grid className={classes.gridItem} item sm={6} xs={12}>
                  <CardConnectedDevices />
                </Grid>

                <Grid className={classes.gridItem} item sm={6} xs={12}>
                  <CardUserHealth />
                </Grid>

                <Grid className={classes.gridItem} item sm={6} xs={12}>
                  <CardActiveDevices />
                </Grid>
              </Grid>
            </Grid>

            <Grid item sm={4}>
              <Grid container spacing={0}>
                <Grid className={classes.gridItem} item sm={12} xs={12}>
                  <CardTagCloud />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>

        <Grid className={classes.root} container spacing={0.5}>
          <Grid className={classes.gridItem_charts} item sm={3}>
            <ChartClientDataRate />
          </Grid>
          <Grid className={classes.gridItem_charts} item sm={3}>
            <ChartConnectivityRSSI />
          </Grid>
          <Grid className={classes.gridItem_charts} item sm={3}>
            <ChartConnectivitySNR />
          </Grid>
          <Grid className={classes.gridItem_charts} item sm={3}>
            <ChartOnboarding />
          </Grid>
        </Grid>
      </div>

      {/* <Footer /> */}
    </>
  );
};

export default DashboardWithCharts;
