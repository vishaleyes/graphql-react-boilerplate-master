import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_USERS, VIEW_USERS, ADD_USER, DELETE_USER } from "./Queries";
import { Card, CardBody, CardHeader, CardSubtitle, Spinner } from "reactstrap";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Grid, Button, Typography, Paper } from "@material-ui/core";
import Skeleton from '@material-ui/lab/Skeleton';
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import { useMutation } from "@apollo/react-hooks";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

function App() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const classes = useStyles();
  const getAllUsers = useQuery(GET_USERS);
  console.log("gelAllUsers", getAllUsers);
  const userInfo = useQuery(VIEW_USERS, { variables: { id: 3 } });
  const { enqueueSnackbar } = useSnackbar();
  const [createUser, { loading: userLoading }] = useMutation(ADD_USER, {
    refetchQueries: [{ query: GET_USERS }],
    onCompleted: async (data) => { console.log("data", data);
      if (userLoading === false) {
        reset();
      }
      if (data.createUser == true) {
        enqueueSnackbar("Successfully added user", {
          variant: "success",
        });
        reset();
      }
    },
    onError: (error) => {
      enqueueSnackbar(error.message, {
        variant: "error",
      });
    },
  });

  const [deleteUser, { loading: deleteUserLoading }] = useMutation(DELETE_USER, {
    refetchQueries: [{ query: GET_USERS }],
    onCompleted: async (data) => {
      if (userLoading === false) {
        reset();
      }
      if (data.deleteUser == true) {
        enqueueSnackbar("Successfully deleted user", {
          variant: "success",
        });
        reset();
      }
    },
    onError: (error) => {
      enqueueSnackbar(error.message, {
        variant: "error",
      });
    },
  });

  const handleClick = (id) => {
    console.log("id---", id);
    deleteUser({
      variables : {
        id : parseInt(id)
      }
    })
  }

  const onSubmit = (data) => {
    console.log(data);
    createUser({
      variables: {
        ...data,
      },
    });
  };
  console.log("getAllUsers.data", getAllUsers?.data?.getAllUsers);
  if (getAllUsers.loading || userInfo.loading) return <Spinner color="dark" />;
  if (getAllUsers.error || userInfo.error)
    return <React.Fragment>Error :(</React.Fragment>;

  return (
    <div className="container">
      {getAllUsers.loading ||
        (userInfo.loading && (
          <Grid>
            <Skeleton variant="text" />
            <Skeleton variant="circle" width={40} height={40} />
            <Skeleton variant="rect" width={210} height={118} />
          </Grid>
        ))}
      <Card>
        <CardHeader>Query - Displaying all data</CardHeader>
        <CardBody>
          <pre>{JSON.stringify(getAllUsers.data, null, 2)}</pre>
          <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">NAME</TableCell>
                <TableCell align="center">JOB TITLE</TableCell>
                <TableCell align="center">ACTION</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {getAllUsers?.data?.getUsers.map((user) => (
              <TableRow key={user?.id}>
              <TableCell align="center">{user?.id}</TableCell>
              <TableCell align="center">{user?.name}</TableCell>
              <TableCell align="center">{user?.job_title}</TableCell>
              <TableCell align="center"> <DeleteIcon onClick={() => handleClick(user?.id)} /></TableCell>
              </TableRow>
            ))}
            </TableBody>
          </Table>
          </TableContainer>  
        </CardBody>
      </Card>
      <Card>
        <CardHeader>Query - Displaying data with args</CardHeader>
        <CardBody>
          <CardSubtitle>Viewing a user by id</CardSubtitle>
          <pre>{JSON.stringify(userInfo.data, null, 2)}</pre>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>Mutation - Create User with args</CardHeader>
        <CardBody>
          <CardSubtitle>Viewing a user by id</CardSubtitle>
          <form onSubmit={handleSubmit(onSubmit)} className={classes.root}>
            <Grid item md={4}>
              <TextField
                id="name"
                name="name"
                label="Name"
                {...register("name", { required: true, maxLength: 20 })}
              />
              {errors.name?.type && errors.name?.type === "required" && (
                <Typography color="error" variant="body1" component="span">
                  Name is required
                </Typography>
              )}
              {errors.name?.type && errors.name?.type === "maxLength" && (
                <Typography color="error" variant="body1" component="span">
                  Max length should be 20
                </Typography>
              )}
            </Grid>
            <Grid item md={4}>
              <TextField
                id="email"
                name="email"
                label="Email"
                variant="filled"
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
              />
              {errors.email?.type && errors.email?.type === "required" && (
                <Typography color="error" variant="body1" component="span">
                  Email is required
                </Typography>
              )}
              {errors.email?.type && errors.email?.type === "pattern" && (
                <Typography color="error" variant="body1" component="span">
                  Email is invalid
                </Typography>
              )}
            </Grid>
            <Grid item md={4}>
              <TextField
                id="job_title"
                name="job_title"
                label="Job Title"
                variant="outlined"
                {...register("job_title", { required: true })}
              />
              {errors.job_title?.type && errors.job_title?.type === "required" && (
                <Typography color="error" variant="body1" component="span">
                  Job Title is required
                </Typography>
              )}
            </Grid>
            <Grid item md={4}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Save
              </Button>
            </Grid>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

export default App;
