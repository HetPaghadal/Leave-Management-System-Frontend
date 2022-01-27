import React, { useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from '../AxiosInstance';
import Title from './Title';

function CurrentAddedLeaves() {
  const [list, setList] = React.useState([]);

  useEffect(() => {
    async function fetchAPI() {
      let Token = localStorage.getItem('django_Token');
      Token = `token ${Token}`;

      const data = new FormData();

      const config = {
        method: 'get',
        url: `leaves/leaves/`,
        headers: {
          Authorization: Token,
        },
        data,
      };

      await axios(config)
        .then(async (response) => {
          setList(response.data);
        })
        .catch();
    }

    fetchAPI();
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

export default CurrentAddedLeaves;
