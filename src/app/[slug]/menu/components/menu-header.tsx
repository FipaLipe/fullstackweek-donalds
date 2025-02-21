'use client';

import { ChevronLeft, ScrollText } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

interface MenuHeaderProps {
  imageUrl: string;
  imageAlt: string;
}

const MenuHeader = ({ imageUrl, imageAlt }: MenuHeaderProps) => {
  const router = useRouter();

  const handleBackButton = () => router.back();

  return (
    <div className="relative h-[350px] w-full">
      <Image
        src={imageUrl}
        fill
        className="z-1 object-cover"
        alt={imageAlt}
        sizes="(max-width:800px)"
      />
      <div className="z-10">
        <Button
          variant="secondary"
          className="absolute left-4 top-4 h-12 w-12 rounded-full"
          onClick={handleBackButton}
        >
          <ChevronLeft />
        </Button>
        <Button
          variant="secondary"
          className="absolute right-4 top-4 h-12 w-12 rounded-full"
        >
          <ScrollText />
        </Button>
      </div>
    </div>
  );
};

export default MenuHeader;
