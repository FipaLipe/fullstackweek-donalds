import Image from 'next/image';

interface RestaurantLogoProps {
  avatarUrl: string;
  restaurantName: string;
}

const RestaurantLogo = ({ avatarUrl, restaurantName }: RestaurantLogoProps) => {
  return (
    <div className="absolute top-16 flex h-fit w-fit flex-col items-center justify-center gap-2">
      <div className="relative h-[82px] w-[82px] rounded-md">
        <Image
          alt={restaurantName}
          src={avatarUrl}
          fill
          sizes="(max-width:82px)"
        />
      </div>
      <h1 className="text-lg font-semibold">{restaurantName}</h1>
    </div>
  );
};

export default RestaurantLogo;
