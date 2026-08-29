export default function TemplatePreviewLayout({
  children,
}: LayoutProps<"/templates/preview/[id]">) {
  return (
    <div className="h-dvh overflow-x-hidden overflow-y-auto overscroll-none">
      {children}
    </div>
  );
}
