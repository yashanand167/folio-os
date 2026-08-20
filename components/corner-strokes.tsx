export function CornerStrokes({
  className = "border-white",
}: {
  className?: string;
}) {
  const stroke = `pointer-events-none absolute h-3.5 w-3.5 ${className}`;

  return (
    <>
      <span className={`${stroke} top-0 left-0 border-t border-l`} />
      <span className={`${stroke} top-0 right-0 border-t border-r`} />
      <span className={`${stroke} bottom-0 left-0 border-b border-l`} />
      <span className={`${stroke} right-0 bottom-0 border-r border-b`} />
    </>
  );
}
