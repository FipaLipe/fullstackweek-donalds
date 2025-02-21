import { Product } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { priceFormat } from '@/lib/utils';

interface ProductsProps {
  categoryName: string;
  products: Product[];
}

const Products = ({ products, categoryName }: ProductsProps) => {
  const path = usePathname();

  return (
    <div className="px-6 pt-4">
      <h1 className="text-lg font-semibold">{categoryName}</h1>
      {products.map((product) => (
        <Link key={product.id} href={`${path}/${product.id}`} className="">
          <div className="flex flex-row justify-between border-b py-4 transition-transform duration-200 ease-out hover:scale-95">
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
        </Link>
      ))}
    </div>
  );
};

export default Products;
