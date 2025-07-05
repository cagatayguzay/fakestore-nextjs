'use client';

import React from 'react';
import Button from '@mui/material/Button';
import { useCart } from '../../contexts/CartContext';

interface AddToCartButtonProps {
  product: {
    id: number;
    title: string;
    price: number;
    image: string;
  };
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart();

  return (
    <Button
      variant="contained"
      sx={{ mt: 3 }}
      onClick={() =>
        addToCart({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
        })
      }
    >
      Sepete Ekle
    </Button>
  );
}
