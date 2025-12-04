import Constants from "expo-constants";

const extra =
   (Constants.expoConfig && (Constants.expoConfig as any).extra) ||
   (Constants.manifest && (Constants.manifest as any).extra) ||
   {};

export const API_URL = String(extra.API_URL);
export const STRIPE_PUBLISHABLE_KEY = String(extra.STRIPE_PUBLISHABLE_KEY ?? "");
export default { API_URL, STRIPE_PUBLISHABLE_KEY };
