import { Product } from '@prisma/client';
import Image from 'next/image';

import { priceFormat } from '@/lib/utils';

interface ProductsProps {
  categoryName: string;
  products: Product[];
}

const Products = ({ products, categoryName }: ProductsProps) => {
  return (
    <div className="px-6 pt-4">
      <h1 className="text-lg font-semibold">{categoryName}</h1>
      {products.map((product) => (
        <div
          className="flex flex-row justify-between border-b py-4"
          key={product.id}
        >
          <div className="flex w-8/12 flex-col">
            <h2>{product.name}</h2>
            <p className="line-clamp-2 text-sm opacity-60">
              {product.description}
            </p>
            <p className="mt-2 text-lg font-semibold">
              {priceFormat(product.price)}
            </p>
          </div>
          <div className="relative h-[82px] w-[82px]">
            <Image
              alt={product.name}
              src={product.imageUrl}
              fill
              sizes="(max-width:80px)"
              className="rounded-lg bg-zinc-100 object-contain"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
