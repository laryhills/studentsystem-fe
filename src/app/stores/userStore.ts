import { UserDetails } from "@/utils/types";
import { create } from "zustand";

interface UserState {
  user: UserDetails | null;
  loggedIn: boolean;
  setUser: (user: UserDetails) => void;
  logout: () => void;
}

const getInitialLoggedIn = () => {
  const loggedIn = localStorage.getItem("user_details") || JSON.stringify(null);
  return JSON.parse(loggedIn);
};

export const useStore = create<UserState>()((set) => ({
  // initial state
  user: getInitialLoggedIn() ? getInitialLoggedIn() : null,
  loggedIn: getInitialLoggedIn() ? true : false,
  // methods for manipulating state
  setUser: (user) => set(() => ({ user: user, loggedIn: true })),
  logout: () =>
    set(() => {
      localStorage.removeItem("user_details");
      localStorage.removeItem("token");
      return { user: null, loggedIn: false };
    }),
}));
