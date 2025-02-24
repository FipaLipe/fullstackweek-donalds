'use client';

import { Product } from '@prisma/client';
import { createContext, ReactNode, useState } from 'react';

export interface CartProduct
  extends Pick<Product, 'id' | 'name' | 'price' | 'imageUrl'> {
  quantity: number;
}

export interface ICartContext {
  isOpen: boolean;
  products: CartProduct[];
  toggleCart: () => void;
  addProduct: (product: CartProduct) => void;
}

export const CartContext = createContext<ICartContext>({
  isOpen: false,
  products: [],
  toggleCart: () => {},
  addProduct: () => {},
});

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [products, setProducts] = useState<CartProduct[]>([]);

  const addProduct = (product: CartProduct) => {
    // Se não achou adiciona o produto
    if (!products.find((p) => p.id === product.id)) {
      return setProducts((prevProducts) => [...prevProducts, product]);
    }

    // Se achou, altera a quantidade
    return setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === product.id
          ? { ...p, quantity: p.quantity + product.quantity }
          : p
      )
    );
  };

  const toggleCart = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <CartContext.Provider
      value={{
        isOpen,
        products,
        toggleCart,
        addProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
