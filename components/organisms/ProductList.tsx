import React from 'react';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import ProductCard from '../molecules/ProductCard';
import PaginationControls from '../molecules/PaginationControls';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface ProductListProps {
  products: Product[];
  loading: boolean;
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

export const generateMetadata = () => ({
  title: 'Ürünler | Store App',
  description: 'En popüler ürünleri filtreleyerek ve sıralayarak keşfedin.',
});

export default function ProductList({
  products,
  loading,
  currentPage,
  pageCount,
  onPageChange,
}: ProductListProps) {
  if (loading) return <Typography>Yükleniyor...</Typography>;

  return (
    <>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={3}>
            <ProductCard {...product} />
          </Grid>
        ))}
      </Grid>

      <PaginationControls
        pageCount={pageCount}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </>
  );
}
