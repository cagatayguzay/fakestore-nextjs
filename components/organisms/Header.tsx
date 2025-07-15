'use client';

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useCart } from '../../contexts/CartContext';
import Logo from '../atoms/Logo';
import HeaderActions from '../molecules/HeaderActions';

interface HeaderProps {
  toggleTheme: () => void;
  mode: 'light' | 'dark';
}

export default function Header({ toggleTheme, mode }: HeaderProps) {
  const { totalItems } = useCart();

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Logo />
        <HeaderActions mode={mode} toggleTheme={toggleTheme} totalItems={totalItems} />
      </Toolbar>
    </AppBar>
  );
}
