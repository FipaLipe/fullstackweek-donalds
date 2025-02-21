import { useContext } from 'react';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

import { CartContext } from '../context/cart';

const CartSheet = () => {
  const { isOpen, toggleCart, products } = useContext(CartContext);
  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Sacola</SheetTitle>
          <SheetDescription>TODO: adicionar produtos</SheetDescription>
        </SheetHeader>
        {products.map((product) => (
          <p key={product.id}>
            {product.name} - {product.quantity}
          </p>
        ))}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
