export function CornerStrokes({
  className = "border-white",
}: {
  className?: string;
}) {
  const stroke = `pointer-events-none absolute h-3.5 w-3.5 ${className}`;

  return (
    <>
      <span className={`${stroke} top-0 left-0 border-t-[0.5px] border-l-[0.5px]`} />
      <span className={`${stroke} top-0 right-0 border-t-[0.5px] border-r-[0.5px]`} />
      <span className={`${stroke} bottom-0 left-0 border-b-[0.5px] border-l-[0.5px]`} />
      <span className={`${stroke} right-0 bottom-0 border-r-[0.5px] border-b-[0.5px]`} />
    </>
  );
}
