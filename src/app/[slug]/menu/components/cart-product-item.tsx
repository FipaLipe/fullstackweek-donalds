import { ChevronLeft, ChevronRight, TrashIcon } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { priceFormat } from "@/lib/utils";

import { CartProduct } from "../context/cart";

interface CartProductItemProps {
  product: CartProduct;
}

const CartProductItem = ({ product }: CartProductItemProps) => {
  return (
    <div className="flex gap-3 items-center justify-between">
      <div className="relative w-[100px] h-[100px] bg-zinc-200 rounded-lg">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-contain"
        />
      </div>
      <div className="flex flex-col gap-1 items-between">
        <p className="text-sm w-40 truncate text-ellipsis"> {product.name} </p>
        <p className="text-lg font-semibold">{priceFormat(product.price)}</p>
        <div className="flex gap-1 items-center">
          <Button variant="outline" className="w-8 h-8 p-0">
            <ChevronLeft />
          </Button>
          <p className="w-8 text-center text-md">{product.quantity}</p>
          <Button variant="destructive" className="w-8 h-8 p-0">
            <ChevronRight />
          </Button>
        </div>
      </div>
      <Button variant="outline" className="w-10 h-10 p-0">
        <TrashIcon />
      </Button>
    </div>
  );
};

export default CartProductItem;
