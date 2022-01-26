import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import FormControl from '@mui/material/FormControl';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@material-ui/core/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Button from '@material-ui/core/Button';
import Style from '../App.css';

const axios = require('axios');
const FormData = require('form-data');

function dateFormat(date) {
  let dateF = '';
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getUTCDate();
  dateF = `${year}-${month}-${day}`;
  return dateF;
}

function Form({ handleClose }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    let Token = localStorage.getItem('django_Token');
    Token = `token ${Token}`;
    const data = new FormData();
    data.append('start_date', dateFormat(startDate));
    data.append('end_date', dateFormat(endDate));
    data.append('reason', reason);
    data.append('user', localStorage.getItem('user_id'));

    const config = {
      method: 'post',
      url: 'http://127.0.0.1:8000/leaves/leaves/',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: Token,
      },
      data,
    };

    axios(config)
      .then((response) => {
        alert(response.data);
      })
      .catch();

    handleClose();
  };

  return (
    <FormControl>
      <Paper style={{ padding: 12 }}>
        <Grid container alignItems="flex-start" spacing={2}>
          <Grid item xs={5} fullWidth={true}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Start_Date"
                value={startDate}
                required
                onChange={(newValue) => {
                  setStartDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={5}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="End_Date"
                value={endDate}
                required
                onChange={(newValue) => {
                  setEndDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={5}>
            <TextField
              label="reason"
              variant="filled"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </Grid>
          <Grid item xs={5}>
            <Box sx={{ mx: 2 }}>
              <Button
                type="submit"
                onClick={handleSubmit}
                variant="contained"
                color="primary"
              >
                Add
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </FormControl>
  );
}

export default Form;
