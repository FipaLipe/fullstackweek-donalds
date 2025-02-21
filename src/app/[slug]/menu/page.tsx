import { OrderConsumptionMethod } from '@prisma/client';
import { notFound } from 'next/navigation';

import { db } from '@/lib/prisma';

import MenuContent from './components/menu-content';
import MenuHeader from './components/menu-header';
interface MenuProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ consumption_method: string }>;
}

const isConsumptionMethodValid = (consumptionMethod: string) => {
  return (Object.values(OrderConsumptionMethod) as Array<string>).includes(
    consumptionMethod.toUpperCase()
  );
};

const Menu = async ({ params, searchParams }: MenuProps) => {
  const { slug } = await params;
  const { consumption_method: consumptionMethod } = await searchParams;

  const restaurant = await db.restaurant.findUnique({
    where: { slug },
    include: {
      menuCategories: {
        include: {
          products: true,
        },
      },
    },
  });

  if (!restaurant) {
    return notFound();
  }

  if (!isConsumptionMethodValid(consumptionMethod)) {
    return notFound();
  }

  return (
    <div>
      <MenuHeader
        imageAlt={restaurant.name}
        imageUrl={restaurant.coverImageUrl}
      />
      <MenuContent restaurant={restaurant} />
    </div>
  );
};

export default Menu;
