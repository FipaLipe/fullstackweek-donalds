"use client";

import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

export interface CartProduct
  extends Pick<Product, "id" | "name" | "price" | "imageUrl"> {
  quantity: number;
}

export interface ICartContext {
  isOpen: boolean;
  products: CartProduct[];
  toggleCart: () => void;
  addProduct: (product: CartProduct) => void;
  decreaseProductQuantity: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
  isOpen: false,
  products: [],
  toggleCart: () => {},
  addProduct: () => {},
  decreaseProductQuantity: () => {},
  increaseProductQuantity: () => {},
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

  const decreaseProductQuantity = (productId: string) => {
    return setProducts((prevProducts) =>
      prevProducts.map((prevProduct) => {
        if (prevProduct.id === productId) {
          return {
            ...prevProduct,
            quantity: Math.max(1, prevProduct.quantity - 1),
          };
        }
        return prevProduct;
      })
    );
  };

  const increaseProductQuantity = (productId: string) => {
    return setProducts((prevProducts) =>
      prevProducts.map((prevProduct) => {
        if (prevProduct.id === productId) {
          return {
            ...prevProduct,
            quantity: prevProduct.quantity + 1,
          };
        }
        return prevProduct;
      })
    );
  };

  return (
    <CartContext.Provider
      value={{
        isOpen,
        products,
        toggleCart,
        addProduct,
        decreaseProductQuantity,
        increaseProductQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
