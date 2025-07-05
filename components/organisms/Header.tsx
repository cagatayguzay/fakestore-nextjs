'use client';

import React from 'react';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import { useCart } from '../../contexts/CartContext';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightlightIcon from '@mui/icons-material/Nightlight';

interface HeaderProps {
  toggleTheme: () => void;
  mode: 'light' | 'dark';
}

export default function Header({ toggleTheme, mode }: HeaderProps) {
  const { totalItems } = useCart();

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">
          <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            Store App
          </Link>
        </Typography>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Tema toggle butonu */}
          <IconButton color="inherit" onClick={toggleTheme} aria-label="Toggle light/dark theme">
            {mode === 'light' ? <NightlightIcon /> : <LightModeIcon />}
          </IconButton>

          {/* Sepet ikonu */}
          <Link href="/cart" passHref>
            <IconButton color="inherit" aria-label="Go to cart">
              <Badge badgeContent={totalItems} color="secondary">
                <ShoppingCartIcon sx={{ color: '#fff' }} />
              </Badge>
            </IconButton>
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
}
