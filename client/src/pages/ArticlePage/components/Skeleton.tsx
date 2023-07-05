const Skeleton = () => {
  return (
    <div className="animate-pulse">
      <div>
        <div className="w-32 h-5 bg-gray-500 bg-opacity-30 rounded-full"></div>
      </div>
      <div className="my-6 bg-gray-500 bg-opacity-30 h-48 lg:h-60 rounded-xl overflow-hidden"></div>
      <div className="flex items-center justify-between gap-16">
        <div className="shrink-0 w-16 h-16 rounded-full bg-gray-500 bg-opacity-30"></div>
        <div className="w-full h-8 rounded-full bg-gray-500 bg-opacity-30"></div>
      </div>
    </div>
  );
};

export default Skeleton;
