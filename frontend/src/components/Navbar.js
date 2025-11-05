import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

function Navbar({ toggleTheme, theme }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            LeetCode Tracker
          </Link>
        </Typography>
        <Button color="inherit" component={Link} to="/add-entry">
          Add Entry
        </Button>
        <Button color="inherit" component={Link} to="/vault">
          Codex Vault
        </Button>
        <Button color="inherit" component={Link} to="/login">
          Login
        </Button>
        <Button color="inherit" component={Link} to="/register">
          Register
        </Button>
        <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
          {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
