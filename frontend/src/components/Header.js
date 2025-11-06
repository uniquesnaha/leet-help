import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

const Header = ({ onSidebarToggle }) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: '#1e1e1e',
        boxShadow: 'none',
        borderBottom: '1px solid #333',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onSidebarToggle}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Codex
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        {/* Add user profile dropdown here later */}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
