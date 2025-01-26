import { User } from "@prisma/client";
import { create } from "zustand";
//import { Simplecrypt } from "@/lib/simplecrypt";
//import { LOCALSTORAGE } from "@/lib/enums";
//import {} from //getDecryptedLocalStorage,
//setEncryptedLocalStorage,
//"@/lib/localstorage";
//const NEXT_PUBLIC_ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
//const S = new Simplecrypt(NEXT_PUBLIC_ENCRYPTION_KEY!);

// Define the state interface
interface AuthState {
  user: User | null;
  //authToken: string | null;
  login: (user: User) => void;
  logout: () => void;
  setUser: (user: User) => void; // Allows partial updates to the user
  updateUser: (updates: Partial<User>) => void; // Allows partial updates to the user
  updateTokens: (tokens: number) => void; // Specifically for updating tokens
  authStatus: "loading" | "authenticated" | "unauthenticated";
  setAuthStatus: (
    authStatus: "loading" | "authenticated" | "unauthenticated",
  ) => void;
  //setAuthToken: (authToken: string) => void;
}

// Create the store
const useAuthStore = create<AuthState>((set) => ({
  //authToken: getDecryptedLocalStorage(LOCALSTORAGE.AUTH_TOKEN),
  //setAuthToken: (authToken) => {
  //  const encryptedKey = S.encrypt(LOCALSTORAGE.AUTH_TOKEN);
  //  const encryptedValue = S.encrypt(authToken);
  //  setEncryptedLocalStorage(encryptedKey, encryptedValue);
  //  return set({ authToken: authToken });
  //},
  authStatus: "loading",
  setAuthStatus: (authStatus) => set({ authStatus }),
  user: null,

  setUser: (user) => set({ user }),
  // Set the user on login
  login: (user) => set({ user }),

  // Clear the user on logout
  logout: () => set({ user: null }),

  // Update specific user properties
  updateUser: (updates) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...updates } : null,
    })),

  // Update the user's tokens
  updateTokens: (tokens: number) =>
    set((state) => ({
      user: state.user ? { ...state.user, tokens } : null,
    })),
}));

export default useAuthStore;
