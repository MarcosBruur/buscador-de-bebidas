import type { StateCreator } from "zustand";
import aiService from "../services/aiService";

export type AISlice = {
  recipie: string;
  isGenerating: boolean;
  generateRecipie: (prompt: string) => Promise<void>;
};

export const createAiSlice: StateCreator<AISlice> = (set) => ({
  recipie: "",
  isGenerating: false,
  generateRecipie: async (prompt) => {
    set({
      recipie: "",
      isGenerating: true,
    });
    const data = await aiService.generateRecipie(prompt);

    for await (const textPart of data) {
      set((state) => ({
        recipie: state.recipie + textPart,
      }));
    }
    set({
      isGenerating: false,
    });
  },
});
