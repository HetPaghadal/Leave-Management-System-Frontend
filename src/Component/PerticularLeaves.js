import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from '../AxiosInstance';
import Title from './Title';

function PerticularLeaves(props) {
  const [list, setList] = useState([]);
  const { Date } = props;

  useEffect(() => {
    async function fetchAPI() {
      let Token = localStorage.getItem('django_Token');
      Token = `token ${Token}`;
      const data = new FormData();
      const config = {
        method: 'get',
        url: `leaves/leaves/?date=${Date}`,
        headers: {
          Authorization: Token,
        },
        data,
      };

      await axios(config)
        .then(async (response) => {
          setList(response.data);
        })
        .catch(function (error) {});
    }
    fetchAPI();
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
