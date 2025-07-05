/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Home from './page';
import '@testing-library/jest-dom';

// Mock next/navigation
const mockUseRouterReplace = jest.fn();
const mockUseSearchParams = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: mockUseRouterReplace,
  }),
  useSearchParams: () => mockUseSearchParams(),
}));

// Mock FilterForm bileşeni
jest.mock('../../components/molecules/FilterForm', () => (props: any) => (
  <div data-testid="filter-form">
    <button onClick={props.onSubmit}>Apply Filters</button>
    <button onClick={props.onClear}>Clear Filters</button>
    <select
      data-testid="category-select"
      onChange={props.onCategoryChange}
      value={props.category}
    >
      <option value="">All</option>
      <option value="men's clothing">Men's Clothing</option>
      <option value="jewelery">Jewelery</option>
    </select>
  </div>
));

// Mock ProductList bileşeni
jest.mock('../../components/organisms/ProductList', () => (props: any) => (
  <div data-testid="product-list">
    {props.loading
      ? 'Loading...'
      : props.products.length > 0
      ? 'Products shown'
      : 'No products'}
    <button
      data-testid="next-page"
      onClick={() => props.onPageChange(props.currentPage + 1)}
    >
      Next Page
    </button>
  </div>
));

// Global fetch mock
global.fetch = jest.fn();

describe('Home Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches and displays products', async () => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams(''));

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          id: 1,
          title: 'Product 1',
          price: 10,
          image: '',
          category: "men's clothing",
          rating: { rate: 4, count: 5 },
        },
        {
          id: 2,
          title: 'Product 2',
          price: 20,
          image: '',
          category: 'jewelery',
          rating: { rate: 5, count: 10 },
        },
      ],
    });

    await act(async () => {
      render(<Home />);
    });

    expect(screen.getByTestId('filter-form')).toBeInTheDocument();
    expect(screen.getByTestId('product-list')).toBeInTheDocument();

    // Loading metninin kaybolmasını bekle
    await waitFor(() => {
      expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
    });

    expect(screen.getByText('Products shown')).toBeInTheDocument();
  });

  it('calls applyFilters when Apply Filters button clicked', async () => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams(''));

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    await act(async () => {
      render(<Home />);
    });

    fireEvent.click(screen.getByText('Apply Filters'));

    expect(mockUseRouterReplace).toHaveBeenCalled();
  });

  it('calls clearFilters when Clear Filters button clicked', async () => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams(''));

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    await act(async () => {
      render(<Home />);
    });

    fireEvent.click(screen.getByText('Clear Filters'));

    expect(mockUseRouterReplace).toHaveBeenCalledWith('/');
  });

  it('changes category and triggers filter', async () => {
    // Burada başlangıçta category=men's clothing ile başlatıyoruz
    mockUseSearchParams.mockReturnValue(
      new URLSearchParams("category=men's%20clothing&sort=asc&page=2")
    );

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    await act(async () => {
      render(<Home />);
    });

    // Kategori select input değerini kontrol et
    await waitFor(() => {
      expect(screen.getByTestId('category-select')).toHaveValue("men's clothing");
    });

    // Ayrıca router.replace çağrısı yapılmasını bekleyebiliriz çünkü filtre otomatik uygulanıyor
    await waitFor(() => {
      expect(mockUseRouterReplace).toHaveBeenCalled();
    });
  });

  it('changes page when clicking next page button', async () => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams(''));

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          id: 1,
          title: 'Product 1',
          price: 10,
          image: '',
          category: "men's clothing",
          rating: { rate: 4, count: 5 },
        },
      ],
    });

    await act(async () => {
      render(<Home />);
    });

    fireEvent.click(screen.getByTestId('next-page'));

    expect(mockUseRouterReplace).toHaveBeenCalled();
  });
});
