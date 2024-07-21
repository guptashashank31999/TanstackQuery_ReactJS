import React, { useState } from "react";
import Header from "../../layout/Header";
import { Box, CircularProgress, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { useLocation, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrlChart } from "./configPage";



const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
  grid: {
    margin: "15px",
  },
  cardLoader: {
    display: "flex",
    justifyContent: "center", // Adjusts the grid item's content alignment
    alignItems: "center",
    height: "50vh",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflowY:"auto"
  },
  paper: {
    backgroundColor: "white",
    border: "2px solid #000",
    // boxShadow: theme.shadows[5],
    padding: "2px 4px 3px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50vw",
    bgcolor: "background.paper",
    border: "1x solid #FFF",
    boxShadow: 24,
    borderRadius: "10px",
    padding: "10px",
    height:"90vh",
    overflowY:"auto",

  },
  cardBody: {
    background: "White",
  },
  typography:{
    display:"flex",
    justifyContent:"center",
    padding:"20px"
  }
});

const UserHealthSubPage = () => {
  const paramsValue = useLocation();
  let params  = paramsValue.pathname.split("/")[2]
 
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = React.useState(false);
  const [clientInfo, setClientInfo] = React.useState([]);
  const [clientOnBoarding, setClientOnBoarding] = React.useState([]);
  const [clientPerformance, setClientPerformance] = React.useState([]);
  const [connectedNetworkPerformance, setConnectedNetworkPerformance] =
    React.useState([]);

  const { isPending, error, data } = useQuery({
    queryKey: ["UserHelalthSubPage"],
    queryFn: async () => {
      const res = await axios.get(
        `${baseUrlChart}connectedUsersHealth?userHealth=${params}`
      );
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (data) => {
      setOpen(true);
      let temp = await axios.get(
        `http://loaclhost:8060/test/dashboard/AppHealth?userName=${data.UserName}`
      );
      return temp.data;
    },
    onSuccess: (data, variables, context) => {

      let temp_Client_Info = [];
      let temp_Client_On_Boarding = [];
      let temp_Client_Performance = [];
      let temp_Connected_Network_Performance = [];
      if (Object.keys(data)?.length > 0) {
        let {
          Client_Info,
          Client_On_Boarding,
          Client_Performance,
          Connected_Network_Performance,
        } = data;

        for (let key in Client_Info) {
          temp_Client_Info.push({ key, value: Client_Info[key] });
        }
        for (let key in Client_On_Boarding) {
          temp_Client_On_Boarding.push({ key, value: Client_On_Boarding[key] });
        }
        for (let key in Client_Performance) {
          temp_Client_Performance.push({ key, value: Client_Performance[key] });
        }
        for (let key in Connected_Network_Performance) {
          temp_Connected_Network_Performance.push({
            key,
            value: Connected_Network_Performance[key],
          });
        }
        setClientInfo(temp_Client_Info);
        setClientOnBoarding(temp_Client_On_Boarding);
        setClientPerformance(temp_Client_Performance);
        setConnectedNetworkPerformance(temp_Connected_Network_Performance);
      }
    },
    onError: (error, variables, context) => {
      console.log("Error line 142", error);
      console.log("variables line 142", variables);
      console.log("context line 142", context);
    },
    onSettled: (data, error, variables, context) => {
      console.log("data line 147", data);
      console.log("error line 147", error);
      console.log("variables line 147", variables);
      console.log("context line 147", context);
    },
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log("clientInfo, ", clientInfo);
  console.log("clientOnBoarding , ", clientOnBoarding);
  console.log("clientPerformance, , ", clientPerformance);
  console.log("connectedNetworkPerformance, ", connectedNetworkPerformance);
  return (
    <>
      <Header />
      {isPending ? (
        <Grid container spacing={1}>
          <Grid item className={classes.cardLoader} xs={12}>
            <CircularProgress size={20} />
          </Grid>
        </Grid>
      ) : (
        <Grid container>
          <Grid item sm={12} className={classes.grid}>
            <Paper className={classes.root}>
              
                <>
                  <Table>
                    <thead>
                      <tr>
                        <th>S.No.</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>User MAC Address</th>
                        <th>Healths</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data
                        ?.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((item, index) => {
                          return (
                            <tr>
                              <td>{index + 1}</td>
                              <th>{item.Name}</th>
                              <td>{item.UserName}</td>
                              <td>{item.Mail}</td>
                              <td>{item.UserMACAddress}</td>
                              <td
                                onClick={() => {
                                  mutation.mutate({
                                    UserName: item.UserName,
                                  });
                                }}
                              >
                                {item.UserHealth}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
                  <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={data?.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </>
              
            </Paper>
          </Grid>
        </Grid>
      )}

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {mutation.isPending ? (
            <div className={classes.paper}>
              <CircularProgress size={20} />
            </div>
          ) : (
            <Box className={classes.paper}>
              <Box>
                <Box xs={12}>
                  <Typography variant="h5">Client Info</Typography>
                </Box>
                {clientInfo.length == 0 ? (
                  <Box item xs={12}>
                    <Typography>No Records Found.</Typography>
                  </Box>
                ) : (
                  <>
                    {clientInfo.map((item, index) => {
                      return (
                        <Box xs={4}>
                          <Box>{item.key}</Box>
                          <Box>{item.value}</Box>
                        </Box>
                      );
                    })}
                  </>
                )}
              </Box>

              <Box>
                <Box item xs={12}>
                  <Typography variant="h5">Client On Boarding</Typography>
                </Box>
                {clientOnBoarding.length == 0 ? (
                  <Box item xs={12}>
                    <Typography>No Records Found.</Typography>
                  </Box>
                ) : (
                  <>
                    {clientOnBoarding.map((item, index) => {
                      return (
                        <Box item xs={4}>
                          <Box>{item.key}</Box>
                          <Box>{item.value}</Box>
                        </Box>
                      );
                    })}
                  </>
                )}
              </Box>

              <Box >
                <Box item xs={12}>
                  <Typography variant="h5">Client Performance</Typography>
                </Box>
                {clientPerformance.length == 0 ? (
                  <Box item xs={12}>
                    <Typography>No Records Found.</Typography>
                  </Box>
                ) : (
                  <>
                    {clientPerformance.map((item, index) => {
                      return (
                        <Box item xs={4}>
                          <Box>{item.key}</Box>
                          <Box>{item.value}</Box>
                        </Box>
                      );
                    })}
                  </>
                )}
              </Box>

              <Box container spacing={1}>
                <Box item xs={12}>
                  <Typography variant="h5">
                    Connected Network Performance
                  </Typography>
                </Box>
                {connectedNetworkPerformance.length == 0 ? (
                  <Box item xs={12}>
                    <Typography>No Records Found.</Typography>
                  </Box>
                ) : (
                  <>
                    {connectedNetworkPerformance.map((item, index) => {
                      return (
                        <Box item xs={4}>
                          <Box>{item.key}</Box>
                          <Box>{item.value}</Box>
                        </Box>
                      );
                    })}
                  </>
                )}
              </Box>
            </Box>
          )}
        </Fade>
      </Modal>
    </>
  );
};

export default React.memo(UserHealthSubPage);
