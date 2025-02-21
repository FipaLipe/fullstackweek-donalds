'use client';

import { Prisma } from '@prisma/client';
import { ChefHat, ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import { useContext, useState } from 'react';

import { Button } from '@/components/ui/button';
import { priceFormat } from '@/lib/utils';

import CartSheet from '../../components/cart-sheet';
import { CartContext } from '../../context/cart';

interface ProductContentProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
          avatarImageUrl: true;
        };
      };
    };
  }>;
}

const ProductContent = ({ product }: ProductContentProps) => {
  const { toggleCart } = useContext(CartContext);

  const [quantity, setQuantity] = useState<number>(1);
  const restaurant = product.restaurant;

  const handleLeftClick = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleRightClick = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddProduct = () => {
    toggleCart();
  };

  return (
    <div className="relative top-[-2rem] z-20 flex w-full flex-auto flex-col rounded-t-[40px] bg-background p-6">
      <div className="flex-auto">
        {/* CABEÇALHO */}
        <div className="flex flex-col gap-1">
          {/* RESTAURANTE */}
          <div className="flex flex-row items-center gap-2">
            <div className="relative h-6 w-6 overflow-hidden rounded-full">
              <Image
                alt={restaurant.name}
                src={restaurant.avatarImageUrl}
                fill
                sizes="{max-width: 16px}"
                className="object-contain"
              />
            </div>
            <h3 className="opacity-60">{restaurant.name}</h3>
          </div>
          <h1 className="text-lg font-semibold">{product.name}</h1>
        </div>

        {/* PREÇO E QTD */}
        <div className="mt-4 flex flex-row items-center justify-between">
          <p className="text-2xl font-semibold">{priceFormat(product.price)}</p>
          <div className="flex flex-row items-center">
            <Button
              className="h-8 w-8 rounded-xl transition-transform duration-200 ease-in-out hover:scale-110"
              variant="outline"
              onClick={() => handleLeftClick()}
            >
              <ChevronLeft size={200} />
            </Button>
            <p className="w-8 text-center text-xl">{quantity}</p>
            <Button
              className="h-8 w-8 rounded-xl transition-transform duration-200 ease-in-out hover:scale-110"
              variant="destructive"
              onClick={() => handleRightClick()}
            >
              <ChevronRight size={20} />
            </Button>
          </div>
        </div>

        {/* SOBRE */}
        <div className="mt-8 flex flex-col gap-2">
          <h2 className="text-xl font-semibold">Sobre</h2>
          <p className="text-md text-left opacity-60">{product.description}</p>
        </div>

        {/* INGREDIENTES */}
        <div className="mt-5 flex flex-col gap-2">
          <div className="flex flex-row gap-2">
            <ChefHat />
            <h2 className="text-xl font-semibold">Ingredientes</h2>
          </div>
          <ul className="list-disc pl-6">
            {product.ingredients.map((ingredient, i) => (
              <li className="text-md text-left opacity-60" key={i}>
                {ingredient}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Button
        className="mt-5 flex w-full flex-row gap-3 rounded-full p-6 text-xl font-semibold"
        onClick={() => handleAddProduct()}
      >
        <ShoppingBag />
        Adicionar à Sacola
      </Button>

      <CartSheet />
    </div>
  );
};

export default ProductContent;
