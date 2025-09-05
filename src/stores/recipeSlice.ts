import type { StateCreator } from "zustand";
import {
  getCategories,
  getRecipieById,
  getRecipies,
} from "../services/recipesService";
import type {
  Categories,
  Drink,
  Drinks,
  SearchFilter,
  Recipie,
} from "../types";

export type RecipesSliceType = {
  categories: Categories;
  fetchCategories: () => Promise<void>;
  fetchRecipies: (searchFilter: SearchFilter) => Promise<void>;
  drinks: Drinks;
  getRecipie: (id: Drink["idDrink"]) => Promise<void>;
  selectedRecipie: Recipie;
  modal: boolean;
  closeModal: () => void;
};

export const createRecipesSlice: StateCreator<RecipesSliceType> = (set) => ({
  categories: {
    drinks: [],
  },
  drinks: {
    drinks: [],
  },
  modal: false,
  selectedRecipie: {} as Recipie,
  fetchCategories: async () => {
    const categories = await getCategories();
    set({
      categories,
    });
  },
  fetchRecipies: async (searchFilter) => {
    const drinks = await getRecipies(searchFilter);
    set({
      drinks,
    });
  },
  getRecipie: async (id) => {
    const selectedRecipie = await getRecipieById(id);
    set({
      selectedRecipie,
      modal: true,
    });
  },
  closeModal: () => {
    set({
      modal: false,
      selectedRecipie: {} as Recipie,
    });
  },
});
