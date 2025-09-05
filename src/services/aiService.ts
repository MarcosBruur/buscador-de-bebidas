import { streamText } from "ai";
import { openRouter } from "../lib/ai";

export default {
  async generateRecipie(prompt: string) {
    const result = streamText({
      model: openRouter("meta-llama/llama-3.3-8b-instruct:free"),
      prompt,
      system:
        "Eres un bartender profesional,No me puedes responder cosas que no esten relacionadas a bebidas",
    });

    return result.textStream;
  },
};
