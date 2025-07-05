'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from '../../components/organisms/Header';
import Footer from '../../components/organisms/Footer';
import { CartProvider } from '../../contexts/CartContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  // Sayfa yüklendiğinde localStorage’dan modu oku
  useEffect(() => {
    const savedMode = localStorage.getItem('themeMode') as 'light' | 'dark' | null;
    if (savedMode) {
      setMode(savedMode);
    }
  }, []);

  // Mod değişince localStorage’a kaydet
  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  // Tema objesi
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#1976d2',
          },
        },
      }),
    [mode]
  );

  // Tema toggle fonksiyonu
  const toggleTheme = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <html lang="en">
      <head />
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <CartProvider>
            <Header toggleTheme={toggleTheme} mode={mode} />
            <main>{children}</main>
            <Footer />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
