import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  MenuItem,
  TextField,
  Button,
} from '@mui/material';

interface FilterFormProps {
  category: string;
  onCategoryChange: (e: SelectChangeEvent) => void;
  minPrice: string;
  onMinPriceChange: (value: string) => void;
  maxPrice: string;
  onMaxPriceChange: (value: string) => void;
  sort: string;
  onSortChange: (e: SelectChangeEvent) => void;
  search: string;
  onSearchChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClear: () => void;
  isFilterActive: boolean;
  isMobile: boolean;
}

export default function FilterForm({
  category,
  onCategoryChange,
  minPrice,
  onMinPriceChange,
  maxPrice,
  onMaxPriceChange,
  sort,
  onSortChange,
  search,
  onSearchChange,
  onSubmit,
  onClear,
  isFilterActive,
  isMobile,
}: FilterFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          mb: 3,
          alignItems: 'center',
          flexDirection: isMobile ? 'column' : 'row',
          p: isMobile ? 2 : 0,
        }}
      >
        <FormControl sx={{ minWidth: 140 }}>
          <InputLabel>Kategori</InputLabel>
          <Select value={category} label="Kategori" onChange={onCategoryChange}>
            <MenuItem value="">Tümü</MenuItem>
            <MenuItem value="men's clothing">Erkek Giyim</MenuItem>
            <MenuItem value="women's clothing">Kadın Giyim</MenuItem>
            <MenuItem value="jewelery">Takı</MenuItem>
            <MenuItem value="electronics">Elektronik</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Min Fiyat"
          type="number"
          value={minPrice}
          onChange={(e) => onMinPriceChange(e.target.value)}
          sx={{ width: 100 }}
          inputProps={{ min: 0, step: 0.01 }}
        />

        <TextField
          label="Max Fiyat"
          type="number"
          value={maxPrice}
          onChange={(e) => onMaxPriceChange(e.target.value)}
          sx={{ width: 100 }}
          inputProps={{ min: 0, step: 0.01 }}
        />

        <FormControl sx={{ minWidth: 140 }}>
          <InputLabel>Sıralama</InputLabel>
          <Select value={sort} label="Sıralama" onChange={onSortChange}>
            <MenuItem value="">Seçiniz</MenuItem>
            <MenuItem value="asc">Fiyata Göre Artan</MenuItem>
            <MenuItem value="desc">Fiyata Göre Azalan</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Ara"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          sx={{ minWidth: 200 }}
        />

        <Button variant="contained" type="submit">
          Filtrele
        </Button>

        {isFilterActive && (
          <Button variant="outlined" color="secondary" onClick={onClear}>
            Filtreleri Temizle
          </Button>
        )}
      </Box>
    </form>
  );
}
