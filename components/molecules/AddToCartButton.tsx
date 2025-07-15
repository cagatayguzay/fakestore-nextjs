'use client';

import React from 'react';
import { useCart } from '../../contexts/CartContext';
import Button from '../atoms/Button';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart();

  const handleClick = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    });
  };

  return (
    <Button variant="contained" sx={{ mt: 3 }} onClick={handleClick}>
      Sepete Ekle
    </Button>
  );
}
