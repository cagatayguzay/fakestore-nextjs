import React from 'react';
import IconButton from '@mui/material/IconButton';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightlightIcon from '@mui/icons-material/Nightlight';

interface ThemeToggleButtonProps {
  mode: 'light' | 'dark';
  toggleTheme: () => void;
}

export default function ThemeToggleButton({ mode, toggleTheme }: ThemeToggleButtonProps) {
  return (
    <IconButton color="inherit" onClick={toggleTheme} aria-label="Toggle light/dark theme">
      {mode === 'light' ? <NightlightIcon /> : <LightModeIcon />}
    </IconButton>
  );
}
