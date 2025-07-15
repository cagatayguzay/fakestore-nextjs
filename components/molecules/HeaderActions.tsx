import React from 'react';
import Box from '@mui/material/Box';
import ThemeToggleButton from '../atoms/ThemeToggleButton';
import CartIconButton from '../atoms/CartIconButton';

interface HeaderActionsProps {
  mode: 'light' | 'dark';
  toggleTheme: () => void;
  totalItems: number;
}

export default function HeaderActions({ mode, toggleTheme, totalItems }: HeaderActionsProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <ThemeToggleButton mode={mode} toggleTheme={toggleTheme} />
      <CartIconButton totalItems={totalItems} />
    </Box>
  );
}
