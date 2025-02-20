import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import ConsumptionMethodOption from "./components/consumption-method-option";
import RestaurantLogo from "./components/restaurant-logo";

interface RestaurantPageProps {
  params: Promise<{ slug: string }>;
}

const RestaurantPage = async ({ params }: RestaurantPageProps) => {
  const { slug } = await params;

  const restaurant = await db.restaurant.findUnique({ where: { slug } });

  if (!restaurant) {
    return notFound();
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center px-10 pt-16">
      <RestaurantLogo
        avatarUrl={restaurant.avatarImageUrl}
        restaurantName={restaurant.name}
      />

      <div className="flex w-full flex-col gap-10">
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-3xl font-semibold">Seja bem-vindo!</h1>
          <p className="w-[20.5rem] text-center text-sm text-zinc-700">
            Escolha como prefere aproveitar sua refeição. Estamos aqui para
            oferecer praticidade e sabor em cada detalhe!
          </p>
        </div>

        <div className="flex w-full flex-row gap-4">
          <ConsumptionMethodOption
            imageUrl="/dine_in.png"
            buttonText="Para comer aqui"
            slug={slug}
            consumptionMethod="DINE_IN"
          />
          <ConsumptionMethodOption
            imageUrl="/takeaway.png"
            buttonText="Para levar"
            slug={slug}
            consumptionMethod="TAKEAWAY"
          />
        </div>
      </div>
    </div>
  );
};

export default RestaurantPage;
