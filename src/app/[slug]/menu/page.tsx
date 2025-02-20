import { OrderConsumptionMethod } from "@prisma/client";
import { notFound } from "next/navigation";

interface MenuProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ consumption_method: string }>;
}

const menu = async ({ params, searchParams }: MenuProps) => {
  const { slug } = await params;
  const { consumption_method: consumptionMethod } = await searchParams;

  const isConsumptionMethodValid = (value: string) => {
    return (Object.values(OrderConsumptionMethod) as Array<string>).includes(
      value.toUpperCase(),
    );
  };

  if (!isConsumptionMethodValid(consumptionMethod)) {
    return notFound();
  }

  return (
    <div>
      {slug} & {consumptionMethod}
    </div>
  );
};

export default menu;
