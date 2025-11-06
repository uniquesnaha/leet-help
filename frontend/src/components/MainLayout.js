import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import Sidebar from './Sidebar';

const MainLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - 240px)` }, // 240px is the sidebar width
          backgroundColor: '#000000',
          minHeight: '100vh',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
