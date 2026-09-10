import { openrouter } from "./client";
import {
  folioAgentSystemPrompt,
  folioDraftPrompt,
  folioRevisePrompt,
  type AgentProfileInput,
} from "./prompts/portfolio";

const MODEL = "google/gemini-2.5-flash";

async function completeJsonChat(
  messages: Array<{ role: "system" | "user"; content: string }>,
) {
  const response = await openrouter.chat.send({
    chatRequest: {
      model: MODEL,
      messages,
      responseFormat: { type: "json_object" },
      stream: false,
    },
  });

  if (!("choices" in response)) {
    throw new Error("Expected a non-streaming chat completion");
  }

  const content = response.choices[0]?.message.content;
  return typeof content === "string" ? content : null;
}

export async function draftPortfolio(profile: AgentProfileInput) {
  return completeJsonChat([
    { role: "system", content: folioAgentSystemPrompt },
    { role: "user", content: folioDraftPrompt(profile) },
  ]);
}

export async function revisePortfolio(portfolio: string, request: string) {
  return completeJsonChat([
    { role: "system", content: folioAgentSystemPrompt },
    { role: "user", content: folioRevisePrompt(portfolio, request) },
  ]);
}
