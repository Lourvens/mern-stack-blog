const CarouselSkeleton = () => (
  <div className="h-[300px] animate-pulse  flex flex-col justify-end">
    <div>
      <h1 className="w-24 h-6 bg-gray-500 rounded-md"></h1>
      <div className="mt-4 grid gap-1">
        <div className="w-full h-6 bg-gray-500 rounded-md"></div>
        <div className="w-full h-6 bg-gray-500 rounded-md"></div>
        <div className="w-5/6 h-6 bg-gray-500 rounded-md"></div>
      </div>
      <div className="mt-4 w-32 h-10 bg-gray-500 rounded-md"></div>
    </div>
  </div>
);

export default CarouselSkeleton;
