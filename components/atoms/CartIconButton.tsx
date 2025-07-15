import React from 'react';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Link from 'next/link';

interface CartIconButtonProps {
  totalItems: number;
}

export default function CartIconButton({ totalItems }: CartIconButtonProps) {
  return (
    <Link href="/cart" passHref>
      <IconButton color="inherit" aria-label="Go to cart">
        <Badge badgeContent={totalItems} color="secondary">
          <ShoppingCartIcon sx={{ color: '#fff' }} />
        </Badge>
      </IconButton>
    </Link>
  );
}
