import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

function PerticularLeaves(props) {
  const [list, setList] = useState([]);
  const { Date } = props;

  useEffect(() => {
    let Token = localStorage.getItem('django_Token');
    Token = `token ${Token}`;
    fetch(`http://127.0.0.1:8000/leaves/leaves/?date=${Date}`, {
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
  }, [Date]);

  return (
    <>
      <Title>Leaves on {Date}</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Employee</TableCell>
            <TableCell>Reason</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((row) => (
            <TableRow>
              <TableCell>
                {row.first_name} {row.last_name}
              </TableCell>
              <TableCell>{row.reason}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default PerticularLeaves;
