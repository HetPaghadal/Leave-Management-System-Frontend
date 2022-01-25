import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

function CurLeaves() {
  const [list, setList] = React.useState([]);

  useEffect(() => {
    let Token = localStorage.getItem('django_Token');
    Token = `token ${Token}`;
    fetch('http://127.0.0.1:8000/leaves/leaves/', {
      method: 'get',
      headers: new Headers({
        Authorization: Token,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setList(result);
        },
        (error) => {},
      );
  }, []);

  return (
    <>
      <Title>Current Added Leaves</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Employee</TableCell>
            <TableCell>Start_Date</TableCell>
            <TableCell>End_Date</TableCell>
            <TableCell>Reason</TableCell>
            <TableCell>email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((row) => (
            <TableRow>
              <TableCell>
                {row.first_name} {row.last_name}
              </TableCell>
              <TableCell>{row.start_date}</TableCell>
              <TableCell>{row.end_date}</TableCell>
              <TableCell>{row.reason}</TableCell>
              <TableCell>{row.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default CurLeaves;
