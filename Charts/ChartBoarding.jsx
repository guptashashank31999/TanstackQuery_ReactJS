import React, { useState } from "react";
import { ChartCss, chartOption } from "./CssChartClientDataRate";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Bar } from "react-chartjs-2";
import { baseUrlChart } from "../configPage";
import AcUnitIcon from "@material-ui/icons/AcUnit";
const useStyles = makeStyles(ChartCss);

const ChartOnboarding = () => {
  const [labels, setLabels] = useState([]);
  const classes = useStyles();

  const { isPending, error, data } = useQuery({
    queryKey: ["chartOnboarding"],
    queryFn: async () => {
      const res = await axios.get(
        `${baseUrlChart}clientHealth?type=rssi`
      );
      let labelsArray = res.data.map((item, index) => [item.label, item.value]);
      let dataArray = res.data.map((item, index) => item.value);

      setLabels(labelsArray);

      return dataArray;
    },
  });

  const data1 = {
    labels: labels,
    datasets: [
      {
        categoryPercentage: 1,

        data: data,
        backgroundColor: [
          "#6B809F",
          "#6B809F",
          "#6B809F",
          "#6B809F",
          "#6B809F",
        ],
        borderWidth: 0,
        barThickness: 10,
      },
    ],
  };
  const options = chartOption;
  return (
    <div style={{ padding: "10px", position: "relative" }}>
      <Box className={classes.chartClasses}>
        {isPending ? (
          <Grid container spacing={1}>
            <Grid item className={classes.chartLoader} xs={12}>
              <CircularProgress size={20} />
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={1}>
            <Grid item xs={12} className={classes.chartItem}>
              <Bar data={data1} options={options} width={260} height={200} />
            </Grid>
          </Grid>
        )}
      </Box>

      <Card className={classes.root}>
        <CardContent className={classes.inside}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography>Connectivity Onboarding</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default React.memo(ChartOnboarding);
