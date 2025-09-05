import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createRecipesSlice } from "./recipeSlice";
import { createFavoritesSlace } from "./favoritesSlice";
import { createNotificationSlice } from "./notificationSlice";
import type { RecipesSliceType } from "./recipeSlice";
import type { FavoritesSlateType } from "./favoritesSlice";
import type { NotificationSliceType } from "./notificationSlice";
import { createAiSlice, type AISlice } from "./aiSlice";

export const useAppStore = create<
  RecipesSliceType & FavoritesSlateType & NotificationSliceType & AISlice
>()(
  devtools((...a) => ({
    ...createRecipesSlice(...a),
    ...createFavoritesSlace(...a),
    ...createNotificationSlice(...a),
    ...createAiSlice(...a),
  }))
);
