import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Box, Divider } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { Bar } from "react-chartjs-2";
import config from "./Config";

const useStyles = makeStyles({
  root: {
    // minWidth: 100,
    minHeight: 250,
    // boxShadow: "0px 0px 2px 0px",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  box: {
    position: "absolute",
    border: "1px solid",
    bottom: "80%",
    width: "40px",
    height: "50px",
    borderRadius: "10px",
    left: "25px",
    // boxShadow: "0px 1px 4px",
    background: "#ffffff",
  },
  cardTitleGrid: {
    float: "end",
  },
  cardTitleGrid: {
    display: "flex",
    justifyContent: "flex-end", // Adjusts the grid item's content alignment
  },

  divider: {
    border: "1px solid black",
  },
});

const Charts = () => {
  const classes = useStyles();
  const data = {
    labels: [
      ["Sprint", "11"],
      ["Sprint", "12"],
      ["Sprint", "13"],
      ["Sprint", "14"],
      ["Sprint 15", "(Latest)"],
    ],
    datasets: [
      {
        categoryPercentage: 1,
        label: "Sprint Velocity",
        data: [65, 59, 80, 81, 56],
        backgroundColor: [
          "rgba(99, 99, 234, 1)",
          "rgba(99, 99, 234, 0.7)",
          "rgba(99, 99, 234, 0.4)",
          "rgba(99, 99, 234, 0.1)",
          "rgba(236, 91, 86, 1)",
        ],
        borderWidth: 0,
        barThickness: 10,
      },
    ],
  };
  // const data = {
  //     labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  //     datasets: [
  //       {
  //         yAxisID: "left-y-axis",
  //         type: "bar",
  //         label: "Clicks",
  //         borderWidth: 0,
  //         borderRadius: 6,
  //         borderSkipped: false,
  //         backgroundColor: "#1096a5",
  //         data: [10, 30, 50 , 60, 90 , 50 , 11],
  //         barThickness: 10,
  //         borderSkipped: ["bottom"]
  //       }
  //     ]
  //   };
  // const options = {
  //     scales: {
  //       x: {
  //         grid: {
  //           display: false
  //         }
  //       },
  //       y: {
  //         grid: {
  //           display: false
  //         }
  //       },

  //       "left-y-axis": {
  //         type: "linear",
  //         position: "left",

  //         ticks: {
  //           maxTicksLimit: 3
  //         }
  //       },

  //     },
  //     plugins: {
  //         legend: {
  //           display: false
  //         },
  //         customCanvasBackgroundColor: {
  //             color: 'lightGreen',
  //         }
  //       }
  //   };

  const options = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
      },
      y: {
        display: false,
        grid: {
          display: false,
          drawBorder: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: "Sprint Velocity",
        padding: {
          bottom: 20,
        },
        weight: "bold",
        color: "#00325c",
        font: {
          size: 13,
        },
        align: "center",
      },
      datalabels: {
        display: true,
        color: "white",
        align: "bottom",
        padding: {
          right: 0,
        },
        labels: {
          padding: { top: 1 },
          title: {
            font: {
              weight: "bold",
              size: 24,
            },
          },
          // value: {
          //   color: "green"
          // }
        },
        // formatter: function (value) {
        //   return "\n" + value;
        // }
      },
    },
  };

  return (
    <div style={{ padding: "10px", position: "relative"}}>
      <Card className={classes.root}>
        <CardContent>
          <Grid container spacing={1}>
            <Grid item className={classes.cardTitleGrid} xs={12}>
              <Bar data={data} options={options}/>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* <Divider className={classes.divider} /> */}

      {/* <Grid container spacing={1}>
            <Grid item className={classes.cardTitleGrid} xs={6}>
              <Typography className={classes.pos} color="textSecondary">
                Test-1
              </Typography>
            </Grid>
            <Grid item className={classes.cardTitleGrid} xs={6}>
              <Typography className={classes.pos} color="textSecondary">
                Test-2
              </Typography>
            </Grid>
          </Grid> */}
    </div>
  );
};

export default Charts;
