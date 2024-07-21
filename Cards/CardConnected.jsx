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
import { baseUrlChart } from "../configPage";
import DevicesOtherIcon from '@material-ui/icons/DevicesOther';
const useStyles = makeStyles(cssConnectedUser);

const CardConnectedDevices = () => {
    const { isPending, error, data } = useQuery({
        queryKey: ["ConnDevice"],
        queryFn:   () => {
          const res =  axios.get(`${baseUrlChart}connectedMechine`);
          return res;
        }
      });

  const classes = useStyles();
  return (
    <div style={{ padding: "10px", position: "relative" }}>
      <Box component="section" className={classes.box}>
      <div style={{position:"relative", left: "25%", top:"15%"}}>

           <DevicesOtherIcon/>
      </div>
      </Box>
      <Card className={classes.root}>
        {isPending ? (
          <Grid container spacing={1} className={classes.circularProgress}>
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
                  Connected Device
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
                  {data?.data?.Total_Devices}
                </Typography>
              </Grid>
            </Grid>

            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography
                  className={classes.heading}
                  variant="h5"
                  component="h6"
                >
                 Up Devices  <span style={{fontWeight:700, marginLeft:"20px"}}>{data?.data?.Total_UP_Devices}</span>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  className={classes.heading}
                  variant="h5"
                  component="h6"
                >
                  Down Devices <span style={{fontWeight:700, marginLeft:"20px"}}>{data?.data?.Total_DOWN_Devices}</span>
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
  )
}

export default React.memo(CardConnectedDevices)
