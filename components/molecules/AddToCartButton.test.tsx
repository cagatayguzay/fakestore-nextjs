// components/molecules/AddToCartButton.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddToCartButton from './AddToCartButton';
import '@testing-library/jest-dom';

// useCart context'ini mock'layalım
const mockAddToCart = jest.fn();

jest.mock('../../contexts/CartContext', () => ({
  useCart: () => ({
    addToCart: mockAddToCart,
  }),
}));

describe('AddToCartButton', () => {
  const product = {
    id: 1,
    title: 'Test Product',
    price: 99.99,
    image: 'https://example.com/product.jpg',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the button with correct text', () => {
    render(<AddToCartButton product={product} />);
    const button = screen.getByRole('button', { name: /Sepete Ekle/i });
    expect(button).toBeInTheDocument();
  });

  it('calls addToCart with correct product data when clicked', () => {
    render(<AddToCartButton product={product} />);
    const button = screen.getByRole('button', { name: /Sepete Ekle/i });
    fireEvent.click(button);

    expect(mockAddToCart).toHaveBeenCalledTimes(1);
    expect(mockAddToCart).toHaveBeenCalledWith({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    });
  });
});
