import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ProductPage from './page';
import '@testing-library/jest-dom';
import { CartProvider } from '../../../../contexts/CartContext';  // path'ini kendine göre ayarla

jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
}));

global.fetch = jest.fn();

describe('ProductPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders product details when product is found', async () => {
    const mockProduct = {
      id: 1,
      title: 'Test Product',
      price: 99.99,
      description: 'This is a test product',
      category: 'electronics',
      image: '/test.jpg',
      rating: { rate: 4.5, count: 10 },
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProduct,
    });

    const element = await ProductPage({ params: { id: '1' } });

    render(<CartProvider>{element}</CartProvider>);

    await waitFor(() => {
      expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    });

    expect(screen.getByText(`$${mockProduct.price.toFixed(2)}`)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
  });

  it('calls notFound if product not found', async () => {
    const { notFound } = require('next/navigation');

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({}),
    });

    await ProductPage({ params: { id: '999' } });

    expect(notFound).toHaveBeenCalled();
  });
});
