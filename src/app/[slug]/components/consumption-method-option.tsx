import { OrderConsumptionMethod } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ConsumptionMethodOption {
  imageUrl: string;
  buttonText: string;
  slug: string;
  consumptionMethod: OrderConsumptionMethod;
}

const ConsumptionMethodOption = ({
  imageUrl,
  buttonText,
  slug,
  consumptionMethod,
}: ConsumptionMethodOption) => {
  return (
    <Link
      href={`/${slug}/menu?consumption_method=${consumptionMethod}`}
      className="w-full transition-transform duration-200 ease-out hover:scale-110"
    >
      <Card className="flex w-full flex-col items-center justify-center gap-8 rounded-[20px] px-4 py-8 hover:bg-zinc-50">
        <div className="relative h-[80px] w-[80px]">
          <Image src={imageUrl} alt="" fill />
        </div>
        <Button variant="secondary">{buttonText}</Button>
      </Card>
    </Link>
  );
};

export default ConsumptionMethodOption;
