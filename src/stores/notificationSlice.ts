import type { StateCreator } from "zustand";
import type { FavoritesSlateType } from "./favoritesSlice";

type Notification = {
  text: string;
  error: boolean;
  show: boolean;
};

export type NotificationSliceType = {
  notification: Notification;
  showNotification: (payload: Pick<Notification, "text" | "error">) => void;
  hiddeNotification: () => void;
};

export const createNotificationSlice: StateCreator<
  NotificationSliceType & FavoritesSlateType,
  [],
  [],
  NotificationSliceType
> = (set, get) => ({
  notification: {
    text: "",
    error: false,
    show: false,
  },
  showNotification: (payload) => {
    set({
      notification: {
        text: payload.text,
        error: payload.error,
        show: true,
      },
    });
    setTimeout(() => {
      get().hiddeNotification();
    }, 3000);
  },
  hiddeNotification: () => {
    set({
      notification: {
        text: "",
        error: false,
        show: false,
      },
    });
  },
});
