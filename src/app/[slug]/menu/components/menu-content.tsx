'use client';

import { Prisma } from '@prisma/client';
import { Clock } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

import Products from './products';

interface MenuContentProps {
  restaurant: Prisma.RestaurantGetPayload<{
    include: {
      menuCategories: {
        include: {
          products: true;
        };
      };
    };
  }>;
}

type MenuCategoryProducts = Prisma.MenuCategoryGetPayload<{
  include: { products: true };
}>;

const MenuContent = ({ restaurant }: MenuContentProps) => {
  const [selectedCategory, setSelectedCategory] =
    useState<MenuCategoryProducts>(restaurant.menuCategories[0]);

  const handleMenuCategoryClick = (category: MenuCategoryProducts) => {
    setSelectedCategory(category);
  };

  const getMenuCategoryButtonVariant = (categoryId: string) => {
    return categoryId === selectedCategory.id ? 'default' : 'secondary';
  };

  return (
    <div className="relative top-[-6rem] z-20 flex w-full flex-col rounded-t-[40px] bg-background">
      <div className="flex flex-col gap-3 border-b border-zinc-100 p-7">
        <div className="flex flex-row gap-3">
          <div className="relative h-[45px] w-[45px]">
            <Image
              src={restaurant.avatarImageUrl}
              fill
              className="object-contain"
              alt={restaurant.name}
              sizes="(max-width:45px)"
            />
          </div>
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold">{restaurant.name}</h2>
            <p className="text-sm opacity-60">{restaurant.description}</p>
          </div>
        </div>
        <div className="flex flex-row items-center justify-start gap-2 text-sm text-green-500">
          <Clock size={16} />
          Aberto
        </div>
      </div>

      <ScrollArea className="w-full">
        <div className="w-maxx mb-4 flex flex-row gap-2 px-6">
          {restaurant.menuCategories.map((category) => (
            <Button
              key={category.id}
              className="rounded-full"
              variant={getMenuCategoryButtonVariant(category.id)}
              onClick={() => handleMenuCategoryClick(category)}
            >
              {category.name}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <Products
        products={selectedCategory.products}
        categoryName={selectedCategory.name}
      />
    </div>
  );
};

export default MenuContent;
