import { notFound } from 'next/navigation';

import { db } from '@/lib/prisma';

import ProductContent from './components/product-content';
import ProductHeader from './components/product-header';

interface ProductPageProps {
  params: Promise<{ slug: string; productId: string }>;
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { productId, slug } = await params;

  const product = await db.product.findUnique({
    where: { id: productId },
    include: {
      restaurant: {
        select: {
          name: true,
          avatarImageUrl: true,
          slug: true,
        },
      },
    },
  });

  if (!product || product.restaurant.slug !== slug) {
    return notFound();
  }

  return (
    <div className="flex h-full flex-auto flex-col">
      <ProductHeader imageAlt={product.name} imageUrl={product.imageUrl} />
      <ProductContent product={product} />
    </div>
  );
};

export default ProductPage;
