import React from 'react';
import { notFound } from 'next/navigation';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Image from 'next/image';
import AddToCartButton from '../../../../components/molecules/AddToCartButton';

export const dynamic = 'force-dynamic';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface Props {
  params: { id: string };
}

async function getProduct(id: string): Promise<Product | null> {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata(props: Props) {
  const params = await (props.params as any);
  const product = await getProduct(params.id);
  if (!product) {
    return {
      title: 'Ürün bulunamadı',
      description: 'İstenen ürün bulunamadı.',
    };
  }
  return {
    title: product.title,
    description: product.description,
  };
}

export default async function ProductPage(props: Props) {
  const params = props.params;
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
        <Image
          src={product?.image}
          alt={product?.title}
          width={400}
          height={400}
          style={{ objectFit: 'contain', maxWidth: '100%' }}
          priority={false}
        />
        <Box sx={{ flex: 1 }}>
          <Typography variant="h5" gutterBottom>
            {product?.title}
          </Typography>
          <Rating
            name="read-only"
            value={product?.rating?.rate}
            precision={0.1}
            readOnly
            size="medium"
          />
          <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
            ${product?.price.toFixed(2)}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            {product?.description}
          </Typography>
          <AddToCartButton product={product} />
        </Box>
      </Box>
    </Container>
  );
}
