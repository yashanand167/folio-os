import { openrouter } from "./client";
import { portfolioSystemPrompt, portfolioPrompt } from "./prompts/portfolio";

export async function generatePortfolio(input: string) {
  const response = await openrouter.chat.completions.create({
    model: "google/gemini-2.5-flash",
    messages: [
      { role: "system", content: portfolioSystemPrompt },
      { role: "user", content: portfolioPrompt(input) },
    ],
  });
  return response.choices[0].message.content;
}

