import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, TextField, FormControl, InputLabel, Select, MenuItem,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton,
  Collapse, TablePagination
} from '@mui/material';
import { KeyboardArrowDown as KeyboardArrowDownIcon, KeyboardArrowUp as KeyboardArrowUpIcon } from '@mui/icons-material';
import axios from 'axios';
import { format } from 'date-fns';

const ProblemRow = ({ problem }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">{problem.title}</TableCell>
        <TableCell>{problem.difficulty}</TableCell>
        <TableCell>{problem.tags.join(', ')}</TableCell>
        <TableCell align="right">{problem.entries.length}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Attempts
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Time Complexity</TableCell>
                    <TableCell>Space Complexity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {problem.entries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>{format(new Date(entry.created_at), 'PPpp')}</TableCell>
                      <TableCell>{entry.time_complexity}</TableCell>
                      <TableCell>{entry.space_complexity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const CodexVaultPage = () => {
  const [problems, setProblems] = useState([]);
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [tags, setTags] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/entries/', {
          headers: { 'Authorization': `Bearer ${token}` },
          params: { search, difficulty, tags },
        });
        setProblems(response.data);
      } catch (error) {
        console.error('Failed to fetch problems:', error);
      }
    };
    fetchProblems();
  }, [search, difficulty, tags]);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedProblems = problems.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Container maxWidth="lg">
      <Typography component="h1" variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
        My Codex
      </Typography>
      {/* ... Filter Controls ... */}
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Title</TableCell>
              <TableCell>Difficulty</TableCell>
              <TableCell>Tags</TableCell>
              <TableCell align="right">Attempts</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedProblems.map((problem) => (
              <ProblemRow key={problem.id} problem={problem} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={problems.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
};

export default CodexVaultPage;
