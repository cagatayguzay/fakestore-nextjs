/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import RootLayout from './layout';
import '@testing-library/jest-dom';

jest.mock('../../components/organisms/Header', () => (props: any) => {
  return (
    <div data-testid="header">
      <button onClick={props.toggleTheme} data-testid="toggle-button">
        Toggle Theme
      </button>
      <span data-testid="mode">{props.mode}</span>
    </div>
  );
});

jest.mock('../../components/organisms/Footer', () => () => {
  return <div data-testid="footer">Footer</div>;
});

jest.mock('../../contexts/CartContext', () => {
  const React = require('react');
  return {
    CartProvider: ({ children }: any) => <div data-testid="cart-provider">{children}</div>,
  };
});

// localStorage mock
beforeEach(() => {
  const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
      getItem(key: string) {
        return store[key] || null;
      },
      setItem(key: string, value: string) {
        store[key] = value.toString();
      },
      clear() {
        store = {};
      },
      removeItem(key: string) {
        delete store[key];
      },
    };
  })();
  Object.defineProperty(window, 'localStorage', { value: localStorageMock });
});

describe('RootLayout', () => {
  it('renders header, footer, and children', () => {
    render(
      <RootLayout>
        <div data-testid="child">Child content</div>
      </RootLayout>
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByTestId('cart-provider')).toBeInTheDocument();
  });

  it('uses light mode as default', () => {
    render(<RootLayout>{null}</RootLayout>);
    expect(screen.getByTestId('mode').textContent).toBe('light');
  });

  it('reads mode from localStorage', () => {
    window.localStorage.setItem('themeMode', 'dark');

    // useEffect async olduğu için act içinde render et
    act(() => {
      render(<RootLayout>{null}</RootLayout>);
    });

    expect(screen.getByTestId('mode').textContent).toBe('dark');
  });

  it('toggles theme mode when button clicked', () => {
    render(<RootLayout>{null}</RootLayout>);

    const toggleButton = screen.getByTestId('toggle-button');
    const modeDisplay = screen.getByTestId('mode');

    expect(modeDisplay.textContent).toBe('light');

    fireEvent.click(toggleButton);
    expect(modeDisplay.textContent).toBe('dark');

    fireEvent.click(toggleButton);
    expect(modeDisplay.textContent).toBe('light');
  });

  it('updates localStorage when mode changes', () => {
    render(<RootLayout>{null}</RootLayout>);

    const toggleButton = screen.getByTestId('toggle-button');

    fireEvent.click(toggleButton);
    expect(window.localStorage.getItem('themeMode')).toBe('dark');

    fireEvent.click(toggleButton);
    expect(window.localStorage.getItem('themeMode')).toBe('light');
  });
});
