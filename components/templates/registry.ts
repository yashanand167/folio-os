import InteractivePage from "@/components/templates/interactive/pages/home";
import MinimalPage from "@/components/templates/minimal/pages/home";

export const templates = [
  { id: "minimal", label: "Minimal", Page: MinimalPage },
  { id: "interactive", label: "Interactive", Page: InteractivePage },
] as const;

export type TemplateId = (typeof templates)[number]["id"];

export function getTemplate(id: string) {
  return templates.find((template) => template.id === id);
}
