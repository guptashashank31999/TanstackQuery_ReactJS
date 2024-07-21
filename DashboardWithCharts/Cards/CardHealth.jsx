import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import Typography from "@material-ui/core/Typography";
import { Box, CircularProgress, Divider } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { cssConnectedUser } from "./CssConnectedUser";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { baseUrlChart } from "../configPage";
import QueuePlayNextIcon from '@material-ui/icons/QueuePlayNext';
const useStyles = makeStyles(cssConnectedUser);

const CardUserHealth = () => {

  const classes = useStyles();
  const bull_red = <span className={classes.bulletRed}>•</span>;
  const bull_yellow = <span className={classes.bulletYellow}>•</span>;
  const bull_green = <span className={classes.bulletGreen}>•</span>;

  const { isPending, error, data } = useQuery({
    queryKey: ["userHealth"],
    queryFn: () => {
      const res =  axios.get(`${baseUrlChart}HealthStatus?health=all`);
      return res;
    }
     
  });

  
  return (
    <div style={{ padding: "10px", position: "relative" }}>
      <Box component="section" className={classes.box}>
      <div style={{position:"relative", left: "25%", top:"15%"}}>
        <QueuePlayNextIcon/>
      </div>
      </Box>
      <Card className={classes.root}>
        {isPending ? (
          <Grid container spacing={1}>
            <Grid item className={classes.cardLoader} xs={12}>
              <CircularProgress size={20} />
            </Grid>
          </Grid>
        ) : (
          <CardContent className={classes.cardContent}>
            <Grid container spacing={1}>
              <Grid item className={classes.cardTitleGrid} xs={12}>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  User Healths
                </Typography>
              </Grid>
            </Grid>

            <Grid container spacing={1}>
              <Grid item className={classes.cardTitleGrid} xs={12}>
                <Typography
                  className={classes.title_Count}
                  color="#344767"
                  gutterBottom
                >
                  {data?.data?.Total}
                </Typography>
              </Grid>
            </Grid>

            <Grid container spacing={1}>
              <Grid item xs={4}>
                <Typography
                  className={classes.heading}
                  variant="h5"
                  component="h6"
                  title="Poor"
                >
                <Link to={"/dashboardCharts/poor"} className={classes.linkStyle}>
                  { bull_red} {data?.data?.Poor}
                </Link>
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography
                  className={classes.heading}
                  variant="h5"
                  component="h6"
                  title="Fair"
                >
                 <Link to={"/dashboardCharts/fair"} className={classes.linkStyle}>
                 { bull_yellow} {data?.data?.Fair}
                  </Link>
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography
                  className={classes.heading}
                  variant="h5"
                  component="h6"
                  title="Good"
                >
                  <Link to={"/dashboardCharts/good"} className={classes.linkStyle}>
                  { bull_green} {data?.data?.Good}
                  </Link>
                </Typography>
              </Grid>
            </Grid>
            <Divider className={classes.divider} />

            <Grid container spacing={1}>
              <Grid item className={classes.cardTitleGrid} xs={12}>
                <Typography className={classes.pos} color="textSecondary">
                  adjective
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default React.memo(CardUserHealth);