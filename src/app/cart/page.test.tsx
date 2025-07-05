/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import CartPage from './page';
import * as CartContext from '../../../contexts/CartContext';

const removeFromCartMock = jest.fn();
const clearCartMock = jest.fn();

describe('CartPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders empty cart message when cart is empty', () => {
    jest.spyOn(CartContext, 'useCart').mockReturnValue({
      cartItems: [],
      addToCart: jest.fn(),
      removeFromCart: removeFromCartMock,
      clearCart: clearCartMock,
      totalItems: 0,
    });

    render(<CartPage />);

    expect(screen.getByText(/Sepetiniz boş/i)).toBeInTheDocument();
  });

  it('renders cart items and total price', () => {
    jest.spyOn(CartContext, 'useCart').mockReturnValue({
      cartItems: [
        { id: 1, title: 'Product 1', price: 10, image: 'img1.jpg', quantity: 2 },
        { id: 2, title: 'Product 2', price: 20, image: 'img2.jpg', quantity: 1 },
      ],
      addToCart: jest.fn(),
      removeFromCart: removeFromCartMock,
      clearCart: clearCartMock,
      totalItems: 3,
    });

    render(<CartPage />);

    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.getByText(/Toplam: \$40.00/)).toBeInTheDocument();
  });

  it('calls removeFromCart when remove button clicked', () => {
    jest.spyOn(CartContext, 'useCart').mockReturnValue({
      cartItems: [
        { id: 1, title: 'Product 1', price: 10, image: 'img1.jpg', quantity: 1 },
      ],
      addToCart: jest.fn(),
      removeFromCart: removeFromCartMock,
      clearCart: clearCartMock,
      totalItems: 1,
    });

    render(<CartPage />);

    const removeBtn = screen.getByLabelText('remove');
    fireEvent.click(removeBtn);

    expect(removeFromCartMock).toHaveBeenCalledWith(1);
  });

  it('calls clearCart when clear cart button clicked', () => {
    jest.spyOn(CartContext, 'useCart').mockReturnValue({
      cartItems: [
        { id: 1, title: 'Product 1', price: 10, image: 'img1.jpg', quantity: 1 },
      ],
      addToCart: jest.fn(),
      removeFromCart: removeFromCartMock,
      clearCart: clearCartMock,
      totalItems: 1,
    });

    render(<CartPage />);

    const clearBtn = screen.getByText(/Sepeti Temizle/i);
    fireEvent.click(clearBtn);

    expect(clearCartMock).toHaveBeenCalled();
  });
});
