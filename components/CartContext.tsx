"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export type CartItem = {
  name: string;
  price: number;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (name: string, price: number) => void;
  decreaseCartItem: (name: string) => void;
  removeCartItem: (name: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  checkoutOpen: boolean;
  setCheckoutOpen: (open: boolean) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("cafe25-cart");

    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch {
        localStorage.removeItem("cafe25-cart");
      }
    }

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("cafe25-cart", JSON.stringify(cart));
    }
  }, [cart, loaded]);

  const addToCart = (name: string, price: number) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) => item.name === name
      );

      if (existingItem) {
        return currentCart.map((item) =>
          item.name === name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { name, price, quantity: 1 }];
    });
  };

  const decreaseCartItem = (name: string) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.name === name
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeCartItem = (name: string) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.name !== name)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        decreaseCartItem,
        removeCartItem,
        clearCart,
        cartTotal,
        cartCount,
        cartOpen,
        setCartOpen,
        checkoutOpen,
        setCheckoutOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
