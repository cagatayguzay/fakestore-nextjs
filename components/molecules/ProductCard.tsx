'use client';

import React from 'react';
import Link from 'next/link';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import { useCart } from '../../contexts/CartContext';

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export default function ProductCard({
  id,
  title,
  price,
  image,
  rating,
}: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <Card sx={{ maxWidth: '100%' }}>
      <Link href={`/product/${id}`} passHref>
        <CardMedia
          component="img"
          height="200"
          image={image}
          alt={title}
          sx={{ objectFit: 'contain', p: 1, cursor: 'pointer' }}
        />
      </Link>

      <CardContent>
        <Typography variant="subtitle1" noWrap title={title}>
          {title}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: 1,
          }}
        >
          <Rating name="read-only" value={rating.rate} precision={0.1} readOnly size="small" />
          <Typography variant="subtitle2" color="text.secondary">
            (${price.toFixed(2)})
          </Typography>
        </Box>

        <Button
          variant="contained"
          size="small"
          sx={{ mt: 1 }}
          onClick={() => addToCart({ id, title, price, image })}
        >
          Sepete Ekle
        </Button>
      </CardContent>
    </Card>
  );
}
