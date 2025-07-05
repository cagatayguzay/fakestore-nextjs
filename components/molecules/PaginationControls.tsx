'use client';

import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export interface PaginationControlsProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (newPage: number) => void;
}

export default function PaginationControls({ pageCount, currentPage, onPageChange }: PaginationControlsProps) {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    onPageChange(value);
  };

  return (
    <Stack spacing={2} alignItems="center" sx={{ mt: 4 }}>
      <Pagination count={pageCount} page={currentPage} onChange={handleChange} color="primary" />
    </Stack>
  );
}
