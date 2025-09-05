import type { StateCreator } from "zustand";
import type { Recipie } from "../types";
import {
  createNotificationSlice,
  type NotificationSliceType,
} from "./notificationSlice";

export type FavoritesSlateType = {
  favorites: Recipie[];
  handleClickFavorite: (recipie: Recipie) => void;
  favoriteExists: (id: Recipie["idDrink"]) => boolean;
  loadFromStorage: () => void;
};

export const createFavoritesSlace: StateCreator<
  FavoritesSlateType & NotificationSliceType,
  [],
  [],
  FavoritesSlateType
> = (set, get, api) => ({
  favorites: [],
  handleClickFavorite: (recipie) => {
    if (get().favoriteExists(recipie.idDrink)) {
      set({
        favorites: [
          ...get().favorites.filter(
            (favorite) => favorite.idDrink !== recipie.idDrink
          ),
        ],
      });
      createNotificationSlice(set, get, api).showNotification({
        text: "Se eliminó de favoritos",
        error: false,
      });
    } else {
      set({
        favorites: [...get().favorites, recipie],
      });
      localStorage.setItem("favorites", JSON.stringify(get().favorites));
      createNotificationSlice(set, get, api).showNotification({
        text: "Se agregó a favoritos",
        error: false,
      });
    }
  },
  favoriteExists: (id) => {
    return get().favorites.some((favorite) => favorite.idDrink === id);
  },
  loadFromStorage: () => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      set({
        favorites: JSON.parse(storedFavorites),
      });
    }
  },
});
