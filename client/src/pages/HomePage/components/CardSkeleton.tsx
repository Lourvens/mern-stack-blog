function CardSkeleton() {
  return (
    <>
      {Array.from(Array(6)).map((value, index) => (
        <div
          className="animate-pulse flex bg-gray-200 dark:bg-gray-700 p-2 rounded-xl"
          // key={`${index}`}
        >
          <div className="flex gap-3 w-full"></div>
          <div className="shrink-0 w-24 h-24 rounded-xl bg-slate-400"></div>
        </div>
      ))}
    </>
  );
}

export default CardSkeleton;
