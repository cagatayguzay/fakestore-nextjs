'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Container from '@mui/material/Container';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FilterListIcon from '@mui/icons-material/FilterList';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import FilterForm from '../../components/molecules/FilterForm';
import ProductList from '../../components/organisms/ProductList';

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

const PRODUCTS_PER_PAGE = 10;

async function getProducts(): Promise<Product[]> {
  const res = await fetch(`https://fakestoreapi.com/products`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [sort, setSort] = useState(searchParams.get('sort') || '');
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [page, setPage] = useState(Number(searchParams.get('page') || '1'));

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    setCategory(searchParams.get('category') || '');
    setMinPrice(searchParams.get('minPrice') || '');
    setMaxPrice(searchParams.get('maxPrice') || '');
    setSort(searchParams.get('sort') || '');
    setSearch(searchParams.get('search') || '');
    setPage(Number(searchParams.get('page') || '1'));
  }, [searchParams]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const data = await getProducts();
        setProducts(data);
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Filtreleme fonksiyonu
  const applyFilters = () => {
    let data = [...products];

    if (category) data = data.filter((p) => p.category === category);

    if (minPrice) {
      const min = parseFloat(minPrice);
      if (!isNaN(min)) data = data.filter((p) => p.price >= min);
    }

    if (maxPrice) {
      const max = parseFloat(maxPrice);
      if (!isNaN(max)) data = data.filter((p) => p.price <= max);
    }

    if (search) {
      const term = search.toLowerCase();
      data = data.filter((p) => p.title.toLowerCase().includes(term));
    }

    if (sort === 'asc') data.sort((a, b) => a.price - b.price);
    else if (sort === 'desc') data.sort((a, b) => b.price - a.price);

    setFilteredProducts(data);
    setPage(1);

    // URL güncelle
    const params: Record<string, string> = {};
    if (category) params.category = category;
    if (minPrice) params.minPrice = minPrice;
    if (maxPrice) params.maxPrice = maxPrice;
    if (search) params.search = search;
    if (sort) params.sort = sort;
    params.page = '1';

    router.replace(`/?${new URLSearchParams(params).toString()}`);
  };

  // category veya sort değişince otomatik filtre uygula
  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, sort]);

  const onPageChange = (newPage: number) => {
    setPage(newPage);

    const params: Record<string, string> = {};
    if (category) params.category = category;
    if (minPrice) params.minPrice = minPrice;
    if (maxPrice) params.maxPrice = maxPrice;
    if (search) params.search = search;
    if (sort) params.sort = sort;
    params.page = newPage.toString();

    router.replace(`/?${new URLSearchParams(params).toString()}`);
  };

  const clearFilters = () => {
    setCategory('');
    setMinPrice('');
    setMaxPrice('');
    setSort('');
    setSearch('');
    setFilteredProducts(products);
    setPage(1);
    router.replace('/');
  };

  useEffect(() => {
    if (products.length === 0) return;
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  const pageCount = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const pagedProducts = filteredProducts.slice(
    (page - 1) * PRODUCTS_PER_PAGE,
    page * PRODUCTS_PER_PAGE
  );

  const isFilterActive =
    category !== '' ||
    minPrice !== '' ||
    maxPrice !== '' ||
    sort !== '' ||
    search !== '';

  return (
    <Container sx={{ mt: 4 }}>
      {isMobile ? (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <IconButton color="primary" onClick={() => setFilterOpen(true)}>
              <FilterListIcon />
            </IconButton>
          </Box>
          <Drawer
            anchor="left"
            open={filterOpen}
            onClose={() => setFilterOpen(false)}
            ModalProps={{ keepMounted: true }}
          >
            <Box sx={{ width: 300 }}>
              <Typography variant="h6" sx={{ p: 2 }}>
                Filtreler
              </Typography>
              <FilterForm
                category={category}
                onCategoryChange={(e) => setCategory(e.target.value)}
                minPrice={minPrice}
                onMinPriceChange={setMinPrice}
                maxPrice={maxPrice}
                onMaxPriceChange={setMaxPrice}
                sort={sort}
                onSortChange={(e) => setSort(e.target.value)}
                search={search}
                onSearchChange={setSearch}
                onSubmit={(e) => {
                  e.preventDefault();
                  applyFilters();
                  setFilterOpen(false);
                }}
                onClear={clearFilters}
                isFilterActive={isFilterActive}
                isMobile={isMobile}
              />
            </Box>
          </Drawer>
        </>
      ) : (
        <FilterForm
          category={category}
          onCategoryChange={(e) => setCategory(e.target.value)}
          minPrice={minPrice}
          onMinPriceChange={setMinPrice}
          maxPrice={maxPrice}
          onMaxPriceChange={setMaxPrice}
          sort={sort}
          onSortChange={(e) => setSort(e.target.value)}
          search={search}
          onSearchChange={setSearch}
          onSubmit={(e) => {
            e.preventDefault();
            applyFilters();
          }}
          onClear={clearFilters}
          isFilterActive={isFilterActive}
          isMobile={isMobile}
        />
      )}

      <ProductList
        products={pagedProducts}
        loading={loading}
        currentPage={page}
        pageCount={pageCount}
        onPageChange={onPageChange}
      />
    </Container>
  );
}
