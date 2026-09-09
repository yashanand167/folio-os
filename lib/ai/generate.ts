import { openrouter } from "./client";
import {
  folioAgentSystemPrompt,
  folioDraftPrompt,
  folioRevisePrompt,
  type AgentProfileInput,
} from "./prompts/portfolio";

export async function draftPortfolio(profile: AgentProfileInput) {
  const response = await openrouter.chat.completions.create({
    model: "google/gemini-2.5-flash",
    messages: [
      { role: "system", content: folioAgentSystemPrompt },
      { role: "user", content: folioDraftPrompt(profile) },
    ],
    response_format: { type: "json_object" },
  });
  return response.choices[0].message.content;
}

export async function revisePortfolio(portfolio: string, request: string) {
  const response = await openrouter.chat.completions.create({
    model: "google/gemini-2.5-flash",
    messages: [
      { role: "system", content: folioAgentSystemPrompt },
      { role: "user", content: folioRevisePrompt(portfolio, request) },
    ],
    response_format: { type: "json_object" },
  });
  return response.choices[0].message.content;
}
