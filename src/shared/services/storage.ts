import { createMMKV } from "react-native-mmkv";

const storage = createMMKV({ id: "app-storage" });

const KEYS = {
  HAS_COMPLETED_ONBOARDING: "has_completed_onboarding",
  KEEP_SCREEN_ON_COOKING: "keep_screen_on_cooking",
  KEEP_SCREEN_ON_RECIPES: "keep_screen_on_recipes",
  HAS_EVER_SUBSCRIBED: "has_ever_subscribed",
};

export const appStorage = {
  get hasCompletedOnboarding(): boolean {
    return storage.getBoolean(KEYS.HAS_COMPLETED_ONBOARDING) ?? false;
  },
  set hasCompletedOnboarding(value: boolean) {
    storage.set(KEYS.HAS_COMPLETED_ONBOARDING, value);
  },

  get keepScreenOnCooking(): boolean {
    return storage.getBoolean(KEYS.KEEP_SCREEN_ON_COOKING) ?? true;
  },
  set keepScreenOnCooking(value: boolean) {
    storage.set(KEYS.KEEP_SCREEN_ON_COOKING, value);
  },

  get keepScreenOnRecipes(): boolean {
    return storage.getBoolean(KEYS.KEEP_SCREEN_ON_RECIPES) ?? false;
  },
  set keepScreenOnRecipes(value: boolean) {
    storage.set(KEYS.KEEP_SCREEN_ON_RECIPES, value);
  },

  get hasEverSubscribed(): boolean {
    return storage.getBoolean(KEYS.HAS_EVER_SUBSCRIBED) ?? false;
  },
  set hasEverSubscribed(value: boolean) {
    storage.set(KEYS.HAS_EVER_SUBSCRIBED, value);
  },
};
