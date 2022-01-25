import React, { useState } from 'react';
import clsx from 'clsx';
import { GoogleLogout } from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Box from '@mui/material/Box';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@mui/material/Paper';

import TextField from '@material-ui/core/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

import CurLeaves from './CurLeaves';
import PerticularLeaves from './PerticularLeaves';
import Title from './Title';
import AddLeaveDialog from './AddLeaveDialog';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

function Dash() {
  function dateFormat(Date) {
    let dateF = '';
    const year = Date.getFullYear();
    const month = Date.getMonth() + 1;
    const day = Date.getUTCDate();
    dateF = `${year}-${month}-${day}`;
    return dateF;
  }

  const classes = useStyles();
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  const [openDrawer, setOpenDrawer] = useState(false);
  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };
  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const [isAddLeaves, setAddLeaves] = useState(false);
  const [pLeave, setPLeave] = useState(false);
  const [date, setDate] = useState('');

  const openDiag = () => {
    setAddLeaves(true);
  };

  const closeDiag = () => {
    setAddLeaves(false);
  };

  const handleSubmit = () => {
    setPLeave(true);
  };

  // declare a new state variable for modal open
  const [open, setOpen] = useState(false);

  // function to handle modal open
  const handleOpen = () => {
    setOpen(true);
  };

  // function to handle modal close
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        style={{ background: '#15317E' }}
        position="absolute"
        className={clsx(classes.appBar, openDrawer && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              openDrawer && classes.menuButtonHidden,
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Leave Tracker
          </Typography>
          <Typography
            component="h3"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Hi,{' '}
            {localStorage.getItem('first_name') +
              localStorage.getItem('last_name')}
          </Typography>
          <Button variant="contained" color="sucess" onClick={handleOpen}>
            Add Leaves
          </Button>
          <AddLeaveDialog open={open} handleClose={handleClose} />
          <GoogleLogout
            clientId={process.env.REACT_APP_CLIENT_KEY}
            render={(renderProps) => (
              <Box sx={{ mx: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ background: '#D2042D' }}
                  onClick={renderProps.onClick}
                >
                  Logout
                </Button>
              </Box>
            )}
            buttonText="Logout"
            icon={false}
            onLogoutSuccess={logout}
          />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(
            classes.drawerPaper,
            !openDrawer && classes.drawerPaperClose,
          ),
        }}
        open={openDrawer}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <div>
            <ListItem button onClick={openDiag}>
              {isAddLeaves && (
                <AddLeaveDialog open={isAddLeaves} handleClose={closeDiag} />
              )}
              <ListItemIcon>
                <AddBoxIcon />
              </ListItemIcon>
              <ListItemText primary="Add Leaves" />
            </ListItem>
          </div>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Paper className={classes.paper}>
                <CurLeaves />
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className={classes.paper}>
                <Title>Get_Perticular_Day_Leaves</Title>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    value={date}
                    required
                    onChange={(newValue) => {
                      setDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                <Box sx={{ mx: 2, my: 2 }}>
                  <Button
                    type="submit"
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                  >
                    Get
                  </Button>
                </Box>
              </Paper>
              <Paper className={classes.paper} sx={{ my: 2 }}>
                {pLeave && <PerticularLeaves Date={dateFormat(date)} />}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}

export default Dash;
