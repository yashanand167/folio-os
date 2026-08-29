import { notFound } from "next/navigation";

import { getTemplate } from "@/components/templates/registry";

export default async function TemplatePreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const template = getTemplate(id);

  if (!template) {
    notFound();
  }

  const Page = template.Page;
  return <Page embedded />;
}
