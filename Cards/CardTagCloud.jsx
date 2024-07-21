import { Box, Card, CardContent, CircularProgress, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { TagCloud } from "react-tagcloud";
import { cssConnectedUser } from "./CssConnectedUser";
import { useQuery } from "@tanstack/react-query";
import { baseUrlChart } from "../configPage";
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
const data1 = [
  { value: "jQuery", count: 25 },
  { value: "MongoDB", count: 18 },
  { value: "JavaScript", count: 38 },
  { value: "React", count: 30 },
  { value: "Nodejs", count: 28 },
  { value: "Express.js", count: 25 },
  { value: "HTML5", count: 25 },
];

const useStyles = makeStyles(cssConnectedUser);
const CardTagCloud = () => {
  const classes = useStyles();

  const { isPending, error, data } = useQuery({
    queryKey: ["tagCloud"],
    queryFn: () =>
      fetch(`${baseUrlChart}faultyIndicator`).then(
        async (res) => {
          let actualData = await res.json();

          let result = Object.entries(actualData).map(([key, value]) => {
            return { value: key, count: value };
          });
          return result;
        }
      ),
  });
 
  return (
    <>
      <div style={{ padding: "10px", position: "relative" }}>
        <Box component="section" className={classes.tagCloud_box}>
        <div style={{position:"relative", left: "25%", top:"15%"}}>

          <DragIndicatorIcon/>
        </div>
        </Box>
        <Card className={classes.tagCloud_root}>
          {isPending ? (
            <Grid container spacing={1} className={classes.circularProgress}>
              <Grid item className={classes.cardLoader} xs={12}>
                <CircularProgress size={20} />
              </Grid>
            </Grid>
          ) : (
            <CardContent className={classes.tagCloudCardContent}>
              <TagCloud
                minSize={12}
                maxSize={35}
                tags={data || []}
                className="simple-cloud"
                onClick={(tag) => alert(`'${tag.value}' was selected!`)}
              />
            </CardContent>
          )}
        </Card>
      </div>
    </>
  );
};

export default CardTagCloud;
