import React from 'react';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

export default function Logo() {
  return (
    <Typography variant="h6">
      <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>
        Store App
      </Link>
    </Typography>
  );
}
