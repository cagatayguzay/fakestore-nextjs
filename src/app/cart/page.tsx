'use client';

import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from '../../../contexts/CartContext';

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <Container sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h6">Sepetiniz boş.</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Sepetim
      </Typography>

      {cartItems.map((item) => (
        <Box
          key={item.id}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 2,
            borderBottom: '1px solid #ccc',
            pb: 1,
            gap: 1,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              width: { xs: '100%', sm: 'auto' },
              mb: { xs: 1, sm: 0 },
            }}
          >
            <Box
              component="img"
              src={item.image}
              alt={item.title}
              sx={{
                width: { xs: 60, sm: 80 },
                height: { xs: 60, sm: 80 },
                objectFit: 'contain',
              }}
            />
            <Typography sx={{ maxWidth: { xs: '70vw', sm: 300 } }} noWrap>
              {item.title}
            </Typography>
          </Box>

          <Typography sx={{ minWidth: { xs: 'auto', sm: 50 }, textAlign: 'center' }}>
            {item.quantity} × ${item.price.toFixed(2)}
          </Typography>

          <Typography sx={{ minWidth: { xs: 'auto', sm: 100 }, textAlign: 'center' }}>
            ${(item.price * item.quantity).toFixed(2)}
          </Typography>

          <IconButton
            color="error"
            aria-label="remove"
            onClick={() => removeFromCart(item.id)}
            sx={{ alignSelf: { xs: 'flex-start', sm: 'auto' } }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}

      <Box
        sx={{
          mt: 3,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: 2,
        }}
      >
        <Typography variant="h6">Toplam: ${totalPrice.toFixed(2)}</Typography>
        <Button variant="outlined" color="error" onClick={clearCart}>
          Sepeti Temizle
        </Button>
      </Box>
    </Container>
  );
}
