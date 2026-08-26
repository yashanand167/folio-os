import { CornerStrokes } from "@/components/corner-strokes";

export default function ProcessSection() {
  return (
    <section className="px-6 pb-24 sm:px-10">
      <div className="relative mx-auto h-100 w-full bg-neutral-100/50 sm:h-96 dark:bg-neutral-800/50">
        <CornerStrokes className="border-black dark:border-white" />
      </div>
    </section>
  );
}
