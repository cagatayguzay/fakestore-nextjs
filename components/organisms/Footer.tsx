'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{ py: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white', mt: 4 }}
    >
      <Typography variant="body2">© 2025 Store App. All rights reserved.</Typography>
    </Box>
  );
}
