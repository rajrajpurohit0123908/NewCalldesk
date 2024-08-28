import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor:'#15ABFFFF',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none',
  cursor: 'pointer',
  '&:hover': {
      textDecoration: 'underline',
  },
}));


// A functional component that accepts data as props
const DataTable = ({ data }) => {
  const navigate = useNavigate();
    if (!data || data.length === 0) return <p>No data available</p>;
   
    // Get the headers from the keys of the first object
    const headers = Object.keys(data[0]);

    const goToHome = () => {
     navigate('/dashboard');
 };
    return (
      <TableContainer  component={Paper} sx={{ maxHeight: 640}}> 
        <Table stickyHeader aria-label="scrollable table">
            <TableHead>
                <TableRow>
             
                    {headers.map((header) => (
                        <StyledTableCell  key={header}>{header}</StyledTableCell>
                    ))}

                </TableRow>
            </TableHead>
            <TableBody>
                {data.map((row, index) => (
                    <StyledTableRow key={index}>
                     {headers.map((header) => (
                                    <StyledTableCell key={header}>
                                        {header === 'TicketNumberPK' ? ( // Check if the column is 'id'
                                            <StyledLink to={`/ticketdetails/${row[header]}`}>
                                                {row[header]}
                                            </StyledLink>
                                        ) : (
                                            row[header]
                                        )}
                                    </StyledTableCell>
                                ))}
                    </StyledTableRow>
                ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
};

export default DataTable;
